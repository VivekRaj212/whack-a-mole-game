
let score = document.getElementById("score");
let timeLeft = document.getElementById('timeLeft');
let startNewGameBtn = document.getElementById("startNewGame");
let pauseGameBtn = document.getElementById('pauseGame');
let squares = document.querySelectorAll(".square");
let gameMusic = new Audio("../assets/gameMusic.mp3");
let hitMusic = new Audio('./assets/hitMusic.mp3');
let grid = document.getElementsByClassName("grid")[0];
let scores =0
let totaltimeLeft = 60;
let hitPosition = null;
let timerId = null;
let randomMoleId = null;


const randomMole=()=> {
      
      squares.forEach(square=> {

            square.classList.remove('mole');
      })

      let randomSquare = squares[Math.floor(Math.random()*squares.length)];
      randomSquare.classList.add('mole');
      hitPosition = randomSquare.id;
}

randomMole();

    


    const countDown=()=> {    
        totaltimeLeft--;
        timeLeft.innerHTML= `Time Left: ${totaltimeLeft}`;

        if(totaltimeLeft === 0)
        {
          clearInterval(timerId);
          clearInterval(randomMoleId);
          grid.style.display = "none";

        }

    }



const startGame=()=> {

    scores =0;
    totaltimeLeft =60;
    score.innerHTML = `Your score: 0`;
    timeLeft.innerHTML = "Time Left: 60";
    grid.style.display = "grid";
    pauseGameBtn.style.display = 'inline-block';
    pauseGameBtn.innerHTML = 'Pause';
    gameMusic.play();
    timerId = setInterval(randomMole,1000);
    randomMoleId = setInterval(countDown, 1000);
}

const pauseResumeGame=()=> {

       if(pauseGameBtn.textContent === 'Pause')
       {
            gameMusic.pause();
            clearInterval(timerId);
            clearInterval(randomMoleId);
            timerId = null;
            randomMoleId = null;
            pauseGameBtn.textContent = 'Resume';
            
       }
       else {
       gameMusic.play();
       timerId = setInterval(randomMole,1000);
       randomMoleId = setInterval(countDown, 1000);
       pauseGameBtn.textContent = 'Pause';
       }
     

}

squares.forEach(square=> {
      square.addEventListener('mousedown', ()=> {

            if(timerId !== null ) {

                  if(square.id === hitPosition)
                  {
                      hitMusic.play();
                      setTimeout(()=> {hitMusic.pause()}, 1000);
                      scores++;
                      score.innerHTML = `Your Score: ${scores}`;
                      hitPosition = null;
                  }

            }
              
      })

    })

startNewGameBtn.addEventListener('click',startGame);
pauseGameBtn.addEventListener('click', pauseResumeGame);