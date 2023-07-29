import { ZettelTypes } from '@zettelooo/api-types'
import { ExtendedWindow } from '../ExtendedWindow'
import { Starter } from '../Starter'

export function setStarter<D extends ZettelTypes.Data = ZettelTypes.Data.Default>(starter: Starter<D>): void {
  const extendedWindow = window as ExtendedWindow<D>
  if (extendedWindow.$starter === undefined) {
    extendedWindow.$starter = starter
  }
}
