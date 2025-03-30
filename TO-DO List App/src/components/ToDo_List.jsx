import React, { useEffect, useState } from "react";

function ToDo_List() {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState("");
    const [completedTask, setCompletedTask] = useState([]);

    useEffect(() => {
        const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
        const savedCompleted = JSON.parse(localStorage.getItem("completedTask")) || [];
        setTasks(savedTasks);
        setCompletedTask(savedCompleted);
    }, []);

    useEffect(() => {
        if (tasks.length > 0) {
            localStorage.setItem("tasks", JSON.stringify(tasks));
        }
        if (completedTask.length > 0) {
            localStorage.setItem("completedTask", JSON.stringify(completedTask));
        }
    }, [tasks, completedTask]); 

    function handleInputChange(event) {
        setNewTask(event.target.value);
    }

    function addTask() {
        if (newTask.trim() !== "" && !tasks.includes(newTask)) {
            setTasks([...tasks, newTask]);
            setNewTask("");
        }
    }

    function deleteTask(taskToDelete) {
        const updatedTasks = tasks.filter(task => task !== taskToDelete);
        setTasks(updatedTasks);
        setCompletedTask(completedTask.filter(task => task !== taskToDelete)); 
    }

    function toggleCompletedTask(task) {
        if (completedTask.includes(task)) {
            setCompletedTask(completedTask.filter(t => t !== task));
        } else {
            setCompletedTask([...completedTask, task]);
        }
    }

    return (
        <div className="container">
            <h1>To-Do List</h1>

            <div className="input">
                <input
                    type="text"
                    placeholder="Add a task"
                    value={newTask}
                    onChange={handleInputChange}
                />
                <button className="add-btn" onClick={addTask}>
                    Add
                </button>
            </div>

            <div className="task-list">
                {tasks.map((task, index) => (
                    <div className={`task ${completedTask.includes(task) ? "done" : ""}`} key={task}>
                        <span className={`list-num ${completedTask.includes(task) ? "done" : ""}`}>
                            {index + 1}.
                        </span>
                        <span className="text">{task}</span>
                        <div className="btn">
                            <button className="delete-btn" onClick={() => deleteTask(task)}>
                                Delete
                            </button>
                            <button className="complete-btn" onClick={() => toggleCompletedTask(task)}>
                                {completedTask.includes(task) ? "Undo" : "Done"}
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ToDo_List;
