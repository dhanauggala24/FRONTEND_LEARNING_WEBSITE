// Global state management
let progress = {
    html: { status: 'not-started', score: null, attempts: 0 },
    css: { status: 'locked', score: null, attempts: 0 },
    javascript: { status: 'locked', score: null, attempts: 0 },
    certificate: { status: 'locked' }
};

let currentExam = null;
let currentAnswers = {};

// Load progress from localStorage
function loadProgress() {
    const saved = localStorage.getItem('learningProgress');
    if (saved) {
        progress = JSON.parse(saved);
        updateUI();
    }
}

// Save progress to localStorage
function saveProgress() {
    localStorage.setItem('learningProgress', JSON.stringify(progress));
    updateUI();
}

// Update UI based on progress
function updateUI() {
    // Update main page status boxes
    const htmlStatus = document.getElementById('html-status');
    const cssStatus = document.getElementById('css-status');
    const jsStatus = document.getElementById('javascript-status');
    const certStatus = document.getElementById('certificate-status');

    if (htmlStatus) updateStatusBox(htmlStatus, progress.html);
    if (cssStatus) updateStatusBox(cssStatus, progress.css);
    if (jsStatus) updateStatusBox(jsStatus, progress.javascript);
    if (certStatus) updateStatusBox(certStatus, progress.certificate);
}

function updateStatusBox(element, courseProgress) {
    element.className = 'status';
    
    if (courseProgress.status === 'completed') {
        element.textContent = 'Completed';
        element.classList.add('completed');
    } else if (courseProgress.status === 'in-progress') {
        element.textContent = 'In Progress';
        element.classList.add('in-progress');
    } else if (courseProgress.status === 'locked') {
        element.textContent = 'Locked';
        element.classList.add('locked');
    } else {
        element.textContent = 'Not Started';
        element.classList.add('not-started');
    }
}

// Navigation functions
function goHome() {
    window.location.href = 'index.html';
}

function goBack() {
    window.history.back();
}

function goToCourse(course) {
    if (progress[course].status === 'locked') {
        alert('This course is locked! Please complete the previous courses first.');
        return;
    }
    
    window.location.href = `${course}-course.html`;
}

function goToCertificate() {
    if (progress.certificate.status === 'locked') {
        alert('Certificate is locked! Please complete all courses first.');
        return;
    }
    
    window.location.href = 'certificate.html';
}

function startExam(course) {
    currentExam = course;
    currentAnswers = {};
    window.location.href = `exam.html?course=${course}`;
}

