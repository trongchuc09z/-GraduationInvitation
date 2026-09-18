/* ============================================
   GRADUATION INVITATION - SCRIPT.JS
   Huyền Linh's Graduation Ceremony
   ============================================ */

// ===== FIREBASE CONFIGURATION =====
// ★★★ ĐIỀN THÔNG TIN FIREBASE CỦA BẠN VÀO ĐÂY ★★★
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_PROJECT_ID.appspot.com",
    messagingSenderId: "YOUR_SENDER_ID",
    appId: "YOUR_APP_ID"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// ===== MẬT KHẨU ADMIN (thay đổi theo ý bạn) =====
const ADMIN_PASSWORD = "admin2026";

// ===== NGÀY SỰ KIỆN =====
const EVENT_DATE = new Date('2026-09-26T13:00:00+07:00');

// ============================================
// ENVELOPE OVERLAY
// ============================================
const envelopeOverlay = document.getElementById('envelopeOverlay');
const mainContent = document.getElementById('mainContent');

envelopeOverlay.addEventListener('click', () => {
    envelopeOverlay.classList.add('hidden');
    setTimeout(() => {
        mainContent.classList.add('visible');
        launchConfetti();
    }, 400);
});

// Auto-open after 5 seconds if user doesn't click
setTimeout(() => {
    if (!envelopeOverlay.classList.contains('hidden')) {
        envelopeOverlay.classList.add('hidden');
        setTimeout(() => {
            mainContent.classList.add('visible');
        }, 400);
    }
}, 8000);

// ============================================
// FLOATING PARTICLES
// ============================================
function createParticles() {
    const container = document.getElementById('particles');
    const count = window.innerWidth < 768 ? 20 : 40;

    for (let i = 0; i < count; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        
        const size = Math.random() * 4 + 2;
        const left = Math.random() * 100;
        const delay = Math.random() * 15;
        const duration = Math.random() * 10 + 10;
        const opacity = Math.random() * 0.5 + 0.2;
        
        particle.style.cssText = `
            width: ${size}px;
            height: ${size}px;
            left: ${left}%;
            animation-delay: ${delay}s;
            animation-duration: ${duration}s;
            opacity: ${opacity};
            background: ${Math.random() > 0.5 ? 'var(--gold-primary)' : 'var(--gold-light)'};
        `;
        
        container.appendChild(particle);
    }
}

createParticles();

// ============================================
// CONFETTI EFFECT
// ============================================
function launchConfetti() {
    const container = document.getElementById('confetti');
    const colors = ['#d4af37', '#f0d27f', '#e8a0bf', '#f5e6cc', '#b8941f', '#fff'];
    const shapes = ['square', 'circle'];
    
    for (let i = 0; i < 80; i++) {
        const piece = document.createElement('div');
        piece.classList.add('confetti-piece');
        
        const color = colors[Math.floor(Math.random() * colors.length)];
        const shape = shapes[Math.floor(Math.random() * shapes.length)];
        const left = Math.random() * 100;
        const size = Math.random() * 8 + 5;
        const duration = Math.random() * 2 + 2;
        const delay = Math.random() * 1.5;
        
        piece.style.cssText = `
            left: ${left}%;
            width: ${size}px;
            height: ${shape === 'circle' ? size : size * 0.6}px;
            background: ${color};
            border-radius: ${shape === 'circle' ? '50%' : '2px'};
            animation-duration: ${duration}s;
            animation-delay: ${delay}s;
        `;
        
        container.appendChild(piece);
    }
    
    // Clean up confetti after animation
    setTimeout(() => {
        container.innerHTML = '';
    }, 5000);
}

// ============================================
// COUNTDOWN TIMER
// ============================================
function updateCountdown() {
    const now = new Date();
    const diff = EVENT_DATE - now;
    
    if (diff <= 0) {
        document.getElementById('countDays').textContent = '🎓';
        document.getElementById('countHours').textContent = '00';
        document.getElementById('countMinutes').textContent = '00';
        document.getElementById('countSeconds').textContent = '00';
        return;
    }
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);
    
    document.getElementById('countDays').textContent = String(days).padStart(2, '0');
    document.getElementById('countHours').textContent = String(hours).padStart(2, '0');
    document.getElementById('countMinutes').textContent = String(minutes).padStart(2, '0');
    document.getElementById('countSeconds').textContent = String(seconds).padStart(2, '0');
}

updateCountdown();
setInterval(updateCountdown, 1000);

// ============================================
// SCROLL ANIMATIONS (Intersection Observer)
// ============================================
const observerOptions = {
    root: null,
    rootMargin: '0px 0px -80px 0px',
    threshold: 0.1
};

const scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            // Optional: stop observing after animation
            // scrollObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all animated elements
document.querySelectorAll('.fade-in, .fade-in-left, .fade-in-right, .scale-in').forEach(el => {
    scrollObserver.observe(el);
});

// ============================================
// GUEST COUNT CONTROLS
// ============================================
const guestCountDisplay = document.getElementById('guestCountDisplay');
const guestCountInput = document.getElementById('guestCount');
const countMinus = document.getElementById('countMinus');
const countPlus = document.getElementById('countPlus');
let guestCount = 0;

countPlus.addEventListener('click', () => {
    if (guestCount < 10) {
        guestCount++;
        guestCountDisplay.textContent = guestCount;
        guestCountInput.value = guestCount;
    }
});

