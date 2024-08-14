import AttemptModel from "./attempt";
import { PrismaClient } from "@prisma/client";

export enum TaskStatus {
  IDLE,
  READY,
  PROCESSING,
  DONE,
  ERROR,
}

export class TaskModel {
  title: string = "";
  id: string = "";
  url?: string;
  userEmail: string;
  attempts: AttemptModel[] = [];
  status: TaskStatus = TaskStatus.IDLE;

  private static client = new PrismaClient()

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

  generateNewAttempt() {
    const newAttempt = new AttemptModel(this.id)
    if (newAttempt.success) this.setStatus(TaskStatus.DONE)
    else this.setStatus(TaskStatus.ERROR)

    this.attempts.push(newAttempt)
  }
}
