import { ZettelTypes } from '@zettelooo/api-types'
import { Scope } from '../../Scope'
import { TypeBuilder } from '../TypeBuilder'

export type SignedOut<D extends ZettelTypes.Data = ZettelTypes.Data.Default> = TypeBuilder<
  {},
  [Scope.Device],
  {},
  {},
  {}
>

export namespace Shared {}