countMinus.addEventListener('click', () => {
    if (guestCount > 0) {
        guestCount--;
        guestCountDisplay.textContent = guestCount;
        guestCountInput.value = guestCount;
    }
});

// ============================================
// RSVP FORM SUBMISSION
// ============================================
const rsvpForm = document.getElementById('rsvpForm');
const submitBtn = document.getElementById('submitBtn');
const successMessage = document.getElementById('successMessage');

rsvpForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Validate
    const name = document.getElementById('guestName').value.trim();
    const attendance = document.querySelector('input[name="attendance"]:checked');
    const wishes = document.getElementById('wishes').value.trim();
    
    if (!name) {
        shakeElement(document.getElementById('guestName'));
        return;
    }
    
    if (!attendance) {
        shakeElement(document.querySelector('.radio-group'));
        return;
    }
    
    // Show loading state
    submitBtn.classList.add('loading');
    submitBtn.disabled = true;
    
    // Prepare data
    const rsvpData = {
        name: name,
        attendance: attendance.value,
        guestCount: parseInt(guestCountInput.value) || 0,
        wishes: wishes,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        createdAt: new Date().toISOString()
    };
    
    try {
        // Push to Firebase Firestore
        await db.collection('rsvp').add(rsvpData);
        
        // Show success
        rsvpForm.style.display = 'none';
        successMessage.classList.add('visible');
        
        // Launch confetti for celebration!
        if (attendance.value === 'yes') {
            launchConfetti();
        }
        
        // Reset form values (for when it becomes visible again)
        rsvpForm.reset();
        guestCount = 0;
        guestCountDisplay.textContent = '0';
        guestCountInput.value = '0';
        
    } catch (error) {
        console.error('Error submitting RSVP:', error);
        alert('Đã xảy ra lỗi khi gửi. Vui lòng thử lại!\n\nLỗi: ' + error.message);
    } finally {
        submitBtn.classList.remove('loading');
        submitBtn.disabled = false;
    }
});

// Shake animation for validation
function shakeElement(el) {
    el.style.animation = 'none';
    el.offsetHeight; // Trigger reflow
    el.style.animation = 'shake 0.5s ease';
    setTimeout(() => { el.style.animation = ''; }, 500);
}

// Add shake keyframes dynamically
const shakeStyle = document.createElement('style');
shakeStyle.textContent = `
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        20% { transform: translateX(-8px); }
        40% { transform: translateX(8px); }
        60% { transform: translateX(-5px); }
        80% { transform: translateX(5px); }
    }
`;
document.head.appendChild(shakeStyle);

// ============================================
// ADMIN ACCESS (Hidden Trigger)
// ============================================
const adminTrigger = document.getElementById('adminTrigger');
const adminModal = document.getElementById('adminModal');
const adminPassword = document.getElementById('adminPassword');
const adminLoginBtn = document.getElementById('adminLoginBtn');
const adminCancelBtn = document.getElementById('adminCancelBtn');
const adminError = document.getElementById('adminError');

let adminClickCount = 0;
let adminClickTimer = null;

// Triple-click on the hidden corner button to show admin modal
adminTrigger.addEventListener('click', () => {
    adminClickCount++;
    
    if (adminClickTimer) clearTimeout(adminClickTimer);
    
    adminClickTimer = setTimeout(() => {
        adminClickCount = 0;
    }, 1000);
    
    if (adminClickCount >= 3) {
        adminClickCount = 0;
        adminModal.classList.add('visible');
        adminPassword.focus();
    }
});

adminLoginBtn.addEventListener('click', handleAdminLogin);
adminPassword.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') handleAdminLogin();
});

adminCancelBtn.addEventListener('click', () => {
    adminModal.classList.remove('visible');
    adminPassword.value = '';
    adminError.style.display = 'none';
});

// Close modal on outside click
adminModal.addEventListener('click', (e) => {
    if (e.target === adminModal) {
        adminModal.classList.remove('visible');
        adminPassword.value = '';
        adminError.style.display = 'none';
    }
});

function handleAdminLogin() {
    const password = adminPassword.value.trim();
    
    if (password === ADMIN_PASSWORD) {
        // Redirect to admin page
        window.location.href = 'admin.html';
    } else {
        adminError.style.display = 'block';
        adminPassword.value = '';
        adminPassword.focus();
        
        // Shake the modal
        shakeElement(document.querySelector('.admin-modal-content'));
        
        setTimeout(() => {
            adminError.style.display = 'none';
        }, 3000);
    }
}

// ============================================
// SMOOTH SCROLL FOR INTERNAL LINKS
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ============================================
// PARALLAX EFFECT ON HERO (subtle)
// ============================================
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.getElementById('hero');
    
    if (hero && scrolled < window.innerHeight) {
        const heroDecor = hero.querySelector('.hero-decor');
        if (heroDecor) {
            heroDecor.style.transform = `translateY(${scrolled * 0.3}px)`;
        }
    }
});

// ============================================
// CONSOLE EASTER EGG
// ============================================
console.log(
    '%c🎓 Lễ Tốt Nghiệp - Huyền Linh %c\n' +
    '%cHọc Viện Công Nghệ Bưu Chính Viễn Thông - PTIT\n' +
    'Thứ Bảy, 26/09 lúc 13:00\n\n' +
    '💛 Cảm ơn bạn đã ghé thăm!',
    'font-size: 20px; font-weight: bold; color: #d4af37; background: #0a0a1a; padding: 10px 20px; border-radius: 5px;',
    '',
    'font-size: 12px; color: #f5e6cc;'
);
