import { ZettelTypes } from '@zettelooo/api-types'
import { Id } from '@zettelooo/commons'
import { Scope } from '../../Scope'
import { TypeBuilder } from '../TypeBuilder'

export type PublicCardView = TypeBuilder<
  {
    cardId: Id
  },
  [Scope.Device, Scope.User, Scope.Space, Scope.Page],
  {
    card: ZettelTypes.Extension.Entity.Card
  },
  {},
  {}
>

export namespace Shared {}
