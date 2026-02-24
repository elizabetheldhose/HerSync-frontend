export default function TaskCard({ task, updateStatus }) {
  return (
    <div className="task-card">
      <h4>{task.title}</h4>
      <p>{task.description}</p>
      <span>{task.status}</span>

 
      <button onClick={() => updateStatus(task)}>
        Toggle Status
      </button>
    </div>
  );
}
