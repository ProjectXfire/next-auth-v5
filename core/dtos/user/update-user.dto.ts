export interface UpdateUserDto {
  name?: string;
  isTwoFactorEnabled: boolean;
  role: string;
  password?: string;
}
