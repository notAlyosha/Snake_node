import * as rl from 'raylib'
import * as constant from './constants'

class Apple {
	public position: rl.Vector2
	constructor() {
		this.position = { x: 1, y: 1 }
		this.CreateNewApple()
	}

	CreateNewApple() {
		this.position = {
			x: Math.floor(Math.random() * (constant.width / constant.squareSize - 1)),
			y: Math.floor(
				Math.random() * (constant.heigth / constant.squareSize - 1)
			),
		}
	}

	Draw() {
		rl.DrawRectangle(
			this.position.x * constant.squareSize + 2,
			this.position.y * constant.squareSize + 2,
			constant.squareSize - 4,
			constant.squareSize - 4,
			constant.appleColor
		)
	}
}

export default Apple
