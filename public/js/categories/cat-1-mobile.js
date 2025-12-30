if (!window.categories) window.categories = [];
window.categories.push({
    id: "cat-1",
    name: "موبایل",
    icon: "fas fa-mobile-alt",
    image: "uploads/images/categories/cat-1.jpg",
    subcategories: [
        {
            id: "sub-1-1",
            name: "گوشی موبایل",
            enName: "cellphone",
            microcategories: [
                { id: "micro-1-1-1", name: "اندروید" },
                { id: "micro-1-1-2", name: "iOS" },
                { id: "micro-1-1-3", name: "هوشمند" },
            ],
        },
        {
            id: "sub-1-2",
            name: "لوازم جانبی موبایل",
            enName: "accessory",
            microcategories: [
                { id: "micro-1-2-1", name: "کاور" },
                { id: "micro-1-2-2", name: "گلس" },
                { id: "micro-1-2-3", name: "پاوربانک" },
                { id: "micro-1-2-4", name: "کابل" },
            ],
        },
        {
            id: "sub-1-3",
            name: "گجت‌های هوشمند",
            enName: "smart-gadget",
            microcategories: [
                { id: "micro-1-3-1", name: "ساعت هوشمند" },
                { id: "micro-1-3-2", name: "مچ‌بند هوشمند" },
            ],
        },
    ],
});

