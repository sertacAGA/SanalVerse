// ---------------- STATE ----------------
let gameState = { step: 'category', category: null, vehicle: null, parts: [] };
const careerPath = localStorage.getItem('careerPath') || 'Mühendis';

// ---------------- DATA ----------------
const productionLinesBase = [
    { id: "air", name: "Hava Araçları", icon: "🚁", desc: "Drone ve İHA üretimi" },
    { id: "robot", name: "Robotik Sistemler", icon: "🤖", desc: "Taşıma ve savunma robotları" },
    { id: "land", name: "Kara Araçları", icon: "🏎️", desc: "Otonom araç projeleri" }
];

const vehiclesByCareer = {
    'Mühendis': {
        air:[{id:'drone_fast',name:'Hızlı Drone',desc:'Keşif odaklı, yüksek hız.'}],
        robot:[{id:'bot_arm',name:'Endüstriyel Kol',desc:'Hassas montaj işleri.'}]
    },
    'Tasarımcı': {
        robot:[{id:'display_bot',name:'Vitrin Robotu',desc:'Sunum ve sergi odaklı.'}],
        land:[{id:'city_kiosk',name:'Akıllı Kiosk',desc:'Şehir estetiği + kullanım.'}]
    },
    'Yazılımcı': {
        air:[{id:'code_drone',name:'Kodlama Drone',desc:'Yazılım test uçuşu.'}],
        land:[{id:'iot_car',name:'IoT Araç',desc:'Otonom kontrol modüllü.'}]
    }
};

const productionLines = productionLinesBase;
const vehicles = vehiclesByCareer[careerPath] || vehiclesByCareer['Mühendis'];

const parts = [
    { id: "engine", name: "Titanyum Motor", desc: "Hızı +30 artırır", speed: 30 },
    { id: "battery", name: "Lityum-İyon Pro", desc: "Dayanıklılık ve Enerji sağlar", speed: 10, damage: 10 },
    { id: "laser", name: "Lazer Ünitesi", desc: "Hasarı +35 artırır", damage: 35 }
];

// ---------------- NAV ----------------
function loadStep(step) {
    gameState.step = step;
    updateSteps();

    if (step === "category") renderCategory();
    if (step === "vehicle") renderVehicle();
    if (step === "build") renderBuild();
    if (step === "test") renderTestArea();
}

function updateSteps() {
    document.querySelectorAll(".step").forEach(s => s.classList.remove("active"));
    const el = document.getElementById("step-" + gameState.step);
    if (el) el.classList.add("active");
}

// ---------------- STEP 1: CATEGORY ----------------
function renderCategory() {
    document.getElementById("content").innerHTML = `
        <h2>Üretim Hattı Seçin</h2>
        <div class="parts">
            ${productionLines.map(line => `
                <div class="part" onclick="selectCategory('${line.id}')">
                    <div style="font-size:3em">${line.icon}</div>
                    <h3>${line.name}</h3>
                    <p>${line.desc}</p>
                </div>
            `).join("")}
        </div>
    `;
}

function selectCategory(id) {
    gameState.category = id;
    loadStep("vehicle");
}

// ---------------- STEP 2: VEHICLE ----------------
function renderVehicle() {
    const list = vehicles[gameState.category] || [];
    document.getElementById("content").innerHTML = `
        <h2>Model Seçin</h2>
        <div class="parts">
            ${list.map(v => `
                <div class="part" onclick="selectVehicle('${v.id}')">
                    <h3>${v.name}</h3>
                    <p>${v.desc}</p>
                </div>
            `).join("")}
        </div>
        <button class="btn-action" style="background:#94a3b8" onclick="loadStep('category')">← Geri</button>
    `;
}

function selectVehicle(id) {
    const list = vehicles[gameState.category];
    gameState.vehicle = list.find(v => v.id === id);
    loadStep("build");
}

// ---------------- STEP 3: BUILD ----------------
function renderBuild() {
    const stats = calculateStats();
    document.getElementById("content").innerHTML = `
        <div style="display:flex; gap:20px;">
            <div style="flex:1">
                <h2>Parça Entegrasyonu</h2>
                <div class="parts">
                    ${parts.map(p => `
                        <div class="part" onclick="addPart('${p.id}')">
                            <h4>${p.name}</h4>
                            <p>${p.desc}</p>
                        </div>
                    `).join("")}
                </div>
            </div>
            
            <div style="width:300px;">
                <div class="card">
                    <h3>Performans</h3>
                    <div class="bar-container">
                        <div class="bar-label"><span>Hız</span><span>${stats.speed}</span></div>
                        <div class="bar"><div class="fill" style="width:${Math.min(stats.speed, 100)}%"></div></div>
                    </div>
                    <div class="bar-container">
                        <div class="bar-label"><span>Güç</span><span>${stats.damage}</span></div>
                        <div class="bar"><div class="fill" style="width:${Math.min(stats.damage, 100)}%"></div></div>
                    </div>
                </div>
                <div class="card" id="added-parts">
                    <h3>Entegre Edilenler</h3>
                    ${gameState.parts.map(p => `<div>✅ ${p.name}</div>`).join("") || "Parça yok"}
                </div>
                <button class="btn-action" style="width:100%" onclick="loadStep('test')">🚀 TESTE BAŞLA</button>
            </div>
        </div>
    `;
}

function addPart(id) {
    const stats = JSON.parse(localStorage.getItem('playerStats') || '{"money":0}');
    const part = parts.find(p => p.id === id);
    if (gameState.parts.some(p => p.id === id)) return;
    const cost = 40;
    if ((stats.money || 0) < cost) { alert('Parça için yeterli paran yok.'); return; }
    stats.money -= cost;
    localStorage.setItem('playerStats', JSON.stringify(stats));
    gameState.parts.push(part);
    renderBuild();
}

