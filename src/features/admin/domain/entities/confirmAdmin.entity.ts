export class Confirm {
  usarname: string;
  confirmCode: string;

  constructor(username: string, confirmCode: string) {
    this.usarname = username;
    this.confirmCode = confirmCode;
  }
}
