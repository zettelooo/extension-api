import { Id } from '@zettelooo/commons'
import { ExtensionScope, MutableModel } from '@zettelooo/models'
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
