// import { ChevronRight } from 'lucide-react'
import React, { useRef } from 'react'

const ContextMenuItem = ({onClick,className,children,content}) => {
  const contextMenuRef=useRef()
  return (
    <>{contextMenuRef.current?.getBoundingClientRect}
    <li  ref={contextMenuRef} onClick={onClick} className={`gap-2 border-b-malibu-400 border-b-2 border-dotted py-1 px-3 tracking-wider font-thin hover:bg-malibu-600 hover:text-malibu-200 bg-malibu-700 text-malibu-200/80  cursor-pointer select-none ${className}`}>
        
        {content}
        {/* {children&&<ChevronRight/>} */}
        {children}
        </li>
    </>
  )
}

export default ContextMenuItem