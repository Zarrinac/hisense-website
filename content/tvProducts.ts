import { type StaticImageData } from 'next/image';
import { type TvProduct } from '@/types/tv';
// logos
import dolbyVisionAtomsLogo from '@/public/products/tvs/U7K-Files/Dolby-Vision-Atmos-svg-dark.svg';
import dolbyVisionAtomsLogo1 from '@/public/products/tvs/U7K-Files/Dolby-Vision-Atmos-svg-white.svg';
import HdrLogo from '@/public/products/tvs/U7K-Files/HDR-logo-black.png';
import HdrLogo1 from '@/public/products/tvs/U7K-Files/HDR-logo.png';
import filmmakerLogo from '@/public/products/tvs/U7K-Files/Filmmaker-Mode-logo.png';
import ImaxLogo from '@/public/products/tvs/U7K-Files/IMAX-logo.png';
import ImaxLogo1 from '@/public/products/tvs/U7K-Files/IMAX-logo-reverse.png';
import HiViewLogo from '@/public/products/tvs/U7K-Files/Hi-view-green-logo.png';
import u7kFeature6 from '@/public/products/tvs/U7K-Files/Feature_Mini-LED-X_b.png';
import quantumDotLogo from '@/public/products/tvs/U7K-Files/Feature_Quantum-Dot-Colour_m.png';
import dynamicXDisplayLogo from '@/public/products/tvs/U7K-Files/Feature_Dynamic-X-Display_m.png';
import gameModeLogo from '@/public/products/tvs/U7K-Files/Feature_144Hz_Game_Mode_PRO_m.png';
import dolbyVisionAtomsLogo0 from '@/public/products/tvs/U7K-Files/Feature_CineStage-X-Surround_m.png';
import aiPicLogo from '@/public/products/tvs/q7q-Files/logo-ai-picture-white.png';
import aiUpscalerLogo from '@/public/products/tvs/q7q-Files/logo-ai-upscaler.png';
import amdLogo from '@/public/products/tvs/q7q-Files/logo-amd-white.png';
import gameBarLogo from '@/public/products/tvs/q7q-Files/logo-game-bar.png';
import smoothMotionLogo from '@/public/products/tvs/q7q-Files/logo-smooth-motion.png';
import voiceRemoteLogo from '@/public/products/tvs/q7q-Files/logo-voice-remote-white.png';

// U7K-series
import u7kHero from '@/public/products/tvs/U7K-Files/U7K-Hero.png';
import u7kVideoPoster from '@/public/products/tvs/U7K-Files/gamePlaySection-image.jpg';
import u7kIntelligentProcessor from '@/public/products/tvs/U7K-Files/HI-VIEW-engine.jpg';
import u7kDetailSection from '@/public/products/tvs/U7K-Files/detailSection-image.jpg';
import u7kDolbySection from '@/public/products/tvs/U7K-Files/dolbySection-image.jpg';
import u7kImaxSection from '@/public/products/tvs/U7K-Files/imaxSection-image.jpg';
import u7kfilmMakerSection from '@/public/products/tvs/U7K-Files/filmMakerSection-image.jpg';
import u7kAutoLightAfterSection from '@/public/products/tvs/U7K-Files/autoLight-after-image.jpg';
import u7kAutoLightBeforeSection from '@/public/products/tvs/U7K-Files/autoLight-before-image.jpg';
import u7kSportsModeBeforeSection from '@/public/products/tvs/U7K-Files/sportsMode-before-image.jpg';
import u7kSportsModeAfterSection from '@/public/products/tvs/U7K-Files/sportsMode-after-image.jpg';
import u7kOptimizationSection from '@/public/products/tvs/U7K-Files/optimization-image.jpg';
import u7kStayConnectedSection from '@/public/products/tvs/U7K-Files/stayConnected-image.jpg';
import u7kExperienceSection from '@/public/products/tvs/U7K-Files/experience-image.jpg';
// Q7Q-series
import q7qHero from '@/public/products/tvs/q7q-Files/q7q-Hero.jpg';
import q7qBiggerScreen from '@/public/products/tvs/q7q-Files/q7q-biggerScreen.jpg';
import q7qBrightness from '@/public/products/tvs/q7q-Files/q7q-brightness.jpg';
import q7qEnhancement from '@/public/products/tvs/q7q-Files/q7q-enhancement.jpg';
import q7qFuzzyImage from '@/public/products/tvs/q7q-Files/q7q-fuzzyImage.jpg';
import q7qGameManagement from '@/public/products/tvs/q7q-Files/q7q-gameManagement.jpg';
import q7qGaming from '@/public/products/tvs/q7q-Files/q7q-gaming.jpg';
import q7qMovies from '@/public/products/tvs/q7q-Files/q7q-movies.jpg';
import q7qNoBlur from '@/public/products/tvs/q7q-Files/q7q-noBlur.jpg';
import q7qScreenTear from '@/public/products/tvs/q7q-Files/q7q-screenTear.jpg';
import q7qVividColor from '@/public/products/tvs/q7q-Files/q7q-vividColor.jpg';
import q7qVrr from '@/public/products/tvs/q7q-Files/q7q-vrr.jpg';
import q7qVoiceCommand from '@/public/products/tvs/q7q-Files/q7q-voiceCommand.jpg';

