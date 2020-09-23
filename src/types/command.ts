/**
 * Command status
 *
 * @export
 * @enum {number}
 */
export enum ECommandStatus {
    UNDO,
    REDO,
    NONE
}

/**
 * Arguments of a command
 *
 * @export
 * @interface ICommandArgs
 */
export interface ICommandArgs {
    preventPushToHistory?: boolean
    [e: string]: any
}

export interface ICommand {
    id: number
    command: string
    level: number
    status: ECommandStatus
    bLast: boolean
    passive: boolean
}

export type TCommandEffect = 'scene_update' | 'scene_child_prop_update' | 'scene_child_update' | 'scene_layers_update' | 'select_layer' 


export interface ICommandEffects {
    'scene_update'?: boolean
    'scene_child_prop_update'?: Array<{ id: string | number, name: string, value: any }>
    'scene_child_ui_prop_update'?: Array<{ id: string | number, name: string, value: any }>
    // 'scene_child_update'?: any
    'scene_layers_update'?: any,
    'select_layer'?: Array<string | number> | null
}

