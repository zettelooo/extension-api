import { Id } from '@zettelooo/commons'
import { LifeSpan } from './LifeSpan'
import { Exposed } from './LifeSpan/types'

export type Starter = (this: Starter.Api.This, api: Starter.Api) => void

export namespace Starter {
  export interface Api {
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
            readonly fileId: Id
            readonly preview?: true | {} // TODO: Preview options
          }
    ) => string

    readonly localStorage: {
      readonly read: () => Promise<any>
      readonly write: (data: any | ((oldData: any) => any)) => Promise<void>
    }

    /** @deprecated This method is unsafe, use `this.while()` instead. */
    readonly while: While
  }

  export namespace Api {
    export interface This extends Api {
      readonly while: While // Overrides the deprecation warning
    }
  }

  export interface LifeSpanApi<N extends LifeSpan.Name> {
    readonly target: LifeSpan.Target<N>
    readonly roles: readonly string[]
    readonly scopes: LifeSpan.Scopes<N>
    readonly data: LifeSpan.Data<N>
    readonly access: LifeSpan.Access<N>
    readonly watch: LifeSpan.Watch<N>
    readonly exposed: Exposed
    readonly registry: LifeSpan.Registry<N>
    readonly register: LifeSpan.Register<N>
    readonly disposed: boolean

    /** @deprecated This method is unsafe, use `this.while()` instead. */
    readonly while: While
  }

  export namespace LifeSpanApi {
    export interface This<N extends LifeSpan.Name> extends LifeSpanApi<N> {
      readonly while: While // Overrides the deprecation warning
    }
  }

  export type While = <N extends LifeSpan.Name>(
    name: N,
    affect: While.Affect<N>
  ) => {
    readonly isFinished: boolean
    finish(): void
  }

  export namespace While {
    export type Affect<N extends LifeSpan.Name> = (
      this: LifeSpanApi.This<N>,
      provided: { [K in N as `${K}Api`]: LifeSpanApi<K> }
    ) => void | (() => void)
  }
}
