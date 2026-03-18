document.querySelector('.answers-box').addEventListener('click', (event) => {
    let answerNode;
    if (answerNode = event.target.closest('.answer-box')) {
        if (answerNode.dataset.correct === 'true') {
            alert('Correcto! ^_^');
        } else {
            alert('Incorrecto :(');
        }
    }
});