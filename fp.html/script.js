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
                "High Text Machine Language",
                "Hyper Transfer Markup Language",
                "Hyper Tool Multi Language"
            ],
            correct: 0
        },
        {
            question: "Which tag is used to create a paragraph in HTML?",
            options: ["<h1>", "<p>", "<br>", "<div>"],
            correct: 1
        },
        {
            question: "Which tag is used to insert a line break?",
            options: ["<lb>", "<break>", "<br>", "<hr>"],
            correct: 2
        },
        {
            question: "Which HTML tag is used for the largest heading?",
            options: ["<heading>", "<h6>", "<head>", "<h1>"],
            correct: 3
        },
        {
            question: "Which tag is used to create a hyperlink?",
            options: ["<link>", "<a>", "<href>", "<hyper>"],
            correct: 1
        },
        {
            question: "Which attribute is used in <a> tag to specify the link address?",
            options: ["src", "link", "href", "path"],
            correct: 2
        },
        {
            question: "Which tag is used to insert an image in HTML?",
            options: ["<picture>", "<img>", "<image>", "<src>"],
            correct: 1
        },
        {
            question: "Which attribute is used in <img> tag to specify image path?",
            options: ["href", "alt", "src", "path"],
            correct: 2
        },
        {
            question: "Which tag is used to create an unordered list?",
            options: ["<ol>", "<ul>", "<li>", "<list>"],
            correct: 1
        },
        {
            question: "Which tag is used to create an ordered list?",
            options: ["<ul>", "<ol>", "<li>", "<order>"],
            correct: 1
        },
        {
            question: "Which tag is used for a list item?",
            options: ["<li>", "<list>", "<item>", "<dl>"],
            correct: 0
        },
        {
            question: "Which section of HTML contains the page title?",
            options: ["<body>", "<footer>", "<head>", "<section>"],
            correct: 2
        },
        {
            question: "Which tag is used to make text bold in HTML?",
            options: ["<b>", "<bold>", "<stronger>", "<bl>"],
            correct: 0
        },
        {
            question: "Which tag is used to create a table row?",
            options: ["<td>", "<th>", "<tr>", "<table-row>"],
            correct: 2
        },
        {
            question: "Which tag is used to create a button in HTML?",
            options: ["<input>", "<btn>", "<button>", "<click>"],
            correct: 2
        }
    ],

    css: [
        {
            question: "What does CSS stand for?",
            options: ["Creative Style Sheets", "Cascading Style Sheets", "Computer Style Sheets", "Colorful Style Sheets"],
            correct: 1
        },
        {
            question: "Which property is used to change text color?",
            options: ["font-color", "text-color", "color", "text-style"],
            correct: 2
        },
        {
            question: "How do you select an element with id 'demo'?",
            options: [".demo", "#demo", "demo", "*demo"],
            correct: 1
        },
        {
            question: "How do you select elements with class 'test'?",
            options: ["#test", ".test", "test", "*test"],
            correct: 1
        },
        {
            question: "Which property controls text size?",
            options: ["text-size", "font-style", "font-size", "text-style"],
            correct: 2
        },
        {
            question: "How do you make text bold in CSS?",
            options: ["font-weight: bold;", "text-bold: true;", "style: bold;", "font: bold;"],
            correct: 0
        },
        {
            question: "Which property is used for background color?",
            options: ["color", "bg-color", "background-color", "background"],
            correct: 2
        },
        {
            question: "How do you center text?",
            options: ["text-align: center;", "align: center;", "center-text: true;", "text-center: yes;"],
            correct: 0
        },
        {
            question: "Which property adds space inside an element?",
            options: ["margin", "padding", "spacing", "border"],
            correct: 1
        },
        {
            question: "Which property adds space outside an element?",
            options: ["padding", "margin", "border", "space"],
            correct: 1
        },
        {
            question: "Which symbol is used for class selector?",
            options: ["#", ".", "*", "&"],
            correct: 1
        },
        {
            question: "Which property controls border?",
            options: ["border-style", "border", "line", "outline"],
            correct: 1
        },
        {
            question: "Which CSS is used for responsive design?",
            options: ["media queries", "animations", "selectors", "grids"],
            correct: 0
        },
        {
            question: "Which position value makes element fixed?",
            options: ["static", "relative", "absolute", "fixed"],
            correct: 3
        },
        {
            question: "Which property is used to change font?",
            options: ["font-family", "font-style", "font-weight", "text-font"],
            correct: 0
        }
    ],

    javascript: [
        {
            question: "JavaScript is a _ language.",
            options: ["Programming", "Markup", "Styling", "Database"],
            correct: 0
        },
        {
            question: "Which keyword is used to declare a variable?",
            options: ["var", "int", "string", "declare"],
            correct: 0
        },
        {
            question: "Which symbol is used for comments in JS (single line)?",
            options: ["<!-- -->", "//", "##", "**"],
            correct: 1
        },
        {
            question: "Which function is used to display output?",
            options: ["print()", "display()", "console.log()", "show()"],
            correct: 2
        },
        {
            question: "How do you write 'Hello' in alert box?",
            options: ["alertBox('Hello')", "msg('Hello')", "alert('Hello')", "display('Hello')"],
            correct: 2
        },
        {
            question: "Which operator is used for equality check (value only)?",
            options: ["==", "===", "=", "!="],
            correct: 0
        },
        {
            question: "Which event occurs when button is clicked?",
            options: ["onhover", "onclick", "onchange", "onmouse"],
            correct: 1
        },
        {
            question: "Which keyword is used for function?",
            options: ["func", "define", "function", "method"],
            correct: 2
        },
        {
            question: "Which loop is used in JS?",
            options: ["for", "while", "do-while", "All of the above"],
            correct: 3
        },
        {
            question: "Which data type is NOT in JS?",
            options: ["String", "Number", "Boolean", "Character"],
            correct: 3
        },
        {
            question: "How to declare constant variable?",
            options: ["const", "var", "let", "static"],
            correct: 0
        },
        {
            question: "Which method converts string to integer?",
            options: ["parseInt()", "toInt()", "int()", "convert()"],
            correct: 0
        },
        {
            question: "Which operator is used for addition?",
            options: ["+", "add", "sum", "&"],
            correct: 0
        },
        {
            question: "What is DOM?",
            options: ["Document Object Model", "Data Object Method", "Digital Output Mode", "Display Object Model"],
            correct: 0
        },
        {
            question: "Which method is used to select element by ID?",
            options: ["getElement()", "getElementById()", "selectId()", "findId()"],
            correct: 1
        }
    ]

};
function escapeHTML(str) {
    return str.replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
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
                        <span>${escapeHTML(option)}</span>
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