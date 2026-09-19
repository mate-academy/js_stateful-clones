# 🧪 QA Automation Portfolio: Stateful Clones & Unit Testing

> About this repository: This project demonstrates unit testing and algorithm validation using Jest for a JavaScript application dealing with state transformation and cloning[cite: 21]. It also highlights a modern "Shift-Left" QA approach through extensive static code analysis and Continuous Integration (CI/CD)[cite: 21].

![Jest](https://img.shields.io/badge/Jest-C21325?style=for-the-badge&logo=jest&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![GitHub Actions](https://img.shields.io/badge/GitHub_Actions-2088FF?style=for-the-badge&logo=github-actions&logoColor=white)
![Static Analysis](https://img.shields.io/badge/Static_Analysis-4B32C3?style=for-the-badge&logo=eslint&logoColor=white)

## 🎯 Project Overview

This application is a Vanilla JavaScript implementation focused on state management, transformations, and handling cloned structures safely.

As a QA Automation / Software Testing Engineer, my focus in this repository is to validate core transformation logic, ensure immutability, and prevent unintended side effects through comprehensive unit testing.

## 🛠️ QA Tech Stack & Tools

* **Unit Testing:** Jest (`src/transformStateWithClones.test.js`)[cite: 21]
* **CI/CD Pipeline:** GitHub Actions (Automated test execution on push/PR)[cite: 21]
* **Static Code Analysis (Shift-Left QA):** ESLint, Prettier[cite: 21]
* **Core Technologies:** Vanilla JS (ES6+)[cite: 21]

## 📊 Test Strategy & Coverage

### 1. Unit Testing (Jest)
Located in `src/transformStateWithClones.test.js`, the unit test suite verifies[cite: 21]:
* Correct state transformations and deep cloning behaviors.
* Protection against reference mutations and side effects.
* Edge cases, empty states, and complex nested objects.

### 2. Continuous Integration (CI/CD)
The project utilizes GitHub Actions (`.github/workflows/test.yml`) to enforce quality gates[cite: 21]. Every commit automatically triggers a pipeline that:
* Lints the code files to catch syntax and formatting issues early[cite: 21].
* Runs the Jest unit test suite in a headless environment[cite: 21].

## 🚀 How to Run the Tests Locally

To evaluate the test scripts and static analysis tools on your local machine, follow these steps:

### 1. Environment Setup
Clone the repository and install the Node.js dependencies:
```bash
npm install
