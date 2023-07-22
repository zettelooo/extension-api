import { ZettelTypes } from '@zettelooo/api-types'
import { Id } from '@zettelooo/commons'
import { Scope } from '../../Scope'
import { TypeBuilder } from '../TypeBuilder'
import { Registrar } from '../types'

export type Page<D extends ZettelTypes.Data = ZettelTypes.Data.Default> = TypeBuilder<
  {
    pageId: Id
  },
  [Scope.Device, Scope.User, Scope.Page],
  {
    page: ZettelTypes.Model.Page<D['page']>
    cards: readonly ZettelTypes.Model.Card<D['card']>[]
  },
  {
    consumeService(name: string): ((requestData: any) => Promise<any>) | null
  },
  {
    serviceProvider(name: string, service: (requestData: any) => any | Promise<any>): Registrar
  }
>

export namespace Shared {}
