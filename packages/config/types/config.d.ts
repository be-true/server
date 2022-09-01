export interface ConfigItem<isRequired = undefined> {
    fromEnv(env: string): this;
    description(text: string): this;
    example(text: string): this;
    override(value: any): this;
    hasError(): boolean;
    splitter(splitter: string): this;
    enum(list: any[]): this;
    asString(): isRequired extends undefined? string | undefined : string ;
    asInteger(): isRequired extends undefined? number | undefined : number ;
    asBoolean(): isRequired extends undefined? boolean | undefined : boolean ;
    asUrl(): isRequired extends undefined? string | undefined : string ;
    asArrayString(): isRequired extends undefined? string[] | undefined : string[] ;
    asArrayInteger(): isRequired extends undefined? number[] | undefined : number[] ;
    asArrayBoolean(): isRequired extends undefined? boolean[] | undefined : boolean[] ;
    asArrayUrl(): isRequired extends undefined? string[] | undefined : string[] ;
}

export interface ConfigItemOption extends ConfigItem {
    default(value: any): ConfigItemRequired;
    required(): ConfigItemRequired;
}

export interface ConfigItemRequired extends ConfigItem<true> {
    default(value: any): this;
    required(): this;
}

export declare class Config {
    static from(json?: any): Config;
    param(name: string): ConfigItemOption;
    override(name: string, value: any): this;
    merge(config: Config): this;
}