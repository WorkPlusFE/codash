type PlainObject = { [name: string]: any }

declare interface cordovaOptions {
  timeout?: number
  json?: boolean
  mock?: boolean
  mockData?: PlainObject
}

declare class Cordova {
  constructor(config?: cordovaOptions);
  create(hook: string, action: string, params: string[], option?: cordovaOptions): () => Promise<any>
  addHook(hook: string): { create: () => Promise<any> }
  interceptors: {
    before: {
      use: (fulfilled: Function, rejected: Function) => number
    },
    after: {
      use: (fulfilled: Function, rejected: Function) => number
    }
  }
}

declare function deviceReady(option?: cordovaOptions): Promise<any>

declare function bindBackEvent(backEvent: Function): void

declare module '@workplus/codash'

export { Cordova, deviceReady, cordovaOptions, bindBackEvent }
