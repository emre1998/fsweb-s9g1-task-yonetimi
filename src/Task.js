import React,{useState} from "react";

const Task = ({ taskObj, onComplete }) => {
  const [status,setStatus] = useState(taskObj.status);

const handleComplete =() => {
  if(status ==="tamamlandı"){
    setStatus("yapıldı");
  }else{
    setStatus("tamamlandı");
    onComplete(taskObj.id);
  }
};

  return (
    <div className="task">
      <h3>{taskObj.title}</h3>
      <p>{taskObj.description}</p>
      <div>
        {taskObj.people.map((p) => (
          <span className="pill" key={p}>{p}</span>
        ))}
      </div>
      <button onClick={handleComplete}>{status === "tamamlandı" ? "Yapıldı":"Tamamlandı"}</button>
    </div>
  );
};

export default Task;
