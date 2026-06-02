// icerik.js - KARİYER TABANLI OKUL MÜFREDAT SİSTEMİ
// Dinamik olarak seçilen kariyere göre dersleri yükler

let curriculumData = [];

function loadCareerCurriculum() {
    const career = localStorage.getItem('careerPath') || 'Robotik Tasarımcı';
    
    if (career === 'Robotik Tasarımcı') {
        curriculumData = getRobotikseCurriculum();
    } else if (career === 'Yapay Zeka Uzmanı') {
        curriculumData = getAIUnexpertCurriculum();
    } else if (career === 'Uzay Mühendisi') {
        curriculumData = getSpaceEngineerCurriculum();
    } else {
        // Fallback
        curriculumData = getRobotikseCurriculum();
    }
}

// ====== 🤖 ROBOTİK TASARIMCI MÜFREDAT ======
function getRobotikseCurriculum() {
    return [
        // --- 1. MEKATRONIK TASARIMI ---
        {
            subject: "Mekatronik Tasarımı",
            lessons: [
                { 
                    id: "r1", 
                    title: "Mekatronik Nedir?", 
                    points: 100, 
                    content: {
                        text: "Mekatronik, mekanik, elektrik ve bilgisayar teknolojisinin birleşimidir. Robotlar mekatronik sistemlerin önemli örnekleridir. Hareketlendirici (motor), sensör ve kontrol devresi mekatroniğin temel bileşenleridir.",
                        images: ["https://images.unsplash.com/photo-1581092162562-40038f56b195?w=800"],
                        video: "https://www.youtube.com/embed/example",
                        examples: [
                            "Örnek 1: Robot kolunun hareket ettirilmesi motor sayesinde olur.",
                            "Örnek 2: Sensörler ortamdan bilgi toplar.",
                            "Örnek 3: Kontrol devresi emirleri işler ve yürütür."
                        ],
                        activityType: "text",
                        activityText: "Bir mekatronik sistem (bulaşık makinesi, asansör vb) seç ve bileşenlerini listele.",
                        quiz: [
                            { q: "Mekatronik hangi teknolojilerin birleşimidir?", opts: ["Mekanik + Elektrik", "Yazılım + Donanım", "Kimya + Fizik"], ans: 0 },
                            { q: "Robotun hareket etmesini sağlayan eleman hangisidir?", opts: ["Sensör", "Motor", "Yapı"], ans: 1 },
                            { q: "Çevreden bilgi toplayan cihaza ne denir?", opts: ["Aktüatör", "Sensör", "Kontrol"], ans: 1 }
                        ]
                    }
                },
                { 
                    id: "r2", 
                    title: "Elektronik Bileşenler", 
                    points: 100, 
                    content: {
                        text: "Elektronik devrelerde kullanılan temel bileşenler: Direnç, Kondansatör, Transistör, Diyot ve Entegre Devreler (IC). Her bileşenin belirli görevleri vardır.",
                        images: ["https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800"],
                        video: "https://www.youtube.com/embed/example",
                        examples: [
                            "Direnç: Elektrik akımını sın��rlandırır",
                            "Transistör: Elektrik sinyalini amplify eder",
                            "LED: Işık üretir ve göstergedir"
                        ],
                        activityType: "draw",
                        activityText: "Basit bir devrede direnç, LED ve pil simgelerini çiz.",
                        quiz: [
                            { q: "Elektrik akımını sınırlandıran eleman hangisidir?", opts: ["Direnç", "Transistör", "Diyot"], ans: 0 },
                            { q: "Sinyali güçlendiren bileşen nedir?", opts: ["LED", "Transistör", "Kondansatör"], ans: 1 },
                            { q: "LED neyi gösterir?", opts: ["Sıcaklığı", "Işık ve Gösterge", "Basıncı"], ans: 1 }
                        ]
                    }
                },
                { 
                    id: "r3", 
                    title: "Motor ve Harekete Giriş", 
                    points: 100, 
                    content: {
                        text: "Motorlar elektrik enerjisini mekanik hareket enerjisine dönüştürür. DC motor, servo motor ve step motor robotiklerde sık kullanılan türlerdir.",
                        images: ["https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=800"],
                        video: "https://www.youtube.com/embed/example",
                        examples: [
                            "DC Motor: Hızlı sürekli dönüş",
                            "Servo Motor: Kesin açı kontrolü",
                            "Step Motor: Adım adım hareket"
                        ],
                        activityType: "text",
                        activityText: "Bir robot kolu için uygun motor türünü seç ve nedenini açıkla.",
                        quiz: [
                            { q: "Motor ne işlevi gerçekleştirir?", opts: ["Elektrik → Mekanik", "Işık → Elektrik", "Isı → Hareket"], ans: 0 },
                            { q: "Kesin açı kontrolü için hangi motor tercih edilir?", opts: ["DC Motor", "Servo Motor", "Step Motor"], ans: 1 },
                            { q: "Adım adım hareket eden motor hangisidir?", opts: ["DC", "Servo", "Step"], ans: 2 }
                        ]
                    }
                }
            ]
        },

        // --- 2. ELEKTRONIK DEVRELERI ---
        {
            subject: "Elektronik Devreleri",
            lessons: [
                { 
                    id: "e1", 
                    title: "Temel Devre Yasaları", 
                    points: 100, 
                    content: {
                        text: "Ohm Yasası (V=I×R), Kirchhoff Akım Yasası ve Kirchhoff Gerilim Yasası elektrik devrelerinin temelini oluşturur. Bu yasalar devre analizi için kritiktir.",
                        images: ["https://images.unsplash.com/photo-1573933382869-84223ab37268?w=800"],
                        video: "https://www.youtube.com/embed/example",
                        examples: [
                            "V (Gerilim): Elektrik basıncı, birim Volt",
                            "I (Akım): Elektrik akışı, birim Amper",
                            "R (Direnç): Akımı engelleme, birim Ohm"
                        ],
                        activityType: "text",
                        activityText: "12V gerilim ve 10 Ohm direnç için akımı hesapla (Ohm Yasası: I=V/R).",
                        quiz: [
                            { q: "Ohm Yasası hangisidir?", opts: ["V=I+R", "V=I×R", "V=I-R"], ans: 1 },
                            { q: "Akım birim hangisidir?", opts: ["Ohm", "Volt", "Amper"], ans: 2 },
                            { q: "12V ve 4Ω için akım kaç A?", opts: ["2A", "3A", "4A"], ans: 1 }
                        ]
                    }
                },
                { 
                    id: "e2", 
                    title: "Seri ve Paralel Devreler", 
                    points: 100, 
                    content: {
                        text: "Seri devrelerde bileşenler arka arkaya bağlanır (aynı akım). Paralel devrelerde bileşenler yan yana bağlanır (aynı gerilim). Pil kombinasyonları da bu kuralları izler.",
                        images: ["https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=800"],
                        video: "https://www.youtube.com/embed/example",
                        examples: [
                            "Seri: 2 pil 12V + 12V = 24V",
                            "Paralel: Kapasiteyi artırır",
                            "Sensör ağları çoğu paralel bağlanır"
                        ],
                        activityType: "draw",
                        activityText: "Bir pil ve iki LED'in seri ve paralel bağlanmasını gösteren iki devre çiz.",
                        quiz: [
                            { q: "Seri devrede tüm noktada aynı olan nedir?", opts: ["Gerilim", "Akım", "Direnç"], ans: 1 },
                            { q: "Paralel devrede tüm dalda aynı olan nedir?", opts: ["Akım", "Gerilim", "Direnç"], ans: 1 },
                            { q: "12V ve 12V bataryalar seri bağlanırsa sonuç?", opts: ["12V", "24V", "6V"], ans: 1 }
                        ]
                    }
                },
                { 
                    id: "e3", 
                    title: "Dijital Lojik Devreler", 
                    points: 100, 
                    content: {
                        text: "Dijital devreler 0 ve 1 (Açık/Kapalı, Düşük/Yüksek) sinyalleriyle çalışır. AND, OR, NOT gibi kapılar dijital lojik bloğun temelini oluşturur.",
                        images: ["https://images.unsplash.com/photo-1585079542156-e76694c0b4a9?w=800"],
                        video: "https://www.youtube.com/embed/example",
                        examples: [
                            "AND: İkisi de 1 ise çıkış 1",
                            "OR: Biri 1 ise çıkış 1",
                            "NOT: Girişi tersine çevirir"
                        ],
                        activityType: "text",
                        activityText: "AND kapısı için doğruluk tablosu yaz (tüm giriş kombinasyonları).",
                        quiz: [
                            { q: "AND kapısında her iki giriş 1 ise çıkış?", opts: ["0", "1", "Belirsiz"], ans: 1 },
                            { q: "OR kapısında giriş (1,0) ise çıkış?", opts: ["0", "1", "Hatası var"], ans: 1 },
                            { q: "NOT kapısının çıkışı girişin neye eşittir?", opts: ["Aynı", "Tersi", "İki katı"], ans: 1 }
                        ]
                    }
                }
            ]
        },

        // --- 3. MAKINE TASARIMI ---
        {
            subject: "Makine Tasarımı",
            lessons: [
                { 
                    id: "m1", 
                    title: "Basit Makineler", 
                    points: 100, 
                    content: {
                        text: "Basit makineler (kaldıraç, makara, eğik düzlem) kuvvet veya hareketin yönünü değiştirir. Robotik yapılar bu prensipleri kullanır.",
                        images: ["https://images.unsplash.com/photo-1503387762519-52582b742546?w=800"],
                        video: "https://www.youtube.com/embed/example",
                        examples: [
                            "Kaldıraç: Bir nokta etrafında döner",
                            "Makara: Kuvveti yönlendirir",
                            "Eğik Düzlem: Yükü yukarı taşımayı kolaylaştırır"
                        ],
                        activityType: "draw",
                        activityText: "Bir robot kolunun kaldıraç ilkesini kullanan eklemini çiz.",
                        quiz: [
                            { q: "Kaldıracın Mekanik Avantajı Yasası hangisidir?", opts: ["F1×D1 = F2×D2", "F1+D1 = F2+D2", "F1÷D1 = F2÷D2"], ans: 0 },
                            { q: "Eğik düzlem kuvveti nasıl etkileyebilir?", opts: ["Azaltır", "Arttırır", "Değiştirmez"], ans: 1 },
                            { q: "Sabit makara neyi kolaylaştırır?", opts: ["Kuvveti", "Yönü", "Hızı"], ans: 1 }
                        ]
                    }
                },
                { 
                    id: "m2", 
                    title: "Hareket İletim Sistemleri", 
                    points: 100, 
                    content: {
                        text: "Dişli, kasnak-kayış, zincir gibi sistemler rotasyonu veya doğrusal hareketi iletir. Hız oranları tasarımcının kontrol ettiği parametrelerdir.",
                        images: ["https://images.unsplash.com/photo-1581092918092-412a19481cfa?w=800"],
                        video: "https://www.youtube.com/embed/example",
                        examples: [
                            "Dişli: Hızı azaltır, torkü arttırır",
                            "Kasnak-Kayış: Esnek iletim sağlar",
                            "Zincir: Güvenilir güç iletimi"
                        ],
                        activityType: "text",
                        activityText: "Bir robot hızını 2 katına çıkarmak için hangi mekanizmayı değiştirirsin?",
                        quiz: [
                            { q: "Dişli oranı 3:1 ise çıkış hızı nasıl değişir?", opts: ["3 kat artar", "3 kat azalır", "Değişmez"], ans: 1 },
                            { q: "Kasnak-kayış sisteminin avantajı nedir?", opts: ["Güç", "Esneklik", "Basitlik"], ans: 1 },
                            { q: "Motor hızını azaltmak için ne yapılır?", opts: ["Dişli oranı arttır", "Dişli oranı azalt", "Motor değiştir"], ans: 0 }
                        ]
                    }
                },
                { 
                    id: "m3", 
                    title: "Yapısal Malzeme Seçimi", 
                    points: 100, 
                    content: {
                        text: "Robotlarda kullanılan malzeler (Alüminyum, Plastik, Çelik, Karbon Fiber) yapının dayanıklılığını, ağırlığını ve maliyetini etkiler.",
                        images: ["https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=800"],
                        video: "https://www.youtube.com/embed/example",
                        examples: [
                            "Alüminyum: Hafif, uygun fiyatlı",
                            "Çelik: Dayanıklı, ağır",
                            "Karbon Fiber: Hafif, pahalı"
                        ],
                        activityType: "text",
                        activityText: "Uçan bir robot için uygun malzeme seç ve nedenini belirt.",
                        quiz: [
                            { q: "En hafif ancak pahalı malzeme hangisidir?", opts: ["Alüminyum", "Karbon Fiber", "Plastik"], ans: 1 },
                            { q: "En dayanıklı metal hangisidir?", opts: ["Alüminyum", "Çelik", "Bakır"], ans: 1 },
                            { q: "Uygun fiyat-dayanıklılık dengesi hangisinde?", opts: ["Çelik", "Alüminyum", "Karbon"], ans: 1 }
                        ]
                    }
                }
            ]
        }
    ];
}