function calculateStats() {
    let s = { speed: 10, damage: 10 };
    gameState.parts.forEach(p => {
        s.speed += p.speed || 0;
        s.damage += p.damage || 0;
    });
    return s;
}

// ---------------- STEP 4: TEST AREA (Mini Game Fix) ----------------
function renderTestArea() {
    document.getElementById("content").innerHTML = `
        <div style="text-align:center">
            <h2>Test Sürüşü Başlıyor!</h2>
            <p>WASD / Yön tuşlarıyla hareket et, Boşluk ile ateş et!</p>
            <div id="game-ui" style="display:flex; justify-content:center; gap:20px; font-weight:bold; color:#22c55e;">
                <span>SÜRE: <span id="time">30</span></span>
                <span>SKOR: <span id="score">0</span></span>
            </div>
        </div>
    `;
    startDroneGame();
}

// Oyun mantığını V2.5'e göre güncelledim
function startDroneGame() {
    const canvas = document.getElementById("gameCanvas");
    const ctx = canvas.getContext("2d");
    canvas.style.display = "block";
    
    let score = 0;
    let timeLeft = 30;
    let targets = [];
    const stats = calculateStats();

    let drone = { x: 100, y: 250, size: 30, vx: 0, vy: 0 };
    let bullets = [];
    const keys = {};

    const keydown = (e) => { keys[e.key.toLowerCase()] = true; };
    const keyup = (e) => { keys[e.key.toLowerCase()] = false; };
    window.addEventListener('keydown', keydown);
    window.addEventListener('keyup', keyup);

    const shoot = () => {
        bullets.push({ x: drone.x + 45, y: drone.y, speed: 10 });
    };

    const clickShoot = () => shoot();
    canvas.addEventListener('click', clickShoot);

    const gameLoop = setInterval(() => {
        drone.vx = 0;
        drone.vy = 0;
        if (keys['w'] || keys['arrowup']) drone.vy = -6;
        if (keys['s'] || keys['arrowdown']) drone.vy = 6;
        if (keys['a'] || keys['arrowleft']) drone.vx = -6;
        if (keys['d'] || keys['arrowright']) drone.vx = 6;
        if (keys[' ']) {
            keys[' '] = false;
            shoot();
        }

        drone.x = Math.max(0, Math.min(740, drone.x + drone.vx));
        drone.y = Math.max(20, Math.min(480, drone.y + drone.vy));

        ctx.fillStyle = "#0f172a";
        ctx.fillRect(0,0,800,500);

        // Drone çizimi
        ctx.fillStyle = "#22c55e";
        ctx.fillRect(drone.x, drone.y - 15, 40, 30);
        ctx.fillStyle = "cyan";
        ctx.fillRect(drone.x + 35, drone.y - 5, 10, 10); // Burun

        // Hedef üretimi
        if(Math.random() < 0.05) {
            targets.push({ x: 800, y: Math.random() * 450, speed: 3 + Math.random() * 5 });
        }

        // Hedefleri güncelle
        targets.forEach((t, index) => {
            t.x -= t.speed;
            ctx.fillStyle = "#ef4444";
            ctx.beginPath();
            ctx.arc(t.x, t.y, 15, 0, Math.PI*2);
            ctx.fill();

            // Çarpışma kontrolü
            if(t.x < drone.x + 40 && t.x > drone.x && t.y > drone.y - 20 && t.y < drone.y + 20) {
                targets.splice(index, 1);
                score += 10;
                document.getElementById("score").innerText = score;
            }
        });

        bullets.forEach((b, bi) => {
            b.x += b.speed;
            ctx.fillStyle = '#fbbf24';
            ctx.fillRect(b.x, b.y - 2, 12, 4);

            if (b.x > 800) {
                bullets.splice(bi, 1);
                return;
            }

            targets.forEach((t, ti) => {
                if (Math.abs(b.x - t.x) < 16 && Math.abs(b.y - t.y) < 16) {
                    bullets.splice(bi, 1);
                    targets.splice(ti, 1);
                    score += 15;
                    document.getElementById("score").innerText = score;
                }
            });
        });

    }, 1000/60);

    const timer = setInterval(() => {
        timeLeft--;
        document.getElementById("time").innerText = timeLeft;
        if(timeLeft <= 0) {
            clearInterval(gameLoop);
            clearInterval(timer);
            window.removeEventListener('keydown', keydown);
            window.removeEventListener('keyup', keyup);
            canvas.removeEventListener('click', clickShoot);
            endGame(score);
        }
    }, 1000);
}

function endGame(finalScore) {
    const canvas = document.getElementById("gameCanvas");
    canvas.style.display = "none";
    
    // Puanı kaydet (Okul sahnesiyle aynı sistem)
    let totalScore = parseInt(localStorage.getItem('userScore')) || 0;
    totalScore += finalScore;
    localStorage.setItem('userScore', totalScore);

    if (window.questManager) {
        window.questManager.completeQuest('workshop_first_vehicle');
        window.questManager.gainWorkshopProgress();
    }

    document.getElementById("content").innerHTML = `
        <div class="card" style="text-align:center">
            <h1>Üretim Tamamlandı!</h1>
            <p>Aracın test performansından <strong>${finalScore}</strong> puan kazandın.</p>
            <h2>Toplam Puanın: ${totalScore}</h2>
            <button class="btn-action" onclick="location.reload()">YENİ ÜRETİM</button>
            <button class="btn-action" style="background:#3b82f6" onclick="window.location.href='../index.html#scene-map'">HARİTAYA DÖN</button>
        </div>
    `;
}

// Başlat
loadStep("category");
