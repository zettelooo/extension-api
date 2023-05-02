import {
  ExtensionLifeSpanAccessBase,
  ExtensionLifeSpanDataBase,
  ExtensionLifeSpanRegistryBase,
  ExtensionLifeSpanScopeBase,
  ExtensionLifeSpanTargetBase,
} from '../extension-function'

export interface ExtensionLifeSpanType<
  Target extends ExtensionLifeSpanTargetBase,
  Scope extends ExtensionLifeSpanScopeBase[],
  Data extends ExtensionLifeSpanDataBase,
  Access extends ExtensionLifeSpanAccessBase,
  Registry extends ExtensionLifeSpanRegistryBase
> {
  target: Readonly<Target>
  scope: Scope[number]
  data: Readonly<Data>
  access: Readonly<Access>
  registry: Readonly<Registry>
}