// ====== 🧠 YAPAY ZEKA UZMANSI MÜFREDAT ======
function getAIUnexpertCurriculum() {
    return [
        // --- 1. LİNEER CEBİR VE MATEMATİK ---
        {
            subject: "Lineer Cebir ve Matematik",
            lessons: [
                { 
                    id: "ai1", 
                    title: "Matrisler ve Vektörler", 
                    points: 100, 
                    content: {
                        text: "Matrisler sayıların dikdörtgen dizileridir. Vektörler tek satır veya sütunlu matrislerdir. Yapay Zeka modellerinde veri, matrislerde depolanır ve işlenir.",
                        images: ["https://images.unsplash.com/photo-1633356122544-f134324ef6db?w=800"],
                        video: "https://www.youtube.com/embed/example",
                        examples: [
                            "Örnek 1: 3×3 Matris 9 elemanı temsil eder",
                            "Örnek 2: Vektör [1, 2, 3] bir yönü gösterir",
                            "Örnek 3: Matris çarpımı: (2×3) × (3×4) = (2×4)"
                        ],
                        activityType: "text",
                        activityText: "(2×3) ve (3×2) matrislerin çarpımının sonuç boyutunu hesapla.",
                        quiz: [
                            { q: "Matris çarpımında sol matrisin sütun sayısı ne olmalı?", opts: ["Rastgele", "Sağ matrisin satır sayısına eşit", "Prime"], ans: 1 },
                            { q: "Vektör kaç boyutludur?", opts: ["1 boyut", "2 boyut", "3 boyut"], ans: 0 },
                            { q: "3×3 matrisin kare matrisi midir?", opts: ["Evet", "Hayır", "Bazen"], ans: 0 }
                        ]
                    }
                },
                { 
                    id: "ai2", 
                    title: "İstatistik Temelleri", 
                    points: 100, 
                    content: {
                        text: "Ortalama, Medyan, Varyans ve Standart Sapma veri dağılımını anlamamıza yardımcı olur. Machine Learning modelleri bu istatistiksel kavramlara dayanır.",
                        images: ["https://images.unsplash.com/photo-1633356122544-f134324ef6db?w=800"],
                        video: "https://www.youtube.com/embed/example",
                        examples: [
                            "Ortalama: Toplam ÷ Eleman sayısı",
                            "Varyans: Verinin ortalamadan ne kadar saçıldığı",
                            "Standart Sapma: Varyansın karekökü"
                        ],
                        activityType: "text",
                        activityText: "[10, 20, 30, 40, 50] veri setinin ortalamasını ve medyanını hesapla.",
                        quiz: [
                            { q: "Ortalama nasıl hesaplanır?", opts: ["Toplam ÷ Sayı", "Max - Min", "Medyan + Mod"], ans: 0 },
                            { q: "Varyans ne ölçer?", opts: ["Merkezi Eğilim", "Veri Dağılımı", "Korelasyon"], ans: 1 },
                            { q: "[1,2,3,4,5] ortalamadan sapması nedir?", opts: ["0", "1.4", "2"], ans: 1 }
                        ]
                    }
                },
                { 
                    id: "ai3", 
                    title: "Olasılık Teorisi", 
                    points: 100, 
                    content: {
                        text: "Olasılık bir olayın gerçekleşme şansıdır (0-1 arasında). Bayes Teoremi ve Koşullu Olasılık yapay zekada kritik kavramlardır.",
                        images: ["https://images.unsplash.com/photo-1555949963-ff9078519b6b?w=800"],
                        video: "https://www.youtube.com/embed/example",
                        examples: [
                            "Bozuk para atma: 0.5 olasılık yazı, 0.5 olasılık tura",
                            "Bayes: P(A|B) = P(B|A) × P(A) / P(B)",
                            "Spam filtreleri Bayes teorisini kullanır"
                        ],
                        activityType: "text",
                        activityText: "Bir hastalığın, pozitif testin verildiğinde gerçek olasılığını (Bayes) hesapla.",
                        quiz: [
                            { q: "Olasılık değer aralığı nedir?", opts: ["0-100", "0-1", "-1 to 1"], ans: 1 },
                            { q: "Bayes Teoremi neyi hesaplar?", opts: ["Toplam Olasılık", "Koşullu Olasılık", "Varyans"], ans: 1 },
                            { q: "Bağımsız iki olayın olasılığı nasıl çarpılır?", opts: ["Toplanır", "Çarpılır", "Çıkarılır"], ans: 1 }
                        ]
                    }
                }
            ]
        },

        // --- 2. VERİ ANALİZİ ---
        {
            subject: "Veri Analizi",
            lessons: [
                { 
                    id: "ai4", 
                    title: "Veri Temizliği ve Ön İşleme", 
                    points: 100, 
                    content: {
                        text: "Gerçek veriler genellikle eksik, yanlış veya uyumsuzdu. Temizleme ve ön işleme adımları modelin başarısını önemli ölçüde etkiler (%80 Veri Bilimleri işi).",
                        images: ["https://images.unsplash.com/photo-1552664730-d307ca884978?w=800"],
                        video: "https://www.youtube.com/embed/example",
                        examples: [
                            "Eksik Değer İmpütasyonu: Ortalama veya medyan kullan",
                            "Outlier Kaldırma: Uç değerleri tespit et",
                            "Normalizasyon: Verileri 0-1 arasına ölçeklendir"
                        ],
                        activityType: "text",
                        activityText: "Veri setinde eksik değerleri handle etmek için 3 yöntem öner.",
                        quiz: [
                            { q: "Veri Bilimi işinin ne kadarı veri hazırlığıdır?", opts: ["20%", "50%", "80%"], ans: 2 },
                            { q: "Outlier nedir?", opts: ["Tipik veri", "Uç değer", "Eksik veri"], ans: 1 },
                            { q: "Normalizasyon neyi hedefler?", opts: ["Ortalama bul", "Verileri ölçeklendir", "Sınıfla"], ans: 1 }
                        ]
                    }
                },
                { 
                    id: "ai5", 
                    title: "Veri Görselleştirme", 
                    points: 100, 
                    content: {
                        text: "Grafikler ve görseller verilerdeki eğilimleri ve ilişkileri hızlıca anlamamıza yardımcı olur. Histogram, Scatter Plot, Heatmap yaygın türlerdir.",
                        images: ["https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800"],
                        video: "https://www.youtube.com/embed/example",
                        examples: [
                            "Histogram: Frekans dağılımı",
                            "Scatter Plot: İki değişken arasındaki ilişki",
                            "Line Plot: Zaman serisindeki trend"
                        ],
                        activityType: "draw",
                        activityText: "[1,2,2,3,3,3,4,4,5] veri setinin histogramını çiz.",
                        quiz: [
                            { q: "Scatter plot ne gösterir?", opts: ["Zaman trendi", "Değişkenler arasındaki ilişki", "Sıklık"], ans: 1 },
                            { q: "Histogram hangi veri türü için iyidir?", opts: ["Kategorik", "Sayısal Dağılım", "Zaman"], ans: 1 },
                            { q: "Heatmap ne için kullanılır?", opts: ["Korelasyon göstermek", "Kategori saymak", "Sıralama"], ans: 0 }
                        ]
                    }
                },
                { 
                    id: "ai6", 
                    title: "Korelasyon ve Regresyon", 
                    points: 100, 
                    content: {
                        text: "Korelasyon iki değişken arasındaki ilişkinin gücünü ölçer (-1 to +1). Regresyon ise bu ilişkiye matematiksel model koyar.",
                        images: ["https://images.unsplash.com/photo-1623451131862-e8e9d60a8063?w=800"],
                        video: "https://www.youtube.com/embed/example",
                        examples: [
                            "Pozitif Korelasyon: Biri artınca diğeri de artar",
                            "Negatif Korelasyon: Biri artınca diğeri azalır",
                            "Lineer Regresyon: y = mx + b modeli"
                        ],
                        activityType: "text",
                        activityText: "Boy ve kilo arasındaki korelasyon pozitif mi negatif midir?",
                        quiz: [
                            { q: "Korelasyon +0.9 ise?", opts: ["Zayıf", "Güçlü Pozitif", "Güçlü Negatif"], ans: 1 },
                            { q: "Lineer regresyon denklemi nedir?", opts: ["y=ax²+b", "y=mx+b", "y=1/x"], ans: 1 },
                            { q: "r = 0 ne anlama gelir?", opts: ["Mükemmel ilişki", "Hiç ilişki", "Zayıf ilişki"], ans: 1 }
                        ]
                    }
                }
            ]
        },

        // --- 3. MAKİNE ÖĞRENMESI ---
        {
            subject: "Makine Öğrenmesi",
            lessons: [
                { 
                    id: "ai7", 
                    title: "Denetimli Öğrenme Temelleri", 
                    points: 100, 
                    content: {
                        text: "Supervised Learning: Etiketlenmiş veri üzerinde model eğitilir. Sınıflandırma (Classification) ve Regresyon (Regression) iki ana türüdür.",
                        images: ["https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800"],
                        video: "https://www.youtube.com/embed/example",
                        examples: [
                            "Sınıflandırma: E-postanın spam olup olmadığını tahmin et",
                            "Regresyon: Bir evin fiyatını tahmin et",
                            "Eğitim Seti: 80%, Test Seti: 20%"
                        ],
                        activityType: "text",
                        activityText: "Bir spam mail algılama sistemini sınıflandırma mı regresyon mu olarak tanımlarsın?",
                        quiz: [
                            { q: "Denetimli öğrenme neye ihtiyaç duyar?", opts: ["Etiketli Veri", "Büyük Veri", "GPU"], ans: 0 },
                            { q: "Sınıflandırma çıkışı nedir?", opts: ["Sayı", "Kategori", "Dizi"], ans: 1 },
                            { q: "Regresyon çıkışı nedir?", opts: ["Kategori", "Sayı/Değer", "Boole"], ans: 1 }
                        ]
                    }
                },
                { 
                    id: "ai8", 
                    title: "Denetimesiz Öğrenme (Clustering)", 
                    points: 100, 
                    content: {
                        text: "Unsupervised Learning: Etiket olmayan veri üzerinde çalışır. K-Means, Hierarchical Clustering gibi algoritmalar benzer verileri gruplandırır.",
                        images: ["https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800"],
                        video: "https://www.youtube.com/embed/example",
                        examples: [
                            "K-Means: Verileri K gruba böler",
                            "Müşteri Segmentasyonu: Alışveriş davranışına göre grup",
                            "Resim Kümeleme: Benzer görselleri bir araya getir"
                        ],
                        activityType: "text",
                        activityText: "K-Means algoritmasında K değerini nasıl seçersin?",
                        quiz: [
                            { q: "Denetimesiz öğrenme neyi ihtiyaç duymaz?", opts: ["Etiket", "Veri", "Bilgisayar"], ans: 0 },
                            { q: "K-Means kaç aşamada çalışır?", opts: ["1", "2", "3+"], ans: 2 },
                            { q: "Clustering sonrası her noktanın ait olduğu şey nedir?", opts: ["Sınıf", "Cluster", "Label"], ans: 1 }
                        ]
                    }
                },
                { 
                    id: "ai9", 
                    title: "Model Değerlendirmesi ve Overfitting", 
                    points: 100, 
                    content: {
                        text: "Modeli değerlendirmek için Accuracy, Precision, Recall, F1-Score kullanılır. Overfitting: Model eğitim verisine çok iyi ama test verisinde başarısız olur.",
                        images: ["https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800"],
                        video: "https://www.youtube.com/embed/example",
                        examples: [
                            "Accuracy: Doğru tahminlerin oranı",
                            "Overfitting: Model aşırı karmaşık",
                            "Çözüm: Regularization, Cross-Validation, Daha fazla veri"
                        ],
                        activityType: "text",
                        activityText: "Eğitim accuracy %95, test accuracy %60 ise ne problemi vardır?",
                        quiz: [
                            { q: "Overfitting ne demektir?", opts: ["Model basit", "Model eğitim verisine çok iyi", "Model başarısız"], ans: 1 },
                            { q: "Overfitting'i azaltmak için ne yapılır?", opts: ["Veri çoğalt", "Model karmaşıklaştır", "Parametre sayısını artır"], ans: 0 },
                            { q: "F1-Score ne ölçer?", opts: ["Doğruluk", "Precision ve Recall dengesi", "Hız"], ans: 1 }
                        ]
                    }
                }
            ]
        }
    ];
}

