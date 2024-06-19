interface User {
  id: string;
  name?: string;
  email: string;
  emailVerified?: string;
  image?: string;
}

export class UserEntity {
  public id: string;
  public name?: string;
  public email: string;
  public emailVerified?: string;
  public image?: string;

  constructor(user: User) {
    const { id, email, emailVerified, image, name } = user;
    this.id = id;
    this.name = name;
    this.email = email;
    this.emailVerified = emailVerified;
    this.image = image;
  }

  static fromObject(object: { [key: string]: any }) {
    const { id, email, emailVerified, image, name } = object;
    return new UserEntity({ id, email, emailVerified, image, name });
  }
}
