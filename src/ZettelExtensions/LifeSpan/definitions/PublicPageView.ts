import { ZettelTypes } from '@zettelooo/api-types'
import { Id } from '@zettelooo/commons'
import { Scope } from '../../Scope'
import { TypeBuilder } from '../TypeBuilder'

export type PublicPageView<PD = any, CD = any> = TypeBuilder<
  {
    pageId: Id
  },
  [Scope.Device, Scope.User, Scope.Space, Scope.Page],
  {
    page: ZettelTypes.Extension.Model.Page<PD>
    cards: readonly ZettelTypes.Extension.Model.Card<CD>[]
  },
  {},
  {}
>

export namespace Shared {}
