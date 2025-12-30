if (!window.categories) window.categories = [];
window.categories.push({
    id: "cat-5",
    name: "مد و پوشاک",
    icon: "fas fa-tshirt",
    image: "uploads/images/categories/cat-5.jpg",
    subcategories: [
        {
            id: "sub-5-1",
            name: "لباس",
            microcategories: [
                { id: "micro-5-1-1", name: "مردانه" },
                { id: "micro-5-1-2", name: "زنانه" },
                { id: "micro-5-1-3", name: "بچگانه" },
            ],
        },
        {
            id: "sub-5-2",
            name: "کفش",
            microcategories: [
                { id: "micro-5-2-1", name: "ورزشی" },
                { id: "micro-5-2-2", name: "رسمی" },
                { id: "micro-5-2-3", name: "صندل و دمپایی" },
            ],
        },
        {
            id: "sub-5-3",
            name: "اکسسوری",
            microcategories: [
                { id: "micro-5-3-1", name: "عینک آفتابی" },
                { id: "micro-5-3-2", name: "ساعت" },
                { id: "micro-5-3-3", name: "کیف و کوله" },
            ],
        },
    ],
});

// Category-specific filters configuration
if (!window.categoryFilters) window.categoryFilters = {};
window.categoryFilters["cat-5"] = {
    "sub-5-1": {
        filters: [
            {
                id: "brand",
                name: "برند",
                type: "checkbox",
                options: [
                    { label: "ال سی وایکیکی (LC Waikiki)", value: "LC Waikiki" },
                    { label: "کوتون (Koton)", value: "Koton" },
                    { label: "دیزنی (Disney)", value: "Disney" },
                    { label: "نایک (Nike)", value: "Nike" },
                    { label: "آدیداس (Adidas)", value: "Adidas" }
                ]
            },
            {
                id: "gender",
                name: "جنسیت",
                type: "checkbox",
                options: [
                    { label: "مردانه", value: "Men" },
                    { label: "زنانه", value: "Women" },
                    { label: "پسرانه", value: "Boys" },
                    { label: "دخترانه", value: "Girls" },
                    { label: "اسپرت (بدون جنسیت)", value: "Unisex" }
                ]
            },
            {
                id: "ageGroup",
                name: "رده سنی",
                type: "checkbox",
                options: [
                    { label: "بزرگسال", value: "Adult" },
                    { label: "کودک", value: "Child" },
                    { label: "نوزاد", value: "Infant" }
                ]
            },
            {
                id: "material",
                name: "جنس",
                type: "checkbox",
                options: [
                    { label: "نخی (کتان)", value: "Cotton" },
                    { label: "پلی استر", value: "Polyester" },
                    { label: "ویسکوز", value: "Viscose" },
                    { label: "جین", value: "Denim" }
                ]
            },
            {
                id: "color",
                name: "رنگ",
                type: "checkbox",
                options: [
                    { label: "آبی", value: "Blue" },
                    { label: "قرمز", value: "Red" },
                    { label: "مشکی", value: "Black" },
                    { label: "سفید", value: "White" },
                    { label: "زرد", value: "Yellow" }
                ]
            }
        ]
    },
    "sub-5-2": {
        filters: [
            {
                id: "brand",
                name: "برند",
                type: "checkbox",
                options: [
                    { label: "نایک (Nike)", value: "Nike" },
                    { label: "آدیداس (Adidas)", value: "Adidas" },
                    { label: "پوما (Puma)", value: "Puma" },
                    { label: "ری‌باک (Reebok)", value: "Reebok" }
                ]
            },
            {
                id: "size",
                name: "سایز",
                type: "checkbox",
                options: [
                    { label: "37", value: "37" },
                    { label: "38", value: "38" },
                    { label: "39", value: "39" },
                    { label: "40", value: "40" },
                    { label: "41", value: "41" },
                    { label: "42", value: "42" },
                    { label: "43", value: "43" },
                    { label: "44", value: "44" }
                ]
            }
        ]
    },
    "sub-5-3": {
        filters: [
            {
                id: "brand",
                name: "برند",
                type: "checkbox",
                options: [
                    { label: "ری‌بن (Ray-Ban)", value: "Ray-Ban" },
                    { label: "رولکس (Rolex)", value: "Rolex" },
                    { label: "کاسیو (Casio)", value: "Casio" }
                ]
            }
        ]
    }
};
