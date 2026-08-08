import * as fs from 'fs';
import * as path from 'path';
import { Logger } from '@nestjs/common';

const logger = new Logger('FileHelper');

/**
 * Ensures that a directory path exists recursively.
 * @param dirPath Absolute or relative path to directory
 */
export function ensureDirectoryExists(dirPath: string): void {
  try {
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
      logger.log(`Created directory: ${dirPath}`);
    }
  } catch (error) {
    logger.error(`Failed to create directory ${dirPath}: ${(error as Error).message}`);
    throw error;
  }
}

/**
 * Ensures that a list of upload directories exist under the base upload path.
 * @param baseDestination Base upload path (e.g. storage/uploads)
 * @param folders Array of folder names to ensure exist
 */
export function ensureDirectoriesExist(baseDestination: string, folders: string[]): void {
  const rootUploadPath = path.isAbsolute(baseDestination)
    ? baseDestination
    : path.join(process.cwd(), baseDestination);

  ensureDirectoryExists(rootUploadPath);

  for (const folder of folders) {
    const targetFolder = path.join(rootUploadPath, folder);
    ensureDirectoryExists(targetFolder);
  }
}

/**
 * Generates a unique, URL-safe filename using timestamp and random string.
 * @param originalName Original filename with extension
 * @returns Unique filename string preserving extension
 */
export function generateUniqueFilename(originalName: string): string {
  const extension = path.extname(originalName).toLowerCase();
  const baseName = path.basename(originalName, extension)
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '-')
    .replace(/-+/g, '-');
  const timestamp = Date.now();
  const random = Math.floor(1000 + Math.random() * 9000);
  return `${baseName}-${timestamp}-${random}${extension}`;
}

/**
 * Asynchronously deletes a file at the specified path if it exists.
 * @param filePath File path to delete
 * @returns Promise resolving to boolean indicating success
 */
export async function deleteLocalFile(filePath: string): Promise<boolean> {
  try {
    if (fs.existsSync(filePath)) {
      await fs.promises.unlink(filePath);
      logger.log(`Deleted file: ${filePath}`);
      return true;
    }
    return false;
  } catch (error) {
    logger.error(`Error deleting file ${filePath}: ${(error as Error).message}`);
    return false;
  }
}
