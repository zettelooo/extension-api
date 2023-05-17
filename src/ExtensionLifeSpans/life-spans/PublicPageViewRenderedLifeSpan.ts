import { Id } from '@zettelooo/commons'
import { ExtensionScope, MutableModel } from '@zettelooo/models'
import { ExtensionLifeSpanType } from '../types'

export type PublicPageViewRenderedLifeSpan = ExtensionLifeSpanType<
  {
    pageId: Id
  },
  [ExtensionScope.Device, ExtensionScope.User, ExtensionScope.Space, ExtensionScope.Page],
  {
    page: MutableModel.Entity.Page
    cards: readonly MutableModel.Entity.Card[]
  },
  {
    getPageName(): string
  },
  {}
>

export namespace Shared {}
