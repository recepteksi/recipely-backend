import type { User } from '@domain/auth/user';
import type { UserDto } from '@application/auth/dtos/auth.dto';

export class UserMapper {
  static toDto(user: User): UserDto {
    return {
      id: user.id,
      email: user.email.value,
      displayName: user.displayName,
      photoUrl: user.photoUrl,
      createdAt: user.createdAt.toISOString(),
    };
  }
}
