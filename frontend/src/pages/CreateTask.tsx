import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCreateTask } from "../hooks/useCreateTask";
import { useUsers } from "../hooks/useUsers";

export default function CreateTask() {
  const navigate = useNavigate();
  const { mutate: createTask, isLoading } = useCreateTask();
  const { data: users = [] } = useUsers();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [priority, setPriority] = useState("MEDIUM");
  const [assignedToId, setAssignedToId] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    createTask(
      {
        title,
        description,
        dueDate,
        priority,
        assignedToId: assignedToId || undefined,
      },
      {
        onSuccess: () => {
          navigate("/dashboard");
        },
        onError: (err: any) => {
          alert(err?.response?.data?.message || "Task creation failed");
        },
      }
    );
  };

  return (
    <div className="mx-auto max-w-xl p-6">
      <h1 className="mb-6 text-2xl font-bold">Create Task</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full rounded border p-2"
          required
        />

        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full rounded border p-2"
          rows={4}
          required
        />

        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          className="w-full rounded border p-2"
          required
        />

        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          className="w-full rounded border p-2"
        >
          <option value="LOW">Low</option>
          <option value="MEDIUM">Medium</option>
          <option value="HIGH">High</option>
          <option value="URGENT">Urgent</option>
        </select>

        <select
          value={assignedToId}
          onChange={(e) => setAssignedToId(e.target.value)}
          className="w-full rounded border p-2"
        >
          <option value="">Unassigned</option>
          {users.map((user: any) => (
            <option key={user.id} value={user.id}>
              {user.name} ({user.email})
            </option>
          ))}
        </select>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full rounded bg-blue-600 py-2 text-white"
        >
          {isLoading ? "Creating..." : "Create Task"}
        </button>
      </form>
    </div>
  );
}
