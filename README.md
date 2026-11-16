# AI-Powered Web Chatbot with Python

A responsive, full-stack web application featuring an intelligent AI chatbot built with **Python**. This project demonstrates how to integrate modern web development frameworks with Generative AI and Large Language Models (LLMs) to create real-time, interactive user experiences.

## Features

* **Real-Time AI Conversations:** Instant, natural, and context-aware responses powered by AI.
* **Conversation Memory:** Remembers chat history within the active session for smooth follow-up questions.
* **Responsive Web Interface:** Clean, user-friendly chat UI built with HTML5, CSS3, and JavaScript.
* **Markdown & Code Formatting:** Cleanly renders formatted text, bullet points, and code blocks in responses.
* **Secure API Handling:** Uses environment variables (`.env`) to keep API keys safe.

## Tech Stack

* **Backend:** Python, [Flask / FastAPI / Django] *(Keep the one you used)*
* **AI Integration:** [OpenAI API / Google Gemini API / LangChain] *(Keep the one you used)*
* **Frontend:** HTML5, CSS3, JavaScript (Fetch API)
* **Environment Management:** `python-dotenv`

## Getting Started

Follow these steps to run the project locally on your machine.

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name
```

### 2. Create a Virtual Environment
```bash
python -m venv venv
# On Windows:
venv\Scripts\activate
# On macOS/Linux:
source venv/bin/activate
```

### 3. Install Dependencies
```bash
pip install -r requirements.txt
```

### 4. Set Up Environment Variables
Create a `.env` file in the root directory and add your AI API key:
```env
API_KEY=your_actual_api_key_here
```

### 5. Run the Application
```bash
python app.py
```
Open your browser and go to `http://127.0.0.1:5000` (or the port shown in your terminal).

## Project Structure

```text
├── static/
│   ├── css/style.css      # Styling for the chat interface
│   └── js/script.js       # Frontend logic & API calls
├── templates/
│   └── index.html         # Main web page
├── .env                   # API keys (ignored by Git)
├── .gitignore             # Files to ignore in version control
├── app.py                 # Main Python backend & AI integration
└── requirements.txt       # Python dependencies
```

## Contributing

Contributions, issues, and feature requests are welcome! Feel free to fork this repository and submit a pull request.

## License

This project is open-source and available under the MIT License.
