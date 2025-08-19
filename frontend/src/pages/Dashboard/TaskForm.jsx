import { useState } from "react";
import { useTasks } from "../../contexts/TaskContext";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const TaskForm = ({ onCancel, taskToEdit }) => {

  const [task, setTask] = useState({
    title: taskToEdit?.title || "",
    description: taskToEdit?.description || "",
    // biome-ignore lint/correctness/noInvalidUseBeforeDeclaration: <explanation>
    taskDate: taskToEdit?.taskDate ? formatDateForInput(taskToEdit.taskDate) : ""
  });

  const { addTask, fetchTasks, updateTask } = useTasks();
  const { user } = useAuth();
  const navigate = useNavigate();
  
    // Função para formatar a data da tarefa vindo do backend
    const formatDateForInput = (dateString) => {
      const date = new Date(dateString);
      const offset = date.getTimezoneOffset() * 60000; // Ajuste de fuso horário
      const localDate = new Date(date - offset);
      return localDate.toISOString().split('T')[0];
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
    
      // Verificação de usuário logado
      if (!user) {
        const confirmLogin = window.confirm(
          "Você precisa estar logado para gerenciar tarefas!\n\nDeseja fazer login agora?"
        );
    
        if (confirmLogin) {
          navigate("/login", { state: { from: "/dashboard" } });
        }
        return;
      }

      try {
        const taskData = {
          title: task.title,
          description: task.description,
          taskDate: task.taskDate || null,
          userId: user.id
        };
  
        if (taskToEdit) {
          await updateTask(taskToEdit.id, taskData);
          toast.success('Tarefa atualizada com sucesso!');
        } else {
          await addTask(taskData);
          toast.success('Tarefa criada com sucesso!');
        }
  
        await fetchTasks();
        onCancel();
      } catch (error) {
        console.error("Erro ao salvar tarefa:", error);
        toast.error(error.message || 'Erro ao salvar tarefa');
      }
    };

  return (
    <form 
      onSubmit={handleSubmit}
      className="custom-bg p-0 rounded-xl shadow-lg border border-gray-100"
    >
      <h2 className="text-new-task font-bold text-gray-800 mb-6 border-b pb-4">
        {taskToEdit ? "✏️ Editar Tarefa" : "✍️ Nova Tarefa"}
      </h2>

      <div className="space-y-5">
        <div>
          <label
            htmlFor="title"
            className="block text-sm font-medium text-form mb-2" 
          >
            Título*
          </label>
          <input
            type="text"
            id="title"
             className="input-field placeholder:text-lg placeholder:text-gray-400 focus:ring-2 focus:ring-primary/50"
            placeholder="Digite o título da tarefa"
            value={task.title}
            onChange={(e) => setTask({ ...task, title: e.target.value })}
            required
          />
        </div>

        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium text-form mb-2"
          >
            Descrição
          </label>
          <textarea
            id="description"
            className="input-field placeholder:text-lg h-15 focus:ring-2 focus:ring-primary/50"
            placeholder="Adicione detalhes importantes..."
            value={task.description}
            onChange={(e) => setTask({ ...task, description: e.target.value })}
          />
        </div>

        <div>
          <label
            htmlFor="taskDate"
            className="block text-sm font-medium text-form mb-2"
          >
            Data da Tarefa
          </label>
          <input
            type="date"
            id="taskDate"
            className="input-field focus:ring-2 focus:ring-primary/50"
            value={task.taskDate}
            onChange={(e) => setTask({ ...task, taskDate: e.target.value })}
            min={new Date().toISOString().split('T')[0]} // Opcional: data mínima = hoje
          />
        </div>

        <div className="flex justify-end gap-3 pt-4 border-t">
          <button
            type="button"
            onClick={onCancel}
            className="px-5 py-2.5 text-sm font-medium text-gray-600 hover:text-gray-800 
              bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="btn-primary px-5 py-2.5 text-sm font-medium rounded-lg 
              hover:bg-primary/90 transition-colors"
          >
            {taskToEdit ? "Salvar Alterações" : "Criar Tarefa"}
          </button>
        </div>
      </div>
    </form>
  );
};

export default TaskForm;