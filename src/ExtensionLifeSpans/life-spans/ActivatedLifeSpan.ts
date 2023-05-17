import { Id, PartialReadonlyRecord, HandlerOutput } from '@zettelooo/commons'
import { ExtensionScope, MutableModel } from '@zettelooo/models'
import { HtmlContent } from '../../HtmlContent'
import { RenderedElement } from '../../RenderedElement'
import { Language, ConfirmationDialogOptions, CommandGroup } from '../../adopted'
import { ExtensionLifeSpanRegistrar } from '../../extension-function'
import { ExtensionLifeSpanType } from '../types'

export type ActivatedLifeSpan = ExtensionLifeSpanType<
  {},
  [ExtensionScope.Device],
  {
    deviceId: Id
    themeType: 'light' | 'dark'
    language: Language
    allUsers: readonly MutableModel.Entity.User[]
    allUsersDictionary: PartialReadonlyRecord<Id, MutableModel.Entity.User>
    allPageMembers: readonly MutableModel.Entity.PageMember[]
  },
  {
    showMessage(
      title: string,
      message: string,
      options?: {
        variant?: 'success' | 'information' | 'warning' | 'error'
        onClick?(): void
      }
    ): void

    confirm(options?: Partial<ConfirmationDialogOptions>): Promise<boolean>

    /** If it's canceled by the user, this will be rejected by `"Canceled"` */
    commandBarSelectItem<T>(options: {
      prompt?: string
      description?: string
      items: readonly T[]
      getTitle(item: T): string
      getDescription?(item: T): string
    }): Promise<T>

    /** If it's canceled by the user, this will be rejected by `"Canceled"` */
    commandBarInputString(options?: {
      prompt?: string
      description?: string
      placeholder?: string
      initialValue?: string
    }): Promise<string>

    /** If it's canceled by the user, this will be rejected by `"Canceled"` */
    commandBarInputStringWithSelectItem<T>(options: {
      prompt?: string
      description?: string
      placeholder?: string
      initialValue?: string
      items: readonly T[]
      getTitle(item: T): string
      getDescription?(item: T): string
      getValue?(item: T): string
    }): Promise<{ value: string; selectedItem?: T }>

    runCommandStatic(codeName: string): HandlerOutput | Promise<HandlerOutput>

    generateId(): Id

    copyTextToClipboard(text: string): void
  },
  {
    commandGroup(getter: () => CommandGroup): ExtensionLifeSpanRegistrar

    dialog<S = undefined>(getter: () => Shared.Dialog<S>): ExtensionLifeSpanRegistrar<Shared.Dialog.Reference<S>>

    renderedButton(getter: () => Shared.RenderedButton): ExtensionLifeSpanRegistrar<Shared.RenderedButton.Reference>

    renderedTextField(
      getter: () => Shared.RenderedTextField
    ): ExtensionLifeSpanRegistrar<Shared.RenderedTextField.Reference>

    renderedSelect(getter: () => Shared.RenderedSelect): ExtensionLifeSpanRegistrar<Shared.RenderedSelect.Reference>

    renderedCardViewerFull(
      getter: () => Shared.RenderedCardViewerFull
    ): ExtensionLifeSpanRegistrar<Shared.RenderedCardViewerFull.Reference>

    renderedCardViewerCompact(
      getter: () => Shared.RenderedCardViewerCompact
    ): ExtensionLifeSpanRegistrar<Shared.RenderedCardViewerCompact.Reference>
  }
>

export namespace Shared {
  export interface Dialog<S = undefined> extends HtmlContent<S> {
    readonly fullScreen?: boolean
    readonly fullWidth?: boolean
    readonly maxWidth?: 'lg' | 'md' | 'sm' | 'xl' | 'xs' | false
    readonly title?: string
    readonly actions?: Dialog.Action[]
    readonly onCloseRequest?: (sender: Dialog.CloseRequestSender) => void
    readonly hideCloseIconButton?: boolean
    readonly scrollContainer?: 'paper' | 'body'
  }

  export namespace Dialog {
    export interface Reference<S = undefined> extends HtmlContent.Reference<S> {
      readonly update: (updates: Partial<Dialog<S>> | ((previous: Dialog<S>) => Partial<Dialog<S>>)) => void
    }

