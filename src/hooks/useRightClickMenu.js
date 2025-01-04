import { useEffect, useState } from 'react'
const useRightClickMenu = (menuRef) => {
    const menuEl=menuRef.current
    const MENU_WIDTH=menuEl?.getBoundingClientRect().width
    const MENU_HEIGHT=menuEl?.getBoundingClientRect().height
    const [x,setX]=useState(0)
    const [y,setY]=useState(0)
    const [showMenu,setShowMenu]=useState(false)
    useEffect(()=>{
        document.addEventListener("click",handleHideMenu)
        document.addEventListener("contextmenu",handleContextMenu)
        return ()=>{
            document.removeEventListener("click",handleHideMenu)
            document.removeEventListener("contextmenu",handleContextMenu)
        
        }
    
    })
    function handleHideMenu(){
        setShowMenu(false)
    }

    function handleContextMenu(e){
        e.preventDefault()
        x+MENU_WIDTH>window.innerWidth?setX(e.pageX-MENU_WIDTH):setX(e.pageX)
        y+MENU_HEIGHT>window.innerHeight?setY(e.pageY-MENU_HEIGHT):setY(e.pageY)
        
        
        setShowMenu(true)


    }


  return (
    [x,y,showMenu]
  )
}

export default useRightClickMenu