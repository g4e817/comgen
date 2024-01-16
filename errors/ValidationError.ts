import { ErrorDefinitionEnum } from "./ErrorDefinitions";

export default class ValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = ErrorDefinitionEnum.ValidationError;
  }
}
