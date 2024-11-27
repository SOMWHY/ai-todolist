import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Star from "../ui/Star";
import CheckBox from "../ui/CheckBox";
import DeleteButton from "../ui/DeleteButton";

import gsap from "gsap";
import {  useCallback, useLayoutEffect, useRef } from "react";

export default function TodoItem({ id, completed, editable, content, time, deadline, important, setTodos, todos }) {
  const textRef = useRef(null);

  const measureTextWidth = useCallback((text) => {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    if (context) {
      context.font = window.getComputedStyle(textRef.current).font;
      return context.measureText(text).width;
    }
    return 0;
  }, []);

  function handleDragStart() {
    setTodos(curTodos => curTodos.map(todo => todo.id === id ? { ...todo, active: true } : todo));
  }

  function handleDragEnd() {
    setTodos(curTodos => curTodos.map(todo => todo.id === id ? { ...todo, active: false } : todo));
  }

  function handleConfirmEdit(e) {
    if (e.key === "Enter") 
      setTodos(curTodos => curTodos.map(todo => todo.id === id ? {
        ...todo, 
        content: e.target.textContent === todos?.find(t => t?.content === e.target.textContent)?.content ?
          "Please edit this todo for a non-repetitive version" :
          e.target.textContent || "",
        editable: false
      } : todo));
  }

  function handleStarItem(id, important) {
    setTodos(curTodos => curTodos.map(todo => todo.id === id ? { ...todo, important } : todo));
  }

  function handleCheckItem(id, completed) {
    setTodos(curTodos => curTodos.map(todo => todo.id === id ? { ...todo, completed } : todo));

    if (textRef.current) {
      const textWidth = measureTextWidth(content);
      gsap.to(textRef.current, {
        duration: 0.3,
        backgroundSize: completed ? `${textWidth}px 1px` : "0px 1px",
        ease: "power2.inOut"
      });
    }
  }

  function handleDeleteItem(id) {
    setTodos(curTodos => curTodos.filter(todo => todo.id !== id));
  }

  function handleEditable(id) {
    setTodos(curTodos => curTodos.map(todo => todo.id === id ? { ...todo, editable: true } : todo));
  }

  function handleDeadline(id, date) {
    setTodos((curTodos) =>
      curTodos.map((todo) =>
        todo.id === id ? { ...todo, deadline: date } : todo
      )
    );
  }

  useLayoutEffect(() => {
    if (textRef.current) {
      const textWidth = measureTextWidth(content);
      gsap.set(textRef.current, {
        backgroundImage: "linear-gradient(to right, currentColor, currentColor)",
        backgroundSize: completed ? `${textWidth}px 1px` : "0px 1px",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "left center",
        display: "inline",
        paddingBottom: "2px"
      });
    }
  }, [completed, content, measureTextWidth]);

  return (
    <li 
      draggable
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragOver={e => e.preventDefault()}
      className="form-list-item"
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-8">
          <CheckBox id={id} checked={completed} onChange={handleCheckItem} />
          <Star onStarItem={handleStarItem} id={id} important={important} />
        </div>
        <DeleteButton
          onClick={() => handleDeleteItem(id)}
          className="bg-malibu-950 rounded-lg flex-center p-2 text-cerise-red-500 hover:text-cerise-red-700 transition-colors duration-200"
        />
      </div>
      <p
        ref={textRef}
        contentEditable={editable}
        onDoubleClick={() => handleEditable(id)}
        onKeyDown={(e) => handleConfirmEdit(e)}
        className={`mb-3 text-lg inline ${
          completed
            ? "text-malibu-950/50 dark:text-malibu-300/50"
            : "text-malibu-950 dark:text-malibu-300"
        } transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 rounded`}
      >
        {content}
      </p>
      <DatePicker
        showDisabledMonthNavigation
        closeOnScroll={true}
        minDate={new Date(time)}
        startDate={new Date(time)}
        endDate={null}
        dateFormat="yyyy/MM/dd" 
        selected={deadline}
        onChange={(date) => handleDeadline(id, date)} 
        placeholderText="set a deadline"
        className="mx-2 pl-3 py-1 tracking-wide bg-malibu-700 
        dark:bg-malibu-950
        text-malibu-200 border border-malibu-100/60 rounded-md focus:outline-none focus:ring-1 focus:ring-malibu-300 focus:border-transparent"
      />
    </li>
  );
}



