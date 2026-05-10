import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import logoImg from "./{components,hooks,assets}/logobg-copy.png";
import logoImgfooter from "./{components,hooks,assets}/logobg.png";
import profileImg from "./{components,hooks,assets}/profile.png";
import certUnivImg from "./{components,hooks,assets}/university.jpeg";
import certFrontendImg from "./{components,hooks,assets}/imgfrontend.png";
import certBackendImg from "./{components,hooks,assets}/imgbackend.png";
import certTrainingImg from "./{components,hooks,assets}/imgtraining.png";
import fullStackCertImg1 from "./{components,hooks,assets}/imgfullstack.png";
import dandashiCertImg from "./{components,hooks,assets}/dandashy.jpg.jpeg";
import plantProject from "./{components,hooks,assets}/plant.png";
import unifiProject from "./{components,hooks,assets}/unifi.png";
import aiSolutionProject from "./{components,hooks,assets}/AiSolution.png";
import laravelProject from "./{components,hooks,assets}/laravel.png";
import motionAuctionsProject from "./{components,hooks,assets}/Motion Auctions.png";
import AlAwaielProject from "./{components,hooks,assets}/Hydraulic.png";
import figmaProject from "./{components,hooks,assets}/figma.png";
import wordpressProject from "./{components,hooks,assets}/wordpress.png";
import mediaclProject from "./{components,hooks,assets}/medical.png";
import { portfolioData, translations } from "./data";
import {
  Moon,
  Sun,
  Globe,
  Menu,
  X,
  Github,
  Linkedin,
  Instagram,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Download,
  ExternalLink,
  ChevronDown,
  Code2,
  Terminal,
  Layers,
  Zap,
  Star,
  ArrowRight,
  Send,
  Coffee,
  Heart,
  GraduationCap,
  Award,
  Eye, // الأيقونات الجديدة لقسم الشهادات
} from "lucide-react";

// ─── Utility ──────────────────────────────────────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

function useTheme() {
  const [dark, setDark] = useState(() => {
    const saved = localStorage.getItem("theme");
    return saved ? saved === "dark" : true;
  });
  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
    localStorage.setItem("theme", dark ? "dark" : "light");
  }, [dark]);
  return [dark, setDark];
}

function useLang() {
  const [lang, setLang] = useState(() => localStorage.getItem("lang") || "en");
  useEffect(() => {
    document.body.classList.toggle("rtl", lang === "ar");
    document.documentElement.setAttribute("dir", lang === "ar" ? "rtl" : "ltr");
    document.documentElement.setAttribute("lang", lang);
    localStorage.setItem("lang", lang);
  }, [lang]);
  return [lang, setLang];
}

