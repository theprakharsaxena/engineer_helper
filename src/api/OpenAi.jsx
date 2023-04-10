import { Configuration, OpenAIApi } from "openai";


const configuration = new Configuration({
  organization: import.meta.env.VITE_OPEN_AI_ORG_KEY,
  apiKey: import.meta.env.VITE_OPEN_AI_API_KEY,
});

const openai = new OpenAIApi(configuration);

export default openai;
