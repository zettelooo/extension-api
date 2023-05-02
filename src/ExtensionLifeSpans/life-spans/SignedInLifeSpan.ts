import { Id } from '@zettelyay/commons'
import { ExtensionScope, MutableModel } from '@zettelyay/models'
import { ExtensionLifeSpanType } from '../types'

export type SignedInLifeSpan = ExtensionLifeSpanType<
  {},
  [ExtensionScope.Device, ExtensionScope.User],
  {
    account: MutableModel.Entity.Account
    accountSpacesOrdered: readonly MutableModel.Entity.Space[]
    accountSelectedSpace: MutableModel.Entity.Space | undefined
    accountSelectedSpacePagesOrdered: readonly MutableModel.Entity.Page[]
    accountSelectedSpaceEditablePagesOrdered: readonly MutableModel.Entity.Page[]
    accountSelectedSpaceCardsOrdered: readonly MutableModel.Entity.Card[]
  },
  {
    updatePage(updates: Shared.UpdatePage.PageData): Promise<void>
    getCardPreviewText(cardId: Id): Promise<string>
    createCard(card: Shared.CreateCard.CardData): Promise<MutableModel.Entity.Card>
    updateCard(updates: Shared.UpdateCard.CardData): Promise<void>
    /** @throws If the page is not found for, or not editable by the user. */
    setPageExtensionData<T>(pageId: Id, extensionData: T): Promise<void>
    /** @throws If the card is not found for, or not editable by the user. */
    setCardExtensionData<T>(cardId: Id, extensionData: T): Promise<void>
  },
  {}
>

export namespace Shared {
  export namespace UpdatePage {
    export type PageData = Pick<MutableModel.Page, 'id'> &
      Partial<
        Pick<
          MutableModel.Page,
          'name' | 'description' | 'iconEmoji' | 'color' | 'avatarFileId' | 'view' | 'shareOnWebMode'
        >
      >
  }

  export namespace CreateCard {
    export type CardData = {
      readonly color?: string
      readonly pageId?: string
      readonly sequenceBetween?: {
        readonly previousSequence?: string
        readonly nextSequence?: string
      }
      readonly extensionData?: any
    } & (
      | {
          readonly blocks: readonly MutableModel.Block[]
        }
      | {
          readonly text: string
        }
    )
  }

  export namespace UpdateCard {
    export type CardData = {
      readonly id: string
      readonly color?: string
      readonly pageId?: string
      readonly sequenceBetween?: {
        readonly previousSequence?: string
        readonly nextSequence?: string
      }
      readonly extensionData?: any
    } & (
      | {
          readonly blocks?: readonly MutableModel.Block[]
        }
      | {
          readonly text?: string
        }
    )
  }
}
