import { Id } from '@zettelyay/commons'
import { ExtensionScope, MutableModel } from '@zettelyay/models'
import { ExtensionLifeSpanType } from '../types'

export type PublicCardViewRenderedLifeSpan = ExtensionLifeSpanType<
  {
    cardId: Id
  },
  [ExtensionScope.Device, ExtensionScope.User, ExtensionScope.Space, ExtensionScope.Page],
  {
    card: MutableModel.Entity.Card
  },
  {},
  {}
>

export namespace Shared {}
