import * as rl from 'raylib'
import Apple from './apple'
import Field from './field'
import Snake from './snake'

const gameField = new Field()
const snake = new Snake()
const apple = new Apple()

let paused = true
let score = 0

while (!rl.WindowShouldClose()) {
	if (rl.IsKeyPressed(rl.KEY_P)) {
		paused = !paused
	}

	rl.BeginDrawing()
	gameField.Clear()

	gameField.DrawGrid()
	if (!paused) {
		snake.NewStatement()
	}

	if (snake.EatsItSelf()) break

	if (snake.EatsApple(apple.position)) {
		apple.CreateNewApple()
		score += 1
	}

	apple.Draw()
	snake.Draw()

	if (paused) {
		rl.DrawText('Paused', 370, 250, 54, rl.BLUE)
		rl.DrawText('Press P to start/pause', 160, 310, 54, rl.BLUE)
		rl.DrawText('Score: ' + String(score), 370, 370, 54, rl.BLUE)
	}

	rl.EndDrawing()
}
