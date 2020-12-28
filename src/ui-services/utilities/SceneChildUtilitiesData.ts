import pups from '@pups/js'

import SceneChildUtilitiesData, {
	ISceneChildUtiltiesData,
} from '@genbs/urpflanze/dist/services/scene-utilities/SceneChildUtilitiesData'
;(SceneChildUtilitiesData.fill as ISceneChildUtiltiesData).default = pups.color('primary').toString('hex')
;(SceneChildUtilitiesData.stroke as ISceneChildUtiltiesData).default = pups.color('primary').toString('hex')

export default SceneChildUtilitiesData
