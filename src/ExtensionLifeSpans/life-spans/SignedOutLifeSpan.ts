import { ExtensionScope } from '@zettelooo/models'
import { ExtensionLifeSpanType } from '../types'

export type SignedOutLifeSpan = ExtensionLifeSpanType<{}, [ExtensionScope.Device], {}, {}, {}>

export namespace Shared {}
