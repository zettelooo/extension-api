import { ZettelTypes } from '@zettelooo/api-types'
import { Id } from '@zettelooo/commons'
import { Scope } from '../../Scope'
import { TypeBuilder } from '../TypeBuilder'

export type PublicPageView<D extends ZettelTypes.Data = ZettelTypes.Data.Default> = TypeBuilder<
  {
    pageId: Id
  },
  [Scope.Device, Scope.User, Scope.Page],
  {
    page: ZettelTypes.Model.Page<D['page']>
    cards: readonly ZettelTypes.Model.Card<D['card']>[]
  },
  {},
  {}
>

export namespace Shared {}
