import { getCurrentHp, takeAHit, fullHealth } from "./hp-and-exp-handler.js";
document.querySelector('.answers-box').addEventListener('click', (event) => {
    let answerNode;
    if (answerNode = event.target.closest('.answer-box')) {
        if (answerNode.dataset.correct === 'true') {
            alert('Correct! ^_^');
        } else {
            if (getCurrentHp() > 0) {
                alert('incorrect :(')
                takeAHit();
            }
        }
    }
});