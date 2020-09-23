import * as React from 'react'
import styled from 'styled-components'
import pups from '@pups/js'

export type SubMenuActions = Array<{
    name: string
    action: (args: any) => void | undefined
} | null>

interface SubMenuProps {
    actions: SubMenuActions
}

const SubMenu: React.FunctionComponent<SubMenuProps> = ({ actions, ...otherProps }: SubMenuProps) => {
    return (
        <List>
            {actions.map((action, index) => {
                return action == null ? (
                    <li key={index} style={{ height: '1px', lineHeight: 0, margin: `${pups.ms(-2)} 0`, background: pups.color('dark-verylighten').toString() }}></li>
                ) : (
                    <li key={index} onClick={() => action.action(otherProps)}>
                        {action.name}
                    </li>
                )
            })}
        </List>
    )
}

const List = styled.ul`
    background: ${pups.color('dark-lighten')};
    line-height: ${pups.ms(1)};
    position: absolute;
    margin: 0; 
    padding: ${pups.ms(-2)} 1px; 
    top: 100%;
    left: 0;
    list-style: none; 
    transform: translateY(-2px);

    li {
        padding: 0 ${pups.ms(0)};
        white-space: nowrap;

        &:hover {
            background: ${pups.color('dark-verylighten')}
        }
    }
`

export default SubMenu