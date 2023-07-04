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
  {
    // titleBarItem(getter: () => Shared.TitleBarItem): Registrar<Shared.TitleBarItem.Reference>
  }
>

export namespace Shared {
  // export interface TitleBarItem {
  //   readonly label: string
  //   readonly tooltip?: string
  //   readonly disabled?: boolean
  //   readonly hidden?: boolean
  //   readonly onClick?: () => void
  // }
  // export namespace TitleBarItem {
  //   export interface Reference {
  //     readonly update: (updates: Partial<TitleBarItem> | ((previous: TitleBarItem) => Partial<TitleBarItem>)) => void
  //   }
  // }
}
