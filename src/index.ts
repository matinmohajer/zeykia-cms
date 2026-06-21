import type { Core } from '@strapi/strapi';

// ---------------------------------------------------------------------------
// Seed data — runs once on first boot, skipped if any collections exist
// ---------------------------------------------------------------------------

async function seedCollections(strapi: Core.Strapi) {
  const items = [
    {
      en: { name: 'Persian Heritage', description: 'A journey through ancient Persian carpet traditions spanning three millennia.', slug: 'persian-heritage', featured: true },
      fa: { name: 'میراث ایرانی', description: 'سفری در میان سنت‌های سه‌هزارساله قالی‌بافی ایرانی.' },
      ar: { name: 'التراث الفارسي', description: 'رحلة عبر تقاليد السجاد الفارسي العريقة الممتدة لثلاثة آلاف عام.' },
    },
    {
      en: { name: 'Royal Tabriz', description: 'The finest Tabriz masterpieces, woven with silk and gold for royalty.', slug: 'royal-tabriz', featured: true },
      fa: { name: 'تبریز سلطنتی', description: 'شاهکارهای برتر تبریز، بافته‌شده با ابریشم و طلا برای شاهان.' },
      ar: { name: 'تبريز الملكي', description: 'أجمل روائع تبريز، منسوجة بالحرير والذهب للملوك.' },
    },
    {
      en: { name: 'Silk Garden', description: 'Delicate silk carpets inspired by the paradise gardens of Persian palaces.', slug: 'silk-garden', featured: true },
      fa: { name: 'باغ ابریشم', description: 'فرش‌های ابریشمی ظریف الهام‌گرفته از باغ‌های بهشتی قصرهای ایرانی.' },
      ar: { name: 'حديقة الحرير', description: 'سجاد حريري رقيق مستوحى من الحدائق الجنائنية في القصور الفارسية.' },
    },
  ];

  for (const item of items) {
    const doc = await strapi.documents('api::collection.collection').create({
      data: item.en as any,
      locale: 'en',
      status: 'published',
    });
    for (const locale of ['fa', 'ar'] as const) {
      await strapi.documents('api::collection.collection').update({
        documentId: doc.documentId,
        locale,
        data: item[locale] as any,
        status: 'published',
      });
    }
  }
}

async function seedColors(strapi: Core.Strapi) {
  const items = [
    {
      en: { name: 'Midnight Blue', hex: '#1a2b5c', hue: 'blue', story: 'Inspired by the deep night skies over the Persian plateau.', inspiration: 'Night sky over Isfahan' },
      fa: { name: 'آبی نیمه‌شب', story: 'الهام گرفته از آسمان شب‌های عمیق فلات ایران.', inspiration: 'آسمان شب اصفهان' },
      ar: { name: 'الأزرق منتصف الليل', story: 'مستوحى من سماء الليل العميقة فوق الهضبة الفارسية.', inspiration: 'سماء الليل فوق أصفهان' },
    },
    {
      en: { name: 'Persian Rose', hex: '#c0392b', hue: 'red', story: 'The crimson of ancient pomegranates, symbol of abundance.', inspiration: 'Pomegranate gardens of Yazd' },
      fa: { name: 'رز ایرانی', story: 'سرخی انار باستانی، نماد فراوانی و برکت.', inspiration: 'باغ‌های انار یزد' },
      ar: { name: 'الوردة الفارسية', story: 'قرمزية الرمان القديمة، رمز الوفرة والخيرات.', inspiration: 'حدائق الرمان في يزد' },
    },
    {
      en: { name: 'Forest Emerald', hex: '#1e8449', hue: 'green', story: 'The lush green of the Hyrcanian forests of northern Iran.', inspiration: 'Hyrcanian forests, Gilan' },
      fa: { name: 'زمرد جنگل', story: 'سبز سرسبز جنگل‌های هیرکانی شمال ایران.', inspiration: 'جنگل‌های هیرکانی، گیلان' },
      ar: { name: 'زمرد الغابة', story: 'الأخضر المورق لغابات هيركانيا في شمال إيران.', inspiration: 'غابات هيركانيا، جيلان' },
    },
    {
      en: { name: 'Saffron Gold', hex: '#f39c12', hue: 'gold', story: 'Pure saffron gold — the most precious spice on earth.', inspiration: 'Saffron fields of Khorasan' },
      fa: { name: 'طلای زعفران', story: 'طلای زعفران ناب — گران‌بهاترین ادویه جهان.', inspiration: 'مزارع زعفران خراسان' },
      ar: { name: 'ذهب الزعفران', story: 'ذهب الزعفران الخالص — أغلى توابل الأرض.', inspiration: 'حقول الزعفران في خراسان' },
    },
    {
      en: { name: 'Lavender Mist', hex: '#8e44ad', hue: 'purple', story: 'The violet twilight of ancient Persepolis at dusk.', inspiration: 'Persepolis at sunset' },
      fa: { name: 'مه اسطوخودوس', story: 'شفق بنفش تخت‌جمشید باستانی در غروب.', inspiration: 'تخت‌جمشید در غروب آفتاب' },
      ar: { name: 'ضباب اللافندر', story: 'الغسق البنفسجي لبرسيبوليس القديمة عند الغروب.', inspiration: 'برسيبوليس عند غروب الشمس' },
    },
    {
      en: { name: 'Warm Sand', hex: '#d4a76a', hue: 'neutral', story: 'Desert sands from the Dasht-e Kavir, warm and timeless.', inspiration: 'Dasht-e Kavir desert' },
      fa: { name: 'شن گرم', story: 'ریگ‌های دشت کویر، گرم و بی‌زمان.', inspiration: 'بیابان دشت کویر' },
      ar: { name: 'الرمل الدافئ', story: 'رمال دشت كوير، دافئة وخارج الزمن.', inspiration: 'صحراء دشت كوير' },
    },
  ];

  for (const item of items) {
    const doc = await strapi.documents('api::color.color').create({
      data: item.en as any,
      locale: 'en',
      status: 'published',
    });
    for (const locale of ['fa', 'ar'] as const) {
      await strapi.documents('api::color.color').update({
        documentId: doc.documentId,
        locale,
        data: item[locale] as any,
        status: 'published',
      });
    }
  }
}

