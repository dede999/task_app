import AttemptModel from "./attempt";
import { PrismaClient } from "@prisma/client";

export enum TaskStatus {
  IDLE,
  READY,
  PROCESSING,
  DONE,
  ERROR,
}

export type Task = {
  title: string;
  id: string;
  url: string | null;
  userEmail: string;
  status: TaskStatus;
  attempts: AttemptModel[];  
}

export class TaskModel {
  title: string = "";
  id: string = "";
  url?: string;
  userEmail: string;
  attempts: AttemptModel[] = [];
  status: TaskStatus = TaskStatus.IDLE;

  private static client = new PrismaClient()

  static async getTasks(email: string): Promise<Task[]> {
    const tasks = await TaskModel.client.task.findMany({
      where: {
        userEmail: email
      },
      include: {
        attempts: true
      }
    })

    return tasks.map((task) => ({
      title: task.title,
      id: task.id,
      url: task.url,
      userEmail: task.userEmail,
      attempts: task.attempts,
      status: task.status
    }))
  }
  
  constructor(userMail: string) {
    this.userEmail = userMail;
  }

  async save() {
    const saved = TaskModel.client.task.upsert({
      where: {
        id: this.id
      },
      create: {
        title: this.title,
        url: this.url,
        userEmail: this.userEmail,
        status: this.status
      },
      update: {
        title: this.title,
        status: this.status,
        url: this.url
      }
    })

    return saved
  }

  async setUrl(url: string) {
    this.url = url;
    this.setStatus(TaskStatus.READY)

    await this.save()
  }

  setStatus(status: TaskStatus) {
    this.status = status;
  }

  isExecutable() {
    return this.status === TaskStatus.READY || this.status === TaskStatus.ERROR
  }

  async loadTaskAttempts() {
    if (this.id === undefined) {
      return []
    }

    return TaskModel.client.attempt.findMany({
      where: {
        taskId: this.id
      }
    })
  }

  async deleteTask() {
    if (this.id === undefined) {
      return;
    }

    await TaskModel.client.task.delete({
      where: {
        id: this.id
      }
    })
  }
}
