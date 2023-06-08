import { LifeSpan } from './LifeSpan'
import { Starter } from './Starter'

export type Helper<
  N extends LifeSpan.Name | 'api' = LifeSpan.Name | 'api',
  P extends LifeSpan.Name | 'api' = N,
  A extends readonly any[] = [],
  R = void,
  PD = any,
  CD = any
> = (
  this:
    | ('api' extends Exclude<N, LifeSpan.Name> ? Starter.Api.This<PD, CD> : never)
    | (Exclude<N, 'api'> extends never
        ? never
        : {
            [K in Exclude<N, 'api'>]: Starter.LifeSpanApi.This<K, PD, CD>
          }[Exclude<N, 'api'>]),
  provided: ('api' extends Exclude<P, LifeSpan.Name> ? { readonly api: Starter.Api<PD, CD> } : {}) & {
    readonly [K in Exclude<P, 'api'> as `${K}Api`]: Starter.LifeSpanApi<K, PD, CD>
  },
  ...args: A
) => R
