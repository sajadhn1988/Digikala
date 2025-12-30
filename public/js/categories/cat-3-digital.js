if (!window.categories) window.categories = [];
window.categories.push({
    id: "cat-3",
    name: "کالای دیجیتال",
    icon: "fas fa-hdd",
    image: "uploads/images/categories/cat-3.jpg",
    subcategories: [
        {
            id: "sub-3-1",
            name: "کامپیوتر و تجهیزات",
            microcategories: [
                { id: "micro-3-1-1", name: "سیستم‌عامل" },
                { id: "micro-3-1-2", name: "نرم‌افزار" },
                {
                    id: "micro-3-1-3",
                    name: "سخت‌افزار",
                    nanocategories: [
                        {
                            id: "nano-3-1-3-1",
                            name: "قطعات اصلی کامپیوتر",
                            picocategories: [
                                { id: "pico-3-1-3-1-1", name: "رم (RAM)" },
                                { id: "pico-3-1-3-1-2", name: "مادربرد (Motherboard)" },
                                { id: "pico-3-1-3-1-3", name: "پردازنده (CPU)" },
                                { id: "pico-3-1-3-1-4", name: "کارت گرافیک (GPU)" },
                                { id: "pico-3-1-3-1-5", name: "منبع تغذیه (PSU)" },
                                { id: "pico-3-1-3-1-6", name: "کیس (Case)" },
                                { id: "pico-3-1-3-1-7", name: "هارد دیسک (HDD)" },
                                { id: "pico-3-1-3-1-8", name: "حافظه SSD" },
                                { id: "pico-3-1-3-1-9", name: "خنک‌کننده CPU" },
                                { id: "pico-3-1-3-1-10", name: "کارت صدا" },
                                { id: "pico-3-1-3-1-11", name: "کارت شبکه" }
                            ]
                        },
                        {
                            id: "nano-3-1-3-2",
                            name: "لوازم جانبی کامپیوتر",
                            picocategories: [
                                { id: "pico-3-1-3-2-1", name: "ماوس (Mouse)" },
                                { id: "pico-3-1-3-2-2", name: "کیبورد (Keyboard)" },
                                { id: "pico-3-1-3-2-3", name: "مانیتور (Monitor)" },
                                { id: "pico-3-1-3-2-4", name: "وب‌کم (Webcam)" },
                                { id: "pico-3-1-3-2-5", name: "میکروفون (Microphone)" },
                                { id: "pico-3-1-3-2-6", name: "اسپیکر (Speaker)" },
                                { id: "pico-3-1-3-2-7", name: "کول پد (Cooling Pad)" },
                                { id: "pico-3-1-3-2-8", name: "داکینگ استیشن" },
                                { id: "pico-3-1-3-2-9", name: "کیف و کاور" },
                                { id: "pico-3-1-3-2-10", name: "پد ماوس" }
                            ]
                        },
                        {
                            id: "nano-3-1-3-3",
                            name: "کابل‌ها و اتصالات",
                            picocategories: [
                                { id: "pico-3-1-3-3-1", name: "کابل HDMI" },
                                { id: "pico-3-1-3-3-2", name: "کابل DisplayPort" },
                                { id: "pico-3-1-3-3-3", name: "کابل USB" },
                                { id: "pico-3-1-3-3-4", name: "کابل شبکه" },
                                { id: "pico-3-1-3-3-5", name: "سوکت و تبدیل‌کننده" },
                                { id: "pico-3-1-3-3-6", name: "هاب USB" },
                                { id: "pico-3-1-3-3-7", name: "کابل برق" }
                            ]
                        },
                        {
                            id: "nano-3-1-3-4",
                            name: "خنک‌کننده و نورپردازی",
                            picocategories: [
                                { id: "pico-3-1-3-4-1", name: "فن کیس" },
                                { id: "pico-3-1-3-4-2", name: "رادیاتور آب" },
                                { id: "pico-3-1-3-4-3", name: "خمیر حرارتی" },
                                { id: "pico-3-1-3-4-4", name: "نوار LED RGB" },
                                { id: "pico-3-1-3-4-5", name: "کنترلر RGB" },
                                { id: "pico-3-1-3-4-6", name: "فن‌های RGB" }
                            ]
                        },
                        {
                            id: "nano-3-1-3-5",
                            name: "ذخیره‌سازی و پشتیبان‌گیری",
                            picocategories: [
                                { id: "pico-3-1-3-5-1", name: "هارد اکسترنال" },
                                { id: "pico-3-1-3-5-2", name: "فلش مموری" },
                                { id: "pico-3-1-3-5-3", name: "کارت حافظه" },
                                { id: "pico-3-1-3-5-4", name: "درایو نوری" },
                                { id: "pico-3-1-3-5-5", name: "NAS" },
                                { id: "pico-3-1-3-5-6", name: "داک هارد" }
                            ]
                        }
                    ]
                },
            ],
        },
        {
            id: "sub-3-2",
            name: "کنسول بازی",
            microcategories: [
                { id: "micro-3-2-1", name: "کنسول خانگی" },
                { id: "micro-3-2-2", name: "کنسول پرتابل" },
                { id: "micro-3-2-3", name: "لوازم جانبی کنسول" },
            ],
        },
    ],
});

