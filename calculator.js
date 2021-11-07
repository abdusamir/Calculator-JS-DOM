let buffer='0';
let runningTotal=0;
let prevOperator=null;


const screen=document.querySelector('.screen');


function buttonClick(value){
    if(isNaN(value)){
        //not a number
        handleSymbols(value);
    }else{
        // a number
        handleNumber(value);
    }
    screen.innerText=buffer;
}

function handleNumber(value){
    if(buffer==='0'){
        buffer=value;
    }else{
        buffer+=value;
    }
}
function handleSymbols(symbol){
    switch (symbol){
        case 'C':
            buffer='0';
            runningTotal=0;
            break;
        case '=':
            if(prevOperator===null){
                return;
            }
            flushOperation(parseInt(buffer));
            prevOperator=null;
            buffer=runningTotal;
            runningTotal=0;
            return;
        case '←':
            if(buffer.length===1){
                buffer='0';
            }else{
                buffer=buffer.substring(0,buffer.length-1);
            }
            break;
        case '+':
        case '-':
        case '×':
        case '÷':
            handleMath(symbol);
            break;
    }
}
function handleMath(symbol){
    if (buffer==='0'){
        return;
    }
    const intBuffer=parseInt(buffer);
    if(runningTotal===0){
        runningTotal=intBuffer;
    }else{
        flushOperation(intBuffer);
    }
    prevOperator=symbol;
    buffer='0';
}
function flushOperation(intBuffer){
    if(prevOperator==='+'){
        runningTotal+= intBuffer
    }
    else if(prevOperator==='-'){
        runningTotal-=intBuffer;
    }
    else if(prevOperator==='×'){
        runningTotal*=intBuffer;
    }else{
        runningTotal/=intBuffer;
    }
}
function init(){
    document.querySelector('.calc-buttons').
    addEventListener('click',function(event){
        buttonClick(event.target.innerText);
    })
}

init();