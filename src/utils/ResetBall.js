const ResetBall = (paddleProps, ballObj) =>
{
   return( ballObj.x = paddleProps.x,
    ballObj.y = paddleProps.y + paddleProps.height + 2)
}

export default ResetBall