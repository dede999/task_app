import AttemptModel from "./attempt";

export enum TaskStatus {
  IDLE,
  READY,
  PROCESSING,
  DONE,
  ERROR,
}

export class TaskModel {
  nome: string;
  id?: number;
  url?: string;
  userEmail: string;
  attempts: AttemptModel[] = [];
  status: TaskStatus = TaskStatus.IDLE;

  constructor(nome: string, userMail: string) {
    this.nome = nome;
    this.userEmail = userMail;
  }

  setUrl(url: string) {
    this.url = url;
    this.setStatus(TaskStatus.READY)
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
