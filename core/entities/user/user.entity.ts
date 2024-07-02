interface User {
  id: string;
  name?: string;
  email: string;
  emailVerified?: string | null;
  image?: string;
  role: string;
  isTwoFactorEnabled: boolean;
  isOauth: boolean;
}

export class UserEntity {
  public id: string;
  public name?: string;
  public email: string;
  public emailVerified?: string | null;
  public image?: string;
  public role: string;
  public isTwoFactorEnabled: boolean;
  public isOauth: boolean;

  constructor(user: User) {
    const {
      id,
      email,
      emailVerified,
      image,
      name,
      role,
      isTwoFactorEnabled,
      isOauth = false,
    } = user;
    this.id = id;
    this.name = name;
    this.email = email;
    this.emailVerified = emailVerified;
    this.image = image;
    this.role = role;
    this.isTwoFactorEnabled = isTwoFactorEnabled;
    this.isOauth = isOauth;
  }

  static fromObject(object: { [key: string]: any }) {
    const { id, email, emailVerified, image, name, role, isTwoFactorEnabled, isOauth } = object;

    return new UserEntity({
      id,
      email,
      emailVerified,
      image,
      name,
      role,
      isTwoFactorEnabled,
      isOauth,
    });
  }
}
