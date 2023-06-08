import { Id } from '@zettelooo/commons'
import { LifeSpan } from './LifeSpan'

export type Starter<PD = any, CD = any> = (this: Starter.Api.This<PD, CD>, api: Starter.Api<PD, CD>) => void

export namespace Starter {
  export interface Api<PD = any, CD = any> {
    readonly coreVersion: string
    readonly header: {
      readonly id: Id
      readonly version: string | null
      readonly author: {
        readonly id: Id
        readonly name: string
        readonly email: string
      }
      readonly name: string
      readonly description: string
      readonly avatarUrl?: string
      readonly documentationMarkdownFile?: string
    }

    readonly generateId: () => Id
    readonly getFileUrl: (
      options:
        | {
            readonly filePath: string
          }
        | {
            readonly avatarFileId: Id
            readonly size: number
          }
        | {
            readonly fileId: Id
            readonly fileName: string
            readonly previewOptions?:
              | {
                  readonly width: number
                }
              | {
                  readonly height: number
                }
              | {
                  readonly width: number
                  readonly height: number
                  readonly objectFit: 'contain' | 'cover'
                }
          }
    ) => string

    readonly localStorage: {
      readonly read: () => Promise<any>
      readonly write: (data: any | ((oldData: any) => any)) => Promise<void>
    }

    /** @deprecated This method is unsafe, use `this.while()` instead. */
    readonly while: While<PD, CD>
  }

  export namespace Api {
    export interface This<PD = any, CD = any> extends Api<PD, CD> {
      readonly while: While<PD, CD> // Overrides the deprecation warning
    }
  }

  export interface LifeSpanApi<N extends LifeSpan.Name, PD = any, CD = any> {
    readonly target: LifeSpan.Target<N, PD, CD>
    readonly roles: readonly string[]
    readonly scopes: LifeSpan.Scopes<N, PD, CD>
    readonly data: LifeSpan.Data<N, PD, CD>
    readonly access: LifeSpan.Access<N, PD, CD>
    readonly watch: LifeSpan.Watch<N, PD, CD>
    readonly exposed: LifeSpan.Exposed
    readonly registry: LifeSpan.Registry<N, PD, CD>
    readonly disposed: boolean

    /** @deprecated This method is unsafe, use `this.register()` instead. */
    readonly register: LifeSpan.Register<N, PD, CD>

    /** @deprecated This method is unsafe, use `this.while()` instead. */
    readonly while: While<PD, CD>
  }

  export namespace LifeSpanApi {
    export interface This<N extends LifeSpan.Name, PD = any, CD = any> extends LifeSpanApi<N, PD, CD> {
      readonly register: LifeSpan.Register<N, PD, CD> // Overrides the deprecation warning
      readonly while: While<PD, CD> // Overrides the deprecation warning
    }
  }

  export type While<PD = any, CD = any> = <N extends LifeSpan.Name>(
    name: N,
    affect: While.Affect<N, PD, CD>
  ) => {
    readonly isFinished: boolean
    finish(): void
  }

  export namespace While {
    export type Affect<N extends LifeSpan.Name, PD = any, CD = any> = (
      this: LifeSpanApi.This<N, PD, CD>,
      provided: { [K in N as `${K}Api`]: LifeSpanApi<K, PD, CD> }
    ) => void | (() => void)
  }
}
