

import { useRef } from "react"
import useRightClickMenu from "../hooks/useRightClickMenu"
import ContextMenuItem from "./ContextMenuItem"
import { Link } from "react-router-dom"


const ContextMenu = ({onSubmit,setOrderBy}) => {
  const menuRef=useRef()
  const [x,y,showMenu]=useRightClickMenu(menuRef)

  return <>
    {showMenu&&<ul ref={menuRef} style={{left:`${x}px`,top:`${y}px`}} className={`absolute flex flex-col gap-1 rounded-md z-[999]`}>
    <ContextMenuItem content="refresh" className="relative group/menuItem flex-center " onClick={()=>{location.reload()}}/>
     <ContextMenuItem content="add new task" className="relative group/menuItem flex-center " onClick={onSubmit}/>
     <ContextMenuItem  className="relative group/menuItem flex-center " >
     <Link to="/sponsor">buy me a coffee</Link>
     </ContextMenuItem>
       
     <ContextMenuItem content="sorted by default" className="relative group/menuItem flex-center " onClick={()=>setOrderBy("default")}/>
     <ContextMenuItem content="sorted by reversed" className="relative group/menuItem flex-center " onClick={()=>setOrderBy("reversed")}/>
     <ContextMenuItem content="sorted by deadline" className="relative group/menuItem flex-center " onClick={()=>setOrderBy("byDeadline")}/>
     <ContextMenuItem content="sorted by completed" className="relative group/menuItem flex-center " onClick={()=>setOrderBy("byCompleted")}/>
     <ContextMenuItem content="sorted by importance" className="relative group/menuItem flex-center " onClick={()=>setOrderBy("byImportance")}/>
     <ContextMenuItem content="drag to sort" className="relative group/menuItem flex-center " onClick={()=>setOrderBy("dragToSort")}/>
     
    
    </ul>
    }
    </>

}

export default ContextMenu