async function seedProducts(strapi: Core.Strapi) {
  const items = [
    {
      en: { name: 'Royal Kerman', description: 'A masterwork from the Kerman province, featuring intricate floral medallions in ivory and rose.', price: 4500, material: 'Hand-knotted wool on cotton', size: '200 x 300 cm', collection: 'vip', limited: true },
      fa: { name: 'کرمان سلطنتی', description: 'شاهکاری از استان کرمان با مدالیون‌های گل‌دار پیچیده به رنگ عاج و گلبهی.', material: 'پشم دست‌بافت روی پنبه', size: '۲۰۰ × ۳۰۰ سانتی‌متر' },
      ar: { name: 'كرمان الملكي', description: 'تحفة فنية من محافظة كرمان، تتميز بميداليات زهرية معقدة باللون العاجي والوردي.', material: 'صوف مربوط يدوياً على قطن', size: '200 × 300 سم' },
    },
    {
      en: { name: 'Isfahan Garden', description: 'Arabesque vines and blossoms woven in rich jewel tones, evoking the paradise gardens of Isfahan.', price: 2800, material: 'Hand-knotted wool', size: '150 x 230 cm', collection: 'public', limited: false },
      fa: { name: 'باغ اصفهان', description: 'تاک‌ها و شکوفه‌های اسلیمی در رنگ‌های جواهرگونه، یادآور باغ‌های بهشتی اصفهان.', material: 'پشم دست‌بافت', size: '۱۵۰ × ۲۳۰ سانتی‌متر' },
      ar: { name: 'حديقة أصفهان', description: 'كروم وأزهار عربية منسوجة بألوان جوهرية غنية، تستحضر الحدائق الجنائنية في أصفهان.', material: 'صوف مربوط يدوياً', size: '150 × 230 سم' },
    },
    {
      en: { name: 'Tribal Nomad', description: 'Bold geometric patterns from the Qashqai tribe, carrying centuries of nomadic artistry.', price: 1600, material: 'Hand-spun wool', size: '120 x 180 cm', collection: 'public', limited: false },
      fa: { name: 'عشایر کوچ‌نشین', description: 'طرح‌های هندسی جسورانه از قبیله قشقایی، حامل قرن‌ها هنر عشایری.', material: 'پشم دست‌ریسیده', size: '۱۲۰ × ۱۸۰ سانتی‌متر' },
      ar: { name: 'البدوي القبلي', description: 'أنماط هندسية جريئة من قبيلة القشقاي، تحمل قروناً من الفن البدوي.', material: 'صوف مغزول يدوياً', size: '120 × 180 سم' },
    },
    {
      en: { name: 'Persian Splendor', description: 'Extra-fine silk pile with 800 knots per square inch — a jewel of Persian textile heritage.', price: 8200, material: 'Pure silk on silk', size: '160 x 240 cm', collection: 'vip', limited: true },
      fa: { name: 'شکوه ایرانی', description: 'بافت ابریشم فوق‌العاده ظریف با ۸۰۰ گره در هر اینچ مربع — جواهری از میراث منسوجات ایرانی.', material: 'ابریشم خالص روی ابریشم', size: '۱۶۰ × ۲۴۰ سانتی‌متر' },
      ar: { name: 'الرونق الفارسي', description: 'خيوط حرير فائقة الدقة بـ 800 عقدة في البوصة المربعة — جوهرة التراث النسيجي الفارسي.', material: 'حرير خالص على حرير', size: '160 × 240 سم' },
    },
    {
      en: { name: 'Blue Medallion', description: 'The iconic blue-indigo Tabriz medallion design, a timeless classic for modern interiors.', price: 2100, material: 'Hand-knotted wool on cotton', size: '200 x 300 cm', collection: 'public', limited: false },
      fa: { name: 'مدالیون آبی', description: 'طرح مدالیون تبریز آبی-نیل رنگ، کلاسیکی بی‌زمان برای فضاهای مدرن.', material: 'پشم دست‌بافت روی پنبه', size: '۲۰۰ × ۳۰۰ سانتی‌متر' },
      ar: { name: 'الميدالية الزرقاء', description: 'تصميم ميدالية تبريز الزرقاء النيلية الأيقوني، كلاسيكي خالد للديكورات العصرية.', material: 'صوف مربوط يدوياً على قطن', size: '200 × 300 سم' },
    },
  ];

  for (const item of items) {
    const doc = await strapi.documents('api::product.product').create({
      data: item.en as any,
      locale: 'en',
      status: 'published',
    });
    for (const locale of ['fa', 'ar'] as const) {
      await strapi.documents('api::product.product').update({
        documentId: doc.documentId,
        locale,
        data: item[locale] as any,
        status: 'published',
      });
    }
  }
}

