const typingPara = document.querySelector('.mainPara p'),
resetBtn = document.querySelector('#restart-icon'),
inpFeild = document.querySelector(".input-feild");

let timer,
maxTime = 10,
timeLeft = maxTime,
charIndex = isTyping =  mistakes = 0;

function randomParagraph() {
    let randomIndex = Math.floor(Math.random()*normalWords.length);
    typingPara.innerHTML = "";  //the next para will not append into the previous one
    inpFeild.value = '';
    normalWords[randomIndex].split("").forEach(letter => {
        let spanTag = `<span>${letter}</span>`;
        typingPara.innerHTML += spanTag;    //adding each character inside span tag, and the adding the span inside p tag
    });
    typingPara.querySelectorAll("span")[0].classList.add("firstChar");
    //focusing input feild on keydown or click event
    document.addEventListener("keydown", () => inpFeild.focus());
    typingPara.addEventListener("click", () => inpFeild.focus());
}
function initTyping() {
    const characters = typingPara.querySelectorAll('span');
    let typedChar = inpFeild.value.split("")[charIndex];
    if (charIndex < characters.length - 1 && timeLeft > 0) {
        if(!isTyping) { //once timer is started it won't restart again on every key clicked
            timer = setInterval(initTimer, 1000);
            isTyping = 1;
            typingPara.querySelectorAll("span")[0].classList.remove("firstChar");   //typing is started
        }
        if(typedChar == null) { //if user has pressed backpress or hasn't entered any character
    
            charIndex--;
            if(characters[charIndex].classList.contains("incorrect")) { //decrement msitakes only if span tag contains incorrect class
                mistakes--;
            }
            characters[charIndex].classList.remove("correct", "incorrect");
        } else {
            if(characters[charIndex].innerText === typedChar) { //if user typed character matched with paragrph then add correct class inside span tag
                characters[charIndex].classList.add("correct");
            } else {
                mistakes++;
                characters[charIndex].classList.add("incorrect");
            }
            charIndex++;
        }
        characters.forEach(span => span.classList.remove("active")); //removing active class froma all span and then adding to current span tag only
        characters[charIndex].classList.add("active");  //adding active class to next coming character
    
        let wpm = Math.round((((charIndex - mistakes)/5)/(maxTime - timeLeft)) * 60);
        wpm = wpm < 0 || !wpm || wpm === Infinity ? 0 : wpm;    //if wpm value is infinity, less than 0, empty then set it to 0
    
    } else {
        inpFeild.value = "";
        clearInterval(timer);
        alert("Time is Over!");
        console.log("Your mistakes " + mistakes);
        console.log("Wpm " +wpm);
    }
}

function initTimer() {  
    if(timeLeft > 0) {  //if timeLeft > 0 then decrement or clear the timer
        timeLeft--;
        // timeTag.innerHTML = timeLeft;
    } else {
        alert("Time is Over!");
        console.log(mistakes);
        console.log(wpm);
        clearInterval(timer);
    }
}

// reset button

resetBtn.addEventListener('click',resetGame);
function resetGame() {
    randomParagraph();
    timeLeft = maxTime,
    charIndex = isTyping =  mistakes = 0;
//     timeTag.innerHTML = timeLeft;
//     mistakeTag.innerHTML = mistakes;
//     wpmTag.innerText = 0;
//     cpmTag.innerText = 0;
}

// themes

const themes = document.querySelector('#themes-button');
let z = 0, o = 0;
themes.addEventListener('click', (e) => {
    if(z == 0){ z = 1; o = 1;}
    else {z = 0; o = 0}
    document.querySelector('#themes-option').style.zIndex = z;
    document.querySelector('#themes-option').style.opacity = o;
})
let themeoptions = document.querySelectorAll('#themes'); 
themeoptions.forEach(color => {
    color.addEventListener('click', () => {
        let pc = color.getAttribute('bg-color');
        let tp = color.getAttribute('text-primary');
        let ts = color.getAttribute('text-secondary');
        let sc = color.getAttribute('secondary-color');
        document.querySelector(':root').style.setProperty('--bg-color',pc);
        document.querySelector(':root').style.setProperty('--text-secondary',ts);
        document.querySelector(':root').style.setProperty('--text-primary',tp);
        document.querySelector(':root').style.setProperty('--secondary-color', sc);
    });
});
randomParagraph();
inpFeild.addEventListener("input", initTyping);