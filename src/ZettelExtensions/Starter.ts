import { ZettelTypes } from '@zettelooo/api-types'
import { Id } from '@zettelooo/commons'
import { LifeSpan } from './LifeSpan'

export type Starter<D extends ZettelTypes.Data = ZettelTypes.Data.Default> = (
  this: Starter.Api.This<D>,
  api: Starter.Api<D>
) => void

export namespace Starter {
  export interface Api<D extends ZettelTypes.Data = ZettelTypes.Data.Default> {
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
      readonly read: <T = any>() => Promise<T>
      readonly write: <T = any>(data: T | ((oldData: T) => T)) => Promise<void>
    }

    /** @deprecated This method is unsafe, use `this.while()` instead. */
    readonly while: While<D>
  }

  export namespace Api {
    export interface This<D extends ZettelTypes.Data = ZettelTypes.Data.Default> extends Api<D> {
      readonly while: While<D> // Overrides the deprecation warning
    }
  }

  export interface LifeSpanApi<N extends LifeSpan.Name, D extends ZettelTypes.Data = ZettelTypes.Data.Default> {
    readonly target: LifeSpan.Target<N, D>
    readonly roles: readonly string[]
    readonly scopes: LifeSpan.Scopes<N, D>
    readonly data: LifeSpan.Data<N, D>
    readonly access: LifeSpan.Access<N, D>
    readonly watch: LifeSpan.Watch<N, D>
    readonly registry: LifeSpan.Registry<N, D>
    readonly disposed: boolean

    /** @deprecated This method is unsafe, use `this.register()` instead. */
    readonly register: LifeSpan.Register<N, D>

    /** @deprecated This method is unsafe, use `this.while()` instead. */
    readonly while: While<D>
  }

  export namespace LifeSpanApi {
    export interface This<N extends LifeSpan.Name, D extends ZettelTypes.Data = ZettelTypes.Data.Default>
      extends LifeSpanApi<N, D> {
      readonly register: LifeSpan.Register<N, D> // Overrides the deprecation warning
      readonly while: While<D> // Overrides the deprecation warning
    }
  }

  export type While<D extends ZettelTypes.Data = ZettelTypes.Data.Default> = <N extends LifeSpan.Name>(
    name: N,
    affect: While.Affect<N, D>
  ) => {
    readonly isFinished: boolean
    finish(): void
  }

  export namespace While {
    export type Affect<N extends LifeSpan.Name, D extends ZettelTypes.Data = ZettelTypes.Data.Default> = (
      this: LifeSpanApi.This<N, D>,
      provided: { [K in N as `${K}Api`]: LifeSpanApi<K, D> }
    ) => void | (() => void)
  }
}
