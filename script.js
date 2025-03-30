const questions = [
  {
    question: "What is the capital of France?",
    choices: ["Paris", "London", "Berlin", "Madrid"],
    answer: "Paris",
  },
  {
    question: "What is the highest mountain in the world?",
    choices: ["Everest", "Kilimanjaro", "Denali", "Matterhorn"],
    answer: "Everest",
  },
  {
    question: "What is the largest country by area?",
    choices: ["Russia", "China", "Canada", "United States"],
    answer: "Russia",
  },
  {
    question: "Which is the largest planet in our solar system?",
    choices: ["Earth", "Jupiter", "Mars"],
    answer: "Jupiter",
  },
  {
    question: "What is the capital of Canada?",
    choices: ["Toronto", "Montreal", "Vancouver", "Ottawa"],
    answer: "Ottawa",
  },
];

let userAnswers = [];
let questionsElement = document.getElementById("questions");
const submitBtn = document.querySelector("#submit");


let progress = JSON.parse(sessionStorage.getItem("progress")) || {};


function renderQuestions() {
  questionsElement.innerHTML = ""; // Clear previous content
  for (let i = 0; i < questions.length; i++) {
    const question = questions[i];
    const questionElement = document.createElement("div");

    const p = document.createElement("p");
    p.textContent = question.question;
    questionElement.appendChild(p);

    for (let j = 0; j < question.choices.length; j++) {
      const choice = question.choices[j];

      const choiceElement = document.createElement("input");
      choiceElement.setAttribute("type", "radio");
      choiceElement.setAttribute("name", `question-${i}`);
      choiceElement.setAttribute("value", choice);

		
      if (userAnswers[i] === choice) {
        choiceElement.checked = true;
      }

      const label = document.createElement("label");
      label.appendChild(choiceElement);
      label.appendChild(document.createTextNode(choice));

      questionElement.appendChild(label);
    }

    questionsElement.appendChild(questionElement);
  }
	
  attachListeners();
}


function attachListeners() {
  document.querySelectorAll("input[type='radio']").forEach((input) => {
    input.addEventListener("change", (event) => {
      let questionText = event.target.closest("div").querySelector("p").innerText;
      progress[questionText] = event.target.value;
      sessionStorage.setItem("progress", JSON.stringify(progress));
    });
  });
}


submitBtn.addEventListener("click", () => {
  let score = 0;
  userAnswers = [];
	
  document.querySelectorAll("input[type='radio']:checked").forEach((input) => {
    userAnswers.push(input.value);
  });

	setTimeout(()=>{
		questions.forEach((question)=>{
		if(progress[question.question] === question.answer){
			score++;
		}
	})

	document.getElementById("score").textContent = score;
	
	}, 1000);
	localStorage.setItem("score", score);
});


renderQuestions();
