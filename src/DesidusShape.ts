import Group from '@genbs/urpflanze/dist/core/Group'
import Shape from '@genbs/urpflanze/dist/core/shapes/Shape'
import ShapeBuffer from '@genbs/urpflanze/dist/core/shapes/ShapeBuffer'
import { IShapeSettings } from '@genbs/urpflanze/dist/core/types/shape-base'

import SceneUtilties from '@genbs/urpflanze/dist/services/scene-utilities/SceneUtilities'
import SceneChildPropsData from '@ui-services/utilities/SceneChildPropsData'

const fs1 = Float32Array.from([-1, 0.4957, 0, -0.0813, 1, 0.4957, 1, -0.0813, 0, -0.6582, -1, -0.0813])
const fs2 = Float32Array.from([
	-0.3676,
	0.4804,
	-0,
	0.2683,
	0.3676,
	0.4804,
	0.3676,
	0.2683,
	-0,
	0.0562,
	-0.3676,
	0.2683,
])

class DesidusShape extends Shape {
	created: boolean

	constructor(settings: IShapeSettings = {}) {
		settings.type = 'Desidus'

		super(settings)

		this.created = false

		if (!settings.data.imported) this.buildShape()
	}

	buildShape(): void {
		if (!this.created && !this.shape) {
			const sideLength = SceneChildPropsData.sideLength?.default

			const group: Group = SceneUtilties.create('Group', { name: this.name + '_Group' }, this.scene) as Group
			const desidus_part_1 = SceneUtilties.create(
				'ShapeBuffer',
				{ name: this.name + '_top', shape: fs1 },
				this.scene
			) as ShapeBuffer
			const desidus_part_2 = SceneUtilties.create(
				'ShapeBuffer',
				{ name: this.name + '_bottom', shape: fs2 },
				this.scene
			) as ShapeBuffer

			desidus_part_1.data.props.sideLength = sideLength
			desidus_part_2.data.props.sideLength = sideLength

			this.setShape(group)

			group.add(desidus_part_1)
			group.add(desidus_part_2)

			this.created = true
		}
	}

	public setProp(key: any, value: any): void {
		super.setProp(key, value)
		this.buildShape()
	}
}

export default DesidusShape
