import { ExtensionScope } from '@zettelooo/models'

export interface ManifestJson {
  readonly appId: string
  readonly version: string
  readonly name: string
  readonly description: string
  readonly aiDescription?: string
  readonly avatar: {
    readonly file?: string
    readonly dataUrl?: string
  }
  readonly documentationMarkdownFile?: string
  readonly scopes: readonly ExtensionScope[]
  readonly extensionDependencies?: readonly string[]
}
