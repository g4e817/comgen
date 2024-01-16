import LlmBackendFactory from '../llmIntegration/LlmBackendFactory';
import AbstractLlmIntegration from '../llmIntegration/AbstractLlmIntegration';
export default class BaseService {
    protected llmBackend: AbstractLlmIntegration;

    constructor() {
        this.llmBackend = LlmBackendFactory.getImplementation();
    }
}
