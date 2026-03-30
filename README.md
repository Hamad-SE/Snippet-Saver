# Snippet Saver

Welcome to **Snippet Saver**! This is a simple and fast web application where developers can save, view, and organize their frequently used pieces of code (like HTML, CSS, JavaScript, etc.). 

It is designed to be very easy to use and looks just like a modern code editor!

## 🌟 Features

- **Save Your Code:** Easily store code snippets so you don't have to rewrite them.
- **Copy with One Click:** A quick "Copy to Clipboard" button lets you paste your code anywhere instantly.
- **Beautiful Dark Mode:** The app uses a premium, eye-catching dark theme.
- **Cloud Storage:** Powered by **Supabase**, meaning your snippets are safely stored in the cloud and you can access them from anywhere.

## 🚀 Tech Stack

- **Frontend:** React + Vite (for lightning-fast speed)
- **Styling:** Custom Vanilla CSS for a beautiful look without bloated frameworks
- **Database:** Supabase (for real-time cloud storage)
- **Icons:** Lucide-React

## 💻 How to Run This Locally

If you want to run this project on your own computer, follow these simple steps:

### 1. Clone the repository
Download the code to your computer:
```bash
git clone https://github.com/Hamad-SE/Snippet-Saver.git
cd "Snippet-Saver"
```

### 2. Install the requirements
You need Node.js installed. Then run:
```bash
npm install
```

### 3. Connect the Database (Supabase)
Create a file named `.env` in the root folder and add your Supabase credentials. It should look like this:
```env
VITE_SUPABASE_URL=your_project_url
VITE_SUPABASE_ANON_KEY=your_anon_key
```

### 4. Start the App!
Run the development server:
```bash
npm run dev
```
Open the link it gives you (usually `http://localhost:5173`) in your browser and enjoy!

## 🌍 Hosting Online

This app is fully ready to be deployed on **Vercel**. Just import your GitHub repository to Vercel and make sure to add the `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` in Vercel's Environment Variables settings before deploying!
