interface PasswordResetToken {
  id: string;
  email: string;
  token: string;
  expires: Date;
}

export class PasswordResetTokenEntity {
  public id: string;
  public email: string;
  public token: string;
  public expires: Date;

  constructor(user: PasswordResetToken) {
    const { id, email, token, expires } = user;
    this.id = id;
    this.token = token;
    this.email = email;
    this.expires = expires;
  }

  static fromObject(object: { [key: string]: any }) {
    const { id, email, token, expires } = object;
    return new PasswordResetTokenEntity({ id, email, token, expires });
  }
}
