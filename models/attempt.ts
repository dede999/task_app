export default class AttemptModel {
  taskId?: number;
  id?: number;
  success: boolean;

  constructor(taskID: number | undefined) {
    this.success = Math.random() < 0.5;
  }
}