async function seedPages(strapi: Core.Strapi) {
  const aboutEn = `Born into a family of master weavers in Hereke, Turkey, our founder spent childhood summers watching her grandmother's hands move across the loom with the certainty of someone writing in a language older than words. Every colour was a decision, every knot a commitment — nothing could be undone without unravelling something true.

After studying textile arts in London and apprenticing under the late Ustad Gholam Reza Kashani in Isfahan, she returned with a single conviction: that the world's finest carpets deserved a house worthy of them. Zeykia — named after a great-aunt who wove in secret during years when looms were scarce — opened its first atelier in 2009.

Today, Zeykia represents the pinnacle of carpet artistry, working exclusively with master weavers whose families have practised their craft for generations. Each piece is authenticated, documented, and offered with the certainty that nothing inside it was made in haste.`;

  const aboutFa = `بنیانگذار ما در خانواده‌ای از استادان بافنده در هره‌که ترکیه به دنیا آمد و تابستان‌های کودکی‌اش را صرف تماشای دستان مادربزرگش پشت دار قالی کرد — دستانی که با اطمینانِ کسی که به زبانی کهن‌تر از کلمات می‌نویسد حرکت می‌کردند. هر رنگ یک تصمیم بود، هر گره یک تعهد — هیچ‌چیز را نمی‌شد پس گرفت بدون آنکه چیزی راستین را نیز از هم بگسلی.

او پس از تحصیل در رشته هنر نساجی در لندن و شاگردی نزد استاد فقید غلامرضا کاشانی در اصفهان، با یک یقین برگشت: که بهترین فرش‌های جهان شایسته خانه‌ای درخور خود هستند. زیکیا — نامی برگرفته از عمه‌ی بزرگ‌اش که در سال‌هایی که دار قالی کمیاب بود در پنهان می‌بافت — در سال ۱۳۸۸ اولین کارگاه خود را گشود.

امروز، زیکیا نمایانگر اوج هنر قالی است و تنها با استادبافندگانی کار می‌کند که خانواده‌هایشان نسل در نسل این هنر را ادامه داده‌اند. هر اثر تأیید شده، مستند و با این اطمینان عرضه می‌شود که هیچ‌چیز در آن از روی شتاب ساخته نشده است.`;

  const aboutAr = `وُلدت مؤسستنا في عائلة من أمهر النسّاجين في هيريكي بتركيا، وقضت صيفيات طفولتها تراقب يدي جدتها تتحرك على النول بيقين من يكتب بلغة أقدم من الكلمات. كان كل لون قراراً وكل عقدة التزاماً — لا شيء يمكن التراجع عنه دون أن تُنقَض معه حقيقة ما.

بعد دراسة فنون النسيج في لندن والتتلمذ على يد الأستاذ الراحل غلام رضا الكاشاني في أصفهان، عادت وفي ذهنها قناعة واحدة: أن أرقى سجاد العالم يستحق داراً تليق به. زيكيا — اسم مستوحى من عمة كبرى كانت تنسج في الخفاء في سنوات شحّت فيها الأنوال — افتتحت أول أتيليه لها عام 2009.

اليوم، تمثّل زيكيا ذروة فن السجاد، إذ تعمل حصراً مع نسّاجين أمهر توارثت عائلاتهم هذه الحرفة جيلاً بعد جيل. كل قطعة موثّقة ومعتمدة وتُقدَّم بيقين أن لا شيء في داخلها صُنع على عجل.`;

  const items = [
    {
      slug: 'home',
      en: { title: 'Zeykia — Where Every Thread Tells a Story', subtitle: 'Luxury Persian Carpets for Exceptional Spaces', content: 'Discover handcrafted carpets that carry centuries of artistry into contemporary living.' },
      fa: { title: 'زیکیا — جایی که هر رشته داستانی می‌گوید', subtitle: 'فرش‌های لوکس ایرانی برای فضاهای استثنایی', content: 'فرش‌های دست‌ساخته‌ای را کشف کنید که قرن‌ها هنر را به زندگی معاصر منتقل می‌کنند.' },
      ar: { title: 'زيكيا — حيث تروي كل خيط قصة', subtitle: 'سجاد فارسي فاخر للمساحات الاستثنائية', content: 'اكتشف سجاداً مصنوعاً يدوياً يحمل قروناً من الفن إلى الحياة المعاصرة.' },
    },
    {
      slug: 'about',
      en: { title: 'About Zeykia', subtitle: 'Heritage, Craft, and Soul', content: aboutEn },
      fa: { title: 'درباره زیکیا', subtitle: 'میراث، هنر و روح', content: aboutFa },
      ar: { title: 'حول زيكيا', subtitle: 'التراث والحرفة والروح', content: aboutAr },
    },
    {
      slug: 'export',
      en: { title: 'Export & Wholesale', subtitle: 'Global Delivery of Authentic Persian Carpets', content: 'Zeykia ships authenticated Persian carpets to over 40 countries. We provide full documentation, certificates of authenticity, and white-glove delivery service for every shipment.' },
      fa: { title: 'صادرات و عمده‌فروشی', subtitle: 'تحویل جهانی فرش‌های اصیل ایرانی', content: 'زیکیا فرش‌های تأیید شده ایرانی را به بیش از ۴۰ کشور ارسال می‌کند. ما مستندات کامل، گواهی‌های اصالت و خدمات تحویل دربستی برای هر محموله ارائه می‌دهیم.' },
      ar: { title: 'التصدير والجملة', subtitle: 'توصيل عالمي للسجاد الفارسي الأصيل', content: 'تشحن زيكيا السجاد الفارسي المعتمد إلى أكثر من 40 دولة. نقدم توثيقاً كاملاً وشهادات الأصالة وخدمة التوصيل المتميزة لكل شحنة.' },
    },
    {
      slug: 'exclusive',
      en: { title: 'Exclusive Collection', subtitle: 'For Discerning Collectors Only', content: 'Our VIP collection features ultra-rare pieces — limited editions, museum-grade silk carpets, and commissioned works by Iran\'s master weavers. Private viewings available by appointment.' },
      fa: { title: 'مجموعه انحصاری', subtitle: 'فقط برای کلکسیونرهای باذوق', content: 'مجموعه VIP ما شامل قطعات فوق‌العاده نادر است — نسخه‌های محدود، فرش‌های ابریشمی با کیفیت موزه‌ای، و آثار سفارشی استادان بافندگی ایران. بازدید خصوصی با قرار قبلی.' },
      ar: { title: 'المجموعة الحصرية', subtitle: 'للهواة المميزين فقط', content: 'مجموعتنا VIP تضم قطعاً نادرة للغاية — إصدارات محدودة وسجاداً حريرياً بجودة المتاحف وأعمالاً بالطلب من أمهر الحرفيين الإيرانيين. جلسات مشاهدة خاصة بموعد مسبق.' },
    },
  ];

  for (const item of items) {
    const { slug, en, fa, ar } = item;
    const doc = await strapi.documents('api::page.page').create({
      data: { slug, ...en } as any,
      locale: 'en',
      status: 'published',
    });
    for (const [locale, data] of [['fa', fa], ['ar', ar]] as const) {
      await strapi.documents('api::page.page').update({
        documentId: doc.documentId,
        locale,
        data: data as any,
        status: 'published',
      });
    }
  }
}

