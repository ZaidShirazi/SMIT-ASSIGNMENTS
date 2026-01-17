function calculator(){

    var inputScreenText = document.getElementById('inputScreenDiv').innerText;
    
    // empty input logic
    if(inputScreenDiv.innerText === ''){
        resultScreenDiv.innerText = "Please enter value";
        resultScreenDiv.style.color = "red";
        return;
    }

    var operators = ['+', '-', '*', '/', '%'];
    var endOfInput = inputScreenText.slice(-1);

    // input end on operator logic
    for(var i = 0; i<operators.length; i++){
        if(endOfInput == operators[i] ){
            resultScreenDiv.innerText = "Incomplete input!";
            resultScreenDiv.style.color = "red";
            return;
        }
    }

    resultScreenDiv.innerText = "= " + eval(inputScreenText);

}

var inputScreenDiv = document.getElementById('inputScreenDiv');

function editScreen(data){

    // clear screen logic
    if(data === 'C'){
        inputScreenDiv.innerText = '';
        resultScreenDiv.innerText = '';
        return;
    }

    // delete logic
    if(data === 'Del'){
        var inputTextLength = inputScreenDiv.innerText.length;
        inputScreenDiv.innerText = inputScreenDiv.innerText.slice(0, inputTextLength -1);
        return;
    }

    inputScreenDiv.innerText += data;

    var inputScreenText = inputScreenDiv.innerText;

    // input goes to infinity logic

    if(eval(inputScreenText) == Infinity || eval(inputScreenText) == -Infinity){
        resultScreenDiv.innerText = "Can't Divide by 0";
        resultScreenDiv.style.color = "red";
        return;
    }

    
    
}