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
    page: ZettelTypes.Model.Page<D['page']>
    card: ZettelTypes.Model.Card<D['card']>
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
    readonly position?: Part.Position
  }

  export namespace Part {
    export type Position = 'middle' | 'bottom' | 'top'

    export interface Reference<S = undefined> extends HtmlContent.Reference<S> {
      readonly update: (updates: Partial<Part<S>> | ((previous: Part<S>) => Partial<Part<S>>)) => void
    }
  }
}
