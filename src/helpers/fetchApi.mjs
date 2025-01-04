import OpenAI from "openai";
const openai = new OpenAI({
    apiKey: JSON.parse(localStorage.getItem("API_KEY"))??"",  // 使用 Vite 的环境变量
    baseURL: 'https://api.chatanywhere.tech',
    dangerouslyAllowBrowser: true
});

export default async function handleGenerating
(setIsGenerating,newItem,setNewItem) {

    try {
        setIsGenerating(true)
        const response = await openai.chat.completions.create({
            max_tokens:30,
            temperature:0.2,
            frequency_penalty:1.5,
            model: "gpt-3.5-turbo",
            messages: [
                { role: "system", content: "You are a helpful assistant that summarize the given text to a title of todo in todo-list, do not miss points, you could use keyword if necessary, don't mind grammar. Your response should be in tandem with the input language!" },
                {
                    role: "user",
                    content:newItem,
                },
                
                
            ],
        });
        const msg=response.choices[0].message.content.trim().slice(1,-1)  //remove white-space and ""
        setNewItem(msg)
    } catch (err) {
        console.error("Error generated:", err);
        if (err.response && err.response.status === 401) {
          throw new Error("Invalid API key. Please check your API key and try again.");
        }
        throw new Error("Failed to generate todo. Please try again later.");
    }
    finally{
        setIsGenerating(false)
    }
    
    
}