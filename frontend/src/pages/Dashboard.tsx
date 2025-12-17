import TaskCard from "../components/TaskCard";
import { useMe } from "../hooks/useMe";
import { useTasks } from "../hooks/useTasks";
import { useSocketNotifications } from "../hooks/useSocketNotifications";

export default function Dashboard() {
  const { data: me, isLoading: meLoading } = useMe();
  const {
    data: tasks = [],
    isLoading: tasksLoading,
    refetch,
  } = useTasks();

  /* 🔴 REAL-TIME UPDATES */
  useSocketNotifications(() => {
    refetch();
  });

  if (meLoading || tasksLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center text-gray-600">
        Loading dashboard...
      </div>
    );
  }

  const now = new Date();

  const assignedToMe = tasks.filter(
    (t: any) => t.assignedToId === me?.id
  );

  const createdByMe = tasks.filter(
    (t: any) => t.creatorId === me?.id
  );

  const overdueTasks = tasks.filter(
    (t: any) =>
      t.dueDate &&
      new Date(t.dueDate) < now &&
      t.status !== "COMPLETED"
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="border-b bg-white px-6 py-4">
        <h1 className="text-2xl font-bold text-gray-800">
          Welcome, {me?.name} 👋
        </h1>
      </header>

      <main className="mx-auto max-w-6xl space-y-10 px-6 py-6">
        {/* Assigned to Me */}
        <section>
          <h2 className="mb-4 text-xl font-semibold">
            Assigned to Me
          </h2>

          {assignedToMe.length === 0 ? (
            <p className="text-gray-500">
              🎉 No tasks assigned to you
            </p>
          ) : (
            <div className="grid gap-4 md:grid-cols-2">
              {assignedToMe.map((task: any) => (
                <TaskCard key={task.id} task={task} />
              ))}
            </div>
          )}
        </section>

        {/* Created by Me */}
        <section>
          <h2 className="mb-4 text-xl font-semibold">
            Created by Me
          </h2>

          {createdByMe.length === 0 ? (
            <p className="text-gray-500">
              ✍️ You haven’t created any tasks yet
            </p>
          ) : (
            <div className="grid gap-4 md:grid-cols-2">
              {createdByMe.map((task: any) => (
                <TaskCard key={task.id} task={task} />
              ))}
            </div>
          )}
        </section>

        {/* Overdue Tasks */}
        <section>
          <h2 className="mb-4 text-xl font-semibold text-red-600">
            Overdue Tasks
          </h2>

          {overdueTasks.length === 0 ? (
            <p className="text-gray-500">
              ✅ No overdue tasks
            </p>
          ) : (
            <div className="grid gap-4 md:grid-cols-2">
              {overdueTasks.map((task: any) => (
                <TaskCard key={task.id} task={task} />
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
