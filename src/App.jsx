import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import { v4 as uuidv4 } from "uuid";

function App() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [showFinished, setShowFinished] = useState(true);
  const [currentTime, setCurrentTime] = useState(new Date());

  // Update the current time every second
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    let todoString = localStorage.getItem("todos");
    if (todoString) {
      let todosFromLS = JSON.parse(todoString);
      setTodos(todosFromLS);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const toggleFinished = () => {
    setShowFinished(!showFinished);
  };

  const handleEdit = (e, id) => {
    let t = todos.filter((i) => i.id === id);
    setTodo(t[0].todo);
    let newTodos = todos.filter((item) => item.id !== id);
    setTodos(newTodos);
  };

  const handleDelete = (e, id) => {
    let newTodos = todos.filter((item) => item.id !== id);
    setTodos(newTodos);
  };

  const handleAdd = () => {
    if (todo.length >= 3) {
      const newTodo = {
        id: uuidv4(),
        todo,
        isCompleted: false,
        timestamp: new Date().toLocaleString(),
      };
      setTodos([...todos, newTodo]);
      setTodo("");
    }
  };

  const handleChange = (e) => {
    setTodo(e.target.value);
  };

  const handleCheckbox = (e) => {
    let id = e.target.name;
    let index = todos.findIndex((item) => item.id === id);
    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos);
  };

    return (
      <>
        <div className="min-h-screen bg-[#F5F7FA] text-[#2B2B2B]">
          <Navbar />
          <div className="container mx-auto my-5 p-5 w-full max-w-3xl bg-[#E3EAF2] rounded-xl shadow-lg">
            {/* Current date and time */}
            <div className="mb-4 text-center">
              <h3 className="text-lg font-bold text-[#2B2B2B]">
                {currentTime.toLocaleString()}
              </h3>
            </div>
  
            {/* Title */}
            <div className="text-center">
              <h1 className="my-5 text-2xl font-serif font-bold text-[#2B2B2B]">
                Add a To Do's <i className="fa-regular fa-face-smile"></i>
              </h1>
            </div>
  
            {/* Input field */}
            <div className="flex justify-center mb-3">
              <input
                onChange={handleChange}
                value={todo}
                type="text"
                className="w-full max-w-md px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-[#3A6EA5]"
                placeholder="Enter your task..."
                onKeyDown={(e) => {
                  if (e.key === "Enter" && todo.length >= 3) {
                    handleAdd();
                  }
                }}
              />
            </div>
  
            {/* Toggle finished tasks */}
            <div className="flex items-center justify-center mb-5">
              <label className="flex items-center gap-2">
                <input
                  onChange={toggleFinished}
                  type="checkbox"
                  checked={showFinished}
                  className="form-checkbox"
                />
                <span>Show Finished</span>
              </label>
            </div>
  
            {/* Task List */}
            <h2 className="mb-3 font-serif text-lg font-bold text-center">
              Your To Do's
            </h2>
            <div className="todos">
              {todos.length === 0 ? (
                <div className="flex flex-col items-center gap-2 py-10 text-[#2B2B2B]">
                  <p>No To Do's To Display</p>
                  <i className="text-xl fa-regular fa-face-frown-open"></i>
                </div>
              ) : (
                todos
                  .filter((item) => showFinished || !item.isCompleted)
                  .map((item) => (
                    <div
                      className="flex items-center justify-between p-3 mb-3 bg-white rounded-md shadow-sm"
                      key={item.id}
                    >
                      <div className="flex items-center gap-3">
                        <input
                          name={item.id}
                          onChange={handleCheckbox}
                          type="checkbox"
                          checked={item.isCompleted}
                          className="form-checkbox"
                        />
                        <span
                          className={`${
                            item.isCompleted ? "line-through text-gray-500" : ""
                          }`}
                        >
                          {item.todo}
                        </span>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={(e) => handleEdit(e, item.id)}
                          className="px-3 py-1 text-sm font-bold text-white bg-blue-600 rounded-md hover:bg-blue-700"
                        >
                          <i className="fa-regular fa-pen-to-square"></i>
                        </button>
                        <button
                          onClick={(e) => handleDelete(e, item.id)}
                          className="px-3 py-1 text-sm font-bold text-white bg-red-600 rounded-md hover:bg-red-700"
                        >
                          <i className="fa-solid fa-trash"></i>
                        </button>
                      </div>
                    </div>
                  ))
              )}
            </div>
  
            {/* Add Task Button */}
            <div className="flex justify-center mt-5">
              <button
                onClick={handleAdd}
                disabled={todo.length < 3}
                className="w-16 h-16 text-white bg-blue-600 rounded-full hover:bg-blue-700 disabled:opacity-50"
              >
                <i className="fa-regular fa-floppy-disk"></i>
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }
  
  export default App;
  
