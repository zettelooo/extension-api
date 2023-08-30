import { ZettelTypes } from '@zettelooo/api-types'
import { DeepPartial, DeepWritable, Id } from '@zettelooo/commons'

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
    issuingExtractions: readonly DeepPartial<D['card']>[],
    getOtherExtractions: () => DeepPartial<D['card']>[]
  ) => D['card'] | undefined

  export interface Extractor<D extends ZettelTypes.Data = ZettelTypes.Data.Default, T = any> {
    readonly to?: (data: D['card']) => DeepWritable<DeepPartial<T>> | undefined
    readonly from?: (data: T) => DeepWritable<DeepPartial<D['card']>> | undefined
  }

  export interface CommonData {
    readonly text?: string
    // TODO: Files and other fields to be added.
  }
}
