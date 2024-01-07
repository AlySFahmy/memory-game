

const cards = document.querySelectorAll(".card");
const timeTag = document.querySelector(".time b");
const footer = document.querySelector(".details");

let maxTime = 30;
let timeLeft = maxTime;
let matchedCard = 0;
let disableDeck = false;
let isPlaying = false;
let cardOne, cardTwo, timer;



function startTimer() {
    timeLeft--;
    timeTag.innerText = timeLeft;
    if(timeLeft <= 0) {
        footer.style.backgroundColor="red";
        return clearInterval(timer);
    }

}



function flipCard({target: clickedCard}) {
    if(!isPlaying) {
        isPlaying = true;
        timer = setInterval(startTimer, 1000);
    }
    if(clickedCard !== cardOne && !disableDeck && timeLeft > 0) {
        clickedCard.classList.add("flip");
        if(!cardOne) {
            return cardOne = clickedCard;
        }
        cardTwo = clickedCard;
        disableDeck = true;
        let cardOneImg = cardOne.querySelector(".back-view img").src,
        cardTwoImg = cardTwo.querySelector(".back-view img").src;
        matchCards(cardOneImg, cardTwoImg);
    }
}


function matchCards(img1, img2) {
    if (img1 === img2) {
        matchedCard++;
        if (matchedCard === 6 && timeLeft > 0) {

            return clearInterval(timer);
        }

        cardOne.removeEventListener("click", flipCard);
        cardTwo.removeEventListener("click", flipCard);
        cardOne = cardTwo = "";
        disableDeck = false;
        return;
    }

    setTimeout(function() {
        cardOne.classList.add("shake");
        cardTwo.classList.add("shake");
    }, 200);

    setTimeout(function() {
        cardOne.classList.remove("shake", "flip");
        cardTwo.classList.remove("shake", "flip");
        cardOne = cardTwo = "";
        disableDeck = false;
    }, 600);
}






function shuffleCard() {
    timeLeft = maxTime;
    matchedCard = 0;
    cardOne = cardTwo = "";
    clearInterval(timer);
    timeTag.innerText = timeLeft;
    disableDeck = isPlaying = false;

    let arr = [1, 2, 3, 4, 5, 6, 1, 2, 3, 4, 5, 6];
    arr.sort(function() {
        const result = Math.random();
        let output;

        if (result > 0.5) {
        output = 1;
        } else {
        output = -1;
        }

        return output;
    });

    cards.forEach(function(card, index) {
        card.classList.remove("flip");
        let imgTag = card.querySelector(".back-view img");
        setTimeout(function() {
            imgTag.src = "images/img-" + arr[index] + ".png";
        }, 500);
        card.addEventListener("click", flipCard);
    });
}

shuffleCard();





cards.forEach(function(card) {
    card.addEventListener("click", flipCard);
});


