/* ============================================
   PUBLIC RSVP RESPONSES PAGE
   ============================================ */

const firebaseConfig = {
    apiKey: "AIzaSyB5bpeGx1AV7ZPwJkoOAPBWsFhCNtsF1yU",
    authDomain: "graduationinvitation-194ee.firebaseapp.com",
    projectId: "graduationinvitation-194ee",
    storageBucket: "graduationinvitation-194ee.firebasestorage.app",
    messagingSenderId: "467155750733",
    appId: "1:467155750733:web:e44990f4a4a0652e693104",
    measurementId: "G-H42K0P2T9C"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

const responsesLoading = document.getElementById('responsesLoading');
const responsesList = document.getElementById('responsesList');
const publicTotalResponses = document.getElementById('publicTotalResponses');
const publicTotalAttending = document.getElementById('publicTotalAttending');
const publicTotalPeople = document.getElementById('publicTotalPeople');

db.collection('rsvp')
    .orderBy('timestamp', 'desc')
    .onSnapshot((snapshot) => {
        const responses = [];
        snapshot.forEach((doc) => {
            responses.push({ id: doc.id, ...doc.data() });
        });

        renderPublicResponses(responses);
    }, (error) => {
        console.error('Error loading public RSVP responses:', error);
        if (responsesLoading) responsesLoading.style.display = 'none';
        responsesList.innerHTML = `
            <div class="responses-error">
                Không tải được danh sách phản hồi. Vui lòng kiểm tra quyền đọc Firestore.
            </div>
        `;
    });

function renderPublicResponses(responses) {
    if (responsesLoading) responsesLoading.style.display = 'none';

    const attending = responses.filter((response) => response.attendance === 'yes');
    const totalPeople = attending.reduce((sum, response) => {
        return sum + 1 + (parseInt(response.guestCount, 10) || 0);
    }, 0);

    publicTotalResponses.textContent = responses.length;
    publicTotalAttending.textContent = attending.length;
    publicTotalPeople.textContent = totalPeople;

    if (responses.length === 0) {
        responsesList.innerHTML = `
            <div class="responses-empty">
                Chưa có ai xác nhận.
            </div>
        `;
        return;
    }

    responsesList.innerHTML = responses.map((response) => {
        const isAttending = response.attendance === 'yes';
        const badgeText = isAttending ? 'Sẽ đến' : 'Không thể đến';
        const guestCountValue = parseInt(response.guestCount, 10) || 0;
        const peopleText = isAttending
            ? `${guestCountValue + 1} người${guestCountValue > 0 ? ` (${guestCountValue} đi cùng)` : ''}`
            : 'Không tham dự';
        const wishHTML = response.wishes && response.wishes.trim() !== ''
            ? `<p class="response-wish">“${escapeHTML(response.wishes)}”</p>`
            : '';

        return `
            <article class="response-card">
                <div class="response-card-header">
                    <div>
                        <h3 class="response-name">${escapeHTML(response.name || 'Khách mời')}</h3>
                        <p class="response-date">${formatResponseDate(response)}</p>
                    </div>
                    <span class="response-badge ${isAttending ? 'yes' : 'no'}">${badgeText}</span>
                </div>
                <div class="response-meta">
                    <span class="response-meta-pill">${peopleText}</span>
                </div>
                ${wishHTML}
            </article>
        `;
    }).join('');
}

function formatResponseDate(response) {
    const timestamp = response.timestamp;
    let date = null;

    if (timestamp && typeof timestamp.toDate === 'function') {
        date = timestamp.toDate();
    } else if (timestamp && timestamp.seconds) {
        date = new Date(timestamp.seconds * 1000);
    } else if (response.createdAt) {
        date = new Date(response.createdAt);
    }

    if (!date || Number.isNaN(date.getTime())) return 'Vừa gửi';

    return date.toLocaleString('vi-VN', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
}

function escapeHTML(str) {
    const div = document.createElement('div');
    div.textContent = str || '';
    return div.innerHTML;
}
