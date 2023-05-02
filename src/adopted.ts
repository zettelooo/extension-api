import { HandlerOutput, Keyboard } from '@zettelyay/commons'

export type Language = 'en' | 'fa'

export type CommandHandler = () => HandlerOutput

export interface Command {
  readonly name: string
  /** Leave it empty to hide this command from the command line */
  readonly displayName?: string
  disabled?(): boolean

  readonly icon?: IconName // TODO: How should we set custom SVG icons here?
  readonly shortcutKeys?: Keyboard.Combinations
  readonly handler?: CommandHandler
}

export interface CommandGroup {
  readonly name: string
  /** Leave it empty to hide this command from the command line */
  readonly displayName?: string
  disabled?(): boolean

  readonly commands: readonly Command[]
}

export enum IconName {
  Add = 'ADD',
  Close = 'CLOSE',
  Retry = 'RETRY',
  Upload = 'UPLOAD',
  Bookmark = 'BOOKMARK',
  Back = 'BACK',
  Search = 'SEARCH',
  People = 'PEOPLE',
  Copy = 'COPY',
  Emoji = 'EMOJI',
  Attachment = 'ATTACHMENT',
  Send = 'SEND',
  Time = 'TIME',
  Link = 'LINK',
  VerticalDots = 'VERTICAL_DOTS',
  SixDots = 'SIX_DOTS',
  CheckboxUnchecked = 'CHECKBOX_UNCHECKED',
  CheckboxChecked = 'CHECKBOX_CHECKED',
  Expand = 'EXPAND',
  Collapse = 'COLLAPSE',
  Settings = 'SETTINGS',
  Documentation = 'DOCUMENTATION',
  Edit = 'EDIT',
  EditField = 'EDIT_FIELD',
  Delete = 'DELETE',
  LightTheme = 'LIGHT_THEME',
  DarkTheme = 'DARK_THEME',
}

export enum NavigableStatus {
  NotNavigated = 'NOT_NAVIGATED',
  NavigatedThrough = 'NAVIGATED_THROUGH',
  NavigatedTo = 'NAVIGATED_TO',
  Selected = 'SELECTED',
}

export interface ConfirmationDialogOptions {
  readonly title: string
  readonly content: string
  readonly confirmLabel: string
  readonly cancelLabel: string
  readonly forceSelect: boolean
}
