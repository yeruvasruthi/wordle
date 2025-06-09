# 🎯 Wordle Clone — React.js Web App

A fully responsive and mobile-friendly Wordle game built with **React.js**. This clone includes real-time letter feedback, a dictionary-powered hint system, dark/light theme toggle, and local win/loss tracking.

> [Play the Live Game Here](https://famous-quokka-f2bfd4.netlify.app)

---

## 🧩 Features

- 🎲 **Random Word Selection**: Each game picks a 5-letter word from a large dataset.
- 📖 **Dictionary API Integration**: Uses [dictionaryapi.dev](https://dictionaryapi.dev) to fetch real definitions as hints.
- **Smart Hint System**:
  - Unlocks after the first wrong guess.
  - Shows actual meaning if available.
  - Fallback: _"The word starts with ‘X’ and ends with ‘Y’"_, if no definition is found.
- 🎨 **Light & Dark Modes**: Switch themes anytime.
- 📱 **Mobile Friendly**: Hidden input ensures keyboard works seamlessly on mobile.
- 🎉 **Confetti Celebration**: On correct guess.
- 📊 **Scoreboard**: Tracks wins and losses using `localStorage`.
- 🔄 **New Game Button**: Instantly resets the board and picks a new word.

---

## 📷 Screenshots

### 🕶️ Dark Mode
<img width="1165" alt="Dark mode" src="https://github.com/user-attachments/assets/9d117181-ecd5-4df4-93a5-5086ed905a6d" />
### ☀️ Light Mode
<img width="1083" alt="Light mode" src="https://github.com/user-attachments/assets/7b34b7a7-637c-4857-abbd-4aac0e3dbd1c" />

---

## 🚀 Getting Started

### Clone the repo

```bash
git clone https://github.com/yeruvasruthi/wordle.git
cd wordle
---

### Install Dependencies
```bash
npm install
---
### Start app locally
```bash
npm start
---
### API Used
https://api.dictionaryapi.dev
Example API Call:
```ruby
https://api.dictionaryapi.dev/api/v2/entries/en/brain
---
###Built With
React.js
Axios (API calls)
PapaParse (CSV parsing)
CSS Flexbox/Grid
Dictionary API (Free)
LocalStorage
----
###Deployment
This project is deployed using Netlify:
https://famous-quokka-f2bfd4.netlify.app
---
###Author
Sruthi Yeruva
https://linkedin.com/sruthi-yeruva
