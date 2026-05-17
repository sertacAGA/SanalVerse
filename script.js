// OYUNCU VERİLERİ
let playerData = {
    username: "",
    role: "Yetişkin", // Varsayılan
    gender: "male"
};

// Son kalınan yeri hatırlamak için (Map mi yoksa Dashboard mu?)
let lastMenu = 'scene-menu'; 

// SİSTEM BAŞLANGICI: HAFIZAYI KONTROL ET
window.onload = function() {
    const openMapDirectly = window.location.hash === '#scene-map';
    // Oyuncu daha önce giriş yapmış mı?
    if(localStorage.getItem('isLoggedIn') === 'true') {
        // Verileri hafızadan çek
        playerData.username = localStorage.getItem('playerName');
        playerData.role = localStorage.getItem('playerRole') || "Yetişkin";
        playerData.gender = localStorage.getItem('playerGender') || "male";

        // Ekrana yansıt
        document.getElementById('display-name').innerText = playerData.username;
        updateAvatarVisual();

        // Başlangıç ekranlarını geçip direkt menüyü aç
        document.querySelectorAll('.scene').forEach(scene => scene.classList.remove('active'));
        document.getElementById(openMapDirectly ? 'scene-map' : 'scene-menu').classList.add('active');
    } else if (openMapDirectly) {
        document.querySelectorAll('.scene').forEach(scene => scene.classList.remove('active'));
        document.getElementById('scene-map').classList.add('active');
    }
};

// SAHNE DEĞİŞTİRME
function goToScene(sceneId) {
    document.querySelectorAll('.scene').forEach(scene => scene.classList.remove('active'));
    document.getElementById(sceneId).classList.add('active');
}

// AYARLAR MENÜSÜ AÇ/KAPA
function toggleSettings() {
    const modal = document.getElementById('settings-modal');
    modal.classList.toggle('open');

    // ==========================================
    // *** YENİ EKLEME: PROFIL İNCELEME GÖREVİ ***
    // ==========================================
    if (modal.classList.contains('open') && window.questManager) {
        // Eğer görev aktifse, başarıyla tamamla
        window.questManager.completeQuest('home_check_profile');
    }
    // ==========================================
}

// OYUNU SIFIRLA / ÇIKIŞ YAP
function resetGame() {
    localStorage.clear(); // Senin yazdığın tüm kayıtları siler
    
    // ==========================================
    // *** YENİ EKLEME: GÖREV HAFIZASINI SİL ***
    // ==========================================
    localStorage.removeItem('activeQuests');
    localStorage.removeItem('completedQuests');
    localStorage.removeItem('visitedLocations');
    localStorage.removeItem('productionCategories');
    localStorage.removeItem('userScore');
    // ==========================================

    location.reload();    // Sayfayı baştan yükle
}

function quitGame() {
    localStorage.setItem('isLoggedIn', 'true');
    alert('Oyun kaydedildi. Daha sonra kaldığın yerden devam edebilirsin.');
    window.location.href = 'about:blank';
}

function updateHudTime() {
    const hud = document.getElementById('hud-time');
    if (!hud) return;

    const careerState = JSON.parse(localStorage.getItem('careerState') || '{"day":1,"hour":8}');
    const hour = careerState.hour || 8;
    hud.innerText = `🕒 Gün ${careerState.day || 1} - ${String(hour).padStart(2, '0')}:00`;

    if (hour >= 21) {
        hud.innerText += ' | 😴 Uyku vakti!';
    }
}

function updateHudStats() {
    const hud = document.getElementById('hud-stats');
    if (!hud) return;
    const stats = JSON.parse(localStorage.getItem('playerStats') || '{"intelligence":1,"strength":1,"talent":1,"energy":100,"actionPoints":10,"money":0}');
    const lessons = JSON.parse(localStorage.getItem('careerCompletedLessons') || '[]').length;
    hud.innerText = `🧠${stats.intelligence} 💪${stats.strength} 🎨${stats.talent} ⚡${stats.energy} AP${stats.actionPoints} 💰${stats.money} | Eğitim ${Math.min(lessons,5)}/5`;
}

