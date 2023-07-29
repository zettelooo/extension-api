import { ZettelTypes } from '@zettelooo/api-types'
import { CardData } from '../CardData'
import { ExtendedWindow } from '../ExtendedWindow'

export function setCardData<D extends ZettelTypes.Data = ZettelTypes.Data.Default>(cardData: CardData<D>): void {
  const extendedWindow = window as ExtendedWindow<D>
  if (extendedWindow.$cardData === undefined) {
    extendedWindow.$cardData = cardData
  }
}
