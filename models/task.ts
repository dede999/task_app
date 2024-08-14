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
  status: TaskStatus = TaskStatus.IDLE;

  constructor(nome: string, userMail: string) {
    this.nome = nome;
    this.userEmail = userMail;
  }

  setUrl(url: string) {
    this.url = url;
    this.status = TaskStatus.READY
  }

  setStatus(status: TaskStatus) {
    this.status = status;
  }

  isExecutable() {
    return this.status === TaskStatus.READY
  }
}
