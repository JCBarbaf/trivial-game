import { getCurrentHp, takeAHit , gainExp} from "./hp-and-exp-handler.js";
import { newQuestion } from "./question-handler.js";
import { getQuestion } from "./call-handler.js";

let answerNodes = document.querySelectorAll('.answer-box');
let answersBox = document.querySelector('.answers-box');
answersBox.addEventListener('click', async (event) => {
    let answerNode;
    let isAlive = true;
    if (answerNode = event.target.closest('.answer-box')) {
        if (getCurrentHp() > 0) {
            if (answerNode.dataset.correct === 'true') {
                gainExp();
            } else {
                isAlive = takeAHit();
            }
            showCorrectAnswer();
            if (isAlive) {
                await nextQuestion();
                resetAnswers();
            }
        }
    }
});

async function nextQuestion() {
    const [questionData] = await Promise.all([
        getQuestion(),
        new Promise(resolve => setTimeout(resolve, 3000))
    ]);

    newQuestion(questionData);
}

function showCorrectAnswer() {
    answersBox.classList.add('disabled');
    answerNodes.forEach(answer => {
        if (answer.dataset.correct === 'true') {
            answer.classList.add('correct');
        } else {
            answer.classList.add('incorrect');
        }
    });
}

function resetAnswers() {
    answerNodes.forEach(answer => {
        answer.classList.remove('correct');
        answer.classList.remove('incorrect');
    });
    answersBox.classList.remove('disabled');
}