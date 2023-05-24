import { Activated } from './definitions/Activated'
import { BlocksComposer } from './definitions/BlocksComposer'
import { Card } from './definitions/Card'
import { CardBlock } from './definitions/CardBlock'
import { MainView } from './definitions/MainView'
import { PagePanel } from './definitions/PagePanel'
import { PublicCardView } from './definitions/PublicCardView'
import { PublicPageView } from './definitions/PublicPageView'
import { SignedIn } from './definitions/SignedIn'
import { SignedOut } from './definitions/SignedOut'

export interface Definitions {
  activated: Activated
  signedIn: SignedIn
  signedOut: SignedOut
  mainView: MainView
  pagePanel: PagePanel
  blocksComposer: BlocksComposer
  card: Card
  cardBlock: CardBlock
  publicPageView: PublicPageView
  publicCardView: PublicCardView
}
