let currentQuestion = {};
let score = 0;
let totalAnswered = 0;
let selectedAnswer = null;

function loadQuestion() {
    const input = document.getElementById('questionInput').value.trim();
    if (!input) {
        alert('Please paste a question first!');
        return;
    }
    try {
        currentQuestion = parseQuestion(input);
        displayQuestion();
        selectedAnswer = null;
    } catch (error) {
        alert('Error parsing question. Please ensure it follows the correct format.\n\nError: ' + error.message);
    }
}

function parseQuestion(text) {
    const question = {};
    const numberMatch = text.match(/Question\s+(\d+)/i);
    question.number = numberMatch ? numberMatch[1] : 'N/A';
    const caseMatch = text.match(/Question\s+\d+\s*([\s\S]*?)(?=\s*[A-D][.]\s)/i);
    question.caseDescription = caseMatch ? caseMatch[1].trim() : '';
    const lines = text.split('\n');
    let questionText = '';
    let foundFirstOption = false;
    let optionsStartIdx = 0;
    for (let i = 0; i < lines.length; i++) {
        if (lines[i].match(/^\s*[A-D][.]\s/)) {
            foundFirstOption = true;
            optionsStartIdx = i;
            break;
        }
        if (lines[i].match(/Question\s+\d+/i)) continue;
        if (lines[i].trim() && !foundFirstOption) {
            questionText += lines[i] + '\n';
        }
    }
    question.questionText = questionText.replace(question.caseDescription, '').trim();
    question.options = {};
    const optionLetters = ['A', 'B', 'C', 'D'];
    for (let i = 0; i < optionLetters.length; i++) {
        const letter = optionLetters[i];
        const regex = new RegExp(`^\\s*${letter}[.][\\s\\S]*?(?=^\\s*[${optionLetters.slice(i + 1).join('')}][.]|Correct Answer:|$)`, 'mi');
        const match = text.match(regex);
        if (match) {
            question.options[letter] = match[0]
                .replace(new RegExp(`^\\s*${letter}[.][\\s*]`), '')
                .replace(/\n$/, '')
                .trim();
        }
    }
    const correctMatch = text.match(/Correct\s+Answer:\s*([A-D])[.]\s*([\s\S]*?)(?=Senior Consultant|Distractor|$)/i);
    if (correctMatch) {
        question.correctAnswer = correctMatch[1];
        question.correctExplanation = correctMatch[2].trim();
    }
    const seniorMatch = text.match(/Senior\s+Consultant['’]?[sS]?\s+Explanation:\s*([\s\S]*?)(?=Distractor\s+Analysis:|$)/i);
    question.seniorExplanation = seniorMatch ? seniorMatch[1].trim() : '';
    question.distractorAnalysis = {};
    const distractorMatch = text.match(/Distractor\s+Analysis:([\s\S]*?)$/i);
    if (distractorMatch) {
        const distractorText = distractorMatch[1];
        for (const letter of optionLetters) {
            const distractorRegex = new RegExp(`^\\s*${letter}[.][\\s\\S]*?(?=^\\s*[${optionLetters.filter(l => l !== letter).join('')}][.]|$)`, 'mi');
            const match = distractorText.match(distractorRegex);
            if (match) {
                question.distractorAnalysis[letter] = match[0]
                    .replace(new RegExp(`^\\s*${letter}[.]\\s*`), '')
                    .trim();
            }
        }
    }
    return question;
}

function displayQuestion() {
    const container = document.getElementById('quizContainer');
    if (!currentQuestion.questionText) {
        container.innerHTML = '<p style="color: red; padding: 20px;">Could not parse question. Please check format.</p>';
        return;
    }
    let html = '<div class="quiz-section"><div class="question-card">';
    html += '<div class="question-header">';
    html += `<div class="question-number">Question ${currentQuestion.number}</div>`;
    html += `<div class="score">Score: ${score}/${totalAnswered || 0}</div>`;
    html += '</div>';
    if (currentQuestion.caseDescription) {
        html += `<div class="case-description">${escapeHtml(currentQuestion.caseDescription)}</div>`;
    }
    html += `<div class="question-text">${escapeHtml(currentQuestion.questionText)}</div>`;
    html += '<div class="options-container">';
    for (const letter of ['A', 'B', 'C', 'D']) {
        if (currentQuestion.options[letter]) {
            const isCorrect = letter === currentQuestion.correctAnswer;
            const isSelected = letter === selectedAnswer;
            let btnClass = 'option-btn';
            let disabled = selectedAnswer !== null;
            if (selectedAnswer !== null) {
                if (isCorrect) {
                    btnClass += ' correct';
                } else if (isSelected && !isCorrect) {
                    btnClass += ' incorrect';
                }
            } else if (isSelected) {
                btnClass += ' selected';
            }
            html += `<button class="${btnClass}" ${disabled ? 'disabled' : ''} onclick="selectAnswer('${letter}')">
                <strong>${letter}.</strong> ${escapeHtml(currentQuestion.options[letter])}
            </button>`;
        }
    }
    html += '</div>';
    if (selectedAnswer !== null) {
        const isCorrect = selectedAnswer === currentQuestion.correctAnswer;
        html += `<div class="result-feedback ${isCorrect ? 'correct' : 'incorrect'}">
            ${isCorrect ? '✅ Correct!' : '❌ Incorrect - The correct answer is ' + currentQuestion.correctAnswer}
        </div>`;
        html += '<div class="explanation-section">';
        html += '<h3>📖 Correct Answer Explanation</h3>';
        html += `<div>${escapeHtml(currentQuestion.correctExplanation)}</div>`;
        if (currentQuestion.seniorExplanation) {
            html += '<h3>👨‍⚕️ Senior Consultant\'s Explanation</h3>';
            html += `<div>${escapeHtml(currentQuestion.seniorExplanation)}</div>`;
        }
        html += '<h3>🔍 Distractor Analysis</h3>';
        for (const letter of ['A', 'B', 'C', 'D']) {
            if (currentQuestion.distractorAnalysis[letter]) {
                html += `<h4 style="color: #555; margin-top: 15px;">${letter}. ${escapeHtml(currentQuestion.options[letter].substring(0, 50))}...</h4>`;
                html += `<div>${escapeHtml(currentQuestion.distractorAnalysis[letter])}</div>`;
            }
        }
        html += '</div>';
        html += '<div class="action-buttons">';
        html += '<button class="btn-primary" onclick="loadQuestion()">Load Next Question</button>';
        html += '<button class="btn-secondary" onclick="clearAll()">Start Over</button>';
        html += '</div>';
    }
    html += '</div></div>';
    container.innerHTML = html;
}

function selectAnswer(letter) {
    selectedAnswer = letter;
    totalAnswered++;
    if (letter === currentQuestion.correctAnswer) {
        score++;
    }
    displayQuestion();
}

function clearAll() {
    document.getElementById('questionInput').value = '';
    document.getElementById('quizContainer').innerHTML = '';
    currentQuestion = {};
    selectedAnswer = null;
    score = 0;
    totalAnswered = 0;
}

function escapeHtml(text) {
    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '\"': '&quot;',
        "'": '&#039;'
   
