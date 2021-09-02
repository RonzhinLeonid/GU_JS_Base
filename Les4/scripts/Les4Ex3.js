class QuestionObject {
    constructor(question, answer) {
        this.question = question;
        this.answer = answer;
    }
}

const player = {
    score: 0
};

const gameQuestion = [
    new QuestionObject("Вопрос №1", "1"),
    new QuestionObject("Вопрос №2", "2"),
    new QuestionObject("Вопрос №3", "3"),
    new QuestionObject("Вопрос №4", "4"),
    new QuestionObject("Вопрос №5", "5"),
    new QuestionObject("Вопрос №6", "6"),
    new QuestionObject("Вопрос №7", "7"),
    new QuestionObject("Вопрос №8", "8"),
    new QuestionObject("Вопрос №9", "9"),
    new QuestionObject("Вопрос №10", "10")
];

const getMessageForQuestion = (numberQuestion) => {
    return `Введите правильный ответ на вопрос:\n${gameQuestion[numberQuestion].question}`;
};

function getMessageCountAnswer(countAnswer) {
    switch (countAnswer) {
        case 0: return `Вопросы закончились.`;
        case 1: return `Остался ${gameQuestion.length} вопрос.`;
        case 2:
        case 3:
        case 4: return `Осталось ${gameQuestion.length} вопроса.`;
        default: return `Осталось ${gameQuestion.length} вопросов.`;
    }
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

console.log(gameQuestion[0].answer);
do {
    let numberQuestion = getRandomInt(gameQuestion.length);
    const stringMessageForQuestion = prompt(
        getMessageForQuestion(numberQuestion)
    );
    let stringResultForAnswer;
    if (stringMessageForQuestion !== gameQuestion[numberQuestion].answer) {
        stringResultForAnswer = "Ответ не верный.";
    } else {
        player.score++;
        stringResultForAnswer = `Верный ответ.`;
    }
    gameQuestion.splice(numberQuestion, 1);
    alert(`${stringResultForAnswer}\nВаш счет: ${player.score}.\n${getMessageCountAnswer(gameQuestion.length)}`);
} while (gameQuestion.length > 0)
