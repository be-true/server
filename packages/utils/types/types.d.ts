
/**
 * Заменяет в файле участок строки между start и end на переданную строку
 * 
 * @param filePath - Путь до файла в котором нужно произвести замену
 * @param start - Начиная с конца подстроки
 * @param end - Заканчивая до начала подстроки
 * @param replacement  - Заменить участок на переданную строку
 * @returns 
 */
export declare const replaceInFile = (filePath: string, start: string, end: string, replacement: string) => Promise<void>