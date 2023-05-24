import { ZettelTypes } from '@zettelooo/api-types'
import { Id } from '@zettelooo/commons'
import { Scope } from '../../Scope'
import { TypeBuilder } from '../TypeBuilder'

export type PublicPageView = TypeBuilder<
  {
    pageId: Id
  },
  [Scope.Device, Scope.User, Scope.Space, Scope.Page],
  {
    page: ZettelTypes.Extension.Entity.Page
    cards: readonly ZettelTypes.Extension.Entity.Card[]
  },
  {
    getPageName(): string
  },
  {}
>

export namespace Shared {}