    export interface Action {
      readonly title: string
      readonly variant?: 'text' | 'outlined' | 'contained'
      readonly onClick?: () => void
      readonly disabled?: boolean
    }

    export type CloseRequestSender = 'escape key press' | 'backdrop click' | 'close icon button click'
  }

  export interface RenderedButton extends RenderedElement {
    readonly label: string
    readonly variant?: 'contained' | 'outlined' | 'text'
    readonly size?: 'large' | 'medium' | 'small'
    readonly fullWidth?: boolean
    readonly color?: 'default' | 'inherit' | 'primary' | 'secondary'
    readonly disabled?: boolean
    readonly onClick?: (event: MouseEvent) => void
  }

  export namespace RenderedButton {
    export interface Reference {
      readonly update: (
        updates: Partial<RenderedButton> | ((previous: RenderedButton) => Partial<RenderedButton>)
      ) => void
    }
  }

  export interface RenderedTextField extends RenderedElement {
    readonly type?: string
    readonly variant?: 'filled' | 'outlined' | 'standard'
    readonly size?: 'medium' | 'small'
    readonly fullWidth?: boolean
    readonly color?: 'primary' | 'secondary'
    readonly placeholder?: string
    readonly disabled?: boolean
    readonly required?: boolean
    readonly defaultValue?: string
    readonly value?: string
    readonly onValueUpdate?: (newValue: string) => void
    readonly label?: string
    readonly helperText?: string
    readonly error?: boolean
    readonly margin?: 'dense' | 'none' | 'normal'
    readonly multiline?: boolean
    readonly minRows?: number
    readonly maxRows?: number
    readonly autoFocus?: boolean
  }

  export namespace RenderedTextField {
    export interface Reference {
      readonly update: (
        updates: Partial<RenderedTextField> | ((previous: RenderedTextField) => Partial<RenderedTextField>)
      ) => void
    }
  }

  export interface RenderedSelect extends RenderedElement {
    readonly variant?: 'filled' | 'outlined' | 'standard'
    readonly size?: 'medium' | 'small'
    readonly fullWidth?: boolean
    readonly autoWidth?: boolean
    readonly color?: 'primary' | 'secondary'
    readonly disabled?: boolean
    readonly required?: boolean
    readonly defaultValue?: any
    readonly value?: any
    readonly onValueUpdate?: (newValue: any) => void
    readonly label?: string
    readonly multiple?: boolean
    readonly displayEmpty?: boolean
    readonly renderValue?: (value: any) => string
    readonly open?: boolean
    readonly onOpen?: () => void
    readonly onClose?: () => void
    readonly helperText?: string
    readonly error?: boolean
    readonly margin?: 'dense' | 'none'
    readonly options: readonly RenderedSelect.Option[]
  }

  export namespace RenderedSelect {
    export interface Option {
      readonly label: string
      readonly value: any
    }

    export interface Reference {
      readonly update: (
        updates: Partial<RenderedSelect> | ((previous: RenderedSelect) => Partial<RenderedSelect>)
      ) => void
    }
  }

  export interface RenderedCardViewerFull extends RenderedElement {
    readonly card: MutableModel.Entity.Card
    readonly readonly?: boolean
    readonly scale?: number
    readonly previewHeight: number
    readonly maximumHeight?: number
    readonly hideOwner?: boolean
    readonly displayPage?: MutableModel.Entity.Page
    readonly showTimestamp?: boolean
    readonly isHighlighted?: boolean
  }

  export namespace RenderedCardViewerFull {
    export interface Reference {
      readonly update: (
        updates:
          | Partial<RenderedCardViewerFull>
          | ((previous: RenderedCardViewerFull) => Partial<RenderedCardViewerFull>)
      ) => void
    }
  }

  export interface RenderedCardViewerCompact extends RenderedElement {
    readonly card: MutableModel.Entity.Card
    readonly readonly?: boolean
    readonly scale?: number
    readonly previewWidth: number
  }

  export namespace RenderedCardViewerCompact {
    export interface Reference {
      readonly update: (
        updates:
          | Partial<RenderedCardViewerCompact>
          | ((previous: RenderedCardViewerCompact) => Partial<RenderedCardViewerCompact>)
      ) => void
    }
  }
}
