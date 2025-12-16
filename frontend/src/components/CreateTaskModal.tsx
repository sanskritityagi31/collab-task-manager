import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useCreateTask } from "../hooks/useCreateTask";
import { useQuery } from "@tanstack/react-query";
import api from "../lib/api";

const schema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  dueDate: z.string().min(1, "Due date is required"),
  priority: z.enum(["LOW", "MEDIUM", "HIGH", "URGENT"]),
  assignedToId: z.string().uuid("Please select a user"),
});

type FormData = z.infer<typeof schema>;

export default function CreateTaskModal({
  onClose,
}: {
  onClose: () => void;
}) {
  const { mutateAsync, isLoading } = useCreateTask();

  /* ---------------- FETCH USERS ---------------- */

  const { data: users = [], isLoading: usersLoading } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await api.get("/api/users");
      return res.data;
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    await mutateAsync(data);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-gray-900 p-6 rounded w-full max-w-md text-white"
      >
        <h2 className="text-xl font-bold mb-4">Create Task</h2>

        {/* Title */}
        <input
          {...register("title")}
          placeholder="Title"
          className="w-full p-2 mb-2 bg-gray-800 rounded"
        />
        {errors.title && (
          <p className="text-red-400 text-sm">{errors.title.message}</p>
        )}

        {/* Description */}
        <textarea
          {...register("description")}
          placeholder="Description"
          className="w-full p-2 mb-2 bg-gray-800 rounded"
        />
        {errors.description && (
          <p className="text-red-400 text-sm">
            {errors.description.message}
          </p>
        )}

        {/* Due Date */}
        <input
          type="datetime-local"
          {...register("dueDate")}
          className="w-full p-2 mb-2 bg-gray-800 rounded"
        />
        {errors.dueDate && (
          <p className="text-red-400 text-sm">{errors.dueDate.message}</p>
        )}

        {/* Priority */}
        <select
          {...register("priority")}
          className="w-full p-2 mb-2 bg-gray-800 rounded"
        >
          <option value="LOW">Low</option>
          <option value="MEDIUM">Medium</option>
          <option value="HIGH">High</option>
          <option value="URGENT">Urgent</option>
        </select>

        {/* Assigned User Dropdown */}
        <select
          {...register("assignedToId")}
          className="w-full p-2 mb-3 bg-gray-800 rounded"
          disabled={usersLoading}
        >
          <option value="">Assign to user</option>
          {users.map((user: any) => (
            <option key={user.id} value={user.id}>
              {user.name} ({user.email})
            </option>
          ))}
        </select>
        {errors.assignedToId && (
          <p className="text-red-400 text-sm">
            {errors.assignedToId.message}
          </p>
        )}

        {/* Buttons */}
        <div className="flex gap-2 mt-4">
          <button
            disabled={isLoading}
            className="bg-blue-600 px-4 py-2 rounded"
          >
            Create
          </button>
          <button
            type="button"
            onClick={onClose}
            className="bg-gray-700 px-4 py-2 rounded"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
