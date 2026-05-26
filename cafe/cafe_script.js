const tracks = {
    jazz: "https://www.bensound.com/bensound-music/bensound-thejazzpiano.mp3",
    lofi: "https://www.bensound.com/bensound-music/bensound-slowmotion.mp3"
};

function playMusic(type) { const audio = document.getElementById('bg-audio'); const label = document.getElementById('current-track'); audio.src = tracks[type]; audio.play(); label.innerText = "Çalan: " + type.toUpperCase(); }
function stopMusic() { const audio = document.getElementById('bg-audio'); audio.pause(); document.getElementById('current-track').innerText = "Çalan: -"; }

function getNeeds() {
    let needs = JSON.parse(localStorage.getItem('townNeeds') || '[]');
    if (!needs.length && window.questManager) needs = window.questManager.generateTownNeeds();
    return needs;
}

function renderNeeds() {
    const wrap = document.getElementById('dynamic-needs');
    if (!wrap) return;
    const needs = getNeeds();
    wrap.innerHTML = needs.map(n => `<div class="job-card medium"><div class="job-header">${n.name} <span>${n.reward} ₺</span></div><p>Gereken kariyer: <strong>${n.career}</strong></p><button onclick="acceptNeed('${n.id}')">SİPARİŞİ AL</button></div>`).join('');
}

function acceptNeed(needId) {
    const needs = getNeeds();
    const need = needs.find(n => n.id === needId);
    if (!need) return;
    localStorage.setItem('activeOrder', JSON.stringify(need));
    const activeOrders = JSON.parse(localStorage.getItem('activeOrders') || '[]');
    activeOrders.push(need);
    localStorage.setItem('activeOrders', JSON.stringify(activeOrders.slice(-5)));
    if (window.questManager) { window.questManager.completeQuest('cafe_first_order'); window.questManager.trackJobApplication(); }
    const toast = document.getElementById('toast');
    toast.innerText = `${need.name} siparişi alındı.`; toast.className = "toast show";
    setTimeout(() => { toast.className = toast.className.replace("show", ""); }, 3000);
}

window.onload = renderNeeds;
