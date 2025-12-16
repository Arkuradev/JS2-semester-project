# 🎯 CrestAuction - Semester Project 2

Welcome to CrestAuction, a modern, responsive online auction platform build as part of Semester Project 2 at Noroff Vocational School for Front-End Development.

## 🚀 Live Site

[Visit CrestAuction Live](https://crestauction.netlify.app/)




## 📌 Features

- 🔐 User Authentication (Register, Login, Logout)
- 📦 Create, edit, and delete auction listings
- 📸 Upload images for listings
- ⏰ Live countdown to listing end time
- 💰 Place bids on active auctions
- 📄 View individual listing details and bid history
- 🧑 View and edit your profile

## ♿ Accessibility

- ✅ Passes WAVE contrast and label checks

- ✅ Uses semantic HTML and screen reader support

- ✅ Dark/light theme switch with proper contrast ratios


## Updates to JS2-Semester-project

 - Improved card styling on cards. 

## 📸 Screenshots

![Light mode version of CrestAuction](/images/screenshot2.png)
![Dark mode version of CrestAuction](/images/screenshot1.png)

## 🧩 Tailwind CSS Setup

Tailwind is already configured in this project. If you want to modify or build styles:

1. Install dependencies:

```
npm install
```

2. Run Tailwind CLI to build styles:

```
npx tailwindcss -i ./src/input.css -o ./dist/output.css --watch
```

Replace paths above if you're using a different input/output setup.

## 🛠️ Built With

- **HTML5**
- **CSS3 (Tailwind CSS)**
- **JavaScript (ES Modules)**
- **Noroff Auction API v2**

1. Clone the repo:

   ```bash
   git clone https://github.com/Arkuradev/JS2-semester-project.git
   ```

2. Navigate to the project folder:

```
cd JS2-semester-project
```

3. Open index.html with Live Server or your preferred local server.

## 🚀 Deployment

This project is deployed using Netlify. Any push to the main branch automatically triggers a redeploy.

## 🔒 API Authentication

This project uses the Noroff Auction API v2 which requires:

- Registration

- Login to obtain a Bearer token

- Supplying an X-Noroff-API-Key header

All requests are handled through a custom apiFetch utility to manage this automatically.

## 👨‍🎓 Author

Stein Arild Gansmoe
Frontend Development Student @ Noroff
