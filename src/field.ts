import * as rl from 'raylib'
import * as constant from './constants'
import * as path from 'path'
class Field {
	constructor() {
		rl.InitWindow(constant.width, constant.heigth, constant.title)
		rl.SetTargetFPS(constant.startFps)
		rl.SetWindowIcon(rl.LoadImage(path.join('.', 'assets', 'snake.png')))

		this.Clear()
	}

	Clear() {
		rl.ClearBackground(constant.backgroundColor)
	}

	DrawGrid() {
		for (let y = 0; y <= constant.heigth / constant.squareSize; y += 1) {
			rl.DrawLine(
				0,
				y * constant.squareSize,
				constant.width,
				y * constant.squareSize,
				constant.gridColor
			)
		}

		for (let x = 0; x <= constant.width / constant.squareSize; x += 1) {
			rl.DrawLine(
				x * constant.squareSize,
				0,
				x * constant.squareSize,
				constant.heigth,
				constant.gridColor
			)
		}
	}
}

export default Field
