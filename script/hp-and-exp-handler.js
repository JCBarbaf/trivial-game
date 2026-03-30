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
    hp--;
    // hp -= 10;
    updateHpBar();
    if (hp <= 0) {
        gameOver();
        return false;
    }
    return true;
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
            heartBox.querySelector('.half-heart').classList.add('active');
        } else {
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

//Game-over

let gameOverModal = document.querySelector('.game-over.modal-background');

function gameOver() {
    gameOverModal.querySelector('.final-lvl').innerHTML = lvl;
    gameOverModal.querySelector('.total-exp').innerHTML = totalExp;
    gameOverModal.classList.add('active');
}


export {getCurrentHp, takeAHit, fullHealth, gainExp}