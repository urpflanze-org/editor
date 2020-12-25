import pups from '@pups/js'

import SceneChildPropsData, {
	ISceneChildPropData,
} from '@genbs/urpflanze/dist/services/scene-utilities/SceneChildPropsData'
;(SceneChildPropsData['style.fill'] as ISceneChildPropData).default = pups.color('primary').toString('hex')
;(SceneChildPropsData['style.stroke'] as ISceneChildPropData).default = pups.color('primary').toString('hex')

export default SceneChildPropsData
