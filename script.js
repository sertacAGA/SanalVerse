// OYUNCU VERİLERİ
let playerData = {
    username: "",
    role: "Yetişkin",
    gender: "male",
    careerPath: localStorage.getItem('careerPath') || ''
};

let lastMenu = 'scene-menu';

window.onload = function() {
    const openMapDirectly = window.location.hash === '#scene-map';
    if(localStorage.getItem('isLoggedIn') === 'true') {
        playerData.username = localStorage.getItem('playerName');
        playerData.role = localStorage.getItem('playerRole') || "Yetişkin";
        playerData.gender = localStorage.getItem('playerGender') || "male";
        playerData.careerPath = localStorage.getItem('careerPath') || '';
        document.getElementById('display-name').innerText = playerData.username;
        updateAvatarVisual();
        renderGlobalAvatarCard();
        document.querySelectorAll('.scene').forEach(scene => scene.classList.remove('active'));
        document.getElementById(openMapDirectly ? 'scene-map' : 'scene-menu').classList.add('active');
    } else if (openMapDirectly) {
        document.querySelectorAll('.scene').forEach(scene => scene.classList.remove('active'));
        document.getElementById('scene-map').classList.add('active');
    }
};

function goToScene(sceneId) { document.querySelectorAll('.scene').forEach(scene => scene.classList.remove('active')); document.getElementById(sceneId).classList.add('active'); }
function toggleSettings() { const modal = document.getElementById('settings-modal'); modal.classList.toggle('open'); if (modal.classList.contains('open') && window.questManager) window.questManager; }
function resetGame() { localStorage.clear(); location.reload(); }
function quitGame() { localStorage.setItem('isLoggedIn', 'true'); alert('Oyun kaydedildi.'); window.location.href = 'about:blank'; }

function updateHudTime() {
    const hud = document.getElementById('hud-time'); if (!hud) return;
    const careerState = JSON.parse(localStorage.getItem('careerState') || '{"day":1,"hour":8}');
    hud.innerText = `🕒 Gün ${careerState.day || 1} - ${String(careerState.hour || 8).padStart(2, '0')}:00`;
}

function updateHudStats() {
    const hud = document.getElementById('hud-stats'); if (!hud) return;
    const stats = JSON.parse(localStorage.getItem('playerStats') || '{"intelligence":1,"strength":1,"talent":1,"energy":100,"actionPoints":10,"money":0}');
    const career = localStorage.getItem('careerPath') || 'Yok';
    hud.innerText = `🧠${stats.intelligence} 💪${stats.strength} 🎨${stats.talent} ⚡${stats.energy} AP${stats.actionPoints} 💰${stats.money} | Kariyer: ${career}`;
}

function renderGlobalAvatarCard() {
    const card = document.getElementById('global-avatar-card');
    if (!card) return;
    const stats = JSON.parse(localStorage.getItem('playerStats') || '{"intelligence":1,"strength":1,"talent":1,"money":0}');
    card.innerHTML = `<div><strong>${playerData.username || 'Oyuncu'}</strong></div><div>${document.getElementById('avatar-visual')?.innerText || '👨'} ${playerData.careerPath || 'Kariyer seçilmedi'}</div><div>💰 ${stats.money || 0} ₺</div>`;
}

// ÖNEMLİ: Saat ilerleme hızını artırdık (5 saniyede → 1 saniyede +1 saat)
setInterval(() => { if (!window.questManager) return; window.questManager.advanceGameTime(1); updateHudTime(); updateHudStats(); renderGlobalAvatarCard(); }, 1000);

function validateAndGo(nextSceneId) {
    const nameInput = document.getElementById('username');
    if (nameInput.value.trim() === "") { alert("Lütfen isminizi giriniz!"); return; }
    playerData.username = nameInput.value;
    const roleOptions = document.getElementsByName('role');
    for (const option of roleOptions) if (option.checked) { playerData.role = option.value; break; }
    document.getElementById('display-name').innerText = playerData.username;
    updateAvatarVisual();
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('playerName', playerData.username);
    localStorage.setItem('playerRole', playerData.role);
    localStorage.setItem('playerGender', playerData.gender);
    goToScene(nextSceneId);
}

function saveCareerPath(path) {
    // ÖNEMLİ: Kariyer seçimi validation
    if (!path || path.trim() === '') {
        alert("Lütfen bir kariyer seçiniz!");
        return false;
    }
    
    playerData.careerPath = path;
    localStorage.setItem('careerPath', path);
    if (window.questManager) {
        window.questManager.setCareerPath(path);
        window.questManager.generateTownNeeds();
    }
    alert(`Kariyer yolun seçildi: ${path}`);
    renderGlobalAvatarCard();
    goToScene('scene-menu');
    return true;
}

function selectGender(gender, btn) { playerData.gender = gender; document.querySelectorAll('.gender-btn').forEach(b => b.classList.remove('selected')); btn.classList.add('selected'); updateAvatarVisual(); }
function updateAvatarVisual() { const avatarVisual = document.getElementById('avatar-visual'); if (!avatarVisual) return; avatarVisual.innerText = playerData.role === "Çocuk" ? (playerData.gender === 'male' ? "👦" : "👧") : (playerData.gender === 'male' ? "👨" : "👩"); }
