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
        const data = await response.json();
        const result = data.results[0];
        console.log(result);
        return result;
    } catch (error) {
        console.log(error);
    }
}

export {getQuestion};