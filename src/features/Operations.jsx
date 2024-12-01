import { useState } from "react";
import Modal from "../ui/Modal"
import Button from "../ui/Button"
import Select from "../ui/Select"

export default function Operations({ setTodos, todos, orderBy, setOrderBy }) {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  function handleClearItems() {
    handleCloseModal();
    setTodos([]);
  }

  function handleCloseModal() {
    setModalIsOpen(false);
  }

  function handleOrderBy(e) {
    setOrderBy(e.target.value);
    // Force a re-sort by creating a new array
    setTodos([...todos]);
  }

  return (
    <>
      {modalIsOpen && (
        <Modal onConfirm={handleClearItems} onCancel={handleCloseModal}>
          <header>
            <h1 className="text-cerise-red-700 font-extrabold">Warning</h1>
          </header>
          <main className="text-malibu-950 dark:text-malibu-200 tracking-wide">
            <p>Are you sure to clear all todos?</p>
          </main>
        </Modal>
      )}
      <div className="flex-center gap-3 rounded-md bg-malibu-200 w-full h-[15%] p-3 dark:bg-malibu-950">
        <Button 
        type="button"
          onClick={() => setModalIsOpen(true)}
          mode="clear" 
          className="text-malibu-300 w-[15%] h-[80%] max-w-24 rounded-2xl bg-cerise-red-700 dark:bg-cerise-red-500"
        />
        <Select 
          name="orderBy" 
          className="bg-malibu-100 text-xl text-malibu-950 dark:bg-malibu-950 dark:text-malibu-200 dark:hover:bg-malibu-800 font-medium ml-6 hover:bg-malibu-300"
          value={orderBy}
          onChange={handleOrderBy}
        >
          <option value="default">Default</option>
          <option value="reversed">Reversed</option>
          <option value="byDeadline">ByDeadline</option>
          <option value="byCompleted">ByCompleted</option>
          <option value="byImportance">ByImportance</option>
          <option value="dragToSort">DragToSort</option>
        </Select>
      </div>
    </>
  );
}

