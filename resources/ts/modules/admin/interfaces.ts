type AnyKindOf = {
    [key: string]: string;
};

export interface IAppState {
    readonly appName: string;
    readonly locale: string;
    readonly authenticated: boolean;
    readonly guest: boolean;
    readonly routes: Readonly<{
        root: string;
    } & AnyKindOf>;
    readonly i18n: Readonly<AnyKindOf>;
    readonly user: null | object;
}