
document.addEventListener('DOMContentLoaded', () => {
    const mobileMenu = document.getElementById('mobileMenu');
    const navLinks = document.getElementById('navLinks');
    const navbar = document.getElementById('navbar');
    const navItems = document.querySelectorAll('.nav-item');
    const sections = document.querySelectorAll('section');
    const scrollTopBtn = document.getElementById('scrollTopBtn');

    // 1. Mobile Menu Toggle
    mobileMenu.addEventListener('click', () => {
        mobileMenu.classList.toggle('active');
        navLinks.classList.toggle('open');
    });

    // 2. Smooth Scroll & Close Mobile Menu on Click
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                e.preventDefault();
                mobileMenu.classList.remove('active');
                navLinks.classList.remove('open');

                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // 3. Auto-Apply Smooth Reveal Animation to Cards & Sections
    const revealElements = document.querySelectorAll(
        '.section-header, .menu-card, .featured-special, .special-box, .about-images, .about-content, .info-card, .contact-form-box'
    );
    revealElements.forEach(el => el.classList.add('reveal'));

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                revealObserver.unobserve(entry.target); // একবার অ্যানিমেট হলে স্মুথ থাকবে
            }
        });
    }, {
        threshold: 0.12
    });

    revealElements.forEach(el => revealObserver.observe(el));

    // 4. Navbar Shrink, Scroll-Spy Active Link & Back-to-Top Button
    window.addEventListener('scroll', () => {
        const scrollPos = window.scrollY;

        // Navbar Shrink
        if (scrollPos > 40) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Back to Top Button Visibility
        if (scrollPos > 450) {
            scrollTopBtn.classList.add('show');
        } else {
            scrollTopBtn.classList.remove('show');
        }

        // Highlight Active Navbar Link on Scroll
        sections.forEach(section => {
            const top = section.offsetTop - 130;
            const height = section.offsetHeight;
            const id = section.getAttribute('id');

            if (scrollPos >= top && scrollPos < top + height) {
                navItems.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });

    // 5. Scroll to Top Smooth Click
    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});

//---================ Chat BOt Design ============
// ==========================================
// AI Chatbot Logic (Python API Ready)
// ==========================================
const chatToggleBtn = document.getElementById('chatToggleBtn');
const closeChatBtn = document.getElementById('closeChatBtn');
const chatWindow = document.getElementById('chatWindow');
const chatForm = document.getElementById('chatForm');
const chatInput = document.getElementById('chatInput');
const chatBody = document.getElementById('chatBody');
const quickReplies = document.querySelectorAll('#quickReplies button');

// আপনার Python Backend (Flask / FastAPI) এর API Endpoint এখানে বসাবেন
const PYTHON_API_URL = 'http://127.0.0';

// Toggle Chat Window
chatToggleBtn.addEventListener('click', () => {
    chatWindow.classList.toggle('active');
    if (chatWindow.classList.contains('active')) {
        chatInput.focus();
    }
});

closeChatBtn.addEventListener('click', () => {
    chatWindow.classList.remove('active');
});

// Helper: Get Current Time
function getCurrentTime() {
    return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

// Helper: Append Message to Chat Body
function appendMessage(text, sender) {
    const msgDiv = document.createElement('div');
    msgDiv.classList.add('message', sender === 'user' ? 'user-message' : 'bot-message');
    msgDiv.innerHTML = `<p>${text}</p><span class="msg-time">${getCurrentTime()}</span>`;
    chatBody.appendChild(msgDiv);
    chatBody.scrollTop = chatBody.scrollHeight;
}

// Helper: Show/Hide Typing Animation
function showTyping() {
    const typingDiv = document.createElement('div');
    typingDiv.classList.add('typing-indicator');
    typingDiv.id = 'typingIndicator';
    typingDiv.innerHTML = '<span></span><span></span><span></span>';
    chatBody.appendChild(typingDiv);
    chatBody.scrollTop = chatBody.scrollHeight;
}

function removeTyping() {
    const typingDiv = document.getElementById('typingIndicator');
    if (typingDiv) typingDiv.remove();
}

// Send Message to Python AI Backend
async function sendMessageToAI(userMessage) {
    appendMessage(userMessage, 'user');
    showTyping();

    try {
        const response = await fetch(PYTHON_API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ message: userMessage })
        });

        if (!response.ok) throw new Error('Server offline');

        const data = await response.json();
        removeTyping();
        // Python থেকে আসা JSON এ { "reply": "..." } থাকতে হবে
        appendMessage(data.reply, 'bot');

    } catch (error) {
        // যদি Python সার্ভার এখনো চালু না থাকে, তবে ডেমো রেসপন্স দেখাবে
        setTimeout(() => {
            removeTyping();
            appendMessage(
                "Python AI backend is not connected yet. Once you run your Flask/FastAPI server at <code>/api/chat</code>, I will answer dynamically!",
                'bot'
            );
        }, 800);
    }
}

// Handle Form Submit
chatForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const message = chatInput.value.trim();
    if (!message) return;

    chatInput.value = '';
    sendMessageToAI(message);
});

// Handle Quick Reply Chips
quickReplies.forEach(btn => {
    btn.addEventListener('click', () => {
        const msg = btn.getAttribute('data-msg');
        sendMessageToAI(msg);
    });
});


