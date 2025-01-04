import React from 'react'


const TodoForm = ({handleSubmit,children}) => {
  return (
    <form 
         
    autoComplete="off"
    className={` flex flex-col items-center w-full max-w-[640px] h-screen rounded-sm px-1 py-1 gap-1 absolute left-[50%] -translate-x-[50%]`} 
    onSubmit={handleSubmit}
    >
   <button type="submit" className="hidden" name="hiddenElForSubmitting"/>
   {children}
 </form>

  )
}

export default TodoForm