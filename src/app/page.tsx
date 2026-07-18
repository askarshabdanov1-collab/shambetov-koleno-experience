"use client";

import Image from "next/image";
import { type FormEvent, useEffect, useRef, useState } from "react";
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import { JointTreatmentSection } from "@/components/treatment/JointTreatmentSection";
import {
  ArrowRight,
  CalendarDays,
  Camera,
  Check,
  ChevronRight,
  MapPin,
  Menu,
  MessageCircle,
  Phone,
  Play,
  Plus,
  ShieldPlus,
  Star,
  X,
} from "lucide-react";

const navItems = [
  { label: "Проводимые операции", href: "#services" },
  { label: "Обо мне", href: "#about" },
  { label: "Полезные информации", href: "#useful" },
  { label: "Вопрос/ответ", href: "#faq" },
  { label: "Отзыв", href: "#reviews" },
  { label: "Контакты", href: "#contact" },
];

const cards = [
  {
    title: "случаев начинаем без операции",
    text: "Сначала разбираем МРТ, осмотр и нагрузку. Операция остается только там, где она действительно нужна.",
    value: "90%+",
  },
  {
    title: "лет практики в травматологии",
    text: "Клиническая практика, артроскопия, реабилитация и понятный план восстановления после приема.",
    value: "15+",
  },
  {
    title: "международных школ и конференций",
    text: "Германия, Италия, Япония, Южная Корея и профильные конференции травматологов-ортопедов.",
    value: "6",
  },
];

const useful = [
  {
    title: "Упражнения после артроскопии",
    text: "Покажем, какие движения обычно начинают первыми, как контролировать отек и когда увеличивать нагрузку.",
  },
  {
    title: "Подготовка к МРТ и консультации",
    text: "Что взять с собой: снимки, заключения, список жалоб, историю травмы и вопросы к врачу.",
  },
  {
    title: "Памятка после PRP-терапии",
    text: "Короткие правила после процедуры: режим нагрузки, чего избегать и когда оценивать результат.",
  },
  {
    title: "Реабилитация после реконструкции ПКС",
    text: "Этапы восстановления после операции: движение, сила, контроль колена и возвращение к спорту.",
  },
];

const testimonials = [
  {
    name: "Instagram · 24.02.2026",
    text: "«Еще один наш довольный пациент» — отзыв из публичного поста доктора.",
    source: "Открыть отзыв",
    href: "https://www.instagram.com/reel/DVJH0kZAjcn/",
  },
  {
    name: "Instagram · 17.06.2026",
    text: "«Колу женил врач, Жантай Зарлыкович ишинизге ийгилик»",
    source: "Открыть комментарий",
    href: "https://www.instagram.com/reel/DZr6sTFAntV/",
  },
  {
    name: "Instagram · реконструкция ПКС",
    text: "«Еще один довольный пациент после реконструкции передней крестообразной связки»",
    source: "Открыть пост",
    href: "https://www.instagram.com/reel/DZ4gnyPAePK/",
  },
];

const instagramVideos = [
  {
    title: "Видеоотзыв пациента",
    href: "https://www.instagram.com/reel/DVJH0kZAjcn/",
    embed: "https://www.instagram.com/reel/DVJH0kZAjcn/embed",
  },
  {
    title: "Комментарий пациента",
    href: "https://www.instagram.com/reel/DZr6sTFAntV/",
    embed: "https://www.instagram.com/reel/DZr6sTFAntV/embed",
  },
  {
    title: "После реконструкции ПКС",
    href: "https://www.instagram.com/reel/DZ4gnyPAePK/",
    embed: "https://www.instagram.com/reel/DZ4gnyPAePK/embed",
  },
];

