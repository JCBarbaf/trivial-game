import { getQuestion } from "./call-handler.js";

const questionNode = document.querySelector('.question');
const categoryNode = document.querySelector('.category');
const difficultyNode = document.querySelector('.difficulty');
const multipleAnswersNode = document.querySelector('.multiple-answers-box');
const tfAnswersNode = document.querySelector('.tf-answers-box');
const mAnswersNodes = multipleAnswersNode.querySelectorAll('.answer-box');
const trueAnswerNode = tfAnswersNode.querySelector('.answer-box.true');
const falseAnswerNode = tfAnswersNode.querySelector('.answer-box.false');


newQuestion();

async function newQuestion() {
    try {
        const questionData = await getQuestion();
        let answers = [{}];
        answers[0] = {answer: questionData.correct_answer, correct: true };
        for (let i = 0; i < questionData.incorrect_answers.length; i++) {
            answers[i+1] = {
                answer: questionData.incorrect_answers[i],
                correct: false
            };
        }
        for (let i = answers.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [answers[i], answers[j]] = [answers[j], answers[i]];
        }
        console.log(answers);
        questionNode.innerHTML = questionData.question;
        let category = questionData.category.includes(":") ? questionData.category.split(':')[1].trim() : questionData.category;
        categoryNode.innerHTML = category;
        difficultyNode.innerHTML = questionData.difficulty;
        console.log(questionData.type );
        if (questionData.type === 'multiple') {
            multipleAnswersNode.classList.add('active');
            tfAnswersNode.classList.remove('active');
            for (let i = 0; i < answers.length; i++) {
                mAnswersNodes[i].innerHTML = answers[i].answer;
                mAnswersNodes[i].dataset.correct = answers[i].correct;
            }
        } else if (questionData.type === 'boolean') {
            tfAnswersNode.classList.add('active');
            multipleAnswersNode.classList.remove('active');
            for (let i = 0; i < answers.length; i++) {
                if (answers[i].answer === 'True') {
                    trueAnswerNode.innerHTML = answers[i].answer;
                    trueAnswerNode.dataset.correct = answers[i].correct;
                } else if (answers[i].answer === 'False') {
                    falseAnswerNode.innerHTML = answers[i].answer;
                    falseAnswerNode.dataset.correct = answers[i].correct;
                }
            }
        }
    } catch (error) {
        questionNode.innerHTML = error;
    }
}
