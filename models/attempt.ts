export default class AttemptModel {
  taskId?: string;
  id?: string;
  success: boolean;

  constructor(taskID: string | undefined) {
    this.success = Math.random() < 0.5;
  }
}