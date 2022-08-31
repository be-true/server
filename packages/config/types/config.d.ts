export interface Accessors<isRequired = undefined> {
    fromEnv(env: string): this;
    description(text: string): this;
    example(text: string): this;
    override(value: any): this;
    asString(): isRequired extends undefined? string | undefined : string ;
    asInteger(): isRequired extends undefined? number | undefined : number ;
    asBoolean(): isRequired extends undefined? boolean | undefined : boolean ;
    asUrl(): isRequired extends undefined? string | undefined : string ;
    asEnum(listValues: string[]): isRequired extends undefined? string | undefined : string ;
}

export interface AccessorsOption extends Accessors {
    default(value: any): AccessorsRequired;
    required(): AccessorsRequired;
}

export interface AccessorsRequired extends Accessors<true> {
    default(value: any): this;
    required(): this;
}

export declare class ConfigItem implements AccessorsOption {
    constructor();
    description(text: string): this;
    example(text: string): this;
    override(value: any): this;
    fromEnv(env: string): this;
    default(value: any): AccessorsRequired;
    required(): AccessorsRequired;
    asString(): string | undefined;
    asInteger(): number | undefined;
    asBoolean(): boolean | undefined;
    asUrl(): string | undefined;
    asEnum(listValues: string[]): string | undefined;
}

export declare class Config {
    static from(json?: any): Config;
    param(name: string): AccessorsOption;
    override(name: string, value: any): this;
    merge(config: Config): this;
}