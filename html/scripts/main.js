const pages = [
	"index.html",
	"theory.html",
	"structure.html",
	"simulation.html",
	"simulation.html",
	"knowledgeBase.html",
	"contacts.html",
]

function OnNextButtonPushed() {
	const path = window.location.pathname;
	const page = path.split("/").pop();
	let idx = 0;
	for (let i = 0; i < pages.length; i++) {
		console.log(pages[i], page);
		if (pages[i] == page) {
			idx = i + 1;
			break;
		}
	}
	if (idx > pages.length - 1) {
		idx = 0;
	}
	window.open(pages[idx], "_self");
}


let answer;
let question;

document.addEventListener("DOMContentLoaded", () => {
	answer = document.getElementById("answer");
	question = document.getElementById("question");
})

function FindAnswer() {
	answer.innerHTML = window.getAnswer(question.value);
}