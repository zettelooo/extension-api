import { ZettelTypes } from '@zettelooo/api-types'
import { LifeSpan } from './LifeSpan'
import { Starter } from './Starter'

export type Helper<
  N extends LifeSpan.Name | 'api' = LifeSpan.Name | 'api',
  P extends LifeSpan.Name | 'api' = N,
  A extends readonly any[] = [],
  R = void,
  D extends ZettelTypes.Data = ZettelTypes.Data.Default
> = (
  this:
    | ('api' extends Exclude<N, LifeSpan.Name> ? Starter.Api.This<D> : never)
    | Helper.LifeSpanApi<Exclude<N, 'api'>, D>,
  provided: ('api' extends Exclude<P, LifeSpan.Name> ? { readonly api: Starter.Api<D> } : {}) & {
    readonly [K in Exclude<P, 'api'> as `${K}Api`]: Starter.LifeSpanApi<K, D>
  },
  ...args: A
) => R

export namespace Helper {
  export type LifeSpanApi<
    N extends LifeSpan.Name,
    D extends ZettelTypes.Data = ZettelTypes.Data.Default
  > = N extends never
    ? never
    : {
        [K in N]: Starter.LifeSpanApi.This<K, D>
      }[N]
}
