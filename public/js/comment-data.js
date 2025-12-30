const commentsData = {
    1: [
        {
            userId: 101,
            username: "علی رضایی",
            isBuyer: true,
            rating: 5,
            date: "۱۵ آذر ۱۴۰۲",
            text: "خیلی گوشی خوبیه، دوربینش واقعا عالیه. من از خریدم خیلی راضیم.",
            seller: "جی جی‌کالا",
            likes: 12,
            dislikes: 2
        },
        {
            userId: 102,
            username: "مریم احمدی",
            isBuyer: true,
            rating: 4,
            date: "۱۰ آذر ۱۴۰۲",
            text: "نسبت به قیمتش ارزش خرید بالایی داره. فقط کاش هندزفری هم داشت.",
            seller: "دیجیتال لند",
            likes: 5,
            dislikes: 1
        },
        {
            userId: 204,
            username: "جلال همتی نورانی",
            isBuyer: true,
            rating: 4,
            date: "۵ آذر ۱۴۰۲",
            text: "باتری خیلی خوب دووم میاره. صفحه نمایش هم کیفیت بالایی داره.",
            seller: "جی جی‌کالا",
            likes: 8,
            dislikes: 0
        }
    ],
    2: [
        {
            userId: 103,
            username: "حسین مرادی",
            isBuyer: true,
            rating: 5,
            date: "۲۰ آبان ۱۴۰۲",
            text: "کیفیت صدای فوق‌العاده‌ای داره. بیسش خیلی عمیقه و نویز کنسلینگش عالی عمل میکنه.",
            seller: "انکر استور",
            likes: 24,
            dislikes: 0
        },
        {
            userId: 104,
            username: "سارا کریمی",
            isBuyer: false,
            rating: 3,
            date: "۲۵ آبان ۱۴۰۲",
            text: "کمی سنگینه برای استفاده طولانی مدت، ولی کیفیت ساختش خوبه.",
            seller: "انکر استور",
            likes: 3,
            dislikes: 4
        }
    ],
    3: [
        {
            userId: 105,
            username: "امیر حسین",
            isBuyer: true,
            rating: 5,
            date: "۱ آذر ۱۴۰۲",
            text: "اپل واچ سری ۸ واقعا پیشرفته‌س، سنسورهای دقیقی داره و دیزاینش حرف نداره.",
            seller: "اپل ایران",
            likes: 45,
            dislikes: 2
        },
        {
            userId: 209,
            username: "سجاد همتی نورانی",
            isBuyer: true,
            rating: 4,
            date: "۳۰ آبان ۱۴۰۲",
            text: "برای ورزشکارها عالیه. سنسور ضربان قلبش خیلی دقیقه.",
            seller: "اپل ایران",
            likes: 21,
            dislikes: 1
        }
    ],
    4: [
        {
            userId: 204,
            username: "جلال همتی نورانی",
            isBuyer: true,
            rating: 4,
            date: "۲۲ آذر ۱۴۰۲",
            text: "لپ‌تاپ بسیار خوب و سریعیه، برای کارهای فتوشاپ و ادیت اصلا لگ نداره.",
            seller: "جی جی‌کالا",
            likes: 15,
            dislikes: 0
        },
        {
            userId: 210,
            username: "سهیل همتی نورانی",
            isBuyer: true,
            rating: 5,
            date: "۱۸ آذر ۱۴۰۲",
            text: "وزن سبکی داره و حملش راحته. کیفیت ساخت عالیه.",
            seller: "جی جی‌کالا",
            likes: 9,
            dislikes: 0
        }
    ],
    5: [
        {
            userId: 205,
            username: "بهرام همتی نورانی",
            isBuyer: true,
            rating: 5,
            date: "۱۸ آذر ۱۴۰۲",
            text: "دوربین بسیار با کیفیتیه، لنزش خیلی شارپ عمل میکنه. راضی‌ام.",
            seller: "کانن استودیو",
            likes: 8,
            dislikes: 1
        }
    ],
    6: [
        {
            userId: 206,
            username: "محمد رضایی",
            isBuyer: true,
            rating: 5,
            date: "۲۵ آذر ۱۴۰۲",
            text: "بالاخره تونستم پی اس ۵ بخرم! سرعت لودینگ بازی‌هاش واقعا فضاییه.",
            seller: "سونی کلاب",
            likes: 56,
            dislikes: 3
        },
        {
            userId: 101,
            username: "علی رضایی",
            isBuyer: true,
            rating: 5,
            date: "۲۰ آذر ۱۴۰۲",
            text: "گرافیک فوق‌العاده‌س. بازی‌ها روان اجرا میشن.",
            seller: "سونی کلاب",
            likes: 32,
            dislikes: 2
        }
    ],
    7: [
        {
            userId: 207,
            username: "سعید همتی نورانی",
            isBuyer: true,
            rating: 4,
            date: "۱۲ آذر ۱۴۰۲",
            text: "صدای تفکیک شده و شفافی داره، برای مهمونی‌های کوچیک عالیه.",
            seller: "جی بی ال تهران",
            likes: 10,
            dislikes: 2
        }
    ],
    8: [
        {
            userId: 208,
            username: "روزیتا همتی نورانی",
            isBuyer: true,
            rating: 4,
            date: "۲۸ آذر ۱۴۰۲",
            text: "صفحه نمایش بزرگی داره و برای فیلم دیدن خیلی میچسبه.",
            seller: "سامسونگ سنتر",
            likes: 7,
            dislikes: 0
        },
        {
            userId: 102,
            username: "مریم احمدی",
            isBuyer: true,
            rating: 5,
            date: "۲۵ آذر ۱۴۰۲",
            text: "سبکه و حملش راحته. برای دانشجویان عالیه.",
            seller: "سامسونگ سنتر",
            likes: 12,
            dislikes: 1
        }
    ],
    9: [
        {
            userId: 209,
            username: "سجاد همتی نورانی",
            isBuyer: true,
            rating: 4,
            date: "۱ دی ۱۴۰۲",
            text: "ماوس خیلی سبکیه و توی دست خیلی خوب میشینه برای گیم زدن.",
            seller: "رازر لند",
            likes: 14,
            dislikes: 1
        },
        {
            userId: 103,
            username: "حسین مرادی",
            isBuyer: true,
            rating: 5,
            date: "۲۸ آذر ۱۴۰۲",
            text: "دقت سنسورش فوق‌العاده‌ست. برای بازی‌های FPS عالیه.",
            seller: "رازر لند",
            likes: 18,
            dislikes: 0
        }
    ],
    10: [
        {
            userId: 210,
            username: "سهیل همتی نورانی",
            isBuyer: true,
            rating: 5,
            date: "۵ دی ۱۴۰۲",
            text: "نورپردازی کیبورد عالیه و صدای سوییچ‌هاش خیلی دلنشینه.",
            seller: "کورسیر ایران",
            likes: 21,
            dislikes: 0
        },
        {
            userId: 104,
            username: "سارا کریمی",
            isBuyer: true,
            rating: 4,
            date: "۳ دی ۱۴۰۲",
            text: "کیفیت ساخت عالی داره. سوییچ‌ها نرم و راحت هستند.",
            seller: "کورسیر ایران",
            likes: 9,
            dislikes: 1
        }
    ],
    11: [
        {
            userId: 105,
            username: "امیر حسین",
            isBuyer: true,
            rating: 5,
            date: "۱۰ دی ۱۴۰۲",
            text: "مک‌بوک واقعا بی‌نظیره. هم سبکه هم پر قدرت.",
            seller: "اپل ایران",
            likes: 34,
            dislikes: 2
        }
    ],
    12: [
        {
            userId: 204,
            username: "جلال همتی نورانی",
            isBuyer: true,
            rating: 4,
            date: "۸ دی ۱۴۰۲",
            text: "کیفیت چرمش خوبه و جا برای لوازم جانبی کافی داره.",
            seller: "آشوپ استور",
            likes: 6,
            dislikes: 0
        }
    ],
    13: [
        {
            userId: 205,
            username: "بهرام همتی نورانی",
            isBuyer: true,
            rating: 4,
            date: "۱۵ دی ۱۴۰۲",
            text: "راحت و بادوامه. برای اتاق پذیرایی عالیه.",
            seller: "مبلمان ایران",
            likes: 8,
            dislikes: 1
        },
        {
            userId: 206,
            username: "محمد رضایی",
            isBuyer: true,
            rating: 5,
            date: "۱۲ دی ۱۴۰۲",
            text: "رنگش خیلی شیکه و با دکوراسیون خونه‌مون هماهنگه.",
            seller: "مبلمان ایران",
            likes: 11,
            dislikes: 0
        }
    ],
    14: [
        {
            userId: 207,
            username: "سعید همتی نورانی",
            isBuyer: true,
            rating: 5,
            date: "۲۰ دی ۱۴۰۲",
            text: "جنس استیلش عالیه. غذا تهش نمی‌گیره.",
            seller: "خانه و آشپزخانه",
            likes: 7,
            dislikes: 0
        }
    ],
    15: [
        {
            userId: 208,
            username: "روزیتا همتی نورانی",
            isBuyer: true,
            rating: 4,
            date: "۱۸ دی ۱۴۰۲",
            text: "ظرفیتش عالیه. گوشی رو چندین بار شارژ می‌کنه.",
            seller: "شیائومی استور",
            likes: 15,
            dislikes: 2
        },
        {
            userId: 209,
            username: "سجاد همتی نورانی",
            isBuyer: true,
            rating: 5,
            date: "۱۵ دی ۱۴۰۲",
            text: "فست شارژ داره و واقعا سریع گوشی رو شارژ می‌کنه.",
            seller: "شیائومی استور",
            likes: 12,
            dislikes: 0
        }
    ],
    16: [
        {
            userId: 210,
            username: "سهیل همتی نورانی",
            isBuyer: true,
            rating: 4,
            date: "۲۲ دی ۱۴۰۲",
            text: "جنس کتانش خوبه و در تابستان خنکه.",
            seller: "ال سی وایکیکی",
            likes: 5,
            dislikes: 1
        }
    ],
    17: [
        {
            userId: 101,
            username: "علی رضایی",
            isBuyer: true,
            rating: 5,
            date: "۲۵ دی ۱۴۰۲",
            text: "تیشرت نخی و با کیفیتیه. بعد از شستشو فرم خودش رو حفظ می‌کنه.",
            seller: "پوما استور",
            likes: 9,
            dislikes: 0
        },
        {
            userId: 102,
            username: "مریم احمدی",
            isBuyer: true,
            rating: 4,
            date: "۲۳ دی ۱۴۰۲",
            text: "برای استفاده روزانه عالیه. قیمتش هم مناسب بود.",
            seller: "پوما استور",
            likes: 6,
            dislikes: 1
        }
    ],
    18: [
        {
            userId: 103,
            username: "حسین مرادی",
            isBuyer: true,
            rating: 5,
            date: "۲۸ دی ۱۴۰۲",
            text: "کفش ورزشی عالیه. برای دویدن خیلی راحته.",
            seller: "نایک استور",
            likes: 23,
            dislikes: 2
        }
    ],
    19: [
        {
            userId: 104,
            username: "سارا کریمی",
            isBuyer: true,
            rating: 4,
            date: "۳۰ دی ۱۴۰۲",
            text: "آجیل تازه و با کیفیت. بسته‌بندیش هم خوب بود.",
            seller: "میهن سوپرمارکت",
            likes: 7,
            dislikes: 0
        },
        {
            userId: 105,
            username: "امیر حسین",
            isBuyer: true,
            rating: 5,
            date: "۲۹ دی ۱۴۰۲",
            text: "مخلوط آجیل خوبیه. همه مغزها تازه و خوشمزه هستند.",
            seller: "میهن سوپرمارکت",
            likes: 10,
            dislikes: 1
        }
    ],
    20: [
        {
            userId: 204,
            username: "جلال همتی نورانی",
            isBuyer: true,
            rating: 5,
            date: "۲ بهمن ۱۴۰۲",
            text: "پسرم عاشقش شده! کنترلش دقیق و بی‌سیمه.",
            seller: "اسباب بازی شهر",
            likes: 8,
            dislikes: 0
        }
    ],
    21: [
        {
            userId: 205,
            username: "بهرام همتی نورانی",
            isBuyer: false,
            rating: 4,
            date: "۵ بهمن ۱۴۰۲",
            text: "رنگش ماندگاری خوبی داره و مات می‌مونه.",
            seller: "لوازم آرایشی ایران",
            likes: 5,
            dislikes: 1
        }
    ],
    22: [
        {
            userId: 206,
            username: "محمد رضایی",
            isBuyer: true,
            rating: 5,
            date: "۸ بهمن ۱۴۰۲",
            text: "دریل قدرتمندیه. برای کارهای ساختمانی عالیه.",
            seller: "ابزار حرفه‌ای",
            likes: 11,
            dislikes: 0
        },
        {
            userId: 207,
            username: "سعید همتی نورانی",
            isBuyer: true,
            rating: 4,
            date: "۶ بهمن ۱۴۰۲",
            text: "باتریش دوام خوبی داره و سریع شارژ می‌شه.",
            seller: "ابزار حرفه‌ای",
            likes: 7,
            dislikes: 1
        }
    ],
    23: [
        {
            userId: 208,
            username: "روزیتا همتی نورانی",
            isBuyer: true,
            rating: 5,
            date: "۱۰ بهمن ۱۴۰۲",
            text: "صدای سیستم عالیه. بیس قوی داره.",
            seller: "پاینیر سنتر",
            likes: 9,
            dislikes: 0
        }
    ],
    24: [
        {
            userId: 209,
            username: "سجاد همتی نورانی",
            isBuyer: true,
            rating: 5,
            date: "۱۲ بهمن ۱۴۰۲",
            text: "رمان بسیار زیبا و تاثیرگذاریه. ترجمه خوبی هم داره.",
            seller: "کتابفروشی چشمانداز",
            likes: 25,
            dislikes: 1
        },
        {
            userId: 210,
            username: "سهیل همتی نورانی",
            isBuyer: true,
            rating: 5,
            date: "۱۰ بهمن ۱۴۰۲",
            text: "یکی از بهترین کتاب‌هایی که خوندم. داستان فوق‌العاده‌ای داره.",
            seller: "کتابفروشی چشمانداز",
            likes: 18,
            dislikes: 0
        }
    ],
    25: [
        {
            userId: 101,
            username: "علی رضایی",
            isBuyer: true,
            rating: 4,
            date: "۱۵ بهمن ۱۴۰۲",
            text: "توپ استاندارد و با کیفیتیه. برای تمرین فوتبال خوبه.",
            seller: "آدیداس استور",
            likes: 6,
            dislikes: 1
        }
    ],
    26: [
        {
            userId: 102,
            username: "مریم احمدی",
            isBuyer: true,
            rating: 5,
            date: "۱۸ بهمن ۱۴۰۲",
            text: "گلس محافظ عالیه. نصبش آسونه و کیفیت تصویر رو کم نمی‌کنه.",
            seller: "محافظ ایران",
            likes: 14,
            dislikes: 0
        },
        {
            userId: 103,
            username: "حسین مرادی",
            isBuyer: true,
            rating: 5,
            date: "۱۶ بهمن ۱۴۰۲",
            text: "ضد خش و ضد اثر انگشته. واقعا محافظت خوبی ارائه می‌ده.",
            seller: "محافظ ایران",
            likes: 11,
            dislikes: 1
        }
    ],
    27: [
        {
            userId: 104,
            username: "سارا کریمی",
            isBuyer: true,
            rating: 4,
            date: "۲۰ بهمن ۱۴۰۲",
            text: "کابل با کیفیتیه و طولش برای استفاده راحته.",
            seller: "کابل بازار",
            likes: 8,
            dislikes: 0
        }
    ],
    28: [
        {
            userId: 105,
            username: "امیر حسین",
            isBuyer: true,
            rating: 4,
            date: "۲۲ بهمن ۱۴۰۲",
            text: "کاور نرم و محافظت خوبی ارائه می‌ده. رنگش هم زیباست.",
            seller: "محافظ ایران",
            likes: 7,
            dislikes: 1
        },
        {
            userId: 204,
            username: "جلال همتی نورانی",
            isBuyer: true,
            rating: 5,
            date: "۲۰ بهمن ۱۴۰۲",
            text: "ضد ضربه‌ست و گوشی رو خوب حفظ می‌کنه.",
            seller: "محافظ ایران",
            likes: 9,
            dislikes: 0
        }
    ],
    29: [
        {
            userId: 205,
            username: "بهرام همتی نورانی",
            isBuyer: true,
            rating: 5,
            date: "۲۵ بهمن ۱۴۰۲",
            text: "لپ‌تاپ گیمینگ عالیه. همه بازی‌ها رو با گرافیک بالا اجرا می‌کنه.",
            seller: "آسوس سنتر",
            likes: 18,
            dislikes: 2
        },
        {
            userId: 206,
            username: "محمد رضایی",
            isBuyer: true,
            rating: 5,
            date: "۲۳ بهمن ۱۴۰۲",
            text: "کارت گرافیک RTX عالیه. برای رندر گرفتن هم خوب عمل می‌کنه.",
            seller: "آسوس سنتر",
            likes: 15,
            dislikes: 1
        }
    ],
    30: [
        {
            userId: 207,
            username: "سعید همتی نورانی",
            isBuyer: true,
            rating: 5,
            date: "۲۸ بهمن ۱۴۰۲",
            text: "برای طراحان عالیه. رنگ‌ها رو دقیق نشون می‌ده.",
            seller: "آسوس سنتر",
            likes: 12,
            dislikes: 0
        }
    ],
    31: [
        {
            userId: 208,
            username: "روزیتا همتی نورانی",
            isBuyer: true,
            rating: 4,
            date: "۱ اسفند ۱۴۰۲",
            text: "کول پد عالیه. فن‌ها سروصدای کمی دارن.",
            seller: "آسوس سنتر",
            likes: 6,
            dislikes: 1
        }
    ],
    32: [
        {
            userId: 209,
            username: "سجاد همتی نورانی",
            isBuyer: true,
            rating: 4,
            date: "۳ اسفند ۱۴۰۲",
            text: "ماوس ارگونومیکه. برای کار طولانی‌مدت خوبه.",
            seller: "لاجیتک ایران",
            likes: 7,
            dislikes: 0
        },
        {
            userId: 210,
            username: "سهیل همتی نورانی",
            isBuyer: true,
            rating: 5,
            date: "۲ اسفند ۱۴۰۲",
            text: "اتصال بی‌سیمش پایداره و باتریش دوام خوبی داره.",
            seller: "لاجیتک ایران",
            likes: 9,
            dislikes: 1
        }
    ],
    33: [
        {
            userId: 101,
            username: "علی رضایی",
            isBuyer: true,
            rating: 4,
            date: "۵ اسفند ۱۴۰۲",
            text: "ویندوز ۱۱ پرو سریع‌تره و امکانات خوبی داره.",
            seller: "مایکروسافت ایران",
            likes: 8,
            dislikes: 2
        }
    ],
    34: [
        {
            userId: 102,
            username: "مریم احمدی",
            isBuyer: true,
            rating: 5,
            date: "۸ اسفند ۱۴۰۲",
            text: "فتوشاپ ۲۰۲۴ واقعا حرفه‌ای‌ست. امکانات جدیدش عالیه.",
            seller: "ادوبی ایران",
            likes: 14,
            dislikes: 1
        },
        {
            userId: 103,
            username: "حسین مرادی",
            isBuyer: false,
            rating: 4,
            date: "۶ اسفند ۱۴۰۲",
            text: "برای طراحان گرافیک ضروریه. نسخه جدیدش بهتر شده.",
            seller: "ادوبی ایران",
            likes: 10,
            dislikes: 0
        }
    ],
    35: [
        {
            userId: 104,
            username: "سارا کریمی",
            isBuyer: true,
            rating: 5,
            date: "۱۰ اسفند ۱۴۰۲",
            text: "مبل تختخواب شو عالیه. برای آپارتمان کوچک مناسب‌ست.",
            seller: "ایکیا ایران",
            likes: 11,
            dislikes: 0
        }
    ],
    36: [
        {
            userId: 105,
            username: "امیر حسین",
            isBuyer: true,
            rating: 4,
            date: "۱۲ اسفند ۱۴۰۲",
            text: "برای مهمون‌های ناگهانی خوبه. سریع باد می‌شه.",
            seller: "مبلمان ایرانی",
            likes: 5,
            dislikes: 1
        }
    ],
    37: [
        {
            userId: 204,
            username: "جلال همتی نورانی",
            isBuyer: true,
            rating: 5,
            date: "۱۵ اسفند ۱۴۰۲",
            text: "مبل ال شکل خیلی شیکه. برای سالن پذیرایی بزرگ عالیه.",
            seller: "ایکیا ایران",
            likes: 9,
            dislikes: 0
        },
        {
            userId: 205,
            username: "بهرام همتی نورانی",
            isBuyer: true,
            rating: 4,
            date: "۱۳ اسفند ۱۴۰۲",
            text: "جنس چرمش با کیفیته و راحت‌ست.",
            seller: "ایکیا ایران",
            likes: 7,
            dislikes: 1
        }
    ],
    38: [
        {
            userId: 206,
            username: "محمد رضایی",
            isBuyer: true,
            rating: 5,
            date: "۱۸ اسفند ۱۴۰۲",
            text: "صندلی ارگونومیک عالیه. برای کار طولانی پشت میز خوبه.",
            seller: "نیلپر",
            likes: 13,
            dislikes: 0
        }
    ],
    39: [
        {
            userId: 207,
            username: "سعید همتی نورانی",
            isBuyer: true,
            rating: 4,
            date: "۲۰ اسفند ۱۴۰۲",
            text: "میز شیشه‌ای خیلی شیکه و فضای کمی می‌گیره.",
            seller: "ایکیا ایران",
            likes: 6,
            dislikes: 1
        }
    ],
    40: [
        {
            userId: 208,
            username: "روزیتا همتی نورانی",
            isBuyer: true,
            rating: 5,
            date: "۲۲ اسفند ۱۴۰۲",
            text: "زودپز عالیه. غذا رو سریع و خوشمزه می‌پزه.",
            seller: "خانه و آشپزخانه",
            likes: 10,
            dislikes: 0
        },
        {
            userId: 209,
            username: "سجاد همتی نورانی",
            isBuyer: true,
            rating: 5,
            date: "۲۰ اسفند ۱۴۰۲",
            text: "فشارش قابل تنظیمه و ایمن کار می‌کنه.",
            seller: "خانه و آشپزخانه",
            likes: 8,
            dislikes: 1
        }
    ],
    41: [
        {
            userId: 210,
            username: "سهیل همتی نورانی",
            isBuyer: true,
            rating: 5,
            date: "۲۵ اسفند ۱۴۰۲",
            text: "سرویس پخت و پز کامل و با کیفیتیه.",
            seller: "خانه و آشپزخانه",
            likes: 9,
            dislikes: 0
        }
    ],
    42: [
        {
            userId: 101,
            username: "علی رضایی",
            isBuyer: true,
            rating: 4,
            date: "۲۸ اسفند ۱۴۰۲",
            text: "ست کفگیر و ملاقه با کیفیت و ضد زنگه.",
            seller: "پارس خزر",
            likes: 5,
            dislikes: 1
        }
    ],
    43: [
        {
            userId: 102,
            username: "مریم احمدی",
            isBuyer: true,
            rating: 5,
            date: "۱ فروردین ۱۴۰۳",
            text: "چاقو ژاپنی خیلی تیزه و برشش عالیه.",
            seller: "ایکیا ایران",
            likes: 12,
            dislikes: 0
        }
    ],
    44: [
        {
            userId: 103,
            username: "حسین مرادی",
            isBuyer: true,
            rating: 4,
            date: "۳ فروردین ۱۴۰۳",
            text: "تخته گوشت بامبو ضد باکتریه و تمیزش آسونه.",
            seller: "خانه و آشپزخانه",
            likes: 6,
            dislikes: 1
        }
    ],
    45: [
        {
            userId: 104,
            username: "سارا کریمی",
            isBuyer: true,
            rating: 5,
            date: "۵ فروردین ۱۴۰۳",
            text: "آینه گرد خیلی دکوراتیو و زیباست.",
            seller: "دکوراسیون ایران",
            likes: 7,
            dislikes: 0
        },
        {
            userId: 105,
            username: "امیر حسین",
            isBuyer: true,
            rating: 4,
            date: "۴ فروردین ۱۴۰۳",
            text: "برای دیوار اتاق خواب عالیه. قاب طلایی‌ش زیباست.",
            seller: "دکوراسیون ایران",
            likes: 5,
            dislikes: 1
        }
    ],
    46: [
        {
            userId: 204,
            username: "جلال همتی نورانی",
            isBuyer: true,
            rating: 5,
            date: "۸ فروردین ۱۴۰۳",
            text: "پرده مخمل ضد نوره و اتاق رو کاملا تاریک می‌کنه.",
            seller: "ایکیا ایران",
            likes: 8,
            dislikes: 0
        }
    ],
    47: [
        {
            userId: 205,
            username: "بهرام همتی نورانی",
            isBuyer: false,
            rating: 4,
            date: "۱۰ فروردین ۱۴۰۳",
            text: "لباس تابستانی سبک و خنکه. طرح گلدارش زیباست.",
            seller: "کتون",
            likes: 6,
            dislikes: 1
        },
        {
            userId: 206,
            username: "محمد رضایی",
            isBuyer: true,
            rating: 5,
            date: "۹ فروردین ۱۴۰۳",
            text: "جنسش خوبه و بعد از شستشو فرمش رو حفظ می‌کنه.",
            seller: "کتون",
            likes: 9,
            dislikes: 0
        }
    ],
    48: [
        {
            userId: 207,
            username: "سعید همتی نورانی",
            isBuyer: true,
            rating: 5,
            date: "۱۲ فروردین ۱۴۰۳",
            text: "پسرم عاشق طرح مینیونه. جنسش هم نرمه.",
            seller: "دیزنی شاپ",
            likes: 7,
            dislikes: 0
        }
    ],
    49: [
        {
            userId: 208,
            username: "روزیتا همتی نورانی",
            isBuyer: true,
            rating: 5,
            date: "۱۵ فروردین ۱۴۰۳",
            text: "عینک آفتابی ری‌بن کیفیت عالیه. لنزش پلاریزه‌ست.",
            seller: "آفتابی بازار",
            likes: 14,
            dislikes: 1
        }
    ],
    50: [
        {
            userId: 209,
            username: "سجاد همتی نورانی",
            isBuyer: true,
            rating: 4,
            date: "۱۸ فروردین ۱۴۰۳",
            text: "کنسرو لوبیا برای مواقع ضروری خوبه. طعمش هم قابل قبوله.",
            seller: "کاله",
            likes: 5,
            dislikes: 0
        }
    ],
    51: [
        {
            userId: 210,
            username: "سهیل همتی نورانی",
            isBuyer: true,
            rating: 3,
            date: "۲۰ فروردین ۱۴۰۳",
            text: "نوشیدنی انرژی‌زا تأثیر فوری داره ولی کمی شیرینه.",
            seller: "دیجی‌کالا",
            likes: 3,
            dislikes: 2
        }
    ],
    52: [
        {
            userId: 101,
            username: "علی رضایی",
            isBuyer: true,
            rating: 5,
            date: "۲۲ فروردین ۱۴۰۳",
            text: "عروسک باربی کیفیت ساخت عالی داره. دخترم عاشقش شده.",
            seller: "اسباب بازی شهر",
            likes: 8,
            dislikes: 0
        }
    ],
    53: [
        {
            userId: 102,
            username: "مریم احمدی",
            isBuyer: true,
            rating: 4,
            date: "۲۵ فروردین ۱۴۰۳",
            text: "پازل ۱۰۰۰ تکه چالش خوبیه. کیفیت چاپش عالیه.",
            seller: "فکری بازار",
            likes: 6,
            dislikes: 1
        }
    ],
    54: [
        {
            userId: 103,
            username: "حسین مرادی",
            isBuyer: false,
            rating: 5,
            date: "۲۸ فروردین ۱۴۰۳",
            text: "پالت سایه چشم رنگ‌های زیبا و با کیفیتی داره.",
            seller: "مایبلین",
            likes: 9,
            dislikes: 0
        }
    ],
    55: [
        {
            userId: 104,
            username: "سارا کریمی",
            isBuyer: true,
            rating: 5,
            date: "۱ اردیبهشت ۱۴۰۳",
            text: "کرم ضد آفتاب ویشی برای پوست حساس عالیه.",
            seller: "آرایشی بهداشتی",
            likes: 11,
            dislikes: 0
        },
        {
            userId: 105,
            username: "امیر حسین",
            isBuyer: false,
            rating: 4,
            date: "۳۰ فروردین ۱۴۰۳",
            text: "SPF 50 محافظت کاملی داره و جذب پوست می‌شه.",
            seller: "آرایشی بهداشتی",
            likes: 7,
            dislikes: 1
        }
    ],
    56: [
        {
            userId: 204,
            username: "جلال همتی نورانی",
            isBuyer: true,
            rating: 5,
            date: "۳ اردیبهشت ۱۴۰۳",
            text: "اره برقی رونیکس قدرتمنده. برای برش چوب‌های ضخیم عالیه.",
            seller: "ابزار حرفه‌ای",
            likes: 10,
            dislikes: 0
        }
    ],
    57: [
        {
            userId: 205,
            username: "بهرام همتی نورانی",
            isBuyer: true,
            rating: 4,
            date: "۵ اردیبهشت ۱۴۰۳",
            text: "فرز برقی ماکیتا کیفیت ساخت عالی داره.",
            seller: "ابزار حرفه‌ای",
            likes: 6,
            dislikes: 1
        }
    ],
    58: [
        {
            userId: 206,
            username: "محمد رضایی",
            isBuyer: true,
            rating: 5,
            date: "۸ اردیبهشت ۱۴۰۳",
            text: "فرش خودرو مخمل نرمه و ضد لکه‌ست.",
            seller: "لوازم خودرو",
            likes: 7,
            dislikes: 0
        },
        {
            userId: 207,
            username: "سعید همتی نورانی",
            isBuyer: true,
            rating: 4,
            date: "۶ اردیبهشت ۱۴۰۳",
            text: "برای چهار نفره ماشین کافیه و ضد لغزشه.",
            seller: "لوازم خودرو",
            likes: 5,
            dislikes: 1
        }
    ],
    59: [
        {
            userId: 208,
            username: "روزیتا همتی نورانی",
            isBuyer: true,
            rating: 3,
            date: "۱۰ اردیبهشت ۱۴۰۳",
            text: "روغن موتور کاسترول کیفیت استانداردی داره.",
            seller: "لوازم خودرو",
            likes: 4,
            dislikes: 3
        }
    ],
    60: [
        {
            userId: 209,
            username: "سجاد همتی نورانی",
            isBuyer: true,
            rating: 5,
            date: "۱۲ اردیبهشت ۱۴۰۳",
            text: "کتاب تاریخ جهان جامع و کامل نوشته شده.",
            seller: "افق",
            likes: 9,
            dislikes: 0
        }
    ],
    61: [
        {
            userId: 210,
            username: "سهیل همتی نورانی",
            isBuyer: true,
            rating: 5,
            date: "۱۵ اردیبهشت ۱۴۰۳",
            text: "کتاب کودک مصور زیباست. بچه‌ها عاشق تصاویرش شدن.",
            seller: "افق",
            likes: 8,
            dislikes: 0
        }
    ],
    62: [
        {
            userId: 101,
            username: "علی رضایی",
            isBuyer: true,
            rating: 2,
            date: "۱۸ اردیبهشت ۱۴۰۳",
            text: "کتانی نایک راحتی لازم رو نداره. کفش کمی سفت‌ست.",
            seller: "نایک استور",
            likes: 2,
            dislikes: 5
        }
    ],
    63: [
        {
            userId: 102,
            username: "مریم احمدی",
            isBuyer: true,
            rating: 4,
            date: "۲۰ اردیبهشت ۱۴۰۳",
            text: "ست لباس ورزشی پوما برای باشگاه خوبه.",
            seller: "پوما استور",
            likes: 6,
            dislikes: 1
        }
    ],
    64: [
        {
            userId: 103,
            username: "حسین مرادی",
            isBuyer: true,
            rating: 4,
            date: "۲۲ اردیبهشت ۱۴۰۳",
            text: "مبل چستر طراحی کلاسیک و زیبایی داره.",
            seller: "مبلمان ایران",
            likes: 5,
            dislikes: 2
        }
    ],
    65: [
        {
            userId: 104,
            username: "سارا کریمی",
            isBuyer: true,
            rating: 1,
            date: "۲۵ اردیبهشت ۱۴۰۳",
            text: "ساعت دیواری بعد از یک ماه از کار افتاد.",
            seller: "دکوراسیون ایران",
            likes: 1,
            dislikes: 8
        }
    ],
    66: [
        {
            userId: 105,
            username: "امیر حسین",
            isBuyer: true,
            rating: 5,
            date: "۲۸ اردیبهشت ۱۴۰۳",
            text: "پردازنده i9 13900K واقعا بی‌نظیره. همه کارها رو با سرعت بالایی انجام می‌ده.",
            seller: "اینتل ایران",
            likes: 25,
            dislikes: 1
        }
    ],
    67: [
        {
            userId: 204,
            username: "جلال همتی نورانی",
            isBuyer: true,
            rating: 5,
            date: "۱ خرداد ۱۴۰۳",
            text: "Ryzen 9 7950X برای رندرینگ ویدیو عالیه.",
            seller: "AMD ایران",
            likes: 18,
            dislikes: 0
        }
    ],
    68: [
        {
            userId: 205,
            username: "بهرام همتی نورانی",
            isBuyer: true,
            rating: 5,
            date: "۳ خرداد ۱۴۰۳",
            text: "مادربرد ROG STRIX برای اورکلاک عالیه.",
            seller: "آسوس سنتر",
            likes: 12,
            dislikes: 1
        }
    ],
    69: [
        {
            userId: 206,
            username: "محمد رضایی",
            isBuyer: true,
            rating: 4,
            date: "۵ خرداد ۱۴۰۳",
            text: "مادربرد MSI Z790 با قیمت مناسب و کیفیت خوب.",
            seller: "ام‌اس‌آی ایران",
            likes: 8,
            dislikes: 0
        }
    ],
    70: [
        {
            userId: 207,
            username: "سعید همتی نورانی",
            isBuyer: true,
            rating: 5,
            date: "۸ خرداد ۱۴۰۳",
            text: "رم کورسیر 6400MHz واقعا سریعه. نور RGB هم زیباست.",
            seller: "کورسیر ایران",
            likes: 15,
            dislikes: 1
        }
    ],
    71: [
        {
            userId: 208,
            username: "روزیتا همتی نورانی",
            isBuyer: true,
            rating: 5,
            date: "۱۰ خرداد ۱۴۰۳",
            text: "رم G.Skill کیفیت ساخت عالی و پایداری بالایی داره.",
            seller: "جی‌اسکیل ایران",
            likes: 11,
            dislikes: 0
        }
    ],
    72: [
        {
            userId: 209,
            username: "سجاد همتی نورانی",
            isBuyer: true,
            rating: 5,
            date: "۱۲ خرداد ۱۴۰۳",
            text: "RTX 4090 رویایی‌ست. همه بازی‌ها رو با 4K اجرا می‌کنه.",
            seller: "آسوس سنتر",
            likes: 28,
            dislikes: 2
        }
    ],
    73: [
        {
            userId: 210,
            username: "سهیل همتی نورانی",
            isBuyer: true,
            rating: 5,
            date: "۱۵ خرداد ۱۴۰۳",
            text: "RTX 4080 گیگابایت خنک‌کننده عالی داره و سروصداش کمه.",
            seller: "گیگابایت ایران",
            likes: 16,
            dislikes: 1
        }
    ],
    74: [
        {
            userId: 101,
            username: "علی رضایی",
            isBuyer: true,
            rating: 5,
            date: "۱۸ خرداد ۱۴۰۳",
            text: "SSD سامسونگ 990 PRO سرعت خواندن/نوشتش فوق‌العاده‌ست.",
            seller: "سامسونگ سنتر",
            likes: 22,
            dislikes: 0
        }
    ],
    75: [
        {
            userId: 102,
            username: "مریم احمدی",
            isBuyer: true,
            rating: 4,
            date: "۲۰ خرداد ۱۴۰۳",
            text: "هارد WD Black برای ذخیره‌سازی بازی‌ها عالیه.",
            seller: "وسترن دیجیتال",
            likes: 9,
            dislikes: 1
        }
    ],
    76: [
        {
            userId: 103,
            username: "حسین مرادی",
            isBuyer: true,
            rating: 5,
            date: "۲۲ خرداد ۱۴۰۳",
            text: "منبع تغذیه کورسیر RM850x ساکت و کارآمده.",
            seller: "کورسیر ایران",
            likes: 13,
            dislikes: 0
        }
    ],
    77: [
        {
            userId: 104,
            username: "سارا کریمی",
            isBuyer: true,
            rating: 5,
            date: "۲۵ خرداد ۱۴۰۳",
            text: "ماوس لاجیتک MX Master 3S برای کارهای اداری عالیه.",
            seller: "لاجیتک ایران",
            likes: 21,
            dislikes: 1
        },
        {
            userId: 105,
            username: "امیر حسین",
            isBuyer: true,
            rating: 5,
            date: "۲۳ خرداد ۱۴۰۳",
            text: "چرخ اسکرول ماژیکالش عالیه برای کار با اکسل.",
            seller: "لاجیتک ایران",
            likes: 18,
            dislikes: 0
        }
    ],
    78: [
        {
            userId: 204,
            username: "جلال همتی نورانی",
            isBuyer: true,
            rating: 5,
            date: "۲۸ خرداد ۱۴۰۳",
            text: "ماوس رازر DeathAdder V3 Pro برای گیمینگ بی‌نظیره.",
            seller: "رازر لند",
            likes: 25,
            dislikes: 2
        }
    ],
    79: [
        {
            userId: 205,
            username: "بهرام همتی نورانی",
            isBuyer: true,
            rating: 5,
            date: "۳۰ خرداد ۱۴۰۳",
            text: "کیبورد کی‌کرون K2 Pro برای مک و ویندوز خوبه.",
            seller: "کی‌کرون ایران",
            likes: 14,
            dislikes: 1
        }
    ],
    80: [
        {
            userId: 206,
            username: "محمد رضایی",
            isBuyer: true,
            rating: 5,
            date: "۲ تیر ۱۴۰۳",
            text: "کیبورد لاجیتک MX Keys S برای تایپ طولانی راحته.",
            seller: "لاجیتک ایران",
            likes: 16,
            dislikes: 0
        },
        {
            userId: 207,
            username: "سعید همتی نورانی",
            isBuyer: true,
            rating: 4,
            date: "۱ تیر ۱۴۰۳",
            text: "اتصال بی‌سیمش پایداره و نور پس‌زمینه‌ش خوبه.",
            seller: "لاجیتک ایران",
            likes: 10,
            dislikes: 1
        }
    ],
    81: [
        {
            userId: 208,
            username: "روزیتا همتی نورانی",
            isBuyer: true,
            rating: 5,
            date: "۴ تیر ۱۴۰۳",
            text: "مانیتور ال‌جی UltraGear رنگ‌های واقعی و کنتراست خوبی داره.",
            seller: "ال‌جی ایران",
            likes: 19,
            dislikes: 1
        }
    ],
    82: [
        {
            userId: 209,
            username: "سجاد همتی نورانی",
            isBuyer: true,
            rating: 5,
            date: "۶ تیر ۱۴۰۳",
            text: "مانیتور سامسونگ Odyssey G7 برای بازی‌های سریع عالیه.",
            seller: "سامسونگ سنتر",
            likes: 22,
            dislikes: 2
        }
    ],
    83: [
        {
            userId: 210,
            username: "سهیل همتی نورانی",
            isBuyer: true,
            rating: 4,
            date: "۸ تیر ۱۴۰۳",
            text: "کارت صدا کریتیو کیفیت صدای عالی‌ای ارائه می‌ده.",
            seller: "کریتیو ایران",
            likes: 9,
            dislikes: 1
        }
    ],
    84: [
        {
            userId: 101,
            username: "علی رضایی",
            isBuyer: true,
            rating: 5,
            date: "۱۰ تیر ۱۴۰۳",
            text: "خنک‌کننده دیپ‌کول پردازنده رو خوب خنک می‌کنه.",
            seller: "دیپ‌کول ایران",
            likes: 11,
            dislikes: 0
        }
    ],
    85: [
        {
            userId: 102,
            username: "مریم احمدی",
            isBuyer: true,
            rating: 5,
            date: "۱۲ تیر ۱۴۰۳",
            text: "کیس NZXT H9 Flow طراحی زیبا و کابل‌میرانی آسونی داره.",
            seller: "ان‌زد‌اکس‌تی ایران",
            likes: 15,
            dislikes: 1
        },
        {
            userId: 103,
            username: "حسین مرادی",
            isBuyer: true,
            rating: 5,
            date: "۱۱ تیر ۱۴۰۳",
            text: "شیشه‌های تمپر شده کیس شفافیت عالی دارن.",
            seller: "ان‌زد‌اکس‌تی ایران",
            likes: 12,
            dislikes: 0
        }
    ],
    86: [
        {
            userId: 104,
            username: "سارا کریمی",
            isBuyer: true,
            rating: 5,
            date: "۱۵ تیر ۱۴۰۳",
            text: "Xbox Series X برای بازی‌های اکشن عالیه. لود سریع داره.",
            seller: "مایکروسافت ایران",
            likes: 18,
            dislikes: 1
        }
    ],
    87: [
        {
            userId: 105,
            username: "امیر حسین",
            isBuyer: true,
            rating: 5,
            date: "۱۸ تیر ۱۴۰۳",
            text: "Nintendo Switch OLED صفحه نمایش فوق‌العاده‌ای داره.",
            seller: "نینتندو ایران",
            likes: 14,
            dislikes: 0
        }
    ],
    88: [
        {
            userId: 204,
            username: "جلال همتی نورانی",
            isBuyer: true,
            rating: 5,
            date: "۲۰ تیر ۱۴۰۳",
            text: "PS5 Slim طراحی زیبا و کم‌صدا داره.",
            seller: "سونی کلاب",
            likes: 20,
            dislikes: 2
        },
        {
            userId: 205,
            username: "بهرام همتی نورانی",
            isBuyer: true,
            rating: 5,
            date: "۱۹ تیر ۱۴۰۳",
            text: "نسخه دیجیتالش برای کسایی که بازی دیجیتال می‌خرن عالیه.",
            seller: "سونی کلاب",
            likes: 16,
            dislikes: 1
        }
    ],
    89: [
        {
            userId: 206,
            username: "محمد رضایی",
            isBuyer: true,
            rating: 5,
            date: "۲۲ تیر ۱۴۰۳",
            text: "Steam Deck برای بازی کردن در سفر عالیه.",
            seller: "والو استور",
            likes: 17,
            dislikes: 1
        },
        {
            userId: 207,
            username: "سعید همتی نورانی",
            isBuyer: true,
            rating: 4,
            date: "۲۱ تیر ۱۴۰۳",
            text: "باتری‌ش برای بازی‌های سنگین زود تموم می‌شه ولی قابلیت حملش خوبه.",
            seller: "والو استور",
            likes: 10,
            dislikes: 2
        }
    ]
};