/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from "react"

const useUndoRedo = (initialValue, limit = 10) => {

  const [value, setValue] = useState(initialValue)//immediate update when typing
  const [history, setHistory] = useState([initialValue])
  const [curIndex, setCurIndex] = useState(0)
  const inputRef = useRef(null)

  function set(newValue) {
    setValue(newValue)
    let newHistory = history.slice(0, curIndex + 1)
    newHistory.push(newValue)
    if (newHistory.length > limit) {
      newHistory = newHistory.slice(newHistory.length - limit-1)
    }
    setHistory(newHistory)
    setCurIndex(newHistory.length - 1)
  }

  function undo() {
    if (curIndex > 0) {
      setCurIndex(curIndex=>Math.max(curIndex - 1,0))
      setValue(history[curIndex - 1])
    }
  }

  function redo() {
    if (curIndex < history.length - 1) {
      setCurIndex(curIndex=>Math.min(curIndex + 1,history.length - 1))
      setValue(history[curIndex + 1])
    }
  }

  useEffect(() => {
    function handleKeyDown(e) {
      if (inputRef.current && inputRef.current === document.activeElement) {
        if (e.ctrlKey && e.key === 'z') {
          e.preventDefault()
          undo()
        } else if (e.ctrlKey && e.key === 'y') {
          e.preventDefault()
          redo()
        }
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => {
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [undo, redo])

  return [value, set, undo, redo, inputRef]
}

export default useUndoRedo

