
const assistantQuestions = [
 {q:'Sunumunda hangi metriği vurgulamak istersin?',opts:['Maliyet','Hız','Kullanıcı Etkisi','Sürdürülebilirlik']},
 {q:'Hangi görsel türü eklensin?',opts:['Ürün renderı','Kullanıcı akışı','Teknik şema','Pazar grafiği']}
];
let selectedAssistantAnswers = [];
function renderAssistant() {
 const box=document.getElementById('assistant-quiz'); if(!box) return;
 box.innerHTML = assistantQuestions.map((item,i)=>`<div style='margin:8px 0'><strong>${item.q}</strong><div>${item.opts.map(opt=>`<button class='btn secondary' style='min-width:unset;padding:6px 10px;margin:4px' onclick="pickAssistant(${i},'${opt}')">${opt}</button>`).join('')}</div></div>`).join('');
}
function pickAssistant(i,opt){selectedAssistantAnswers[i]=opt; alert(`Seçildi: ${opt}`);} 
let playerName = localStorage.getItem('playerName') || "Oyuncu";
let playerRole = localStorage.getItem('playerRole') || "Yetişkin";
let currentSlide = 0;
let presentationData = [];

window.onload = () => {
    const welcomeText = document.getElementById('office-welcome');
    if(welcomeText) welcomeText.innerText = `Hoş geldin ${playerName}, projen sunuma hazır mı?`; renderAssistant();
};

function goBackToMap() { window.location.href = '../index.html#scene-map'; }

function startPresentation() {
    // Bilgileri tam bu anda çekiyoruz
    const tech = document.getElementById('prep-tech').value || 'Akıllı Sistemler';
    const need = document.getElementById('prep-need').value || 'Hızlı Çözümler';
    const style = document.getElementById('prep-style').value;

    presentationData = [
        `Merhaba, bugün sizlere projemizi sunmaktan heyecan duyuyorum.`,
        `Projemizin teknik odak noktası tamamen "${tech}" üzerine kurulu.`,
        `Bu sayede kasabamızdaki "${need}" sorununa kökten bir çözüm sunuyoruz.`,
        `Görsel dilimizde "${style}" tarzını seçerek fark yaratmayı hedefledik.`,
        `Sunumumu dinlediğiniz için teşekkürler. Kararınızı bekliyorum!`, ...selectedAssistantAnswers.filter(Boolean).map((a,i)=>`Asistan Önerisi ${i+1}: ${a}`)
    ];

    document.getElementById('office-preparation').classList.remove('active');
    document.getElementById('office-presentation').classList.add('active');

    currentSlide = 0;
    showSlide();
}

function showSlide() {
    const textElement = document.getElementById('presentation-text');
    const btnElement = document.getElementById('next-slide-btn');
    
    if(textElement) {
        textElement.innerText = presentationData[currentSlide];
        btnElement.innerText = (currentSlide === presentationData.length - 1) ? "SONUCU GÖR" : "SONRAKİ SAYFA ➔";
    }
}

function nextSlide() {
    currentSlide++;
    if (currentSlide < presentationData.length) {
        showSlide();
    } else {
        finishPresentation();
    }
}

function finishPresentation() {
    const textElement = document.getElementById('presentation-text');
    const btnElement = document.getElementById('next-slide-btn');

    textElement.innerHTML = `
        <div style="width:100%">
            <h3 style="color:#2575fc">Sunum Tamamlandı!</h3>
            <div style="font-size:3rem; margin:15px 0; color:#f1c40f">85 / 100</div>
            <p>Tebrikler ${playerName}, bir ${playerRole} olarak harika iş çıkardın!</p>
        </div>
    `;
    
    btnElement.innerText = 'HARİTAYA DÖN';
    btnElement.onclick = goBackToMap;

    if (window.questManager) {
        window.questManager.completeQuest('office_first_presentation');
        window.questManager.completeQuest('office_high_score');
        window.questManager.gainOfficeProgress();
    }
}
