import { ErrorDefinitionEnum } from "./ErrorDefinitions";

class HttpResponseError extends Error {
    status: number;
    message: string;
    name: ErrorDefinitionEnum;

    constructor(status: number, message: string, name: ErrorDefinitionEnum = ErrorDefinitionEnum.Unknown) {
        super(message);
        this.status = status;
        this.message = message;
        this.name = name;
    }
}

export default HttpResponseError;