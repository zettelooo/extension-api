import { ZettelTypes } from '@zettelooo/api-types'
import { Id } from '@zettelooo/commons'
import { Scope } from '../../Scope'
import { TypeBuilder } from '../TypeBuilder'

export type MainView<D extends ZettelTypes.Data = ZettelTypes.Data.Default> = TypeBuilder<
  {},
  [Scope.Device, Scope.User],
  {
    openedPageId: Id | undefined
  },
  {
    openPage(pageId: Id, cardId?: Id): void
  },
  {}
>

export namespace Shared {}