// ─── Navbar ───────────────────────────────────────────────────────────────────
function Navbar({ dark, setDark, lang, setLang, t }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [active, setActive] = useState("home");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navItems = [
    "home",
    "about",
    "experience",
    "projects",
    "skills",
    "contact",
  ];

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 64;
      window.scrollTo({ top, behavior: "smooth" });
    }
    setMobileOpen(false);
    setActive(id);
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "dark:bg-slate-900/90 bg-white/90 backdrop-blur-xl shadow-lg dark:shadow-slate-900 rounded-b-2xl rounded-t-md"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <motion.div
            className="flex items-center cursor-pointer"
            onClick={() => scrollTo("home")}
            whileHover={{ scale: 1.05 }}
          >
            <img
              src={logoImg}
              alt="Logo"
              className="h-14 w-auto mt-1 object-contain" // تحكم في الطول هنا (h-10 تساوي 40px)
            />
          </motion.div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <button
                key={item}
                onClick={() => scrollTo(item)}
                className={`nav-link text-sm font-medium capitalize transition-colors ${
                  active === item
                    ? "gradient-text"
                    : "dark:text-slate-300 text-slate-600 dark:hover:text-white hover:text-slate-900"
                }`}
              >
                {t.nav[item]}
              </button>
            ))}
          </div>

          {/* Controls */}
          <div className="flex items-center gap-3">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setLang((l) => (l === "en" ? "ar" : "en"))}
              className="w-9 h-9 rounded-full glass dark:bg-slate-800/50 bg-slate-100 flex items-center justify-center text-sm font-bold dark:text-teal-400 text-teal-600"
            >
              {lang === "en" ? "ع" : "EN"}
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setDark((d) => !d)}
              className="w-9 h-9 rounded-full glass dark:bg-slate-800/50 bg-slate-100 flex items-center justify-center dark:text-yellow-400 text-slate-700"
            >
              {dark ? <Sun size={16} /> : <Moon size={16} />}
            </motion.button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileOpen((o) => !o)}
              className="md:hidden w-9 h-9 rounded-full dark:bg-slate-800/50 bg-slate-100 flex items-center justify-center dark:text-white text-slate-900"
            >
              {mobileOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden dark:bg-slate-900/95 bg-white/95 backdrop-blur-xl border-t dark:border-slate-800 border-slate-200"
          >
            <div className="px-4 py-4 flex flex-col gap-3">
              {navItems.map((item) => (
                <button
                  key={item}
                  onClick={() => scrollTo(item)}
                  className="text-left py-2 px-4 rounded-lg dark:text-slate-300 text-slate-700 dark:hover:bg-slate-800 hover:bg-slate-100 transition-colors capitalize font-medium"
                >
                  {t.nav[item]}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────
function ProfileFrame({ lang, t }) {
  return (
    <motion.div
      variants={fadeUp}
      className="relative flex items-center justify-center"
    >
      {/* ── الحلقة الخارجية الدوارة ── */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
        className="absolute w-[340px] h-[340px] sm:w-[400px] sm:h-[400px] rounded-full"
        style={{
          background:
            "conic-gradient(from 0deg, #14b8a6, #7C3AED, #14b8a6, transparent, transparent)",
          padding: "2px",
        }}
      >
        <div className="w-full h-full rounded-full dark:bg-slate-950 bg-slate-50" />
      </motion.div>

      {/* ── الحلقة الداخلية الدوارة بعكس الاتجاه ── */}
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
        className="absolute w-[300px] h-[300px] sm:w-[360px] sm:h-[360px] rounded-full border border-dashed dark:border-teal-500/20 border-teal-500/30"
      />

      {/* ── النقاط المتحركة على الحلقة ── */}
      {[0, 60, 120, 180, 240, 300].map((deg, i) => (
        <motion.div
          key={i}
          animate={{ rotate: 360 }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "linear",
            delay: 0,
          }}
          className="absolute w-[340px] h-[340px] sm:w-[400px] sm:h-[400px]"
          style={{ transformOrigin: "center" }}
        >
          <div
            className="absolute w-3 h-3 rounded-full"
            style={{
              background:
                i % 2 === 0
                  ? "linear-gradient(135deg, #14b8a6, #2dd4bf)"
                  : "linear-gradient(135deg, #7C3AED, #a78bfa)",
              boxShadow:
                i % 2 === 0
                  ? "0 0 10px rgba(20,184,166,0.8)"
                  : "0 0 10px rgba(124,58,237,0.8)",
              top: "50%",
              left: "50%",
              transform: `rotate(${deg}deg) translateX(168px) translateY(-50%)`,
            }}
          />
        </motion.div>
      ))}

      {/* ── الإطار الرئيسي للصورة ── */}
      <motion.div
        whileHover={{ scale: 1.03 }}
        transition={{ duration: 0.3 }}
        className="relative w-[260px] h-[300px] sm:w-[300px] sm:h-[340px] rounded-2xl overflow-hidden z-10"
        style={{
          background: "linear-gradient(135deg, #14b8a6 0%, #7C3AED 100%)",
          padding: "3px",
          boxShadow:
            "0 0 40px rgba(20,184,166,0.25), 0 0 80px rgba(124,58,237,0.15)",
        }}
      >
        {/* الحاوية الداخلية */}
        <div className="w-full h-full rounded-2xl overflow-hidden dark:bg-slate-900 bg-slate-100 relative">
          {/* الصورة الشخصية */}
          <motion.img
            src={profileImg}
            alt="Rama Alazhari"
            className="w-full h-auto object-cover"
            initial={{ y: 0 }}
            whileHover={{ y: "-20%" }} // هذا يجعل الصورة تتحرك للأعلى عند مرور الماوس
            transition={{ duration: 3, ease: "linear" }}
            onError={(e) => {
              // Fallback: placeholder gradient إذا لم تكن الصورة موجودة
              e.target.style.display = "none";
              e.target.nextSibling.style.display = "flex";
            }}
          />

          {/* Gradient overlay فوق الصورة (من الأسفل) */}
          <div
            className="absolute inset-0 rounded-2xl"
            style={{
              background:
                "linear-gradient(to top, rgba(13,17,30,0.5) 0%, transparent 60%)",
            }}
          />
        </div>
      </motion.div>

      {/* ── بادج "Available for work" ── */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20"
      >
        <div
          className="flex items-center gap-2 px-4 py-2 rounded-full text-white text-[10px] font-semibold shadow-lg"
          style={{
            background: "linear-gradient(135deg, #14b8a6, #0d9488)",
            boxShadow: "0 4px 20px rgba(20,184,166,0.4)",
            fontFamily: lang === "ar" ? "Cairo" : undefined,
          }}
        >
          <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
          {t.hero.available}
        </div>
      </motion.div>

      {/* ── زخارف الزوايا ── */}
      {/* نقطة كبيرة يسار */}
      <motion.div
        animate={{ scale: [1, 1.3, 1], opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -left-4 top-1/3 w-5 h-5 rounded-full z-20"
        style={{
          background: "linear-gradient(135deg, #14b8a6, #2dd4bf)",
          boxShadow: "0 0 15px rgba(20,184,166,0.7)",
        }}
      />
      {/* نقطة صغيرة يسار أسفل */}
      <motion.div
        animate={{ scale: [1, 1.4, 1], opacity: [0.4, 0.9, 0.4] }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
        className="absolute -left-2 bottom-1/4 w-3 h-3 rounded-full z-20"
        style={{
          background: "linear-gradient(135deg, #7C3AED, #a78bfa)",
          boxShadow: "0 0 12px rgba(124,58,237,0.7)",
        }}
      />
      {/* نقطة كبيرة يمين */}
      <motion.div
        animate={{ scale: [1, 1.3, 1], opacity: [0.5, 1, 0.5] }}
        transition={{
          duration: 3.5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.5,
        }}
        className="absolute -right-4 top-1/4 w-4 h-4 rounded-full z-20"
        style={{
          background: "linear-gradient(135deg, #7C3AED, #a78bfa)",
          boxShadow: "0 0 15px rgba(124,58,237,0.7)",
        }}
      />
    </motion.div>
  );
}

function Hero({ lang, t }) {
  const d = portfolioData;

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 dark:bg-slate-950 bg-slate-50 mesh-gradient" />

      {/* Animated background circles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ scale: [1, 1.2, 1], rotate: [0, 360] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/4 right-1/4 w-64 h-64 rounded-full border dark:border-teal-500/10 border-teal-500/20"
        />
        <motion.div
          animate={{ scale: [1.2, 1, 1.2], rotate: [360, 0] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-1/4 left-1/4 w-96 h-96 rounded-full border dark:border-violet-500/10 border-violet-500/15"
        />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-teal-500/5 rounded-full blur-3xl" />
        <div className="absolute top-1/3 right-1/3 w-[400px] h-[400px] bg-violet-500/5 rounded-full blur-3xl" />
      </div>

      {/* ── المحتوى الرئيسي: شبكة عمودين ── */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 w-full">
        <div className="grid lg:grid-cols-2 gap-16 items-center min-h-screen py-24">
          {/* ── العمود الأيسر: الصورة (على موبايل تأتي ثانية) ── */}
          <motion.div
            variants={stagger}
            initial="hidden"
            animate="show"
            className="flex justify-center lg:justify-start order-2 lg:order-1"
          >
            <ProfileFrame lang={lang} t={t} />
          </motion.div>

          {/* ── العمود الأيمن: النص ── */}
          <motion.div
            variants={stagger}
            initial="hidden"
            animate="show"
            className="flex flex-col gap-6 order-1 lg:order-2 text-center lg:text-start items-center lg:items-start"
          >
            {/* Badge */}
            <motion.div
              variants={fadeUp}
              className="flex justify-center lg:justify-start"
            >
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full dark:bg-teal-500/10 bg-teal-50 dark:border-teal-500/20 border-teal-200 border text-teal-600 dark:text-teal-400 text-sm font-medium">
                <span className="w-2 h-2 rounded-full bg-teal-500 animate-pulse" />
                {lang === "ar"
                  ? "متاحة للانضمام الفوري في الإمارات العربية المتحدة"
                  : "Available for immediate joining in the UAE"}
              </span>
            </motion.div>

            {/* Greeting + Name */}
            <motion.div variants={fadeUp} className="space-y-2">
              <p
                className="dark:text-slate-400 text-slate-500 text-lg font-medium"
                style={{ fontFamily: lang === "ar" ? "Cairo" : undefined }}
              >
                {t.hero.greeting}
              </p>
              <h1
                className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight leading-tight"
                style={{
                  fontFamily: lang === "ar" ? "Cairo" : "Clash Display",
                }}
              >
                <span className="dark:text-white text-slate-900">
                  {d.name[lang].split(" ")[0]}
                </span>{" "}
                <span className="gradient-text">
                  {d.name[lang].split(" ").slice(1).join(" ")}
                </span>
              </h1>
            </motion.div>

            {/* Title */}
            <motion.div variants={fadeUp}>
              <h2
                className="text-xl sm:text-2xl dark:text-slate-300 text-slate-600 font-medium"
                style={{ fontFamily: lang === "ar" ? "Cairo" : undefined }}
              >
                {d.title[lang]}
              </h2>
            </motion.div>

            {/* About short */}
            <motion.p
              variants={fadeUp}
              className="dark:text-slate-400 text-slate-500 text-base leading-relaxed max-w-lg mx-auto lg:mx-0"
              style={{ fontFamily: lang === "ar" ? "Cairo" : undefined }}
            >
              {d.subtitle[lang]}
            </motion.p>

            {/* Social Links */}
            <motion.div
              variants={fadeUp}
              className="flex items-center gap-4 justify-center lg:justify-start"
            >
              {[
                { icon: <Github size={20} />, href: d.github },
                { icon: <Linkedin size={20} />, href: d.linkedin },
                { icon: <Instagram size={20} />, href: d.instagram },
                { icon: <Mail size={20} />, href: `mailto:${d.email}` },
              ].map((s, i) => (
                <motion.a
                  key={i}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  whileHover={{ scale: 1.2, y: -3 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-10 h-10 rounded-full glass dark:bg-slate-800/50 bg-white border dark:border-slate-700 border-slate-200 flex items-center justify-center dark:text-slate-400 text-slate-500 dark:hover:text-teal-400 hover:text-teal-500 dark:hover:border-teal-500/50 hover:border-teal-400 transition-all shadow-sm"
                >
                  {s.icon}
                </motion.a>
              ))}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              variants={fadeUp}
              className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() =>
                  document
                    .getElementById("contact")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                className="btn-primary px-8 py-3.5 rounded-full text-white font-semibold flex items-center gap-2 text-sm"
                style={{ fontFamily: lang === "ar" ? "Cairo" : undefined }}
              >
                <Mail size={16} />
                {lang === "ar" ? "لنعمل معاً" : "Let's Work Together"}
                <ArrowRight size={16} />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() =>
                  document
                    .getElementById("projects")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                className="px-8 py-3.5 rounded-full dark:border-slate-700 border-slate-300 border dark:text-slate-300 text-slate-700 dark:hover:border-teal-500 hover:border-teal-500 dark:hover:text-teal-400 hover:text-teal-600 transition-all font-semibold flex items-center gap-2 text-sm"
                style={{ fontFamily: lang === "ar" ? "Cairo" : undefined }}
              >
                <Download size={16} />
                {t.hero.cta2}
              </motion.button>
            </motion.div>

            {/* Stats Row (مثل Jo Sam: 40+ Projects, 1+ Years...) */}
            <motion.div
              variants={fadeUp}
              className="grid grid-cols-3 gap-6 pt-4 border-t dark:border-slate-800 border-slate-200 mt-2"
            >
              {[
                {
                  num: "50+",
                  label: lang === "ar" ? "مشاريع مكتملة" : "Projects Completed",
                },
                {
                  num: "3+",
                  label: lang === "ar" ? "سنوات خبرة" : "Years Experience",
                },
                {
                  num: "100%",
                  label: lang === "ar" ? "جودة الكود" : "Code Quality",
                },
              ].map((stat, i) => (
                <div key={i} className="text-center lg:text-left">
                  <div
                    className="text-2xl sm:text-3xl font-bold gradient-text"
                    style={{ fontFamily: "Clash Display" }}
                  >
                    {stat.num}
                  </div>
                  <div
                    className="text-xs dark:text-slate-500 text-slate-400 mt-1"
                    style={{ fontFamily: lang === "ar" ? "Cairo" : undefined }}
                  >
                    {stat.label}
                  </div>
                </div>
              ))}
            </motion.div>

            {/* Scroll hint */}
            <motion.div
              variants={fadeUp}
              className="flex items-center gap-2 dark:text-slate-500 text-slate-400 justify-center lg:justify-start"
            >
              <span
                className="text-xs uppercase tracking-widest"
                style={{ fontFamily: lang === "ar" ? "Cairo" : undefined }}
              >
                {t.hero.scroll}
              </span>
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <ChevronDown size={20} />
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ─── Section Wrapper ──────────────────────────────────────────────────────────
function Section({ id, className = "", children }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    // ✅ py-14 on mobile, py-24 on desktop
    <section
      id={id}
      ref={ref}
      className={`py-14 md:py-24 px-4 md:px-6 ${className}`}
    >
      <motion.div
        initial="hidden"
        animate={inView ? "show" : "hidden"}
        variants={stagger}
        className="max-w-6xl mx-auto"
      >
        {children}
      </motion.div>
    </section>
  );
}
// ─── Section Header ───────────────────────────────────────────────────────────
function SectionHeader({ title, subtitle, lang }) {
  return (
    <motion.div variants={fadeUp} className="text-center mb-16">
      <h2
        className="section-title text-4xl sm:text-5xl font-bold dark:text-white text-slate-900 mb-4"
        style={{ fontFamily: lang === "ar" ? "Cairo" : "Clash Display" }}
      >
        {title}
        <span className="gradient-text">.</span>
      </h2>
      <p
        className="dark:text-slate-400 text-slate-500 text-lg"
        style={{ fontFamily: lang === "ar" ? "Cairo" : undefined }}
      >
        {subtitle}
      </p>
      <div
        className="mt-4 w-16 h-1 rounded-full mx-auto"
        style={{ background: "linear-gradient(135deg, #14b8a6, #7C3AED)" }}
      />
    </motion.div>
  );
}

// ─── About ────────────────────────────────────────────────────────────────────
function About({ lang, t }) {
  const d = portfolioData;
  const infoItems = [
    { icon: <Calendar size={16} />, label: t.about.dob, value: d.dob[lang] },
    { icon: <MapPin size={16} />, label: t.about.pob, value: d.pob[lang] },
    {
      icon: <MapPin size={16} />,
      label: t.about.location,
      value: d.location[lang],
    },
    { icon: <Mail size={16} />, label: t.about.email, value: d.email },
  ];

  return (
    <Section id="about" className="dark:bg-slate-900/30">
      <SectionHeader
        title={t.about.title}
        subtitle={t.about.subtitle}
        lang={lang}
      />
      <div className="grid md:grid-cols-2 gap-12 items-center">
        {/* Text */}
        <motion.div variants={fadeUp} className="space-y-6">
          <p
            className="dark:text-slate-300 text-slate-600 text-lg leading-relaxed"
            style={{ fontFamily: lang === "ar" ? "Cairo" : undefined }}
          >
            {d.about[lang]}
          </p>
          <div className="grid grid-cols-1 gap-3">
            {infoItems.map((item, i) => (
              <div
                key={i}
                className="flex items-center gap-3 dark:text-slate-400 text-slate-500 text-sm"
              >
                <span className="text-teal-500">{item.icon}</span>
                <span
                  className="dark:text-slate-500 text-slate-400 min-w-[140px]"
                  style={{ fontFamily: lang === "ar" ? "Cairo" : undefined }}
                >
                  {item.label}:
                </span>
                <span className="dark:text-slate-300 text-slate-700 font-medium">
                  {item.value}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Stats / Tech Stack */}
        <motion.div variants={fadeUp} className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            {[
              {
                num: "3+",
                label: lang === "ar" ? "سنوات خبرة" : "Years Experience",
                icon: <Star size={20} />,
              },
              {
                num: "50+",
                label: lang === "ar" ? "مشاريع مكتملة" : "Projects Done",
                icon: <Layers size={20} />,
              },
              {
                num: "2",
                label: lang === "ar" ? "شركات عملت بها" : "Companies",
                icon: <Code2 size={20} />,
              },
              {
                num: "15+",
                label: lang === "ar" ? "تقنيات" : "Technologies",
                icon: <Zap size={20} />,
              },
            ].map((stat, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.03, y: -4 }}
                className="dark:bg-slate-800/50 bg-white rounded-2xl p-5 border dark:border-slate-700/50 border-slate-200 text-center card-hover shadow-sm"
              >
                <div className="text-teal-500 flex justify-center mb-2">
                  {stat.icon}
                </div>
                <div
                  className="text-3xl font-bold gradient-text"
                  style={{ fontFamily: "Clash Display" }}
                >
                  {stat.num}
                </div>
                <div
                  className="text-xs dark:text-slate-400 text-slate-500 mt-1"
                  style={{ fontFamily: lang === "ar" ? "Cairo" : undefined }}
                >
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Tech pills */}
          <div className="flex flex-wrap gap-2">
            {d.techStack.map((tech, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.05 }}
                whileHover={{ scale: 1.1, y: -2 }}
                className="px-3 py-1.5 rounded-full text-xs font-medium dark:bg-slate-800 bg-slate-100 dark:text-slate-300 text-slate-600 dark:border-slate-700 border-slate-200 border cursor-default"
              >
                {tech.icon} {tech.name}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </Section>
  );
}

// ─── Experience & Education ───────────────────────────────────────────────────────────────
function CertModal({ cert, onClose, lang }) {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-center justify-center p-4"
        style={{ background: "rgba(0,0,0,0.85)" }}
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          className="relative max-w-2xl w-full dark:bg-slate-900 bg-white rounded-3xl overflow-hidden shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between p-5 border-b dark:border-slate-800 border-slate-200">
            <div>
              <h3
                className="font-bold dark:text-white text-slate-900 text-lg"
                style={{
                  fontFamily: lang === "ar" ? "Cairo" : "Clash Display",
                }}
              >
                {cert.title[lang]}
              </h3>
              <p
                className="text-sm dark:text-slate-400 text-slate-500"
                style={{ fontFamily: lang === "ar" ? "Cairo" : undefined }}
              >
                {cert.issuer[lang]} • {cert.date[lang]}
              </p>
              {cert.note && (
                <p
                  className="mt-2 text-xs italic dark:text-teal-400 text-teal-600 font-medium"
                  style={{ fontFamily: lang === "ar" ? "Cairo" : undefined }}
                >
                  {cert.note[lang]}
                </p>
              )}
            </div>
            <button
              onClick={onClose}
              className="w-9 h-9 rounded-full dark:bg-slate-800 bg-slate-100 flex items-center justify-center dark:text-slate-400 text-slate-600 hover:text-red-500 transition-colors"
            >
              <X size={18} />
            </button>
          </div>
          {cert.image ? (
            <img
              src={cert.image}
              alt={cert.title[lang]}
              className="w-full object-contain max-h-[60vh]"
            />
          ) : (
            <div className="flex flex-col items-center justify-center py-16 gap-4">
              <div
                className="w-20 h-20 rounded-2xl flex items-center justify-center"
                style={{
                  background: "linear-gradient(135deg,#14b8a6,#7C3AED)",
                }}
              >
                <Award size={36} className="text-white" />
              </div>
              <p
                className="dark:text-slate-400 text-slate-500 text-sm text-center px-8"
                style={{ fontFamily: lang === "ar" ? "Cairo" : undefined }}
              >
                {lang === "ar"
                  ? "أضيفي صورة الشهادة في data.js"
                  : "Add certificate image path in data.js"}
              </p>
              <code className="text-xs bg-slate-800 text-teal-400 px-3 py-1.5 rounded-lg">
                cert.image: "/src/assets/cert-name.jpg"
              </code>
            </div>
          )}
          <div className="p-5 flex justify-end gap-3">
            {cert.link && (
              <a
                href={cert.link}
                target="_blank"
                rel="noreferrer"
                className="btn-primary px-5 py-2.5 rounded-xl text-white text-sm font-medium flex items-center gap-2"
              >
                <ExternalLink size={14} />
                {lang === "ar" ? "عرض الشهادة" : "View Certificate"}
              </a>
            )}
            <button
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl dark:bg-slate-800 bg-slate-100 dark:text-slate-300 text-slate-600 text-sm font-medium"
              style={{ fontFamily: lang === "ar" ? "Cairo" : undefined }}
            >
              {lang === "ar" ? "إغلاق" : "Close"}
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

function Experience({ lang, t }) {
  const d = portfolioData;
  const [selectedCert, setSelectedCert] = useState(null);

  // Certificates data — add your real image paths & links here
  const certificates = [
    {
      id: "univ",
      icon: <GraduationCap size={18} />,
      color: "amber",
      title: {
        en: "BSc Informatics Engineering",
        ar: "بكالوريوس هندسة المعلوماتية",
      },
      issuer: { en: "Al-Hawash Private University", ar: "جامعة الحواش الخاصة" },
      date: { en: "2025", ar: "2025" },
      image: certUnivImg,
      link: null,
    },
    {
      id: "frontend",
      icon: <Code2 size={18} />,
      color: "teal",
      title: { en: "Frontend Development", ar: "تطوير الواجهة الأمامية" },
      issuer: { en: "Training Certificate", ar: "شهادة تدريب" },
      date: { en: "2024", ar: "2024" },
      image: certFrontendImg, //
      link: null,
    },
    {
      id: "backend",
      icon: <Terminal size={18} />,
      color: "purple",
      title: { en: "Backend Development", ar: "تطوير الواجهة الخلفية" },
      issuer: { en: "Training Certificate", ar: "شهادة تدريب" },
      date: { en: "2023", ar: "2023" },
      image: certBackendImg,
      link: null,
    },
    {
      id: "training",
      icon: <Award size={18} />,
      color: "teal",
      title: { en: "Professional Training", ar: "شهادة تدريب مهني" },
      issuer: { en: "SEF", ar: "SEF" },
      date: { en: "2024", ar: "2024" },
      image: certTrainingImg,
      link: null,
    },
    {
      id: "mern-stack",
      icon: <Code2 size={18} />,
      color: "teal",
      title: {
        en: "Full Stack Web Development (MERN Stack)",
        ar: "دبلوم تطوير الويب المتكامل (MERN Stack)",
      },
      issuer: { en: "SEF Academy", ar: "أكاديمية SEF" },
      date: { en: "2024", ar: "2024" },
      image: fullStackCertImg1,
      link: null,
    },
    {
      id: "dandashi-honor",
      icon: <Star size={18} />, // أيقونة النجمة للتميز
      color: "amber",
      title: {
        en: "Al-Dandashi Educational Grant Honor",
        ar: "تكريم منحة الدندشي التعليمية",
      },
      issuer: {
        en: "Al-Dandashi Educational Foundation",
        ar: "مؤسسة الدندشي التعليمية",
      },
      date: { en: "Aug 2025", ar: "آب 2025" },
      image: dandashiCertImg,
      link: null,
      note: {
        en: "Honored for academic excellence under the slogan 'Science, Ethics, Work'.",
        ar: "تكريم للتميز الأكاديمي تحت شعار 'علم، أخلاق، عمل'.",
      },
    },
  ];

  const colorMap = {
    teal: {
      bg: "bg-teal-500/15",
      text: "text-teal-500",
      border: "border-teal-500/30",
      badge: "bg-teal-500/10 text-teal-500",
    },
    purple: {
      bg: "bg-violet-500/15",
      text: "text-violet-500",
      border: "border-violet-500/30",
      badge: "bg-violet-500/10 text-violet-500",
    },
    amber: {
      bg: "bg-amber-500/15",
      text: "text-amber-500",
      border: "border-amber-500/30",
      badge: "bg-amber-500/10 text-amber-500",
    },
  };

  return (
    <Section id="experience">
      <SectionHeader
        title={t.experience.title}
        subtitle={t.experience.subtitle}
        lang={lang}
      />

      {/* Timeline */}
      <div className="relative mb-16">
        <div className="absolute left-8 top-0 bottom-0 w-px dark:bg-slate-800 bg-slate-200 hidden md:block" />
        <div className="space-y-8">
          {d.experience.map((exp, i) => (
            <motion.div key={i} variants={fadeUp} className="relative md:pl-20">
              <div
                className={`hidden md:flex absolute left-5 top-6 w-6 h-6 rounded-full items-center justify-center ${exp.color === "teal" ? "bg-teal-500/20 border-2 border-teal-500" : "bg-violet-500/20 border-2 border-violet-500"}`}
              >
                <div
                  className={`w-2 h-2 rounded-full ${exp.color === "teal" ? "bg-teal-500" : "bg-violet-500"}`}
                />
              </div>
              <motion.div
                whileHover={{ y: -3 }}
                className="dark:bg-slate-800/40 bg-white rounded-2xl p-5 border dark:border-slate-700/50 border-slate-200 shadow-sm"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                  <div>
                    <h3
                      className={`text-lg font-bold mb-0.5 ${exp.color === "teal" ? "text-teal-500" : "text-violet-500"}`}
                      style={{
                        fontFamily: lang === "ar" ? "Cairo" : "Clash Display",
                      }}
                    >
                      {exp.company}
                    </h3>
                    <p
                      className="dark:text-slate-300 text-slate-700 font-semibold text-sm"
                      style={{
                        fontFamily: lang === "ar" ? "Cairo" : undefined,
                      }}
                    >
                      {exp.role[lang]}
                    </p>
                  </div>
                  <div className="space-y-1">
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${exp.color === "teal" ? "bg-teal-500/10 text-teal-500" : "bg-violet-500/10 text-violet-500"}`}
                      style={{
                        fontFamily: lang === "ar" ? "Cairo" : undefined,
                      }}
                    >
                      {exp.period[lang]}
                    </span>
                    <p
                      className="dark:text-slate-500 text-slate-400 text-xs"
                      style={{
                        fontFamily: lang === "ar" ? "Cairo" : undefined,
                      }}
                    >
                      {exp.location[lang]}
                    </p>
                  </div>
                </div>
                <ul className="space-y-1.5">
                  {exp.duties[lang].map((duty, j) => (
                    <li
                      key={j}
                      className="flex items-start gap-2 dark:text-slate-400 text-slate-600 text-sm"
                      style={{
                        fontFamily: lang === "ar" ? "Cairo" : undefined,
                      }}
                    >
                      <span
                        className={`mt-2 w-1.5 h-1.5 rounded-full flex-shrink-0 ${exp.color === "teal" ? "bg-teal-500" : "bg-violet-500"}`}
                      />
                      {duty}
                    </li>
                  ))}
                </ul>
              </motion.div>
            </motion.div>
          ))}
          {d.education.map((edu, i) => (
            <motion.div key={i} variants={fadeUp} className="relative md:pl-20">
              <div className="hidden md:flex absolute left-5 top-6 w-6 h-6 rounded-full items-center justify-center bg-amber-500/20 border-2 border-amber-500">
                <div className="w-2 h-2 rounded-full bg-amber-500" />
              </div>
              <motion.div
                whileHover={{ y: -3 }}
                className="dark:bg-slate-800/40 bg-white rounded-2xl p-5 border dark:border-slate-700/50 border-slate-200 shadow-sm"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-1.5">
                  <div>
                    <h3
                      className="text-lg font-bold text-amber-500 mb-0.5"
                      style={{
                        fontFamily: lang === "ar" ? "Cairo" : "Clash Display",
                      }}
                    >
                      {edu.institution[lang]}
                    </h3>
                    <p
                      className="dark:text-slate-300 text-slate-700 font-semibold text-sm"
                      style={{
                        fontFamily: lang === "ar" ? "Cairo" : undefined,
                      }}
                    >
                      {edu.degree[lang]}
                    </p>
                  </div>
                  <span
                    className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-amber-500/10 text-amber-500 self-start"
                    style={{ fontFamily: lang === "ar" ? "Cairo" : undefined }}
                  >
                    {edu.period[lang]}
                  </span>
                </div>
                <p
                  className="dark:text-slate-400 text-slate-500 text-sm flex items-center gap-2"
                  style={{ fontFamily: lang === "ar" ? "Cairo" : undefined }}
                >
                  <Star size={13} className="text-amber-500" />
                  {edu.note[lang]}
                </p>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Certificates Section */}
      <motion.div variants={fadeUp}>
        <h3
          className="text-xl font-bold dark:text-white text-slate-900 mb-6 flex items-center gap-2"
          style={{ fontFamily: lang === "ar" ? "Cairo" : "Clash Display" }}
        >
          <Award size={22} className="text-teal-500" />
          {lang === "ar" ? "الشهادات والتدريبات" : "Certificates & Training"}
        </h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {certificates.map((cert) => {
            const c = colorMap[cert.color];
            return (
              <motion.div
                key={cert.id}
                whileHover={{ y: -5, scale: 1.02 }}
                className={`dark:bg-slate-800/40 bg-white rounded-2xl p-5 border dark:border-slate-700/50 border-slate-200 shadow-sm cursor-pointer group`}
                onClick={() => setSelectedCert(cert)}
              >
                <div
                  className={`w-10 h-10 rounded-xl ${c.bg} ${c.text} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}
                >
                  {cert.icon}
                </div>
                <h4
                  className={`font-bold text-sm dark:text-white text-slate-900 mb-1 leading-snug`}
                  style={{ fontFamily: lang === "ar" ? "Cairo" : undefined }}
                >
                  {cert.title[lang]}
                </h4>
                <p
                  className="text-xs dark:text-slate-400 text-slate-500 mb-3"
                  style={{ fontFamily: lang === "ar" ? "Cairo" : undefined }}
                >
                  {cert.issuer[lang]}
                </p>
                <div className="flex items-center justify-between">
                  <span
                    className={`text-xs px-2 py-0.5 rounded-full font-medium ${c.badge}`}
                  >
                    {cert.date[lang]}
                  </span>

                  <div
                    className={`flex items-center gap-1 text-xs ${c.text} font-medium opacity-0 group-hover:opacity-100 transition-opacity`}
                    style={{ fontFamily: lang === "ar" ? "Cairo" : undefined }}
                  >
                    <Eye size={12} />
                    {lang === "ar" ? "عرض" : "View"}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {selectedCert && (
        <CertModal
          cert={selectedCert}
          onClose={() => setSelectedCert(null)}
          lang={lang}
        />
      )}
    </Section>
  );
}
// ─── Projects ─────────────────────────────────────────────────────────────────
function Projects({ lang, t }) {
  const d = portfolioData;
  const [featured, setFeatured] = useState(0);

  // Add images and links to your projects — edit paths here:
  const projectsMeta = [
    { image: plantProject, link: null, featured: true }, // Plant Nursery
    {image: unifiProject, link: "https://unifi-me.com/en/home",featured: true,}, // UNiFi
    {image: motionAuctionsProject,link: "https://www.motionauctions.com/",featured: true,}, //motion Auctions
     { image: laravelProject, link: null, featured: true }, //Advanced Admin Suite
    { image: aiSolutionProject, link: "https://aetheris.ae/", featured: false }, // AI Solutions
    { image: AlAwaielProject, link: "https://www.aljabalhoses.ae/", featured: true }, // Al Awaiel
        { image: mediaclProject, link: null, featured: false }, //medical
    { image: figmaProject, link: null, featured: false }, //figma
{ image: wordpressProject, link: "https://signaturebutchery.com/", featured: false }, //wordpress
   
  ];

  const projects = d.projects.map((p, i) => ({ ...p, ...projectsMeta[i] }));
  const featuredProjects = projects.filter((p) => p.featured);

  return (
    <Section id="projects" className="dark:bg-slate-900/30">
      <SectionHeader
        title={t.projects.title}
        subtitle={t.projects.subtitle}
        lang={lang}
      />

      {/* Featured Slider */}
      {featuredProjects.length > 0 && (
        <motion.div variants={fadeUp} className="mb-12">
          <h3
            className="text-base font-semibold dark:text-slate-400 text-slate-500 mb-4 flex items-center gap-2"
            style={{ fontFamily: lang === "ar" ? "Cairo" : undefined }}
          >
            <Star size={16} className="text-teal-500" />
            {lang === "ar" ? "المشاريع المميزة" : "Featured Projects"}
          </h3>
          <div className="relative overflow-hidden rounded-3xl border dark:border-slate-700/50 border-slate-200 shadow-xl">
            <AnimatePresence mode="wait">
              {featuredProjects.map((proj, i) =>
                i === featured % featuredProjects.length ? (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: 40 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -40 }}
                    transition={{ duration: 0.4 }}
                    className="grid md:grid-cols-2 min-h-[280px]"
                  >
                    {/* Image side */}
                    <div className="relative overflow-hidden dark:bg-slate-800 bg-slate-100 min-h-[200px] md:min-h-0">
                      {proj.image ? (
                        <img
                          src={proj.image}
                          alt={proj.title[lang]}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div
                          className="w-full h-full flex items-center justify-center"
                          style={{
                            background:
                              proj.color === "teal"
                                ? "linear-gradient(135deg,rgba(20,184,166,0.15),rgba(20,184,166,0.05))"
                                : "linear-gradient(135deg,rgba(124,58,237,0.15),rgba(124,58,237,0.05))",
                          }}
                        >
                          <div className="text-center">
                            <Terminal
                              size={48}
                              className={
                                proj.color === "teal"
                                  ? "text-teal-500/40"
                                  : "text-violet-500/40"
                              }
                            />
                            <p className="text-xs dark:text-slate-600 text-slate-400 mt-2">
                              Add project image
                            </p>
                          </div>
                        </div>
                      )}
                      <div
                        className="absolute inset-0"
                        style={{
                          background:
                            "linear-gradient(to right,transparent,rgba(15,23,42,0.3))",
                        }}
                      />
                    </div>
                    {/* Content side */}
                    <div className="dark:bg-slate-900 bg-white p-8 flex flex-col justify-center gap-4">
                      <div
                        className={`inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1 rounded-full self-start ${proj.color === "teal" ? "bg-teal-500/10 text-teal-500" : "bg-violet-500/10 text-violet-500"}`}
                      >
                        <Star size={11} />
                        {lang === "ar" ? "مشروع مميز" : "Featured"}
                      </div>
                      <h3
                        className="text-xl font-bold dark:text-white text-slate-900"
                        style={{
                          fontFamily: lang === "ar" ? "Cairo" : "Clash Display",
                        }}
                      >
                        {proj.title[lang]}
                      </h3>
                      <p
                        className="dark:text-slate-400 text-slate-500 text-sm leading-relaxed"
                        style={{
                          fontFamily: lang === "ar" ? "Cairo" : undefined,
                        }}
                      >
                        {proj.desc[lang]}
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {proj.tech.map((tech, j) => (
                          <span
                            key={j}
                            className={`px-2.5 py-1 rounded-full text-xs font-medium ${proj.color === "teal" ? "bg-teal-500/10 text-teal-500 border border-teal-500/20" : "bg-violet-500/10 text-violet-500 border border-violet-500/20"}`}
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                      {proj.link && (
                        <a
                          href={proj.link}
                          target="_blank"
                          rel="noreferrer"
                          className="btn-primary self-start px-5 py-2.5 rounded-xl text-white text-sm font-medium flex items-center gap-2"
                        >
                          <Globe size={14} />
                          {lang === "ar" ? "زيارة الموقع" : "Visit Site"}
                        </a>
                      )}
                    </div>
                  </motion.div>
                ) : null,
              )}
            </AnimatePresence>
            {/* Slider dots */}
            {featuredProjects.length > 1 && (
              <div className="absolute bottom-4 right-4 flex gap-2">
                {featuredProjects.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setFeatured(i)}
                    className={`w-2 h-2 rounded-full transition-all ${i === featured % featuredProjects.length ? "w-6 bg-teal-500" : "dark:bg-slate-600 bg-slate-300"}`}
                  />
                ))}
              </div>
            )}
          </div>
        </motion.div>
      )}

      {/* All projects grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {projects.map((proj, i) => (
          <motion.div
            key={i}
            variants={fadeUp}
            whileHover={{ y: -6, scale: 1.01 }}
            className="group dark:bg-slate-800/40 bg-white rounded-2xl overflow-hidden border dark:border-slate-700/50 border-slate-200 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col"
          >
            {/* Project image */}
            <div className="relative h-36 overflow-hidden">
              {proj.image ? (
                <img
                  src={proj.image}
                  alt={proj.title[lang]}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              ) : (
                <div
                  className="w-full h-full flex items-center justify-center"
                  style={{
                    background:
                      proj.color === "teal"
                        ? "linear-gradient(135deg,rgba(20,184,166,0.12),rgba(20,184,166,0.04))"
                        : "linear-gradient(135deg,rgba(124,58,237,0.12),rgba(124,58,237,0.04))",
                  }}
                >
                  <Terminal
                    size={32}
                    className={`${proj.color === "teal" ? "text-teal-500/30" : "text-violet-500/30"}`}
                  />
                </div>
              )}
              {proj.featured && (
                <div className="absolute top-2 start-2">
                  <span className="text-xs px-2 py-0.5 rounded-full font-medium bg-teal-500 text-white flex items-center gap-1">
                    <Star size={10} />
                     {lang === "ar" ? "مميز" : "Featured"}
                  </span>
                </div>
              )}
              {proj.link && (
                <a
                  href={proj.link}
                  target="_blank"
                  rel="noreferrer"
                  className="absolute top-2 end-2 w-8 h-8 rounded-full dark:bg-slate-900/80 bg-white/80 backdrop-blur-sm flex items-center justify-center dark:text-slate-300 text-slate-700 hover:text-teal-500 transition-colors shadow"
                >
                  <ExternalLink size={14} />
                </a>
              )}
            </div>
            <div className="p-5 flex flex-col flex-1">
              <h3
                className="dark:text-white text-slate-900 font-bold text-base mb-2 leading-tight"
                style={{
                  fontFamily: lang === "ar" ? "Cairo" : "Clash Display",
                }}
              >
                {proj.title[lang]}
              </h3>
              <p
                className="dark:text-slate-400 text-slate-500 text-xs leading-relaxed mb-3 flex-1"
                style={{ fontFamily: lang === "ar" ? "Cairo" : undefined }}
              >
                {proj.desc[lang]}
              </p>
              <div className="flex flex-wrap gap-1">
                {proj.tech.map((tech, j) => (
                  <span
                    key={j}
                    className={`px-2 py-0.5 rounded-full text-xs font-medium ${proj.color === "teal" ? "bg-teal-500/10 text-teal-500" : "bg-violet-500/10 text-violet-500"}`}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}

// ─── Skills ───────────────────────────────────────────────────────────────────
function SkillBar({ name, level, color }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  return (
    <div ref={ref} className="space-y-1.5">
      <div className="flex justify-between items-center">
        <span className="text-sm dark:text-slate-300 text-slate-600 font-medium">
          {name}
        </span>
        <span
          className={`text-xs font-bold ${color === "teal" ? "text-teal-500" : color === "purple" ? "text-violet-500" : "text-amber-500"}`}
        >
          {level}%
        </span>
      </div>
      <div className="h-1.5 dark:bg-slate-800 bg-slate-200 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={inView ? { width: `${level}%` } : {}}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
          className={`h-full rounded-full ${
            color === "teal"
              ? "bg-gradient-to-r from-teal-500 to-cyan-400"
              : color === "purple"
                ? "bg-gradient-to-r from-violet-500 to-purple-400"
                : "bg-gradient-to-r from-amber-500 to-yellow-400"
          }`}
        />
      </div>
    </div>
  );
}

function Skills({ lang, t }) {
  const d = portfolioData;
  const categories = [
    { key: "frontend", color: "teal", icon: <Code2 size={20} /> },
    { key: "backend", color: "purple", icon: <Terminal size={20} /> },
    { key: "tools", color: "amber", icon: <Zap size={20} /> },
  ];

  return (
    <Section id="skills">
      <SectionHeader
        title={t.skills.title}
        subtitle={t.skills.subtitle}
        lang={lang}
      />
      <div className="grid md:grid-cols-3 gap-8">
        {categories.map((cat) => (
          <motion.div
            key={cat.key}
            variants={fadeUp}
            className="dark:bg-slate-800/40 bg-white rounded-2xl p-6 border dark:border-slate-700/50 border-slate-200 shadow-sm"
          >
            <div
              className={`flex items-center gap-3 mb-6 ${
                cat.color === "teal"
                  ? "text-teal-500"
                  : cat.color === "purple"
                    ? "text-violet-500"
                    : "text-amber-500"
              }`}
            >
              {cat.icon}
              <h3
                className="font-bold text-lg dark:text-white text-slate-900"
                style={{
                  fontFamily: lang === "ar" ? "Cairo" : "Clash Display",
                }}
              >
                {
                  t.skills[
                    cat.key === "frontend"
                      ? "frontend"
                      : cat.key === "backend"
                        ? "backend"
                        : "tools"
                  ]
                }
              </h3>
            </div>
            <div className="space-y-4">
              {d.skills[cat.key].map((skill, i) => (
                <SkillBar
                  key={i}
                  name={skill.name}
                  level={skill.level}
                  color={cat.color}
                />
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}

// ─── Contact ──────────────────────────────────────────────────────────────────
function Contact({ lang, t }) {
  const d = portfolioData;
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error

  const handleSubmit = async () => {
    // التحقق من تعبئة الحقول
    if (!form.name || !form.email || !form.message) {
      alert(lang === "ar" ? "يرجى ملء جميع الحقول" : "Please fill all fields");
      return;
    }

    setStatus("sending");

    try {
      const res = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          service_id: "service_6utv1vn",    // 👈 استبدلي هذا بعد التسجيل
          template_id: "template_ddg3kuz",  // 👈 استبدلي هذا بعد التسجيل
          user_id: "4tUwVM3XaDzDGyZrl",       // 👈 استبدلي هذا بعد التسجيل
          template_params: {
            from_name: form.name,
            from_email: form.email,
            message: form.message,
            to_email: d.email, // بريدك المسجل في البيانات
          },
        }),
      });

      if (res.ok) {
        setStatus("sent");
        setForm({ name: "", email: "", message: "" }); // تفريغ الحقول
        setTimeout(() => setStatus("idle"), 4000); // العودة للحالة العادية بعد 4 ثواني
      } else {
        throw new Error("Failed to send");
      }
    } catch (error) {
      console.error(error);
      setStatus("error");
      // Fallback: يفتح تطبيق الإيميل إذا فشل الموقع في الإرسال
      window.location.href = `mailto:${d.email}?subject=Portfolio Contact from ${form.name}&body=${encodeURIComponent(form.message)}`;
      setTimeout(() => setStatus("idle"), 4000);
    }
  };

  return (
    <Section id="contact" className="dark:bg-slate-900/30">
      <SectionHeader title={t.contact.title} subtitle={t.contact.subtitle} lang={lang} />
      <div className="grid md:grid-cols-2 gap-12">
        {/* Info */}
        <motion.div variants={fadeUp} className="space-y-6">
          <p className="dark:text-slate-400 text-slate-500 leading-relaxed" style={{ fontFamily: lang === "ar" ? "Cairo" : undefined }}>
            {lang === "ar"
              ? "هل لديك مشروع تريد بنائه؟ هل تبحث عن مطورة ماهرة؟ تواصل معي وسأرد عليك في أسرع وقت!"
              : "Have a project you'd like to build? Looking for a skilled developer? Reach out and I'll get back to you as soon as possible!"}
          </p>
          <div className="space-y-4">
            {[
              { icon: <Mail size={18} />, value: d.email, href: `mailto:${d.email}` },
              { icon: <Phone size={18} />, value: d.phone, href: `tel:${d.phone}` },
              { icon: <MapPin size={18} />, value: d.location[lang] },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-teal-500/10 text-teal-500 flex items-center justify-center flex-shrink-0">{item.icon}</div>
                {item.href ? (
                  <a href={item.href} className="dark:text-slate-300 text-slate-600 hover:text-teal-500 transition-colors text-sm">{item.value}</a>
                ) : (
                  <span className="dark:text-slate-300 text-slate-600 text-sm" style={{ fontFamily: lang === "ar" ? "Cairo" : undefined }}>{item.value}</span>
                )}
              </div>
            ))}
          </div>

          <div className="pt-4">
            <p className="text-sm dark:text-slate-500 text-slate-400 mb-4" style={{ fontFamily: lang === "ar" ? "Cairo" : undefined }}>{t.contact.or}</p>
            <div className="flex gap-3">
              {[
                { icon: <Github size={18} />, href: d.github },
                { icon: <Linkedin size={18} />, href: d.linkedin },
                { icon: <Instagram size={18} />, href: d.instagram },
              ].map((s, i) => (
                <motion.a key={i} href={s.href} target="_blank" rel="noreferrer" whileHover={{ scale: 1.15, y: -3 }}
                  className="w-10 h-10 rounded-xl dark:bg-slate-800 bg-white border dark:border-slate-700 border-slate-200 flex items-center justify-center dark:text-slate-400 text-slate-500 dark:hover:text-teal-400 hover:text-teal-500 dark:hover:border-teal-500/50 hover:border-teal-400 transition-all">
                  {s.icon}
                </motion.a>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Form */}
        <motion.div variants={fadeUp} className="dark:bg-slate-800/40 bg-white rounded-2xl p-6 border dark:border-slate-700/50 border-slate-200 shadow-sm space-y-4">
          <div>
            <label className="block text-sm font-medium dark:text-slate-300 text-slate-700 mb-2" style={{ fontFamily: lang === "ar" ? "Cairo" : undefined }}>{t.contact.name}</label>
            <input type="text" value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
              className="w-full px-4 py-3 rounded-xl dark:bg-slate-900/50 bg-slate-50 dark:border-slate-700 border-slate-200 border dark:text-white text-slate-900 text-sm focus:outline-none focus:border-teal-500 transition-colors"
              style={{ fontFamily: lang === "ar" ? "Cairo" : undefined }} />
          </div>
          <div>
            <label className="block text-sm font-medium dark:text-slate-300 text-slate-700 mb-2" style={{ fontFamily: lang === "ar" ? "Cairo" : undefined }}>{t.contact.email}</label>
            <input type="email" value={form.email} onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
              className="w-full px-4 py-3 rounded-xl dark:bg-slate-900/50 bg-slate-50 dark:border-slate-700 border-slate-200 border dark:text-white text-slate-900 text-sm focus:outline-none focus:border-teal-500 transition-colors" />
          </div>
          <div>
            <label className="block text-sm font-medium dark:text-slate-300 text-slate-700 mb-2" style={{ fontFamily: lang === "ar" ? "Cairo" : undefined }}>{t.contact.message}</label>
            <textarea rows={5} value={form.message} onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
              className="w-full px-4 py-3 rounded-xl dark:bg-slate-900/50 bg-slate-50 dark:border-slate-700 border-slate-200 border dark:text-white text-slate-900 text-sm focus:outline-none focus:border-teal-500 transition-colors resize-none"
              style={{ fontFamily: lang === "ar" ? "Cairo" : undefined }} />
          </div>
          <motion.button
            onClick={handleSubmit}
            disabled={status === "sending"}
            whileHover={{ scale: status === "idle" ? 1.02 : 1 }}
            whileTap={{ scale: 0.98 }}
            className={`w-full py-3.5 rounded-xl text-white font-semibold flex items-center justify-center gap-2 text-sm transition-all 
              ${status === "sent" ? "bg-green-500" : status === "error" ? "bg-red-500" : "btn-primary"} 
              ${status === "sending" ? "opacity-70 cursor-not-allowed" : ""}`}
            style={{ fontFamily: lang === "ar" ? "Cairo" : undefined }}
          >
            {status === "sending" ? (lang === "ar" ? "جاري الإرسال..." : "Sending...") :
             status === "sent"    ? (lang === "ar" ? "✓ تم الإرسال" : "✓ Sent!") :
             status === "error"   ? (lang === "ar" ? "✗ فشل الإرسال" : "✗ Error") :
             <><Send size={16} /> {t.contact.send}</>}
          </motion.button>
        </motion.div>
      </div>
    </Section>
  );
}
// ─── Footer ───────────────────────────────────────────────────────────────────
function Footer({ lang, t }) {
  const d = portfolioData;
  const navItems = [
    "home",
    "about",
    "experience",
    "projects",
    "skills",
    "contact",
  ];
  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el)
      window.scrollTo({
        top: el.getBoundingClientRect().top + window.scrollY - 64,
        behavior: "smooth",
      });
  };
  return (
    <footer className="dark:bg-slate-950 bg-slate-50 border-t dark:border-slate-800 border-slate-200">
      {/* Main footer */}
      <div className="max-w-6xl mx-auto px-6 py-14">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand column */}
          <div className="lg:col-span-2 space-y-4">
            <div className="space-y-4">
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="cursor-pointer"
                onClick={() => scrollTo("home")}
              >
                <img
                  src={logoImgfooter}
                  alt="Rama Alazhari Logo"
                  className="h-auto w-full max-w-[280px] md:max-w-[150px] object-contain drop-shadow-[0_0_20px_rgba(20,184,166,0.4)]"
                />
              </motion.div>

              <p
                className="text-sm dark:text-slate-400 text-slate-500 leading-relaxed max-w-xs"
                style={{ fontFamily: lang === "ar" ? "Cairo" : undefined }}
              >
                {lang === "ar"
                  ? "أبني تجارب ويب استثنائية تجمع بين الجمال والأداء العالي."
                  : "Building exceptional web experiences that combine beauty with high performance."}
              </p>
            </div>
            <div className="flex gap-2.5">
              {[
                { icon: <Github size={16} />, href: d.github, label: "GitHub" },
                {
                  icon: <Linkedin size={16} />,
                  href: d.linkedin,
                  label: "LinkedIn",
                },
                {
                  icon: <Instagram size={16} />,
                  href: d.instagram,
                  label: "Instagram",
                },
                {
                  icon: <Mail size={16} />,
                  href: `mailto:${d.email}`,
                  label: "Email",
                },
              ].map((s, i) => (
                <motion.a
                  key={i}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={s.label}
                  whileHover={{ scale: 1.15, y: -3 }}
                  className="w-9 h-9 rounded-xl dark:bg-slate-800 bg-white border dark:border-slate-700 border-slate-200 flex items-center justify-center dark:text-slate-400 text-slate-500 dark:hover:text-teal-400 hover:text-teal-500 dark:hover:border-teal-500/50 hover:border-teal-400 transition-all shadow-sm"
                >
                  {s.icon}
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4
              className="font-bold dark:text-white text-slate-900 text-sm"
              style={{ fontFamily: lang === "ar" ? "Cairo" : "Clash Display" }}
            >
              {lang === "ar" ? "روابط سريعة" : "Quick Links"}
            </h4>
            <ul className="space-y-2.5">
              {navItems.map((item) => (
                <li key={item}>
                  <button
                    onClick={() => scrollTo(item)}
                    className="text-sm dark:text-slate-400 text-slate-500 dark:hover:text-teal-400 hover:text-teal-500 transition-colors flex items-center gap-1.5 group"
                    style={{ fontFamily: lang === "ar" ? "Cairo" : undefined }}
                  >
                    <span className="w-1 h-1 rounded-full bg-teal-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                    {t.nav[item]}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact info */}
          <div className="space-y-4">
            <h4
              className="font-bold dark:text-white text-slate-900 text-sm"
              style={{ fontFamily: lang === "ar" ? "Cairo" : "Clash Display" }}
            >
              {lang === "ar" ? "تواصل" : "Contact"}
            </h4>
            <ul className="space-y-2.5">
              {[
                {
                  icon: <Mail size={13} />,
                  value: d.email,
                  href: `mailto:${d.email}`,
                },
                {
                  icon: <Phone size={13} />,
                  value: d.phone,
                  href: `tel:${d.phone}`,
                },
                { icon: <MapPin size={13} />, value: d.location[lang] },
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-teal-500 mt-0.5 flex-shrink-0">
                    {item.icon}
                  </span>
                  {item.href ? (
                    <a
                      href={item.href}
                      className="text-xs dark:text-slate-400 text-slate-500 dark:hover:text-teal-400 hover:text-teal-500 transition-colors break-all"
                    >
                      {item.value}
                    </a>
                  ) : (
                    <span
                      className="text-xs dark:text-slate-400 text-slate-500"
                      style={{
                        fontFamily: lang === "ar" ? "Cairo" : undefined,
                      }}
                    >
                      {item.value}
                    </span>
                  )}
                </li>
              ))}
            </ul>
            {/* Availability badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full dark:bg-teal-500/10 bg-teal-50 border dark:border-teal-500/20 border-teal-200">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-500 animate-pulse" />
              <span
                className="text-xs font-medium text-teal-600 dark:text-teal-400"
                style={{ fontFamily: lang === "ar" ? "Cairo" : undefined }}
              >
                {lang === "ar" ? "متاحة للعمل" : "Available for work"}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t dark:border-slate-800 border-slate-200">
        <div className="max-w-6xl mx-auto px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p
            className="text-xs dark:text-slate-500 text-slate-400 flex items-center gap-1.5"
            style={{ fontFamily: lang === "ar" ? "Cairo" : undefined }}
          >
            {t.footer.made}{" "}
            <span className="gradient-text font-semibold">
              {portfolioData.name[lang]}
            </span>
            <span className="flex items-center gap-1 dark:text-slate-600 text-slate-400">
              {lang === "ar" ? "بكل" : "with"}{" "}
              <Heart size={11} className="text-red-500 fill-red-500" /> &{" "}
              <Coffee size={11} className="text-amber-500" />
            </span>
          </p>
          <div className="animated-border w-16 h-px rounded-full opacity-50" />
          <p
            className="text-xs dark:text-slate-600 text-slate-400"
            style={{ fontFamily: lang === "ar" ? "Cairo" : undefined }}
          >
            © {new Date().getFullYear()} — {t.footer.rights}
          </p>
        </div>
      </div>
    </footer>
  );
}

// ─── App ──────────────────────────────────────────────────────────────────────
export default function App() {
  const [dark, setDark] = useTheme();
  const [lang, setLang] = useLang();
  const t = translations[lang];

  return (
    <div
      className={`noise dark:bg-slate-950 bg-white min-h-screen transition-colors duration-300`}
    >
      <Navbar
        dark={dark}
        setDark={setDark}
        lang={lang}
        setLang={setLang}
        t={t}
      />
      <Hero lang={lang} t={t} />
      <About lang={lang} t={t} />
      <Experience lang={lang} t={t} />
      <Projects lang={lang} t={t} />
      <Skills lang={lang} t={t} />
      <Contact lang={lang} t={t} />
      <Footer lang={lang} t={t} />
    </div>
  );
}
