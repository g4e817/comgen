import { ErrorDefinitionEnum } from "./ErrorDefinitions";

export default class LlmIntegrationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = ErrorDefinitionEnum.LlmIntegrationError;
  }
}