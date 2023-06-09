import { ZettelTypes } from '@zettelooo/api-types'
import { Id } from '@zettelooo/commons'
import { Scope } from '../../Scope'
import { HtmlContent } from '../../types/HtmlContent'
import { TypeBuilder } from '../TypeBuilder'
import { Registrar } from '../types'

export type Card<D extends ZettelTypes.Data = ZettelTypes.Data.Default> = TypeBuilder<
  {
    pageId: Id
    cardId: Id
  },
  [Scope.Device, Scope.User, Scope.Page],
  {
    card: ZettelTypes.Model.Card<D['cardPublic'], D['cardPrivate']>
  },
  {},
  {
    menuItem(getter: () => Shared.MenuItem): Registrar

    part<S = undefined>(getter: () => Shared.Part<S>): Registrar<Shared.Part.Reference<S>>
  }
>

export namespace Shared {
  export interface MenuItem {
    readonly title: string
    readonly handler: () => void
  }

  export interface Part<S = undefined> extends HtmlContent<S> {
    // Nothing more!
  }

  export namespace Part {
    export interface Reference<S = undefined> extends HtmlContent.Reference<S> {
      readonly update: (updates: Partial<Part<S>> | ((previous: Part<S>) => Partial<Part<S>>)) => void
    }
  }
}
