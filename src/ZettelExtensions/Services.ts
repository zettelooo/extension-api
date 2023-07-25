import { Id } from '@zettelooo/commons'

// TODO: This needs strong typings shared with the life spans:

export interface Services {
  readonly consumes?: readonly Services.Service[]
  readonly provides?: readonly Services.Service[]
}

export namespace Services {
  export interface Service {
    readonly name: string
    readonly displayName?: string
    readonly description?: string
    readonly requestDataDescription?: string
    readonly responseDataDescription?: string
    readonly bindings?: readonly {
      readonly extensionId: Id
      readonly serviceName: string
      readonly convertRequestData?: (data: any) => any
      readonly convertResponseData?: (data: any) => any
    }[]
  }
}
