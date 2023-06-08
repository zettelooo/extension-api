import { ZettelTypes } from '@zettelooo/api-types'
import { Id } from '@zettelooo/commons'
import { Scope } from '../../Scope'
import { TypeBuilder } from '../TypeBuilder'

export type SignedIn<PD = any, CD = any> = TypeBuilder<
  {},
  [Scope.Device, Scope.User],
  {
    account: ZettelTypes.Extension.Model.User
    accountPagesOrdered: readonly ZettelTypes.Extension.Model.Page<PD>[]
    accountEditablePagesOrdered: readonly ZettelTypes.Extension.Model.Page<PD>[]
    accountCardsOrdered: readonly ZettelTypes.Extension.Model.Card<CD>[]
  },
  {
    updatePage(updates: Shared.UpdatePage.PageData<PD>): Promise<void>

    createCard(card: Shared.CreateCard.CardData<CD>): Promise<ZettelTypes.Extension.Model.Card<CD>>

    updateCard(updates: Shared.UpdateCard.CardData<CD>): Promise<void>

    /** @throws If the page is not found for, or not editable by the user. */
    setPageExtensionData(pageId: Id, extensionData: PD): Promise<void>

    /** @throws If the card is not found for, or not editable by the user. */
    setCardExtensionData(cardId: Id, extensionData: CD): Promise<void>
  },
  {}
>

export namespace Shared {
  export namespace UpdatePage {
    export type PageData<PD = any> = Pick<ZettelTypes.Extension.Model.Page<PD>, 'id'> &
      Partial<
        Pick<
          ZettelTypes.Extension.Model.Page<PD>,
          'name' | 'description' | 'iconEmoji' | 'color' | 'avatarFileId' | 'view' | 'public'
        >
      >
  }

  export namespace CreateCard {
    export type CardData<CD = any> = {
      readonly pageId: string
      readonly color?: string
      readonly sequenceBetween?: {
        readonly previousSequence?: string
        readonly nextSequence?: string
      }
      readonly text?: string
      readonly files?: readonly ZettelTypes.Extension.Model.File[]
      readonly extensionData?: CD
    }
  }

  export namespace UpdateCard {
    export type CardData<CD = any> = {
      readonly id: string
      readonly pageId?: string
      readonly color?: string
      readonly sequenceBetween?: {
        readonly previousSequence?: string
        readonly nextSequence?: string
      }
      readonly text?: string
      readonly files?: readonly ZettelTypes.Extension.Model.File[]
      readonly extensionData?: CD
    }
  }
}