// Exam questions database
const examQuestions = {
    html: [
        {
            question: "What does HTML stand for?",
            options: [
                "Hyper Text Markup Language",
                "High Tech Modern Language",
                "Home Tool Markup Language",
                "Hyperlinks and Text Markup Language"
            ],
            correct: 0
        },
        {
            question: "Which HTML tag is used for the largest heading?",
            options: ["<h6>", "<heading>", "<h1>", "<head>"],
            correct: 2
        },
        {
            question: "Which HTML attribute is used to define inline styles?",
            options: ["style", "class", "font", "styles"],
            correct: 0
        },
        {
            question: "Which HTML tag is used to create a hyperlink?",
            options: ["<link>", "<a>", "<href>", "<hyperlink>"],
            correct: 1
        },
        {
            question: "Which HTML element is used to specify a footer for a document?",
            options: ["<section>", "<bottom>", "<footer>", "<div>"],
            correct: 2
        },
        {
            question: "Which HTML attribute specifies an alternate text for an image?",
            options: ["src", "alt", "title", "href"],
            correct: 1
        },
        {
            question: "Which HTML tag is used to define an unordered list?",
            options: ["<ol>", "<ul>", "<list>", "<dl>"],
            correct: 1
        },
        {
            question: "Which HTML element is used for the root element?",
            options: ["<body>", "<root>", "<html>", "<head>"],
            correct: 2
        },
        {
            question: "Which HTML tag is used to create a line break?",
            options: ["<break>", "<lb>", "<br>", "<newline>"],
            correct: 2
        },
        {
            question: "Which HTML attribute is used to define the character encoding?",
            options: ["charset", "encoding", "character-set", "code"],
            correct: 0
        }
    ],
    css: [
        {
            question: "What does CSS stand for?",
            options: [
                "Computer Style Sheets",
                "Creative Style Sheets",
                "Cascading Style Sheets",
                "Colorful Style Sheets"
            ],
            correct: 2
        },
        {
            question: "Which CSS property is used to change the text color?",
            options: ["text-color", "font-color", "color", "text-style"],
            correct: 2
        },
        {
            question: "Which CSS property is used to change the background color?",
            options: ["bgcolor", "background-color", "color", "background"],
            correct: 1
        },
        {
            question: "Which CSS property controls the text size?",
            options: ["text-size", "font-size", "size", "text-style"],
            correct: 1
        },
        {
            question: "Which CSS property is used to create space around elements?",
            options: ["spacing", "margin", "padding", "space"],
            correct: 1
        },
        {
            question: "Which CSS property is used to create space inside elements?",
            options: ["margin", "spacing", "padding", "inner-space"],
            correct: 2
        },
        {
            question: "Which CSS display property makes an element take up the full width?",
            options: ["inline", "block", "inline-block", "flex"],
            correct: 1
        },
        {
            question: "Which CSS property is used to center text?",
            options: ["text-align", "align-text", "center", "text-center"],
            correct: 0
        },
        {
            question: "Which CSS property is used to make text bold?",
            options: ["text-bold", "font-weight", "weight", "bold"],
            correct: 1
        },
        {
            question: "Which CSS property is used to add shadows to text?",
            options: ["text-shadow", "shadow", "font-shadow", "text-effect"],
            correct: 0
        }
    ],
    javascript: [
        {
            question: "What is the correct JavaScript syntax to change the content of an HTML element?",
            options: [
                "document.getElement('p').innerHTML = 'Hello';",
                "document.getElementById('p').innerHTML = 'Hello';",
                "#p.innerHTML = 'Hello';",
                "document.getElementByName('p').innerHTML = 'Hello';"
            ],
            correct: 1
        },
        {
            question: "How do you create a function in JavaScript?",
            options: [
                "function = myFunction() {}",
                "function myFunction() {}",
                "function:myFunction() {}",
                "create myFunction() {}"
            ],
            correct: 1
        },
        {
            question: "How do you call a function named 'myFunction'?",
            options: [
                "call myFunction()",
                "call function myFunction()",
                "myFunction()",
                "execute myFunction()"
            ],
            correct: 2
        },
        {
            question: "How do you write a comment in JavaScript?",
            options: ["// Comment", "<!-- Comment -->", "# Comment", "/* Comment */"],
            correct: 0
        },
        {
            question: "What is the correct way to write a JavaScript array?",
            options: [
                "var colors = 'red', 'green', 'blue'",
                "var colors = ['red', 'green', 'blue']",
                "var colors = (1:'red', 2:'green', 3:'blue')",
                "var colors = 1 = ('red'), 2 = ('green'), 3 = ('blue')"
            ],
            correct: 1
        },
        {
            question: "Which operator is used to assign a value to a variable?",
            options: ["=", "-", "*", "x"],
            correct: 0
        },
        {
            question: "What is the correct way to write a JavaScript object?",
            options: [
                "var person = {firstName:'John', lastName:'Doe'}",
                "var person = (firstName:'John', lastName:'Doe')",
                "var person = {firstName = 'John', lastName = 'Doe'}",
                "var person = [firstName:'John', lastName:'Doe']"
            ],
            correct: 0
        },
        {
            question: "Which method is used to add an element to the end of an array?",
            options: ["push()", "pop()", "shift()", "unshift()"],
            correct: 0
        },
        {
            question: "Which keyword is used to declare a constant in JavaScript?",
            options: ["const", "var", "let", "constant"],
            correct: 0
        },
        {
            question: "What is the result of 3 + 3 + '3'?",
            options: ["33", "36", "63", "9"],
            correct: 0
        }
    ]
};

// Load exam questions
function loadExamQuestions() {
    const urlParams = new URLSearchParams(window.location.search);
    const course = urlParams.get('course');
    
    if (!course || !examQuestions[course]) {
        console.error('Invalid course specified');
        return;
    }
    
    currentExam = course;
    const questions = examQuestions[course];
    const container = document.getElementById('questions-container');
    const titleElement = document.getElementById('exam-title');
    
    titleElement.textContent = `${course.charAt(0).toUpperCase() + course.slice(1)} Exam`;
    document.getElementById('total-questions').textContent = questions.length;
    
    container.innerHTML = '';
    
    questions.forEach((q, index) => {
        const questionDiv = document.createElement('div');
        questionDiv.className = 'question';
        questionDiv.innerHTML = `
            <h3>Question ${index + 1}: ${q.question}</h3>
            <div class="question-options">
                ${q.options.map((option, optIndex) => `
                    <label>
                        <input type="radio" name="question${index}" value="${optIndex}" required>
                        ${option}
                    </label>
                `).join('')}
            </div>
        `;
        container.appendChild(questionDiv);
    });
}

