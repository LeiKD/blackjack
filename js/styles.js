let cardsDatabase={'A':1,'2':2,'3':3,'4':4,'5':5,'6':6,'7':7,'8':8,'9':9,'10':10,'J':11,'Q':12,'K':13}
let cardNumbers=['A','2','3','4','5','6','7','8','9','10','J','Q','K'];
let dealer={'box':'dealer-box','id':'dealer-result', 'score':0};
let you={'box':'your-box','id':'your-result', 'score':0}
document.querySelector('#hit').addEventListener('click',hit);
document.querySelector('#pass').addEventListener('click',pass);
document.querySelector('#deal').addEventListener('click',deal);

function randomCard(){
    let randNum= Math.floor(Math.random()*13);
    return randCard= cardNumbers[randNum];
}
function hit(){
    let swishSound= new Audio('./sounds/swish.mp3');
    let chosenCard= document.createElement('img');
    chosenCard.src= "./images/"+ randomCard() + ".png";
    chosenCard.setAttribute('style','height:150px; width:130px; padding:20px;');
    document.getElementById('my-box').appendChild(chosenCard);
    swishSound.play(); 
    myScore();
    maximum();
}
function pass(){
    let dealerCard= document.createElement('img');
    dealerCard.src= "./images/"+ randomCard() + ".png";
    dealerCard.setAttribute('style','height:150px; width:130px; padding:20px;');
    document.getElementById('its-box').appendChild(dealerCard);
    dealerScore();
}
function deal(){
    let myCards= document.querySelector('#my-box').querySelectorAll('img');
    for (let i = 0; i < myCards.length; i++) {
        myCards[i].remove();       
    }
    let itsCards= document.querySelector('#its-box').querySelectorAll('img');
    for (let i = 0; i < itsCards.length; i++) {
        itsCards[i].remove();       
    }
    maximum();
}

function myScore(){
    you['score'] += cardsDatabase[randomCard()];
    document.getElementById('your-result').innerHTML= "<h2>You: " + you['score'] + "</h2>";
}
function dealerScore(){
    dealer['score'] += cardsDatabase[randomCard()];
    document.getElementById('dealer-result').innerHTML= "<h2> Dealer: " + dealer['score'] + "</h2"
}
function maximum(){
    if (you['score'] >= 21) {
        hit();
    } 
    if (dealer['score'] >=21){
        pass();
    }
}