export const TV_PRODUCTS: TvProduct[] = [
  {
    id: 'Q7Q',
    sku: 'Q7Q',
    size: '100"',
    sizes: ['100"', '85"', '75"', '65"', '55"'],
    banners: [{ id: 'q7q-banner', desktop: q7qHero, alt: 'Hisense Q7Q hero' }],
    series: 'Q7Q',
    panel: '4K QLED SMART TV',
    resolution: '4K (3840x2160)',
    refreshRate: '144Hz + HDR',
    os: 'VIDAA U7.6',
    sound: '2.1ch 2x15W + 20W built-in sub, Dolby surround',
    connectivity: ['WiFi', 'Bluetooth 5', 'HDMI x4', 'USB 2.0 x2', 'SPDIF', 'AV', 'Headphone'],
    tuner: 'DVB-T/T2, Time Shift',
    extras: [
      'AI Upscaler (HD → 4K)',
      'Hi-View Engine X',
      'Dynamic X-Display',
      '144Hz Game Mode Pro',
      'Quantum Dot Colour',
      'CineStage X Surround',
    ],
    image: q7qHero,
    heroVideo: 'https://hisenseme.com/storage/20093/E7-PRO(Q7)_2K.mp4',
    featureCards: [
      {
        title: 'Dolby Vision-Atoms',
        description:
          'Dense Mini-LED backlight with precise local dimming for deep blacks and bright highlights.',
        image: dolbyVisionAtomsLogo as StaticImageData,
        imageBlack: dolbyVisionAtomsLogo1 as StaticImageData,
      },
      {
        title: 'AI Picture',
        description:
          'Dense Mini-LED backlight with precise local dimming for deep blacks and bright highlights.',
        image: aiPicLogo,
        imageBlack: aiPicLogo,
      },
      {
        title: 'Filmmaker',
        description:
          'Dense Mini-LED backlight with precise local dimming for deep blacks and bright highlights.',
        image: filmmakerLogo,
      },
      {
        title: '4K AI Upscaler',
        description:
          'Dense Mini-LED backlight with precise local dimming for deep blacks and bright highlights.',
        image: aiUpscalerLogo,
        imageBlack: aiUpscalerLogo,
      },
      {
        title: 'AMD FreeSync Premium ',
        description:
          'Dense Mini-LED backlight with precise local dimming for deep blacks and bright highlights.',
        image: amdLogo,
      },
      {
        title: 'Game bar',
        description:
          'Dense Mini-LED backlight with precise local dimming for deep blacks and bright highlights.',
        image: gameBarLogo,
      },
      {
        title: 'Quantum Dot Colour',
        description: 'Billion+ colour shades with high volume for vivid HDR scenes.',
        image: quantumDotLogo,
      },
      {
        title: 'Smooth Motion',
        description: 'Optimized panel uniformity and anti-glare for wide seating and bright rooms.',
        image: smoothMotionLogo,
      },
      {
        title: '144Hz Game Mode Pro',
        description: 'High refresh rate with low latency for fast games and smooth sports.',
        image: gameModeLogo,
      },
      {
        title: 'Voice Control',
        description: '5.1 channel sound layout with Dolby support and built-in subwoofer.',
        image: voiceRemoteLogo,
      },
    ],
    sectionGroups: [
      {
        kind: 'stacked',
        textFirst: true,
        sections: [
          { image: q7qVrr, copyKey: 'vrr' },
          { image: q7qScreenTear, copyKey: 'screenTear' },
          { image: q7qVividColor, copyKey: 'vividColor' },
          { image: q7qGaming, copyKey: 'gaming' },
          { image: q7qNoBlur, copyKey: 'noBlur' },
          { image: q7qFuzzyImage, copyKey: 'fuzzyImage' },
        ],
      },
      {
        kind: 'overlay',
        sections: [
          { image: q7qEnhancement, copyKey: 'enhancement', textPosition: 'right' },
          { image: q7qBiggerScreen, copyKey: 'biggerScreen', textPosition: 'left' },
        ],
      },
      {
        kind: 'content',
        sections: [
          { image: q7qBrightness, copyKey: 'brightness' },
          { image: q7qGameManagement, copyKey: 'gameManagement' },
          { image: q7qMovies, copyKey: 'movies' },
        ],
      },
      {
        kind: 'stacked',
        textFirst: true,
        sections: [{ image: q7qVoiceCommand, copyKey: 'voiceCommand' }],
      },
    ],
    specs: {
      en: [
        'Smart TV with sharp and clear picture',
        'QLED & DLED display technology',
        '8MP 4K resolution (3840 x 2160)',
        'VIDAA U7.6 operating system',
        'AI Upscaler upgrades HD to 4K',
        '178° viewing angle with HDR picture',
        '144Hz refresh rate',
        'Quantum Dot tech for wide color gamut',
        'Built-in Time Shift and digital tuner',
        'Dolby surround: 2.1 (2x15W + 20W built-in subwoofer)',
        'Headphone and optical out; WiFi & Bluetooth 5',
        'SPDIF, AV, USB 2.0 x 2, HDMI x 4',
        'DVB-T/T2 digital tuner',
        'Mobile device connectivity',
      ],
      fa: [
        'تلویزیون هوشمند Smart وضوح تصویر بالا و شفاف',
        'تکنولوژی صفحه نمایش QLED & DLED',
        'تصویر هشت مگا پیکسل 4K رزولوشن 2160 * 3840',
        'دارای سیستم عامل VIDAA U7.6',
        'ارتقاء تصویر HD to 4K توسط هوش مصنوعی AI Upscaler',
        'زاویه دید 178 درجه ، تصویر HDR',
        'نرخ تازه سازی تصویر 144HZ',
        'مجهز به فناوری Quantum Dot (نمایش طیف وسیع رنگ ها با بهره گیری از تکنولوژی کوانتوم دات)',
        'مجهز به Time Shift و گیرنده دیجیتال داخلی',
        'صدای فراگیر دالبی SOUND OUTPUT: 2.1 2*15w+20W Built-in Subwoofer',
        'خروجی هدفون و Optical ، قابلیت اتصال به WIFI و Bluetooth 5',
        'SPDIF AV USB2.0x2 HDMIx4',
        'تیونر دیجیتال داخلی DVB-T/T2',
        'قابلیت اتصال به گوشی همراه',
      ],
    },
    copy: {
      en: {
        name: 'Hisense Q7Q QLED 4K TV',
        tagline: '100-inch QLED with 144Hz motion and AI-powered 4K upscaling.',
        description:
          'A flagship 100-inch QLED display with Quantum Dot colour, wide viewing angles, and VIDAA U7.6 smart OS—built for cinematic rooms and gaming setups.',
        highlights: [
          '100-inch QLED 4K (3840x2160) with HDR and 178° viewing.',
          'VIDAA U7.6 smart platform with AI upscaling from HD to 4K.',
          'Hi-View Engine X + Dynamic X-Display for controlled brightness and contrast.',
          '144Hz Game Mode Pro with Quantum Dot Colour and low-latency response.',
          '2.1ch 2x15W + 20W subwoofer, Dolby surround, and CineStage X Surround.',
          'WiFi, Bluetooth 5, HDMI x4, USB 2.0 x2, SPDIF, AV, and headphone out.',
        ],
        blocks: {
          vrr: {
            title: 'Native 144Hz VRR, victory in every frame',
            text: 'Unlock your ultimate gaming potential with 144Hz Game Mode PRO with an integrated game bar, say goodbye to the lag and enjoy the tear-free gameplay.',
          },
          screenTear: {
            title: 'No screen tearing, just gaming',
            text: 'Thanks to Variable Refresh Rate technology and AMD FreeSync Premium, you can stay immersed in the action without the fear of screen tearing.',
          },
          vividColor: {
            title: 'Billion+ shades of vivid colour',
            text: 'Experience a visual treat with QLED Colour. Every frame is rich, vibrant, and true-to-life, ensuring every colour, from the most subtle to the most vibrant, stands out.',
          },
          gaming: {
            title: 'A whole new world of gaming',
            text: 'Dolby transforms gaming. Witness unmatched visuals and be engulfed in the immersive sound. See brighter, hear clearer, and game better like never before. Step in, and play differently.',
          },
          enhancement: {
            title: 'Intelligent visual enhancement',
            text: 'Real-time intelligent enhancement for lifelike contrast, colour, clarity, and details.',
          },
          noBlur: {
            title: 'Smoother picture with no blur',
            text: `Experience smooth, lifelike visuals with advanced features like MEMC (Motion Estimation, Motion Compensation) and 3D Noise Reduction, built into a highly responsive panel. With AI Smooth Motion technology, annoying motion blur lies in the past. Whether it's fast-paced sports or action-packed gaming, every movement and sudden twist is rendered with crisp clarity, ensuring dynamic scenes appear seamless and true to life.`,
          },
          fuzzyImage: {
            title: 'Fuzzy images are upscaled close to 4K quality',
            text: `Hisense's Al 4K Upscaler unlocks superior clarity for all your favorite content. This smart feature reshapes not only your cherished classics and home movies, but also modern TV broadcasts, movies, and even streaming content into stunning 4K quality. Every pixel is elevated to the power of your TV.`,
          },
          brightness: {
            title: 'Intelligent brightness for sustainable viewing',
            text: 'No matter the time of the day, your TV detects and adjusts screen brightness automatically in response to ambient light to save electricity. Balance energy savings with quality viewing.',
          },
          gameManagement: {
            title: 'Seamless gaming management at one stop',
            text: 'Enjoy your gaming dashboard and manage your performance in real-time. You are able to adjust the gaming options and monitor the gameplay data seamlessly. Lead with precision, and play to win.',
          },
          movies: {
            title: 'Watch your movies and TV shows the way the filmmakers intended',
            text: 'Experience the message as it was intended with Filmmaker Mode. Adjust your video to its original settings to see details like the sound, aspect ratio, colour, frame rate, and more as it was originally envisioned for the most authentic display of your favorite filmmaker’s masterpiece, before it was altered for generic viewing.',
          },
          biggerScreen: {
            title: 'Bigger screen for greater enjoyment',
            text: 'More large-sized TV options. Gaming world or cinema, just dive in at your own home.',
          },
          voiceCommand: {
            title: 'Your voice, your command',
            text: 'Enjoy fast and convenient access to TV entertainment while keeping your data private. Try it now and experience effortless voice search and navigation.',
          },
        },
      },
      fa: {
        name: 'تلویزیون Q7Q هایسنس',
        tagline: 'نمایشگر ۱۰۰ اینچی QLED با نرخ ۱۴۴ هرتز و ارتقاء هوشمند 4K.',
        description:
          'تلویزیون پرچمدار ۱۰۰ اینچی با رنگ‌های Quantum Dot، زاویه دید گسترده و سیستم عامل VIDAA U7.6؛ مناسب سالن‌های سینمای خانگی و گیمینگ.',
        highlights: [
          'نمایشگر QLED 4K (۳۸۴۰ x ۲۱۶۰) با HDR و زاویه دید ۱۷۸ درجه.',
          'سیستم هوشمند VIDAA U7.6 با ارتقاء تصویر HD به 4K توسط هوش مصنوعی.',
          ' پردازشگر Hi-View Engine X و Dynamic X-Display برای روشنایی و کنتراست دقیق.',
          'حالت Game Mode Pro با نرخ ۱۴۴ هرتز و رنگ‌های Quantum Dot برای تاخیر کم.',
          'صدای ۲.۱ کانال (۲x۱۵ وات + ساب ۲۰ وات)، دالبی و CineStage X Surround.',
          'اتصال WiFi، بلوتوث ۵، چهار HDMI، دو USB 2.0، SPDIF، AV و خروجی هدفون.',
        ],
        blocks: {
          vrr: {
            title: 'پیروزی واقعی در هر فریم ,144Hz VRR',
            text: 'با Game Mode PRO و نرخ تازه‌سازی 144Hz، نهایت توان گیمینگ خود را آزاد کنید. یک Game Bar یکپارچه در اختیارتان است تا کنترل کامل داشته باشید. با حذف لگ و جلوگیری از گسست تصویر، از تجربه‌ای روان، سریع و بی‌نقص لذت ببرید—دقیقاً همان‌طور که یک بازی رقابتی باید باشد.',
          },
          screenTear: {
            title: 'بدون گسست تصویر؛ فقط بازی',
            text: 'با فناوری Variable Refresh Rate و پشتیبانی از AMD FreeSync Premium، در اوج هیجان بازی غوطه‌ور بمانید. نرخ تازه‌سازی متغیر به‌طور هوشمند با فریم‌های بازی هماهنگ می‌شود تا هیچ نشانه‌ای از گسست تصویر باقی نماند— فقط یک تجربه‌ی روان، دقیق و کاملاً immersive.',
          },
          vividColor: {
            title: 'بیش از یک میلیارد سایه از رنگ‌های زنده و خیره‌کننده',
            text: 'با فناوری QLED Colour، هر فریم به یک نمایش واقعی از رنگ‌های غنی، پویا و طبیعی تبدیل می‌شود. از لطیف‌ترین تون‌ها تا درخشان‌ترین رنگ‌ها، همه با وضوحی چشمگیر دیده می‌شوند تا تصویری زنده و واقعی پیش چشم شما قرار گیرد.',
          },
          gaming: {
            title: 'دنیایی تازه از گیمینگ',
            text: 'Dolby تجربه‌ی گیمینگ را دگرگون می‌کند. با تصویری بی‌رقیب و صدایی فراگیر، عمیق‌تر در دنیای بازی غوطه‌ور شوید. روشن‌تر ببینید، شفاف تر بشنوید و بهتر بازی کنید — چنان‌ که تاکنون تجربه نکرده‌اید. یک قدم بردارید و بازی را به شکلی کاملاً متفاوت آغاز کنید.',
          },
          enhancement: {
            title: 'بهبود هوشمند کیفیت تصویر',
            text: 'افزایش هوشمند کیفیت تصویر در لحظه، برای ارائه‌ی کنتراست، رنگ، وضوح و جزئیاتی واقعی و زنده.',
          },
          noBlur: {
            title: 'تصویری روان و بدون تاری',
            text: 'با فناوری‌های پیشرفته‌ای مانند MEMC و کاهش نویز سه‌بعدی در کنار یک پنل بسیار پاسخ‌گو، تصاویری روان، شفاف و نزدیک به واقعیت را تجربه کنید. تکنولوژی AI Smooth Motion تاری و محوشدگی حرکتی را از میان برمی‌دارد تا حتی صحنه‌های سریع — چه در مسابقات ورزشی و چه در بازی‌های هیجانی — با وضوحی دقیق، حرکت یکپارچه و جزئیاتی زنده نمایش داده شوند.',
          },
          fuzzyImage: {
            title: 'بهبود هوشمند تصویر تا مرز وضوح 4K',
            text: `AI 4K Upscaler هایسنس، وضوح و شفافیت محتوای شما را به سطحی کاملاً جدید می‌برد. این فناوری هوشمند، نه‌تنها فیلم‌ها و ویدئوهای قدیمی و خانگی، بلکه پخش تلویزیونی، فیلم‌های روز و حتی محتوای استریم‌شده را با کیفیتی نزدیک به 4K بازآفرینی می‌کند. در این فرآیند، هر پیکسل ارتقا یافته و تصویر نهایی، بیشترین توان تلویزیون شما را به نمایش می‌گذارد — شفاف، دقیق و چشمگیر.`,
          },
          brightness: {
            title: 'روشنایی هوشمند برای تماشای پایدار',
            text: 'در هر ساعت از شبانه‌روز، تلویزیون‌های هایسنس با تشخیص نور محیط، میزان روشنایی صفحه را به‌صورت خودکار تنظیم می‌کنند تا مصرف انرژی کاهش یابد. این فناوری تعادلی هوشمند میان صرفه‌جویی در برق و کیفیت مطلوب تصویر ایجاد می‌کند و تجربه‌ای پایدار و بهینه را برای شما رقم می‌زند.',
          },
          gameManagement: {
            title: 'مدیریت یکپارچه گیمینگ در یک نقطه',
            text: 'با داشبورد گیمینگ، عملکرد خود را در لحظه مدیریت کنید. تنظیمات گیمینگ را به‌صورت آنی تغییر دهید و داده‌های بازی را بدون وقفه زیر نظر داشته باشید. با دقت بیشتر بازی کنید، کنترل کامل داشته باشید و برای پیروزی پیش بروید.',
          },
          movies: {
            title: 'تماشای فیلم‌ها و سریال‌ها همان‌طور که فیلم‌ساز می‌خواست',
            text: 'با Filmmaker Mode محتوای تصویری را دقیقاً همان‌گونه ببینید که خالق اثر در نظر داشته است. این حالت با بازگرداندن تنظیمات تصویر به حالت اصلی، جزئیاتی مانند صدا، نسبت تصویر، رنگ‌ها، نرخ فریم و بسیاری موارد دیگر را مطابق نسخه‌ی اولیه نمایش می‌دهد. نتیجه، نمایش اصیل و وفادار به دیدگاه فیلم‌ساز است؛ پیش از آن‌که برای نمایش عمومی دستکاری یا ساده‌سازی شود.',
          },
          biggerScreen: {
            title: 'صفحه‌نمایش بزرگ‌تر، لذت بیشتر',
            text: 'گزینه‌های متنوعی از تلویزیون‌های سایز بزرگ پیش روی شماست. چه در دنیای بازی و چه در سینما، کافی است غرق تصویر شوید و تجربه‌ای هیجان‌انگیز را در خانه خود رقم بزنید.',
          },
          voiceCommand: {
            title: 'صدای شما؛ فرمان شما',
            text: 'به محتوای تلویزیونی خود سریع و آسان دسترسی پیدا کنید، در حالی‌ که حریم خصوصی‌ تان محفوظ می‌ماند. همین حالا امتحان کنید و جستجو و ناوبری صوتی را با نهایت راحتی و بدون هیچ زحمتی تجربه کنید.',
          },
        },
      },
    },
  },
  {
    id: 'U7K',
    sku: 'U7K',
    size: '100"',
    series: 'U7K',
    panel: 'ULED MiniLED',
    resolution: '4K (3840x2160)',
    refreshRate: '144Hz + HDR',
    os: 'VIDAA U7',
    sound: '5.1ch 2x15W + 20W + 2x5W built-in sub, Dolby surround',
    connectivity: ['WiFi', 'Bluetooth 5', 'HDMI x4', 'USB 2.0 x2', 'SPDIF', 'AV'],
    tuner: 'DVB-T/T2, Time Shift, TV recording',
    extras: [
      'AI Upscaler (HD → 4K)',
      'Hi-View Engine X',
      'Dynamic X-Display',
      '144Hz Game Mode Pro',
      'Quantum Dot Colour',
      'CineStage X Surround',
      'Mini-LED X backlight',
      '6.5 ms response time',
    ],
    image: u7kHero,
    banners: [{ id: 'u7k-banner', desktop: u7kHero, alt: 'Hisense U7K hero' }],
    heroVideo: 'https://hisenseme.com/storage/13212/new-video-66ab022f82acb.mp4',
    posterImage: u7kVideoPoster,
    featureCards: [
      {
        title: 'Dolby Vision-Atoms',
        description:
          'Dense Mini-LED backlight with precise local dimming for deep blacks and bright highlights.',
        image: dolbyVisionAtomsLogo as StaticImageData,
        imageBlack: dolbyVisionAtomsLogo1 as StaticImageData,
      },
      {
        title: 'HDR',
        description:
          'Dense Mini-LED backlight with precise local dimming for deep blacks and bright highlights.',
        image: HdrLogo,
        imageBlack: HdrLogo1,
      },
      {
        title: 'Filmmaker',
        description:
          'Dense Mini-LED backlight with precise local dimming for deep blacks and bright highlights.',
        image: filmmakerLogo,
      },
      {
        title: 'IMAX',
        description:
          'Dense Mini-LED backlight with precise local dimming for deep blacks and bright highlights.',
        image: ImaxLogo,
        imageBlack: ImaxLogo1,
      },
      {
        title: 'Hi-view',
        description:
          'Dense Mini-LED backlight with precise local dimming for deep blacks and bright highlights.',
        image: HiViewLogo,
      },
      {
        title: 'Mini-LED',
        description:
          'Dense Mini-LED backlight with precise local dimming for deep blacks and bright highlights.',
        image: u7kFeature6,
      },
      {
        title: 'Quantum Dot Colour',
        description: 'Billion+ colour shades with high volume for vivid HDR scenes.',
        image: quantumDotLogo,
      },
      {
        title: 'Dynamic X-Display',
        description: 'Optimized panel uniformity and anti-glare for wide seating and bright rooms.',
        image: dynamicXDisplayLogo,
      },
      {
        title: '144Hz Game Mode Pro',
        description: 'High refresh rate with low latency for fast games and smooth sports.',
        image: gameModeLogo,
      },
      {
        title: 'CineStage X Surround',
        description: '5.1 channel sound layout with Dolby support and built-in subwoofer.',
        image: dolbyVisionAtomsLogo0,
      },
    ],
    contentSections: [
      {
        image: u7kIntelligentProcessor,
        copyKey: 'intelligentProcessor',
      },
      {
        image: u7kDetailSection,
        copyKey: 'detail',
      },
      {
        image: u7kDolbySection,
        copyKey: 'dolby',
      },
      {
        image: u7kImaxSection,
        copyKey: 'imax',
      },
    ],
    stackedSections: [
      {
        image: u7kfilmMakerSection,
        copyKey: 'filmMaker',
      },
      {
        image: u7kVideoPoster,
        copyKey: 'gamePlay',
      },
    ],
    bottomStackedSections: [
      {
        image: u7kOptimizationSection,
        copyKey: 'optimization',
      },
      {
        image: u7kStayConnectedSection,
        copyKey: 'stayConnected',
      },
    ],
    comparisonSections: [
      {
        before: u7kAutoLightBeforeSection,
        after: u7kAutoLightAfterSection,
        copyKey: 'autoLight',
      },
      {
        before: u7kSportsModeBeforeSection,
        after: u7kSportsModeAfterSection,
        copyKey: 'sportsMode',
      },
    ],
    experienceSection: {
      image: u7kExperienceSection,
      copyKey: 'experience',
    },
    specs: {
      en: [
        'Smart TV with sharp 4K picture (3840 x 2160, 8MP)',
        'VIDAA U7 operating system',
        'AI Upscaler from HD to 4K',
        '178° viewing with HDR picture',
        '144Hz refresh rate',
        '6.5 ms response time',
        'Quantum Dot color (wide gamut)',
        'Time Shift and built-in digital tuner',
        'Dolby surround output: 5.1 (2x15W + 20W + 2x5W built-in subwoofer)',
        'WiFi and Bluetooth 5 connectivity',
        'Mobile device connectivity',
        'DVB-T/T2 digital tuner',
        'TV recording support',
        'SPDIF, AV, USB 2.0 x 2, HDMI x 4',
      ],
      fa: [
        'تلویزیون هوشمند با تصویر شفاف 4K (3840x2160، هشت مگاپیکسل)',
        'سیستم عامل VIDAA U7',
        'ارتقای تصویر از HD به 4K با AI Upscaler',
        'زاویه دید 178 درجه همراه با تصویر HDR',
        'نرخ نوسازی 144 هرتز',
        'پاسخ‌گویی 6.5 میلی‌ثانیه',
        'رنگ‌های گسترده Quantum Dot',
        'Time Shift و گیرنده دیجیتال داخلی',
        'خروجی صدای دالبی 5.1 (2x15W + 20W + 2x5W به همراه ساب‌ووفر داخلی)',
        'اتصال WiFi و Bluetooth 5',
        'اتصال دستگاه‌های همراه',
        'گیرنده دیجیتال DVB-T/T2',
        'پشتیبانی از ضبط برنامه',
        'SPDIF، AV، دو درگاه USB 2.0 و چهار درگاه HDMI',
      ],
    },
    copy: {
      en: {
        name: 'Hisense U7K ULED MiniLED 4K TV',
        tagline: '100-inch Mini-LED X with 144Hz, wide colour, and cinematic 5.1-channel audio.',
        description:
          'Mini-LED X backlight with Quantum Dot colour, 144Hz motion, and 6.5ms response time—paired with VIDAA U7 smart OS and immersive 5.1-channel sound.',
        highlights: [
          '100-inch Mini-LED X 4K (3840 x 2160) with HDR and 178° viewing.',
          '144Hz refresh with 6.5ms response for smooth sports and gaming.',
          'Hi-View Engine X, Dynamic X-Display, and Quantum Dot Colour accuracy.',
          '5.1ch audio: 2x15 W + 20W + 2x5 W with built-in sub and Dolby surround.',
          'Time Shift, DVB-T/T2 tuner, and TV recording support.',
          'WiFi, Bluetooth 5, HDMI x 4, USB 2.0 x 2, SPDIF, and AV connectivity.',
        ],
        blocks: {
          featureIntro: {
            title: 'Great Things Come in Small Packages',
            text: "Hisense's Mini LED setup improves on these LEDs, resulting in breathtaking detail on screen. Tightly grouped LEDs for an infinitely more precise backlight and better contrast control. Additionally, the mini-LEDs emit light in a line, instead of a diffuse cone which also improves precision. Utilize up to 1000 dimming zones for improved contrast and a crisp, vivid picture.",
          },
          masterMoment: {
            title: 'Master The Moments With Details',
          },
          intelligentProcessor: {
            title: 'Scene-By-Scene Intelligent Processor',
            text: 'Hisense’s Hi-View Engine is both the brains and the muscle that keeps your TV running smoothly. A powerful neural network consistently optimizes your viewing experience with real-time frame-level analysis to ensure you’re experiencing the optimal audiovisual journey, while also taking care of complex functions like 4K upscaling, and color enhancement so that even lower quality video looks better than ever.',
          },
          detail: {
            title: 'See All The Content You Love in Dazzling Details',
            text: 'Hisense TVs have taken the only sensible approach to HDR with support for all major formats, including Dolby Vision, HDR10, HDR10+, and HLG. Never worry about subpar video quality or compatibility again. Simply choose and play whatever content you want, knowing you’re experiencing it in perfect detail, enhanced colors, and deeper blacks, thanks to the wide range of HDR formats.',
          },
          dolby: {
            title: 'Step into The Story',
            text: 'See and hear what you’ve been missing. Connect more deeply to the shows and movies you love when you watch them in Dolby. Dolby builds a deeper connection to the stories and characters you love and take your entertainment to new heights when you stream your favorite shows and the best movies.',
          },
          imax: {
            title: 'Unleash The Power of Imax at Home',
            text: 'IMAX quality cinema need not be out of reach. Certified by the IMAX corporation and Hollywood’s leading technical specialists to deliver IMAX’s signature brand picture quality and DTS®-powered audio immersion from the comfort of your own home. Dive deeper into the world’s most innovative movie-going experience for an immersive audio visual experience.',
          },
          filmMaker: {
            title: 'Watch Your Movies and TV Shows The Way The Filmmakers Intended',
            text: 'Experience the message as it was intended with the Hisense Filmmaker Mode. Adjust your video to its original settings, to see details like the sound, aspect ratio, color, frame rate, and more as it was originally envisioned for the most authentic display of your favorite filmmaker’s masterpiece, before it was altered for generic viewing.',
          },
          gamePlay: {
            title: 'Dominate With Optimized Gameplay',
            text: 'Dominate your opponents by equipping the Game Bar and using an array of tools to give you the best gaming experience technology has to offer. From providing real time refresh rate and input lag status reports, to an adaptive easy to adjust screen to quickly and smoothly adjust your picture size and position. Surprise your opponents with a tactical gameplay that fully supports your skill set.',
          },
          autoLight: {
            title: 'Auto-Optimized For Any Light',
            text: 'The room light that is too bright or too dark will be something in the past. With your viewing ambient considered, Hisense TV can sense the surrounding in a sophisticated way and calibrates according to the brightness level and color temperature. The sunlight in your room will not take over the bright yet precise image. Meanwhile, it goes easy on your eyes at night but with all the captivating details.',
          },
          sportsMode: {
            title: 'Claim the Best Seats in The Stadium',
            text: 'AI Sports Mode enables the best picture and audio quality for the smoothest viewing experience. See every crack in the field, the players’ determined stare, and the excitement of everyone in the audience, and hear every note of the commentator’s voice. Hisense TVs intuitively sense and clean up and enhance fast-moving objects, for a perfectly fluid viewing experience.',
          },
          optimization: {
            title: 'AI Real-Time Scenario-Specific Optimization',
            text: 'Let your TV do the work with the intelligent AI Picture optimization software. Like the world’s greatestart critic, your TV will analyze the composition of each frame and adjust your brightness, resolution, color settings, and more so that each scene looks perfect – and you don’t have to do anything but sit back, relax, and let your smart TV take care of everything.',
          },
          stayConnected: {
            title: 'Stay Connected',
            text: 'Newest consoles, faster data transmission and lower lag. Add all external devices with state of the art wireless and wired connectivity. HDMI 2.1, AirPlay, Bluetooth, Share to TV, WISA Ready.',
          },
          experience: {
            title: 'Control The Experienc',
            text: 'Hisense TV and sound bar are made perfect for each other. Enjoy calibrating the sound simply with your TV remote powered by the EZPlay function. Customize the bass and tremble the way you like it, all visualized on your Hisense TV.',
          },
        },
      },
      fa: {
        name: 'تلویزیون U7K هایسنس (Mini-LED)',
        tagline: ' نمایشگر ۱۰۰ اینچی Mini-LED X با نرخ ۱۴۴ هرتز و صدای سینمایی ۵.۱ کاناله.',
        description:
          ' پس‌زمینه Mini-LED X با رنگ‌های Quantum Dot، حرکت ۱۴۴ هرتز و پاسخ ۶.۵ میلی‌ثانیه؛ همراه با سیستم هوشمند VIDAA U7 و صدای فراگیر ۵.۱ کانال.',
        highlights: [
          'نمایشگر ۱۰۰ اینچی Mini-LED X با وضوح 4K (۳۸۴۰ x ۲۱۶۰) و HDR.',
          'نرخ ۱۴۴ هرتز و پاسخ ۶.۵ میلی‌ثانیه برای ورزش و گیمینگ روان.',
          'پردازشگر Hi-View Engine X، نمایشگر Dynamic X و رنگ‌های Quantum Dot.',
          'صدای ۵.۱ کانال (۲x۱۵ وات + ۲۰ وات + ۲x۵ وات) با ساب داخلی و دالبی.',
          'Time Shift، تیونر DVB-T/T2 و امکان ضبط برنامه‌های تلویزیونی.',
          'اتصال WiFi، بلوتوث ۵، چهار HDMI، دو USB 2.0، SPDIF و AV.',
        ],
        blocks: {
          featureIntro: {
            title: 'کیفیت بزرگ در ابعاد کوچک',
            text: 'فناوری Mini LED هایسنس با بهبود ساختار LED‌ها، جزئیاتی نفس‌گیر و خیره‌کننده روی صفحه ایجاد می‌کند. گروه‌بندی بسیار دقیق LEDها، باعث کنترل بهتر نور پس‌زمینه و کنتراست می‌شود. علاوه‌براین، Mini LEDها نور را به‌صورت خطی منتشر می‌کنند، نه مخروطیِ پخش‌شونده؛ و همین موضوع دقت تصویر را به‌طور چشمگیری افزایش می‌دهد. با استفاده از ۱۰۰۰ ناحیه‌ی کم‌نوردهی (Dimming Zone) ، کنتراست بهبود می‌یابد و تصویری روشن، زنده و بسیار شفاف ارائه می‌شود.',
          },
          masterMoment: {
            title: 'لحظه‌ها را با جزئیات، بی نقص بسازید',
          },
          intelligentProcessor: {
            title: 'پردازش هوشمند صحنه‌ به‌ صحنه',
            text: 'موتور Hi-View هایسنس، قلب تپنده و مرکز فرمان تلویزیون است؛ جایی که ترکیبی از هوش و قدرت، تجربه تماشای شما را به بهترین شکل کنترل و بهینه‌سازی می‌کند. این پردازنده با استفاده از یک شبکه قدرتمند، هر فریم تصویر را به صورت لحظه‌ای تحلیل کرده و کیفیت صدا و تصویر را متناسب با صحنه تنظیم می‌کند. در کنار این‌ها، وظایف پیچیده‌ای مانند ارتقای هوشمند کیفیت تا 4K، بهبود رنگ و پردازش پیشرفته تصویر نیز به‌طور خودکار انجام می‌شود تا حتی محتوای کم کیفیت، شفاف‌ تر، طبیعی‌تر و جذاب‌تر از همیشه به‌نظر برسد.',
          },
          detail: {
            title: 'تماشای تمام محتوای موردعلاقه‌تان با جزئیات خیره‌ کننده',
            text: 'تلویزیون‌های هایسنس با پشتیبانی از تمامی فرمت‌های اصلی HDR از جمله Dolby Vision، HDR10+، HDR10 و HLG، تجربه‌ای کامل و بی‌نقص را ارائه می‌دهند. دیگر نگران سازگاری یا کیفیت پایین تصویر نباشید؛ هر محتوایی را که بخواهید، انتخاب و پخش کنید و از جزئیات دقیق‌تر، رنگ‌های زنده‌تر و سیاهی‌های عمیق‌تر لذت ببرید — همه این‌ها به لطف طیف گسترده‌ی فرمت‌های HDR.',
          },
          dolby: {
            title: 'تجربه‌ای عمیق‌تر از هر داستان',
            text: 'با Dolby، آنچه را تاکنون از دست می‌دادید ببینید و بشنوید. هنگام تماشای فیلم‌ها و سریال‌های محبوبتان، ارتباطی عمیق‌تر با داستان و شخصیت‌ها برقرار کنید و تجربه‌ای فراگیرتر داشته باشید. فناوری Dolby سرگرمی شما را به سطحی فراتر می‌برد و هنگام استریم بهترین فیلم‌ها و برنامه‌ها، شما را بیش از همیشه در فضای داستان غوطه‌ور می‌کند.',
          },
          imax: {
            title: 'قدرت IMAX را در خانه تجربه کنید',
            text: 'سینمای واقعی IMAX دیگر دست نیافتنی نیست. تلویزیون‌های هایسنس با تأییدیه رسمی شرکت IMAX و همکاری متخصصان برتر هالیوود، همان کیفیت خیره‌کننده‌ی تصویر و صدای فراگیر مبتنی بر DTS® را به خانه شما می‌آورند.با این استاندارد پیشرفته، در دنیای فیلم‌ها عمیق‌تر غوطه‌ور شوید و تجربه‌ای مشابه نوآورانه‌ترین سالن‌های سینمای جهان را در اتاق نشیمن خود احساس کنید — تجربه‌ای کاملاً فراگیر در تصویر و صدا.',
          },
          filmMaker: {
            title: 'تماشای فیلم‌ها و سریال‌ها همان‌طور که فیلمساز خواسته است',
            text: 'با Filmmaker Mode هایسنس، محتوای تصویری را دقیقاً همان‌گونه ببینید که سازندگان آن در نظر داشته‌اند. این حالت با بازگرداندن تنظیمات تصویر به حالت اصلی، جزئیاتی مانند صدا، نسبت تصویر، رنگ‌ها، نرخ فریم و دیگر ویژگی‌های مهم را مطابق نسخه‌ی اولیه نمایش می‌دهد. نتیجه؟ نمایش اصیل و وفادار به دیدگاه فیلمساز و تجربه‌ای بی‌واسطه از شاهکارهای موردعلاقه‌تان، قبل از آن‌که برای نمایش عمومی تغییر داده شوند.',
          },
          gamePlay: {
            title: 'برتری در بازی با تنظیمات هوشمند گیمینگ',
            text: 'با فعال‌سازی Game Bar هایسنس و مجموعه‌ای از ابزارهای تخصصی گیمینگ، تجربه‌ای سریع‌تر، دقیق‌تر و رقابتی‌تر داشته باشید. این قابلیت، اطلاعات مهمی مانند نرخ تازه‌سازی لحظه‌ای و وضعیت Input Lag را در همان لحظه نمایش می‌دهد و با امکان تنظیم آسان و تطبیقی اندازه و موقعیت تصویر، کنترل کامل صحنه را به شما می‌دهد. با این مجموعه‌ی حرفه‌ای، هوشمندانه‌تر بازی کنید، واکنش سریع‌تری داشته باشید و رقیبانتان را با یک سبک بازی تاکتیکی و هماهنگ با مهارت‌های خود غافلگیر کنید.',
          },
          autoLight: {
            title: 'بهینه‌سازی هوشمند برای هر میزان نور محیط',
            text: 'دیگر نور زیاد یا کمِ اتاق، مانعی برای تماشای عالی نخواهد بود. تلویزیون‌های هایسنس با سنجش دقیق نور و شرایط محیط، روشنایی و دمای رنگ تصویر را به‌صورت هوشمند تنظیم می‌کنند. در طول روز، نور خورشید نمی‌تواند بر وضوح و روشنایی دقیق تصویر غلبه کند و در شب نیز نمایشگر با کاهش خستگی چشم، همان جزئیات جذاب و کامل را ارائه می‌دهد.نتیجه؟ تصویری متعادل، واضح و راحت برای چشم در هر ساعت از شبانه‌روز و با هر شرایط نوری.',
          },
          sportsMode: {
            title: 'بهترین جایگاه ورزشگاه را در خانه تجربه کنید',
            text: 'با AI Sports Mode هایسنس، رقابت‌ها را با بهترین کیفیت تصویر و صدا دنبال کنید. هر ترک روی زمین بازی، نگاه مصمم بازیکنان و هیجان تماشاگران را با وضوح بی‌نظیر ببینید و صدای گزارشگر را با شفافیتی واقعی بشنوید. تلویزیون‌های هایسنس به‌صورت هوشمند اجسام سریع را تشخیص داده، نویزهای اضافی را پاک می‌کنند و حرکات را روان‌تر نمایش می‌دهند تا تماشای مسابقه، کاملاً سیال، واقعی و پرهیجان باشد—درست مثل نشستن در بهترین صندلی ورزشگاه.',
          },
          optimization: {
            title: 'بهینه‌سازی هوشمند صحنه‌ها در لحظه، با کمک AI',
            text: 'با نرم‌افزار هوشمند AI Picture، تلویزیون شما همه‌چیز را خودش مدیریت می‌کند. این فناوری با تحلیل دقیق ترکیب هر فریم — مانند یک منتقد هنری خبره — تنظیماتی مثل روشنایی، وضوح، رنگ و سایر پارامترهای تصویری را به‌طور خودکار اصلاح می‌کند تا هر صحنه در بهترین حالت ممکن نمایش داده شود. کافی است بنشینید و لذت ببرید؛ تلویزیون هوشمندتان تمام جزئیات را برای یک تجربه‌ی بی‌نقص تنظیم می‌کند.',
          },
          stayConnected: {
            title: 'همیشه متصل بمانید',
            text: 'با پشتیبانی از جدیدترین کنسول‌ها، انتقال داده سریع‌تر و تأخیر کمتر، تمام دستگاه‌های خارجی خود را به‌سادگی متصل کنید. تلویزیون‌های هایسنس با مجموعه‌ای از پیشرفته‌ترین قابلیت‌های ارتباطی — HDMI 2.1، AirPlay، بلوتوث، Share to TV و WISA Ready — تجربه‌ای روان، سریع و بی‌وقفه را در اختیار شما قرار می‌دهند.',
          },
          experience: {
            title: 'کنترل کامل تجربه تماشا',
            text: 'ساندبار و تلویزیون‌های هایسنس برای هماهنگی کامل با یکدیگر طراحی شده‌اند. با قابلیت EZPlay، تنها از طریق ریموت تلویزیون می‌توانید تنظیمات صدا را به‌سادگی مدیریت کنید. بیس و تریبل را مطابق سلیقه‌تان شخصی‌سازی کنید و همه تغییرات را به‌صورت واضح و یکپارچه روی صفحه تلویزیون ببینید؛ تجربه‌ای دقیق، راحت و کاملاً تحت کنترل شما.',
          },
        },
      },
    },
  },
];
