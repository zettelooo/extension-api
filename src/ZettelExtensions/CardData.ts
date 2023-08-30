import { ZettelTypes } from '@zettelooo/api-types'
import { Id } from '@zettelooo/commons'
import { PartialDeep, WritableDeep } from 'type-fest'

export interface CardData<D extends ZettelTypes.Data = ZettelTypes.Data.Default> {
  readonly description?: string
  readonly construct?: CardData.Constructor<D>
  readonly extractors?: {
    readonly [extensionId: Id]: CardData.Extractor<D>
  }
  readonly commonExtractor?: CardData.Extractor<D, CardData.CommonData>
}

export namespace CardData {
  export type Constructor<D extends ZettelTypes.Data = ZettelTypes.Data.Default> = (
    previousData: D['card'] | undefined,
    issuingExtractions: readonly PartialDeep<D['card']>[],
    getOtherExtractions: () => PartialDeep<D['card']>[]
  ) => D['card'] | undefined

  export interface Extractor<D extends ZettelTypes.Data = ZettelTypes.Data.Default, T = any> {
    readonly to?: (data: D['card']) => WritableDeep<PartialDeep<T>> | undefined
    readonly from?: (data: T) => WritableDeep<PartialDeep<D['card']>> | undefined
  }

  export interface CommonData {
    readonly text?: string
    // TODO: Files and other fields to be added.
  }
}
