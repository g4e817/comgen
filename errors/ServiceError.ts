import { ErrorDefinitionEnum } from "./ErrorDefinitions";

export default class ServiceError extends Error {
  constructor(message: string) {
    super(message);
    this.name = ErrorDefinitionEnum.ServiceError;
  }
}
