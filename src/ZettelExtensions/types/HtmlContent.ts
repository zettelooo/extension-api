import { HandlerOutput } from '@zettelooo/commons'

export interface HtmlContent<S = undefined> {
  readonly initialState: S
  readonly render: (provided: {
    renderContext: HtmlContent.Context<S>
    un: Readonly<Record<string | number, string>>
  }) => {
    encapsulated?: boolean
    html: string
    onRendered?: (provided: {
      sanitizedHtml: string
      containerElement: Element | ShadowRoot
      currentContext: HtmlContent.Context<S>
    }) => {
      onUpdate?: (provided: { previousContext: HtmlContent.Context<S> }) => HandlerOutput
      onCleanUp?: () => void
    }
  }
}

export namespace HtmlContent {
  export interface Context<S> {
    readonly classes: Context.Classes
    readonly theme: Context.Theme
    readonly state: S
  }

  export namespace Context {
    // TODO: Improve:
    export interface Classes {}

    // TODO: Improve:
    export interface Theme {
      readonly palette: Theme.Palette
      readonly unitPx: number
    }

    export namespace Theme {
      export interface Palette {
        readonly type: 'light' | 'dark'
        readonly background: {
          readonly default: string
          readonly paper: string
        }
        readonly text: {
          readonly primary: string
          readonly secondary: string
          readonly hint: string
          readonly disabled: string
        }
        readonly action: {
          readonly active: string
          readonly hover: string
          readonly hoverOpacity: number
          readonly selected: string
          readonly selectedOpacity: number
          readonly disabled: string
          readonly disabledOpacity: number
          readonly disabledBackground: string
          readonly focus: string
          readonly focusOpacity: number
          readonly activatedOpacity: number
        }
        readonly primary: Palette.Color
        readonly secondary: Palette.Color
        readonly divider: string
        readonly success: Palette.Color
        readonly warning: Palette.Color
        readonly info: Palette.Color
        readonly error: Palette.Color
      }

      export namespace Palette {
        export interface Color {
          readonly main: string
          readonly light: string
          readonly dark: string
          readonly contrastText: string
        }
      }
    }
  }

  export interface Reference<S> {
    readonly setState: (newState: S | ((oldState: S) => S)) => void
    readonly getState: () => S
  }
}
