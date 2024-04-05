document.addEventListener('DOMContentLoaded', function() {
    let boxes = document.querySelectorAll(".Box");
    let resetButton = document.querySelector(".Reset-Btn");
    let winnerBox = document.querySelector(".winner_box");
    let newGameButton = document.querySelector(".New_game_btn");
    let message = document.querySelector("#msg");
    let turnIndicator = document.querySelector("#turnIndicator");
    let count = 0;
    let isPlayer1Turn = true; 

    const winArr = [
        [0,1,2],
        [0,3,6],
        [0,4,8],
        [1,4,7],
        [2,5,8],
        [3,4,5],
        [6,7,8],
        [2,4,6],
    ];

    const startOver = () => {
        isPlayer1Turn = true;
        for(let box of boxes){
            box.innerText = "";
            box.disabled = false;
            box.classList.remove("winner"); 
        }
        count = 0;
        winnerBox.classList.add("hide");
    }

    const disableAll = () => {
        for(let box of boxes){
            box.disabled = true;
        }
    }

    boxes.forEach((box) => {
        box.addEventListener("click",() => {
            count++;
            console.log(count);
            if(isPlayer1Turn){
                box.innerText = "O";
                box.classList.add("player-o"); 
                isPlayer1Turn = false;
            }
            else{
                box.innerText = "X";
                box.classList.add("player-x"); 
                isPlayer1Turn = true;
            }
            
            box.disabled = true;
            
            checkWinner();
        })
    })

    const checkWinner = () => {
        for(let i = 0; i < 8; i++){
            let first = boxes[winArr[i][0]].innerText;
            let second = boxes[winArr[i][1]].innerText;
            let third = boxes[winArr[i][2]].innerText;
            
            if(first !== "" && second !== "" && third !== ""){
                if(first === second && second === third){
                    message.innerText = `Congratulations! You've won the game! ${first}`;
                    winnerBox.classList.remove("hide");
                    boxes[winArr[i][0]].classList.add("winner"); 
                    boxes[winArr[i][1]].classList.add("winner");
                    boxes[winArr[i][2]].classList.add("winner");
                    disableAll();
                    return;
                }
            }
        }

        if(count === 9){
            message.innerText = "Nobody wins this time! It's a tie!";
            winnerBox.classList.remove("hide");
            disableAll();
            return;
        }
    }

    resetButton.addEventListener("click", startOver);
    newGameButton.addEventListener("click", startOver);
});
