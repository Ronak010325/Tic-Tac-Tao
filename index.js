const statusText = $("#status");
const restartBtn = $("button");
const winCodition = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

let places = ["","","","","","","","",""];
let currentPlayer = "X";
let running = false;

initialize();

$(restartBtn).hide();
$(restartBtn).click(restart);


function initialize() {
    running=true;
    $(".but").click(cellClicked);
    restartBtn.click(restart);
        $(statusText).text(currentPlayer+"'s turn");
    // statusText.text(currentPlayer+"'s Turn");
}

function cellClicked() {
    const index = $(this).attr("cellIndex");
    
    //update only when the place is not occupied and game is running 
    if(places[index] != "" || !running) {
        return;
    }
    updateCell(this , index);
    
    //check if there is a winner or not 
    winner();
}

function updateCell(cell , index) {

    places[index] = currentPlayer;
    $(cell).text(currentPlayer);
}

function changePlayer() {
    currentPlayer = (currentPlayer == "X") ? "O" : "X";
    $(statusText).text(currentPlayer+"'s turn");
}

function winner() {
    let roundWon = false;
    for(let i = 0 ; i < winCodition.length ; i++) {
        const condition = winCodition[i];
        //condition = [0,1,2];

        const cellA = places[condition[0]];
        //cellA = places[0] => ["",....]  next interation places[3]

        const cellB = places[condition[1]];
        //cellB = places[1] => [.,"",..]  next interation places[4]

        const cellC = places[condition[2]];
        //cellC = places[2] => [.,.,"",...]  next interation places[5]

        if(cellA == "" || cellB == "" || cellC == ""){
            continue;
        }
        if(cellA == cellB && cellB == cellC) {
            roundWon = true;
            break;
        }
    }

    if(roundWon){
        $(statusText).text(currentPlayer+" wins !!");
    //    $(statusText).text(currentPlayer+" Wins !!");
       running = false;
       $(restartBtn).slideDown();
    } else if (!places.includes("")){
       $(statusText).text("Draw !!");
       running = false;
       $(restartBtn).slideDown();
    } else {
        changePlayer();
    }
}

function restart() {
    $(restartBtn).slideUp();
    //Intitalize everything to start
    places = ["","","","","","","","",""];
    currentPlayer = "X";
    $(statusText).text(currentPlayer+"'s turn");
    
    //remove all the text's (i.e : X,O)
    $(".but").text("");

    //start the game again
    running=true;
}
