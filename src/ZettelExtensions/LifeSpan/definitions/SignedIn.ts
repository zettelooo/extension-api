import { ZettelTypes } from '@zettelooo/api-types'
import { Scope } from '../../Scope'
import { TypeBuilder } from '../TypeBuilder'

export type SignedIn<D extends ZettelTypes.Data = ZettelTypes.Data.Default> = TypeBuilder<
  {},
  [Scope.Device, Scope.User],
  {
    account: ZettelTypes.Model.User
    accountPagesOrdered: readonly ZettelTypes.Model.Page<D['page']>[]
    accountCardsOrdered: readonly ZettelTypes.Model.Card<D['card']>[]
  },
  {
    updatePage(updates: Shared.UpdatePage.PageData<D>): Promise<void>

    createCard(card: Shared.CreateCard.CardData<D>): Promise<ZettelTypes.Model.Card<D['card']>>

    updateCard(updates: Shared.UpdateCard.CardData<D>): Promise<void>
  },
  {}
>

export namespace Shared {
  export namespace UpdatePage {
    export type PageData<D extends ZettelTypes.Data = ZettelTypes.Data.Default> = Pick<
      ZettelTypes.Model.Page<D['page']>,
      'id'
    > &
      Partial<
        Pick<
          ZettelTypes.Model.Page<D['page']>,
          'name' | 'description' | 'iconEmoji' | 'avatarFileId' | 'color' | 'memberUserIds' | 'public' | 'data'
        >
      >
  }

  export namespace CreateCard {
    export type CardData<D extends ZettelTypes.Data = ZettelTypes.Data.Default> = {
      readonly pageId: string
      readonly sequenceBetween?: {
        readonly previousSequence?: string
        readonly nextSequence?: string
      }
      readonly data?: D['card']
    }
  }

  export namespace UpdateCard {
    export type CardData<D extends ZettelTypes.Data = ZettelTypes.Data.Default> = {
      readonly id: string
      readonly sequenceBetween?: {
        readonly previousSequence?: string
        readonly nextSequence?: string
      }
      readonly data?: D['card']
    }
  }
}
