import { getAllCategories, setCategory, setDifficulty, setType } from "./call-handler.js";
import { cancelCurrentQuestion } from "./answer-handler.js";

let optionsButton = document.querySelector('.options-button');
let optionsModal = document.querySelector('.options.modal-background');
let applyButton = document.querySelector('.apply-options-button');
let optionsForm = document.querySelector('.options-form');
let categorySelect = document.querySelector('.category-select');

createCategorySelect();

optionsButton.addEventListener('click', (event) => {
    optionsModal.classList.add('active');
});

applyButton.addEventListener('click', (event) => {
    let formData = new FormData(optionsForm);
    for (let [name, value] of formData) {
        switch (name) {
            case 'difficulty':
                setDifficulty(value);
                break;
            case 'type':
                setType(value);
                break;
            case 'category':
                setCategory(value);
                break;
            default:
                break;
        }
        console.log(`${name}: ${value}`);
    }
    cancelCurrentQuestion();
    optionsModal.classList.remove('active');
});

async function createCategorySelect() {
    let categoriesList = await getAllCategories();
    let borrar = "";
    categoriesList.forEach(category => {
        let optionNode = document.createElement('option');
        optionNode.value = category.id;
        let categoryName = category.name.includes(":") ? category.name.split(':')[1].trim() : category.name;
        borrar += `.${categoryName.toLowerCase().replaceAll(' ', '-').replaceAll('&', 'and')}`;
        optionNode.innerHTML = categoryName;
        categorySelect.appendChild(optionNode);
    });
    console.log(borrar)
}