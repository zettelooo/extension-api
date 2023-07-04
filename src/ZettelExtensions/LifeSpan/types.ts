import { ZettelTypes } from '@zettelooo/api-types'
import { Id, ReadonlyRecord } from '@zettelooo/commons'
import { Scope } from '../Scope'
import { Definitions } from './Definitions'

export type Name = keyof Definitions

export type Watch<N extends Name, D extends ZettelTypes.Data = ZettelTypes.Data.Default> = <
  S extends (data: Data<N, D>) => any,
  T = S extends (data: Data<N, D>) => infer R ? R : unknown
>(
  selector: S,
  callback: (newValue: T, oldValue?: T) => void,
  options?: {
    initialCallback?: boolean
    areValuesEqual?: (newValue: T, oldValue: T) => boolean
    pickDependencies?: (data: ReadonlyRecord<keyof Data<N, D>, Data<N, D>>) => any
  }
) => Registrar

export interface Exposed {
  readonly provider: (version: number | string, provide: () => any) => Registrar
  readonly consumer: (
    providerExtensionId: Id,
    version: number | string,
    consume: (exposed: any) => () => void
  ) => Registrar
}

export type Registrar<R = undefined> = R extends undefined
  ? () => () => void
  : [() => () => void, { readonly current?: R }]

export interface Register<N extends Name, D extends ZettelTypes.Data = ZettelTypes.Data.Default> {
  <R = undefined>(
    registrar: Registrar<R>,
    options?: {
      readonly condition?: (data: Data<N, D>) => any
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

export type Target<N extends Name, D extends ZettelTypes.Data = ZettelTypes.Data.Default> = Definitions<D>[N]['target']
export type Scopes<N extends Name, D extends ZettelTypes.Data = ZettelTypes.Data.Default> = Definitions<D>[N]['scopes']
export type Data<N extends Name, D extends ZettelTypes.Data = ZettelTypes.Data.Default> = Definitions<D>[N]['data']
export type Access<N extends Name, D extends ZettelTypes.Data = ZettelTypes.Data.Default> = Definitions<D>[N]['access']
export type Registry<
  N extends Name,
  D extends ZettelTypes.Data = ZettelTypes.Data.Default
> = Definitions<D>[N]['registry']

export type TargetBase = Record<string, string | number | boolean | null>
export type ScopesBase = readonly Scope[]
export type DataBase = Record<string, any>
export type AccessBase = Record<string, (...args: any[]) => any>
export type RegistryBase = Record<string, (...args: any[]) => Registrar<any>>
