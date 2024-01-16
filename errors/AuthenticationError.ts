import { ErrorDefinitionEnum } from "./ErrorDefinitions";

export default class AuthenticationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = ErrorDefinitionEnum.AuthenticationError;
  }
}
