import { ZettelTypes } from '@zettelooo/api-types'
import { CardData } from './CardData'
import { Starter } from './Starter'
import { Services } from './Services'

export interface ExtendedWindow<D extends ZettelTypes.Data = ZettelTypes.Data.Default> extends Window {
  $starter?: Starter<D>
  $cardData?: CardData<D>
  $services?: Services
}