// Submit exam
function submitExam(event) {
    event.preventDefault();
    
    const questions = examQuestions[currentExam];
    let correct = 0;
    
    questions.forEach((q, index) => {
        const selected = document.querySelector(`input[name="question${index}"]:checked`);
        if (selected && parseInt(selected.value) === q.correct) {
            correct++;
        }
    });
    
    const score = (correct / questions.length) * 100;
    const passed = score >= 70;
    
    // Update progress
    progress[currentExam].score = score;
    progress[currentExam].attempts++;
    
    if (passed) {
        progress[currentExam].status = 'completed';
        
        // Unlock next course
        if (currentExam === 'html') {
            progress.css.status = 'not-started';
        } else if (currentExam === 'css') {
            progress.javascript.status = 'not-started';
        } else if (currentExam === 'javascript') {
            progress.certificate.status = 'not-started';
        }
    } else {
        progress[currentExam].status = 'in-progress';
    }
    
    saveProgress();
    
    // Redirect to result page
    window.location.href = `result.html?course=${currentExam}&score=${score}&passed=${passed}`;
}

// Load result page
function loadResult() {
    const urlParams = new URLSearchParams(window.location.search);
    const course = urlParams.get('course');
    const score = parseFloat(urlParams.get('score'));
    const passed = urlParams.get('passed') === 'true';
    
    const container = document.getElementById('result-content');
    const actionsContainer = document.getElementById('result-actions');
    
    if (passed) {
        container.innerHTML = `
            <div class="pass">
                <h2>🎉 Congratulations!</h2>
                <p>You have passed the ${course.charAt(0).toUpperCase() + course.slice(1)} exam!</p>
                <div class="score-display">${score.toFixed(1)}%</div>
                <p>You can now proceed to the next course.</p>
            </div>
        `;
        
        let nextButton = '';
        if (course === 'html') {
            nextButton = '<button onclick="window.location.href=\'css-course.html\'">Go to CSS Course</button>';
        } else if (course === 'css') {
            nextButton = '<button onclick="window.location.href=\'javascript-course.html\'">Go to JavaScript Course</button>';
        } else if (course === 'javascript') {
            nextButton = '<button onclick="window.location.href=\'certificate.html\'">Get Certificate</button>';
        }
        
        actionsContainer.innerHTML = `
            ${nextButton}
            <button onclick="goHome()">Back to Home</button>
        `;
    } else {
        container.innerHTML = `
            <div class="fail">
                <h2>😔 Not Quite There Yet</h2>
                <p>You didn't pass the ${course.charAt(0).toUpperCase() + course.slice(1)} exam this time.</p>
                <div class="score-display">${score.toFixed(1)}%</div>
                <p>You need at least 70% to pass. Review the material and try again!</p>
            </div>
        `;
        
        actionsContainer.innerHTML = `
            <button onclick="window.location.href='${course}-course.html'">Review Course</button>
            <button onclick="startExam('${course}')">Retake Exam</button>
            <button onclick="goHome()">Back to Home</button>
        `;
    }
}

// Load certificate
function loadCertificate() {
    const container = document.getElementById('certificate-content');
    const date = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    
    container.innerHTML = `
        <div class="certificate">
            <h2>Certificate of Completion</h2>
            <h3>Frontend Web Development</h3>
            <div class="certificate-content">
                <p>This is to certify that</p>
                <div class="certificate-name">Student</div>
                <p>has successfully completed the comprehensive Frontend Web Development course, demonstrating proficiency in:</p>
                <p>HTML5, CSS3, and JavaScript</p>
                <p>with excellent understanding of modern web development principles and best practices.</p>
            </div>
            <div class="certificate-date">Awarded on ${date}</div>
            <div class="certificate-signature">
                <div class="signature">
                    <div class="signature-line"></div>
                    <div class="signature-text">Course Instructor</div>
                </div>
                <div class="signature">
                    <div class="signature-line"></div>
                    <div class="signature-text">Date</div>
                </div>
            </div>
        </div>
        <div style="text-align: center; margin-top: 2rem;">
            <button onclick="window.print()" class="exam-btn">Print Certificate</button>
        </div>
    `;
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    loadProgress();
    
    // Check current page and load appropriate content
    if (window.location.pathname.includes('exam.html')) {
        loadExamQuestions();
    } else if (window.location.pathname.includes('result.html')) {
        loadResult();
    } else if (window.location.pathname.includes('certificate.html')) {
        loadCertificate();
    }
});