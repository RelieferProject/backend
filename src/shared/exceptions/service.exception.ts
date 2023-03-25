export class ServiceResponse {
  public readonly status: boolean;
  public readonly message: string;

  constructor(status: boolean, message: string) {
    this.status = status;
    this.message = message;
  }
}
