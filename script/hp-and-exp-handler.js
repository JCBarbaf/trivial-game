//HP

let hp = 10;
let heartBoxes = document.querySelectorAll('.heart-box');
updateHpBar();

function getCurrentHp() {
    return hp;
}

function fullHealth() {
    hp = 10;
    updateHpBar();
}

function takeAHit() {
    console.log(`hp after: ${hp}`)
    hp--;
    console.log(`hp before: ${hp}`)
    updateHpBar();
}

function updateHpBar() {
    let tmpHp = hp;
    document.querySelectorAll('.heart-box img').forEach(img => {
        img.classList.remove('active');
    });
    heartBoxes.forEach(heartBox => {
        if (tmpHp > 1) {
            heartBox.querySelector('.heart').classList.add('active');
        } else if (tmpHp > 0) {
            console.log('half container');
            heartBox.querySelector('.half-heart').classList.add('active');
        } else {
            console.log('empty container');
            heartBox.querySelector('.heart-container').classList.add('active');
        }
        tmpHp -= 2;
    });
}

//EXP
let exp = 0;
let totalExp = 0;
let lvl = 1;
let expToLvlUp = 100;
let expForAnswer = 10;
let expGrowthFactor = 1.2;

let expBar = document.querySelector('.exp-bar-color');
let lvlNode = document.querySelector('.lvl-text');

updateExpBar();
updateLvl();

function gainExp() {
    totalExp += expForAnswer;
    exp += expForAnswer;
    updateExpBar();
    if (exp >= expToLvlUp) {
        exp -= expToLvlUp;
        lvlUp();
    }
}

function lvlUp() {
    alert('Level up!');
    lvl++;
    expToLvlUp = Math.round(expToLvlUp*expGrowthFactor);
    updateExpBar();
    updateLvl();
}

function updateExpBar() {
    let percent = Math.round((exp*100)/expToLvlUp);
    expBar.style.setProperty('--percent', `${percent}%`);
}

function updateLvl() {
    lvlNode.innerHTML = lvl;
}



export {getCurrentHp, takeAHit, fullHealth, gainExp}