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
    console.log(heartBoxes.length);
    heartBoxes.forEach(heartBox => {
        if (tmpHp > 1) {
            console.log('full container');
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

export {getCurrentHp, takeAHit, fullHealth}