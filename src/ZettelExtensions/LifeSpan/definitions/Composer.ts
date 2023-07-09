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
    page: ZettelTypes.Model.Page<D['pagePrivate']>
    card?: ZettelTypes.Model.Card<D['cardPublic'], D['cardPrivate']>
  },
  {},
  {
    part<S = undefined>(getter: () => Shared.Part<S, D>): Registrar<Shared.Part.Reference<S, D>>
  }
>

export namespace Shared {
  export interface Part<S = undefined, D extends ZettelTypes.Data = ZettelTypes.Data.Default> extends HtmlContent<S> {
    readonly hideControls?: boolean
    readonly formatState: (data: Part.Data<D>) => S
    readonly parseState: (state: S, previousData?: Part.Data<D>) => Part.Data<D>
  }

  export namespace Part {
    export type Data<D extends ZettelTypes.Data = ZettelTypes.Data.Default> = Pick<
      ZettelTypes.Model.Card<D['cardPublic'], D['cardPrivate']>,
      'publicData' | 'privateData'
    >

    export interface Reference<S = undefined, D extends ZettelTypes.Data = ZettelTypes.Data.Default>
      extends HtmlContent.Reference<S> {
      readonly update: (updates: Partial<Part<S, D>> | ((previous: Part<S, D>) => Partial<Part<S, D>>)) => void
    }
  }
}
