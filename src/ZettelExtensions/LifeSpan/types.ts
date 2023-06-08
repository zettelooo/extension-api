import { Id, ReadonlyRecord } from '@zettelooo/commons'
import { Definitions } from './Definitions'
import { Scope } from '../Scope'

export type Name = keyof Definitions

export type Watch<N extends Name, PD = any, CD = any> = <
  S extends (data: Data<N, PD, CD>) => any,
  T = S extends (data: Data<N, PD, CD>) => infer R ? R : unknown
>(
  selector: S,
  callback: (newValue: T, oldValue?: T) => void,
  options?: {
    initialCallback?: boolean
    areValuesEqual?: (newValue: T, oldValue: T) => boolean
    pickDependencies?: (data: ReadonlyRecord<keyof Data<N, PD, CD>, Data<N, PD, CD>>) => any
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

export interface Register<N extends Name, PD = any, CD = any> {
  <R = undefined>(
    registrar: Registrar<R>,
    options?: {
      readonly condition?: (data: Data<N, PD, CD>) => any
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

export type Target<N extends Name, PD = any, CD = any> = Definitions<PD, CD>[N]['target']
export type Scopes<N extends Name, PD = any, CD = any> = Definitions<PD, CD>[N]['scopes']
export type Data<N extends Name, PD = any, CD = any> = Definitions<PD, CD>[N]['data']
export type Access<N extends Name, PD = any, CD = any> = Definitions<PD, CD>[N]['access']
export type Registry<N extends Name, PD = any, CD = any> = Definitions<PD, CD>[N]['registry']

export type TargetBase = Record<string, string | number | boolean | null>
export type ScopesBase = readonly Scope[]
export type DataBase = Record<string, any>
export type AccessBase = Record<string, (...args: any[]) => any>
export type RegistryBase = Record<string, (...args: any[]) => Registrar<any>>
