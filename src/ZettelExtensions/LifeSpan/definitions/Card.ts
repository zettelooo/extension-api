import { ZettelTypes } from '@zettelooo/api-types'
import { Id } from '@zettelooo/commons'
import { Scope } from '../../Scope'
import { HtmlContent } from '../../types/HtmlContent'
import { TypeBuilder } from '../TypeBuilder'
import { Registrar } from '../types'

export type Card = TypeBuilder<
  {
    pageId: Id
    cardId: Id
  },
  [Scope.Device, Scope.User, Scope.Space, Scope.Page],
  {
    card: ZettelTypes.Extension.Entity.Card
    mode: Shared.Mode
  },
  {},
  {
    contextMenuItems(getter: () => Shared.ContextMenuItems): Registrar

    extendedHtmlContent<S = undefined>(
      getter: () => Shared.ExtendedHtmlContent<S>
    ): Registrar<Shared.ExtendedHtmlContent.Reference<S>>
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
