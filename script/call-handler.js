let category = null;
let difficulty = null;
let type = null;

let maxRetries = 5;
let delay = 3000;

async function getQuestion(amount = 1) {
    let correctAnswer = false;
    //Example: https://opentdb.com/api.php?amount=10&category=11&difficulty=easy&type=multiple
    let apiURL = 'https://opentdb.com/api.php';
    apiURL += `?amount=${amount}`
    if (category) {
        apiURL += `&category=${category}`
    }
    if (difficulty) {
        apiURL += `&difficulty=${difficulty}`
    }
    if (type) {
        apiURL += `&type=${type}`
    }
    let attempt = 0;

    while (attempt < maxRetries) {
        try {
            const response = await fetch(apiURL);

            if (response.status === 429) {
                console.log(`429: Too many requests (attempt ${attempt + 1})`);
                attempt++;
                await new Promise(resolve => setTimeout(resolve, delay));
                continue;
            }

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            return data.results[0];

        } catch (error) {
            console.log(`Error: ${error.message}`);
            attempt++;

            if (attempt >= maxRetries) {
                throw new Error("Max retries reached");
            }

            await new Promise(resolve => setTimeout(resolve, delay));
        }
    }
}

async function getAllCategories() {
    try {
        const response = await fetch('https://opentdb.com/api_category.php');
        const data = await response.json();
        return data.trivia_categories;
    } catch (error) {
        console.log(error.message);
    }
}

function setCategory(newValue) {
    console.log(newValue);
    category = newValue == "" ? null : newValue;
}

function setDifficulty(newValue) {
    console.log(newValue);
    difficulty = newValue == "" ? null : newValue;
}

function setType(newValue) {
    console.log(newValue);
    type = newValue == "" ? null : newValue;
}

export { getQuestion, getAllCategories, setCategory, setDifficulty, setType };