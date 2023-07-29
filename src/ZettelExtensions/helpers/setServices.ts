import { ExtendedWindow } from '../ExtendedWindow'
import { Services } from '../Services'

export function setServices(services: Services): void {
  const extendedWindow = window as ExtendedWindow
  if (extendedWindow.$services === undefined) {
    extendedWindow.$services = services
  }
}
