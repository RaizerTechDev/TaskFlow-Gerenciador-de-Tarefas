import { useTasks } from "../../contexts/TaskContext";
import { useState } from "react";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";

const TaskItem = ({ task, onDelete }) => {
  const { updateTask } = useTasks();
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState({ ...task });

  const handleStatusChange = async () => {
    try {
      const newStatus = task.status === "pending" ? "completed" : "pending";

      await updateTask(task.id, {
        ...task,
        status: newStatus,
      });
    } catch (error) {
      console.error("Erro ao alterar status:", error);
    }
  };

  const handleSave = async () => {
    await updateTask(task.id, editedTask);
    setIsEditing(false);
  };

  // Função para formatar a data de exibição
  const formatDisplayDate = (dateString) => {
    const options = {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      timeZone: "UTC", // Ignora o fuso horário do navegador
    };
    return new Date(dateString).toLocaleDateString("pt-BR", options);
  };

  return (
    <div
      className={`group bg-white p-5 rounded-xl shadow-sm hover:shadow-md transition-shadow
      border-l-4 mb-4 min-h-[120px] ${
        task.status === "completed" ? "border-green-500" : "border-primary"
      }`}
    >
      {isEditing ? (
        <div className="space-y-3">
          <input
            type="text"
            value={editedTask.title}
            onChange={(e) =>
              setEditedTask({ ...editedTask, title: e.target.value })
            }
            className="input-field"
          />
          <textarea
            value={editedTask.description}
            onChange={(e) =>
              setEditedTask({ ...editedTask, description: e.target.value })
            }
            className="input-field h-20"
          />
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="px-3 py-1 text-gray-600 hover:bg-gray-50 rounded"
            >
              Cancelar
            </button>
            <button
              type="button"
              onClick={handleSave}
              className="btn-primary px-3 py-1"
            >
              Salvar
            </button>
          </div>
        </div>
      ) : (
        <>
          <div className="flex justify-between items-start gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleStatusChange}
                  className={`w-5 h-5 rounded-full border-2 flex items-center justify-center
                    ${
                      task.status === "completed"
                        ? "bg-green-500 border-green-600"
                        : "border-gray-300 hover:border-primary"
                    }`}
                >
                  {task.status === "completed" && (
                    <svg
                      className="w-3 h-3 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      role="img"
                      aria-labelledby="check-icon-title"
                    >
                      <title id="check-icon-title">Task Status</title>
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  )}
                </button>
                <h3
                  className={`mt-1 text-lg font-medium ${
                    task.status === "completed"
                      ? "text-gray-400 line-through"
                      : "text-gray-800"
                  }`}
                >
                  {task.title}
                </h3>
              </div>

              {task.description && (
                <p
                  className={`mt-2 text-gray-600 text-sm ${
                    task.status === "completed" ? "opacity-75 line-through" : ""
                  }`}
                >
                  {task.description}
                </p>
              )}
            </div>

            <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <button
                type="button"
                onClick={() => setIsEditing(true)}
                className="text-gray-400 hover:text-primary p-1.5 rounded-full hover:bg-gray-50"
              >
                <PencilIcon className="w-5 h-5" />
              </button>
              <button
                type="button"
                onClick={() => onDelete(task.id)}
                className="text-gray-400 hover:text-red-500 p-1.5 rounded-full hover:bg-gray-50"
              >
                <TrashIcon className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="mt-4 flex items-center justify-between text-sm">
            <div className="flex items-center gap-2 text-gray-500">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                role="img"
                aria-labelledby="calendar-icon-title"
              >
                <title id="calendar-icon-title">Data da Tarefa</title>
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <span>{formatDisplayDate(task.taskDate)}</span>
            </div>

            <span
              className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                task.status === "completed"
                  ? "bg-green-100 text-green-800"
                  : "bg-orange-100 text-orange-800"
              }`}
            >
              {task.status === "completed" ? "Concluída" : "Pendente"}
            </span>
          </div>
        </>
      )}
    </div>
  );
};

export default TaskItem;
