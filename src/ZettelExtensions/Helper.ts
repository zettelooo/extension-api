import { LifeSpan } from './LifeSpan'
import { Starter } from './Starter'

export type Helper<
  N extends LifeSpan.Name | 'api' = LifeSpan.Name | 'api',
  P extends LifeSpan.Name | 'api' = N,
  A extends readonly any[] = [],
  R = void
> = (
  this:
    | ('api' extends Exclude<N, LifeSpan.Name> ? Starter.Api.This : never)
    | (Exclude<N, 'api'> extends never
        ? never
        : Omit<
            {
              [K in Exclude<N, 'api'>]: Starter.LifeSpanApi.This<K>
            }[Exclude<N, 'api'>],
            'watch'
          > & { readonly watch: LifeSpan.WatchData<LifeSpan.Data<Exclude<N, 'api'>>> }),
  provided: ('api' extends Exclude<P, LifeSpan.Name> ? { api: Starter.Api } : {}) & {
    [K in Exclude<P, 'api'> as `${K}Api`]: Starter.LifeSpanApi<K>
  },
  ...args: A
) => R
