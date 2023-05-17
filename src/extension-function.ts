import { Id } from '@zettelooo/commons'
import { ExtensionScope } from '@zettelooo/models'
import { ExtensionLifeSpanDefinitions } from './ExtensionLifeSpans'

export type ExtensionFunction = (
  this: Omit<ExtensionApi, 'while'> & { readonly while: ExtensionWhile },
  api: ExtensionApi
) => void

export interface ExtensionApi {
  readonly coreVersion: string
  readonly extensionHeader: {
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
  readonly while: ExtensionWhile
}

export type ExtensionWhile = <N extends ExtensionLifeSpanName>(
  name: N,
  affect: ExtensionAffect<N>
) => {
  readonly isFinished: boolean
  finish(): void
}

export type ExtensionAffect<N extends ExtensionLifeSpanName> = (
  this: Omit<ExtensionLifeSpanProvided<N>, 'while'> & { readonly while: ExtensionWhile },
  provided: { [K in N as `${K}Api`]: ExtensionLifeSpanProvided<K> }
) => void | (() => void)

export interface ExtensionLifeSpanProvided<N extends ExtensionLifeSpanName> {
  readonly target: ExtensionLifeSpanTarget<N>
  readonly roles: readonly string[]
  readonly scopes: ExtensionLifeSpanScopes<N>
  readonly data: ExtensionLifeSpanData<N>
  readonly access: ExtensionLifeSpanAccess<N>
  readonly watch: ExtensionLifeSpanWatch<N>
  readonly api: ExtensionLifeSpanApi
  readonly registry: ExtensionLifeSpanRegistry<N>
  readonly register: ExtensionLifeSpanRegister<N>
  readonly disposed: boolean

  /** @deprecated This method is unsafe, use `this.while()` instead. */
  readonly while: ExtensionWhile
}

export type ExtensionLifeSpanName = keyof ExtensionLifeSpanDefinitions

export type ExtensionLifeSpanScopes<N extends ExtensionLifeSpanName> = readonly ExtensionLifeSpanScope<N>[]

export type ExtensionLifeSpanWatch<N extends ExtensionLifeSpanName> = ExtensionLifeSpanWatchData<
  ExtensionLifeSpanData<N>
>
export type ExtensionLifeSpanWatchData<D extends ExtensionLifeSpanDataBase> = <
  S extends (data: D) => any,
  T = S extends (data: D) => infer R ? R : unknown
>(
  selector: (data: D) => T,
  callback: (newValue: T, oldValue: T) => void,
  options?: {
    areValuesEqual?: (newValue: T, oldValue: T) => boolean
  }
) => ExtensionLifeSpanRegistrar

export interface ExtensionLifeSpanApi {
  readonly provider: (version: number | string, provider: () => any) => ExtensionLifeSpanRegistrar
  readonly consumer: (
    providerExtensionId: Id,
    version: number | string,
    consumer: (api: any) => () => void
  ) => ExtensionLifeSpanRegistrar
}

export type ExtensionLifeSpanRegistrar<R = undefined> = R extends undefined
  ? () => () => void
  : [() => () => void, { readonly current?: R }]
export interface ExtensionLifeSpanRegister<N extends ExtensionLifeSpanName> {
  <R = undefined>(
    registrar: ExtensionLifeSpanRegistrar<R>,
    options?: {
      readonly condition?: (data: ExtensionLifeSpanData<N>) => any
      readonly initiallyInactive?: boolean
    }
  ): {
    readonly reference: { readonly current?: R }
    readonly isActive: () => boolean
    readonly isEnabled: () => boolean
    readonly activate: () => void
    readonly deactivate: () => void
  }
}

export type ExtensionHelperFunction<
  N extends ExtensionLifeSpanName | 'api' = ExtensionLifeSpanName | 'api',
  P extends ExtensionLifeSpanName | 'api' = N,
  A extends readonly any[] = [],
  R = void
> = (
  this:
    | ('api' extends Exclude<N, ExtensionLifeSpanName>
        ? Omit<ExtensionApi, 'while'> & { readonly while: ExtensionWhile }
        : never)
    | (Exclude<N, 'api'> extends never
        ? never
        : Omit<
            {
              [K in Exclude<N, 'api'>]: Omit<ExtensionLifeSpanProvided<K>, 'while'> & { readonly while: ExtensionWhile }
            }[Exclude<N, 'api'>],
            'watch'
          > & { readonly watch: ExtensionLifeSpanWatchData<ExtensionLifeSpanData<Exclude<N, 'api'>>> }),
  provided: ('api' extends Exclude<P, ExtensionLifeSpanName> ? { api: ExtensionApi } : {}) & {
    [K in Exclude<P, 'api'> as `${K}Api`]: ExtensionLifeSpanProvided<K>
  },
  ...args: A
) => R

export type ExtensionLifeSpanTarget<N extends ExtensionLifeSpanName> = ExtensionLifeSpanDefinitions[N]['target']
export type ExtensionLifeSpanScope<N extends ExtensionLifeSpanName> = ExtensionLifeSpanDefinitions[N]['scope']
export type ExtensionLifeSpanData<N extends ExtensionLifeSpanName> = ExtensionLifeSpanDefinitions[N]['data']
export type ExtensionLifeSpanAccess<N extends ExtensionLifeSpanName> = ExtensionLifeSpanDefinitions[N]['access']
export type ExtensionLifeSpanRegistry<N extends ExtensionLifeSpanName> = ExtensionLifeSpanDefinitions[N]['registry']

export type ExtensionLifeSpanTargetBase = Record<string, string | number | boolean | null>
export type ExtensionLifeSpanScopeBase = ExtensionScope
export type ExtensionLifeSpanDataBase = any
export type ExtensionLifeSpanAccessBase = Record<string, (...args: any[]) => any>
export type ExtensionLifeSpanRegistryBase = Record<string, (...args: any[]) => ExtensionLifeSpanRegistrar<any>>
