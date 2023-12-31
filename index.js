const passwordNorms = {
    characters: ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z",
    "a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"],
    numbers: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"],
    symbols: ["~","`","!","@","#","$","%","^","&","*","(",")","_","-","+","=","{","[","}","]",",","|",":",";","<",">",".","?","/"]
}

let passwordLength = 15
// let arrayOfPasswordNorms = ["characters", "numbers", "symbols"]
let passwordRulesChosen = []

let isChecked = {
    characters: true,
    numbers: true,
    symbols: true
}

function checkRulesSelected(){
    for(let key in isChecked){
        if(isChecked[key] && passwordRulesChosen.indexOf(key) === -1){
            passwordRulesChosen.push(key)
        }else if(!isChecked[key] && passwordRulesChosen.indexOf(key) !== -1){
            passwordRulesChosen = passwordRulesChosen.filter(item => item !== key);
        }
    }
    // console.log(passwordRulesChosen)
    return passwordRulesChosen
}

function getRandomNumber(l){
    return Math.floor(Math.random() * l)
}

function getRandomPassword(){
    let passwordRulesChosen = checkRulesSelected()
    if(!passwordRulesChosen.length){
        alert("Please select some rules to generate a password!")
        return ""
    }
    let password = ""
    for(let i = 0; i < passwordLength ; i++){
        let j = getRandomNumber(passwordRulesChosen.length)
        let key = passwordRulesChosen[j]
        let k = getRandomNumber(passwordNorms[key].length)
        password += passwordNorms[key][k]
    }
    return password
}

function displayPassword(id, password){
    let passwordEl = document.querySelector(id)
    passwordEl.textContent = password
}


function turnOnOff(box, container, distance){
    let onColor =  "#4ADF86"
    let offColor =  "#ffffff"

    const slider = [{ transform: "translateX("+distance+"px)"}]
    const sliderTiming = {
        duration: 200,
        fill: 'forwards'
    }
    box.animate(slider, sliderTiming).onfinish = () => { 
        container.style.backgroundColor = distance ? onColor : offColor 
    }
}

function changeStatus(boxId="#box-1", containerId="#character-rule"){
    let boxEl = document.querySelector(boxId)
    let containerEL = document.querySelector(containerId)

    let key = containerId.includes("char") ? "characters" : (containerId.includes("num") ? "numbers" : "symbols")

    if(!isChecked[key]){
        turnOnOff(boxEl, containerEL, 35)
        isChecked[key] = true
        console.log(`${key} is turned on`)
    }else{
        turnOnOff(boxEl, containerEL, 0)
        isChecked[key] = false
        console.log(`${key} is turned off`)
    }
}


function generatePassword(){
    let pass1 = getRandomPassword()
    let pass2 = getRandomPassword()
    displayPassword("#password-text-1", pass1)
    displayPassword("#password-text-2", pass2)
}




function copyPassword(id){
    let copiedText = document.querySelector(id).textContent
    if(copiedText !== ""){
        navigator.clipboard.writeText(copiedText)
        .then(() => {
            alert("Password copied to clipboard")
        },() => {
            console.error('Failed to copy');
        });
    }
}



