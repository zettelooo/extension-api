import { LifeSpan } from './LifeSpan'
import { Starter } from './Starter'

export type Helper<
  N extends LifeSpan.Name | 'api' = LifeSpan.Name | 'api',
  P extends LifeSpan.Name | 'api' = N,
  A extends readonly any[] = [],
  R = void
> = (
  this:
    | ('api' extends Exclude<N, LifeSpan.Name> ? Omit<Starter.Api, 'while'> & { readonly while: Starter.While } : never)
    | (Exclude<N, 'api'> extends never
        ? never
        : Omit<
            {
              [K in Exclude<N, 'api'>]: Omit<Starter.LifeSpanApi<K>, 'while'> & { readonly while: Starter.While }
            }[Exclude<N, 'api'>],
            'watch'
          > & { readonly watch: LifeSpan.WatchData<LifeSpan.Definitions[Exclude<N, 'api'>]['data']> }),
  provided: ('api' extends Exclude<P, LifeSpan.Name> ? { api: Starter.Api } : {}) & {
    [K in Exclude<P, 'api'> as `${K}Api`]: Starter.LifeSpanApi<K>
  },
  ...args: A
) => R
