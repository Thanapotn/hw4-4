const quiz = {
    id: "uniqueID",
    questions: [
        { id: 1, text: "สัตว์เลี้ยงลูกด้วยนมคือ?", choices: ["ปลา", "นก", "สุนัข", "งู"], correct: "สุนัข" },
        { id: 2, text: "1 + 1 = ?", choices: ["1", "2", "3", "4"], correct: "2" },
        { id: 3, text: "สีของท้องฟ้าเป็นสีอะไร?", choices: ["แดง", "เขียว", "น้ำเงิน", "เหลือง"], correct: "น้ำเงิน" },
        { id: 4, text: "ประเทศที่มีประชากรมากที่สุด?", choices: ["จีน", "อินเดีย", "สหรัฐอเมริกา", "รัสเซีย"], correct: "จีน" },
        { id: 5, text: "ภาษาโปรแกรมใดใช้สร้างเว็บ?", choices: ["Python", "JavaScript", "C++", "Java"], correct: "JavaScript" }
    ],
    timeLimit: 60,
    passingScore: 60
};

let selectedQuestions = [];
let userAnswers = {};
let timer;

function startQuiz() {
    selectedQuestions = quiz.questions.sort(() => 0.5 - Math.random()).slice(0, 5);
    userAnswers = {};
    let timeRemaining = quiz.timeLimit;

    document.getElementById("quiz-container").innerHTML = generateQuizHTML(selectedQuestions);
    document.getElementById("timer").innerText = `เวลาที่เหลือ: ${timeRemaining} วินาที`;

    timer = setInterval(() => {
        timeRemaining--;
        document.getElementById("timer").innerText = `เวลาที่เหลือ: ${timeRemaining} วินาที`;
        if (timeRemaining <= 0) {
            clearInterval(timer);
            calculateScore();
        }
    }, 1000);
}

function generateQuizHTML(questions) {
    return questions.map(q => `
        <div class="question">
            <p>${q.text}</p>
            ${q.choices.map(choice => `
                <label>
                    <input type="radio" name="question-${q.id}" value="${choice}" onchange="submitAnswer(${q.id}, '${choice}')">
                    ${choice}
                </label>
            `).join('')}
        </div>
    `).join('') + '<button onclick="calculateScore()">ส่งคำตอบ</button>';
}

function submitAnswer(questionId, answer) {
    userAnswers[questionId] = answer;
}

function calculateScore() {
    clearInterval(timer);
    let correctCount = selectedQuestions.filter(q => userAnswers[q.id] === q.correct).length;
    let score = (correctCount / selectedQuestions.length) * 100;
    let resultText = score >= quiz.passingScore ? "ผ่าน" : "ไม่ผ่าน";

    let explanation = selectedQuestions.map(q => `
        <p>${q.text}<br>
        คำตอบที่ถูกต้อง: ${q.correct} (คุณตอบ: ${userAnswers[q.id] || "ไม่ได้ตอบ"})</p>
    `).join('');

    document.getElementById("quiz-container").innerHTML = `
        <h2>คะแนนของคุณ: ${score} (${resultText})</h2>
        ${explanation}
        <button onclick="startQuiz()">เริ่มทำข้อสอบใหม่</button>
    `;
}
