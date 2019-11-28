type PlainObject = { [name: string]: any }

/**
 * @param {number} timeout - 超时时间
 * @param {boolean} isMock - 是否开启mock模式，⚠️该属性将在下个版本弃用，请使用mock
 * @param {boolean} mock - 是否开启mock模式
 *
 * @interface deviceReadyOptions
 */
declare interface deviceReadyOptions {
  timeout?: number
  isMock?: boolean
  mock?: boolean
}

/**
 * @param {numben} timeout - 超时时间
 * @param {boolean} mock - 是否开启mock模式
 * @param {boolean} json - 是否json化返回结果
 * @param {PlainObject} mockData - mock的数据
 *
 * @interface cordovaOptions
 */
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

declare function deviceReady(option?: deviceReadyOptions): Promise<any>

declare function bindBackEvent(backEvent: Function): void

declare module '@w6s/codash'

export { Cordova, deviceReady, cordovaOptions, bindBackEvent, FileDownload, FileUpload, toBase64 }
