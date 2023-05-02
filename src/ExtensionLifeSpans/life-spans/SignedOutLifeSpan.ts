import { ExtensionScope } from '@zettelyay/models'
import { ExtensionLifeSpanType } from '../types'

export type SignedOutLifeSpan = ExtensionLifeSpanType<{}, [ExtensionScope.Device], {}, {}, {}>

export namespace Shared {}
