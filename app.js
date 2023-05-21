//Main Elements
const hourEl = document.querySelector('.hour');
const minuteEl = document.querySelector('.minute');
const displayEl = document.querySelector('.display');


//function
const acEl = document.querySelector('.ac');
const pmEl = document.querySelector('.pm');
const percentEl = document.querySelector('.percent');

//operator
const divEl = document.querySelector('.div');
const multEl = document.querySelector('.mult');
const subEl = document.querySelector('.sub');
const addEl = document.querySelector('.add');
const equalEl = document.querySelector('.equal');

//numbers
const decimalEl = document.querySelector('.decimal');
const nu7El = document.querySelector('.nu-7');
const nu8El = document.querySelector('.nu-8');
const nu9El = document.querySelector('.nu-9');
const nu4El = document.querySelector('.nu-4');
const nu5El = document.querySelector('.nu-5');
const nu6El = document.querySelector('.nu-6');
const nu1El = document.querySelector('.nu-1');
const nu2El = document.querySelector('.nu-2');
const nu3El = document.querySelector('.nu-3');
const nu0El = document.querySelector('.nu-0');

const numberElArray = [
    nu0El, nu1El, nu2El, nu3El, nu4El, 
    nu5El, nu6El, nu7El, nu8El, nu9El
];

//variables
let displayStrInMemory = null;
let operatorInMemory = null;

//Functions
const getDisplayAsStr = () => displayEl.textContent.split(',').join('');

const getDisplayAsNum = () => {
    return parseFloat(getDisplayAsStr());
};

const setStrAsDisplay = (displayStr) => {
    if (displayStr[displayStr.length - 1] === '.'){
        displayEl.textContent += '.';
        return;
    }


    const [wholeNumStr, decimalStr] = displayStr.split('.');
    if (decimalStr){
        displayEl.textContent = parseFloat (wholeNumStr).toLocaleString () + '.' + decimalStr;
    } else {
        displayEl.textContent = parseFloat (wholeNumStr).toLocaleString ();
    }
};


const handleNumberClick = (numStr) => {
    const currentDisplayStr = getDisplayAsStr();
    if (currentDisplayStr === '0') {
        setStrAsDisplay(numStr);
    } else {
        setStrAsDisplay(currentDisplayStr + numStr)
    }
};



const getResultOfOperationAsStr = () => {
	const currentDisplayNum = getDisplayAsNum();
    const displayNumInMemory = parseFloat(displayStrInMemory);
    let newDisplayNum; 
    if (operatorInMemory === 'add') {
    	newDisplayNum = displayNumInMemory + currentDisplayNum;
    } else if (operatorInMemory === 'sub') {
    	newDisplayNum = displayNumInMemory - currentDisplayNum;
    } else if (operatorInMemory === 'mult') {
    	newDisplayNum = displayNumInMemory * currentDisplayNum;
    } else if (operatorInMemory === 'div') {
      	newDisplayNum = displayNumInMemory / currentDisplayNum;
    }
  
    return newDisplayNum.toString();
};
  
const handleOperatorClick = (operation) => {
    const currentDisplayStr = getDisplayAsStr();
  
    if (!displayStrInMemory) {
		displayStrInMemory = currentDisplayStr;
		operatorInMemory = operation;
		setStrAsDisplay('0');
		return;
    }
	displayStrInMemory = getResultOfOperationAsStr();
	operatorInMemory = operation;
	setStrAsDisplay('0');
};



// Add Event Listeners to functions
acEl.addEventListener('click', () => {
    setStrAsDisplay('0');
    displayStrInMemory = null;
    operatorInMemory = null;
});
pmEl.addEventListener('click', () => {
    const currentDisplayNum = getDisplayAsNum();
    const currentDisplayStr = getDisplayAsStr();
  
    if (currentDisplayStr === '-0') {
		setStrAsDisplay('0');
		return;
    }
    if (currentDisplayNum >= 0) {
      	setStrAsDisplay('-' + currentDisplayStr);
    } else {
      	setStrAsDisplay(currentDisplayStr.substring(1));
    }
  });
percentEl.addEventListener('click', () => {
    const currentDisplayNum = getDisplayAsNum();
    const newDisplayNum = currentDisplayNum / 100;
    setStrAsDisplay(newDisplayNum.toString());
    displayStrInMemory = null;
    operatorInMemory = null;
});
  
  
// add event listeners to operators
addEl.addEventListener('click', () => {
    handleOperatorClick('add');
});
subEl.addEventListener('click', () => {
    handleOperatorClick('sub');
});
multEl.addEventListener('click', () => {
    handleOperatorClick('mult');
});
divEl.addEventListener('click', () => {
    handleOperatorClick('div');
});
equalEl.addEventListener('click', () => {
    if (displayStrInMemory) {
		setStrAsDisplay(getResultOfOperationAsStr());
		displayStrInMemory = null;
		operatorInMemory = null;
    }
});




//Add Event Listeners to number and decimal
for ( let i=0; i < numberElArray.length; i++) {
    const numberEl = numberElArray[i];
    numberEl.addEventListener('click', () =>{
        handleNumberClick(i.toString());
    });
}

decimalEl.addEventListener('click', () => {
    const currentDisplayStr = getDisplayAsStr();
    if (!currentDisplayStr.includes('.')) {
        setStrAsDisplay(currentDisplayStr + ('.'))
    }
});



//Set-up the time 
const updateTime = () => {
    const currentTime = new Date();


    //change const to let if want to change to 12 hour system
    //if (currentHour > 12) {
    //    currentHour -= 12;
    //}
    const currentHour = currentTime.getHours();
    const currentMinute = currentTime.getMinutes();


    hourEl.textContent = currentHour.toString();
    minuteEl.textContent = currentMinute.toString().padStart(2, '0');
}
setInterval(updateTime, 1000);
updateTime();