import { useRef, useEffect } from 'react';
import './App.css';
import { BallMovement } from './BallMovement';
import Paddle from './Paddle';
import CreateBrick from './Brick';
import data from './data'
import WallCollision from './utils/WallCollision';
import BrickCollision from './utils/BrickCollision';
import PaddleCollision from './utils/PaddleCollision';
import PlayerStats from './PlayerStats';
import AllBroken from './utils/AllBroken';
import ResetBall from './utils/ResetBall';

let bricks = []
let {ballObj, paddleProps, brickObj, player} = data;

function App() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const render = () => {
      const canvas = canvasRef.current
      const ctx = canvas.getContext('2d')

      paddleProps.y = canvas.height - 30

      let newBrickSet = CreateBrick(player.level, bricks, canvas, brickObj)
      
      if(newBrickSet && newBrickSet.length > 0)
        bricks = newBrickSet
      
      ctx.clearRect(0,0,canvas.width, canvas.height) 
      
      bricks.map((brick)=>{      
        return brick.draw(ctx)
      })

      PlayerStats(ctx, player, canvas)
      BallMovement(ctx, ballObj)
      AllBroken(bricks, player, canvas, ballObj, brickObj)
      WallCollision(ballObj, canvas, player, paddleProps)      

      let brickCollision

      for (let i = 0; i < bricks.length; i++) {
        brickCollision = BrickCollision(ballObj,bricks[i])

        if(brickCollision.hit && !bricks[i].broke)
        {
          if(brickCollision.axis === "X")
          {
            ballObj.dx *= -1
            bricks[i].broke = true
          }
          else if(brickCollision.axis === "Y")
          {
            ballObj.dy *= -1
            bricks[i].broke = true
          }
          player.score += 10
        }
      }

      if(player.lives <= 0)
      {
          bricks = []
          alert("Game Over! Press Ok to continue!")
          ResetBall(paddleProps, ballObj)
          player.lives = 6
          player.level = 1

          if(player.maxScore < player.score)
              player.maxScore = player.score

          player.score = 0
      }

      if(player.level == 2)
      {
        alert("Congratulations!!!! You finnish the Breakout Game! Press OK to restart!")
        bricks = []
        ResetBall(paddleProps, ballObj)
        player.lives = 6
        player.level = 1

        if(player.maxScore < player.score)
            player.maxScore = player.score

        player.score = 0
      }

      Paddle(ctx, canvas, paddleProps)
      PaddleCollision(ballObj, paddleProps)
      requestAnimationFrame(render)
  }
  render()
}, []);


  return(
    <canvas 
        id='canvas'
        height="400px"
        width={window.innerWidth - 20}
        onMouseMove={(e)=>(paddleProps.x = e.clientX - paddleProps.width / 2)}
        ref={canvasRef}
        />)
}

export default App;
