import { Scope } from '../../Scope'
import { TypeBuilder } from '../TypeBuilder'

export type SignedOut<PD = any, CD = any> = TypeBuilder<{}, [Scope.Device], {}, {}, {}>

export namespace Shared {}
