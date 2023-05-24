import { ZettelTypes } from '@zettelooo/api-types'
import { Id } from '@zettelooo/commons'
import { Scope } from '../../Scope'
import { HtmlContent } from '../../types/HtmlContent'
import { TypeBuilder } from '../TypeBuilder'
import { Registrar } from '../types'

export type CardBlock = TypeBuilder<
  {
    pageId: Id
    cardId: Id
    blockId: Id
  },
  [Scope.Device, Scope.User, Scope.Space, Scope.Page],
  {
    card: ZettelTypes.Extension.Entity.Card
    block: ZettelTypes.Extension.Entity.Block
    mode: Shared.Mode
  },
  {},
  {
    displayOptions(getter: () => Shared.DisplayOptions): Registrar<Shared.DisplayOptions.Reference>

    appendedContent(getter: () => readonly Shared.AppendedContent.Part[]): Registrar<Shared.AppendedContent.Reference>

    appendedHtmlContent<S = undefined>(
      getter: () => Shared.AppendedHtmlContent<S>
    ): Registrar<Shared.AppendedHtmlContent.Reference<S>>
  }
>

export namespace Shared {
  export enum Mode {
    Full = 'FULL',
    Compact = 'COMPACT',
  }

  export interface DisplayOptions {
    readonly disabled?: boolean
    readonly hideBase?: boolean
    readonly hideExtendedContent?: boolean
  }

  export namespace DisplayOptions {
    export interface Reference {
      readonly update: (
        updates: Partial<DisplayOptions> | ((previous: DisplayOptions) => Partial<DisplayOptions>)
      ) => void
    }
  }

  export type AppendedContent = readonly AppendedContent.Part[]

  export namespace AppendedContent {
    export type Part =
      | {
          readonly type: 'new line'
        }
      | {
          readonly type: 'text'
          readonly text: string
          readonly bold?: boolean
          readonly italic?: boolean
        }
      | {
          readonly type: 'chip'
          readonly label: string
          readonly onClick?: () => void
        }
      | {
          readonly type: 'button'
          readonly label: string
          readonly onClick?: () => void
        }
      | {
          readonly type: 'select'
          readonly label?: string
          readonly items: readonly string[]
          readonly selectedItem?: string
          readonly onSelect?: (item: string) => void
        }

    export interface Reference {
      readonly update: (newParts: AppendedContent | ((previous: AppendedContent) => AppendedContent)) => void
    }
  }

  export interface AppendedHtmlContent<S = undefined> extends HtmlContent<S> {
    readonly hidden?: boolean
  }

  export namespace AppendedHtmlContent {
    export interface Reference<S = undefined> extends HtmlContent.Reference<S> {
      readonly update: (
        updates:
          | Partial<AppendedHtmlContent<S>>
          | ((previous: AppendedHtmlContent<S>) => Partial<AppendedHtmlContent<S>>)
      ) => void
    }
  }
}
