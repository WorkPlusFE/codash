type PlainObject = { [name: string]: any }

declare interface cordovaOptions {
  timeout?: number
  json?: boolean
  mock?: boolean
  mockData?: PlainObject
}

declare class Cordova {
  constructor(config?: cordovaOptions);
  create(hook: string, action: string, params: string[] | PlainObject[], option?: cordovaOptions): () => Promise<any>
  addHook(hook: string): { create: () => Promise<any> }
  interceptors: {
    before: {
      use: (fulfilled: (value?: any) => void, rejected: (reason?: any) => void) => number
    },
    after: {
      use: (fulfilled: (value?: any) => void, rejected: (reason?: any) => void) => number
    }
  }
}

declare class FileDownload {
  constructor();
  download(source: string, target: string, trustAllHosts?: boolean, options?: PlainObject): Promise<any>
}

declare class FileUpload {
  constructor(options?: PlainObject);
  upload(fileURL: string, server: string, options: PlainObject): Promise<any>
  abort(): void
}

declare function toBase64(path: string, success: (value?: any) => void, fail?: (reason?: any) => void): void

declare function deviceReady(option?: cordovaOptions): Promise<any>

declare function bindBackEvent(backEvent: Function): void

declare module '@workplus/codash'

export { Cordova, deviceReady, cordovaOptions, bindBackEvent, FileDownload, FileUpload, toBase64 }
