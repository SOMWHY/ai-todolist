import { useState } from "react"
import handleGenerating from "../helpers/fetchApi.mjs";
import Button from "../ui/Button"

const HeaderExtend = ({undo,redo,newItem,setNewItem,isShowHeaderExtend}) => {
    const [isGenerating,setIsGenerating]=useState(false)
  return (
    <div className={`${!isShowHeaderExtend?" hidden":"flex-center py-2  w-full rounded-md opacity-100 "} transition-all `}>
        <span className="flex gap-5 flex-wrap">

        <Button 
        type="button"
        onClick={undo}
        className="dark:bg-malibu-950/80 rounded-xl dark:text-malibu-200
        bg-malibu-300 text-malibu-950
        font-thin tracking-wide text-sm
        grow-0 shrink-1
        "
        >
        undo
          </Button>
    <Button 
        type="button"
        onClick={()=>handleGenerating(setIsGenerating,newItem,setNewItem)}
        disabled={isGenerating||!newItem}
        className="dark:bg-malibu-950 rounded-xl dark:text-malibu-200
        bg-malibu-400 text-malibu-950
        font-semibold tracking-tight 
        
        "
        >
        {isGenerating?"Generating":"Make the mess a CLEAN todo title!"}
          
        </Button>
          <Button 
        type="button"
        onClick={redo}
        className="dark:bg-malibu-950/80 rounded-xl dark:text-malibu-200
        bg-malibu-300 text-malibu-950
        font-thin tracking-wide text-sm
        grow-0 shrink-1
        "
        >
        redo
          </Button>
            </span>
    </div>
  )
}

export default HeaderExtend