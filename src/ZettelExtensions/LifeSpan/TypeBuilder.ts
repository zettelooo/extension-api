import { AccessBase, DataBase, RegistryBase, ScopesBase, TargetBase } from './types'

export interface TypeBuilder<
  Target extends TargetBase,
  Scopes extends ScopesBase,
  Data extends DataBase,
  Access extends AccessBase,
  Registry extends RegistryBase
> {
  target: Readonly<Target>
  scopes: readonly Scopes[number][]
  data: Readonly<Data>
  access: Readonly<Access>
  registry: Readonly<Registry>
}
