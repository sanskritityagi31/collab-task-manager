import { Calendar, Flag, User } from "lucide-react";

interface TaskCardProps {
  task: {
    id: string;
    title: string;
    description?: string;
    dueDate?: string;
    priority: "LOW" | "MEDIUM" | "HIGH";
    status: "TODO" | "IN_PROGRESS" | "DONE";
    assignee?: {
      name: string;
      email: string;
    };
  };
}

const priorityColor = {
  LOW: "bg-green-100 text-green-700",
  MEDIUM: "bg-yellow-100 text-yellow-700",
  HIGH: "bg-red-100 text-red-700",
};

const statusColor = {
  TODO: "bg-gray-100 text-gray-700",
  IN_PROGRESS: "bg-blue-100 text-blue-700",
  DONE: "bg-purple-100 text-purple-700",
};

export default function TaskCard({ task }: TaskCardProps) {
  return (
    <div className="rounded-lg border bg-white p-4 shadow-sm hover:shadow-md transition">
      {/* Title */}
      <h3 className="text-lg font-semibold text-gray-800">
        {task.title}
      </h3>

      {/* Description */}
      {task.description && (
        <p className="mt-1 text-sm text-gray-600">
          {task.description}
        </p>
      )}

      {/* Meta */}
      <div className="mt-3 flex flex-wrap items-center gap-3 text-sm">
        {/* Priority */}
        <span
          className={`inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs font-medium ${priorityColor[task.priority]}`}
        >
          <Flag size={14} />
          {task.priority}
        </span>

        {/* Status */}
        <span
          className={`inline-flex rounded-full px-2 py-1 text-xs font-medium ${statusColor[task.status]}`}
        >
          {task.status.replace("_", " ")}
        </span>

        {/* Due Date */}
        {task.dueDate && (
          <span className="inline-flex items-center gap-1 text-gray-500">
            <Calendar size={14} />
            {new Date(task.dueDate).toLocaleDateString()}
          </span>
        )}
      </div>

      {/* Assignee */}
      {task.assignee && (
        <div className="mt-3 flex items-center gap-2 text-sm text-gray-600">
          <User size={14} />
          <span>{task.assignee.name}</span>
        </div>
      )}
    </div>
  );
}
