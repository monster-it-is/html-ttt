const tttBtns = document.getElementsByClassName("ttt-btn")
const banner = document.getElementById("banner")
const line = document.getElementById("win-line")

let playerTurn = 1
let boardsize = 3

function winCheck() {
    const conditions = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [2, 4, 6], [0, 4, 8]]
    for (c of conditions) {
        if (tttBtns[c[0]].innerText === tttBtns[c[1]].innerText && tttBtns[c[1]].innerText === tttBtns[c[2]].innerText) {
            if (tttBtns[c[0]].innerText) {
                for (btn of tttBtns) {
                    btn.disabled = true
                }
                drawWinLine(c[0], c[2])
                if (playerTurn === 1) {
                    localStorage.setItem("X", Number(localStorage.getItem("X")) + 1)
                }
                else {
                    localStorage.setItem("O", Number(localStorage.getItem("O")) + 1)
                }
                score()
                return `${playerTurn === 1 ? 'X' : 'O'} won`
            }
        }
    }
    return false
}

function score() {
    document.getElementById("p1").innerText = `Player 1 : ${localStorage.getItem("X")}`
    document.getElementById("p2").innerText = `Player 2 : ${localStorage.getItem("O")}`
}

function drawWinLine(start, end) {
    let rect
    rect = tttBtns[start].getBoundingClientRect()
    const c1 = [(rect.left + rect.right) / 2, (rect.top + rect.bottom) / 2]
    rect = tttBtns[end].getBoundingClientRect()
    const c2 = [(rect.left + rect.right) / 2, (rect.top + rect.bottom) / 2]
    line.style.left = `${c1[0]}px`
    line.style.top = `${c1[1]}px`
    const dist = Math.sqrt(Math.pow(c1[0] - c2[0], 2) + Math.pow(c1[1] - c2[1], 2))
    line.style.width = `${dist}px`
    line.style.rotate = `${Math.atan((c2[1] - c1[1]) / (c2[0] - c1[0]))}rad`
}

function drawCheck() {
    for (btn of tttBtns) {
        if (!btn.innerText) {
            return false
        }
    }
    return "Draw"
}

function play(index) {
    tttBtns[index].innerText = playerTurn === 1 ? 'X' : 'O'
    tttBtns[index].disabled = true
}

function gameLoop() {
    const draw = drawCheck()
    const result = winCheck()
    playerTurn = playerTurn === 1 ? 2 : 1
    banner.innerText = result || draw || `${playerTurn === 1 ? 'X' : 'O'} Plays`

    if (draw || result) {
        reset.disabled = false
    }
}

for (let i = 0; i < tttBtns.length; i++) {
    tttBtns[i].addEventListener('click', () => {
        play(i)
        gameLoop()
    })
}

// upload to github, grant me access and deploy on github pages

// learn about localStorage api
// create a score function which displays the score of each player upto this point

// implement boardSize


// function winCheck() {
//     const conditions = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [2, 4, 6], [0, 4, 8]]
//     for (c of conditions) {
//         if (tttBtns[c[0]].innerText === tttBtns[c[1]].innerText && tttBtns[c[1]].innerText === tttBtns[c[2]].innerText) {
//             if (tttBtns[c[0]].innerText) {
//                 for (btn of tttBtns) {
//                     btn.disabled = true
//                 }
//                 drawWinLine(c[0], c[2])
//                 if (playerTurn === 1) {
//                     localStorage.setItem("X", Number(localStorage.getItem("X")) + 1)
//                 }
//                 else {
//                     localStorage.setItem("O", Number(localStorage.getItem("O")) + 1)
//                 }
//                 score()
//                 return `${playerTurn === 1 ? 'X' : 'O'} won`
//             }
//         }
//     }
//     return false
// }