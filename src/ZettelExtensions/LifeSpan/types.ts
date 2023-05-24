import { Id } from '@zettelooo/commons'
import { Definitions } from './Definitions'

export type Name = keyof Definitions

export type Watch<N extends Name> = WatchData<Definitions[N]['data']>

export type WatchData<D> = <S extends (data: D) => any, T = S extends (data: D) => infer R ? R : unknown>(
  selector: (data: D) => T,
  callback: (newValue: T, oldValue: T) => void,
  options?: {
    areValuesEqual?: (newValue: T, oldValue: T) => boolean
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

export interface Register<N extends Name> {
  <R = undefined>(
    registrar: Registrar<R>,
    options?: {
      readonly condition?: (data: Definitions[N]['data']) => any
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
