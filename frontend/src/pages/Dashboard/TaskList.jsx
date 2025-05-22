import { useEffect } from "react";
import { useTasks } from "../../contexts/TaskContext";
import TaskItem from "./TaskItem";

const TaskList = () => {
  const { tasks, loading, fetchTasks, updateTask, deleteTask } = useTasks();

  useEffect(() => {
    const loadTasks = async () => {
      await fetchTasks();
    };
    loadTasks();
  }, [fetchTasks]);

  const handleStatusChange = async (task) => {
    const newStatus = task.status === "pending" ? "completed" : "pending";
    await updateTask(task.id, { status: newStatus });
  };

  const handleDelete = async (id) => {
    if (window.confirm("Tem certeza que deseja excluir esta tarefa?")) {
      await deleteTask(id);
    }
  };

  if (loading) return <div className="loading">Carregando...</div>;

  return (
    <div className="task-list pr-2">
      {tasks.length === 0 ? (
        <div className="empty-list">Nenhuma tarefa encontrada!</div>
      ) : (
        tasks.map((task) => (
          <TaskItem
          key={task.id}
          task={task}
          onDelete={handleDelete} 
          onStatusChange={handleStatusChange}
          />          
        ))      
      )}        
    </div>
  );
};

export default TaskList;
