import { Scope } from '../Scope'
import { Registrar } from './types'

export interface TypeBuilder<
  T extends Record<string, string | number | boolean | null>,
  S extends Scope[],
  D,
  A extends Record<string, (...args: any[]) => any>,
  R extends Record<string, (...args: any[]) => Registrar<any>>
> {
  target: Readonly<T>
  scope: S[number]
  data: Readonly<D>
  access: Readonly<A>
  registry: Readonly<R>
}
