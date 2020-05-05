let cardsDatabase={'A':[1,11],'2':2,'3':3,'4':4,'5':5,'6':6,'7':7,'8':8,'9':9,'10':10,'J':10,'Q':10,'K':10}
let cardNumbers=['A','2','3','4','5','6','7','8','9','10','J','Q','K'];
let blackjackGame= {
    'dealer':{'box':'its-box','id':'#dealer-result', 'score':0, 'title':'Dealer'},
    'you':{'box':'my-box','id':'#your-result', 'score':0, 'title': 'You'}
}
const you= blackjackGame['you'];
const dealer= blackjackGame['dealer'];
const swishSound= new Audio('./sounds/swish.mp3');

document.querySelector('#hit').addEventListener('click',hit);
document.querySelector('#pass').addEventListener('click',pass);
document.querySelector('#deal').addEventListener('click',deal);

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
    } else {

    }
}
function hit(){
    let card= randomCard();
    swishSound.play();
    showCard(card,you);
    updateScore(card,you);
    showScore(you);
}
function pass(){
    let card= randomCard();
    swishSound.play();
    showCard(card,dealer);
    updateScore(card,dealer);
    showScore(dealer);
}
function deal(){
    erase(you);
    erase(dealer);
    resetScore(you);
    resetScore(dealer);
    computeWinner();
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
            activePlayer['score'] + cardsDatabase[card][1];
        } else {
            activePlayer['score'] + cardsDatabase[card][0];
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
    if (you['score'] <= 21) {
        if (you['score'] > dealer['score'] || dealer['score'] > 21) {
            console.log('You Won');
            document.querySelector('#bj-result-text').textContent= 'You Won!';
            document.querySelector('#bj-result-text').style.color= 'green';
        } else if (you['score'] < dealer['score'] || dealer['score'] < 21) {
            console.log('You lost');
            document.querySelector('#bj-result-text').textContent = 'You Lost';
            document.querySelector('#bj-result-text').style.color= 'red';
        } else if (you['score'] === dealer['score']) {
            console.log('You drew');
            document.querySelector('#bj-result-text').textContent = 'You Drew';
            document.querySelector('#bj-result-text').style.color= 'yellow';
        }
    } else if (you['score'] > 21 && dealer['score'] > 21) {
        console.log('You drew');
        document.querySelector('#bj-result-text').textContent= 'You Drew!';
        document.querySelector('#bj-result-text').style.color= 'yellow';
    } 
}