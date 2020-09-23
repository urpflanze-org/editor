import * as React from 'react'
import pups from '@pups/js'

import executor from '@redux-store/executor'


import Grid from '@components/Grid'
import Select from '@components/input/Select'


const RATIOS = [
    { key: '1:1', value: 1 },
    { key: '4:3', value: 4/3 },
    { key: '3:2', value: 3/2 },
    { key: '1.85:1', value: 1.85/1 },
    { key: '2.39:1', value: 2.39/1 },
    { key: '16:9', value: 16/9 },
    { key: 'A4', value: 210/297 },
    { key: '9:16', value: (9/16) },
    { key: '10:16', value: (10/16) },
]

const DrawerRatio: React.FunctionComponent<{ ratio: number, size: number, resolution: string }> = ({ ratio, size, resolution }: { ratio: number, size: number, resolution: string }) => 
{

    function setRatio(ratio)
    {
        executor.ask('set-drawer-ratio', { ratio, size, resolution })
    }

    return (
        <Grid rows={2} flow="max-content auto" style={{ justifyItems: 'center' }} gap={pups.ms(-2)}>
            <small>Aspect Ratio</small>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <small>
                    <Select 
                        width={'5rem'}
                        position='top'
                        options={RATIOS} value={ratio} 
                        onChange={e => setRatio(e)} placeholder="Resolution"
                    />
                </small>
            </div>
        </Grid>
    )
}


export default React.memo(DrawerRatio)