// Category-specific filters configuration
if (!window.categoryFilters) window.categoryFilters = {};
window.categoryFilters["cat-1"] = {
    "sub-1-1": {
        filters: [
            {
                id: "color",
                name: "رنگ",
                type: "checkbox",
                options: [
                    { label: "مشکی", value: "Black" },
                    { label: "سفید", value: "White" },
                    { label: "آبی", value: "Blue" },
                    { label: "طلایی", value: "Gold" },
                    { label: "نقره‌ای", value: "Silver" }
                ]
            },
            {
                id: "network",
                name: "شبکه‌های مخابراتی",
                type: "checkbox",
                options: [
                    { label: "2G", value: "2G" },
                    { label: "3G", value: "3G" },
                    { label: "4G", value: "4G" },
                    { label: "5G", value: "5G" }
                ]
            },
            {
                id: "simCard",
                name: "تعداد سیم کارت",
                type: "checkbox",
                options: [
                    { label: "یک عدد", value: "Single" },
                    { label: "دو عدد", value: "Dual" },
                    { label: "سه عدد و بیشتر", value: "Triple" }
                ]
            },
            {
                id: "sd_card",
                name: "پشتیبانی از کارت حافظه",
                type: "checkbox",
                options: [
                    { label: "دارد", value: "Yes" },
                    { label: "ندارد", value: "No" }
                ]
            },
            {
                id: "operatingSystem",
                name: "سیستم عامل",
                type: "checkbox",
                options: [
                    { label: "Android", value: "Android" },
                    { label: "iOS", value: "iOS" },
                    { label: "سایر", value: "Other" }
                ]
            },
            {
                id: "sensors",
                name: "حس‌گرها",
                type: "checkbox",
                options: [
                    { label: "اثر انگشت", value: "Fingerprint" },
                    { label: "تشخیص چهره", value: "FaceID" },
                    { label: "ژیروسکوپ", value: "Gyroscope" },
                    { label: "شتاب‌سنج", value: "Accelerometer" }
                ]
            },
            {
                id: "sim_type",
                name: "نوع سیم کارت",
                type: "checkbox",
                options: [
                    { label: "سایز نانو (8.8 × 12.3 میلی‌متر)", value: "Nano" },
                    { label: "سایز میکرو (12 × 15 میلی‌متر)", value: "Micro" }
                ]
            },
            {
                id: "gps",
                name: "تکنولوژی‌های مکان‌یابی",
                type: "checkbox",
                options: [
                    { label: "A-GPS", value: "A-GPS" },
                    { label: "GLONASS", value: "GLONASS" },
                    { label: "GALILEO", value: "GALILEO" },
                    { label: "BDS", value: "BDS" }
                ]
            },
            {
                id: "rear_cameras",
                name: "تعداد دوربین‌های پشت گوشی",
                type: "checkbox",
                options: [
                    { label: "1 ماژول دوربین", value: "1" },
                    { label: "2 ماژول دوربین", value: "2" },
                    { label: "3 ماژول دوربین", value: "3" },
                    { label: "4 ماژول دوربین", value: "4" }
                ]
            },
            {
                id: "screenSize",
                name: "بازه‌ اندازه صفحه نمایش",
                type: "checkbox",
                options: [
                    { label: "تا 3.0 اینچ", value: "upto3" },
                    { label: "3.0 تا 4.0 اینچ", value: "3to4" },
                    { label: "4.0 تا 5.0 اینچ", value: "4to5" },
                    { label: "5.0 تا 6.0 اینچ", value: "5to6" },
                    { label: "6.0 اینچ و بزرگتر", value: "6plus" }
                ]
            },
            {
                id: "focus_tech",
                name: "فناوری فوکوس",
                type: "checkbox",
                options: [
                    { label: "Auto Focus", value: "AF" },
                    { label: "Phase Detection", value: "PDAF" },
                    { label: "Laser AF", value: "Laser" }
                ]
            },
            {
                id: "chargingPort",
                name: "درگاه‌ها و فناوری‌های ارتباطی",
                type: "checkbox",
                options: [
                    { label: "USB Type-C", value: "Type-C" },
                    { label: "Lightning", value: "Lightning" },
                    { label: "microUSB", value: "microUSB" },
                    { label: "Jack 3.5mm", value: "Jack" }
                ]
            },
            {
                id: "screen_tech",
                name: "فناوری صفحه‌ نمایش",
                type: "checkbox",
                options: [
                    { label: "AMOLED", value: "AMOLED" },
                    { label: "Super AMOLED", value: "SuperAMOLED" },
                    { label: "IPS", value: "IPS" },
                    { label: "OLED", value: "OLED" }
                ]
            },
            {
                id: "charging",
                name: "قابلیت‌های شارژ",
                type: "checkbox",
                options: [
                    { label: "شارژ سریع", value: "Fast" },
                    { label: "شارژ بی‌سیم", value: "Wireless" },
                    { label: "شارژ معکوس", value: "Reverse" }
                ]
            },
            {
                id: "phone_type",
                name: "نوع گوشی موبایل",
                type: "checkbox",
                options: [
                    { label: "هوشمند", value: "Smartphone" },
                    { label: "کلاسیک", value: "Classic" },
                    { label: "تاشو", value: "Foldable" }
                ]
            },
            {
                id: "storage",
                name: "حافظه داخلی",
                type: "checkbox",
                options: [
                    { label: "32 گیگابایت", value: "32" },
                    { label: "64 گیگابایت", value: "64" },
                    { label: "128 گیگابایت", value: "128" },
                    { label: "256 گیگابایت", value: "256" },
                    { label: "512 گیگابایت", value: "512" },
                    { label: "1 ترابایت", value: "1024" }
                ]
            },
            {
                id: "camera",
                name: "رزولوشن دوربین اصلی",
                type: "checkbox",
                options: [
                    { label: "تا 12 مگاپیکسل", value: "12" },
                    { label: "13 تا 24 مگاپیکسل", value: "24" },
                    { label: "25 تا 48 مگاپیکسل", value: "48" },
                    { label: "48 تا 64 مگاپیکسل", value: "64" },
                    { label: "بالای 100 مگاپیکسل", value: "108" }
                ]
            },
            {
                id: "refresh_rate",
                name: "محدوده نرخ بروزرسانی تصویر",
                type: "checkbox",
                options: [
                    { label: "60 هرتز", value: "60Hz" },
                    { label: "90 هرتز", value: "90Hz" },
                    { label: "120 هرتز", value: "120Hz" },
                    { label: "144 هرتز", value: "144Hz" }
                ]
            },
            {
                id: "weight",
                name: "محدوده وزنی",
                type: "checkbox",
                options: [
                    { label: "كمتر از 150 گرم", value: "under150" },
                    { label: "150 تا 200 گرم", value: "150to200" },
                    { label: "بیش از 200 گرم", value: "over200" }
                ]
            },
            {
                id: "ram",
                name: "مقدار RAM",
                type: "checkbox",
                options: [
                    { label: "2 گیگابایت", value: "2" },
                    { label: "4 گیگابایت", value: "4" },
                    { label: "6 گیگابایت", value: "6" },
                    { label: "8 گیگابایت", value: "8" },
                    { label: "12 گیگابایت", value: "12" },
                    { label: "16 گیگابایت", value: "16" }
                ]
            },
            {
                id: "batteryCapacity",
                name: "محدوده ظرفیت باتری",
                type: "checkbox",
                options: [
                    { label: "تا 3000 میلی‌آمپر", value: "upto3000" },
                    { label: "3000 تا 4000 میلی‌آمپر", value: "3000to4000" },
                    { label: "4000 تا 5000 میلی‌آمپر", value: "4000to5000" },
                    { label: "بیش از 5000 میلی‌آمپر", value: "over5000" }
                ]
            },
            {
                id: "screen_protection",
                name: "نوع محافظ صفحه نمایش گوشی",
                type: "checkbox",
                options: [
                    { label: "Gorilla Glass", value: "Gorilla" },
                    { label: "Ceramic Shield", value: "Ceramic" },
                    { label: "Dragontrail", value: "Dragontrail" }
                ]
            },
            {
                id: "protection_features",
                name: "قابلیت‌های مقاومتی",
                type: "checkbox",
                options: [
                    { label: "مقاوم در برابر آب", value: "Waterproof" },
                    { label: "مقاوم در برابر گرد و غبار", value: "Dustproof" },
                    { label: "ضد ضربه", value: "Shockproof" }
                ]
            },
            {
                id: "region",
                name: "ریجن",
                type: "checkbox",
                options: [
                    { label: "پک چین", value: "China" },
                    { label: "پک هند", value: "India" },
                    { label: "پک ویتنام", value: "Vietnam" },
                    { label: "پک اروپا", value: "Global" }
                ]
            }
        ]
    },
    "sub-1-2": {
        filters: [
            {
                id: "brand",
                name: "برند",
                type: "checkbox",
                options: [
                    { label: "سامسونگ (Samsung)", value: "Samsung" },
                    { label: "شیائومی (Xiaomi)", value: "Xiaomi" },
                    { label: "اپل (Apple)", value: "Apple" },
                    { label: "آنکر (Anker)", value: "Anker" },
                    { label: "باسئوس (Baseus)", value: "Baseus" }
                ]
            },
            {
                id: "accessoryType",
                name: "نوع لوازم جانبی",
                type: "checkbox",
                options: [
                    { label: "کاور", value: "case" },
                    { label: "گلس", value: "screenProtector" },
                    { label: "پاوربانک", value: "powerbank" },
                    { label: "کابل", value: "cable" }
                ]
            },
            {
                id: "color",
                name: "رنگ",
                type: "checkbox",
                options: [
                    { label: "مشکی", value: "Black" },
                    { label: "سفید", value: "White" },
                    { label: "آبی", value: "Blue" },
                    { label: "قرمز", value: "Red" },
                    { label: "شفاف", value: "Clear" }
                ]
            },
            {
                id: "compatibility",
                name: "سازگاری",
                type: "checkbox",
                options: [
                    { label: "iPhone", value: "iPhone" },
                    { label: "Samsung", value: "Samsung" },
                    { label: "Xiaomi", value: "Xiaomi" },
                    { label: "Universal", value: "Universal" }
                ]
            }
        ]
    },
    "sub-1-3": {
        filters: [
            {
                id: "brand",
                name: "برند",
                type: "checkbox",
                options: [
                    { label: "اپل (Apple)", value: "Apple" },
                    { label: "سامسونگ (Samsung)", value: "Samsung" },
                    { label: "شیائومی (Xiaomi)", value: "Xiaomi" },
                    { label: "هوآوی (Huawei)", value: "Huawei" }
                ]
            },
            {
                id: "screenType",
                name: "نوع صفحه نمایش",
                type: "checkbox",
                options: [
                    { label: "OLED", value: "OLED" },
                    { label: "AMOLED", value: "AMOLED" },
                    { label: "IPS", value: "IPS" }
                ]
            },
            {
                id: "color",
                name: "رنگ",
                type: "checkbox",
                options: [
                    { label: "مشکی", value: "Black" },
                    { label: "نقره‌ای", value: "Silver" },
                    { label: "طلایی", value: "Gold" },
                    { label: "سرمه‌ای", value: "Midnight" }
                ]
            },
            {
                id: "operatingSystem",
                name: "سازگار با سیستم عامل",
                type: "checkbox",
                options: [
                    { label: "Android", value: "Android" },
                    { label: "iOS", value: "iOS" },
                    { label: "هر دو", value: "Both" }
                ]
            }
        ]
    }
};
