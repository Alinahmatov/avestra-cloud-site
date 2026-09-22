(() => {
  const dict = {
    en: {
      meta: {
        title: "Avistra Cloud — See Everything. Miss Nothing.",
        description:
          "Windows surveillance that connects this PC’s camera, CCTV, PTZ, Wi‑Fi, GoPro, and phone — then analyses faces, COCO objects, and actions on the PC. Weekly report. License from the Developer.",
      },
      skip: "Skip to content",
      nav: {
        how: "How it works",
        uses: "Where it’s used",
        access: "Access",
        clients: "Windows / Android",
        faq: "FAQ",
        uninstall: "Uninstall",
        donate: "Donate",
        download: "Download / Install",
        menu: "Open menu",
        menuClose: "Close menu",
        themeLight: "Switch to dark theme",
        themeDark: "Switch to light theme",
        lang: "Language",
      },
      lang: { en: "English", az: "Azərbaycan", ru: "Русский" },
      hero: {
        kicker: "Avistra Cloud · Windows · local AI",
        titleAccent: "See Everything.",
        titleRest: "Miss Nothing.",
        lede: "Your cameras, occupancy, and journal — analysed on this PC.",
        cta: "Download / Install",
        cta2: "Request a license",
      },
      intro: {
        titleAccent: "Windows surveillance",
        titleRest: "with AI analysis on this PC",
        body:
          "A powerful Windows surveillance and AI analysis app that turns almost any camera into an intelligent monitoring system. Connect <strong>PTZ cameras</strong>, <strong>Wi‑Fi cameras</strong>, <strong>GoPros</strong>, or even your <strong>phone</strong> — plus <strong>this PC’s camera</strong> and <strong>CCTV</strong> over USB, RTSP, or GoPro RTMP — and <strong>switch</strong> between them instantly.",
        body2:
          "The app detects <strong>objects</strong> (COCO names), <strong>faces</strong>, <strong>movements, and actions</strong>, with customizable triggers that can instantly send alerts by email with captured images or video.",
        body3:
          "But it doesn’t stop at detection. Its AI analyzes behavior over time, identifies patterns, and generates a <strong>weekly behavioral report</strong>.",
        end: "One system. Every camera. Every movement. Every detail.",
        remember: "What it sees, it remembers.",
        license:
          "Installing does <strong>not</strong> create an account. Sign-in still needs Access URL, nickname, password, and a valid unexpired license issued by the Developer. Ingest stays off until you start monitoring. Footage stays on this PC — not a public SaaS webcam.",
        more: "How licenses work",
      },
      facts: {
        cameras: "USB · CCTV · PTZ · GoPro · phone",
        idle: "Camera off when idle",
        weekly: "Weekly analysis on this PC",
      },
      features: {
        kicker: "What it sees",
        titleAccent: "A room,",
        titleRest: "a database, a journal.",
        lead:
          "Local AI on Windows. Point this PC’s camera, CCTV, PTZ, Wi‑Fi, GoPro, or a phone at the node, switch among them, and the stream is analysed here: faces you enrolled, COCO objects, a journal of who walked through. It will not sign in without a license from the Developer.",
        faceTitle: "Face recognition",
        face:
          "Enroll faces on this PC. Known people show as <strong>Person N · Name</strong>. Everyone else stays Person N until you put them in the database. You don’t type labels on every frame.",
        cocoTitle: "COCO object detection",
        coco:
          "Chair. Laptop. Phone. Bed. Bottle. Everyday objects get names from COCO so the room is readable — and triggers can fire on what is actually there. Not a shopping catalog.",
        journalTitle: "Action journal",
        journal:
          "Who entered. Who left. Wave, sit, stand, possible fall. Lines use Person N · Name, with clothing in the description when the torso read is good. Searchable, not a vibe.",
        peopleTitle: "People database",
        people:
          "Its own local store on this PC. Enrolled faces, unnamed Person N tracks, history. The database lives next to the app, not in a vendor account you don’t control.",
        occTitle: "Occupancy",
        occ:
          "How many people are in frame right now while monitoring. Peak and unique counts for the day. Watch a shop or a room without guessing from a silent thumbnail.",
        licenseTitle: "Licenses from the Developer",
        license:
          "You can install from this site. Sign-in still needs a <strong>valid unexpired license</strong> the Developer issued in Avistra Access — plus Access URL, nickname, and password. No self-signup. Expired keys cannot sign in.",
      },
      uses: {
        kicker: "Where Avistra is used",
        titleAccent: "Who it’s for.",
        titleRest: "Honest uses of this PC.",
        lead:
          "Avistra Cloud is a local Windows node — not a public cloud webcam. These are real jobs for occupancy, enrolled faces, the journal, and email triggers you configure.",
        bizKicker: "Businesses",
        bizTitle: "Floor, lobby, or shop",
        biz:
          "Track <strong>suspicious activity</strong> with the action journal and email triggers (images or video). Count <strong>clients</strong> — occupancy and footfall while monitoring. Flag a <strong>blacklisted person</strong> only as a face <em>you</em> enrolled and marked in the people database (saved name vs Unknown / Person N). There is no police watchlist API.",
        homeKicker: "House protection",
        homeTitle: "Who walked through",
        home:
          "Home monitoring on this PC: USB, CCTV, Wi‑Fi, or a phone lens you switch to. See who entered, get alerts you set, keep footage local. Camera stays off until you start monitoring.",
        shopKicker: "Shop floor",
        shopTitle: "Occupancy and objects",
        shop:
          "How many people are in frame, COCO objects in view (bag, laptop, chair…), and a journal of movement. Triggers can email you when something you configured actually happens.",
        doorKicker: "Office or campus door",
        doorTitle: "Named vs Person N",
        door:
          "Enroll staff or household faces. Everyone else stays Person N. Useful at a door, corridor, or caregiver household — still analysed on the PC, still a license from the Developer.",
      },
      how: {
        kicker: "How it works",
        titleAccent: "Install it.",
        titleRest: "Point it. Read who walked through.",
        s1t: "Download Setup.exe",
        s1:
          "Get AvestraCloud-Setup.exe from this page (GitHub Releases). Run it. Installing does not create an account and does not include Avistra Access.",
        s2t: "Sign in with four things",
        s2: "Access URL + nickname + password + license from the Developer. You cannot invent any of them. Expired licenses are refused.",
        s3t: "Pick the cameras, enroll people",
        s3:
          "Settings → add and switch sources: this PC’s USB camera, CCTV / PTZ / Wi‑Fi over RTSP, GoPro (USB, Wi‑Fi, or RTMP onto this PC), or a phone camera over Wi‑Fi. People → add faces you want named. Anyone else stays Person N — still tracked, still journaled.",
        s4t: "Start monitoring",
        s4:
          "Live → Start. Boxes, occupancy, action journal — scanned on this PC (or your Access host). Stop monitoring and the ingest goes dark. The PC stays the cloud.",
        s5t: "Phone is a second app",
        s5:
          "The Android app is not a webcam for this PC. Same Access login, phone camera, on-device faces and COCO objects. Sideload from Cloud Settings — not this site. Windows can still ingest a phone camera over Wi‑Fi as one of its lenses.",
      },
      access: {
        kicker: "Avistra Access",
        titleAccent: "Four fields.",
        titleRest: "One issuer. No self-signup.",
        lead:
          "Avistra Access is a separate app on the Developer’s machine. The Windows Setup.exe is Avistra Cloud only — Access is not inside it. The Developer issues a nickname, password, and license, then sends you an Access URL. Keep Access open on the owner’s PC so Kick and activity work.",
        f1: "Field 01",
        urlTitle: "Access URL",
        url:
          "Paste the public HTTPS address from Avistra Access (<span class=\"mono\">https://….trycloudflare.com</span>). That public URL works from anywhere — same Wi‑Fi is <strong>not</strong> required. A LAN URL is same-Wi‑Fi only.",
        f2: "Field 02",
        nickTitle: "Nickname",
        nick: "First sign-in with a valid license lets you pick nickname and password in Cloud. There is no self-signup without a license.",
        f3: "Field 03",
        passTitle: "Password",
        pass: "The password that goes with that nickname. Wrong password, no session.",
        f4: "Field 04",
        licTitle: "License",
        lic:
          "A key the Developer issued (looks like <span class=\"mono\">AVESTRA-…</span>). Must be valid and <strong>unexpired</strong>. Expired licenses cannot sign in. Installing the exe does not mint one.",
        plate: "Sign-in plate",
        issuer: "Issuer",
        issuerV: "The Developer, in Avistra Access",
        signup: "Self-signup",
        signupV: "None. The form queues a request in Avistra Access. After approval you get Access URL + license by email; you pick nickname and password in Cloud.",
        expiry: "Expiry",
        expiryV: "Expired keys are refused at login. Ask the Developer if yours lapsed.",
        pub: "Public URL",
        pubV: "trycloudflare (or a named host). Works off your home Wi‑Fi.",
        lan: "LAN URL",
        lanV: "Same Wi‑Fi only. Testers in another country cannot use 192.168…",
        kick: "Kick",
        kickV: "Owner can sign a tester out everywhere from Access Profiles.",
      },
      clients: {
        kicker: "Two apps",
        titleAccent: "Windows is the product.",
        titleRest: "Android is a second lens.",
        lead:
          "Windows Cloud ingests USB, CCTV, PTZ, Wi‑Fi, GoPro, and phone feeds and analyses them on the PC. The Android app is separate: its own phone camera, on-device detect — not a webcam plugged into Cloud.",
        primary: "Primary",
        winTitle: "Windows — Avistra Cloud",
        w1: "This PC’s camera, CCTV, PTZ, Wi‑Fi, GoPro, phone ingest — switch among them",
        w2: "Live analysed on this PC (or Access host): faces + COCO + journal",
        w3: "People database and action journal on this PC",
        w4: "Ingest off when not monitoring",
        w5: "Live occupancy, triggers, capture, optional email",
        w6: "Install from this site: AvestraCloud-Setup.exe",
        w7: "Sign-in: Access URL + nickname + password + license",
        w8: "Uninstall from Settings → Apps, Start Menu, or Uninstall.exe",
        secondary: "Secondary",
        andTitle: "Android — standalone client",
        a1: "Phone camera, not a webcam for the PC",
        a2: "On-device faces + COCO objects",
        a3: "People and journal for that license on the phone",
        a4: "Windows Cloud does not need to stay running after login",
        a5: "Avistra Access must still be reachable to sign in",
        a6: "Sideload from Cloud Settings → Create Android app",
        a7: "APK is <strong>not</strong> published on this site",
      },
      privacy: {
        kicker: "On this PC",
        titleAccent: "The computer",
        titleRest: "is the cloud.",
        footageT: "Footage stays here",
        footage:
          "Video, embeddings, the people database, the journal — on the machine that runs Avistra Cloud. There is no Avistra-hosted video pipe. Exceptions: optional household people sync, opt-in Cloudflare R2 backup you turn on yourself, and this marketing site.",
        idleT: "Camera off when idle",
        idle:
          "Not monitoring means ingest is off. Live, occupancy, and recording only run after Start monitoring. Stop, and the selected lens goes dark.",
        estT: "Estimates are estimates",
        est:
          "Age and height, when shown, are camera guesses with confidence — not papers, not facts. Treat them as hints. Never as identity.",
        nameT: "You name who it names",
        name:
          "Recognition only speaks names you enrolled. Triggers only do what you configure. Optional models stay dark until you turn them on. Nationality and ethnicity are not inferred by default.",
        legal:
          "You are responsible for using the software in line with local law, workplace policy, and consent requirements for camera and biometric monitoring.",
      },
      testers: {
        kicker: "For testers",
        titleAccent: "You can install today.",
        titleRest: "You cannot sign in without the Developer.",
        l1: "Request a license on this page (or already have one from the Developer).",
        l2: "Download <strong>AvestraCloud-Setup.exe</strong>. Installing does not create an account.",
        l3: "Wait for Access approval. You get Access URL and a <strong>valid unexpired license</strong> by email, then pick nickname and password in Cloud.",
        l4: "Paste the <strong>public</strong> Access URL if you are not on the Developer’s Wi‑Fi. Same Wi‑Fi is only required for a LAN URL.",
        l5: "Keep Avistra Access open on the owner’s PC. Kick is “Sign out everywhere.”",
        l6: "Android testers: sideload from Cloud Settings on Windows. Do not look for an APK here.",
        note: "The Setup.exe is Avistra Cloud only. Avistra Access is not inside it. License keys are never published on this page.",
      },
      faq: {
        kicker: "FAQ",
        titleAccent: "Straight answers.",
        titleRest: "No SaaS fog.",
        q1: "Does installing create an account?",
        a1: "No. Setup.exe puts Avistra Cloud on the PC. Sign-in still needs Access URL, nickname, password, and a valid unexpired license from the Developer. There is no self-signup.",
        q2: "How do I get a license?",
        a2: "Ask with the form on this page. It queues a request in Avistra Access. After the Developer approves, you get email with Access URL and license key. You pick nickname and password in Cloud. The form does not generate a key by itself. Expired licenses cannot sign in.",
        q3: "Do I need to be on the same Wi‑Fi?",
        a3: "Not if you use the public Access URL (trycloudflare, or a named host from Access). A LAN address is same-Wi‑Fi only. Testers in another country cannot use a 192.168… URL.",
        q4: "Does the phone app connect to my PC?",
        a4: "No. Android is a standalone second client: phone camera, on-device faces and COCO objects, its own people list and journal for that license. It does not plug into Windows Cloud as a webcam. Windows Cloud can still ingest a phone camera over Wi‑Fi as one of its sources — that feed is analysed on the PC. Access still must be reachable for login.",
        q5: "Where is the Android APK?",
        a5: "Not on this site. On Windows Avistra Cloud: Settings → Create Android app, then Start phone access and open /install on the phone.",
        q6: "What does Live show on people and objects?",
        a6: "People: Person N, or Person N · Name once enrolled. Clothing can appear in the description (for example Person 1 · Alex, dark hoodie). Objects: COCO classes only — chair, laptop, phone, bed, and so on. Not brands, not made-up furniture names.",
        q7: "What cameras can Windows Cloud use?",
        a7: "This PC’s USB camera, CCTVs, PTZ, and other Wi‑Fi / IP cameras over RTSP or HTTP, GoPro over USB, Wi‑Fi, or RTMP into this PC, and a phone camera over Wi‑Fi. You add named slots and switch among them. Live is analysed on the PC that runs Avistra Cloud (or your Access host) — faces, COCO objects, journal. Not a public SaaS webcam. The Android app is separate and uses the phone camera on the phone.",
        q8: "Is the camera always on?",
        a8: "No. When you are not monitoring, ingest is off. Start monitoring to open the selected camera. Stop monitoring to shut it.",
        q9: "Where does my data go?",
        a9: "On the PC that runs the app, by default. It leaves that machine only for optional household people sync, opt-in Cloudflare R2 backup you turn on, or this public marketing site (which does not host your footage).",
        q10: "How do I uninstall?",
        a10: "There is no second huge uninstall download. On that PC: Windows Settings → Apps → Avistra Cloud → Uninstall. Or Start Menu → Avistra Cloud → Uninstall Avistra Cloud. Or run <span class=\"path\">%LOCALAPPDATA%\\Programs\\Avistra Cloud\\Uninstall.exe</span>. Program files go away. People and logs stay unless you check “Also remove local data.”",
        q11: "Windows says the app is unrecognized.",
        a11: "SmartScreen may warn on unsigned indie software. Choose More info → Run anyway only if you trust this official download from GitHub Releases linked on this site.",
      },
      donate: {
        kicker: "Keep it alive",
        titleAccent: "Donate",
        titleRest: "",
        lead:
          "This is indie software. If Avistra Cloud watches your space well, you can keep it alive with <strong>PayPal</strong> or a <strong>credit or debit card</strong>. Checkout happens on PayPal (or Stripe, if a Payment Link is configured) — this site never takes card numbers.",
        paypal: "PayPal",
        paypalP: "Opens PayPal’s hosted donate page. Sign in with PayPal, or continue as a guest where PayPal offers it.",
        paypalBtn: "Donate with PayPal",
        card: "Credit or debit card",
        cardP: "Visa, Mastercard, and other cards as a guest on PayPal’s donate page. No PayPal account required for many cards.",
        cardStripe: "Visa, Mastercard, and other cards through a Stripe Payment Link. No Stripe keys are stored on this site.",
        cardBtn: "Pay with card",
        note: "Donations go to the Developer. Payment happens on PayPal or Stripe. License keys are never on this page.",
      },
      get: {
        titleAccent: "Download",
        titleRest: "and install",
        p:
          "Avistra Cloud is a <strong>Windows</strong> desktop app. Click below to download <strong>AvestraCloud-Setup.exe</strong> and install it. Installing does <strong>not</strong> create an account. You still cannot sign in without a <strong>valid unexpired license</strong> issued by the Developer in Avistra Access (Access URL, nickname, password, and license key). Expired licenses cannot sign in.",
        setupTitle: "Windows Setup.exe",
        setupP: "Inno Setup installer. After it finishes, open Avistra Cloud and sign in with credentials the Developer issued — not a guest login, not a self-signup.",
        setupBtn: "Download / Install AvestraCloud-Setup.exe",
        winNote: "Windows may warn that the app is unrecognized. Choose More info → Run anyway only if you trust this official download. The installer is hosted on GitHub Releases, not on this Pages site.",
        unTitle: "Uninstall",
        unP: "There is no separate uninstall download. After Avistra Cloud is installed, remove it on that PC:",
        un1: "Windows Settings → Apps → <strong>Avistra Cloud</strong> → Uninstall",
        un2: "Start Menu → Avistra Cloud → <strong>Uninstall Avistra Cloud</strong>",
        un3: "Or run <strong>Uninstall.exe</strong> at <span class=\"path\">%LOCALAPPDATA%\\Programs\\Avistra Cloud\\Uninstall.exe</span>",
        unNote: "Program files are removed. People, logs, and other local data stay unless you check “Also remove local data” in the uninstaller.",
        andTitle: "Android (secondary app)",
        andP:
          "Avistra on the phone is its own monitor: the phone camera, on-device faces and COCO objects, people and a journal for that license. Sign in with the same Access URL, nickname, password, and license as Windows. It does not connect to the PC as a webcam, and the Windows Cloud app does not need to stay running. Avistra Access must be reachable to sign in. Sideload the APK from Avistra Cloud on Windows (Settings → Create Android app). The APK is not published on this site.",
        need: "Need a license?",
        needP: "Ask below if you need the Developer to issue a license in Avistra Access. The form does not create an account. A license is emailed only after Access approval.",
        formKicker: "Access request",
        name: "Name",
        email: "Email",
        required: "(required)",
        optional: "(optional)",
        phone: "Phone / other contact",
        phonePh: "Phone, Telegram, etc.",
        reason: "Why you need a license",
        reasonPh: "Who you are and why you need Avistra Cloud.",
        submit: "Request a license",
        formNote: "The request goes to Avistra Access. After approval you get email with Access URL and license key, then pick nickname and password in Cloud. Installing the exe does not create an account.",
        formSending: "Sending to Access…",
        formError: "Could not reach Access. Try again, or leave accessUrl / workerUrl in license-config.js.",
        accessNote:
          "Licenses and sign-in nicknames are issued in <strong>Avistra Access</strong> by the Developer. This site is Avistra Cloud — the desktop surveillance app. The installer is not a login.",
        company: "Company",
      },
      footer: {
        line: "Avistra Cloud · Indie local-AI surveillance for Windows · USB · CCTV · PTZ · GoPro · phone · camera off when idle",
        meta: "www.avestra.online · local node · no self-signup",
        top: "Back to top",
      },
      thanks: {
        title: "Request sent — Avistra Cloud",
        kicker: "Request received",
        h1: "Request is in. A license is not automatic.",
        lede:
          "The request is in Avistra Access. If it is approved, email arrives with Access URL and license key. Then pick nickname and password in Cloud. Installing the Windows installer does not create an account.",
        next: "What happens next",
        nextP:
          "Watch your inbox (and spam). Use a mailbox you can actually receive mail on. Licensed copies still need Avistra Access — Access URL, nickname, password, and license key.",
        dl: "Download AvestraCloud-Setup.exe",
        back: "Back to Avistra Cloud",
      },
      notfound: {
        title: "Not found — Avistra Cloud",
        h1: "Nothing to watch here.",
        lede: "This path is empty. The Avistra Cloud site is one page.",
        back: "Avistra Cloud",
      },
    },
    az: {
      meta: {
        title: "Avistra Cloud — Hər şeyi gör. Heç nəyi qaçırma.",
        description:
          "Windows müşahidəsi: bu PC-nin kamerası, CCTV, PTZ, Wi‑Fi, GoPro və telefon — üzlər, COCO obyektləri və hərəkətlər PC-də analiz olunur. Həftəlik hesabat. Lisenziya Developer-dəndir.",
      },
      skip: "Məzmuna keç",
      nav: {
        how: "Necə işləyir",
        uses: "Harada istifadə olunur",
        access: "Access",
        clients: "Windows / Android",
        faq: "FAQ",
        uninstall: "Silmək",
        donate: "Ianə",
        download: "Yüklə / Quraşdır",
        menu: "Menyunu aç",
        menuClose: "Menyunu bağla",
        themeLight: "Tünd mövzuya keç",
        themeDark: "Açıq mövzuya keç",
        lang: "Dil",
      },
      lang: { en: "English", az: "Azərbaycan", ru: "Русский" },
      hero: {
        kicker: "Avistra Cloud · Windows · lokal AI",
        titleAccent: "Hər şeyi gör.",
        titleRest: "Heç nəyi qaçırma.",
        lede: "Kameralarınız, doluluq və jurnal — bu PC-də analiz olunur.",
        cta: "Yüklə / Quraşdır",
        cta2: "Lisenziya istə",
      },
      intro: {
        titleAccent: "Windows müşahidəsi",
        titleRest: "və bu PC-də AI analizi",
        body:
          "Demək olar ki, hər kameranı ağıllı izləmə sisteminə çevirən güclü Windows müşahidə və AI analiz tətbiqi. <strong>PTZ kameralar</strong>, <strong>Wi‑Fi kameralar</strong>, <strong>GoPro</strong> və ya <strong>telefon</strong> — həmçinin <strong>bu PC-nin kamerası</strong> və USB, RTSP və ya GoPro RTMP üzərindən <strong>CCTV</strong> qoşun və aralarında dərhal <strong>keçid</strong> edin.",
        body2:
          "Tətbiq <strong>obyektləri</strong> (COCO adları), <strong>üzləri</strong>, <strong>hərəkət və əməlləri</strong> aşkarlayır; tətiklər dərhal e-poçtla şəkil və ya video göndərə bilər.",
        body3:
          "Aşkarlama ilə bitmir. AI zamanla davranışı analiz edir, nümunələri tapır və <strong>həftəlik davranış hesabatı</strong> hazırlayır.",
        end: "Bir sistem. Hər kamera. Hər hərəkət. Hər detal.",
        remember: "Gördüyünü yadda saxlayır.",
        license:
          "Quraşdırma hesab <strong>yaratmır</strong>. Giriş üçün Access URL, ləqəb, şifrə və Developer-in verdiyi etibarlı, müddəti bitməmiş lisenziya lazımdır. İzləməni siz başladana qədər kamera söndürülür. Video bu PC-də qalır — ictimai SaaS veb-kamerası deyil.",
        more: "Lisenziyalar necə işləyir",
      },
      facts: {
        cameras: "USB · CCTV · PTZ · GoPro · telefon",
        idle: "Boş olanda kamera sönülü",
        weekly: "Həftəlik analiz bu PC-də",
      },
      features: {
        kicker: "Nə görür",
        titleAccent: "Otaq,",
        titleRest: "verilənlər bazası, jurnal.",
        lead:
          "Windows-da lokal AI. Bu PC-nin kamerasını, CCTV, PTZ, Wi‑Fi, GoPro və ya telefonu qoşun, keçid edin — axın burada analiz olunur: qeydə aldığınız üzlər, COCO obyektləri, kim keçib jurnalı. Developer-dən lisenziya olmadan giriş yoxdur.",
        faceTitle: "Üz tanıma",
        face:
          "Üzləri bu PC-də qeyd edin. Tanınanlar <strong>Person N · Ad</strong> kimi görünür. Qalanlar verilənlər bazasına salınana qədər Person N qalır. Hər kadrda əl ilə etiket yazmırsınız.",
        cocoTitle: "COCO obyekt aşkarlanması",
        coco:
          "Stul. Laptop. Telefon. Çarpayı. Butulka. Gündəlik obyektlər COCO-dan ad alır ki, otaq oxunaqlı olsun — tətiklər də real olan şeyə işləsin. Alış-veriş kataloqu deyil.",
        journalTitle: "Hərəkət jurnalı",
        journal:
          "Kim daxil oldu. Kim çıxdı. Əl yelləmə, oturmaq, durmaq, mümkün yıxılma. Sətirlər Person N · Ad formatındadır; geyim təsvirdə ola bilər. Axtarış olunur, “ovqat” deyil.",
        peopleTitle: "İnsan bazası",
        people:
          "Bu PC-də lokal anbar. Qeydə alınmış üzlər, adsız Person N izləri, tarixçə. Baza tətbiqin yanında yaşayır, sizin idarə etmədiyiniz vendor hesabında yox.",
        occTitle: "Doluluq",
        occ:
          "İzləmə zamanı kadrda indı neçə nəfər var. Günün pik və unikal sayları. Mağaza və ya otağı səssiz kiçik şəkildən təxmin etmədən izləyin.",
        licenseTitle: "Lisenziyalar Developer-dəndir",
        license:
          "Bu saytdan quraşdıra bilərsiniz. Giriş üçün Developer-in Avistra Access-də verdiyi <strong>etibarlı, müddəti bitməmiş lisenziya</strong> — plus Access URL, ləqəb və şifrə. Öz-özünə qeydiyyat yoxdur. Müddəti bitmiş açarla giriş olmur.",
      },
      uses: {
        kicker: "Avistra harada istifadə olunur",
        titleAccent: "Kim üçündür.",
        titleRest: "Bu PC-nin dürüst işləri.",
        lead:
          "Avistra Cloud lokal Windows qovşağıdır — ictimai bulud veb-kamerası deyil. Doluluq, qeydə alınmış üzlər, jurnal və sizin qurduğunuz e-poçt tətikləri üçün real işlər.",
        bizKicker: "Bizneslər",
        bizTitle: "Zal, foye və ya mağaza",
        biz:
          "Hərəkət jurnalı və e-poçt tətikləri (şəkil və ya video) ilə <strong>şübhəli fəaliyyəti</strong> izləyin. <strong>Müştəri sayını</strong> sayın — izləmə zamanı doluluq və axın. <strong>Qara siyahıdakı şəxs</strong> yalnız sizin insan bazasında qeyd edib işarələdiyiniz üzdür (saxlanılmış ad qarşı Unknown / Person N). Polis axtarış siyahısı API-si yoxdur.",
        homeKicker: "Ev mühafizəsi",
        homeTitle: "Kim keçib",
        home:
          "Bu PC-də ev izləməsi: USB, CCTV, Wi‑Fi və ya keçid etdiyiniz telefon linzası. Kim daxil oldu, qurduğunuz xəbərdarlıqlar, video lokal qalır. Siz izləməni başladana qədər kamera sönülüdür.",
        shopKicker: "Mağaza zalı",
        shopTitle: "Doluluq və obyektlər",
        shop:
          "Kadrda neçə nəfər, görünən COCO obyektləri (çanta, laptop, stul…) və hərəkət jurnalı. Tətiklər sizin konfiqurasiya etdiyiniz hadisə baş verəndə e-poçt göndərə bilər.",
        doorKicker: "Ofis və ya kampus qapısı",
        doorTitle: "Adlı və Person N",
        door:
          "İşçi və ya ev üzvlərinin üzünü qeyd edin. Qalanlar Person N qalır. Qapı, dəhliz və ya baxıcı ev təsərrüfatı üçün — yenə PC-də analiz, yenə Developer-dən lisenziya.",
      },
      how: {
        kicker: "Necə işləyir",
        titleAccent: "Quraşdırın.",
        titleRest: "Yönəldin. Kim keçdiyini oxuyun.",
        s1t: "Setup.exe yükləyin",
        s1:
          "AvestraCloud-Setup.exe bu səhifədən (GitHub Releases). İşə salın. Quraşdırma hesab yaratmır və Avistra Access daxil deyil.",
        s2t: "Dörd şeylə daxil olun",
        s2: "Access URL + ləqəb + şifrə + Developer-dən lisenziya. Heç birini özünüz uydura bilməzsiniz. Müddəti bitmiş lisenziyalar rədd edilir.",
        s3t: "Kameraları seçin, insanları qeyd edin",
        s3:
          "Settings → mənbə əlavə edin və keçid edin: bu PC-nin USB kamerası, CCTV / PTZ / Wi‑Fi RTSP, GoPro (USB, Wi‑Fi və ya bu PC-yə RTMP), və ya Wi‑Fi üzərindən telefon kamerası. People → adlandırmaq istədiyiniz üzləri əlavə edin. Qalanlar Person N qalır — izlənir, jurnala yazılır.",
        s4t: "İzləməni başladın",
        s4:
          "Live → Start. Qutular, doluluq, hərəkət jurnalı — bu PC-də (və ya Access hostunda) skan. İzləməni dayandırın, axın sönür. Bulud bu PC-dir.",
        s5t: "Telefon ikinci tətbiqdir",
        s5:
          "Android tətbiqi bu PC üçün veb-kamera deyil. Eyni Access girişi, telefon kamerası, cihazda üzlər və COCO. Cloud Settings-dən sideload — bu saytdan yox. Windows hələ də Wi‑Fi üzərindən telefon kamerasını linzalarından biri kimi qəbul edə bilər.",
      },
      access: {
        kicker: "Avistra Access",
        titleAccent: "Dörd sahə.",
        titleRest: "Bir verən. Öz-özünə qeydiyyat yox.",
        lead:
          "Avistra Access Developer-in maşınında ayrı tətbiqdir. Windows Setup.exe yalnız Avistra Cloud-dur — Access içində deyil. Developer ləqəb, şifrə və lisenziya verir, sonra Access URL göndərir. Kick və aktivlik üçün Access sahibi PC-də açıq qalsın.",
        f1: "Sahə 01",
        urlTitle: "Access URL",
        url:
          "Avistra Access-dən ictimai HTTPS ünvanı yapışdırın (<span class=\"mono\">https://….trycloudflare.com</span>). Bu ictimai URL hər yerdən işləyir — eyni Wi‑Fi <strong>şərt deyil</strong>. LAN URL yalnız eyni Wi‑Fi-dir.",
        f2: "Sahə 02",
        nickTitle: "Ləqəb",
        nick: "Etibarlı lisenziya ilə ilk girişdə Cloud-da ləqəb və şifrə seçirsiniz. Lisenziyasız öz-özünə qeydiyyat yoxdur.",
        f3: "Sahə 03",
        passTitle: "Şifrə",
        pass: "Həmin ləqəbə bağlı şifrə. Səhv şifrə — sessiya yoxdur.",
        f4: "Sahə 04",
        licTitle: "Lisenziya",
        lic:
          "Developer-in verdiyi açar (<span class=\"mono\">AVESTRA-…</span> kimi). Etibarlı və <strong>müddəti bitməmiş</strong> olmalıdır. Müddəti bitmiş lisenziya ilə giriş olmur. Exe quraşdırmaq açar yaratmır.",
        plate: "Giriş lövhəsi",
        issuer: "Verən",
        issuerV: "Developer, Avistra Access-də",
        signup: "Öz-özünə qeydiyyat",
        signupV: "Yoxdur. Forma Avistra Access-də növbəyə düşür. Təsdiqdən sonra Access URL + lisenziya e-poçta gəlir; ləqəb və şifrəni Cloud-da seçirsiniz.",
        expiry: "Müddət",
        expiryV: "Müddəti bitmiş açarlar girişdə rədd edilir. Bitibsə Developer-ə yazın.",
        pub: "İctimai URL",
        pubV: "trycloudflare (və ya adlı host). Ev Wi‑Fi-sindən kənarda da işləyir.",
        lan: "LAN URL",
        lanV: "Yalnız eyni Wi‑Fi. Başqa ölkədəki tester 192.168… istifadə edə bilməz.",
        kick: "Kick",
        kickV: "Sahib Access Profiles-dən testeri hər yerdən çıxara bilər.",
      },
      clients: {
        kicker: "İki tətbiq",
        titleAccent: "Məhsul Windows-dur.",
        titleRest: "Android ikinci linzadır.",
        lead:
          "Windows Cloud USB, CCTV, PTZ, Wi‑Fi, GoPro və telefon axınlarını qəbul edib PC-də analiz edir. Android ayrıca: öz telefon kamerası, cihazda aşkarlama — Cloud-a taxılmış veb-kamera deyil.",
        primary: "Əsas",
        winTitle: "Windows — Avistra Cloud",
        w1: "Bu PC-nin kamerası, CCTV, PTZ, Wi‑Fi, GoPro, telefon qəbulu — aralarında keçid",
        w2: "Canlı analiz bu PC-də (və ya Access hostunda): üzlər + COCO + jurnal",
        w3: "İnsan bazası və hərəkət jurnalı bu PC-də",
        w4: "İzləmə yoxdursa axın sönülü",
        w5: "Canlı doluluq, tətiklər, çəkiliş, istəyə bağlı e-poçt",
        w6: "Bu saytdan quraşdırma: AvestraCloud-Setup.exe",
        w7: "Giriş: Access URL + ləqəb + şifrə + lisenziya",
        w8: "Silmək: Settings → Apps, Start Menu və ya Uninstall.exe",
        secondary: "İkinci",
        andTitle: "Android — müstəqil müştəri",
        a1: "Telefon kamerası, PC üçün veb-kamera deyil",
        a2: "Cihazda üzlər + COCO obyektləri",
        a3: "Həmin lisenziya üçün insanlar və jurnal telefondadır",
        a4: "Girişdən sonra Windows Cloud açıq qalmaq məcburiyyətində deyil",
        a5: "Giriş üçün Avistra Access hələ də əlçatan olmalıdır",
        a6: "Cloud Settings → Create Android app-dən sideload",
        a7: "APK bu saytda <strong>dərc olunmur</strong>",
      },
      privacy: {
        kicker: "Bu PC-də",
        titleAccent: "Kompüter",
        titleRest: "buluddur.",
        footageT: "Video burada qalır",
        footage:
          "Video, embbedinglər, insan bazası, jurnal — Avistra Cloud işləyən maşındadır. Avistra-nın host etdiyi video borusu yoxdur. İstisnalar: istəyə bağlı ev insan sinxronu, özünüz açdığınız Cloudflare R2 ehtiyatı və bu marketinq saytı.",
        idleT: "Boş olanda kamera sönülü",
        idle:
          "İzləmə yoxdursa axın sönülüdür. Canlı, doluluq və yazı yalnız Start monitoring-dən sonra. Dayandırın — seçilmiş linza qaralır.",
        estT: "Təxminlər təxmindir",
        est:
          "Yaş və boy, göstəriləndə, kamera təxminləridir, sənəd və fakt deyil. İpucu sayın. Heç vaxt şəxsiyyət kimi yox.",
        nameT: "Adı siz verirsiniz",
        name:
          "Tanıma yalnız qeyd etdiyiniz adları deyir. Tətiklər yalnız sizin qurduğunuzu edir. İstəyə bağlı modellər siz açana qədər sönülüdür. Milliyyət və etnik mənşə standart olaraq çıxarılmır.",
        legal:
          "Proqramı yerli qanun, iş yeri siyasəti və kamera/biometrik izləmə üçün razılıq tələblərinə uyğun istifadə etmək sizin məsuliyyətinizdir.",
      },
      testers: {
        kicker: "Testerlər üçün",
        titleAccent: "Bu gün quraşdıra bilərsiniz.",
        titleRest: "Developer olmadan daxil ola bilməzsiniz.",
        l1: "Bu səhifədə lisenziya istəyin (və ya Developer-dən artıq var).",
        l2: "<strong>AvestraCloud-Setup.exe</strong> yükləyin. Quraşdırma hesab yaratmır.",
        l3: "Access təsdiqini gözləyin. Access URL və <strong>etibarlı, müddəti bitməmiş lisenziya</strong> e-poçta gəlir, sonra Cloud-da ləqəb və şifrə seçirsiniz.",
        l4: "Developer-in Wi‑Fi-sində deyilsinizsə <strong>ictimai</strong> Access URL yapışdırın. Eyni Wi‑Fi yalnız LAN URL üçündür.",
        l5: "Avistra Access sahibi PC-də açıq qalsın. Kick — “Sign out everywhere.”",
        l6: "Android testerlər: Windows-da Cloud Settings-dən sideload. Burada APK axtarmayın.",
        note: "Setup.exe yalnız Avistra Cloud-dur. Avistra Access içində deyil. Lisenziya açarları bu səhifədə heç vaxt dərc olunmur.",
      },
      faq: {
        kicker: "FAQ",
        titleAccent: "Düz cavablar.",
        titleRest: "SaaS dumanı yox.",
        q1: "Quraşdırma hesab yaradır?",
        a1: "Xeyr. Setup.exe Avistra Cloud-u PC-yə qoyur. Giriş üçün Access URL, ləqəb, şifrə və Developer-dən etibarlı, müddəti bitməmiş lisenziya lazımdır. Öz-özünə qeydiyyat yoxdur.",
        q2: "Lisenziyanı necə alım?",
        a2: "Bu səhifədəki forma Avistra Access-də növbəyə düşür. Developer təsdiq edəndən sonra Access URL və lisenziya açarı e-poçta gəlir. Ləqəb və şifrəni Cloud-da seçirsiniz. Forma özü açar yaratmır. Müddəti bitmiş lisenziya ilə giriş olmur.",
        q3: "Eyni Wi‑Fi-də olmalıyam?",
        a3: "İctimai Access URL (trycloudflare və ya Access-dən adlı host) istifadə etsəniz yox. LAN ünvanı yalnız eyni Wi‑Fi-dir. Başqa ölkədəki tester 192.168… URL istifadə edə bilməz.",
        q4: "Telefon tətbiqi PC-mə qoşulur?",
        a4: "Xeyr. Android müstəqil ikinci müştəridir: telefon kamerası, cihazda üzlər və COCO, həmin lisenziya üçün öz insan siyahısı və jurnal. Windows Cloud-a veb-kamera kimi taxılmır. Windows Cloud hələ də Wi‑Fi üzərindən telefon kamerasını mənbə kimi qəbul edə bilər — o axın PC-də analiz olunur. Giriş üçün Access əlçatan olmalıdır.",
        q5: "Android APK haradadır?",
        a5: "Bu saytda yox. Windows Avistra Cloud: Settings → Create Android app, sonra Start phone access və telefondan /install açın.",
        q6: "Live insan və obyektlərdə nə göstərir?",
        a6: "İnsanlar: Person N, və ya qeyd olunandan sonra Person N · Ad. Geyim təsvirdə ola bilər (məsələn Person 1 · Alex, tünd hoodie). Obyektlər: yalnız COCO sinifləri — stul, laptop, telefon, çarpayı və s. Brend və uydurma mebel adları yox.",
        q7: "Windows Cloud hansı kameraları istifadə edir?",
        a7: "Bu PC-nin USB kamerası, CCTV, PTZ və digər Wi‑Fi / IP kameralar RTSP və ya HTTP, GoPro USB, Wi‑Fi və ya bu PC-yə RTMP, Wi‑Fi üzərindən telefon kamerası. Adlı yuvalar əlavə edib keçid edirsiniz. Canlı analiz Avistra Cloud (və ya Access host) işləyən PC-dədir — üzlər, COCO, jurnal. İctimai SaaS veb-kamerası deyil. Android ayrıca telefondakı kameranı istifadə edir.",
        q8: "Kamera həmişə yanılıdır?",
        a8: "Xeyr. İzləmə yoxdursa axın sönülüdür. Seçilmiş kameranı açmaq üçün izləməni başladın. Bağlamaq üçün dayandırın.",
        q9: "Məlumatım hara gedir?",
        a9: "Standart olaraq tətbiqin işlədiyi PC-də. O maşını yalnız istəyə bağlı ev insan sinxronu, özünüz açdığınız Cloudflare R2 ehtiyatı və ya bu ictimai marketinq saytı (sizin videonu host etmir) üçün tərk edir.",
        q10: "Necə silim?",
        a10: "İkinci nəhəng silmə yükləməsi yoxdur. Həmin PC-də: Windows Settings → Apps → Avistra Cloud → Uninstall. Və ya Start Menu → Avistra Cloud → Uninstall Avistra Cloud. Və ya <span class=\"path\">%LOCALAPPDATA%\\Programs\\Avistra Cloud\\Uninstall.exe</span> işə salın. Proqram faylları gedir. İnsanlar və jurnallar “Also remove local data” işarələməyincə qalır.",
        q11: "Windows deyir ki, tətbiq tanınmır.",
        a11: "SmartScreen imzasız indie proqramda xəbərdarlıq edə bilər. More info → Run anyway yalnız bu saytdakı GitHub Releases rəsmi yükləməsinə etibar edirsinizsə.",
      },
      donate: {
        kicker: "Ayaqda saxlayın",
        titleAccent: "Ianə",
        titleRest: "",
        lead:
          "Bu indie proqramdır. Avistra Cloud məkanınızı yaxşı izləyirsə, <strong>PayPal</strong> və ya <strong>kredit/debet kartı</strong> ilə dəstək ola bilərsiniz. Ödəniş PayPal-da (və ya Stripe Payment Link konfiqurasiya olunubsa Stripe-da) olur — bu sayt kart nömrəsi götürmür.",
        paypal: "PayPal",
        paypalP: "PayPal-ın host etdiyi ianə səhifəsini açır. PayPal ilə daxil olun, və ya PayPal qonaq təklif edirsə qonaq kimi davam edin.",
        paypalBtn: "PayPal ilə ianə",
        card: "Kredit və ya debet kartı",
        cardP: "Visa, Mastercard və digər kartlar PayPal ianə səhifəsində qonaq kimi. Çox kart üçün PayPal hesabı lazım deyil.",
        cardStripe: "Visa, Mastercard və digər kartlar Stripe Payment Link vasitəsilə. Bu saytda Stripe açarı saxlanılmır.",
        cardBtn: "Kartla ödə",
        note: "Ianələr Developer-ə gedir. Ödəniş PayPal və ya Stripe-dadır. Lisenziya açarları bu səhifədə yoxdur.",
      },
      get: {
        titleAccent: "Yükləyin",
        titleRest: "və quraşdırın",
        p:
          "Avistra Cloud <strong>Windows</strong> masaüstü tətbiqidir. Aşağıdan <strong>AvestraCloud-Setup.exe</strong> yükləyib quraşdırın. Quraşdırma hesab <strong>yaratmır</strong>. Developer-in Avistra Access-də verdiyi <strong>etibarlı, müddəti bitməmiş lisenziya</strong> olmadan yenə də daxil ola bilməzsiniz (Access URL, ləqəb, şifrə və lisenziya açarı). Müddəti bitmiş lisenziya ilə giriş olmur.",
        setupTitle: "Windows Setup.exe",
        setupP: "Inno Setup quraşdırıcısı. Bitəndən sonra Avistra Cloud açın və Developer-in verdiyi məlumatlarla daxil olun — qonaq girişi və öz-özünə qeydiyyat yoxdur.",
        setupBtn: "Yüklə / Quraşdır AvestraCloud-Setup.exe",
        winNote: "Windows tətbiqin tanınmadığını deyə bilər. More info → Run anyway yalnız bu rəsmi yükləməyə etibar edirsinizsə. Quraşdırıcı GitHub Releases-dədir, bu Pages saytında deyil.",
        unTitle: "Silmək",
        unP: "Ayrı silmə yükləməsi yoxdur. Avistra Cloud quraşdırıldıqdan sonra həmin PC-də silin:",
        un1: "Windows Settings → Apps → <strong>Avistra Cloud</strong> → Uninstall",
        un2: "Start Menu → Avistra Cloud → <strong>Uninstall Avistra Cloud</strong>",
        un3: "Və ya <strong>Uninstall.exe</strong>: <span class=\"path\">%LOCALAPPDATA%\\Programs\\Avistra Cloud\\Uninstall.exe</span>",
        unNote: "Proqram faylları silinir. İnsanlar, jurnallar və digər lokal məlumat “Also remove local data” işarələməyincə qalır.",
        andTitle: "Android (ikinci tətbiq)",
        andP:
          "Telefondakı Avistra öz monitorudur: telefon kamerası, cihazda üzlər və COCO, həmin lisenziya üçün insanlar və jurnal. Windows ilə eyni Access URL, ləqəb, şifrə və lisenziya. PC-yə veb-kamera kimi qoşulmur, Windows Cloud açıq qalmaq məcburiyyətində deyil. Giriş üçün Avistra Access əlçatan olmalıdır. APK-nı Windows-da Avistra Cloud-dan sideload edin (Settings → Create Android app). APK bu saytda dərc olunmur.",
        need: "Lisenziya lazımdır?",
        needP: "Developer-in Avistra Access-də lisenziya verməsi üçün aşağıda yazın. Forma hesab yaratmır. Lisenziya yalnız Access təsdiqindən sonra e-poçta gəlir.",
        formKicker: "Access sorğusu",
        name: "Ad",
        email: "E-poçt",
        required: "(məcburi)",
        optional: "(istəyə bağlı)",
        phone: "Telefon / digər əlaqə",
        phonePh: "Telefon, Telegram və s.",
        reason: "Lisenziya niyə lazımdır",
        reasonPh: "Kimsiniz və Avistra Cloud niyə lazımdır.",
        submit: "Lisenziya istə",
        formNote: "Sorğu Avistra Access-ə düşür. Təsdiqdən sonra Access URL və lisenziya açarı e-poçta gəlir, ləqəb və şifrəni Cloud-da seçirsiniz. Exe quraşdırmaq hesab yaratmır.",
        formSending: "Access-ə göndərilir…",
        formError: "Access-ə çatmaq mümkün olmadı. Yenidən cəhd edin və ya license-config.js-də workerUrl / accessUrl yazın.",
        accessNote:
          "Lisenziyalar və giriş ləqəbləri Developer tərəfindən <strong>Avistra Access</strong>-də verilir. Bu sayt Avistra Cloud-dur — masaüstü müşahidə tətbiqi. Quraşdırıcı giriş deyil.",
        company: "Şirkət",
      },
      footer: {
        line: "Avistra Cloud · Windows üçün indie lokal-AI müşahidə · USB · CCTV · PTZ · GoPro · telefon · boş olanda kamera sönülü",
        meta: "www.avestra.online · lokal qovşaq · öz-özünə qeydiyyat yox",
        top: "Yuxarı",
      },
      thanks: {
        title: "Sorğu göndərildi — Avistra Cloud",
        kicker: "Sorğu alındı",
        h1: "Sorğu gəlib. Lisenziya avtomatik deyil.",
        lede:
          "Sorğu Avistra Access-dədir. Təsdiq olunsa, Access URL və lisenziya açarı e-poçta gəlir. Sonra Cloud-da ləqəb və şifrə seçin. Windows quraşdırıcısı hesab yaratmır.",
        next: "Sonra nə olur",
        nextP:
          "Gələnlər qutusuna (və spam-ə) baxın. Həqiqətən məktub ala biləcəyiniz poçt istifadə edin. Lisenziyalı nüsxələr yenə Avistra Access tələb edir — Access URL, ləqəb, şifrə və lisenziya açarı.",
        dl: "AvestraCloud-Setup.exe yüklə",
        back: "Avistra Cloud-a qayıt",
      },
      notfound: {
        title: "Tapılmadı — Avistra Cloud",
        h1: "Burada izləyəcək bir şey yoxdur.",
        lede: "Bu yol boşdur. Avistra Cloud saytı bir səhifədir.",
        back: "Avistra Cloud",
      },
    },
    ru: {
      meta: {
        title: "Avistra Cloud — Видьте всё. Ничего не упускайте.",
        description:
          "Наблюдение на Windows: камера этого ПК, CCTV, PTZ, Wi‑Fi, GoPro и телефон — лица, объекты COCO и действия анализируются на ПК. Еженедельный отчёт. Лицензия от Developer.",
      },
      skip: "К содержанию",
      nav: {
        how: "Как это работает",
        uses: "Где используется",
        access: "Access",
        clients: "Windows / Android",
        faq: "FAQ",
        uninstall: "Удаление",
        donate: "Донат",
        download: "Скачать / Установить",
        menu: "Открыть меню",
        menuClose: "Закрыть меню",
        themeLight: "Тёмная тема",
        themeDark: "Светлая тема",
        lang: "Язык",
      },
      lang: { en: "English", az: "Azərbaycan", ru: "Русский" },
      hero: {
        kicker: "Avistra Cloud · Windows · локальный AI",
        titleAccent: "Видьте всё.",
        titleRest: "Ничего не упускайте.",
        lede: "Камеры, заполняемость и журнал — анализ на этом ПК.",
        cta: "Скачать / Установить",
        cta2: "Запросить лицензию",
      },
      intro: {
        titleAccent: "Наблюдение на Windows",
        titleRest: "и AI-анализ на этом ПК",
        body:
          "Мощное приложение наблюдения и AI-анализа для Windows, которое делает почти любую камеру интеллектуальной системой мониторинга. Подключайте <strong>PTZ</strong>, <strong>Wi‑Fi камеры</strong>, <strong>GoPro</strong> или <strong>телефон</strong> — плюс <strong>камеру этого ПК</strong> и <strong>CCTV</strong> по USB, RTSP или GoPro RTMP — и мгновенно <strong>переключайтесь</strong> между ними.",
        body2:
          "Приложение находит <strong>объекты</strong> (имена COCO), <strong>лица</strong>, <strong>движения и действия</strong>; настраиваемые триггеры сразу шлют письма с кадрами или видео.",
        body3:
          "На детекции это не заканчивается. AI разбирает поведение со временем, находит закономерности и готовит <strong>еженедельный поведенческий отчёт</strong>.",
        end: "Одна система. Каждая камера. Каждое движение. Каждая деталь.",
        remember: "Что видит — то помнит.",
        license:
          "Установка <strong>не</strong> создаёт аккаунт. Для входа нужны Access URL, ник, пароль и действующая неистёкшая лицензия от Developer. Захват выключен, пока вы не начнёте мониторинг. Запись остаётся на этом ПК — это не публичная SaaS-веб-камера.",
        more: "Как устроены лицензии",
      },
      facts: {
        cameras: "USB · CCTV · PTZ · GoPro · телефон",
        idle: "Камера выключена без мониторинга",
        weekly: "Еженедельный анализ на этом ПК",
      },
      features: {
        kicker: "Что видит",
        titleAccent: "Комната,",
        titleRest: "база, журнал.",
        lead:
          "Локальный AI на Windows. Направьте камеру этого ПК, CCTV, PTZ, Wi‑Fi, GoPro или телефон, переключайтесь — поток разбирается здесь: лица, которые вы внесли, объекты COCO, журнал кто прошёл. Без лицензии от Developer входа нет.",
        faceTitle: "Распознавание лиц",
        face:
          "Вносите лица на этом ПК. Известные люди — <strong>Person N · Имя</strong>. Остальные остаются Person N, пока вы не занесёте их в базу. Подписи на каждый кадр вручную не пишете.",
        cocoTitle: "Детекция объектов COCO",
        coco:
          "Стул. Ноутбук. Телефон. Кровать. Бутылка. Повседневные объекты получают имена из COCO, чтобы комната читалась — и триггеры срабатывали на то, что реально в кадре. Это не каталог магазина.",
        journalTitle: "Журнал действий",
        journal:
          "Кто вошёл. Кто вышел. Махнул, сел, встал, возможное падение. Строки в формате Person N · Имя; одежда может быть в описании. Можно искать, это не «настроение».",
        peopleTitle: "База людей",
        people:
          "Свой локальный склад на этом ПК. Внесённые лица, безымянные Person N, история. База рядом с приложением, не в чужом вендорском аккаунте.",
        occTitle: "Заполняемость",
        occ:
          "Сколько людей в кадре прямо сейчас при мониторинге. Пик и уникальные за день. Смотрите зал или комнату, не гадая по немой миниатюре.",
        licenseTitle: "Лицензии от Developer",
        license:
          "Установить можно с этого сайта. Для входа нужна <strong>действующая неистёкшая лицензия</strong>, которую Developer выдал в Avistra Access, плюс Access URL, ник и пароль. Саморегистрации нет. Истёкшие ключи не входят.",
      },
      uses: {
        kicker: "Где используют Avistra",
        titleAccent: "Для кого.",
        titleRest: "Честные задачи этого ПК.",
        lead:
          "Avistra Cloud — локальный узел Windows, не публичная облачная веб-камера. Реальные задачи: заполняемость, внесённые лица, журнал и почтовые триггеры, которые вы сами настроили.",
        bizKicker: "Бизнес",
        bizTitle: "Зал, лобби или магазин",
        biz:
          "Следите за <strong>подозрительной активностью</strong> через журнал действий и почтовые триггеры (кадры или видео). Считайте <strong>клиентов</strong> — заполняемость и поток при мониторинге. <strong>Человек из чёрного списка</strong> — только лицо, которое <em>вы</em> внесли и пометили в базе людей (сохранённое имя против Unknown / Person N). Полицейского watchlist API нет.",
        homeKicker: "Защита дома",
        homeTitle: "Кто прошёл",
        home:
          "Домашний мониторинг на этом ПК: USB, CCTV, Wi‑Fi или телефонная линза, на которую вы переключились. Кто вошёл, ваши оповещения, запись локально. Камера выключена, пока вы не начнёте мониторинг.",
        shopKicker: "Торговый зал",
        shopTitle: "Заполняемость и объекты",
        shop:
          "Сколько людей в кадре, объекты COCO (сумка, ноутбук, стул…) и журнал движения. Триггеры могут написать вам, когда случилось то, что вы настроили.",
        doorKicker: "Дверь офиса или кампуса",
        doorTitle: "Имя и Person N",
        door:
          "Внесите лица сотрудников или семьи. Остальные остаются Person N. Дверь, коридор или дом с уходом — анализ всё равно на ПК, лицензия всё равно от Developer.",
      },
      how: {
        kicker: "Как это работает",
        titleAccent: "Установите.",
        titleRest: "Направьте. Прочитайте, кто прошёл.",
        s1t: "Скачайте Setup.exe",
        s1:
          "AvestraCloud-Setup.exe с этой страницы (GitHub Releases). Запустите. Установка не создаёт аккаунт и не включает Avistra Access.",
        s2t: "Войдите четырьмя полями",
        s2: "Access URL + ник + пароль + лицензия от Developer. Ничего из этого нельзя выдумать. Истёкшие лицензии отклоняются.",
        s3t: "Выберите камеры, внесите людей",
        s3:
          "Settings → добавьте и переключайте источники: USB-камера этого ПК, CCTV / PTZ / Wi‑Fi по RTSP, GoPro (USB, Wi‑Fi или RTMP на этот ПК) или камера телефона по Wi‑Fi. People → лица, которым нужно имя. Остальные остаются Person N — всё равно в треке и в журнале.",
        s4t: "Начните мониторинг",
        s4:
          "Live → Start. Рамки, заполняемость, журнал — на этом ПК (или хосте Access). Остановите мониторинг — захват гаснет. Облако — это ПК.",
        s5t: "Телефон — второе приложение",
        s5:
          "Android — не веб-камера для этого ПК. Тот же вход Access, камера телефона, лица и COCO на устройстве. Sideload из Cloud Settings — не с этого сайта. Windows всё равно может брать камеру телефона по Wi‑Fi как одну из линз.",
      },
      access: {
        kicker: "Avistra Access",
        titleAccent: "Четыре поля.",
        titleRest: "Один выдающий. Без саморегистрации.",
        lead:
          "Avistra Access — отдельное приложение на машине Developer. Windows Setup.exe — только Avistra Cloud, Access внутри нет. Developer выдаёт ник, пароль и лицензию, затем присылает Access URL. Держите Access открытым на ПК владельца, чтобы работали Kick и активность.",
        f1: "Поле 01",
        urlTitle: "Access URL",
        url:
          "Вставьте публичный HTTPS-адрес из Avistra Access (<span class=\"mono\">https://….trycloudflare.com</span>). Публичный URL работает откуда угодно — та же Wi‑Fi <strong>не</strong> обязательна. LAN URL — только та же Wi‑Fi.",
        f2: "Поле 02",
        nickTitle: "Ник",
        nick: "С действующей лицензией при первом входе вы выбираете ник и пароль в Cloud. Без лицензии саморегистрации нет.",
        f3: "Поле 03",
        passTitle: "Пароль",
        pass: "Пароль к этому нику. Неверный пароль — нет сессии.",
        f4: "Поле 04",
        licTitle: "Лицензия",
        lic:
          "Ключ, который выдал Developer (похоже на <span class=\"mono\">AVESTRA-…</span>). Должен быть действующим и <strong>неистёкшим</strong>. С истёкшей лицензией войти нельзя. Установка exe ключ не создаёт.",
        plate: "Пластина входа",
        issuer: "Выдаёт",
        issuerV: "Developer, в Avistra Access",
        signup: "Саморегистрация",
        signupV: "Нет. Форма ставит запрос в очередь Avistra Access. После одобрения на почту приходят Access URL и лицензия; ник и пароль вы выбираете в Cloud.",
        expiry: "Срок",
        expiryV: "Истёкшие ключи отклоняются на входе. Если срок вышел — напишите Developer.",
        pub: "Публичный URL",
        pubV: "trycloudflare (или именной хост). Работает вне домашней Wi‑Fi.",
        lan: "LAN URL",
        lanV: "Только та же Wi‑Fi. Тестировщик в другой стране не может использовать 192.168…",
        kick: "Kick",
        kickV: "Владелец может выйти тестировщика везде из Access Profiles.",
      },
      clients: {
        kicker: "Два приложения",
        titleAccent: "Продукт — Windows.",
        titleRest: "Android — вторая линза.",
        lead:
          "Windows Cloud принимает USB, CCTV, PTZ, Wi‑Fi, GoPro и телефон и разбирает их на ПК. Android отдельно: своя камера телефона, детекция на устройстве — не веб-камера, вставленная в Cloud.",
        primary: "Основное",
        winTitle: "Windows — Avistra Cloud",
        w1: "Камера этого ПК, CCTV, PTZ, Wi‑Fi, GoPro, телефон — переключение",
        w2: "Живой анализ на этом ПК (или хосте Access): лица + COCO + журнал",
        w3: "База людей и журнал действий на этом ПК",
        w4: "Без мониторинга захват выключен",
        w5: "Заполняемость, триггеры, захват, опциональная почта",
        w6: "Установка с сайта: AvestraCloud-Setup.exe",
        w7: "Вход: Access URL + ник + пароль + лицензия",
        w8: "Удаление: Settings → Apps, Start Menu или Uninstall.exe",
        secondary: "Второе",
        andTitle: "Android — отдельный клиент",
        a1: "Камера телефона, не веб-камера для ПК",
        a2: "Лица и объекты COCO на устройстве",
        a3: "Люди и журнал этой лицензии на телефоне",
        a4: "Windows Cloud не обязан оставаться запущенным после входа",
        a5: "Для входа Avistra Access всё равно должен быть доступен",
        a6: "Sideload из Cloud Settings → Create Android app",
        a7: "APK на этом сайте <strong>не</strong> публикуется",
      },
      privacy: {
        kicker: "На этом ПК",
        titleAccent: "Компьютер",
        titleRest: "и есть облако.",
        footageT: "Запись остаётся здесь",
        footage:
          "Видео, эмбеддинги, база людей, журнал — на машине с Avistra Cloud. Хостинг-трубы Avistra нет. Исключения: опциональная семейная синхронизация людей, Cloudflare R2-бэкап, который вы сами включаете, и этот маркетинговый сайт.",
        idleT: "Камера выключена без мониторинга",
        idle:
          "Нет мониторинга — захват выключен. Live, заполняемость и запись только после Start monitoring. Остановите — выбранная линза гаснет.",
        estT: "Оценки — это оценки",
        est:
          "Возраст и рост, если показаны, — догадки камеры с уверенностью, не документы и не факты. Подсказки. Никогда не личность.",
        nameT: "Имена даёте вы",
        name:
          "Распознавание называет только внесённые вами имена. Триггеры делают только настроенное вами. Опциональные модели выключены, пока вы их не включите. Гражданство и этничность по умолчанию не выводятся.",
        legal:
          "Вы отвечаете за использование ПО в соответствии с местным законом, политикой рабочего места и требованиями согласия на камеру и биометрию.",
      },
      testers: {
        kicker: "Для тестировщиков",
        titleAccent: "Установить можно сегодня.",
        titleRest: "Войти без Developer нельзя.",
        l1: "Запросите лицензию на этой странице (или она уже есть от Developer).",
        l2: "Скачайте <strong>AvestraCloud-Setup.exe</strong>. Установка не создаёт аккаунт.",
        l3: "Дождитесь одобрения в Access. Access URL и <strong>действующая неистёкшая лицензия</strong> придут письмом, затем выберите ник и пароль в Cloud.",
        l4: "Вставьте <strong>публичный</strong> Access URL, если вы не в Wi‑Fi Developer. Та же Wi‑Fi нужна только для LAN URL.",
        l5: "Держите Avistra Access открытым на ПК владельца. Kick — «Sign out everywhere».",
        l6: "Android: sideload из Cloud Settings на Windows. APK здесь не ищите.",
        note: "Setup.exe — только Avistra Cloud. Avistra Access внутри нет. Ключи лицензий на этой странице никогда не публикуются.",
      },
      faq: {
        kicker: "FAQ",
        titleAccent: "Прямые ответы.",
        titleRest: "Без SaaS-тумана.",
        q1: "Установка создаёт аккаунт?",
        a1: "Нет. Setup.exe ставит Avistra Cloud на ПК. Для входа нужны Access URL, ник, пароль и действующая неистёкшая лицензия от Developer. Саморегистрации нет.",
        q2: "Как получить лицензию?",
        a2: "Форма на этой странице ставит запрос в очередь Avistra Access. После одобрения Developer на почту приходят Access URL и ключ лицензии. Ник и пароль вы выбираете в Cloud. Форма сама ключ не создаёт. С истёкшей лицензией войти нельзя.",
        q3: "Нужна ли та же Wi‑Fi?",
        a3: "Нет, если используете публичный Access URL (trycloudflare или именной хост из Access). LAN-адрес — только та же Wi‑Fi. Тестировщик в другой стране не может использовать URL 192.168…",
        q4: "Телефонное приложение подключается к ПК?",
        a4: "Нет. Android — отдельный второй клиент: камера телефона, лица и COCO на устройстве, свой список людей и журнал этой лицензии. В Windows Cloud как веб-камера не вставляется. Windows Cloud всё равно может брать камеру телефона по Wi‑Fi как источник — этот поток разбирается на ПК. Для входа Access должен быть доступен.",
        q5: "Где Android APK?",
        a5: "Не на этом сайте. В Windows Avistra Cloud: Settings → Create Android app, затем Start phone access и откройте /install на телефоне.",
        q6: "Что Live показывает по людям и объектам?",
        a6: "Люди: Person N или Person N · Имя после внесения. Одежда может быть в описании (например Person 1 · Alex, тёмное худи). Объекты: только классы COCO — стул, ноутбук, телефон, кровать и т.д. Не бренды и не выдуманные имена мебели.",
        q7: "Какие камеры умеет Windows Cloud?",
        a7: "USB-камера этого ПК, CCTV, PTZ и другие Wi‑Fi / IP по RTSP или HTTP, GoPro по USB, Wi‑Fi или RTMP на этот ПК, камера телефона по Wi‑Fi. Вы добавляете именованные слоты и переключаетесь. Live разбирается на ПК с Avistra Cloud (или хосте Access) — лица, COCO, журнал. Не публичная SaaS-веб-камера. Android отдельно использует камеру телефона на телефоне.",
        q8: "Камера всегда включена?",
        a8: "Нет. Без мониторинга захват выключен. Начните мониторинг, чтобы открыть выбранную камеру. Остановите — чтобы закрыть.",
        q9: "Куда уходят данные?",
        a9: "По умолчанию на ПК, где запущено приложение. Машину покидают только ради опциональной семейной синхронизации людей, Cloudflare R2-бэкапа, который вы включаете, или этого публичного сайта (он ваше видео не хостит).",
        q10: "Как удалить?",
        a10: "Второго огромного файла удаления нет. На том ПК: Windows Settings → Apps → Avistra Cloud → Uninstall. Или Start Menu → Avistra Cloud → Uninstall Avistra Cloud. Или запустите <span class=\"path\">%LOCALAPPDATA%\\Programs\\Avistra Cloud\\Uninstall.exe</span>. Файлы программы исчезают. Люди и логи остаются, пока не отметите «Also remove local data».",
        q11: "Windows пишет, что приложение не распознано.",
        a11: "SmartScreen может предупреждать о неподписанном indie-ПО. More info → Run anyway только если вы доверяете этой официальной загрузке с GitHub Releases по ссылке на сайте.",
      },
      donate: {
        kicker: "Поддержать",
        titleAccent: "Донат",
        titleRest: "",
        lead:
          "Это indie-ПО. Если Avistra Cloud хорошо смотрит за вашим пространством, можно поддержать через <strong>PayPal</strong> или <strong>карту</strong>. Оплата на PayPal (или Stripe, если настроен Payment Link) — этот сайт номера карт не принимает.",
        paypal: "PayPal",
        paypalP: "Открывает страницу доната PayPal. Войдите в PayPal или продолжите как гость, если PayPal это предлагает.",
        paypalBtn: "Донат через PayPal",
        card: "Кредитная или дебетовая карта",
        cardP: "Visa, Mastercard и другие карты как гость на странице доната PayPal. Для многих карт аккаунт PayPal не нужен.",
        cardStripe: "Visa, Mastercard и другие карты через Stripe Payment Link. Секретных ключей Stripe на сайте нет.",
        cardBtn: "Оплатить картой",
        note: "Донаты идут Developer. Оплата на PayPal или Stripe. Ключей лицензий на этой странице нет.",
      },
      get: {
        titleAccent: "Скачать",
        titleRest: "и установить",
        p:
          "Avistra Cloud — десктопное приложение для <strong>Windows</strong>. Скачайте <strong>AvestraCloud-Setup.exe</strong> ниже и установите. Установка <strong>не</strong> создаёт аккаунт. Без <strong>действующей неистёкшей лицензии</strong> от Developer в Avistra Access войти всё равно нельзя (Access URL, ник, пароль и ключ). С истёкшей лицензией входа нет.",
        setupTitle: "Windows Setup.exe",
        setupP: "Установщик Inno Setup. После него откройте Avistra Cloud и войдите данными от Developer — не гостевой вход и не саморегистрация.",
        setupBtn: "Скачать / Установить AvestraCloud-Setup.exe",
        winNote: "Windows может предупредить, что приложение не распознано. More info → Run anyway только если вы доверяете этой официальной загрузке. Установщик на GitHub Releases, не на этом сайте Pages.",
        unTitle: "Удаление",
        unP: "Отдельной загрузки удаления нет. Когда Avistra Cloud установлен, удалите его на том ПК:",
        un1: "Windows Settings → Apps → <strong>Avistra Cloud</strong> → Uninstall",
        un2: "Start Menu → Avistra Cloud → <strong>Uninstall Avistra Cloud</strong>",
        un3: "Или запустите <strong>Uninstall.exe</strong>: <span class=\"path\">%LOCALAPPDATA%\\Programs\\Avistra Cloud\\Uninstall.exe</span>",
        unNote: "Файлы программы удаляются. Люди, логи и прочие локальные данные остаются, пока в деинсталляторе не отметите «Also remove local data».",
        andTitle: "Android (второе приложение)",
        andP:
          "Avistra на телефоне — свой монитор: камера телефона, лица и COCO на устройстве, люди и журнал этой лицензии. Вход с теми же Access URL, ником, паролем и лицензией, что на Windows. К ПК как веб-камера не подключается, Windows Cloud не обязан оставаться запущенным. Для входа Avistra Access должен быть доступен. Sideload APK из Avistra Cloud на Windows (Settings → Create Android app). APK на этом сайте не публикуется.",
        need: "Нужна лицензия?",
        needP: "Напишите ниже, если Developer должен выдать лицензию в Avistra Access. Форма не создаёт аккаунт. Лицензия приходит письмом только после одобрения в Access.",
        formKicker: "Запрос Access",
        name: "Имя",
        email: "Email",
        required: "(обязательно)",
        optional: "(необязательно)",
        phone: "Телефон / другой контакт",
        phonePh: "Телефон, Telegram и т.д.",
        reason: "Зачем нужна лицензия",
        reasonPh: "Кто вы и зачем вам Avistra Cloud.",
        submit: "Запросить лицензию",
        formNote: "Запрос попадает в Avistra Access. После одобрения на почту приходят Access URL и ключ, ник и пароль вы выбираете в Cloud. Установка exe аккаунт не создаёт.",
        formSending: "Отправка в Access…",
        formError: "Не удалось достучаться до Access. Повторите попытку или укажите workerUrl / accessUrl в license-config.js.",
        accessNote:
          "Лицензии и ники для входа выдаёт Developer в <strong>Avistra Access</strong>. Этот сайт — Avistra Cloud, десктопное наблюдение. Установщик — не логин.",
        company: "Компания",
      },
      footer: {
        line: "Avistra Cloud · Indie локальный AI-надзор для Windows · USB · CCTV · PTZ · GoPro · телефон · камера выключена без мониторинга",
        meta: "www.avestra.online · локальный узел · без саморегистрации",
        top: "Наверх",
      },
      thanks: {
        title: "Запрос отправлен — Avistra Cloud",
        kicker: "Запрос получен",
        h1: "Запрос дошёл. Лицензия не автоматическая.",
        lede:
          "Запрос в Avistra Access. Если его одобрят, письмом придут Access URL и ключ лицензии. Затем выберите ник и пароль в Cloud. Установщик Windows аккаунт не создаёт.",
        next: "Что дальше",
        nextP:
          "Проверьте входящие (и спам). Используйте ящик, на который реально приходит почта. Лицензионным копиям всё равно нужен Avistra Access — Access URL, ник, пароль и ключ.",
        dl: "Скачать AvestraCloud-Setup.exe",
        back: "Назад к Avistra Cloud",
      },
      notfound: {
        title: "Не найдено — Avistra Cloud",
        h1: "Здесь смотреть нечего.",
        lede: "Этот путь пуст. Сайт Avistra Cloud — одна страница.",
        back: "Avistra Cloud",
      },
    },
  };

  const langs = ["en", "az", "ru"];
  const htmlLang = { en: "en", az: "az", ru: "ru" };
  const KEY = "avestra-lang";

  const get = (obj, path) =>
    path.split(".").reduce((acc, part) => (acc && acc[part] != null ? acc[part] : null), obj);

  const t = (path, lang) => {
    const code = langs.includes(lang) ? lang : "en";
    return get(dict[code], path) ?? get(dict.en, path) ?? path;
  };

  const detect = () => {
    try {
      const q = new URLSearchParams(location.search).get("lang");
      if (langs.includes(q)) return q;
      const stored = localStorage.getItem(KEY);
      if (langs.includes(stored)) return stored;
    } catch (_) {}
    return "en";
  };

  let current = detect();

  const apply = (lang) => {
    current = langs.includes(lang) ? lang : "en";
    document.documentElement.lang = htmlLang[current];
    document.documentElement.dataset.lang = current;
    try {
      localStorage.setItem(KEY, current);
    } catch (_) {}

    const path = (location.pathname || "").toLowerCase();
    const titleKey = path.includes("thanks")
      ? "thanks.title"
      : path.includes("404")
        ? "notfound.title"
        : "meta.title";
    const title = t(titleKey, current);
    if (title) document.title = title;
    const desc = document.querySelector('meta[name="description"]');
    if (desc) desc.setAttribute("content", t("meta.description", current));
    const ogt = document.querySelector('meta[property="og:title"]');
    if (ogt) ogt.setAttribute("content", title);
    const ogd = document.querySelector('meta[property="og:description"]');
    if (ogd) ogd.setAttribute("content", t("meta.description", current));

    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const html = t(el.getAttribute("data-i18n"), current);
      if (html != null) el.innerHTML = html;
    });
    document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
      el.setAttribute("placeholder", t(el.getAttribute("data-i18n-placeholder"), current));
    });
    document.querySelectorAll("[data-i18n-aria]").forEach((el) => {
      el.setAttribute("aria-label", t(el.getAttribute("data-i18n-aria"), current));
    });
    document.querySelectorAll("[data-i18n-title]").forEach((el) => {
      el.setAttribute("title", t(el.getAttribute("data-i18n-title"), current));
    });

    document.querySelectorAll("[data-lang-code]").forEach((el) => {
      el.textContent = current.toUpperCase();
    });
    document.querySelectorAll("[data-set-lang]").forEach((btn) => {
      btn.setAttribute("aria-current", btn.getAttribute("data-set-lang") === current ? "true" : "false");
    });

    try {
      const url = new URL(location.href);
      url.searchParams.set("lang", current);
      history.replaceState(null, "", url);
    } catch (_) {}

    window.dispatchEvent(new CustomEvent("avestra-lang", { detail: current }));
  };

  window.AvistraI18n = {
    dict,
    langs,
    t: (path) => t(path, current),
    get lang() {
      return current;
    },
    setLang: apply,
    detect,
    apply,
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => apply(current), { once: true });
  } else {
    apply(current);
  }
})();
