import { type StaticImageData } from 'next/image';
import tv100Q7Hero from '@/public/products/tvs/100Q7/hero.png';
import u7kHero from '@/public/products/tvs/100-U7K-Files/hero.png';
import u7kVideoPoster from '@/public/products/tvs/100-U7K-Files/gamePlaySection-image.jpg';
import u7kFeature1 from '@/public/products/tvs/100-U7K-Files/Dolby-Vision-Atmos-svg-dark.svg';
import u7kFeature11 from '@/public/products/tvs/100-U7K-Files/Dolby-Vision-Atmos-svg-white.svg';
import u7kFeature2 from '@/public/products/tvs/100-U7K-Files/HDR-logo-black.png';
import u7kFeature21 from '@/public/products/tvs/100-U7K-Files/HDR-logo.png';
import u7kFeature3 from '@/public/products/tvs/100-U7K-Files/Filmmaker-Mode-logo.png';
import u7kFeature4 from '@/public/products/tvs/100-U7K-Files/IMAX-logo.png';
import u7kFeature41 from '@/public/products/tvs/100-U7K-Files/IMAX-logo-reverse.png';
import u7kFeature5 from '@/public/products/tvs/100-U7K-Files/Hi-view-green-logo.png';
import u7kFeature6 from '@/public/products/tvs/100-U7K-Files/Feature_Mini-LED-X_b.png';
import u7kFeature7 from '@/public/products/tvs/100-U7K-Files/Feature_Quantum-Dot-Colour_m.png';
import u7kFeature8 from '@/public/products/tvs/100-U7K-Files/Feature_Dynamic-X-Display_m.png';
import u7kFeature9 from '@/public/products/tvs/100-U7K-Files/Feature_144Hz_Game_Mode_PRO_m.png';
import u7kFeature10 from '@/public/products/tvs/100-U7K-Files/Feature_CineStage-X-Surround_m.png';
import u7kIntelligentProcessor from '@/public/products/tvs/100-U7K-Files/HI-VIEW-engine.jpg';
import u7kDetailSection from '@/public/products/tvs/100-U7K-Files/detailSection-image.jpg';
import u7kDolbySection from '@/public/products/tvs/100-U7K-Files/dolbySection-image.jpg';
import u7kImaxSection from '@/public/products/tvs/100-U7K-Files/imaxSection-image.jpg';
import u7kfilmMakerSection from '@/public/products/tvs/100-U7K-Files/filmMakerSection-image.jpg';
import u7kAutoLightAfterSection from '@/public/products/tvs/100-U7K-Files/autoLight-after-image.jpg';
import u7kAutoLightBeforeSection from '@/public/products/tvs/100-U7K-Files/autoLight-before-image.jpg';
import u7kSportsModeBeforeSection from '@/public/products/tvs/100-U7K-Files/sportsMode-before-image.jpg';
import u7kSportsModeAfterSection from '@/public/products/tvs/100-U7K-Files/sportsMode-after-image.jpg';
import u7kOptimizationSection from '@/public/products/tvs/100-U7K-Files/optimization-image.jpg';
import u7kStayConnectedSection from '@/public/products/tvs/100-U7K-Files/stayConnected-image.jpg';
import u7kExperienceSection from '@/public/products/tvs/100-U7K-Files/experience-image.jpg';

export type TvProductCopy = {
  name: string;
  tagline: string;
  description: string;
  highlights: string[];
  featureIntroTitle?: string;
  featureIntroText?: string;
  masterMomentTitle?: string;
  intelligentProcessorTitle?: string;
  intelligentProcessorText?: string;
  detailTitle?: string;
  detailText?: string;
  dolbyTitle?: string;
  dolbyText?: string;
  imaxTitle?: string;
  imaxText?: string;
  filmMakerTitle?: string;
  filmMakerText?: string;
  gamePlayTitle?: string;
  gamePlayText?: string;
  autoLightTitle?: string;
  autoLightText?: string;
  sportsModeTitle?: string;
  sportsModeText?: string;
  optimizationTitle?: string;
  optimizationText?: string;
  stayConnectedTitle?: string;
  stayConnectedText?: string;
  experienceTitle?: string;
  experienceText?: string;
};

