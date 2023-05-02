import { ExtensionFunction } from './extension-function'

export interface WindowWithExtensionFunction extends Window {
  extensionFunction?: ExtensionFunction
}