const faq = [
  {
    question: "Когда боль в колене требует МРТ?",
    answer:
      "Если боль сохраняется после нагрузки, появляется отек, нестабильность, щелчки с блокировкой движения или была травма с резким поворотом колена, лучше прийти на осмотр и разобрать снимки. МРТ назначается не всем подряд, а когда результат действительно влияет на план лечения.",
  },
  {
    question: "Можно ли восстановить мениск без операции?",
    answer:
      "Иногда да. Все зависит от типа разрыва, зоны повреждения, возраста травмы, уровня нагрузки и симптомов. Если нет блокировки сустава и выраженной нестабильности, сначала можно рассмотреть консервативное лечение и реабилитацию.",
  },
  {
    question: "Сколько длится реабилитация после реконструкции ПКС?",
    answer:
      "Первые бытовые нагрузки обычно возвращаются постепенно в течение нескольких недель, но спорт требует более длинного восстановления. Полноценное возвращение к интенсивным нагрузкам чаще занимает месяцы и зависит от силы мышц, контроля движения и этапности реабилитации.",
  },
  {
    question: "Чем PRP отличается от гиалуроновой кислоты?",
    answer:
      "PRP использует собственную плазму пациента и применяется как часть восстановительной терапии. Гиалуроновая кислота работает больше как внутрисуставная поддержка скольжения. Выбор зависит от диагноза, стадии изменений и цели лечения.",
  },
  {
    question: "Когда нужна замена коленного сустава?",
    answer:
      "Эндопротезирование рассматривают, когда выраженный артроз ограничивает ходьбу и сон, боль не контролируется консервативным лечением, а снимки подтверждают тяжелое разрушение сустава. Решение принимается только после очной оценки и обсуждения альтернатив.",
  },
];

