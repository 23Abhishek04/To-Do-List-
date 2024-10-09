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
      <div className="h-screen bg-[#F5F7FA] text-[#2B2B2B]">
        <Navbar />
        <div className="container min-h-[80vh] w-4/12 p-5 mx-auto my-5 bg-[#E3EAF2] rounded-xl">
          {/* Display current date and time */}
          <div className="flex justify-center">
            <h3 className="text-lg font-bold text-[#2B2B2B]">{currentTime.toLocaleString()}</h3>
          </div>
          <div className="flex justify-center">
            <h1 className="my-5 mb-2 font-serif text-xl font-bold text-[#2B2B2B]">
              Add a To Do's <i className="fa-regular fa-face-smile"></i>
            </h1>
          </div>
          <div className="flex justify-center my-5 mt-0 mb-3">
            <input
              onChange={handleChange}
              value={todo}
              type="text"
              className="w-1/2 pl-3 rounded-xl"
              onKeyDown={(e) => {
                if (e.key === 'Enter' && todo.length >= 3) {
                  handleAdd();
                }
              }}
            />
          </div>
          <div className="mb-3 ml-28">
            <input
              onChange={toggleFinished}
              type="checkbox"
              checked={showFinished}
            />{" "}
            Show Finished
          </div>

          <h2 className="flex justify-center font-serif text-lg font-bold text-[#2B2B2B]">
            Your To Do's
          </h2>
          <div className="todos">
            {todos.length === 0 && (
              <div className="flex items-center justify-center gap-2 m-5 font-light h-72 text-[#2B2B2B]">
                No To Do's To Display <i className="fa-regular fa-face-frown-open"></i>
              </div>
            )}
            {todos
              .filter((item) => showFinished || !item.isCompleted)
              .map((item) => (
                <div className="flex justify-center" key={item.id}>
                  <div className="flex items-center justify-between w-full px-4 my-3 mt-5 todo">
                    <div className="flex items-center gap-4">
                      {/* Checkbox */}
                      <input
                        name={item.id}
                        onChange={handleCheckbox}
                        type="checkbox"
                        checked={item.isCompleted}
                      />
                      {/* Task Text */}
                      <div className={item.isCompleted ? "line-through" : ""}>
                        {item.todo}
                      </div>
                    </div>
                    {/* Edit and Delete Buttons */}
                    <div className="flex gap-2">
                      <button
                        onClick={(e) => handleEdit(e, item.id)}
                        className="p-2 py-1 text-sm font-bold text-white rounded-md bg-[#3A6EA5] hover:bg-[#91d5f0] disabled:bg-[#3A6EA5]"
                      >
                        <i className="fa-regular fa-pen-to-square"></i>
                      </button>
                      <button
                        onClick={(e) => handleDelete(e, item.id)}
                        className="p-2 py-1 text-sm font-bold text-white rounded-md bg-[#3A6EA5] hover:bg-[#91d5f0] disabled:bg-[#3A6EA5]"
                      >
                        <i className="fa-solid fa-trash"></i>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
          </div>
          <div className="flex justify-center">
            <button
              onClick={handleAdd}
              disabled={todo.length < 3}
              className="w-16 h-16 p-2 py-1 mx-6 text-sm text-white rounded-full bg-[#3A6EA5] hover:bg-[#91d5f0] disabled:bg-[#3A6EA5]"
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
