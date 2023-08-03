import { ZettelTypes } from '@zettelooo/api-types'
import { Id } from '@zettelooo/commons'
import { Scope } from '../../Scope'
import { HtmlContent } from '../../types/HtmlContent'
import { TypeBuilder } from '../TypeBuilder'
import { Registrar } from '../types'

export type Composer<D extends ZettelTypes.Data = ZettelTypes.Data.Default> = TypeBuilder<
  {
    pageId: Id
  },
  [Scope.Device, Scope.User, Scope.Page],
  {
    page: ZettelTypes.Model.Page<D['page']>
    card?: ZettelTypes.Model.Card<D['card']>
  },
  {
    submit(): Promise<void>

    reset(): void
  },
  {
    part<S = undefined>(getter: () => Shared.Part<S, D>): Registrar<Shared.Part.Reference<S, D>>
  }
>

export namespace Shared {
  export interface Part<S = undefined, D extends ZettelTypes.Data = ZettelTypes.Data.Default>
    extends Omit<HtmlContent<S>, 'initialState'> {
    readonly position?: Part.Position
    readonly hideControls?: boolean
    readonly formatState: (data: D['card']) => S
    /** Just throw an error with a proper message if it can not be done. */
    readonly parseState: (state: S, previousData?: D['card']) => D['card']
  }

  export namespace Part {
    export type Position = 'middle' | 'bottom' | 'top'

    export interface Reference<S = undefined, D extends ZettelTypes.Data = ZettelTypes.Data.Default>
      extends HtmlContent.Reference<S> {
      readonly update: (updates: Partial<Part<S, D>> | ((previous: Part<S, D>) => Partial<Part<S, D>>)) => void
    }
  }
}
