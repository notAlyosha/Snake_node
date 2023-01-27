import * as rl from 'raylib'
import copy from 'fast-copy'
import * as constant from './constants'

enum Dir {
	up,
	down,
	left,
	right,
}

interface el {
	x: number
	y: number
	color: rl.Color
}

class Snake {
	private elements: el[]
	private dir: Dir = Dir.down
	private currentColor = 0

	constructor() {
		this.elements = []
		this.elements[0] = {
			x: 2,
			y: 1,
			color: constant.snakeColor[this.currentColor],
		}
	}

	public NewStatement() {
		this.ShiftPosition()
		this.Move()
		this.ChangeDir()
		this.OutOfBounds()
	}

	public Draw() {
		for (let index = 0; index < this.elements.length; index += 1) {
			rl.DrawRectangle(
				this.elements[index].x * constant.squareSize + 2,
				this.elements[index].y * constant.squareSize + 2,
				constant.squareSize - 4,
				constant.squareSize - 4,
				this.elements[index].color
			)
		}
	}

	private Move() {
		switch (this.dir) {
			case Dir.right:
				this.elements[0].x += 1
				break
			case Dir.left:
				this.elements[0].x -= 1
				break
			case Dir.up:
				this.elements[0].y -= 1
				break
			case Dir.down:
				this.elements[0].y += 1
				break
		}
	}

	private ChangeDir() {
		if (rl.IsKeyPressed(rl.KEY_W) && this.dir != Dir.down) {
			this.dir = Dir.up
		}

		if (rl.IsKeyPressed(rl.KEY_S) && this.dir != Dir.up) {
			this.dir = Dir.down
		}

		if (rl.IsKeyPressed(rl.KEY_A) && this.dir != Dir.right) {
			this.dir = Dir.left
		}

		if (rl.IsKeyPressed(rl.KEY_D) && this.dir != Dir.left) {
			this.dir = Dir.right
		}
	}

	EatsApple(coords: rl.Vector2): boolean {
		if (this.elements[0].x == coords.x && this.elements[0].y == coords.y) {
			this.GrowUp()
			return true
		}
		return false
	}

	EatsItSelf(): boolean {
		for (let index = 2; index < this.elements.length; index += 1) {
			if (
				this.elements[0].x === this.elements[index].x &&
				this.elements[0].y === this.elements[index].y
			)
				return true
		}
		return false
	}
	private GrowUp() {
		this.currentColor += 1

		if (this.currentColor === constant.snakeColor.length) this.currentColor = 0

		this.elements.push({
			x: this.elements[this.elements.length - 1].x,
			y: this.elements[this.elements.length - 1].y,
			color: constant.snakeColor[this.currentColor],
		})
	}

	private ShiftPosition() {
		for (let index = this.elements.length - 1; index > 0; index -= 1) {
			let cp = copy(this.elements[index - 1])
			this.elements[index].x = cp.x
			this.elements[index].y = cp.y
		}
	}

	private OutOfBounds() {
		if (this.elements[0].x > constant.width / constant.squareSize) {
			this.elements[0].x = 0
			return
		}

		if (this.elements[0].x < 0) {
			this.elements[0].x = constant.width / constant.squareSize
			return
		}

		if (this.elements[0].y > constant.heigth / constant.squareSize) {
			this.elements[0].y = 0
			return
		}

		if (this.elements[0].y < 0) {
			this.elements[0].y = constant.heigth / constant.squareSize
			return
		}
	}
}

export default Snake
