

import { useRef } from "react"
import useRightClickMenu from "../hooks/useRightClickMenu"
import ContextMenuItem from "./ContextMenuItem"
import { Link } from "react-router-dom"



const ContextMenu = ({onSubmit,setIsSettingApiKey}) => {
  const menuRef=useRef()
  const [x,y,showMenu]=useRightClickMenu(menuRef)
 
  return <>
    {showMenu&&<ul ref={menuRef} style={{left:`${x}px`,top:`${y}px`}} className={`absolute flex flex-col gap-1 rounded-md z-[999]`}>
    <ContextMenuItem content="refresh" className="relative group/menuItem flex-center " onClick={()=>{location.reload()}}/>
    <ContextMenuItem content="toggle APIKEY settings" className="relative group/menuItem flex-center " onClick={()=>setIsSettingApiKey(mode=>!mode)}/>
     <ContextMenuItem content="add new task" className="relative group/menuItem flex-center " onClick={onSubmit}/>
     <ContextMenuItem  className="relative group/menuItem flex-center " >
     <Link to="/sponsor">buy me a coffee</Link>
     </ContextMenuItem>
    
    
    </ul>
    }
    </>

}

export default ContextMenu