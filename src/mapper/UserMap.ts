import { User } from "@prisma/client";

export interface IUserResponseDTO {
  email: string;
  username: string;
  id: string;
  avatar_url: string;
  pro: boolean;
}

export class UserMap {
  static toDTO({ email, username, id, avatar_url, pro }: User): IUserResponseDTO {
    return {
      id,
      avatar_url,
      username,
      email,
      pro
    }
  }
}