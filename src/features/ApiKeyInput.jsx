import { useState } from "react"
import Button from "../ui/Button"



const ApiKeyInput = () => {
const [apiText,setApiText]=useState("")
function handleClick(){
if(!apiText) return
localStorage.setItem("API_KEY",JSON.stringify(apiText))
setApiText("")
}
  return (
    <div className="flex gap-5 items-center">
        <input type="text" value={apiText} onChange={(e)=>setApiText(e.target.value)} placeholder="请粘贴你的APIKEY(去掉引号)" className="w-72 py-2 px-3 rounded-sm bg-malibu-800/80 text-malibu-300 dark:bg-malibu-950/80 dark:text-malibu-200 outline-0 dark:shadow-malibu-700 shadow-malibu-900  shadow-inner"/>
        <Button onClick={handleClick} className="bg-malibu-300 rounded-lg text-malibu-950 font-semibold dark:bg-malibu-950/80 dark:text-malibu-200/90">Set!</Button>
    </div>
  )
}

export default ApiKeyInput