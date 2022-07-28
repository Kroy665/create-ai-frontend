
import { Configuration, OpenAIApi} from "openai";

async function callAi(prompt){
    // const maxToken = 264;
    const apiKey = "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";
    
    const configuration = new Configuration({
        apiKey: apiKey,
    });
    const openai = new OpenAIApi(configuration);
    try{
        console.log("prompt::",prompt)
        const response = await openai.createCompletion("text-davinci-002", {
            prompt: prompt,
            temperature: 0.7,
            max_tokens: 256,
            top_p: 1,
            frequency_penalty: 0,
            presence_penalty: 0,
        });

        

        return {
            success: true,
            error: null,
            data: response.data.choices[0].text
        }
    }catch(error){
        console.log("OpenAi:",error)
        return {
            success: false,
            error: error,
            data: null
        }
    }

}

export default callAi;