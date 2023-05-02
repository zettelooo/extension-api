import { Id } from '@zettelyay/commons'
import { ExtensionScope, MutableModel } from '@zettelyay/models'
import { NavigableStatus } from '../../adopted'
import { ExtensionLifeSpanRegistrar } from '../../extension-function'
import { HtmlContent } from '../../HtmlContent'
import { ExtensionLifeSpanType } from '../types'

export type CardRenderedLifeSpan = ExtensionLifeSpanType<
  {
    pageId: Id
    cardId: Id
  },
  [ExtensionScope.Device, ExtensionScope.User, ExtensionScope.Space, ExtensionScope.Page],
  {
    card: MutableModel.Entity.Card
    navigableStatus: NavigableStatus
    mode: Shared.Mode
  },
  {},
  {
    contextMenuItems(getter: () => Shared.ContextMenuItems): ExtensionLifeSpanRegistrar
    extendedHtmlContent<S = undefined>(
      getter: () => Shared.ExtendedHtmlContent<S>
    ): ExtensionLifeSpanRegistrar<Shared.ExtendedHtmlContent.Reference<S>>
  }
>

export namespace Shared {
  export enum Mode {
    Full = 'FULL',
    Compact = 'COMPACT',
  }

  export type ContextMenuItems = readonly ContextMenuItems.ContextMenuItem[]

  export namespace ContextMenuItems {
    export interface ContextMenuItem {
      readonly title: string
      readonly handler: () => void
    }
  }

  export interface ExtendedHtmlContent<S = undefined> extends HtmlContent<S> {
    readonly position: 'top' | 'bottom'
    readonly hidden?: boolean
  }

  export namespace ExtendedHtmlContent {
    export interface Reference<S = undefined> extends HtmlContent.Reference<S> {
      readonly update: (
        updates:
          | Partial<ExtendedHtmlContent<S>>
          | ((previous: ExtendedHtmlContent<S>) => Partial<ExtendedHtmlContent<S>>)
      ) => void
    }
  }
}
