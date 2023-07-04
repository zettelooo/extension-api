import { Id } from '@zettelooo/commons'

// TODO: This needs strong typings shared with the life spans:

export interface Services {
  readonly provides?: readonly Services.Service[]
  readonly consumes?: readonly Services.Service[]
}

export namespace Services {
  export interface Service {
    readonly name: string
    readonly displayName?: string
    readonly description: string
    readonly requestData?: {
      readonly description?: string
      readonly converters?: {
        readonly [extensionId: Id]: (data: any) => any
      }
    }
    readonly responseData?: {
      readonly description?: string
      readonly converters?: {
        readonly [extensionId: Id]: (data: any) => any
      }
    }
  }
}
