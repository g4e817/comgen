import { LlmImplementationProviders } from "../llmIntegration/AbstractLlmIntegration";


const OPEN_AI_API = process.env.OPEN_API_KEY || '';
const JIRA_HOST = process.env.JIRA_HOST || '';
const JIRA_API_TOKEN = process.env.JIRA_API_TOKEN || '';


export const config = {
    integrations: {
        llm: LlmImplementationProviders.OPEN_AI,
        shopSystem: 'shopware',
    },
    openAi: {
        apiKey: OPEN_AI_API
    },
    jira: {
        host: JIRA_HOST,
        apiToken: JIRA_API_TOKEN,
        projectKey: 'LLM'
    },
    currentWorkingDirectory: process.cwd() + "/backend",
    llmTranscriptionToXmlPrompt: "Convert a meeting transcript to XML:",
}