export type TvProduct = {
  id: string;
  sku: string;
  size: string;
  series: string;
  panel: string;
  resolution: string;
  refreshRate: string;
  os: string;
  sound: string;
  connectivity: string[];
  tuner: string;
  extras: string[];
  image: StaticImageData;
  heroVideo?: string;
  posterImage?: StaticImageData;
  gallery?: StaticImageData[];
  beforeAfter?: { before: StaticImageData; after: StaticImageData };
  filmMakerImage?: StaticImageData;
  gamePlayImage?: StaticImageData;
  autoLightComparison?: { before: StaticImageData; after: StaticImageData };
  sportsModeComparison?: { before: StaticImageData; after: StaticImageData };
  optimizationImage?: StaticImageData;
  stayConnectedImage?: StaticImageData;
  experienceImage?: StaticImageData;
  contentSections?: {
    image: StaticImageData;
    titleKey: keyof TvProductCopy;
    textKey: keyof TvProductCopy;
  }[];
  featureCards?: {
    title: string;
    description: string;
    image: StaticImageData;
    imageBlack?: StaticImageData;
  }[];
  badges?: StaticImageData[];
  copy: Record<'en' | 'fa', TvProductCopy>;
};

export const TV_PRODUCTS: TvProduct[] = [
  {
    id: '100Q7N',
    sku: '100Q7N',
    size: '100"',
    series: 'Q7N',
    panel: 'QLED & DLED',
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
    image: tv100Q7Hero,
    copy: {
      en: {
        name: 'Hisense 100Q7N QLED 4K TV',
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
      },
      fa: {
        name: 'تلویزیون 100Q7N هایسنس',
        tagline: 'نمایشگر ۱۰۰ اینچی QLED با نرخ ۱۴۴ هرتز و ارتقاء هوشمند 4K.',
        description:
          'تلویزیون پرچمدار ۱۰۰ اینچی با رنگ‌های Quantum Dot، زاویه دید گسترده و سیستم عامل VIDAA U7.6؛ مناسب سالن‌های سینمای خانگی و گیمینگ.',
        highlights: [
          'نمایشگر QLED 4K (۳۸۴۰x۲۱۶۰) با HDR و زاویه دید ۱۷۸ درجه.',
          'سیستم هوشمند VIDAA U7.6 با ارتقاء تصویر HD به 4K توسط هوش مصنوعی.',
          ' پردازشگر Hi-View Engine X و Dynamic X-Display برای روشنایی و کنتراست دقیق.',
          'حالت Game Mode Pro با نرخ ۱۴۴ هرتز و رنگ‌های Quantum Dot برای تاخیر کم.',
          'صدای ۲.۱ کانال (۲x۱۵ وات + ساب ۲۰ وات)، دالبی و CineStage X Surround.',
          'اتصال WiFi، بلوتوث ۵، چهار HDMI، دو USB 2.0، SPDIF، AV و خروجی هدفون.',
        ],
      },
    },
  },
  {
    id: '100U7K',
    sku: '100U7K',
    size: '100"',
    series: 'U7K',
    panel: 'Mini-LED X',
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
      '6.5ms response time',
    ],
    image: u7kHero,
    heroVideo: 'https://hisenseme.com/storage/13212/new-video-66ab022f82acb.mp4',
    posterImage: u7kVideoPoster,
    filmMakerImage: u7kfilmMakerSection,
    gamePlayImage: u7kVideoPoster,
    autoLightComparison: { before: u7kAutoLightBeforeSection, after: u7kAutoLightAfterSection },
    sportsModeComparison: { before: u7kSportsModeBeforeSection, after: u7kSportsModeAfterSection },
    optimizationImage: u7kOptimizationSection,
    stayConnectedImage: u7kStayConnectedSection,
    experienceImage: u7kExperienceSection,
    contentSections: [
      {
        image: u7kIntelligentProcessor,
        titleKey: 'intelligentProcessorTitle',
        textKey: 'intelligentProcessorText',
      },
      {
        image: u7kDetailSection,
        titleKey: 'detailTitle',
        textKey: 'detailText',
      },
      {
        image: u7kDolbySection,
        titleKey: 'dolbyTitle',
        textKey: 'dolbyText',
      },
      {
        image: u7kImaxSection,
        titleKey: 'imaxTitle',
        textKey: 'imaxText',
      },
    ],
    featureCards: [
      {
        title: 'Dolby Vision-Atoms',
        description:
          'Dense Mini-LED backlight with precise local dimming for deep blacks and bright highlights.',
        image: u7kFeature1 as StaticImageData,
        imageBlack: u7kFeature11 as StaticImageData,
      },
      {
        title: 'HDR',
        description:
          'Dense Mini-LED backlight with precise local dimming for deep blacks and bright highlights.',
        image: u7kFeature2,
        imageBlack: u7kFeature21,
      },
      {
        title: 'Filmmaker',
        description:
          'Dense Mini-LED backlight with precise local dimming for deep blacks and bright highlights.',
        image: u7kFeature3,
      },
      {
        title: 'IMAX',
        description:
          'Dense Mini-LED backlight with precise local dimming for deep blacks and bright highlights.',
        image: u7kFeature4,
        imageBlack: u7kFeature41,
      },
      {
        title: 'Hi-view',
        description:
          'Dense Mini-LED backlight with precise local dimming for deep blacks and bright highlights.',
        image: u7kFeature5,
      },
      {
        title: 'Mini-LED X',
        description:
          'Dense Mini-LED backlight with precise local dimming for deep blacks and bright highlights.',
        image: u7kFeature6,
      },
      {
        title: 'Quantum Dot Colour',
        description: 'Billion+ colour shades with high volume for vivid HDR scenes.',
        image: u7kFeature7,
      },
      {
        title: 'Dynamic X-Display',
        description: 'Optimized panel uniformity and anti-glare for wide seating and bright rooms.',
        image: u7kFeature8,
      },
      {
        title: '144Hz Game Mode Pro',
        description: 'High refresh rate with low latency for fast games and smooth sports.',
        image: u7kFeature9,
      },
      {
        title: 'CineStage X Surround',
        description: '5.1 channel sound layout with Dolby support and built-in subwoofer.',
        image: u7kFeature10,
      },
    ],
    copy: {
      en: {
        name: 'Hisense 100U7K Mini-LED 4K TV',
        tagline: '100-inch Mini-LED X with 144Hz, wide colour, and cinematic 5.1-channel audio.',
        description:
          'Mini-LED X backlight with Quantum Dot colour, 144Hz motion, and 6.5ms response time—paired with VIDAA U7 smart OS and immersive 5.1-channel sound.',
        highlights: [
          '100-inch Mini-LED X 4K (3840x2160) with HDR and 178° viewing.',
          '144Hz refresh with 6.5ms response for smooth sports and gaming.',
          'Hi-View Engine X, Dynamic X-Display, and Quantum Dot Colour accuracy.',
          '5.1ch audio: 2x15W + 20W + 2x5W with built-in sub and Dolby surround.',
          'Time Shift, DVB-T/T2 tuner, and TV recording support.',
          'WiFi, Bluetooth 5, HDMI x4, USB 2.0 x2, SPDIF, and AV connectivity.',
        ],
        featureIntroTitle: 'Great Things Come in Small Packages',
        featureIntroText:
          "Hisense's Mini LED setup improves on these LEDs, resulting in breathtaking detail on screen. Tightly grouped LEDs for an infinitely more precise backlight and better contrast control. Additionally, the mini-LEDs emit light in a line, instead of a diffuse cone which also improves precision. Utilize up to 1000 dimming zones for improved contrast and a crisp, vivid picture.",
        masterMomentTitle: 'Master The Moments With Details',
        intelligentProcessorTitle: 'Scene-By-Scene Intelligent Processor',
        intelligentProcessorText:
          'Hisense’s Hi-View Engine is both the brains and the muscle that keeps your TV running smoothly. A powerful neural network consistently optimizes your viewing experience with real-time frame-level analysis to ensure you’re experiencing the optimal audiovisual journey, while also taking care of complex functions like 4K upscaling, and color enhancement so that even lower quality video looks better than ever.',
        detailTitle: 'See All The Content You Love in Dazzling Details',
        detailText:
          'Hisense TVs have taken the only sensible approach to HDR with support for all major formats, including Dolby Vision, HDR10, HDR10+, and HLG. Never worry about subpar video quality or compatibility again. Simply choose and play whatever content you want, knowing you’re experiencing it in perfect detail, enhanced colors, and deeper blacks, thanks to the wide range of HDR formats.',
        dolbyTitle: 'Step into The Story',
        dolbyText:
          'See and hear what you’ve been missing. Connect more deeply to the shows and movies you love when you watch them in Dolby. Dolby builds a deeper connection to the stories and characters you love and take your entertainment to new heights when you stream your favorite shows and the best movies.',
        imaxTitle: 'Unleash The Power of Imax at Home',
        imaxText:
          'IMAX quality cinema need not be out of reach. Certified by the IMAX corporation and Hollywood’s leading technical specialists to deliver IMAX’s signature brand picture quality and DTS®-powered audio immersion from the comfort of your own home. Dive deeper into the world’s most innovative movie-going experience for an immersive audio visual experience.',
        filmMakerTitle: 'Watch Your Movies and TV Shows The Way The Filmmakers Intended',
        filmMakerText:
          'Experience the message as it was intended with the Hisense Filmmaker Mode. Adjust your video to its original settings, to see details like the sound, aspect ratio, color, frame rate, and more as it was originally envisioned for the most authentic display of your favorite filmmaker’s masterpiece, before it was altered for generic viewing.',
        gamePlayTitle: 'Dominate With Optimized Gameplay',
        gamePlayText:
          'Dominate your opponents by equipping the Game Bar and using an array of tools to give you the best gaming experience technology has to offer. From providing real time refresh rate and input lag status reports, to an adaptive easy to adjust screen to quickly and smoothly adjust your picture size and position. Surprise your opponents with a tactical gameplay that fully supports your skill set.',
        autoLightTitle: 'Auto-Optimized For Any Light',
        autoLightText:
          'The room light that is too bright or too dark will be something in the past. With your viewing ambient considered, Hisense TV can sense the surrounding in a sophisticated way and calibrates according to the brightness level and color temperature. The sunlight in your room will not take over the bright yet precise image. Meanwhile, it goes easy on your eyes at night but with all the captivating details.',
        sportsModeTitle: 'Claim the Best Seats in The Stadium',
        sportsModeText:
          'AI Sports Mode enables the best picture and audio quality for the smoothest viewing experience. See every crack in the field, the players’ determined stare, and the excitement of everyone in the audience, and hear every note of the commentator’s voice. Hisense TVs intuitively sense and clean up and enhance fast-moving objects, for a perfectly fluid viewing experience.',
        optimizationTitle: 'AI Real-Time Scenario-Specific Optimization',
        optimizationText:
          'Let your TV do the work with the intelligent AI Picture optimization software. Like the world’s greatestart critic, your TV will analyze the composition of each frame and adjust your brightness, resolution, color settings, and more so that each scene looks perfect – and you don’t have to do anything but sit back, relax, and let your smart TV take care of everything.',
        stayConnectedTitle: 'Stay Connected',
        stayConnectedText:
          'Newest consoles, faster data transmission and lower lag. Add all external devices with state of the art wireless and wired connectivity. HDMI 2.1, AirPlay, Bluetooth, Share to TV, WISA Ready.',
        experienceTitle: 'Control The Experienc',
        experienceText:
          'Hisense TV and sound bar are made perfect for each other. Enjoy calibrating the sound simply with your TV remote powered by the EZPlay function. Customize the bass and tremble the way you like it, all visualized on your Hisense TV.',
      },
      fa: {
        name: 'تلویزیون 100U7K هایسنس (Mini-LED)',
        tagline: 'نمایشگر ۱۰۰ اینچی Mini-LED X با نرخ ۱۴۴ هرتز و صدای سینمایی ۵.۱ کاناله.',
        description:
          'پس‌زمینه Mini-LED X با رنگ‌های Quantum Dot، حرکت ۱۴۴ هرتز و پاسخ ۶.۵ میلی‌ثانیه؛ همراه با سیستم هوشمند VIDAA U7 و صدای فراگیر ۵.۱ کانال.',
        highlights: [
          'نمایشگر ۱۰۰ اینچی Mini-LED X با وضوح 4K (۳۸۴۰x۲۱۶۰) و HDR.',
          'نرخ ۱۴۴ هرتز و پاسخ ۶.۵ میلی‌ثانیه برای ورزش و گیمینگ روان.',
          'پردازشگر Hi-View Engine X، نمایشگر Dynamic X و رنگ‌های Quantum Dot.',
          'صدای ۵.۱ کانال (۲x۱۵ وات + ۲۰ وات + ۲x۵ وات) با ساب داخلی و دالبی.',
          'Time Shift، تیونر DVB-T/T2 و امکان ضبط برنامه‌های تلویزیونی.',
          'اتصال WiFi، بلوتوث ۵، چهار HDMI، دو USB 2.0، SPDIF و AV.',
        ],
        featureIntroTitle: 'کیفیت بزرگ در ابعاد کوچک',
        featureIntroText:
          'فناوری Mini LED هایسنس با بهبود ساختار LED‌ها، جزئیاتی نفس‌گیر و خیره‌کننده روی صفحه ایجاد می‌کند. گروه‌بندی بسیار دقیق LEDها، باعث کنترل بهتر نور پس‌زمینه و کنتراست می‌شود. علاوه‌براین، Mini LEDها نور را به‌صورت خطی منتشر می‌کنند، نه مخروطیِ پخش‌شونده؛ و همین موضوع دقت تصویر را به‌طور چشمگیری افزایش می‌دهد. با استفاده از ۱۰۰۰ ناحیه‌ی کم‌نوردهی (Dimming Zone) ، کنتراست بهبود می‌یابد و تصویری روشن، زنده و بسیار شفاف ارائه می‌شود.',
        masterMomentTitle: 'لحظه‌ها را با جزئیات، بی نقص بسازید',
        intelligentProcessorTitle: 'پردازش هوشمند صحنه‌ به‌ صحنه',
        intelligentProcessorText:
          'موتور Hi-View هایسنس، قلب تپنده و مرکز فرمان تلویزیون است؛ جایی که ترکیبی از هوش و قدرت، تجربه تماشای شما را به بهترین شکل کنترل و بهینه‌سازی می‌کند. این پردازنده با استفاده از یک شبکه قدرتمند، هر فریم تصویر را به صورت لحظه‌ای تحلیل کرده و کیفیت صدا و تصویر را متناسب با صحنه تنظیم می‌کند. در کنار این‌ها، وظایف پیچیده‌ای مانند ارتقای هوشمند کیفیت تا 4K، بهبود رنگ و پردازش پیشرفته تصویر نیز به‌طور خودکار انجام می‌شود تا حتی محتوای کم کیفیت، شفاف‌ تر، طبیعی‌تر و جذاب‌تر از همیشه به‌نظر برسد.',
        detailTitle: 'تماشای تمام محتوای موردعلاقه‌تان با جزئیات خیره‌ کننده',
        detailText:
          'تلویزیون‌های هایسنس با پشتیبانی از تمامی فرمت‌های اصلی HDR از جمله Dolby Vision، HDR10+، HDR10 و HLG، تجربه‌ای کامل و بی‌نقص را ارائه می‌دهند. دیگر نگران سازگاری یا کیفیت پایین تصویر نباشید؛ هر محتوایی را که بخواهید، انتخاب و پخش کنید و از جزئیات دقیق‌تر، رنگ‌های زنده‌تر و سیاهی‌های عمیق‌تر لذت ببرید — همه این‌ها به لطف طیف گسترده‌ی فرمت‌های HDR.',
        dolbyTitle: 'تجربه‌ای عمیق‌تر از هر داستان',
        dolbyText:
          'با Dolby، آنچه را تاکنون از دست می‌دادید ببینید و بشنوید. هنگام تماشای فیلم‌ها و سریال‌های محبوبتان، ارتباطی عمیق‌تر با داستان و شخصیت‌ها برقرار کنید و تجربه‌ای فراگیرتر داشته باشید. فناوری Dolby سرگرمی شما را به سطحی فراتر می‌برد و هنگام استریم بهترین فیلم‌ها و برنامه‌ها، شما را بیش از همیشه در فضای داستان غوطه‌ور می‌کند.',
        imaxTitle: 'قدرت IMAX را در خانه تجربه کنید',
        imaxText:
          'سینمای واقعی IMAX دیگر دست نیافتنی نیست. تلویزیون‌های هایسنس با تأییدیه رسمی شرکت IMAX و همکاری متخصصان برتر هالیوود، همان کیفیت خیره‌کننده‌ی تصویر و صدای فراگیر مبتنی بر DTS® را به خانه شما می‌آورند.با این استاندارد پیشرفته، در دنیای فیلم‌ها عمیق‌تر غوطه‌ور شوید و تجربه‌ای مشابه نوآورانه‌ترین سالن‌های سینمای جهان را در اتاق نشیمن خود احساس کنید — تجربه‌ای کاملاً فراگیر در تصویر و صدا.',
        filmMakerTitle: 'تماشای فیلم‌ها و سریال‌ها همان‌طور که فیلمساز خواسته است',
        filmMakerText:
          'با Filmmaker Mode هایسنس، محتوای تصویری را دقیقاً همان‌گونه ببینید که سازندگان آن در نظر داشته‌اند. این حالت با بازگرداندن تنظیمات تصویر به حالت اصلی، جزئیاتی مانند صدا، نسبت تصویر، رنگ‌ها، نرخ فریم و دیگر ویژگی‌های مهم را مطابق نسخه‌ی اولیه نمایش می‌دهد. نتیجه؟ نمایش اصیل و وفادار به دیدگاه فیلمساز و تجربه‌ای بی‌واسطه از شاهکارهای موردعلاقه‌تان، قبل از آن‌که برای نمایش عمومی تغییر داده شوند.',
        gamePlayTitle: 'برتری در بازی با تنظیمات هوشمند گیمینگ',
        gamePlayText:
          'با فعال‌سازی Game Bar هایسنس و مجموعه‌ای از ابزارهای تخصصی گیمینگ، تجربه‌ای سریع‌تر، دقیق‌تر و رقابتی‌تر داشته باشید. این قابلیت، اطلاعات مهمی مانند نرخ تازه‌سازی لحظه‌ای و وضعیت Input Lag را در همان لحظه نمایش می‌دهد و با امکان تنظیم آسان و تطبیقی اندازه و موقعیت تصویر، کنترل کامل صحنه را به شما می‌دهد. با این مجموعه‌ی حرفه‌ای، هوشمندانه‌تر بازی کنید، واکنش سریع‌تری داشته باشید و رقیبانتان را با یک سبک بازی تاکتیکی و هماهنگ با مهارت‌های خود غافلگیر کنید.',
        autoLightTitle: 'بهینه‌سازی هوشمند برای هر میزان نور محیط',
        autoLightText:
          'دیگر نور زیاد یا کمِ اتاق، مانعی برای تماشای عالی نخواهد بود. تلویزیون‌های هایسنس با سنجش دقیق نور و شرایط محیط، روشنایی و دمای رنگ تصویر را به‌صورت هوشمند تنظیم می‌کنند. در طول روز، نور خورشید نمی‌تواند بر وضوح و روشنایی دقیق تصویر غلبه کند و در شب نیز نمایشگر با کاهش خستگی چشم، همان جزئیات جذاب و کامل را ارائه می‌دهد.نتیجه؟ تصویری متعادل، واضح و راحت برای چشم در هر ساعت از شبانه‌روز و با هر شرایط نوری.',
        sportsModeTitle: 'بهترین جایگاه ورزشگاه را در خانه تجربه کنید',
        sportsModeText:
          'با AI Sports Mode هایسنس، رقابت‌ها را با بهترین کیفیت تصویر و صدا دنبال کنید. هر ترک روی زمین بازی، نگاه مصمم بازیکنان و هیجان تماشاگران را با وضوح بی‌نظیر ببینید و صدای گزارشگر را با شفافیتی واقعی بشنوید. تلویزیون‌های هایسنس به‌صورت هوشمند اجسام سریع را تشخیص داده، نویزهای اضافی را پاک می‌کنند و حرکات را روان‌تر نمایش می‌دهند تا تماشای مسابقه، کاملاً سیال، واقعی و پرهیجان باشد—درست مثل نشستن در بهترین صندلی ورزشگاه.',
        optimizationTitle: 'بهینه‌سازی هوشمند صحنه‌ها در لحظه، با کمک AI',
        optimizationText:
          'با نرم‌افزار هوشمند AI Picture، تلویزیون شما همه‌چیز را خودش مدیریت می‌کند. این فناوری با تحلیل دقیق ترکیب هر فریم — مانند یک منتقد هنری خبره — تنظیماتی مثل روشنایی، وضوح، رنگ و سایر پارامترهای تصویری را به‌طور خودکار اصلاح می‌کند تا هر صحنه در بهترین حالت ممکن نمایش داده شود. کافی است بنشینید و لذت ببرید؛ تلویزیون هوشمندتان تمام جزئیات را برای یک تجربه‌ی بی‌نقص تنظیم می‌کند.',
        stayConnectedTitle: 'همیشه متصل بمانید',
        stayConnectedText:
          'با پشتیبانی از جدیدترین کنسول‌ها، انتقال داده سریع‌تر و تأخیر کمتر، تمام دستگاه‌های خارجی خود را به‌سادگی متصل کنید. تلویزیون‌های هایسنس با مجموعه‌ای از پیشرفته‌ترین قابلیت‌های ارتباطی — HDMI 2.1، AirPlay، بلوتوث، Share to TV و WISA Ready — تجربه‌ای روان، سریع و بی‌وقفه را در اختیار شما قرار می‌دهند.',
        experienceTitle: 'کنترل کامل تجربه تماشا',
        experienceText:
          'ساندبار و تلویزیون‌های هایسنس برای هماهنگی کامل با یکدیگر طراحی شده‌اند. با قابلیت EZPlay، تنها از طریق ریموت تلویزیون می‌توانید تنظیمات صدا را به‌سادگی مدیریت کنید. بیس و تریبل را مطابق سلیقه‌تان شخصی‌سازی کنید و همه تغییرات را به‌صورت واضح و یکپارچه روی صفحه تلویزیون ببینید؛ تجربه‌ای دقیق، راحت و کاملاً تحت کنترل شما.',
      },
    },
  },
];
