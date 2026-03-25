import { getCurrentHp, takeAHit , gainExp} from "./hp-and-exp-handler.js";
document.querySelector('.answers-box').addEventListener('click', (event) => {
    let answerNode;
    if (answerNode = event.target.closest('.answer-box')) {
        if (getCurrentHp() > 0) {
            if (answerNode.dataset.correct === 'true') {
                alert('Correct! ^_^');
                gainExp();
            } else {
                alert('incorrect :(')
                takeAHit();
            }
        }
    }
});