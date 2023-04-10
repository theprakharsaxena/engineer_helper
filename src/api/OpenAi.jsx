import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  organization: "org-ZGD80rKMzr0eQPFZZFOj13rl",
  apiKey: "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",
});

const openai = new OpenAIApi(configuration);

export default openai;
