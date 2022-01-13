

export interface IStorageProvider {
  save(file: string): Promise<string>;
  delete(file: string, folder: string): Promise<void>;
}