import { ZettelTypes } from '@zettelooo/api-types'
import { Id } from '@zettelooo/commons'
import { Scope } from '../../Scope'
import { TypeBuilder } from '../TypeBuilder'

export type SignedIn = TypeBuilder<
  {},
  [Scope.Device, Scope.User],
  {
    account: ZettelTypes.Extension.Entity.User
    accountPagesOrdered: readonly ZettelTypes.Extension.Entity.Page[]
    accountEditablePagesOrdered: readonly ZettelTypes.Extension.Entity.Page[]
    accountCardsOrdered: readonly ZettelTypes.Extension.Entity.Card[]
  },
  {
    updatePage<PD = any>(updates: Shared.UpdatePage.PageData<PD>): Promise<void>

    getCardPreviewText(cardId: Id): Promise<string>

    createCard<CD = any, BD = any>(
      card: Shared.CreateCard.CardData<CD, BD>
    ): Promise<ZettelTypes.Extension.Entity.Card<CD, BD>>

    updateCard<CD = any, BD = any>(updates: Shared.UpdateCard.CardData<CD, BD>): Promise<void>

    /** @throws If the page is not found for, or not editable by the user. */
    setPageExtensionData<PD = any>(pageId: Id, extensionData: PD): Promise<void>

    /** @throws If the card is not found for, or not editable by the user. */
    setCardExtensionData<CD = any>(cardId: Id, extensionData: CD): Promise<void>

    /** @throws If the card is not found for, or not editable by the user. */
    setCardBlockExtensionData<BD = any>(cardId: Id, blockId: Id, extensionData: BD): Promise<void>
  },
  {}
>

export namespace Shared {
  export namespace UpdatePage {
    export type PageData<PD = any> = Pick<ZettelTypes.Extension.Entity.Page<PD>, 'id'> &
      Partial<
        Pick<
          ZettelTypes.Extension.Entity.Page<PD>,
          'name' | 'description' | 'iconEmoji' | 'color' | 'avatarFileId' | 'view' | 'public'
        >
      >
  }

  export namespace CreateCard {
    export type CardData<CD = any, BD = any> = {
      readonly pageId: string
      readonly color?: string
      readonly sequenceBetween?: {
        readonly previousSequence?: string
        readonly nextSequence?: string
      }
      readonly extensionData?: CD
    } & (
      | {
          readonly blocks: readonly ZettelTypes.Extension.Entity.Block<ZettelTypes.Model.Block.Type, BD>[]
        }
      | {
          readonly text: string
        }
    )
  }

  export namespace UpdateCard {
    export type CardData<CD = any, BD = any> = {
      readonly id: string
      readonly pageId?: string
      readonly color?: string
      readonly sequenceBetween?: {
        readonly previousSequence?: string
        readonly nextSequence?: string
      }
      readonly extensionData?: CD
    } & (
      | {
          readonly blocks?: readonly ZettelTypes.Extension.Entity.Block<ZettelTypes.Model.Block.Type, BD>[]
        }
      | {
          readonly text?: string
        }
    )
  }
}
