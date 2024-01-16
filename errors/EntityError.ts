import { ErrorDefinitionEnum } from "./ErrorDefinitions";

export default class EntityError extends Error {
  constructor(message: string) {
    super(message);
    this.name = ErrorDefinitionEnum.EntityError;
  }
}