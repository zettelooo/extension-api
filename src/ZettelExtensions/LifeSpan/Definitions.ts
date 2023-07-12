import { ZettelTypes } from '@zettelooo/api-types'
import { Activated } from './definitions/Activated'
import { Card } from './definitions/Card'
import { Composer } from './definitions/Composer'
import { MainView } from './definitions/MainView'
import { PagePanel } from './definitions/PagePanel'
import { PublicCardView } from './definitions/PublicCardView'
import { PublicPageView } from './definitions/PublicPageView'
import { SignedIn } from './definitions/SignedIn'
import { SignedOut } from './definitions/SignedOut'
import { Page } from './definitions/Page'

export interface Definitions<D extends ZettelTypes.Data = ZettelTypes.Data.Default> {
  activated: Activated<D>
  card: Card<D>
  composer: Composer<D>
  mainView: MainView<D>
  page: Page<D>
  pagePanel: PagePanel<D>
  publicCardView: PublicCardView<D>
  publicPageView: PublicPageView<D>
  signedIn: SignedIn<D>
  signedOut: SignedOut<D>
}
