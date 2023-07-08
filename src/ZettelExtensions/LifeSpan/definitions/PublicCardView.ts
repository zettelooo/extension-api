import { ZettelTypes } from '@zettelooo/api-types'
import { Id } from '@zettelooo/commons'
import { Scope } from '../../Scope'
import { TypeBuilder } from '../TypeBuilder'

export type PublicCardView<D extends ZettelTypes.Data = ZettelTypes.Data.Default> = TypeBuilder<
  {
    cardId: Id
  },
  [Scope.Device, Scope.User, Scope.Page],
  {
    card: ZettelTypes.Model.Card<D['cardPublic'], D['cardPrivate']>
  },
  {},
  {}
>

export namespace Shared {}
