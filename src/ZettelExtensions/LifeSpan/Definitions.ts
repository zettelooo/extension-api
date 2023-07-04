import { ZettelTypes } from '@zettelooo/api-types'
import { Activated } from './definitions/Activated'
import { Card } from './definitions/Card'
import { MainView } from './definitions/MainView'
import { PagePanel } from './definitions/PagePanel'
import { PublicCardView } from './definitions/PublicCardView'
import { PublicPageView } from './definitions/PublicPageView'
import { SignedIn } from './definitions/SignedIn'
import { SignedOut } from './definitions/SignedOut'

export interface Definitions<D extends ZettelTypes.Data = ZettelTypes.Data.Default> {
  activated: Activated<D>
  signedIn: SignedIn<D>
  signedOut: SignedOut<D>
  mainView: MainView<D>
  pagePanel: PagePanel<D>
  card: Card<D>
  publicPageView: PublicPageView<D>
  publicCardView: PublicCardView<D>
}
