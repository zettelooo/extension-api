import { ZettelTypes } from '@zettelooo/api-types'
import { Id } from '@zettelooo/commons'
import { Scope } from '../../Scope'
import { HtmlContent } from '../../types/HtmlContent'
import { RenderedElement } from '../../types/RenderedElement'
import { TypeBuilder } from '../TypeBuilder'
import { Registrar } from '../types'

export type Activated<D extends ZettelTypes.Data = ZettelTypes.Data.Default> = TypeBuilder<
  {},
  [Scope.Device],
  {
    deviceId: Id
    themeType: 'light' | 'dark'
    language: string
  },
  {
    showMessage(title: string, message: string, options?: Shared.ShowMessage.Options): void

    confirm(options?: Shared.Confirm.Options): Promise<boolean>

    /** @throws If it's canceled by the user, this will be rejected by `"Canceled"` */
    selectItem<T>(options: Shared.SelectItem.Options<T>): Promise<T>

    /** @throws If it's canceled by the user, this will be rejected by `"Canceled"` */
    inputString(options?: Shared.InputString.Options): Promise<string>

    /** @throws If it's canceled by the user, this will be rejected by `"Canceled"` */
    inputStringWithSelectItem<T>(
      options: Shared.InputStringWithSelection.Options<T>
    ): Promise<{ value: string; selectedItem?: T }>

    generateId(): Id

    copyTextToClipboard(text: string): void

    getPagePublicUrl(pageId: Id): string

    getCardPublicUrl(cardId: Id): string
  },
  {
    dialog<S = undefined>(getter: () => Shared.Dialog<S>): Registrar<Shared.Dialog.Reference<S>>

    renderedButton(getter: () => Shared.RenderedButton): Registrar<Shared.RenderedButton.Reference>

    renderedTextField(getter: () => Shared.RenderedTextField): Registrar<Shared.RenderedTextField.Reference>

    renderedSelect(getter: () => Shared.RenderedSelect): Registrar<Shared.RenderedSelect.Reference>

    renderedCard(getter: () => Shared.RenderedCard<D>): Registrar<Shared.RenderedCard.Reference<D>>
  }
>

export namespace Shared {
  export namespace ShowMessage {
    export interface Options {
      readonly variant?: Options.Variant
      readonly onClick?: () => void
    }

    export namespace Options {
      export type Variant = 'success' | 'information' | 'warning' | 'error'
    }
  }

  export namespace Confirm {
    export interface Options {
      readonly title?: string
      readonly content?: string
      readonly confirmLabel?: string
      readonly cancelLabel?: string
      readonly forceSelect?: boolean
    }
  }

  export namespace SelectItem {
    export interface Options<T> {
      readonly prompt?: string
      readonly description?: string
      readonly items: readonly T[]
      readonly getTitle: (item: T) => string
      readonly getDescription?: (item: T) => string
    }
  }

  export namespace InputString {
    export interface Options {
      readonly prompt?: string
      readonly description?: string
      readonly placeholder?: string
      readonly initialValue?: string
    }
  }

  export namespace InputStringWithSelection {
    export interface Options<T> {
      readonly prompt?: string
      readonly description?: string
      readonly placeholder?: string
      readonly initialValue?: string
      readonly items: readonly T[]
      readonly getTitle: (item: T) => string
      readonly getDescription?: (item: T) => string
      readonly getValue?: (item: T) => string
    }
  }

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

  export interface RenderedCard<D extends ZettelTypes.Data = ZettelTypes.Data.Default> extends RenderedElement {
    readonly card: ZettelTypes.Model.Card<D['card']>
    readonly isHighlighted?: boolean
  }

  export namespace RenderedCard {
    export interface Reference<D extends ZettelTypes.Data = ZettelTypes.Data.Default> {
      readonly update: (
        updates: Partial<RenderedCard<D>> | ((previous: RenderedCard<D>) => Partial<RenderedCard<D>>)
      ) => void
    }
  }
}
