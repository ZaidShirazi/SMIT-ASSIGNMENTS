
var mainDiv = document.getElementById("main");
var matchDiv = document.getElementById("matchBox");
var scoreSpan = document.getElementById("score");
var colors = ['red','blue','yellow','green','orange','aqua', 'tan', 'teal', 'lightslategray', 'fuchsia', 'seashell', 'mediumslateblue', 'rebeccapurple'];
var score = 0;
var messageDiv = document.getElementById('messageDiv');

// inital assign to score span
scoreSpan.innerText = score;

/// to generate the random color
function randomColor(){
    var randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
}

// assign color to the match box div
matchDiv.style.backgroundColor = randomColor();

function boxClickHandler(event){
    var targetDiv = event.target;

    // console.log(targetDiv.style.backgroundColor);

    // to check the color of match box and the targeted div (the clicked one)
    if(targetDiv.style.backgroundColor === matchDiv.style.backgroundColor){
        // console.log(true);
        messageDiv.innerText = ''; 
        messageDiv.innerText = 'Matched !';
        messageDiv.style.color = 'lightgreen';
        score++;
        scoreSpan.innerText = score;
        matchDiv.style.backgroundColor = randomColor();

    }else if(score<=0){
        score = 0;
        scoreSpan.innerText = 0;
        messageDiv.innerText = 'Score is at 0 !';
        messageDiv.style.color = 'red';
        // Remove the animation so it can be reset
        messageDiv.style.animation = 'none';
        // Trigger a "reflow" (this forces the browser to notice the animation was removed)
        void messageDiv.offsetWidth; 
        messageDiv.style.animation = 'shake 0.5s';
    }else{
        score--;
        scoreSpan.innerText = score;
        messageDiv.innerText = 'Oops! You clicked Wrong Box';
        messageDiv.style.color = 'red';
        // Remove the animation so it can be reset
        messageDiv.style.animation = 'none';
        // Trigger a "reflow" (this forces the browser to notice the animation was removed)
        void messageDiv.offsetWidth; 
        messageDiv.style.animation = 'shake 0.5s';
        }
        
    }

    for(var i=1; i <=30; i++){
        var divElm = document.createElement("div");
        // divElm.innerText = "div " + i;
        divElm.className = "box";
        
        divElm.style.backgroundColor = randomColor();

        // onclick event assign
        divElm.addEventListener("click", boxClickHandler )
    
        mainDiv.appendChild(divElm)  /// node ---> DOM
    }

// creating divs and applying colors, then append to the main div element