async function seedStatements(strapi: Core.Strapi) {
  const items = [
    {
      en: {
        theme: 'Craftsmanship',
        text: 'Every knot is a word. Every carpet is a poem that takes years to speak.',
        author: 'Ustad Hassan Ardabili',
        videoUrl: '',
        transcript: [
          { time: '00:00', speaker: 'Ustad Hassan Ardabili', text: 'I began learning at seven years old. My father would not let me touch the loom — only watch. He said the eye must learn before the hand.' },
          { time: '00:18', speaker: 'Ustad Hassan Ardabili', text: 'Every knot is a word. You cannot rush a word and have it mean what you intended. The same is true here.' },
          { time: '00:35', speaker: 'Ustad Hassan Ardabili', text: 'People ask how long this carpet took. I tell them: forty years and nine months. Forty years to learn, nine months to make.' },
          { time: '00:58', speaker: 'Ustad Hassan Ardabili', text: 'When I am gone, the carpet will remain. That is enough for me. That is the whole point of craft — to outlast the craftsman.' },
        ],
      },
      fa: {
        text: 'هر گره یک کلمه است. هر فرش شعری است که سال‌ها طول می‌کشد تا بازگو شود.',
        author: 'استاد حسن اردبیلی',
        transcript: [
          { time: '00:00', speaker: 'استاد حسن اردبیلی', text: 'من در هفت سالگی شروع به یادگیری کردم. پدرم اجازه نمی‌داد به دار دست بزنم — فقط تماشا می‌کردم. می‌گفت چشم باید پیش از دست یاد بگیرد.' },
          { time: '00:18', speaker: 'استاد حسن اردبیلی', text: 'هر گره یک کلمه است. نمی‌توانی کلمه‌ای را با عجله بگویی و انتظار داشته باشی همان معنا را برساند. اینجا هم همین‌طور است.' },
          { time: '00:35', speaker: 'استاد حسن اردبیلی', text: 'مردم می‌پرسند این فرش چقدر طول کشید. می‌گویم: چهل سال و نه ماه. چهل سال برای یادگیری، نه ماه برای ساختن.' },
          { time: '00:58', speaker: 'استاد حسن اردبیلی', text: 'وقتی رفتم، فرش می‌ماند. همین برایم کافی است. این کل هدف هنر است — ماندن پس از هنرمند.' },
        ],
      },
      ar: {
        text: 'كل عقدة كلمة. كل سجادة قصيدة تستغرق سنوات لتُقال.',
        author: 'أستاذ حسن أردبيلي',
        transcript: [
          { time: '00:00', speaker: 'أستاذ حسن أردبيلي', text: 'بدأت التعلم في السابعة من عمري. لم يكن أبي يسمح لي بلمس النول — فقط المراقبة. كان يقول إن العين يجب أن تتعلم قبل اليد.' },
          { time: '00:18', speaker: 'أستاذ حسن أردبيلي', text: 'كل عقدة كلمة. لا يمكنك التسرع في كلمة وتتوقع أن تحمل المعنى الذي قصدته. الأمر هنا كذلك تماماً.' },
          { time: '00:35', speaker: 'أستاذ حسن أردبيلي', text: 'يسألني الناس كم استغرق هذا السجاد. أقول لهم: أربعين عاماً وتسعة أشهر. أربعون عاماً للتعلم، وتسعة أشهر للصنع.' },
          { time: '00:58', speaker: 'أستاذ حسن أردبيلي', text: 'حين أرحل، سيبقى السجاد. هذا يكفيني. هذا هو مغزى الحرفة كلها — أن تبقى بعد الحرفي.' },
        ],
      },
    },
    {
      en: {
        theme: 'Artistry',
        text: 'We do not copy nature — we distill it. The flower in our carpet never fades.',
        author: 'Maryam Kashani',
        videoUrl: '',
        transcript: [
          { time: '00:00', speaker: 'Maryam Kashani', text: 'People always ask which flower is this, which bird is that. But we are not botanists or ornithologists. We are interpreters.' },
          { time: '00:20', speaker: 'Maryam Kashani', text: 'When I draw a rose for the loom, I ask: what is the feeling of a rose? Not what does it look like — what does it mean?' },
          { time: '00:42', speaker: 'Maryam Kashani', text: 'We do not copy nature — we distill it. The flower in our carpet never wilts because it was never quite real. It is the idea of a flower, made permanent.' },
          { time: '01:05', speaker: 'Maryam Kashani', text: 'The best compliment I ever received was from a woman who said my carpet made her feel homesick for a place she had never been. That is what art should do.' },
        ],
      },
      fa: {
        text: 'ما از طبیعت تقلید نمی‌کنیم — آن را تقطیر می‌کنیم. گلی که در فرش ما است هرگز پژمرده نمی‌شود.',
        author: 'مریم کاشانی',
        transcript: [
          { time: '00:00', speaker: 'مریم کاشانی', text: 'همیشه می‌پرسند این چه گلی است، آن چه پرنده‌ای است. اما ما نه گیاه‌شناسیم نه پرنده‌شناس. ما مترجمیم.' },
          { time: '00:20', speaker: 'مریم کاشانی', text: 'وقتی گلی برای دار می‌کشم، می‌پرسم: احساس یک گل چیست؟ نه اینکه چه شکلی است — چه معنایی دارد؟' },
          { time: '00:42', speaker: 'مریم کاشانی', text: 'ما از طبیعت تقلید نمی‌کنیم — آن را تقطیر می‌کنیم. گل در فرش ما هرگز پژمرده نمی‌شود چون هرگز کاملاً واقعی نبوده. ایده یک گل است، که جاودانه شده.' },
          { time: '01:05', speaker: 'مریم کاشانی', text: 'بهترین تعریفی که شنیدم از زنی بود که گفت فرشم او را دلتنگ جایی کرد که هرگز آنجا نبوده. هنر همین باید باشد.' },
        ],
      },
      ar: {
        text: 'لا نقلّد الطبيعة — نقطّرها. الزهرة في سجادتنا لا تذبل أبداً.',
        author: 'مريم الكاشاني',
        transcript: [
          { time: '00:00', speaker: 'مريم الكاشاني', text: 'يسألني الناس دائماً: ما هذه الزهرة، وما ذلك الطائر؟ لكننا لسنا علماء نبات ولا علماء طيور. نحن مترجمون.' },
          { time: '00:20', speaker: 'مريم الكاشاني', text: 'حين أرسم وردة للنول، أسأل نفسي: ما الإحساس الذي تمنحه الوردة؟ ليس كيف تبدو — بل ماذا تعني.' },
          { time: '00:42', speaker: 'مريم الكاشاني', text: 'لا نقلّد الطبيعة — نقطّرها. الزهرة في سجادتنا لا تذبل لأنها لم تكن حقيقية تماماً. إنها فكرة الزهرة، مُخلَّدة.' },
          { time: '01:05', speaker: 'مريم الكاشاني', text: 'أجمل مديح سمعته كان من امرأة قالت إن سجادتي جعلتها تحنّ إلى مكان لم تزره قط. هذا ما ينبغي أن يفعله الفن.' },
        ],
      },
    },
    {
      en: {
        theme: 'Innovation',
        text: 'Ancient patterns carry modern meaning. Tradition is not a cage — it is a foundation.',
        author: 'Reza Mohebi',
        videoUrl: '',
        transcript: [
          { time: '00:00', speaker: 'Reza Mohebi', text: 'My teachers told me: learn every rule before you break any of them. I spent fifteen years learning. Then I started asking questions.' },
          { time: '00:22', speaker: 'Reza Mohebi', text: 'The Herati pattern is six hundred years old. But the feeling it creates — rhythm, movement, the sense that something is alive — that is timeless. That feeling belongs in every era.' },
          { time: '00:48', speaker: 'Reza Mohebi', text: 'Tradition is not a cage. It is a foundation. You can build anything you want on it — but without it, whatever you make has no roots, and things without roots do not last.' },
          { time: '01:10', speaker: 'Reza Mohebi', text: 'I want to make carpets that my grandfather would recognise and my grandchildren will want to own. That space between recognition and desire — that is where innovation lives.' },
        ],
      },
      fa: {
        text: 'طرح‌های باستانی معنای مدرن حمل می‌کنند. سنت قفس نیست — پایه است.',
        author: 'رضا محبی',
        transcript: [
          { time: '00:00', speaker: 'رضا محبی', text: 'استادانم می‌گفتند: همه قوانین را یاد بگیر پیش از آنکه هر کدام را بشکنی. پانزده سال صرف یادگیری کردم. بعد شروع کردم به پرسیدن.' },
          { time: '00:22', speaker: 'رضا محبی', text: 'طرح هراتی ششصد سال قدمت دارد. اما احساسی که می‌آفریند — ریتم، حرکت، حس اینکه چیزی زنده است — جاودانه است. آن احساس به همه دوران‌ها تعلق دارد.' },
          { time: '00:48', speaker: 'رضا محبی', text: 'سنت قفس نیست. پایه است. می‌توانی هر چه بخواهی روی آن بسازی — اما بدون آن، هر چه بسازی ریشه ندارد، و چیزهای بی‌ریشه دوام نمی‌آورند.' },
          { time: '01:10', speaker: 'رضا محبی', text: 'می‌خواهم فرش‌هایی بسازم که پدربزرگم بشناسد و نوه‌هایم بخواهند داشته باشند. آن فضای میان شناخت و میل — آنجاست که نوآوری زندگی می‌کند.' },
        ],
      },
      ar: {
        text: 'الأنماط القديمة تحمل معنى حديثاً. التقليد ليس قفصاً — إنه أساس.',
        author: 'رضا محبي',
        transcript: [
          { time: '00:00', speaker: 'رضا محبي', text: 'قال لي أساتذتي: تعلّم كل القواعد قبل أن تكسر أياً منها. أمضيت خمسة عشر عاماً في التعلم. ثم بدأت أطرح الأسئلة.' },
          { time: '00:22', speaker: 'رضا محبي', text: 'نقش الهراتي عمره ستمائة عام. لكن الإحساس الذي يخلقه — الإيقاع والحركة والشعور بأن ثمة شيئاً حياً — إحساس خارج الزمن. ذلك الإحساس ينتمي إلى كل عصر.' },
          { time: '00:48', speaker: 'رضا محبي', text: 'التقليد ليس قفصاً. إنه أساس. يمكنك بناء ما تشاء عليه — لكن بدونه، ما تصنعه لا جذور له، والأشياء التي لا جذور لها لا تدوم.' },
          { time: '01:10', speaker: 'رضا محبي', text: 'أريد أن أصنع سجاداً يعرفه جدي ويرغب في امتلاكه أحفادي. تلك المساحة بين المعرفة والرغبة — هناك تعيش الابتكار.' },
        ],
      },
    },
  ];

  for (const item of items) {
    const doc = await strapi.documents('api::statement.statement').create({
      data: item.en as any,
      locale: 'en',
      status: 'published',
    });
    for (const locale of ['fa', 'ar'] as const) {
      await strapi.documents('api::statement.statement').update({
        documentId: doc.documentId,
        locale,
        data: item[locale] as any,
        status: 'published',
      });
    }
  }
}

async function seed(strapi: Core.Strapi) {
  const existing = await strapi.documents('api::collection.collection').findMany({});
  if (existing.length > 0) return;

  strapi.log.info('[seed] Seeding initial content...');
  await seedCollections(strapi);
  await seedColors(strapi);
  await seedProducts(strapi);
  await seedPages(strapi);
  await seedStatements(strapi);
  strapi.log.info('[seed] Done.');
}

// ---------------------------------------------------------------------------

export default {
  register() {},

  async bootstrap({ strapi }: { strapi: Core.Strapi }) {
    await seed(strapi);
  },
};
