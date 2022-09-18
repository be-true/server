export interface ConfigItem<isRequired = undefined> {
    /** Проверка наличия ошибки */
    hasError(): boolean;
    /** Проверка на наличие указаний переменных окружения */
    hasEnv(): boolean;
    /** Получать значение параметра из ENV переменной */
    fromEnv(env: string): this;
    /** Описание параметра */
    description(text: string): this;
    /** Пример для указания в конфигурации */
    example(text: string): this;
    /** Перезаписать параметр указанным значением */
    override(value: any): this;
    /** Устанавливает разделитель для получения массива значений */
    splitter(splitter: string): this;
    /** Устанавливает тип возврата как строка */
    asString(): isRequired extends undefined? string | undefined : string ;
    /** Устанавливает тип возврата как целое число */
    asInteger(): isRequired extends undefined? number | undefined : number ;
    /** Устанавливает тип возврата как булево значение */
    asBoolean(): isRequired extends undefined? boolean | undefined : boolean ;
    /** Устанавливает тип возврата как URL */
    asUrl(): isRequired extends undefined? string | undefined : string ;
    /** Устанавливает тип возврата как значение из списка */
    asEnum<T>(list: T[]): isRequired extends undefined? typeof T | undefined : T ;
    /** Устанавливает тип возврата как массив строк */
    asArrayString(): isRequired extends undefined? string[] | undefined : string[] ;
    /** Устанавливает тип возврата как массив целых числе */
    asArrayInteger(): isRequired extends undefined? number[] | undefined : number[] ;
    /** Устанавливает тип возврата как массив булевых переменных */
    asArrayBoolean(): isRequired extends undefined? boolean[] | undefined : boolean[] ;
    /** Устанавливает тип возврата как массив URL-ов */
    asArrayUrl(): isRequired extends undefined? string[] | undefined : string[] ;
    /** Устанавливает тип возврата как массив значений из списка */
    asArrayEnum<T>(list: T[]): isRequired extends undefined? T[] | undefined : T[] ;
}

export interface ConfigItemOption extends ConfigItem {
    /** Указывает значение по умолчанию */
    default(value: any): ConfigItemRequired;
    /** Указывает значение как обязательное */
    required(): ConfigItemRequired;
}

export interface ConfigItemRequired extends ConfigItem<true> {
    /** Указывает значение по умолчанию */
    default(value: any): this;
    /** Указывает значение как обязательное */
    required(): this;
}

export declare class Config {
    /** Создание конфигурации из JSON объекта */
    static from(json?: any): Config;
    /** Описание файла конфигурации */
    description: string;
    /** Контекст обработки ENV переменных */
    context: string;
    /** Устанавливает настройки для конфигуратора */
    setSettings(settings: ConfigSettingsParams): this;
    /** Добавление параметра конфигурации */
    param(name: string): ConfigItemOption;
    /** Проверка наличия ошибок */
    hasErrors(): boolean;
    /** Проверка на наличие в файле конфигурации указаний переменных окружения */
    hasEnvs(): boolean;
    /** Отображение конфигурации в MD файл */
    render(): string;
    /** Отображение ошибок конфигурации в MD файл */
    renderErrors(): string;
    /** Перезаписывание параметра конфигурации значением */
    override(name: string, value: any): this;
    /** Объединение параметров конфига */
    merge(config: any): this;
}

export type ConfigSettingsParams = {
    description?: string;
    context?: string;
}