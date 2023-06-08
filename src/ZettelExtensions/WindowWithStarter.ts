import { Starter } from './Starter'

export interface WindowWithStarter<PD = any, CD = any> extends Window {
  $starter?: Starter<PD, CD>
}
