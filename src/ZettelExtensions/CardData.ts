import { ZettelTypes } from '@zettelooo/api-types'
import { Id } from '@zettelooo/commons'
import { PartialDeep, WritableDeep } from 'type-fest'

export interface CardData<D extends ZettelTypes.Data = ZettelTypes.Data.Default> {
  readonly description?: string
  readonly constructor?: CardData.Constructor<D>
  readonly extractors?: {
    readonly [extensionId: Id]: CardData.Extractor<D>
  }
}

export namespace CardData {
  export type Constructor<D extends ZettelTypes.Data = ZettelTypes.Data.Default> = (
    previousData: D['card'] | undefined,
    extractions: readonly PartialDeep<D['card']>[]
  ) => D['card'] | undefined

  export interface Extractor<D extends ZettelTypes.Data = ZettelTypes.Data.Default, T = any> {
    readonly to?: (data: D['card']) => WritableDeep<PartialDeep<T>> | undefined
    readonly from?: (data: T) => WritableDeep<PartialDeep<D['card']>> | undefined
  }
}
