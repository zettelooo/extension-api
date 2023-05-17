import { Id } from '@zettelooo/commons'
import { ExtensionScope, MutableModel } from '@zettelooo/models'
import { NavigableStatus } from '../../adopted'
import { ExtensionLifeSpanRegistrar } from '../../extension-function'
import { HtmlContent } from '../../HtmlContent'
import { ExtensionLifeSpanType } from '../types'

export type PagePanelRenderedLifeSpan = ExtensionLifeSpanType<
  {
    pageId: Id
  },
  [ExtensionScope.Device, ExtensionScope.User, ExtensionScope.Space, ExtensionScope.Page],
  {
    navigableStatus: NavigableStatus
    page: MutableModel.Entity.Page
    pageMembers: readonly MutableModel.Entity.PageMember[]
    cards: readonly MutableModel.Entity.Card[]
  },
  {
    getPageName(): string
    pasteTextIntoComposer(text: string, html?: string): { success: boolean }
  },
  {
    activator(activator: Shared.Activator): ExtensionLifeSpanRegistrar<Shared.Activator.Reference>
    status(getter: () => Shared.Status): ExtensionLifeSpanRegistrar<Shared.Status.Reference>
    menuItem(getter: () => Shared.MenuItem): ExtensionLifeSpanRegistrar<Shared.MenuItem.Reference>
    message<S = undefined>(getter: () => Shared.Message<S>): ExtensionLifeSpanRegistrar<Shared.Message.Reference<S>>
    loadingIndicator(getter: () => string): ExtensionLifeSpanRegistrar
    composer<S = undefined>(getter: () => Shared.Composer<S>): ExtensionLifeSpanRegistrar<Shared.Composer.Reference<S>>
    quickAction(getter: () => Shared.QuickAction): ExtensionLifeSpanRegistrar<Shared.QuickAction.Reference>
    commandLinePromptInput(getter: () => Shared.CommandLinePromptInput): ExtensionLifeSpanRegistrar
  }
>

export namespace Shared {
  export type Activator = () => Activator.Result | Promise<Activator.Result>

  export namespace Activator {
    export type Result = 'activated' | 'not activated'

    export interface Reference {
      readonly update: (newActivator: Activator) => void
    }
  }

  export interface Status {
    readonly readonly?: boolean
    readonly hideOwner?: boolean
    readonly hideComposer?: boolean
  }

  export namespace Status {
    export interface Reference {
      readonly update: (updates: Partial<Status> | ((previous: Status) => Partial<Status>)) => void
    }
  }

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
    readonly variant?: 'success' | 'information' | 'warning' | 'error'
    readonly onClose?: () => void | 'prevent'
    readonly hidden?: boolean
  }

  export namespace Message {
    export interface Reference<S = undefined> extends HtmlContent.Reference<S> {
      readonly update: (updates: Partial<Message<S>> | ((previous: Message<S>) => Partial<Message<S>>)) => void
    }
  }

  export interface Composer<S = undefined> extends HtmlContent<S> {
    readonly hidden?: boolean
  }

  export namespace Composer {
    export interface Reference<S = undefined> extends HtmlContent.Reference<S> {
      readonly update: (updates: Partial<Composer<S>> | ((previous: Composer<S>) => Partial<Composer<S>>)) => void
    }
  }

  export type QuickAction = {
    readonly title: string
    readonly description?: string
    readonly avatarUrl?: string
    readonly category?: QuickAction.Category
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

    export enum Category {
      Productivity = 'PRODUCTIVITY',
      Personal = 'PERSONAL',
      Crypto = 'CRYPTO',
    }
  }

  export interface CommandLinePromptInput {
    readonly prompt: string
    readonly placeholder?: string
    readonly initialValue?: string
    readonly required?: boolean
    readonly onCancel?: () => void
    readonly onSubmit?: (value: string) => void
  }
}
