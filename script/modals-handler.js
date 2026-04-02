let lvlUpModal = document.querySelector('.lvl-up.modal-background');
let optionsModal = document.querySelector('.options.modal-background');

lvlUpModal.addEventListener('click', (event) => {
    if (event.target.closest('.continue-button') || !event.target.closest('.modal')) {
        lvlUpModal.classList.remove('active');
    }
});

optionsModal.addEventListener('click', (event) => {
    if (event.target.closest('.cancel-button') || !event.target.closest('.modal')) {
        optionsModal.classList.remove('active');
    }
});