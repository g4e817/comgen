import { config } from '../config/config';
import AbstractLlmIntegration, { LlmImplementationProviders } from './AbstractLlmIntegration';
import OpenAiImplementation from './implementation/OpenAiImplementation';

export default class LlmBackendFactory {
    public static getImplementation(): AbstractLlmIntegration {
        let integrationImplementation: AbstractLlmIntegration;

        switch (config.integrations.llm) {
            case LlmImplementationProviders.OPEN_AI:
                integrationImplementation = OpenAiImplementation.getInstance();
                break;
            default:
                throw new Error('llm integration in config not known.');
        }

        return integrationImplementation;
    }
}
