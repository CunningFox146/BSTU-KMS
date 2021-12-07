const DEFAULT_ERROR = "Сформулируйте свой вопрос иначе."
const TEMPLATES = [
	[
		[
			"как",
			"кушать",
			"пирок",
		],
		"Нужно кушать его ротиком"
	],
]

function getAnswer(question) {
	if (question === undefined) return DEFAULT_ERROR;

	let answer = DEFAULT_ERROR;
	let letters = question
		.toLowerCase()
		.replace(/[^a-zA-Zа-яА-Я ]/g, "")
		.split(' ');

	TEMPLATES.forEach((data) => {
		let template = data[0];
		let currentAnswer = data[1];

		letters.forEach((letter) => {
			if (!template.includes(letter)) return DEFAULT_ERROR;
		})

		answer = currentAnswer;
	});

	return answer;
}

window.getAnswer = getAnswer;