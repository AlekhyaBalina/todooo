import React, { useState, useEffect } from "react";

function App() {
  const [task, setTask] = useState('');
  const [todoList, setTodoList] = useState([]);
  const [doneList, setDoneList] = useState([]);
  const [showDone, setShowDone] = useState(false); // 👈 new state

  // Load from localStorage
  useEffect(() => {
    const savedTodos = JSON.parse(localStorage.getItem('todos'));
    const savedDone = JSON.parse(localStorage.getItem('done'));
    if (savedTodos) setTodoList(savedTodos);
    if (savedDone) setDoneList(savedDone);
  }, []);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todoList));
  }, [todoList]);

  useEffect(() => {
    localStorage.setItem('done', JSON.stringify(doneList));
  }, [doneList]);

  const handleAdd = () => {
    if (task.trim() === '') return;
    setTodoList([...todoList, task]);
    setTask('');
  };

  const handleRemove = (index) => {
    const newList = [...todoList];
    newList.splice(index, 1);
    setTodoList(newList);
  };

  const handleDone = (index) => {
    const item = todoList[index];
    const newList = [...todoList];
    newList.splice(index, 1);
    setTodoList(newList);
    setDoneList([...doneList, item]);
  };

  useEffect(() => {
    console.log("✅ Done List Updated:", doneList);
  }, [doneList]);

  const handleReset = () => {
    setTodoList([]);
    setDoneList([]);
    localStorage.removeItem('todos');
    localStorage.removeItem('done');
  };

  let headingText = "";
  if (todoList.length === 0 && doneList.length === 0) {
    headingText = "➕ Add tasks to complete";
  } else if (todoList.length > 0) {
    headingText = "📌 Tasks to complete";
  } else if (todoList.length === 0 && doneList.length > 0) {
    headingText = "🎉 Hurray! You completed all the tasks";
  }

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4 text-center">Just do it</h1>

        <div className="flex items-center space-x-3 mb-6">
          <input
            type="text"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            placeholder="Enter a task"
            className="flex-grow px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            onClick={handleAdd}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Add
          </button>
        </div>

        <h2 className="text-xl font-semibold mb-2">📋 Tasks</h2>
        <ul className="space-y-2 mb-6">
          {todoList.map((item, index) => (
            <li key={index} className="flex justify-between items-center bg-gray-200 p-2 rounded">
              <span>{item}</span>
              <div className="space-x-2">
                <button
                  onClick={() => handleDone(index)}
                  className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600"
                >
                  <div className="flex">
                    <img src="/done.png" className="w-5 h-5" alt="done" /> done
                  </div>
                </button>
                <button
                  onClick={() => handleRemove(index)}
                  className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                >
                  <div className="flex">
                    <img src="/remove.png" className="w-4 h-4 mt-1 mx-1" alt="remove" /> Remove
                  </div>
                </button>
                
              </div>
            </li>
          ))}
        </ul>

        <h2 className="text-xl font-semibold mb-4 text-green-600">{headingText}</h2>

        {/* ✅ Done tasks toggle button */}
        <button
          onClick={() => setShowDone(!showDone)}
          className="mb-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          {showDone ? "Hide Done Tasks" : "Show Done Tasks"}
        </button>
        <button
  onClick={handleReset}
  className="mx-2 mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
>
   Reset All Tasks
</button>

        {/* ✅ Conditional rendering for done tasks */}
        {showDone && (
          <ul className="space-y-2">
            {doneList.map((item, index) => (
              <li key={index} className="text-green-700 font-medium bg-green-100 p-2 rounded">
                {item}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default App;
