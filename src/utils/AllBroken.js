const AllBroken = (bricks, player, canvas, ballObj, brickObj) =>
{
    let total = 0
    for(let i = 0; i < bricks.length; i++)
    {
        if(bricks[i].broke === true)
        {
            total++
        }
    }

    if(total == bricks.length)
    {
        player.level++
        alert(`Congratulations you are in the ${player.level} level`)
        ballObj.y = canvas.height - 20
        brickObj.y = 50
    }
}

export default AllBroken