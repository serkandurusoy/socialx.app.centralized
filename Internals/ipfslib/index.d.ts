import {IProviderParams, IBlobData} from './index';

export as namespace Ipfslib;

declare var Ipfslib: Ipfslib;
export = Ipfslib;

declare interface Ipfslib {
    addBlob(data: IBlobData[]): Promise<object>;
    addFile(file: string, opts?: object): Promise<object>;
    addFiles(files: string[], opts?: object): Promise<object>;
    add(input: string, opts?: object): Promise<object>;
    cat(hash: string): Promise<object>;
    addJson(json: object): Promise<object>;
    setProvider(opts: IProviderParams): void;
}