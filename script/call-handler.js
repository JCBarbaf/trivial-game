async function getQuestion(amount = 1, category = null, difficulty = null, type = null) {
    //Example: https://opentdb.com/api.php?amount=10&category=11&difficulty=easy&type=multiple
    let apiURL = 'https://opentdb.com/api.php';
    apiURL += `?amount=${amount}`
    try {
        if (category) {
            apiURL += `&category=${category}`
        }
        if (difficulty) {
            apiURL += `&difficulty=${difficulty}`
        }
        if (type) {
            apiURL += `&type=${type}`
        }
        const response = await fetch(apiURL);

        if (response.status === 429) {
            console.log('429: Too many requests');
            await delay(2000);
            getQuestion();
        }

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        const result = data.results[0];
        return result;
    } catch (error) {
        console.log(error);
    }
}

export {getQuestion};