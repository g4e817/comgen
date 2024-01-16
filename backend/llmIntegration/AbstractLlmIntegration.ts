export enum LlmImplementationProviders {
    OPEN_AI,
}

export default abstract class AbstractLlmIntegration {
    public abstract completion(prompt: string): Promise<string | null>;
    public abstract speechToText(audioBuffer: Buffer): Promise<string | null>;
    public abstract meetingTranscriptToXml(meetingTranscript: string, instructions: string): Promise<string | null>;
}