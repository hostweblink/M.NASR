import React, { useEffect, useRef, useState } from "react";

export default function App() {
  /* =========================================================
     PUBLIC URL HELPER (FOR GITHUB PAGES)
  ========================================================= */
  const publicUrl = process.env.PUBLIC_URL || "";

  /* =========================================================
     STATE
  ========================================================= */

  const [darkMode, setDarkMode] = useState(() => {
    try {
      return localStorage.getItem("theme") === "dark";
    } catch {
      return false;
    }
  });

  const [loading, setLoading] = useState(true);
  const [activeCampaign, setActiveCampaign] = useState(0);
  const [activeEditorial, setActiveEditorial] = useState(0);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [lightboxImage, setLightboxImage] = useState(null);
  const [mobileMenu, setMobileMenu] = useState(false);

  // Touch handlers for mobile swipe
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  /* =========================================================
     DATA
  ========================================================= */

  const marqueeWords = [
    "EDITORIAL",
    "RUNWAY",
    "PORTRAIT",
    "FASHION",
    "CAMPAIGN",
    "CAIRO",
  ];

  const editorials = [
    {
      title: "Urban Chic",
      images: [`${publicUrl}/photo1.png`, `${publicUrl}/photo6.png`],
    },
    {
      title: "Avant-Garde",
      images: [`${publicUrl}/photo2.png`, `${publicUrl}/photo6.png`],
    },
    {
      title: "Studio Portrait",
      images: [`${publicUrl}/photo7.png`, `${publicUrl}/photo5.png`],
    },
  ];

  const campaigns = [
    { title: "Summer Editorial", image: `${publicUrl}/photo5.png` },
    { title: "Editorial Portrait", image: `${publicUrl}/photo6.png` },
    { title: "Formal Series", image: `${publicUrl}/photo1.png` },
    { title: "Streetwear", image: `${publicUrl}/photo2.png` },
  ];

  const selectedWorks = [
    { type: "image", src: `${publicUrl}/photo5.png`, alt: "Work 1" },
    { type: "quote-dream", quote: "Fashion is about dreaming.", author: "— SELECTED WORKS" },
    { type: "image", src: `${publicUrl}/photo6.png`, alt: "Work 2" },
    { type: "image", src: `${publicUrl}/photo1.png`, alt: "Work 3" },
    { type: "image", src: `${publicUrl}/photo2.png`, alt: "Work 4" },
    { type: "quote-style", quote: "Style is identity.", author: "— M.NASR" },
    { type: "image", src: `${publicUrl}/photo7.png`, alt: "Work 5" },
  ];

  const photography = [
    `${publicUrl}/lens1.jpeg`,
    `${publicUrl}/lens2.jpeg`,
    `${publicUrl}/lens3.jpeg`,
  ];

  /* =========================================================
     THEME & REVEAL
  ========================================================= */

  const navRef = useRef(null);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    try {
      localStorage.setItem("theme", darkMode ? "dark" : "light");
    } catch {}
  }, [darkMode]);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1400);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const elements = document.querySelectorAll(".reveal");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("opacity-100", "translate-y-0");
            entry.target.classList.remove("opacity-0", "translate-y-11");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [loading]);

  /* =========================================================
     NAVIGATION & HANDLERS
  ========================================================= */

  const scrollToSection = (id) => {
    setMobileMenu(false);
    const section = document.getElementById(id);
    if (section) section.scrollIntoView({ behavior: "smooth" });
  };

  const nextEditorial = () => {
    setActiveImageIndex(0);
    setActiveEditorial((prev) => (prev + 1) % editorials.length);
  };

  const prevEditorial = () => {
    setActiveImageIndex(0);
    setActiveEditorial((prev) => (prev - 1 + editorials.length) % editorials.length);
  };

  const nextImage = (e) => {
    e?.stopPropagation();
    const currentImages = editorials[activeEditorial].images;
    setActiveImageIndex((prev) => (prev + 1) % currentImages.length);
  };

  const prevImage = (e) => {
    e?.stopPropagation();
    const currentImages = editorials[activeEditorial].images;
    setActiveImageIndex((prev) => (prev - 1 + currentImages.length) % currentImages.length);
  };

  const handleTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    if (distance > 50) nextEditorial();
    else if (distance < -50) prevEditorial();
  };

  /* =========================================================
     CUSTOM GLOBAL KEYFRAMES STYLES
  ========================================================= */
  const customStyles = `
    @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,400;1,500&family=DM+Sans:wght@300;400;500;600&family=Playfair+Display:ital,wght@0,400;0,500;0,600;1,400;1,500&display=swap');
    
    @keyframes marqueeLoop {
      0% { transform: translateX(0%); }
      100% { transform: translateX(-50%); }
    }
    @keyframes luxuryScrollLine {
      0% { transform: scaleX(0); transform-origin: left center; }
      44% { transform: scaleX(1); transform-origin: left center; }
      48% { transform: scaleX(1); transform-origin: right center; }
      92% { transform: scaleX(0); transform-origin: right center; }
      100% { transform: scaleX(0); transform-origin: right center; }
    }
    @keyframes loaderLineAnim {
      0% { transform: translateX(-100%); }
      100% { transform: translateX(0%); }
    }
    .reveal {
      transition: opacity 0.9s ease, transform 0.9s cubic-bezier(0.2, 0.8, 0.2, 1);
    }
    .animate-loader-line {
      animation: loaderLineAnim 1.3s cubic-bezier(0.65, 0, 0.35, 1) forwards;
    }
  `;

  /* =========================================================
     LOADING SCREEN (With Fixed Working Animation)
  ========================================================= */

  if (loading) {
    return (
      <>
        <style>{customStyles}</style>
        <div className="fixed inset-0 z-[99999] bg-[#111] text-white flex flex-col items-center justify-center">
          <div className="flex flex-col items-center font-['Playfair_Display'] text-[clamp(2rem,7vw,5rem)] leading-[0.85] tracking-[4px]">
            <span>MOHAMMED</span>
            <span className="italic">NASR</span>
          </div>
          <div className="w-44 h-[1.5px] bg-neutral-800 mt-9 overflow-hidden relative">
            <div className="h-full w-full bg-white animate-loader-line" />
          </div>
        </div>
      </>
    );
  }

  /* =========================================================
     ACTIVE & SIDE DATA
  ========================================================= */

  const currentEditorial = editorials[activeEditorial];
  const activeImgSrc = currentEditorial.images[activeImageIndex] || currentEditorial.images[0];
  const sideIndex1 = (activeEditorial + 1) % editorials.length;
  const sideIndex2 = (activeEditorial + 2) % editorials.length;

  return (
    <div className="min-h-screen bg-[#f6f5f2] text-[#111] dark:bg-[#0d0d0d] dark:text-[#f4f2ed] font-['DM_Sans'] transition-colors duration-500 overflow-x-hidden selection:bg-[#7c2c28] selection:text-white">
      
      <style>{customStyles}</style>

      {/* =====================================================
          NAVBAR
      ===================================================== */}
      <nav
        ref={navRef}
        className="fixed top-0 left-0 w-full h-[65px] md:h-[78px] px-[4vw] flex items-center justify-between z-50 backdrop-blur-lg bg-[#f6f5f2]/80 dark:bg-[#0d0d0d]/80 border-b border-black/10 dark:border-white/10"
      >
        <div
          onClick={() => scrollToSection("home")}
          className="font-['Playfair_Display'] text-xl md:text-2xl tracking-[2px] cursor-pointer"
        >
          M.NASR
        </div>

        {/* Links */}
        <div
          className={`fixed md:static top-[65px] md:top-0 left-0 w-full md:w-auto bg-[#f6f5f2] dark:bg-[#0d0d0d] md:bg-transparent md:dark:bg-transparent flex flex-col md:flex-row p-6 md:p-0 gap-4 md:gap-7 transition-transform duration-500 border-b md:border-0 border-black/10 dark:border-white/10 ${
            mobileMenu ? "translate-y-0" : "-translate-y-[150%] md:translate-y-0"
          }`}
        >
          {[
            ["Home", "home"],
            ["About", "about"],
            ["Stats", "stats"],
            ["Editorials", "portfolio"],
            ["Campaigns", "campaigns"],
            ["Works", "works"],
            ["Lens", "photography"],
            ["Reel", "reel"],
            ["Contact", "contact"],
          ].map(([label, id]) => (
            <button
              key={id}
              onClick={() => scrollToSection(id)}
              className="text-left md:text-center uppercase text-[0.7rem] tracking-[1.5px] opacity-70 hover:opacity-100 transition-opacity cursor-pointer"
            >
              {label}
            </button>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setDarkMode(!darkMode)}
            aria-label="Toggle theme"
            className="w-9 h-9 rounded-full border border-current flex items-center justify-center text-sm cursor-pointer hover:scale-105 transition-transform"
          >
            {darkMode ? "☀" : "◐"}
          </button>
          <button
            onClick={() => setMobileMenu(!mobileMenu)}
            aria-label="Toggle menu"
            className="md:hidden w-9 h-9 rounded-full border border-current flex items-center justify-center text-base cursor-pointer"
          >
            {mobileMenu ? "×" : "☰"}
          </button>
        </div>
      </nav>

      {/* =====================================================
          HERO
      ===================================================== */}
      <header id="home" className="min-h-screen relative flex justify-center items-center text-center pt-24 pb-12 px-5 overflow-hidden">
        <div className="absolute font-['Playfair_Display'] text-[35vw] md:text-[clamp(9rem,25vw,28rem)] leading-none text-transparent [-webkit-text-stroke:1px_rgba(0,0,0,0.06)] dark:[-webkit-text-stroke:1px_rgba(255,255,255,0.05)] pointer-events-none select-none">
          MODEL
        </div>

        <div className="relative z-10 reveal opacity-0 translate-y-11">
          <div className="w-[190px] h-[255px] md:w-[270px] md:h-[360px] relative mx-auto mb-9 group">
            <div className="absolute inset-[14px_-14px_-14px_14px] border border-[#7c2c28] z-0 transition-all duration-500 group-hover:inset-[8px_-8px_-8px_8px]" />
            <img
              src={`${publicUrl}/profile.png`}
              alt="Mohammed Nasr"
              className="w-full h-full object-cover relative z-10 grayscale-[15%]"
            />
          </div>

          <div className="text-[0.68rem] tracking-[3px] uppercase opacity-60">CAIRO · EGYPT</div>

          <h1 className="font-['Playfair_Display'] text-[3.5rem] md:text-[clamp(4rem,9vw,8rem)] font-normal leading-[0.78] tracking-[-2px] md:tracking-[-4px] my-5 md:my-6">
            Mohammed
            <br />
            <span className="italic ml-4 md:ml-20">Nasr</span>
          </h1>

          <p className="uppercase text-[0.75rem] tracking-[4px] opacity-60">Editorial & Runway Model</p>

          <button
            onClick={() => scrollToSection("about")}
            className="mt-14 inline-flex items-center gap-4 text-[0.65rem] tracking-[2.5px] opacity-65 hover:opacity-100 transition-opacity cursor-pointer"
          >
            <span>SCROLL TO EXPLORE</span>
            <div className="w-16 h-[1.5px] bg-black/15 dark:bg-white/20 relative overflow-hidden rounded-sm">
              <div className="absolute inset-0 bg-[#7c2c28] scale-x-0 origin-left animate-[luxuryScrollLine_2.5s_cubic-bezier(0.65,0,0.35,1)_infinite]" />
            </div>
          </button>
        </div>

        <div className="hidden md:flex absolute right-[3vw] bottom-[10%] flex-col gap-4 text-[0.6rem] tracking-[2px] opacity-50 [writing-mode:vertical-rl]">
          <span>01</span>
          <span>PORTFOLIO</span>
        </div>
      </header>

      {/* =====================================================
          MARQUEE (Slim & Compact on Mobile)
      ===================================================== */}
      <section className="bg-[#111] text-white overflow-hidden py-2.5 md:py-6 whitespace-nowrap flex select-none">
        <div className="flex w-max will-change-transform animate-[marqueeLoop_32s_linear_infinite]">
          {[1, 2].map((block) => (
            <div className="flex items-center shrink-0" key={block}>
              {[1, 2, 3].map((rep) =>
                marqueeWords.map((word, idx) => (
                  <React.Fragment key={`${rep}-${idx}`}>
                    <span className="font-['Playfair_Display'] text-xs sm:text-sm md:text-2xl tracking-[2.5px] md:tracking-[4px] mx-4 md:mx-9 shrink-0">
                      {word}
                    </span>
                    <i className="text-[0.55rem] md:text-xs opacity-45 not-italic shrink-0">✦</i>
                  </React.Fragment>
                ))
              )}
            </div>
          ))}
        </div>
      </section>

      {/* =====================================================
          ABOUT
      ===================================================== */}
      <section id="about" className="relative max-w-[1500px] mx-auto py-24 md:py-36 px-[6vw]">
        <div className="absolute top-12 left-[6vw] text-[0.62rem] tracking-[2px] opacity-45">01 / ABOUT</div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24 items-center">
          <div className="relative reveal opacity-0 translate-y-11">
            <img
              src={`${publicUrl}/photo5.png`}
              alt="Mohammed Nasr portrait"
              className="w-full h-[430px] md:h-[650px] object-cover grayscale-[12%]"
            />
            <div className="absolute bottom-5 left-5 text-white text-[0.7rem] tracking-[2px] drop-shadow-[0_2px_15px_black]">
              MOHAMMED NASR
              <span className="block mt-1 opacity-70 text-[0.55rem]">EDITORIAL PORTRAIT</span>
            </div>
          </div>

          <div className="max-w-[570px] reveal opacity-0 translate-y-11">
            <div className="text-[0.68rem] tracking-[3px] uppercase opacity-60 mb-2">STATEMENT</div>
            <h2 className="font-['Playfair_Display'] font-normal text-[3.3rem] md:text-[clamp(3.3rem,6vw,6rem)] leading-[0.88] tracking-[-2px] my-6">
              Presence before
              <br />
              <em className="text-[#7c2c28] not-italic italic">performance.</em>
            </h2>
            <p className="max-w-[500px] leading-[1.9] opacity-65 text-[0.95rem] mb-5">
              Editorial modeling is less about filling the frame and more about controlling it. Every movement, expression and pause has a purpose.
            </p>
            <p className="max-w-[500px] leading-[1.9] opacity-65 text-[0.95rem] mb-5">
              My approach is built around stillness, structure and visual awareness — allowing the photographer, styling and lighting to work together.
            </p>
            <div className="font-['Playfair_Display'] italic text-5xl mt-9">M.N</div>
          </div>
        </div>
      </section>

      {/* =====================================================
          STATS (VITALS)
      ===================================================== */}
      <section id="stats" className="relative py-24 md:py-36 px-[7vw] lg:px-[12vw] bg-black/[0.025] dark:bg-white/[0.025]">
        <div className="absolute top-12 left-[7vw] lg:left-[12vw] text-[0.62rem] tracking-[2px] opacity-45">02 / VITALS</div>

        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-16 md:mb-20 reveal opacity-0 translate-y-11">
          <div>
            <div className="text-[0.68rem] tracking-[3px] uppercase opacity-60 mb-2">SPECIFICATIONS</div>
            <h2 className="font-['Playfair_Display'] font-normal text-[3.3rem] md:text-[clamp(3.3rem,6vw,6rem)] leading-[0.88] tracking-[-2px]">
              Vital<br />Statistics
            </h2>
          </div>
          <p className="font-['Cormorant_Garamond'] text-xl md:text-2xl italic opacity-85 leading-relaxed">
            Measurements & details<br />
          </p>
        </div>

        <div className="border-t border-black/15 dark:border-white/15 reveal opacity-0 translate-y-11">
          {[
            ["01", "Height", "1.86 m"],
            ["02", "Weight", "78 kg"],
            ["03", "Chest / Waist", "98 / 80 cm"],
            ["04", "Shoe Size", "EU 43"],
            ["05", "Hair", "Black"],
            ["06", "Eyes", "Dark Brown"],
            ["07", "Based In", "Cairo, Egypt"],
            ["08", "Languages", "Arabic · English"],
          ].map(([num, label, value]) => (
            <div
              key={num}
              className="grid grid-cols-[1fr_auto] md:grid-cols-[80px_1fr_1fr] items-center min-h-[75px] md:min-h-[85px] border-b border-black/15 dark:border-white/15 transition-all duration-300 hover:pl-5 hover:text-[#7c2c28]"
            >
              <span className="hidden md:block text-[0.65rem] opacity-40">{num}</span>
              <span className="uppercase text-[0.7rem] md:text-[0.75rem] tracking-[2px]">{label}</span>
              <span className="text-right font-['Playfair_Display'] text-base md:text-2xl">{value}</span>
            </div>
          ))}
        </div>
      </section>

      {/* =====================================================
          EDITORIALS (3-Block Swappable View)
      ===================================================== */}
      <section id="portfolio" className="relative py-24 md:py-36 px-[7vw] lg:px-[8vw]">
        <div className="absolute top-12 left-[7vw] lg:left-[8vw] text-[0.62rem] tracking-[2px] opacity-45">03 / EDITORIALS</div>

        <div className="flex justify-between items-end mb-12 reveal opacity-0 translate-y-11">
          <div>
            <div className="text-[0.68rem] tracking-[3px] uppercase opacity-60 mb-2">SELECTED WORK</div>
            <h2 className="font-['Playfair_Display'] font-normal text-[3.3rem] md:text-[clamp(3.3rem,6vw,6rem)] leading-[0.88] tracking-[-2px]">
              Editorial<br /><em className="text-[#7c2c28] not-italic italic">Stories.</em>
            </h2>
          </div>
          <div className="flex items-center gap-4 font-['Playfair_Display'] text-lg">
            <span>{String(activeEditorial + 1).padStart(2, "0")}</span>
            <div className="w-12 h-[1px] bg-current opacity-30" />
            <span>{String(editorials.length).padStart(2, "0")}</span>
          </div>
        </div>

        <div
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          className="relative h-[470px] sm:h-[570px] lg:h-[650px] grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-6 select-none reveal opacity-0 translate-y-11"
        >
          {/* Main Large Block (Active Collection) */}
          <div className="relative overflow-hidden cursor-pointer border border-black/10 dark:border-white/10 group">
            <button
              onClick={prevImage}
              aria-label="Previous photo"
              className="absolute z-20 left-5 top-1/2 -translate-y-1/2 w-11 h-11 md:w-12 md:h-12 rounded-full bg-white/90 text-black flex items-center justify-center text-lg shadow-lg hover:bg-[#7c2c28] hover:text-white transition-colors cursor-pointer"
            >
              ←
            </button>

            <img
              key={`${activeEditorial}-${activeImageIndex}`}
              src={activeImgSrc}
              alt={currentEditorial.title}
              onClick={() => setLightboxImage(activeImgSrc)}
              className="w-full h-full object-cover animate-[fadeIn_0.5s_ease]"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />

            <div className="absolute left-6 md:left-10 bottom-6 md:bottom-10 text-white drop-shadow-[0_3px_20px_black] pointer-events-none">
              <span className="text-[0.6rem] tracking-[3px] uppercase">
                ACTIVE COLLECTION · PHOTO {activeImageIndex + 1} / {currentEditorial.images.length}
              </span>
              <h3 className="font-['Playfair_Display'] text-3xl md:text-5xl font-normal mt-2">
                {currentEditorial.title}
              </h3>
            </div>

            <button
              onClick={nextImage}
              aria-label="Next photo"
              className="absolute z-20 right-5 top-1/2 -translate-y-1/2 w-11 h-11 md:w-12 md:h-12 rounded-full bg-white/90 text-black flex items-center justify-center text-lg shadow-lg hover:bg-[#7c2c28] hover:text-white transition-colors cursor-pointer"
            >
              →
            </button>
          </div>

          {/* Desktop Right Side (2 Other Collections to Swap) */}
          <div className="hidden lg:flex flex-col gap-5 h-full">
            {[sideIndex1, sideIndex2].map((idx) => {
              const col = editorials[idx];
              return (
                <div
                  key={col.title}
                  onClick={() => {
                    setActiveImageIndex(0);
                    setActiveEditorial(idx);
                  }}
                  className="relative h-[calc(50%-10px)] overflow-hidden cursor-pointer border border-black/10 dark:border-white/10 hover:border-[#7c2c28] transition-all duration-300 group"
                >
                  <img
                    src={col.images[0]}
                    alt={col.title}
                    className="w-full h-full object-cover brightness-[0.72] group-hover:brightness-95 group-hover:scale-105 transition-all duration-500"
                  />
                  <div className="absolute inset-0 p-5 flex flex-col justify-end bg-gradient-to-t from-black/85 via-black/20 to-transparent text-white">
                    <span className="text-[0.55rem] tracking-[2px] opacity-80 uppercase mb-1">COLLECTION</span>
                    <h4 className="font-['Playfair_Display'] text-xl font-normal">{col.title}</h4>
                    <span className="absolute top-4 right-4 text-[0.55rem] tracking-[1.5px] px-2 py-1 border border-white/40 bg-black/40 backdrop-blur-sm group-hover:bg-[#7c2c28] group-hover:border-[#7c2c28] transition-colors">
                      SWAP ↗
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Controls */}
        <div className="flex justify-between items-center mt-8">
          <button
            onClick={prevEditorial}
            className="text-[0.68rem] tracking-[2px] opacity-70 hover:opacity-100 hover:text-[#7c2c28] transition-colors cursor-pointer"
          >
            PREVIOUS COLLECTION
          </button>

          <div className="flex gap-2">
            {editorials.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setActiveImageIndex(0);
                  setActiveEditorial(index);
                }}
                className={`w-7 h-[2px] transition-all ${
                  index === activeEditorial ? "bg-[#7c2c28] opacity-100" : "bg-current opacity-20"
                }`}
                aria-label={`Go to collection ${index + 1}`}
              />
            ))}
          </div>

          <button
            onClick={nextEditorial}
            className="text-[0.68rem] tracking-[2px] opacity-70 hover:opacity-100 hover:text-[#7c2c28] transition-colors cursor-pointer"
          >
            NEXT COLLECTION
          </button>
        </div>
      </section>

      {/* =====================================================
          CAMPAIGNS
      ===================================================== */}
      <section id="campaigns" className="relative max-w-[1500px] mx-auto py-24 md:py-36 px-[6vw]">
        <div className="absolute top-12 left-[6vw] text-[0.62rem] tracking-[2px] opacity-45">04 / CAMPAIGNS</div>

        <div className="mb-16 reveal opacity-0 translate-y-11">
          <div className="text-[0.68rem] tracking-[3px] uppercase opacity-60 mb-2">FEATURED SERIES</div>
          <h2 className="font-['Playfair_Display'] font-normal text-[3.3rem] md:text-[clamp(3.3rem,6vw,6rem)] leading-[0.88] tracking-[-2px]">
            Campaign<br /><em className="text-[#7c2c28] not-italic italic">Direction.</em>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[2.3fr_1fr] gap-12 lg:gap-16 items-center reveal opacity-0 translate-y-11">
          <div className="flex flex-col lg:flex-row gap-3 h-[550px] lg:h-[570px]">
            {campaigns.map((campaign, index) => {
              const isActive = activeCampaign === index;
              return (
                <div
                  key={campaign.title}
                  onMouseEnter={() => setActiveCampaign(index)}
                  onClick={() => setActiveCampaign(index)}
                  className={`relative overflow-hidden cursor-pointer border border-black/10 dark:border-white/10 transition-all duration-700 ${
                    isActive ? "flex-[4] lg:flex-[3.5]" : "flex-1 min-h-[70px] lg:min-h-0"
                  }`}
                >
                  <img
                    src={campaign.image}
                    alt={campaign.title}
                    className={`w-full h-full object-cover transition-all duration-700 ${
                      isActive ? "brightness-90 scale-105" : "brightness-[0.55]"
                    }`}
                  />
                  <div className="absolute top-5 left-5 text-white text-[0.6rem] tracking-[2px]">0{index + 1}</div>
                  <span className="absolute top-4 right-5 text-white text-2xl font-light">+</span>
                  <h3
                    className={`absolute bottom-6 left-6 text-white font-['Playfair_Display'] text-xl md:text-3xl font-normal whitespace-nowrap transition-all duration-500 ${
                      isActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                    }`}
                  >
                    {campaign.title}
                  </h3>
                </div>
              );
            })}
          </div>

          <div>
            <div className="text-[0.68rem] tracking-[3px] uppercase opacity-60 mb-4">
              {String(activeCampaign + 1).padStart(2, "0")} / SERIES
            </div>
            <blockquote className="font-['Playfair_Display'] text-3xl md:text-4xl leading-snug my-6">
              “Fashion is not simply clothing. It is <em className="text-[#7c2c28] not-italic italic">visual language.</em>”
            </blockquote>
            <p className="font-['Cormorant_Garamond'] text-xl md:text-2xl italic opacity-85 leading-relaxed">
              A selection of visual concepts built around silhouette, composition, styling and controlled expression.
            </p>
          </div>
        </div>
      </section>

      {/* =====================================================
          SELECTED WORKS (Staggered Grid on Mobile)
      ===================================================== */}
      <section id="works" className="relative max-w-[1500px] mx-auto py-24 md:py-36 px-[6vw]">
        <div className="absolute top-12 left-[6vw] text-[0.62rem] tracking-[2px] opacity-45">05 / SELECTED WORKS</div>

        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-16 reveal opacity-0 translate-y-11">
          <div>
            <div className="text-[0.68rem] tracking-[3px] uppercase opacity-60 mb-2">PORTFOLIO</div>
            <h2 className="font-['Playfair_Display'] font-normal text-[3.3rem] md:text-[clamp(3.3rem,6vw,6rem)] leading-[0.88] tracking-[-2px]">
              Selected<br /><em className="text-[#7c2c28] not-italic italic">Works.</em>
            </h2>
          </div>
          <p className="font-['Cormorant_Garamond'] text-xl md:text-2xl italic opacity-85 leading-relaxed">
            A visual collection of<br />recent editorial work.
          </p>
        </div>

        {/* Staggered Grid: Even children shifted down on mobile */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4.5 items-start [&>*:nth-child(even)]:translate-y-9 [&>*:nth-child(even)]:mb-9 lg:[&>*:nth-child(even)]:translate-y-0 lg:[&>*:nth-child(even)]:mb-0 reveal opacity-0 translate-y-11">
          {selectedWorks.map((item, index) => {
            if (item.type === "quote-dream") {
              return (
                <div
                  key="quote-dream"
                  className="bg-[#e4dfd6] !text-black p-6 md:p-10 flex flex-col justify-center text-center min-h-[220px] md:min-h-[340px]"
                >
                  <span className="font-['Playfair_Display'] text-6xl leading-[0.5] text-[#7c2c28]">“</span>
                  <p className="font-['Playfair_Display'] text-xl md:text-3xl italic my-6 leading-tight !text-black">
                    {item.quote}
                  </p>
                  <small className="text-[0.55rem] tracking-[2px] opacity-75 !text-neutral-800 uppercase">{item.author}</small>
                </div>
              );
            }

            if (item.type === "quote-style") {
              return (
                <div
                  key="quote-style"
                  className="bg-[#151515] text-white p-6 md:p-10 flex flex-col justify-center text-center min-h-[220px] md:min-h-[340px]"
                >
                  <span className="font-['Playfair_Display'] text-6xl leading-[0.5] text-[#7c2c28]">“</span>
                  <p className="font-['Playfair_Display'] text-xl md:text-3xl italic my-6 leading-tight">
                    {item.quote}
                  </p>
                  <small className="text-[0.55rem] tracking-[2px] opacity-50 uppercase">{item.author}</small>
                </div>
              );
            }

            return (
              <div
                key={item.src + index}
                onClick={() => setLightboxImage(item.src)}
                className="relative overflow-hidden cursor-pointer group"
              >
                <img
                  src={item.src}
                  alt={item.alt}
                  className="w-full object-cover transition-all duration-700 group-hover:scale-105 group-hover:brightness-75"
                />
                <span className="absolute bottom-5 left-5 text-white text-[0.6rem] tracking-[2px] opacity-0 group-hover:opacity-100 transition-opacity">
                  VIEW +
                </span>
              </div>
            );
          })}
        </div>
      </section>

      {/* =====================================================
          PHOTOGRAPHY (LENS - Staggered on Mobile)
      ===================================================== */}
      <section id="photography" className="relative py-24 md:py-36 px-[7vw] lg:px-[8vw]">
        <div className="absolute top-12 left-[7vw] lg:left-[8vw] text-[0.62rem] tracking-[2px] opacity-45">06 / LENS</div>

        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-16 reveal opacity-0 translate-y-11">
          <div>
            <div className="text-[0.68rem] tracking-[3px] uppercase opacity-60 mb-2">PERSONAL PROJECT</div>
            <h2 className="font-['Playfair_Display'] font-normal text-[3.3rem] md:text-[clamp(3.3rem,6vw,6rem)] leading-[0.88] tracking-[-2px]">
              Behind<br /><em className="text-[#7c2c28] not-italic italic">the Lens.</em>
            </h2>
          </div>
          <p className="font-['Cormorant_Garamond'] text-xl md:text-2xl italic opacity-85 leading-relaxed">
            Landscape photography<br />captured by me.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-[1fr_1.3fr_1fr] gap-3 md:gap-4.5 items-start [&>*:nth-child(even)]:translate-y-9 [&>*:nth-child(even)]:mb-9 lg:[&>*:nth-child(even)]:translate-y-0 lg:[&>*:nth-child(even)]:mb-0 reveal opacity-0 translate-y-11">
          {photography.map((image, index) => (
            <div
              key={image}
              onClick={() => setLightboxImage(image)}
              className={`relative overflow-hidden cursor-pointer group ${
                index === 1 ? "lg:mt-24" : ""
              }`}
            >
              <img
                src={image}
                alt={`Landscape ${index + 1}`}
                className="w-full h-[240px] md:h-[360px] lg:h-[500px] object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute top-5 left-5 text-white text-[0.6rem] tracking-[2px]">0{index + 1}</div>
              <div className="absolute bottom-5 right-5 text-white text-[0.6rem] tracking-[2px] opacity-0 group-hover:opacity-100 transition-opacity">
                VIEW IMAGE
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* =====================================================
          SHOWREEL
      ===================================================== */}
      <section id="reel" className="relative py-24 md:py-36 px-[7vw] lg:px-[8vw]">
        <div className="absolute top-12 left-[7vw] lg:left-[8vw] text-[0.62rem] tracking-[2px] opacity-45">07 / SHOWREEL</div>

        <div className="flex justify-between items-end mb-14 reveal opacity-0 translate-y-11">
          <div>
            <div className="text-[0.68rem] tracking-[3px] uppercase opacity-60 mb-2">MOTION</div>
            <h2 className="font-['Playfair_Display'] font-normal text-[3.3rem] md:text-[clamp(3.3rem,6vw,6rem)] leading-[0.88] tracking-[-2px]">
              Show<br /><em className="text-[#7c2c28] not-italic italic">Reel.</em>
            </h2>
          </div>
          <span className="font-['Playfair_Display'] text-3xl">2026</span>
        </div>

        <div className="relative overflow-hidden bg-black reveal opacity-0 translate-y-11">
          <video
            src={`${publicUrl}/video.mp4`}
            autoPlay
            loop
            muted
            playsInline
            className="w-full block max-h-[75vh] object-cover"
          />
          <div className="absolute inset-0 pointer-events-none p-4 md:p-6 flex justify-between items-end text-white text-[0.55rem] md:text-[0.6rem] tracking-[2px] drop-shadow-[0_2px_10px_black]">
            <span>MOHAMMED NASR</span>
            <span>EDITORIAL / 2026</span>
          </div>
        </div>
      </section>

      {/* =====================================================
          CONTACT
      ===================================================== */}
      <section id="contact" className="bg-[#111] text-white py-24 px-[7vw] lg:px-[8vw]">
        <div className="max-w-[1400px] mx-auto">
          <div className="flex justify-between text-[0.6rem] tracking-[2px] opacity-50 reveal opacity-0 translate-y-11">
            <span>08 / CONTACT</span>
            <span>CAIRO · EGYPT</span>
          </div>

          <div className="py-24 md:py-32 reveal opacity-0 translate-y-11">
            <div className="text-[0.68rem] tracking-[3px] uppercase opacity-60 mb-4">AVAILABLE FOR</div>
            <h2 className="font-['Playfair_Display'] font-normal text-[3.5rem] md:text-[clamp(4rem,9vw,9rem)] leading-[0.8] tracking-[-3px] md:tracking-[-4px] my-6">
              Let's make<br />something<br /><em className="text-[#d99b8c] not-italic italic">visual.</em>
            </h2>
            <p className="font-['Cormorant_Garamond'] text-xl md:text-2xl italic opacity-85 leading-relaxed max-w-[420px]">
              For bookings, casting inquiries, collaborations and editorial work.
            </p>
          </div>

          <div className="border-t border-white/15 reveal opacity-0 translate-y-11">
            <a
              href="https://www.instagram.com/mo7ammed__medoo"
              target="_blank"
              rel="noopener noreferrer"
              className="flex justify-between items-center py-7 border-b border-white/15 text-xs md:text-sm tracking-[1px] hover:text-[#d99b8c] hover:px-4 transition-all"
            >
              <span>Instagram</span>
              <span>@mo7ammed__medoo ↗</span>
            </a>

            <a
              href="mailto:mohammednasrsmail@gmail.com"
              className="flex justify-between items-center py-7 border-b border-white/15 text-xs md:text-sm tracking-[1px] hover:text-[#d99b8c] hover:px-4 transition-all"
            >
              <span>Email</span>
              <span>mohammednasrsmail@gmail.com ↗</span>
            </a>

            <a
              href="https://wa.me/201156108363"
              target="_blank"
              rel="noopener noreferrer"
              className="flex justify-between items-center py-7 border-b border-white/15 text-xs md:text-sm tracking-[1px] hover:text-[#d99b8c] hover:px-4 transition-all"
            >
              <span>WhatsApp</span>
              <span>+20 115 610 8363 ↗</span>
            </a>
          </div>
        </div>
      </section>

      {/* =====================================================
          FOOTER
      ===================================================== */}
      <footer className="bg-[#080808] text-white text-center py-16 px-5">
        <div className="font-['Playfair_Display'] text-3xl tracking-[3px]">M.NASR</div>
        <p className="my-3 opacity-40 text-[0.7rem] tracking-[2px] uppercase">Editorial & Runway Model</p>
        <span className="text-[0.6rem] opacity-30">© {new Date().getFullYear()} Mohammed Nasr</span>
      </footer>

      {/* =====================================================
          LIGHTBOX
      ===================================================== */}
      {lightboxImage && (
        <div
          onClick={() => setLightboxImage(null)}
          className="fixed inset-0 z-[99999] bg-black/95 flex items-center justify-center p-6 md:p-12 animate-[fadeIn_0.3s_ease]"
        >
          <button
            onClick={() => setLightboxImage(null)}
            className="absolute top-6 right-8 text-white text-5xl font-light cursor-pointer"
          >
            ×
          </button>
          <img
            src={lightboxImage}
            alt="Expanded view"
            onClick={(e) => e.stopPropagation()}
            className="max-w-[90vw] max-h-[85vh] md:max-h-[90vh] object-contain"
          />
        </div>
      )}
    </div>
  );
}