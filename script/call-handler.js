async function getQuestion(category = null, difficulty = null, type = null) {
    try {
        const response = await fetch('https://opentdb.com/api.php?amount=1');
        const data = await response.json();
        const result = data.results[0];
        console.log(result);
        return result;
    } catch (error) {
        console.log(error);
    }
}

export {getQuestion};