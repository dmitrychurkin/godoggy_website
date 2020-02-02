export interface IResourceResponse<T, M> {
  // TODO: update base on JSON API spec
  readonly meta?: M;
  readonly data?: T;
  readonly errors?: Array<{
    readonly status: string;
    readonly detail: string;
    readonly title?: string;
  }>;
}
