import path from 'path';
import { mkdir } from 'node:fs/promises';
import sharp from 'sharp';
import type { IAvatarUploader } from '@application/auth/ports/i-avatar-uploader';

const AVATAR_SIZE = 256;

export class LocalAvatarUploader implements IAvatarUploader {
  constructor(
    private readonly uploadsDir: string,
    private readonly baseUrl: string,
  ) {}

  async upload(fileBuffer: Buffer, _mimetype: string, userId: string): Promise<string> {
    const avatarsDir = path.join(this.uploadsDir, 'avatars');
    await mkdir(avatarsDir, { recursive: true });

    const filename = `${userId}.webp`;
    const outputPath = path.join(avatarsDir, filename);

    await sharp(fileBuffer)
      .resize(AVATAR_SIZE, AVATAR_SIZE, { fit: 'cover' })
      .webp({ quality: 80 })
      .toFile(outputPath);

    return `${this.baseUrl}/uploads/avatars/${filename}`;
  }
}
