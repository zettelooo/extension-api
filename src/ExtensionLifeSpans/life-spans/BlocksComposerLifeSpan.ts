import { Id } from '@zettelyay/commons'
import { ExtensionScope, MutableModel } from '@zettelyay/models'
import { ExtensionLifeSpanRegistrar } from '../../extension-function'
import { ExtensionLifeSpanType } from '../types'

export type BlocksComposerLifeSpan = ExtensionLifeSpanType<
  {
    pageId: Id | null
  },
  [ExtensionScope.Device, ExtensionScope.User, ExtensionScope.Page],
  {},
  {
    reset(): void
    isEmpty(): boolean
    getBlocks(): readonly MutableModel.Block[]
    setBlocks(blocks: readonly MutableModel.Block[]): void
    insertBlocks(blocks: readonly MutableModel.Block[]): void
    disabled(disabled?: boolean): boolean
    addAttachmentFiles(files: readonly MutableModel.Block.Attachment.File[]): void
    addFiles(files: readonly File[] | FileList | DataTransferItemList): Promise<void>
    insertText(text: string): void
    pasteText(text: string, html?: string): void
    appendNewBlock(): void
  },
  {
    inlineCommands(getter: Shared.InlineCommand.Getter): ExtensionLifeSpanRegistrar
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
