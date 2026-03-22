export interface ApiConfig {
  apiKey: string;
  baseUrl?: string;
}

interface RequestOptions {
  params?: Record<string, unknown>;
  headers?: Record<string, string>;
  responseType?: string;
}

interface FetchResponse {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any;
  status: number;
}

interface HttpClient {
  get(path: string, options?: RequestOptions): Promise<FetchResponse>;
}

export class BaseApiClient {
  protected client: HttpClient;
  protected apiKey: string;

  constructor(config: ApiConfig) {
    this.apiKey = config.apiKey;
    const baseURL = config.baseUrl || 'https://api.company-information.service.gov.uk';
    const authHeader =
      'Basic ' + Buffer.from(this.apiKey + ':').toString('base64');

    this.client = {
      get: async (
        path: string,
        options?: RequestOptions
      ): Promise<FetchResponse> => {
        const url = new URL(path, baseURL);
        if (options?.params) {
          for (const [key, value] of Object.entries(options.params)) {
            if (value !== undefined && value !== null) {
              url.searchParams.append(key, String(value));
            }
          }
        }

        const headers: Record<string, string> = {
          Accept: 'application/json',
          Authorization: authHeader,
          ...options?.headers,
        };

        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 30000);

        try {
          const response = await fetch(url.toString(), {
            method: 'GET',
            headers,
            signal: controller.signal,
          });

          if (!response.ok) {
            await this.handleErrorResponse(response);
          }

          const data = await response.json();
          return { data, status: response.status };
        } catch (error) {
          if (error instanceof TypeError && (error.message.includes('fetch') || error.message.includes('network'))) {
            throw new Error(
              'No response from Companies House API. Please check your connection.'
            );
          }
          throw error;
        } finally {
          clearTimeout(timeoutId);
        }
      },
    };
  }

  private async handleErrorResponse(response: Response): Promise<never> {
    let message: string;
    try {
      const body = (await response.json()) as Record<string, unknown>;
      message = (body?.error as string) || response.statusText;
    } catch {
      message = response.statusText;
    }

    const status = response.status;

    switch (status) {
      case 401:
        throw new Error(
          `Authentication failed: ${message}. Please check your API key.`
        );
      case 404:
        throw new Error(`Resource not found: ${message}`);
      case 429:
        throw new Error(
          `Rate limit exceeded: ${message}. Please try again later.`
        );
      case 500:
      case 502:
      case 503:
      case 504:
        throw new Error(
          `Server error: ${message}. Please try again later.`
        );
      default:
        throw new Error(`API error (${status}): ${message}`);
    }
  }

  async testConnection(): Promise<boolean> {
    try {
      await this.client.get('/search/companies', {
        params: { q: 'test', items_per_page: 1 },
      });
      return true;
    } catch {
      return false;
    }
  }
}
