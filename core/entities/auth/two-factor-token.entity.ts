interface TwoFactorToken {
  id: string;
  email: string;
  token: string;
  expires: Date;
}

export class TwoFactorTokenEntity {
  public id: string;
  public email: string;
  public token: string;
  public expires: Date;

  constructor(user: TwoFactorToken) {
    const { id, email, token, expires } = user;
    this.id = id;
    this.token = token;
    this.email = email;
    this.expires = expires;
  }

  static fromObject(object: { [key: string]: any }) {
    const { id, email, token, expires } = object;
    return new TwoFactorTokenEntity({ id, email, token, expires });
  }
}
