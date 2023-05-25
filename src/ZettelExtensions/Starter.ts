import { Id } from '@zettelooo/commons'
import { LifeSpan } from './LifeSpan'

export type Starter = (this: Omit<Starter.Api, 'while'> & { readonly while: Starter.While }, api: Starter.Api) => void

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
      readonly avatar: {
        readonly file?: string
        readonly dataUrl?: string
      }
      readonly documentationMarkdownFile?: string
    }

    readonly getFileUrl: (filePath: string) => string
    readonly generateId: () => Id

    readonly localStorage: {
      readonly read: () => Promise<any>
      readonly write: (data: any | ((oldData: any) => any)) => Promise<void>
    }

    /** @deprecated This method is unsafe, use `this.while()` instead. */
    readonly while: While
  }

  export interface LifeSpanApi<N extends LifeSpan.Name> {
    readonly target: LifeSpan.Target<N>
    readonly roles: readonly string[]
    readonly scopes: readonly LifeSpan.Scope<N>[]
    readonly data: LifeSpan.Data<N>
    readonly access: LifeSpan.Access<N>
    readonly watch: LifeSpan.Watch<N>
    readonly api: Api
    readonly registry: LifeSpan.Registry<N>
    readonly register: LifeSpan.Register<N>
    readonly disposed: boolean

    /** @deprecated This method is unsafe, use `this.while()` instead. */
    readonly while: While
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
      this: Omit<LifeSpanApi<N>, 'while'> & { readonly while: While },
      provided: { [K in N as `${K}Api`]: LifeSpanApi<K> }
    ) => void | (() => void)
  }
}
