// Modalı Aç
function openModal(modalId) {
    if (modalId === 'profile-modal') {
        renderProfile();
    }
    document.getElementById(modalId).classList.add('active');
}

// Modalı Kapat
function closeModal(modalId) {
    document.getElementById(modalId).classList.remove('active');
    
    // Eğer TV kapatılıyorsa, videonun sesini kesmek için iframe'i yenile
    if (modalId === 'tv-modal') {
        let iframe = document.querySelector('#tv-modal iframe');
        if (iframe) {
            let iframeSrc = iframe.src;
            iframe.src = iframeSrc; 
        }
    }
}

function renderProfile() {
    const levelEl = document.querySelector('.stats-grid .stat-box:nth-child(1) strong');
    const moneyEl = document.querySelector('.stats-grid .stat-box:nth-child(2) strong');
    const repEl = document.querySelector('.stats-grid .stat-box:nth-child(3) strong');
    const skillsEl = document.querySelector('.skills-list');

    const totalScore = parseInt(localStorage.getItem('userScore') || '0', 10);
    const completed = JSON.parse(localStorage.getItem('completedQuests') || '[]');
    const level = Math.max(1, Math.floor(totalScore / 300) + 1);
    const money = 1000 + (totalScore * 2);

    if (levelEl) levelEl.textContent = String(level);
    if (moneyEl) moneyEl.textContent = `${money} ₺`;
    if (repEl) repEl.textContent = level >= 8 ? 'Usta' : level >= 4 ? 'Kalfa' : 'Çırak';

    if (skillsEl) {
        const skills = [
            '🔧 Temel Montaj Lisansı',
            ...(completed.includes('school_first_lesson') ? ['📚 İlk Ders Başarı Rozeti'] : []),
            ...(completed.includes('cafe_first_order') ? ['☕ Sipariş Yönetimi'] : []),
            ...(completed.includes('office_first_presentation') ? ['💼 Sunum Teknikleri'] : []),
            ...(completed.includes('workshop_first_vehicle') ? ['🚁 Prototip Üretimi'] : [])
        ];
        skillsEl.innerHTML = skills.map(skill => `<li>${skill}</li>`).join('');
    }

    if (window.questManager) {
        window.questManager.activateQuest('home_check_profile');
        window.questManager.completeQuest('home_check_profile');
    }
}

function endDay() {
    const careerStateBefore = JSON.parse(localStorage.getItem('careerState') || '{"day":1,"hour":8}');
    if ((careerStateBefore.hour || 8) < 21) {
        alert(`Henüz erken! Saat ${String(careerStateBefore.hour || 8).padStart(2, '0')}:00, uyku vakti 21:00.`);
        return;
    }

    if (window.questManager) {
        window.questManager.endDayAtHome();
    }

    const careerState = JSON.parse(localStorage.getItem('careerState') || '{"day":1}');
    alert(`Gün tamamlandı. Yeni gün: ${careerState.day || 1}`);
}
