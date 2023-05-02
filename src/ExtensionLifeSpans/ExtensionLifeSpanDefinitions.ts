import { ActivatedLifeSpan } from './life-spans/ActivatedLifeSpan'
import { BlocksComposerLifeSpan } from './life-spans/BlocksComposerLifeSpan'
import { CardBlockRenderedLifeSpan } from './life-spans/CardBlockRenderedLifeSpan'
import { CardRenderedLifeSpan } from './life-spans/CardRenderedLifeSpan'
import { MainViewRenderedLifeSpan } from './life-spans/MainViewRenderedLifeSpan'
import { PagePanelRenderedLifeSpan } from './life-spans/PagePanelRenderedLifeSpan'
import { PublicCardViewRenderedLifeSpan } from './life-spans/PublicCardViewRenderedLifeSpan'
import { PublicPageViewRenderedLifeSpan } from './life-spans/PublicPageViewRenderedLifeSpan'
import { SignedInLifeSpan } from './life-spans/SignedInLifeSpan'
import { SignedOutLifeSpan } from './life-spans/SignedOutLifeSpan'

export interface ExtensionLifeSpanDefinitions {
  activated: ActivatedLifeSpan
  signedIn: SignedInLifeSpan
  signedOut: SignedOutLifeSpan
  mainViewRendered: MainViewRenderedLifeSpan
  pagePanelRendered: PagePanelRenderedLifeSpan
  blocksComposer: BlocksComposerLifeSpan
  cardRendered: CardRenderedLifeSpan
  cardBlockRendered: CardBlockRenderedLifeSpan
  publicPageViewRendered: PublicPageViewRenderedLifeSpan
  publicCardViewRendered: PublicCardViewRenderedLifeSpan
}
