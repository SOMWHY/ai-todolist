import { useState } from "react"

const DropArea = ({index = 0, todos, setTodos}) => {
  const [showDropArea, setShowDropArea] = useState(false)

  function handleDrop(index) {
    const taskToMove = todos.find(todo => todo.active === true)
    const updatedTasks = todos.filter(todo => todo.active === false)

    if (taskToMove) {
      updatedTasks.splice(index, 0, { ...taskToMove, active: false })
    }

    setTodos(updatedTasks)
    setShowDropArea(false)
  }

  return (
    <section 
      className={`${showDropArea ? "opacity-100 " : "opacity-0"} snap-start font-semibold dark:text-malibu-200/60`} 
      onDragEnter={() => setShowDropArea(true)}
      onDragLeave={() => setShowDropArea(false)}
      onDrop={() => handleDrop(index)}
      onDragOver={e => e.preventDefault()}
    >
      Drop here...
    </section>
  )
}

export default DropArea