// ====== 🚀 UZAY MÜHENDİSİ MÜFREDAT ======
function getSpaceEngineerCurriculum() {
    return [
        // --- 1. KLASIK MEKANIK ---
        {
            subject: "Klasik Mekanik",
            lessons: [
                { 
                    id: "sp1", 
                    title: "Newton Kanunları", 
                    points: 100, 
                    content: {
                        text: "Newton'un üç kanunu hareket ve kuvvetin temelini oluşturur. Uzay mühendisliğinde roket hareketini, yörünge hesaplamalarını anlamak bu kanunlara dayanır.",
                        images: ["https://images.unsplash.com/photo-1614730894773-a86973e08b60?w=800"],
                        video: "https://www.youtube.com/embed/example",
                        examples: [
                            "Birinci Kanun: Dinlenme durumundaki cisim harekete, hareketli cisim dinlenmeye karşı koyar",
                            "İkinci Kanun: F = m × a",
                            "Üçüncü Kanun: Her etki için eşit ve zıt tepki vardır"
                        ],
                        activityType: "text",
                        activityText: "Roketin fırlatılmasını Newton'un üçüncü kanunu ile açıkla.",
                        quiz: [
                            { q: "F = m × a hangi kanunu temsil eder?", opts: ["Birinci", "İkinci", "Üçüncü"], ans: 1 },
                            { q: "Roketin fırlaması hangi kanuna dayanır?", opts: ["1.", "2.", "3."], ans: 2 },
                            { q: "20 kg kütle, 5 m/s² ivme → Kuvvet?", opts: ["25N", "100N", "4N"], ans: 1 }
                        ]
                    }
                },
                { 
                    id: "sp2", 
                    title: "Momentum ve İtme", 
                    points: 100, 
                    content: {
                        text: "Momentum = kütle × hız. İtme (thrust) roketlerin hareket etmesini sağlar. Momentum korunumu, çok cisim sistemlerinde kritiktir.",
                        images: ["https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=800"],
                        video: "https://www.youtube.com/embed/example",
                        examples: [
                            "Roket Denklemi: m(dv/dt) = F_thrust - F_drag",
                            "Momentum Korunumu: p_initial = p_final",
                            "Işın Hareketi (Tsiolkovsky): Δv = v_e × ln(m_0/m_f)"
                        ],
                        activityType: "text",
                        activityText: "Başlangıç kütlesi 1000 kg, egzoz hızı 3000 m/s, son kütlesi 100 kg ise Δv?",
                        quiz: [
                            { q: "Momentum formülü hangisidir?", opts: ["p = m/v", "p = m×v", "p = m-v"], ans: 1 },
                            { q: "Roket denklemi neyin değişimini gösterir?", opts: ["Hız", "Yükseklik", "Kütle"], ans: 0 },
                            { q: "Momentum korunumu neyi korur?", opts: ["Enerji", "Toplam Momentum", "Kütle"], ans: 1 }
                        ]
                    }
                },
                { 
                    id: "sp3", 
                    title: "Enerji ve İş", 
                    points: 100, 
                    content: {
                        text: "İş (W) = Kuvvet × Mesafe. Kinetik Enerji = 0.5 × m × v². Potansiyel Enerji = m × g × h. Enerji korunumu uzay kalkışta kritiktir.",
                        images: ["https://images.unsplash.com/photo-1446776877081-d282a0f896e2?w=800"],
                        video: "https://www.youtube.com/embed/example",
                        examples: [
                            "Roketin kalkması: Kimyasal enerji → Kinetik enerji",
                            "Uydu yörüngesi: Potansiyel enerji + Kinetik enerji = Sabit",
                            "Kaçış Hızı: v_esc = √(2GM/R)"
                        ],
                        activityType: "text",
                        activityText: "Dünya yüzeyinden kaçış hızını hesapla (G, M, R değerlerini ara).",
                        quiz: [
                            { q: "Kinetik Enerji formülü hangisidir?", opts: ["KE = m×g×h", "KE = 0.5×m×v²", "KE = F×d"], ans: 1 },
                            { q: "Potansiyel enerji neye bağlıdır?", opts: ["Hız", "Yükseklik", "Kütle"],ans: 1 },
                            { q: "Enerji korunumunda toplam neler sabit?", opts: ["Kütle", "Momentum", "Mekanik Enerji"], ans: 2 }
                        ]
                    }
                }
            ]
        },

        // --- 2. ASTROFIZIK ---
        {
            subject: "Astrofizik",
            lessons: [
                { 
                    id: "sp4", 
                    title: "Yıldız ve Evren", 
                    points: 100, 
                    content: {
                        text: "Yıldızlar Hidrojeni Helyuma dönüştüren nükleer reaktörlerdir. Evren sürekli genişlemektedir. Kara delikler sonsuz yoğunluğa sahip nesnelerdir.",
                        images: ["https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=800"],
                        video: "https://www.youtube.com/embed/example",
                        examples: [
                            "Güneş: Ana dönem yıldızı, 5 milyar yıl ömrü",
                            "Karadelik: Işığın bile kaçamadığı alan",
                            "Big Bang: Evrenin başlangıcı 13.8 milyar yıl önce"
                        ],
                        activityType: "text",
                        activityText: "Bir yıldızın yaşam döngüsünü (Kızıl Dev, Beyaz Cüce vb.) açıkla.",
                        quiz: [
                            { q: "Yıldızlar ne reaksiyonunda enerji üretir?", opts: ["Elektrik", "Nükleer Füzyon", "Kimyasal"], ans: 1 },
                            { q: "Evren nasıl gelişiyor?", opts: ["Küçülüyor", "Genişliyor", "Sabit"], ans: 1 },
                            { q: "Karadeliğin özelliği nedir?", opts: ["Çok sıcak", "Işık kaçamaz", "Yavaş dönüş"], ans: 1 }
                        ]
                    }
                },
                { 
                    id: "sp5", 
                    title: "Gezegen ve Sistem Bilimi", 
                    points: 100, 
                    content: {
                        text: "Gezegenler yıldızların etrafında döner. Habitable Zone: Su sıvı halde kalabileceği bölge. Exoplanet arayışı yaşam bulunabilir yerleri hedefler.",
                        images: ["https://images.unsplash.com/photo-1444080748397-f442aa95c3e5?w=800"],
                        video: "https://www.youtube.com/embed/example",
                        examples: [
                            "Kepler-452b: Dünya benzeri exoplanet",
                            "Habitable Zone: Dünyadan 0.95-1.37 AU mesafe",
                            "Exoplanet Keşif: Transit metodu, Radyal hız metodu"
                        ],
                        activityType: "draw",
                        activityText: "Bir yıldız sistemini çiz (Güneş, gezegenler, habitable zone).",
                        quiz: [
                            { q: "Habitable Zone nedir?", opts: ["Çok sıcak bölge", "Su sıvı halde olabilir bölge", "Karadelik"], ans: 1 },
                            { q: "Exoplanet nasıl keşfedilir?", opts: ["Doğrudan görme", "Transit metodu", "Radyo"], ans: 1 },
                            { q: "Dünya Habitable Zone'da mıdır?", opts: ["Evet", "Hayır", "Bilinmiyor"], ans: 0 }
                        ]
                    }
                },
                { 
                    id: "sp6", 
                    title: "Astronomi Gözlemleri", 
                    points: 100, 
                    content: {
                        text: "Teleskoplar EM spektrumun farklı bölgelerinde gözlem yapar. Spektroskopi maddenin bileşimini öğrenmeye yarar. Işık-yılı uzaklık ölçer.",
                        images: ["https://images.unsplash.com/photo-1462331940975-27fcf0a46f1b?w=800"],
                        video: "https://www.youtube.com/embed/example",
                        examples: [
                            "Hubble Teleskop: Görünür ve UV ışık",
                            "Spektroskopi: Yıldızın sıcaklığı, bileşimi belirlenir",
                            "Işık-yılı: Işığın 1 yılda gittiği mesafe"
                        ],
                        activityType: "text",
                        activityText: "Proxima Centauri 4.24 ışık-yılı uzakta. Bu kaç km?",
                        quiz: [
                            { q: "Işık-yılı ne ölçer?", opts: ["Zaman", "Uzaklık", "Kütlettir"], ans: 1 },
                            { q: "Spektroskopi neyi belirler?", opts: ["Renkni", "Sıcaklığı ve Bileşimi", "Hızını"], ans: 1 },
                            { q: "1 ışık-yılı yaklaşık kaç km?", opts: ["9.46×10¹², "3×10⁸", "6.37×10⁶"], ans: 0 }
                        ]
                    }
                }
            ]
        },

        // --- 3. YÖRÜNGE MEKANİĞİ ---
        {
            subject: "Yörünge Mekaniği",
            lessons: [
                { 
                    id: "sp7", 
                    title: "Kepler Kanunları", 
                    points: 100, 
                    content: {
                        text: "Kepler'in 3 kanunu gezegen hareketini tanımlar. Çoğu uydu ve uzay istasyonu bu kanunlara uyar. Yörünge tasarımında temel referanstır.",
                        images: ["https://images.unsplash.com/photo-1446776877081-d282a0f896e2?w=800"],
                        video: "https://www.youtube.com/embed/example",
                        examples: [
                            "1. Kanun: Yörüngeler elips şeklindedir",
                            "2. Kanun: Eşit zamanda eşit alan taranır",
                            "3. Kanun: T² ∝ a³ (Periyot, Yarı-büyük eksen)"
                        ],
                        activityType: "text",
                        activityText: "Yarı-büyük ekseni 2 AU olan bir gezegen periyodu kaç yıl?",
                        quiz: [
                            { q: "Kepler 1. Kanunu ne der?", opts: ["Dairesel", "Elips şeklinde", "Rastgele"], ans: 1 },
                            { q: "T² ∝ a³ hangisinin kanunudur?", opts: ["1.", "2.", "3."], ans: 2 },
                            { q: "a=1 AU ise T=?", opts: ["1 yıl", "2 yıl", "Hesaplanamaz"], ans: 0 }
                        ]
                    }
                },
                { 
                    id: "sp8", 
                    title: "Uydu Yörüngeleri", 
                    points: 100, 
                    content: {
                        text: "Uyduların farklı yörüngeleri farklı görevleri yerine getirir. LEO (Düşük Dünya Yörüngesi), GEO (Sabit Yörünge), Polar Yörünge. Her birinin avantajları vardır.",
                        images: ["https://images.unsplash.com/photo-1446776877081-d282a0f896e2?w=800"],
                        video: "https://www.youtube.com/embed/example",
                        examples: [
                            "LEO: 200-2000 km yükseklik, Hızlı geçiş",
                            "GEO: 35,786 km, Sabit konumda kalır",
                            "ISS: 408 km, 90 dakika periyot"
                        ],
                        activityType: "text",
                        activityText: "Hava durumu uydusu için hangi yörünge en iyi olur?",
                        quiz: [
                            { q: "GEO uydu kaç km yükseklikte?", opts: ["400 km", "2000 km", "35,786 km"], ans: 2 },
                            { q: "LEO uydu kaç dakikada Dünya'yı dolanır?", opts: ["24 saat", "90 dakika", "12 saat"], ans: 1 },
                            { q: "GEO uydu neden sabit görünür?", opts: ["Sabit kütlesi", "Periyodu 24 saat", "Motor vardır"], ans: 1 }
                        ]
                    }
                },
                { 
                    id: "sp9", 
                    title: "Yörünge Transferi ve Manipülasyon", 
                    points: 100, 
                    content: {
                        text: "Hohmann Transferi: Minimum enerjili yörünge değişim manövrasıdır. Uzay sondaları ve uyduları farklı yörüngelere taşımak için kullanılır.",
                        images: ["https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=800"],
                        video: "https://www.youtube.com/embed/example",
                        examples: [
                            "Hohmann Transfer: 2 dairesel yörünge arasında eliptik bağlantı",
                            "Transfer zamanı: T = π√(a³/μ)",
                            "Mars Misyonu: Hohmann transferi ~9 ay"
                        ],
                        activityType: "text",
                        activityText: "LEO'dan GEO'ya Hohmann transferinde kaç apora ihtiyaç vardır?",
                        quiz: [
                            { q: "Hohmann Transferinin avantajı nedir?", opts: ["Hızlı", "Minimum enerji", "Güvenli"], ans: 1 },
                            { q: "Mars'a Hohmann transferi kaç ay?", opts: ["3", "6", "9"], ans: 2 },
                            { q: "Transfer yörüngesi hangi şekildedir?", opts: ["Dairesel", "Eliptik", "Parabolik"], ans: 1 }
                        ]
                    }
                }
            ]
        }
    ];
}

// BAŞLAT
loadCareerCurriculum();
