import { ZettelTypes } from '@zettelooo/api-types'
import { Id } from '@zettelooo/commons'
import { Scope } from '../../Scope'
import { HtmlContent } from '../../types/HtmlContent'
import { TypeBuilder } from '../TypeBuilder'
import { Registrar } from '../types'

export type PagePanel<D extends ZettelTypes.Data = ZettelTypes.Data.Default> = TypeBuilder<
  {
    pageId: Id
  },
  [Scope.Device, Scope.User, Scope.Space, Scope.Page],
  {
    page: ZettelTypes.Model.Page<D['pagePrivate']>
    cards: readonly ZettelTypes.Model.Card<D['cardPublic'], D['cardPrivate']>[]
  },
  {
    consumeService(name: string): ((requestData: any) => Promise<any>) | null
  },
  {
    provideService(name: string, service: (requestData: any) => any | Promise<any>): Registrar

    menuItem(getter: () => Shared.MenuItem): Registrar<Shared.MenuItem.Reference>

    message<S = undefined>(getter: () => Shared.Message<S>): Registrar<Shared.Message.Reference<S>>

    loadingIndicator(getter: () => string): Registrar

    composerPart<S = undefined, D extends ZettelTypes.Data = ZettelTypes.Data.Default>(
      getter: () => Shared.ComposerPart<S, D>
    ): Registrar<Shared.ComposerPart.Reference<S, D>>

    quickAction(getter: () => Shared.QuickAction): Registrar<Shared.QuickAction.Reference>

    // commandLinePromptInput(getter: () => Shared.CommandLinePromptInput): Registrar
  }
>

export namespace Shared {
  export interface MenuItem {
    readonly title: string
    handler(): void
  }

  export namespace MenuItem {
    export interface Reference {
      readonly update: (updates: Partial<MenuItem> | ((previous: MenuItem) => Partial<MenuItem>)) => void
    }
  }

  export interface Message<S = undefined> extends HtmlContent<S> {
    readonly variant?: Message.Variant
    readonly onClose?: () => void | 'prevent'
    readonly hidden?: boolean
  }

  export namespace Message {
    export type Variant = 'success' | 'information' | 'warning' | 'error'

    export interface Reference<S = undefined> extends HtmlContent.Reference<S> {
      readonly update: (updates: Partial<Message<S>> | ((previous: Message<S>) => Partial<Message<S>>)) => void
    }
  }

  export interface ComposerPart<S = undefined, D extends ZettelTypes.Data = ZettelTypes.Data.Default>
    extends HtmlContent<S> {
    readonly position?: 'bottom' | 'top'
    readonly formatState: (data: ComposerPart.Data<D>) => S
    readonly parseState: (state: S, previousData?: ComposerPart.Data<D>) => ComposerPart.Data<D>
  }

  export namespace ComposerPart {
    export type Data<D extends ZettelTypes.Data = ZettelTypes.Data.Default> = Pick<
      ZettelTypes.Model.Card<D['cardPublic'], D['cardPrivate']>,
      'publicData' | 'privateData'
    >

    export interface Reference<S = undefined, D extends ZettelTypes.Data = ZettelTypes.Data.Default>
      extends HtmlContent.Reference<S> {
      readonly update: (
        updates: Partial<ComposerPart<S, D>> | ((previous: ComposerPart<S, D>) => Partial<ComposerPart<S, D>>)
      ) => void
    }
  }

  export type QuickAction = {
    readonly title: string
    readonly description?: string
    readonly avatarUrl?: string
    readonly disabled?: boolean
  } & (
    | {
        readonly switchChecked?: undefined
        readonly onClick: () => void | Promise<void>
      }
    | {
        readonly switchChecked: boolean
        readonly onClick?: () => void | Promise<void>
        readonly onToggleSwitch?: (checked: boolean) => void | Promise<void>
      }
  )

  export namespace QuickAction {
    export interface Reference {
      readonly update: (updates: Partial<QuickAction> | ((previous: QuickAction) => Partial<QuickAction>)) => void
    }
  }

  // export interface CommandLinePromptInput {
  //   readonly prompt: string
  //   readonly placeholder?: string
  //   readonly initialValue?: string
  //   readonly required?: boolean
  //   readonly onCancel?: () => void
  //   readonly onSubmit?: (value: string) => void
  // }
}