setInterval(() => {
    if (!window.questManager) return;
    window.questManager.advanceGameTime(1);
    updateHudTime();
}, 5000);

setInterval(updateHudTime, 1000);
setInterval(updateHudStats, 1000);

// GİRİŞ KONTROLÜ VE ROL MANTIĞI
function validateAndGo(nextSceneId) {
    const nameInput = document.getElementById('username');
    if (nameInput.value.trim() === "") {
        alert("Lütfen isminizi giriniz!");
        return;
    }
    playerData.username = nameInput.value;

    // Rolü Al
    const roleOptions = document.getElementsByName('role');
    for (const option of roleOptions) {
        if (option.checked) {
            playerData.role = option.value;
            break;
        }
    }

    // İsmi Ekrana Yaz
    document.getElementById('display-name').innerText = playerData.username;

    // ROL'E GÖRE AVATAR SIFIRLA
    updateAvatarVisual();

    // *** YENİ: VERİLERİ HAFIZAYA KAYDET ***
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('playerName', playerData.username);
    localStorage.setItem('playerRole', playerData.role);
    localStorage.setItem('playerGender', playerData.gender);

    goToScene(nextSceneId);
}

// CİNSİYET SEÇİMİ VE GÖRSEL GÜNCELLEME
function selectGender(gender, btn) {
    playerData.gender = gender;
    document.querySelectorAll('.gender-btn').forEach(b => b.classList.remove('selected'));
    btn.classList.add('selected');
    updateAvatarVisual();
}

function updateAvatarVisual() {
    const avatarVisual = document.getElementById('avatar-visual');
    
    if (playerData.role === "Çocuk") {
        if (playerData.gender === 'male') {
            avatarVisual.innerText = "👦"; 
        } else {
            avatarVisual.innerText = "👧"; 
        }
    } else {
        if (playerData.gender === 'male') {
            avatarVisual.innerText = "👨"; 
        } else {
            avatarVisual.innerText = "👩"; 
        }
    }
}

// ODA / BİNA GİRİŞ FONKSİYONU
function goToRoom(imageFile, roomName) {
    const bgImage = document.getElementById('room-bg');
    const title = document.getElementById('room-title');
    
    // Hangi menüden gelindiğini kaydet
    if(document.getElementById('scene-map').classList.contains('active')) {
        lastMenu = 'scene-map';
    } else {
        lastMenu = 'scene-menu';
    }

    bgImage.src = imageFile;
    title.innerText = roomName;

    // ==========================================
    // *** YENİ EKLEME: GÖREV SİSTEMİ TETİKLEYİCİSİ ***
    // ==========================================
    if (window.questManager) {
        // 1. Gidilen mekanı ziyaret edildi olarak kaydet
        window.questManager.visitLocation(roomName);

        // 2. İsimlere göre başlangıç görevlerini aktif et
        // Not: roomName isimleri senin HTML'de gönderdiğin isimlerle eşleşmeli
        const nameLower = roomName.toLowerCase();
        
        if (nameLower.includes("okul")) {
            window.questManager.activateQuest('school_first_lesson');
        } else if (nameLower.includes("atölye") || nameLower.includes("atolye")) {
            window.questManager.activateQuest('workshop_first_vehicle');
        } else if (nameLower.includes("cafe") || nameLower.includes("kafe")) {
            window.questManager.activateQuest('cafe_first_order');
        } else if (nameLower.includes("ofis")) {
            window.questManager.activateQuest('office_first_presentation');
        } else if (nameLower.includes("ev")) {
            window.questManager.activateQuest('home_check_profile');
        }
    }
    // ==========================================

    goToScene('scene-room-view');
}
// ODADAN ÇIKIŞ
function goBackFromRoom() {
    goToScene(lastMenu);
}
