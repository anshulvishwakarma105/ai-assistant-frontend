# AI Twins

## Introduction

**Product Name:** AI Twins

AI Twins is a chatbot web application that allows users to communicate with various LLM models through a simple and interactive chat interface.

The application provides experience with support for multiple conversations, file uploads, Markdown rendering, code syntax highlighting, and downloadable PDF responses.

AI-Twins/
├── public/
│   ├── Chat.png
│   ├── Favicon.png
│   ├── Loading.png
│   └── Profile.png
│
├── src/
│   ├── assets/
│   │   ├── About.jsx
│   │   ├── Background.jsx
│   │   ├── Feedback.jsx
│   │   └── Oops.jsx
│   │
│   ├── components/
│   │   ├── screens/
│   │   │   ├── chatScreen/
│   │   │   │   ├── ChatBox.jsx
│   │   │   │   ├── ChatBoxHeader.jsx
│   │   │   │   ├── InputField.jsx
│   │   │   │   └── Sidebar.jsx
│   │   │   ├── Animation.jsx
│   │   │   └── NewChatScreen.jsx
│   │   │
│   │   ├── uiComponents/
│   │   │   ├── Footer.jsx
│   │   │   └── Navbar.jsx
│   │   │
│   │   ├── Calculations.jsx
│   │   ├── ChatItem.jsx
│   │   ├── ChatItemOperation.jsx
│   │   ├── PopComponents.jsx
│   │   └── RenderComponents.jsx
│   │
│   ├── pages/
│   │   ├── About.jsx
│   │   ├── Chat.jsx
│   │   ├── Feedback.jsx
│   │   ├── Home.jsx
│   │   ├── NotFound.jsx
│   │   └── Terms.jsx
│   │
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
│
├── .gitignore
├── eslint.config.js
├── index.html
├── package.json
├── package-lock.json
├── vercel.json
└── vite.config.js

## Features

* Send messages to AI models
* Create and manage multiple chats
* Continue previous conversations
* Upload a file along with a message
* Support for PDF, DOC, DOCX and TXT files
* Render Markdown responses
* Support GitHub Flavored Markdown
* Syntax highlighting for code blocks
* Render SVG-based responses
* Download chat responses as PDF
* Copy AI-generated content
* Responsive design for desktop and mobile devices
* Local chat history management
* Input validation and loading states
* Error and alert handling

## Languages and Frameworks

* JavaScript (ES6+)
* React.js
* HTML5
* CSS3
* Bootstrap

## Dependencies

* `react-markdown` — Markdown rendering
* `remark-gfm` — GitHub Flavored Markdown support
* `rehype-highlight` — Code syntax highlighting
* `html2pdf.js` — Generate downloadable PDF documents
* `dompurify` — Sanitize SVG/HTML content
* `bootstrap` — UI styling and responsive layout
* `bootstrap-icons` — Icons

## React Hooks

* `useState()` — Manage component state
* `useEffect()` — Handle side effects and lifecycle operations
* `useRef()` — Access DOM elements and maintain mutable references
* `useParams()` — Access route parameters
* `useNavigate()` — Navigate between application routes
* `useLocation()` — Access the current route information

## Routing

The application uses React Router for client-side navigation.

Main routes include:

* `/chat` — Chat interface
* `/chat/new` — Create a new conversation
* `/chat/:id` — Open an existing conversation
* `/about` — About page
* `/terms` — Terms and conditions
* `/feedback` — Feedback page

## Chat System

The chat system allows users to create separate conversations and continue previous chats.

Each conversation maintains its own:

* Chat ID
* User messages
* AI responses
* Conversation history
* Uploaded files

Recent conversation history is sent to the backend to maintain conversational context.

## File Upload

Users can upload a file together with their message.

Supported file formats include:

* PDF
* DOC
* DOCX
* TXT

The uploaded file is processed by the backend and its content can be provided to the AI model as additional context.

## Markdown and Code Rendering

AI responses are rendered using `react-markdown`.

GitHub Flavored Markdown is supported through `remark-gfm`, including:

* Tables
* Lists
* Task lists
* Links
* Strikethrough

Code blocks are processed using `rehype-highlight` for syntax highlighting.

## SVG Rendering

AI-generated SVG content can be detected and rendered separately inside the chat interface.

SVG content is sanitized using `DOMPurify` before being inserted into the DOM to reduce security risks from untrusted HTML/SVG content.

## PDF Export

Users can export an AI response as a PDF document.

The PDF includes:

* AI Twins title
* Response generation date and time
* Formatted AI response
* Markdown content
* Code blocks
* SVG content where supported

PDF generation is handled using `html2pdf.js`.

## State Management

The application primarily uses React's built-in state management.

Important states include:

* Current input
* Chat messages
* Chat history
* Active chat
* Uploaded file
* Loading state
* Alerts
* User information
* UI/mobile state

## Local Storage

Browser `localStorage` is used to maintain application data across page reloads.

Stored information may include:

* Chat history
* User preferences
* Application state required for restoring conversations

## Responsive Design

The interface is designed to work across:

* Desktop
* Tablet
* Mobile

Bootstrap utilities and responsive CSS are used to adapt the chat interface, sidebar, input area, messages, and generated content to different screen sizes.

## Backend Integration

The React frontend communicates with a Python FastAPI backend through HTTP requests.

The backend is responsible for:

* Receiving chat messages
* Processing uploaded files
* Maintaining conversation context
* Communicating with the selected LLM provider
* Returning AI-generated responses

## Security

The application includes measures such as:

* SVG/HTML sanitization using `DOMPurify`
* File size validation
* File type validation
* Backend request rate limiting
* CORS configuration
* Environment variables for API credentials

## Project Structure

```text
src/
├── components/
├── pages/
├── utils/
├── App.jsx
└── main.jsx

public/
├── favicon.png
└── profile.png
```

## Development Tools

* VS Code
* Git
* GitHub
* Vite
* npm

## Technologies Used

**Frontend:** React.js, JavaScript, Bootstrap, CSS

**Backend:** Python, FastAPI

**AI Integration:** LLM API

**Data Storage:** Browser Local Storage

**Version Control:** Git & GitHub

## Future Improvements

* Voice input and output
* Image understanding
* Multiple model selection
* Streaming AI responses
* User authentication
* Cloud-based conversation storage
* Conversation search
* AI-generated image support
* Advanced file analysis
