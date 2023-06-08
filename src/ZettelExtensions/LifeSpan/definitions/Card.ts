import { ZettelTypes } from '@zettelooo/api-types'
import { Id } from '@zettelooo/commons'
import { Scope } from '../../Scope'
import { HtmlContent } from '../../types/HtmlContent'
import { TypeBuilder } from '../TypeBuilder'
import { Registrar } from '../types'

export type Card<PD = any, CD = any> = TypeBuilder<
  {
    pageId: Id
    cardId: Id
  },
  [Scope.Device, Scope.User, Scope.Space, Scope.Page],
  {
    card: ZettelTypes.Extension.Model.Card<CD>
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
  export type Mode = 'full' | 'compact'

  export type ContextMenuItems = readonly ContextMenuItems.ContextMenuItem[]

  export namespace ContextMenuItems {
    export interface ContextMenuItem {
      readonly title: string
      readonly handler: () => void
    }
  }

  export interface ExtendedHtmlContent<S = undefined> extends HtmlContent<S> {
    readonly position?: ExtendedHtmlContent.Position
    readonly originalContent?: ExtendedHtmlContent.OriginalContent
  }

  export namespace ExtendedHtmlContent {
    export type Position = 'bottom' | 'top'
    export type OriginalContent = 'no preferences' | 'must show' | 'better show' | 'better hide' | 'must hide'

    export interface Reference<S = undefined> extends HtmlContent.Reference<S> {
      readonly update: (
        updates:
          | Partial<ExtendedHtmlContent<S>>
          | ((previous: ExtendedHtmlContent<S>) => Partial<ExtendedHtmlContent<S>>)
      ) => void
    }
  }
}
