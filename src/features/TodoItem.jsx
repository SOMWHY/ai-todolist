import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Star from "../ui/Star";
import Button from "../ui/Button";

export default function TodoItem({ id, completed, editable, content, time, deadline, important, setTodos, todos }) {
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
          <label htmlFor={`check-item-${id}`} className="relative">
            <input
              type="checkbox"
              id={`check-item-${id}`}
              onChange={(e) => handleCheckItem(id, e.target.checked)}
              checked={completed}
              className="sr-only peer"
            />
            <div className="w-6 h-6 border-2 border-malibu-950 rounded-full dark:border-malibu-500/80
            peer-checked:bg-malibu-500
            dark:peer-checked:bg-malibu-600 
            peer-checked:border-malibu-500 
            dark:peer-checked:border-malibu-600
            transition-all duration-200 ease-in-out"></div>
            <svg
              className="absolute w-4 h-4 text-malibu-100 top-1 left-1 pointer-events-none hidden peer-checked:block"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
          </label>
          <Star onStarItem={handleStarItem} id={id} important={important} />
        </div>
        <Button
          onClick={() => handleDeleteItem(id)}
          mode="delete"
          className="bg-malibu-950 rounded-lg flex-center p-2 text-cerise-red-500 hover:text-cerise-red-700 transition-colors duration-200"
        />
      </div>
      <p
        contentEditable={editable}
        onDoubleClick={() => handleEditable(id)}
        onKeyDown={(e) => handleConfirmEdit(e)}
        className={`mb-3 text-lg ${
          completed
            ? "text-malibu-950/50 dark:text-malibu-300/50 line-through"
            : "text-malibu-950 dark:text-malibu-300"
        } transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 rounded px-2 py-1`}
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

