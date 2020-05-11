let cardsDatabase={'A':[1,11],'2':2,'3':3,'4':4,'5':5,'6':6,'7':7,'8':8,'9':9,'10':10,'J':10,'Q':10,'K':10}
let cardNumbers=['A','2','3','4','5','6','7','8','9','10','J','Q','K'];
let blackjackGame= {
    'dealer':{'box':'its-box','id':'#dealer-result', 'score':0, 'title':'Dealer'},
    'you':{'box':'my-box','id':'#your-result', 'score':0, 'title': 'You'}
}
const you= blackjackGame['you'];
const dealer= blackjackGame['dealer'];
const swishSound= new Audio('./sounds/swish.mp3');
const winSound= new Audio('./sounds/cash.mp3');
const lossSound= new Audio('./sounds/aww.mp3');
const drawSound= new Audio('./sounds/draw.mp3');

document.querySelector('#hit').addEventListener('click',hit);
document.querySelector('#pass').addEventListener('click',pass);
document.querySelector('#deal').addEventListener('click',deal);

let scoreBoardDatabase = {
    'wins':{'id': 'wins', 'score': 0},
    'draws':{'id': 'draws', 'score': 0},
    'losses':{'id': 'losses', 'score': 0}
}
const wins = scoreBoardDatabase['wins'];
const draws = scoreBoardDatabase['draws'];
const losses = scoreBoardDatabase['losses'];

function randomCard(){
    let randNum= Math.floor(Math.random()*13);
    return cardNumbers[randNum];
}

function showCard(card,activePlayer){
    if (activePlayer['score'] + cardsDatabase[card] <= 21) {
    let chosenCard= document.createElement('img');
    chosenCard.src= `./images/${card}.png`;
    chosenCard.setAttribute('style','height:150px; width:130px; padding:20px;');
    document.getElementById(activePlayer['box']).appendChild(chosenCard);
    swishSound.play();
    } else {

    }
}
function hit(){
    let card= randomCard();
    showCard(card,you);
    updateScore(card,you);
    showScore(you);
    console.log(you['score']);
}
function pass(){
    let card= randomCard();
    showCard(card,dealer);
    updateScore(card,dealer);
    showScore(dealer);
    console.log(dealer['score']);
}
function deal(){
    showResult(computeWinner());
    erase(you);
    erase(dealer);
    resetScore(you);
    resetScore(dealer);
    scoreBoard();
}
function resetScore(activePlayer){
    activePlayer['score'] *= 0;
    document.querySelector(activePlayer['id']).textContent= activePlayer['score'] * 0;
    document.querySelector(activePlayer['id']).style.color= 'white';
}
function erase(activePlayer){
    let cardsDisplay= document.querySelector('#' + activePlayer['box']).querySelectorAll('img');
    for (let i = 0; i < cardsDisplay.length; i++) {
        cardsDisplay[i].remove();       
    }
}
function updateScore(card,activePlayer){
    if (card==='A') {
        if (activePlayer['score'] + cardsDatabase[card][1] <= 21){
            activePlayer['score'] += cardsDatabase[card][1];
        } else {
            activePlayer['score'] += cardsDatabase[card][0];
        }
    } else {
        activePlayer['score'] += cardsDatabase[card];
    }
}
function showScore(activePlayer){
    if (activePlayer['score'] > 21) {
        document.querySelector(activePlayer['id']).textContent= 'BUSTED!';
        document.querySelector(activePlayer['id']).style.color= 'red';
    } else {
        document.querySelector(activePlayer['id']).textContent= activePlayer['score'];
    }
}
function computeWinner(){
    let winner;
    if (you['score'] <= 21) {
        if (you['score'] > dealer['score'] || dealer['score'] > 21) {
            console.log('You Won');
            winner = you;
            
        } else if (you['score'] < dealer['score']) {
            console.log('You lost');
            winner= dealer;
        
        } else if (you['score'] === dealer['score']) {
            console.log('You drew');
            
        }
    } else if (you['score'] > 21 && dealer['score'] > 21) {
        console.log('You drew');
      
    } else if (you['score'] > 21 && dealer['score'] <=21) {
        console.log ('You Lost')
        winner= dealer;
        
    }
    console.log ('Winner is', winner)
    return winner;
}
function showResult(winner){
    let message,messageColor;
    if (winner===you){
        message= 'You Won!';
        messageColor= 'blue';
        winSound.play();
        wins['score'] ++ ;
    } else if (winner===dealer){
        message= 'You Lost!';
        messageColor= 'red';
        lossSound.play();
        losses['score'] ++ ;
    }else {
        message= 'You Drew!';
        messageColor= 'yellow';
        drawSound.play();
        draws['score'] ++ ;
    }
    document.querySelector('#bj-result-text').textContent= message;
    document.querySelector('#bj-result-text').style.color= messageColor;
    console.log('Winner is' + winner)
}

function scoreBoard(){
    document.querySelector('#wins').textContent = wins['score'];
    document.querySelector('#draws').textContent = draws['score'];
    document.querySelector('#losses').textContent = losses['score'];
}

document.querySelector('#reload').addEventListener('click', reload);

function reload() {
    window.location.reload();
}