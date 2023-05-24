import { ZettelTypes } from '@zettelooo/api-types'
import { Id } from '@zettelooo/commons'
import { Scope } from '../../Scope'
import { TypeBuilder } from '../TypeBuilder'
import { Registrar } from '../types'

export type BlocksComposer = TypeBuilder<
  {
    pageId: Id | null
  },
  [Scope.Device, Scope.User, Scope.Page],
  {},
  {
    reset(): void
    isEmpty(): boolean
    getBlocks(): readonly ZettelTypes.Extension.Entity.Block[]
    setBlocks(blocks: readonly ZettelTypes.Extension.Entity.Block[]): void
    insertBlocks(blocks: readonly ZettelTypes.Extension.Entity.Block[]): void
    disabled(disabled?: boolean): boolean
    addAttachmentFiles(files: readonly ZettelTypes.Model.Block.Attachment.File[]): void
    addFiles(files: readonly File[] | FileList | DataTransferItemList): Promise<void>
    insertText(text: string): void
    pasteText(text: string, html?: string): void
    appendNewBlock(): void
  },
  {
    inlineCommands(getter: Shared.InlineCommand.Getter): Registrar
  }
>

export namespace Shared {
  export interface InlineCommand {
    readonly title: string
    readonly handler: () => void
  }

  export namespace InlineCommand {
    export type Getter = () => readonly InlineCommand[]
  }
}