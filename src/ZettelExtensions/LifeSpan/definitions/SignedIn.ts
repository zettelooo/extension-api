import { ZettelTypes } from '@zettelooo/api-types'
import { Id } from '@zettelooo/commons'
import { Scope } from '../../Scope'
import { TypeBuilder } from '../TypeBuilder'

export type SignedIn = TypeBuilder<
  {},
  [Scope.Device, Scope.User],
  {
    account: ZettelTypes.Extension.Entity.Account
    accountPagesOrdered: readonly ZettelTypes.Extension.Entity.Page[]
    accountEditablePagesOrdered: readonly ZettelTypes.Extension.Entity.Page[]
    accountCardsOrdered: readonly ZettelTypes.Extension.Entity.Card[]
  },
  {
    updatePage(updates: Shared.UpdatePage.PageData): Promise<void>

    getCardPreviewText(cardId: Id): Promise<string>

    createCard(card: Shared.CreateCard.CardData): Promise<ZettelTypes.Extension.Entity.Card>

    updateCard(updates: Shared.UpdateCard.CardData): Promise<void>

    /** @throws If the page is not found for, or not editable by the user. */
    setPageExtensionData<T>(pageId: Id, extensionData: T): Promise<void>

    /** @throws If the card is not found for, or not editable by the user. */
    setCardExtensionData<T>(cardId: Id, extensionData: T): Promise<void>

    /** @throws If the card is not found for, or not editable by the user. */
    setCardBlockExtensionData<T>(cardId: Id, blockId: Id, extensionData: T): Promise<void>
  },
  {}
>

export namespace Shared {
  export namespace UpdatePage {
    export type PageData = Pick<ZettelTypes.Extension.Entity.Page, 'id'> &
      Partial<
        Pick<
          ZettelTypes.Extension.Entity.Page,
          'name' | 'description' | 'iconEmoji' | 'color' | 'avatarFileId' | 'view' | 'public'
        >
      >
  }

  export namespace CreateCard {
    export type CardData = {
      readonly pageId: string
      readonly color?: string
      readonly sequenceBetween?: {
        readonly previousSequence?: string
        readonly nextSequence?: string
      }
      readonly extensionData?: any
    } & ({ readonly blocks: readonly ZettelTypes.Extension.Entity.Block[] } | { readonly text: string })
  }

  export namespace UpdateCard {
    export type CardData = {
      readonly id: string
      readonly pageId?: string
      readonly color?: string
      readonly sequenceBetween?: {
        readonly previousSequence?: string
        readonly nextSequence?: string
      }
      readonly extensionData?: any
    } & ({ readonly blocks?: readonly ZettelTypes.Extension.Entity.Block[] } | { readonly text?: string })
  }
}
