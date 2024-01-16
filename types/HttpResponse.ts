import { ErrorDefinitionEnum } from "../errors/ErrorDefinitions";

export interface HttpResponse<T> {
  message: string;
  response: T;
  meta: MetaData;
}

export interface MetaData { }
export interface MetaPagination extends MetaData {
  total: number;
  pageSize: number;
  page: number;
}
export interface MetaError extends MetaData {
  error: ErrorDefinitionEnum;
}
