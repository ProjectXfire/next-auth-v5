interface User {
  id: string;
  name?: string;
  email: string;
  emailVerified?: string;
  image?: string;
  role: string;
}

export class UserEntity {
  public id: string;
  public name?: string;
  public email: string;
  public emailVerified?: string;
  public image?: string;
  public role: string;

  constructor(user: User) {
    const { id, email, emailVerified, image, name, role } = user;
    this.id = id;
    this.name = name;
    this.email = email;
    this.emailVerified = emailVerified;
    this.image = image;
    this.role = role;
  }

  static fromObject(object: { [key: string]: any }) {
    const { id, email, emailVerified, image, name, role } = object;
    return new UserEntity({ id, email, emailVerified, image, name, role });
  }
}
