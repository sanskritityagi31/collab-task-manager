import { TaskService } from "../services/task.service";
import { TaskRepository } from "../repositories/task.repository";
import prisma from "../prisma";

/* ---------------- MOCKS ---------------- */
jest.mock("../server", () => ({
  getIO: () => ({
    emit: jest.fn(),
  }),
}));


jest.mock("../prisma", () => ({
  notification: {
    create: jest.fn(),
  },
}));

jest.mock("../repositories/task.repository", () => ({
  TaskRepository: {
    create: jest.fn(),
    update: jest.fn(),
    findAll: jest.fn(),
  },
}));

describe("TaskService", () => {
  const userId = "user-123";

  const mockTask = {
    id: "task-1",
    title: "Test Task",
    description: "Test Desc",
    dueDate: new Date(),
    priority: "MEDIUM",
    status: "TODO",
    creatorId: userId,
    assignedToId: userId,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  /* ---------------- TEST 1 ---------------- */
  it("creates a task with default TODO status", async () => {
    (TaskRepository.create as jest.Mock).mockResolvedValue(
      mockTask
    );

    const result = await TaskService.createTask(userId, {
      title: "Test Task",
      description: "Test Desc",
      dueDate: new Date().toISOString(),
      priority: "MEDIUM",
    });

    expect(TaskRepository.create).toHaveBeenCalled();
    expect(result.status).toBe("TODO");
  });

  /* ---------------- TEST 2 ---------------- */
  it("creates notification when assigning task to another user", async () => {
    (TaskRepository.create as jest.Mock).mockResolvedValue({
      ...mockTask,
      assignedToId: "user-456",
    });

    await TaskService.createTask(userId, {
      title: "Assigned Task",
      description: "Assigned Desc",
      dueDate: new Date().toISOString(),
      priority: "HIGH",
      assignedToId: "user-456",
    });

    expect(prisma.notification.create).toHaveBeenCalled();
  });

  /* ---------------- TEST 3 ---------------- */
  it("returns all tasks", async () => {
    (TaskRepository.findAll as jest.Mock).mockResolvedValue([
      mockTask,
    ]);

    const tasks = await TaskService.getTasks();

    expect(TaskRepository.findAll).toHaveBeenCalled();
    expect(tasks.length).toBeGreaterThan(0);
  });
});
