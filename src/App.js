import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./app.css";
import Task from "./Task";
import TaskHookForm from "./TaskHookForm";
import PeopleForm from "./PeopleForm";
import { initialTasks, initialTeam } from "./data";

function App() {
  const [tasks, setTasks] = useState(initialTasks);
  const [team, setTeam] = useState(initialTeam);

  function handleTaskSubmit(yeniTask) {
    setTasks([yeniTask, ...tasks]);
    toast.success("Yeni Task Eklendi!", { position: toast.POSITION.TOP_LEFT });
  }

  function handlePeopleSubmit(yeniKisi) {
    setTeam([...team, yeniKisi]);
    toast.success("Yeni Kişi Eklendi!", { position: toast.POSITION.TOP_CENTER });
  }

  function handleComplete(id) {
    setTasks((prevTasks) =>
      prevTasks.map((task) => {
        if (task.id === id) {
          return { ...task, status: "yapıldı" };

        }
        return task;
      })
    );
    toast.success("Görev Tamamlandı", { position: toast.POSITION.TOP_RIGHT });
  }

 
  function handleCompleteWithNotification(id) {
    handleComplete(id);
    toast.success("Görev Yapıldı", { position: toast.POSITION.TOP_RIGHT });
  }
  

  return (
    <div className="app">
      <div className="formColumn">
        <div className="form-container">
          <h2>Yeni Task</h2>
          <TaskHookForm kisiler={team} submitFn={handleTaskSubmit} />
        </div>

        <div className="form-container">
          <h2>Yeni Kişi</h2>
          <PeopleForm kisiler={team} submitFn={handlePeopleSubmit} />
        </div>
      </div>
      <div className="columns">
        <div className="column">
          <h2 className="column-title">Yapılacaklar</h2>
          <div className="column-list">
            {tasks
              .filter((t) => t.status === "yapılacak")
              .map((t) => (
                <Task key={t.id} taskObj={t} onComplete={handleComplete} />
              ))}
              

          </div>
        </div>
        <div className="column">
          <h2 className="column-title">Tamamlananlar</h2>
          <div className="column-list">
          {tasks
            .filter((t) => t.status === "yapıldı")
           .map((t) => (
          <Task key={t.id} taskObj={t} onComplete={handleCompleteWithNotification} />))} 
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default App;
