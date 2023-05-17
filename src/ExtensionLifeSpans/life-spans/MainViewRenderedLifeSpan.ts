import { Id } from '@zettelooo/commons'
import { ExtensionScope } from '@zettelooo/models'
import { ExtensionLifeSpanRegistrar } from '../../extension-function'
import { ExtensionLifeSpanType } from '../types'

export type MainViewRenderedLifeSpan = ExtensionLifeSpanType<
  {},
  [ExtensionScope.Device, ExtensionScope.User],
  {
    openedPageId: Id | undefined
  },
  {
    openPage(pageId: Id, cardId?: Id): void
  },
  {
    titleBarItem(getter: () => Shared.TitleBarItem): ExtensionLifeSpanRegistrar<Shared.TitleBarItem.Reference>
  }
>

export namespace Shared {
  export interface TitleBarItem {
    readonly label: string
    readonly tooltip?: string
    readonly disabled?: boolean
    readonly hidden?: boolean
    readonly onClick?: () => void
  }

  export namespace TitleBarItem {
    export interface Reference {
      readonly update: (updates: Partial<TitleBarItem> | ((previous: TitleBarItem) => Partial<TitleBarItem>)) => void
    }
  }
}
