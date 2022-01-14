import { S3 } from 'aws-sdk';
import { IStorageProvider } from "./IStorageProvider";
import fs from 'fs';
import mime from 'mime';
import { resolve } from 'path';
import upload from '../../../../config/upload';

export class S3StorageProvider implements IStorageProvider {
  private client: S3;

  constructor() {
    this.client = new S3({
      region: process.env.AWS_BUCKET_REGION,
    });
  }

  async save(file: string): Promise<string> {
    const originalName = resolve(upload.uploadsFolder, file);

    const fileContent = await fs.promises.readFile(originalName);

    const ContentType = mime.getType(originalName);

    await this.client.putObject({
      Bucket: `${process.env.AWS_BUCKET}`,
      Key: file,
      ACL: "public-read",
      Body: fileContent,
      ContentType
    }).promise();


    await fs.promises.unlink(originalName);
    return file;
  }


  async delete(file: string): Promise<void> {
    await this.client.deleteObject({
      Bucket: `${process.env.AWS_BUCKET}`,
      Key: file,
    }).promise();
  }

}