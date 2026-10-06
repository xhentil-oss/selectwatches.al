# Prompt për Claude – Dizajni UX/UI i Select Group (multi-site)

Kopjoje tekstin më poshtë dhe jepja Claude-it së bashku me dy logot (Select Watches dhe Beauty Point).

---

Je dizajner senior UX/UI dhe zhvillues front-end React. Ndërto ndërfaqen grafike të faqes së re të **Select Group** (https://selectgroup.al), që tani bëhet **multi-site** me dy dyqane:

1. **Select Watches** – ora dhe aksesorë (bizhuteri, rripa).
2. **Beauty Point** – parfume, kozmetikë, kujdes për lëkurën.

## Qëllimi kryesor
Kur përdoruesi hap faqen kryesore, duhet ta kuptojë menjëherë se ka **dy botë të ndara**. Faqja kryesore (`/`) ndahet në dy gjysma të barabarta, një për çdo dyqan, me logon, një fjali të shkurtër dhe një buton ("Zbulo orët" / "Zbulo parfumet"). Në header ka gjithmonë një ndërrues (tab) "Select Watches | Beauty Point", që përdoruesi të dijë ku ndodhet dhe të kalojë nga njëri te tjetri me një klik. Shporta, gjuha dhe llogaria janë të përbashkëta.

## Stili vizual
- Ndiq dizajnin aktual të selectgroup.al: header dhe footer i errët #1B1B1B, shirit #000, panele #F3F3F3, sfond i bardhë.
- Tipografia: Playfair Display për titujt, Merriweather Sans 300 për tekstin, Murecho për menunë.
- Butona transparentë me kornizë 1px dhe qoshe 8px; karta me qoshe 20px.
- Foto lifestyle të mëdha (dorë me orë, parfum në dritë të ngrohtë) me overlay #1B1B1B, video në hero.
- Të dy dyqanet ndajnë të njëjtën bazë; ndryshon vetëm theksi: **Select Watches = argjend (#F3F3F3)**, **Beauty Point = ar shampanjë (#C9A27E)**.
- Rrjedha e faqes kryesore si sot: video hero → dy pllaka të mëdha (Select Watches | Beauty Point) → produktet e reja → "Time is the most valuable luxury" (orët) / "Perfume speaks the language of memories" (parfumet) → oferta → markat (logo që lëvizin) → lajmet.

## Elementet e detyrueshme
1. **Gjuhët**: shqip (parazgjedhje), italisht, anglisht. Ndërruesi SQ / IT / EN në header, ruhet zgjedhja e përdoruesit.
2. **Slider info në krye të header-it**: shirit i hollë që lëviz vazhdimisht (transport falas, paketim dhuratë, oferta, dyqanet TEG & QTU). Ndalon kur kalon mausi sipër.
3. **Ide dhuratash**: slider me 3 slide (Për Atë, Për Të, Nën 15,000 Lek), me autoplay, shigjeta dhe pika. Çdo slide të çon te dyqani i filtruar.
4. **Ofertat e sezonit**: banner që mbyllet me ×, me afatin e ofertës, plus një rresht produktesh në ofertë.
5. **Rreth nesh në footer**: teksti i shkurtër "Rreth nesh" dhe lidhja te faqja e plotë, dyqanet (TEG, QTU), telefoni 069 40 48 906, email, Instagram për secilin dyqan, newsletter.
6. **Markat tona në menunë e header-it**: mega-menu që hapet me hover, me markat të ndara sipas dyqanit, plus "Të gjitha markat".
7. **Filtri sipas gjinisë në dyqan** (Meshkuj / Femra / Unisex), si për orët ashtu edhe për parfumet, bashkë me filtrat kategori, markë, çmim dhe "vetëm në ofertë". Filtrat ruhen në URL.
8. **Përshkrimi i produktit**: faqja e produktit ka tab-et Përshkrimi / Detajet (specifikime) / Transporti & kthimet.
9. **Shto në shportë pa hapur produktin**: butoni "Shto në shportë" shfaqet mbi foton e kartës (gjithmonë i dukshëm në celular) dhe hap shportën anësore.

## UX
- Mobile-first: menu hamburger, filtrat në një panel që hapet/mbyllet, butonat të paktën 44px.
- Kontrast i mirë, fokus i dukshëm për tastierën, `alt` në foto, slider-at ndalen me `prefers-reduced-motion`.
- Breadcrumb në dyqan dhe te produkti, gjithmonë me emrin e dyqanit.

## Dorëzimi
Projekt React (Vite + React Router), me komponentë të ndarë (layout, home, product, shop, ui), përkthime në `src/i18n`, tema me CSS variables (`theme-watches`, `theme-beauty`), dhe të dhëna shembull që zëvendësohen më vonë me API-n e WooCommerce.
