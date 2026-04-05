# 🏥 Medical Quiz Tool

An interactive web app for medical students and professionals to **convert board-style text questions into smart, self-grading quizzes with explanations**.  
Simply paste your MCQ (including case, options, answer, and distractor analysis), and use the app to learn and review efficiently!

---

## 🚀 Features

- **Paste-and-Play**: Paste questions in a standardized format (case, options A-D, explanations, distractor analysis)
- **Intelligent Parser**: Automatically detects all fields from question text
- **Instant Feedback**: Click to select your answer, get immediate color-coded results
- **Explanations**: Shows the correct answer, senior consultant’s explanation, and distractor analysis
- **Score Tracking**: Keeps count of your correct and total responses
- **Modern UI**: Mobile-friendly, responsive, and clean interface

---

## 🌐 Live App

Access the deployed app here:  
[https://neo-nayan.github.io/medical-quiz-tool/](https://neo-nayan.github.io/medical-quiz-tool/)

---

## 🧑‍💻 Usage

1. **Paste your question** (in the required format) into the textarea on the main page.
2. **Click "Load Question"** to parse and display the interactive quiz.
3. **Select your answer** and instantly see if you were right or wrong, with full explanations and distractor analysis.
4. **Repeat** with new questions to practice and master board-style MCQs.

---

## 📝 Example Question Format

```
Question 13
A 30-year-old woman is found to have a 1 cm solitary thyroid nodule. FNAC confirms papillary carcinoma. Which of the following features is most characteristic of this tumour's histological appearance?
A. Sheets of small cells with a very high nuclear-to-cytoplasmic ratio.
B. Cells with clear "Orphan Annie" nuclei and distinctive nuclear grooves.
C. Nests of polyhedral cells separated by a dense stroma of amyloid.
D. Uniform follicles containing colloid with evidence of vascular invasion.
Correct Answer: B. Cells with clear "Orphan Annie" nuclei and distinctive nuclear grooves.
Senior Consultant's Explanation: Papillary carcinoma has very distinctive cytological and histological features: nuclear inclusions and grooves, and "Orphan Annie" eye nuclei (clear nuclei). These are so characteristic that a definitive diagnosis of papillary cancer can be made on FNAC alone, unlike follicular cancer.
Distractor Analysis:
A. Sheets of small cells with a very high nuclear-to-cytoplasmic ratio.: Characteristic of anaplastic carcinoma or lymphoma.
C. Nests of polyhedral cells separated by a dense stroma of amyloid.: Pathognomonic for Medullary Thyroid Carcinoma.
D. Uniform follicles containing colloid with evidence of vascular invasion.: Describes follicular carcinoma, not papillary cancer.
```

---

## 📦 Project Structure

```
/
├── index.html      # Main app interface
├── styles.css      # App styling
├── script.js       # Quiz and parser logic
└── README.md       # Project documentation
```

---

## 🛠️ Contributing

PRs and suggestions are welcome! Please open an issue to propose changes or add features.

---

## 📄 License

MIT License

---

**Made for smart, self-testing medical education. Good luck on your boards!**