function CountUp({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(0);
  const [started, setStarted] = useState(false);
  const match = value.match(/^(\d+)(.*)$/);
  const target = Number(match?.[1] ?? 0);
  const suffix = match?.[2] ?? "";

  useEffect(() => {
    const element = ref.current;
    if (!element || started) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.45 }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const timer = window.setTimeout(() => setDisplay(target), 0);
      return () => window.clearTimeout(timer);
    }
    let frame = 0;
    const duration = 1100;
    const start = performance.now();

    const tick = (time: number) => {
      const progress = Math.min((time - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(target * eased));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [started, target]);

  return (
    <span ref={ref}>
      {display}
      {suffix}
    </span>
  );
}

function RevealLine({ children }: { children: React.ReactNode }) {
  return (
    <span className="reveal-line">
      <span>{children}</span>
    </span>
  );
}

export default function Home() {
  const [openFaq, setOpenFaq] = useState(0);
  const [selectedUseful, setSelectedUseful] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("services");
  const [contactVisible, setContactVisible] = useState(false);
  const [formStatus, setFormStatus] = useState<"idle" | "success">("idle");
  const heroRef = useRef<HTMLElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const selectedUsefulItem = useful[selectedUseful];
  const reduceMotion = useReducedMotion();
  const { scrollYProgress: heroScrollProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroProgress = useSpring(heroScrollProgress, {
    stiffness: 86,
    damping: 24,
    mass: 0.45,
  });
  const splitLeftX = useTransform(
    heroProgress,
    [0, 0.12, 0.4],
    reduceMotion ? ["-42%", "-42%", "-42%"] : ["0%", "0%", "-42%"]
  );
  const splitRightX = useTransform(
    heroProgress,
    [0, 0.12, 0.4],
    reduceMotion ? ["42%", "42%", "42%"] : ["0%", "0%", "42%"]
  );
  const introOpacity = useTransform(heroProgress, [0, 0.12, 0.24], reduceMotion ? [0, 0, 0] : [1, 1, 0]);
  const introY = useTransform(heroProgress, [0, 0.24], reduceMotion ? [0, 0] : [0, -38]);
  const revealWindowScaleX = useTransform(
    heroProgress,
    [0, 0.08, 0.31, 0.43],
    reduceMotion ? [1, 1, 1, 1] : [0.12, 0.12, 0.88, 1]
  );
  const revealWindowScaleY = useTransform(
    heroProgress,
    [0, 0.15, 0.34, 0.43],
    reduceMotion ? [1, 1, 1, 1] : [0.025, 0.025, 0.56, 1]
  );
  const revealWindowOpacity = useTransform(
    heroProgress,
    [0, 0.06, 0.18],
    reduceMotion ? [1, 1, 1] : [0, 1, 1]
  );
  const heroContentOpacity = useTransform(
    heroProgress,
    [0, 0.3, 0.45],
    reduceMotion ? [1, 1, 1] : [0, 0, 1]
  );
  const heroContentY = useTransform(heroProgress, [0, 0.3, 0.48], reduceMotion ? [0, 0, 0] : [48, 48, 0]);
  const heroContentScale = useTransform(heroProgress, [0, 0.32, 0.48], reduceMotion ? [1, 1, 1] : [0.985, 0.985, 1]);
  const portraitY = useTransform(heroProgress, [0, 0.28, 0.48], reduceMotion ? [-6, -6, -6] : [88, 88, -6]);
  const portraitScale = useTransform(heroProgress, [0, 0.28, 0.48], reduceMotion ? [1.04, 1.04, 1.04] : [0.9, 0.9, 1.04]);
  const portraitOpacity = useTransform(heroProgress, [0, 0.28, 0.44], reduceMotion ? [1, 1, 1] : [0, 0, 1]);
  const portalScale = useTransform(heroProgress, [0, 0.3, 0.48], reduceMotion ? [1, 1, 1] : [0.72, 0.72, 1]);
  const portalRotate = useTransform(heroProgress, [0, 0.5], reduceMotion ? [0, 0] : [-7, 5]);
  const abstractY = useTransform(heroProgress, [0, 0.7], reduceMotion ? [0, 0] : [0, -56]);
  const abstractOpacity = useTransform(heroProgress, [0, 0.2, 0.42], reduceMotion ? [0.72, 0.72, 0.72] : [0, 0.1, 0.72]);
  const scrollCueOpacity = useTransform(heroProgress, [0, 0.12], reduceMotion ? [0, 0] : [1, 0]);

  useEffect(() => {
    const sections = navItems
      .map((item) => document.querySelector<HTMLElement>(item.href))
      .filter((section): section is HTMLElement => Boolean(section));
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target.id) setActiveSection(visible.target.id);
      },
      { rootMargin: "-20% 0px -65%", threshold: [0.05, 0.25, 0.5] }
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const sections = Array.from(document.querySelectorAll<HTMLElement>("[data-rise]"));
    if (reduceMotion) {
      sections.forEach((section) => section.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      { rootMargin: "0px 0px -12%", threshold: 0.12 }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [reduceMotion]);

  useEffect(() => {
    const contact = document.querySelector<HTMLElement>("#contact");
    if (!contact) return;
    const observer = new IntersectionObserver(([entry]) => setContactVisible(entry.isIntersecting), {
      threshold: 0.08,
    });
    observer.observe(contact);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const menuButton = menuButtonRef.current;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    mobileMenuRef.current?.querySelector<HTMLAnchorElement>("a")?.focus();
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", closeOnEscape);
      menuButton?.focus();
    };
  }, [menuOpen]);

  const submitAppointment = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const message = [
      "Здравствуйте! Хочу записаться на консультацию.",
      `Имя: ${data.get("name")}`,
      `Телефон: ${data.get("phone")}`,
      `Что беспокоит: ${data.get("message") || "не указано"}`,
    ].join("\n");
    window.open(`https://wa.me/996706102080?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");
    setFormStatus("success");
  };

  return (
    <main className="site-shell">
      <a className="skip-link" href="#main-content">Перейти к содержанию</a>
      <header className="topbar">
        <div className="topbar-inner">
          <a href="#" className="brand" aria-label="Жантай Шамбетов, на главную">
            <span className="brand-icon">
              <ShieldPlus size={24} aria-hidden="true" />
            </span>
            <span>
              <strong>Жантай Шамбетов</strong>
              <small>травматолог-ортопед</small>
            </span>
          </a>

          <nav className="nav-links" aria-label="Основная навигация">
            {navItems.map((item) => (
              <a
                className={activeSection === item.href.slice(1) ? "active" : ""}
                href={item.href}
                key={item.label}
                aria-current={activeSection === item.href.slice(1) ? "location" : undefined}
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="top-actions">
            <a className="contact-meta" href="tel:+996706102080">
              <strong>+996 706 102 080</strong>
              <span>Суеркулова 5/3</span>
            </a>
            <a className="contact-doctor" href="#appointment-form">
              Записаться
            </a>
            <div className="social-links" aria-label="Социальные сети">
              <a href="https://wa.me/996706102080" target="_blank" rel="noreferrer" aria-label="WhatsApp">
                <MessageCircle size={18} />
              </a>
              <a href="https://www.instagram.com/dr.jantai_shambetov/" target="_blank" rel="noreferrer" aria-label="Instagram">
                <Camera size={18} />
              </a>
            </div>
            <button
              ref={menuButtonRef}
              type="button"
              className="menu-button"
              aria-label="Открыть меню"
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              onClick={() => setMenuOpen(true)}
            >
              <Menu size={22} aria-hidden="true" />
            </button>
          </div>
        </div>
      </header>

      <div
        id="mobile-menu"
        ref={mobileMenuRef}
        className={menuOpen ? "mobile-menu open" : "mobile-menu"}
        aria-hidden={!menuOpen}
      >
        <div className="mobile-menu-head">
          <strong>Разделы сайта</strong>
          <button type="button" onClick={() => setMenuOpen(false)} aria-label="Закрыть меню">
            <X size={24} aria-hidden="true" />
          </button>
        </div>
        <nav aria-label="Мобильная навигация">
          {navItems.map((item) => (
            <a href={item.href} key={item.label} onClick={() => setMenuOpen(false)}>
              {item.label}
              <ChevronRight size={20} aria-hidden="true" />
            </a>
          ))}
        </nav>
        <div className="mobile-menu-actions">
          <a className="button button-primary" href="#appointment-form" onClick={() => setMenuOpen(false)}>
            Записаться на консультацию
          </a>
          <a className="button button-secondary" href="https://wa.me/996706102080" target="_blank" rel="noreferrer">
            <MessageCircle size={20} aria-hidden="true" />
            Написать в WhatsApp
          </a>
        </div>
      </div>

      <section ref={heroRef} className="hero-card" id="main-content">
        <div className="hero-sticky-scene">
          <motion.div className="hero-intro" style={{ opacity: introOpacity, y: introY }}>
            <h1>
              <span>Травматолог-ортопед</span>
              <strong>Жантай Шамбетов</strong>
            </h1>
          </motion.div>

          <div className="hero-motion-background" aria-hidden="true">
            <motion.div className="hero-split-panel hero-split-panel-left" style={{ x: splitLeftX }} />
            <motion.div className="hero-split-panel hero-split-panel-right" style={{ x: splitRightX }} />
            <motion.div
              className="hero-reveal-window"
              style={{ scaleX: revealWindowScaleX, scaleY: revealWindowScaleY, opacity: revealWindowOpacity }}
            >
              <Image
                src="/assets/abstract-joint-window.webp"
                alt=""
                fill
                sizes="100vw"
                className="hero-reveal-art"
              />
            </motion.div>
            <motion.div className="hero-blueprint" style={{ y: abstractY, opacity: abstractOpacity }}>
              <span className="blueprint-axis blueprint-axis-horizontal" />
              <span className="blueprint-axis blueprint-axis-vertical" />
              <span className="blueprint-ring blueprint-ring-large" />
              <span className="blueprint-ring blueprint-ring-small" />
              <span className="blueprint-corner blueprint-corner-top" />
              <span className="blueprint-corner blueprint-corner-bottom" />
              <span className="blueprint-index">ORTHO / 01</span>
            </motion.div>
          </div>

          <motion.div
            className="hero-content"
            style={{ opacity: heroContentOpacity, y: heroContentY, scale: heroContentScale }}
          >
          <div className="hero-copy">
            <p className="hero-eyebrow">Травматолог-ортопед Жантай Шамбетов</p>
            <h2 className="hero-main-title">
              <RevealLine>Лечение суставов</RevealLine>
              <RevealLine>и спортивных травм</RevealLine>
              <RevealLine>в Бишкеке</RevealLine>
            </h2>
            <p className="hero-subtitle">Травматология и ортопедия без лишних назначений</p>
            <ul className="hero-bullets">
              <li>Колено, плечо, спортивные травмы и артроскопия</li>
              <li>Пациенты из Кыргызстана и СНГ</li>
            </ul>
            <div className="hero-cta-row">
              <motion.a whileTap={{ scale: 0.98 }} className="button button-primary" href="#appointment-form">
                Записаться на консультацию
              </motion.a>
              <a className="button button-secondary hero-whatsapp" href="https://wa.me/996706102080" target="_blank" rel="noreferrer">
                <MessageCircle size={20} aria-hidden="true" />
                Написать в WhatsApp
              </a>
            </div>
            <p className="hero-note">Оставьте заявку, и администратор свяжется с вами</p>
          </div>

          <div className="doctor-stage" aria-label="Портрет специалиста">
            <motion.div
              className="doctor-portal"
              style={{ scale: portalScale, rotate: portalRotate }}
              aria-hidden="true"
            >
              <span className="doctor-portal-ring doctor-portal-ring-one" />
              <span className="doctor-portal-ring doctor-portal-ring-two" />
              <span className="doctor-portal-line doctor-portal-line-one" />
              <span className="doctor-portal-line doctor-portal-line-two" />
            </motion.div>
            <motion.div
              className="doctor-portrait"
              style={{ y: portraitY, scale: portraitScale, opacity: portraitOpacity }}
            >
              <div className="doctor-portrait-entrance">
                <Image
                  src="/assets/doctor-hero-torso.webp"
                  alt="Жантай Зарлыкович Шамбетов"
                  fill
                  sizes="(max-width: 760px) 96vw, 640px"
                  priority
                  quality={100}
                  className="doctor-photo"
                />
                <div className="doctor-badge">
                  <Check size={17} />
                  MEDI
                </div>
              </div>
            </motion.div>
          </div>

          <aside className="reviews-mini">
            <h2>Работаем с 2020 года</h2>
            <div className="avatar-row">
              {["А", "Е", "М", "Н"].map((letter) => (
                <span key={letter}>{letter}</span>
              ))}
            </div>
            <a href="#reviews">Все отзывы</a>
          </aside>
          </motion.div>

          <motion.div className="hero-scroll-cue" style={{ opacity: scrollCueOpacity }} aria-hidden="true">
            <span />
            <small>Прокрутите</small>
          </motion.div>
        </div>
      </section>

      <section className="result-section" data-rise>
        <div className="section-header compact">
          <h2>
            <RevealLine>Помогаем прийти к результату</RevealLine>
          </h2>
          <p>
            Более 15 лет специализируемся на лечении заболеваний и травм опорно-двигательного
            аппарата. Находим оптимальное решение для каждого клинического случая.
          </p>
        </div>

        <div className="info-grid">
          {cards.map((card) => (
            <article className="white-card stat-card" data-rise-item key={card.title}>
              <strong>
                <CountUp value={card.value} />
              </strong>
              <h3>{card.title}</h3>
              <p>{card.text}</p>
            </article>
          ))}
        </div>
      </section>

      <JointTreatmentSection />

      <section className="doctor-section" id="about" data-rise>
        <div className="doctor-about">
          <span>Обо мне</span>
          <h2>
            <RevealLine>Жантай</RevealLine>
            <RevealLine>Шамбетов</RevealLine>
          </h2>
          <p>
            Заведующий отделением травматологии и ортопедии клиники MEDI. Ассистент кафедры
            травматологии и ортопедии КГМА им. И.К. Ахунбаева.
          </p>
        </div>
        <div className="timeline-list">
          {[
            "Стажировка в университетской клинике Миндена, Германия, 2025",
            "Участник международной конференции травматологов-ортопедов Америки, 2024",
            "Стажировка в университете Вероны, Италия, 2022",
            "Стажировки и повышение квалификации в Японии и Южной Корее",
          ].map((item, index) => (
            <div className="timeline-row" data-rise-item key={item}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <p>{item}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="useful-section" id="useful" data-rise>
        <div className="section-header">
          <span>Полезные информации</span>
          <h2>
            <RevealLine>Памятки и упражнения</RevealLine>
          </h2>
        </div>
        <div className="useful-grid">
          {useful.map((item, index) => (
            <motion.button
              type="button"
              whileHover={{ y: -6 }}
              whileTap={{ scale: 0.98 }}
              className={selectedUseful === index ? "white-card useful-card selected" : "white-card useful-card"}
              aria-pressed={selectedUseful === index}
              aria-controls="useful-detail"
              data-rise-item
              key={item.title}
              onClick={() => setSelectedUseful(index)}
            >
              <Play size={22} />
              <h3>{item.title}</h3>
              <ChevronRight size={20} />
            </motion.button>
          ))}
        </div>
        <motion.div
          className="interactive-detail useful-detail"
          id="useful-detail"
          key={selectedUsefulItem.title}
          initial={{ y: 14, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.24, ease: "easeOut" }}
        >
          <span>Полезная информация</span>
          <h3>{selectedUsefulItem.title}</h3>
          <p>{selectedUsefulItem.text}</p>
          <div className="detail-actions">
            <a href="#contact">Получить памятку на приеме</a>
            <a href="https://wa.me/996706102080" target="_blank" rel="noreferrer">
              Задать вопрос
            </a>
          </div>
        </motion.div>
      </section>

      <section className="faq-section" id="faq" data-rise>
        <div className="section-header">
          <span>Вопрос/ответ</span>
          <h2>
            <RevealLine>Частые вопросы</RevealLine>
          </h2>
        </div>
        <div className="faq-list">
          {faq.map((item, index) => (
            <article
              className={openFaq === index ? "faq-item open" : "faq-item"}
              data-rise-item
              key={item.question}
            >
              <button
                type="button"
                className="faq-question"
                id={`faq-question-${index}`}
                aria-expanded={openFaq === index}
                aria-controls={`faq-answer-${index}`}
                onClick={() => setOpenFaq(openFaq === index ? -1 : index)}
              >
                <h3>{item.question}</h3>
                <span aria-hidden="true">{openFaq === index ? "−" : <Plus size={22} />}</span>
              </button>
              <motion.div
                id={`faq-answer-${index}`}
                role="region"
                aria-labelledby={`faq-question-${index}`}
                initial={false}
                animate={{
                  height: openFaq === index ? "auto" : 0,
                  opacity: openFaq === index ? 1 : 0,
                }}
                transition={{ duration: 0.28, ease: "easeOut" }}
                className="faq-answer"
              >
                <p>{item.answer}</p>
              </motion.div>
            </article>
          ))}
        </div>
      </section>

      <section className="reviews-section" id="reviews" data-rise>
        <div className="section-header compact">
          <h2>
            <RevealLine>Видеоотзывы пациентов</RevealLine>
          </h2>
          <p>
            У нас нет красивых фото до-после, потому что проблемы со связками и суставами часто
            внешне не видны. Зато есть истории пациентов.
          </p>
        </div>
        <div className="review-video-grid" data-rise-item>
          {instagramVideos.map((video) => (
            <article className="instagram-video-card" key={video.href}>
              <div className="instagram-frame-wrap">
                <iframe
                  src={video.embed}
                  title={video.title}
                  loading="lazy"
                  allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                />
              </div>
              <a href={video.href} target="_blank" rel="noreferrer">
                Открыть в Instagram
              </a>
            </article>
          ))}
        </div>
        <div className="testimonial-grid">
          {testimonials.map((item) => (
            <article className="white-card testimonial-card" data-rise-item key={item.name}>
              <div className="stars">
                {Array.from({ length: 5 }).map((_, index) => (
                  <Star key={`${item.name}-${index}`} size={16} fill="currentColor" />
                ))}
              </div>
              <p>{item.text}</p>
              <div className="testimonial-meta">
                <strong>{item.name}</strong>
                <a href={item.href} target="_blank" rel="noreferrer">
                  {item.source}
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="contact-section" id="contact" data-rise>
        <div className="contact-copy" data-rise-item>
          <span>Контакты</span>
          <h2>Связаться с доктором</h2>
          <p>Клиника MEDI, Бишкек, Суеркулова 5/3</p>
          <div className="contact-actions">
            <a href="tel:+996706102080">
              <Phone size={20} aria-hidden="true" />
              <span><small>Телефон</small>+996 706 102 080</span>
            </a>
            <a href="https://wa.me/996706102080" target="_blank" rel="noreferrer">
              <MessageCircle size={20} aria-hidden="true" />
              <span><small>Мессенджер</small>WhatsApp</span>
            </a>
            <a href="https://www.instagram.com/dr.jantai_shambetov/" target="_blank" rel="noreferrer">
              <Camera size={20} aria-hidden="true" />
              <span><small>Социальная сеть</small>Instagram</span>
            </a>
            <span>
              <MapPin size={20} aria-hidden="true" />
              <span><small>Для пациентов</small>mrtrazbor@mail.ru</span>
            </span>
            <a href="mailto:jantai.shambetov@gmail.com">
              <CalendarDays size={20} aria-hidden="true" />
              <span><small>Электронная почта</small>jantai.shambetov@gmail.com</span>
            </a>
          </div>
        </div>

        <form className="appointment-form" id="appointment-form" onSubmit={submitAppointment} data-rise-item>
          <div className="form-heading">
            <span>Запись на консультацию</span>
            <h3>Оставьте контакты</h3>
            <p>Сообщение откроется в WhatsApp. Проверьте данные перед отправкой.</p>
          </div>
          <label htmlFor="appointment-name">Имя</label>
          <input id="appointment-name" name="name" autoComplete="name" required />
          <label htmlFor="appointment-phone">Телефон</label>
          <input id="appointment-phone" name="phone" type="tel" inputMode="tel" autoComplete="tel" required />
          <label htmlFor="appointment-message">Что вас беспокоит</label>
          <textarea id="appointment-message" name="message" rows={3} />
          <button className="button button-primary" type="submit">Продолжить в WhatsApp</button>
          <p className="form-status" role="status" aria-live="polite">
            {formStatus === "success" ? "WhatsApp открыт. Отправьте подготовленное сообщение доктору." : "Ответ обычно приходит в WhatsApp."}
          </p>
        </form>
      </section>

      <footer className="footer">
        <strong>Жантай Шамбетов</strong>
        <span>© 2026</span>
        <a href="#">
          Наверх
          <ArrowRight size={16} />
        </a>
      </footer>

      <div className={contactVisible ? "mobile-cta hidden" : "mobile-cta"} aria-label="Быстрые действия">
        <a href="tel:+996706102080"><Phone size={19} aria-hidden="true" />Позвонить</a>
        <a href="https://wa.me/996706102080" target="_blank" rel="noreferrer"><MessageCircle size={19} aria-hidden="true" />WhatsApp</a>
        <a href="#appointment-form"><CalendarDays size={19} aria-hidden="true" />Записаться</a>
      </div>
    </main>
  );
}