window.categoryFilters = window.categoryFilters || {};
window.categoryFilters["cat-3"] = {
    "sub-3-1": { // کامپیوتر و تجهیزات
        filters: [
            {
                id: "brand",
                name: "برند",
                type: "checkbox",
                options: [
                    { label: "سامسونگ (Samsung)", value: "Samsung" },
                    { label: "ایسوس (Asus)", value: "Asus" },
                    { label: "لاجیتک (Logitech)", value: "Logitech" },
                    { label: "وسترن دیجیتال (WD)", value: "WD" },
                    { label: "ای‌دیتا (ADATA)", value: "ADATA" },
                    { label: "ریزر (Razer)", value: "Razer" },
                    { label: "شیائومی (Xiaomi)", value: "Xiaomi" },
                ]
            },
            {
                id: "type",
                name: "نوع محصول",
                type: "checkbox",
                options: [
                    { label: "مانیتور", value: "Monitor" },
                    { label: "هارد و اس‌اس‌دی", value: "Storage" },
                    { label: "ماوس و کیبورد", value: "Input" },
                    { label: "قطعات اصلی", value: "Component" },
                    { label: "دوربین و وب‌کم", value: "Camera" },
                    { label: "تجهیزات صدا", value: "Audio" },
                ]
            },
            {
                id: "connectivity",
                name: "نوع اتصال",
                type: "checkbox",
                options: [
                    { label: "بی‌سیم", value: "Wireless" },
                    { label: "باسیم", value: "Wired" },
                    { label: "بلوتوث", value: "Bluetooth" },
                ]
            }
        ]
    },
    "sub-3-2": { // کنسول بازی
        filters: [
            {
                id: "brand",
                name: "برند",
                type: "checkbox",
                options: [
                    { label: "سونی (Sony)", value: "Sony" },
                    { label: "مایکروسافت (Microsoft)", value: "Microsoft" },
                    { label: "نینتندو (Nintendo)", value: "Nintendo" },
                    { label: "استیم (Valve)", value: "Valve" },
                ]
            },
            {
                id: "consoleType",
                name: "نوع کنسول",
                type: "checkbox",
                options: [
                    { label: "کنسول خانگی", value: "Home" },
                    { label: "کنسول دستی/پرتابل", value: "Handheld" },
                ]
            },
            {
                id: "storage",
                name: "ظرفیت حافظه",
                type: "checkbox",
                options: [
                    { label: "۶۴ گیگابایت", value: "64" },
                    { label: "۲۵۶ گیگابایت", value: "256" },
                    { label: "۵۱۲ گیگابایت", value: "512" },
                    { label: "۸۲۵ گیگابایت", value: "825" },
                    { label: "۱ ترابایت", value: "1024" },
                    { label: "۲ ترابایت", value: "2048" },
                ]
            },
            {
                id: "resolution",
                name: "حداکثر دقت تصویر",
                type: "checkbox",
                options: [
                    { label: "4K (Ultra HD)", value: "4K" },
                    { label: "1080p (Full HD)", value: "FullHD" },
                    { label: "8K Support", value: "8K" },
                ]
            }
        ]
    }
};
