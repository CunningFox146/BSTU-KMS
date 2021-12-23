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

let voices = window.speechSynthesis.getVoices();
let rusVoice = voices[20];

function FindAnswer() {
	let answerText = window.getAnswer(question.value);
	let msg = new SpeechSynthesisUtterance();
	msg.lang = "ru-RU";
	msg.voice = rusVoice;
	msg.text = answerText;

	window.speechSynthesis.speak(msg);
	answer.innerHTML = answerText;
}