import { getQuestion } from "./call-handler.js";

const questionNode = document.querySelector('.question');
const categoryNode = document.querySelector('.category-box');
const difficultyNode = document.querySelector('.difficulty-box');
const multipleAnswersNode = document.querySelector('.multiple-answers-box');
const tfAnswersNode = document.querySelector('.tf-answers-box');
const mAnswersNodes = multipleAnswersNode.querySelectorAll('.answer-box');
const trueAnswerNode = tfAnswersNode.querySelector('.answer-box.true');
const falseAnswerNode = tfAnswersNode.querySelector('.answer-box.false');

let questionData = await getQuestion()
newQuestion(questionData);

async function newQuestion(questionData) {
    try {
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
        questionNode.innerHTML = questionData.question;
        let category = questionData.category.includes(":") ? questionData.category.split(':')[1].trim() : questionData.category;
        categoryNode.querySelector('.category').innerHTML = category;
        categoryNode.className = '';
        categoryNode.classList.add('category-box', 'info-box');
        categoryNode.classList.add(category.toLowerCase().replaceAll(' ', '-').replaceAll('&amp;', 'and'));
        difficultyNode.querySelector('.difficulty').innerHTML = questionData.difficulty;
        difficultyNode.classList.remove('easy', 'medium', 'hard');
        difficultyNode.classList.add(questionData.difficulty);
        if (questionData.type === 'multiple') {
            multipleAnswersNode.classList.add('active');
            tfAnswersNode.classList.remove('active');
            for (let i = 0; i < answers.length; i++) {
                mAnswersNodes[i].querySelector('.answer-text').innerHTML = answers[i].answer;
                mAnswersNodes[i].dataset.correct = answers[i].correct;
            }
        } else if (questionData.type === 'boolean') {
            tfAnswersNode.classList.add('active');
            multipleAnswersNode.classList.remove('active');
            for (let i = 0; i < answers.length; i++) {
                if (answers[i].answer === 'True') {
                    trueAnswerNode.dataset.correct = answers[i].correct;
                } else if (answers[i].answer === 'False') {
                    falseAnswerNode.dataset.correct = answers[i].correct;
                }
            }
        }
    } catch (error) {
        console.log(error);
        questionNode.innerHTML = 'Error loading the question';
    }
}

export { newQuestion };