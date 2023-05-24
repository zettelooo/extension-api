import { Starter } from './Starter'

export interface WindowWithStarter extends Window {
  $extensionStarter?: Starter
}
