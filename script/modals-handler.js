let lvlUpModal = document.querySelector('.lvl-up.modal-background');
lvlUpModal.addEventListener('click', (event) => {
    if (event.target.closest('.continue-button') || !event.target.closest('.modal')) {
        lvlUpModal.classList.remove('active');
    }
});