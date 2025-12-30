
if (!window.categories) window.categories = [];
window.categories.push({
    id: "cat-2",
    name: "لپ‌تاپ",
    icon: "fas fa-laptop",
    image: "uploads/images/categories/cat-2.jpg",
    subcategories: [
        {
            id: "sub-2-1",
            name: "لپ‌تاپ‌های معمولی",
            microcategories: [
                { id: "micro-2-1-1", name: "گیمینگ" },
                { id: "micro-2-1-2", name: "اداری" },
                { id: "micro-2-1-3", name: "طراحی" },
            ],
        },
        {
            id: "sub-2-2",
            name: "لوازم جانبی لپ‌تاپ",
            microcategories: [
                { id: "micro-2-2-1", name: "ماوس" },
                { id: "micro-2-2-2", name: "کیبورد" },
                { id: "micro-2-2-3", name: "کول پد" },
            ],
        },
    ],
});

window.categoryFilters = window.categoryFilters || {};
window.categoryFilters["cat-2"] = {
    "sub-2-1": { // لپ‌تاپ‌های معمولی
        filters: [
            {
                id: "brand",
                name: "برند",
                type: "checkbox",
                options: [
                    { label: "ایسوس (Asus)", value: "Asus" },
                    { label: "اپل (Apple)", value: "Apple" },
                    { label: "لنوو (Lenovo)", value: "Lenovo" },
                    { label: "اچ‌پی (HP)", value: "HP" },
                    { label: "دل (Dell)", value: "Dell" },
                    { label: "ایسر (Acer)", value: "Acer" },
                    { label: "مایکروسافت (Microsoft)", value: "Microsoft" },
                ]
            },
            {
                id: "processor",
                name: "سری پردازنده",
                type: "checkbox",
                options: [
                    { label: "Intel Core i9", value: "Intel i9" },
                    { label: "Intel Core i7", value: "Intel i7" },
                    { label: "Intel Core i5", value: "Intel i5" },
                    { label: "Intel Core i3", value: "Intel i3" },
                    { label: "Apple M1", value: "Apple M1" },
                    { label: "Apple M2", value: "Apple M2" },
                    { label: "Apple M3", value: "Apple M3" },
                    { label: "AMD Ryzen 9", value: "AMD Ryzen 9" },
                    { label: "AMD Ryzen 7", value: "AMD Ryzen 7" },
                    { label: "AMD Ryzen 5", value: "AMD Ryzen 5" },
                ]
            },
            {
                id: "ram",
                name: "ظرفیت حافظه RAM",
                type: "checkbox",
                options: [
                    { label: "۴ گیگابایت", value: "4" },
                    { label: "۸ گیگابایت", value: "8" },
                    { label: "۱۶ گیگابایت", value: "16" },
                    { label: "۳۲ گیگابایت", value: "32" },
                    { label: "۶۴ گیگابایت", value: "64" },
                ]
            },
            {
                id: "storageType",
                name: "نوع حافظه داخلی",
                type: "checkbox",
                options: [
                    { label: "SSD", value: "SSD" },
                    { label: "HDD", value: "HDD" },
                    { label: "Hybrid", value: "Hybrid" },
                ]
            },
            {
                id: "storageCapacity",
                name: "ظرفیت حافظه داخلی",
                type: "checkbox",
                options: [
                    { label: "۱۲۸ گیگابایت", value: "128" },
                    { label: "۲۵۶ گیگابایت", value: "256" },
                    { label: "۵۱۲ گیگابایت", value: "512" },
                    { label: "۱ ترابایت", value: "1024" },
                    { label: "۲ ترابایت", value: "2048" },
                ]
            },
            {
                id: "gpu",
                name: "سازنده پردازنده گرافیکی",
                type: "checkbox",
                options: [
                    { label: "NVIDIA", value: "NVIDIA" },
                    { label: "AMD", value: "AMD" },
                    { label: "Intel", value: "Intel" },
                    { label: "Apple", value: "Apple" },
                ]
            },
            {
                id: "screenSize",
                name: "اندازه صفحه نمایش",
                type: "checkbox",
                options: [
                    { label: "۱۳ اینچ و کمتر", value: "13" },
                    { label: "۱۴ اینچ", value: "14" },
                    { label: "۱۵.۶ اینچ", value: "15.6" },
                    { label: "۱۷ اینچ و بالاتر", value: "17" },
                ]
            },
            {
                id: "screenResolution",
                name: "دقت صفحه نمایش",
                type: "checkbox",
                options: [
                    { label: "HD", value: "HD" },
                    { label: "Full HD", value: "FullHD" },
                    { label: "2K", value: "2K" },
                    { label: "4K", value: "4K" },
                    { label: "Retina", value: "Retina" },
                ]
            },
            {
                id: "operatingSystem",
                name: "سیستم عامل",
                type: "checkbox",
                options: [
                    { label: "Windows", value: "Windows" },
                    { label: "macOS", value: "macOS" },
                    { label: "Linux", value: "Linux" },
                    { label: "None (Dos)", value: "Dos" },
                ]
            },
            {
                id: "usage",
                name: "طبقه‌بندی کاربردی",
                type: "checkbox",
                options: [
                    { label: "گیمینگ", value: "Gaming" },
                    { label: "صنعتی و اداری", value: "Office" },
                    { label: "طراحی و مالتی‌مدیا", value: "Design" },
                    { label: "کاربری عمومی", value: "General" },
                    { label: "باریک و سبک", value: "Ultrabook" },
                ]
            }
        ]
    },
    "sub-2-2": { // لوازم جانبی لپ‌تاپ
        filters: [
            {
                id: "brand",
                name: "برند",
                type: "checkbox",
                options: [
                    { label: "ایسوس (Asus)", value: "Asus" },
                    { label: "لاجیتک (Logitech)", value: "Logitech" },
                    { label: "رازر (Razer)", value: "Razer" },
                    { label: "کورسیر (Corsair)", value: "Corsair" },
                    { label: "شیائومی (Xiaomi)", value: "Xiaomi" },
                    { label: "تسکو (TSCO)", value: "TSCO" },
                ]
            },
            {
                id: "type",
                name: "نوع محصول",
                type: "checkbox",
                options: [
                    { label: "ماوس", value: "Mouse" },
                    { label: "کیبورد", value: "Keyboard" },
                    { label: "کول پد", value: "CoolPad" },
                    { label: "کیف و کاور", value: "Bag" },
                    { label: "شارژر و آداپتور", value: "Adapter" },
                ]
            },
            {
                id: "connectionType",
                name: "نوع اتصال",
                type: "checkbox",
                options: [
                    { label: "باسییم", value: "Wired" },
                    { label: "بی‌سیم (Bluetooth/Dongle)", value: "Wireless" },
                ]
            }
        ]
    }
};
