const WallCollision = (ballObj, canvas, player, paddleProps) =>
{    
    if(ballObj.y + ballObj.rad > canvas.height)
    {
        player.lives--
        ballObj.x = paddleProps.x + paddleProps.width/2
        ballObj.y = paddleProps.y - (paddleProps.height/2 + 2)
    }

    if(ballObj.y - ballObj.rad < 0)
        {ballObj.dy *= -1}
      if(ballObj.x + ballObj.rad > canvas.width ||
        ballObj.x - ballObj.rad < 0)
        {ballObj.dx *= -1}
}
export default WallCollision