
/**
 * Заменяет в файле участок строки между start и end на переданную строку
 * 
 * @param filePath - Путь до файла в котором нужно произвести замену
 * @param start - Начиная с конца подстроки
 * @param end - Заканчивая до начала подстроки
 * @param replacement  - Заменить участок на переданную строку
 * @returns {Promise<void>}
 */
export declare function replaceInFile(filePath: string, start: string, end: string, replacement: string): Promise<void>

/**
 * Вычисляет hash от файла
 * 
 * @param path - путь до файла
 * @param {String} algorithm - алгоритм один из: 'sha1', 'sha256'
 * @return {Promise<string>}
 */
export declare function fileHash(path: string, algorithm: 'sha1' | 'sha256'): Promise<string>

/**
 * Проверяет наличие файла по указанному пути
 * 
 * @param {String} path - путь до файла
 * @return {Promise<Boolean>}
 */
export declare function fileExist(path: string): Promise<boolean>

export type FileInfo = {
    file: string,
    path: string,
    size: number,
}       
/**
 * Возвращает перечень файлов содержащихся в указанной папке
 * 
 * @param {String} root - путь до папки или файла
 * @return {AsyncIterator<FileInfo>}
 */
export declare function filesInPath(root: string): AsyncIterator<FileInfo>

/**
 * Переводит байты в человеко понятный формат
 * 
 * @param {Number} size - размер в байтах
 * @returns {String}
 */
export declare function humanSize(size: number): string;

/**
 * Выдает mime тип файла по его расширению
 * 
 * @param {String} ext - расширение файла
 * @returns {String}
 */
export declare function mime(ext: string): string

/**
 * Конвертирует любое значение в массив. Если уже массив, то не трогает
 * 
 * @param data - любое значение
 */
export declare function toArray<T>(data: T | T[]): T[];

/**
 * Создает объект, у которого ключом является значение из fieldToKey а значением элемент массива
 * 
 * @param array - массив объектов
 * @param fieldToKey - поле из которого будут браться значения для ключа Map
 */
export declare function toMap<T, K extends keyof T>(array: Iterable<T>, fieldToKey: K | ((item: T) => string)): { [key in string]: T };

/**
 * Создает объект, у которого ключом является значение из fieldToKey а значением элементы массива с этим ключом
 * 
 * @param array - массив объектов
 * @param fieldToKey - поле из которого будут браться значения для ключа Map
 */
export declare function toMapGroup<T, K extends keyof T>(array: Iterable<T>, fieldToKey: K | ((item: T) => string)): { [key in string]: T[] };