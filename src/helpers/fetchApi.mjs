import OpenAI from "openai";
const openai = new OpenAI({baseURL:'https://api.chatanywhere.tech',apiKey:'sk-qhwuiRw1AJITazAC19Z6dWUFjlONpAK1gUUHHq6rapfk2hTS',dangerouslyAllowBrowser: true});

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
        console.error("error generated:",err)
    }
    finally{
        setIsGenerating(false)
    }
    
    
}