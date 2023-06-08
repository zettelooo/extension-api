import { Activated } from './definitions/Activated'
import { Card } from './definitions/Card'
import { MainView } from './definitions/MainView'
import { PagePanel } from './definitions/PagePanel'
import { PublicCardView } from './definitions/PublicCardView'
import { PublicPageView } from './definitions/PublicPageView'
import { SignedIn } from './definitions/SignedIn'
import { SignedOut } from './definitions/SignedOut'

export interface Definitions<PD = any, CD = any> {
  activated: Activated<PD, CD>
  signedIn: SignedIn<PD, CD>
  // signedOut: SignedOut<PD, CD>
  mainView: MainView<PD, CD>
  pagePanel: PagePanel<PD, CD>
  card: Card<PD, CD>
  publicPageView: PublicPageView<PD, CD>
  publicCardView: PublicCardView<PD, CD>
}
