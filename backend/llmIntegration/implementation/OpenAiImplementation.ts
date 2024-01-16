import { config } from "../../config/config";
import AbstractLlmIntegration from "../AbstractLlmIntegration";
import OpenAI, { toFile } from "openai";

export default class OpenAiImplementation extends AbstractLlmIntegration {
    private static instance: OpenAiImplementation;
    private openAi: OpenAI;

    private constructor() {
        super();

        this.openAi = new OpenAI({ apiKey: config.openAi.apiKey || '' });
    }

    public static getInstance(): OpenAiImplementation {
        if (!OpenAiImplementation.instance) {
            OpenAiImplementation.instance = new OpenAiImplementation();
        }

        return OpenAiImplementation.instance;
    }

    public async completion(prompt: string): Promise<string | null> {
        try {
            const completion = await this.openAi.chat.completions.create({
                messages: [{ role: "system", content: prompt }],
                model: "gpt-3.5-turbo",
            });

            return completion.choices[0].message.content;
        } catch (error: any) {
            throw new Error("Error in OpenAiImplementation.completion(): ", error.message);
        }
    }

    public async speechToText(audioBuffer: Buffer): Promise<string | null> {
        try {
            const transcription = await this.openAi.audio.transcriptions.create({
                file: await toFile(audioBuffer, "audio.wav", { type: "audio/wav" }),
                model: "whisper-1",
            });
            return transcription.text;
        } catch (error: any) {
            throw new Error("Error in OpenAiImplementation.speechToText(): ", error.message);
        }
    }

    public async meetingTranscriptToXml(meetingTranscript: string, instructions: string): Promise<string | null> {
        try {

            const response = await this.completion(instructions + "\n\n" + meetingTranscript);

            return response;

        } catch (error: any) {
            throw new Error("Error in OpenAiImplementation.meetingTranscriptToXml(): ", error.message);
        }
    }
}