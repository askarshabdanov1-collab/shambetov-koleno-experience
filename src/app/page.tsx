"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
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
  Search,
  ShieldPlus,
  Star,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const navItems = [
  { label: "Проводимые операции", href: "#services", active: true },
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
  const selectedUsefulItem = useful[selectedUseful];

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.05,
      easing: (t) => 1 - Math.pow(1 - t, 3),
      smoothWheel: true,
    });

    let frame = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    };
    frame = requestAnimationFrame(raf);
    lenis.on("scroll", ScrollTrigger.update);

    const ctx = gsap.context(() => {
      const portrait = document.querySelector<HTMLElement>(".doctor-portrait-entrance");
      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      if (portrait && !reduceMotion) {
        gsap.fromTo(
          portrait,
          {
            y: 86,
            scale: 0.96,
            autoAlpha: 0,
            filter: "blur(8px)",
            clipPath: "inset(14% 0 0 0 round 28px)",
          },
          {
            y: 0,
            scale: 1,
            autoAlpha: 1,
            filter: "blur(0px)",
            clipPath: "inset(0% 0 0 0 round 28px)",
            duration: 1.18,
            delay: 0.24,
            ease: "expo.out",
            clearProps: "filter,clipPath",
          }
        );
      } else if (portrait) {
        gsap.set(portrait, { autoAlpha: 1 });
      }

      gsap.utils.toArray<HTMLElement>(".reveal-line span").forEach((line) => {
        gsap.fromTo(
          line,
          { yPercent: 105 },
          {
            yPercent: 0,
            duration: 0.5,
            ease: "expo.out",
            scrollTrigger: { trigger: line, start: "top 88%" },
          }
        );
      });

      gsap.utils.toArray<HTMLElement>("[data-rise]").forEach((section) => {
        const items = section.querySelectorAll("[data-rise-item]");
        if (!items.length) return;
        gsap.fromTo(
          items,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.48,
            stagger: 0.07,
            ease: "power3.out",
            scrollTrigger: { trigger: section, start: "top 80%" },
          }
        );
      });
    });

    return () => {
      ctx.revert();
      cancelAnimationFrame(frame);
      lenis.destroy();
    };
  }, []);

  return (
    <main className="site-shell">
      <section className="hero-card">
        <header className="topbar">
          <a href="#" className="brand" aria-label="Жантай Шамбетов">
            <span className="brand-icon">
              <ShieldPlus size={26} />
            </span>
            <span>
              <strong>Жантай Шамбетов</strong>
              <small>травматолог-ортопед</small>
            </span>
          </a>

          <nav className="nav-links" aria-label="Навигация">
            {navItems.map((item) => (
              <a className={item.active ? "nav-pill active" : ""} href={item.href} key={item.label}>
                {item.active && <Search size={14} />}
                {item.label}
              </a>
            ))}
          </nav>

          <div className="top-actions">
            <a className="contact-meta" href="tel:+996706102080">
              <strong>+996 706 102 080</strong>
              <span>Суеркулова 5/3</span>
            </a>
            <a className="contact-doctor" href="#contact">
              Связаться с доктором
            </a>
            <div className="social-links" aria-label="Социальные сети">
              <a href="https://wa.me/996706102080" target="_blank" rel="noreferrer" aria-label="WhatsApp">
                <MessageCircle size={18} />
              </a>
              <a href="https://www.instagram.com/dr.jantai_shambetov/" target="_blank" rel="noreferrer" aria-label="Instagram">
                <Camera size={18} />
              </a>
            </div>
            <button className="menu-button" aria-label="Открыть меню">
              <Menu size={22} />
            </button>
          </div>
        </header>

        <div className="hero-content">
          <div className="hero-copy">
            <h1>
              <RevealLine>Лечение суставов</RevealLine>
              <RevealLine>и спортивных травм</RevealLine>
              <RevealLine>в Бишкеке</RevealLine>
            </h1>
            <p className="hero-subtitle">Травматология и ортопедия без лишних назначений</p>
            <ul className="hero-bullets">
              <li>Колено, плечо, спортивные травмы и артроскопия</li>
              <li>Пациенты из Кыргызстана и СНГ</li>
            </ul>
            <div className="hero-cta-row">
              <motion.a whileTap={{ scale: 0.96 }} className="primary-button" href="#contact">
                Записаться
              </motion.a>
              <span>Оставьте заявку, и администратор свяжется с вами</span>
            </div>
          </div>

          <div className="doctor-stage" aria-label="Портрет специалиста">
            <div className="doctor-portrait">
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
            </div>
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
                aria-expanded={openFaq === index}
                aria-controls={`faq-answer-${index}`}
                onClick={() => setOpenFaq(openFaq === index ? -1 : index)}
              >
                <h3>{item.question}</h3>
                <span aria-hidden="true">{openFaq === index ? "−" : <Plus size={22} />}</span>
              </button>
              <motion.div
                id={`faq-answer-${index}`}
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

      <section className="contact-section" id="contact">
        <div>
          <span>Контакты</span>
          <h2>Связаться с доктором</h2>
          <p>Клиника MEDI, Бишкек, Суеркулова 5/3</p>
        </div>
        <div className="contact-actions">
          <a href="tel:+996706102080">
            <Phone size={20} />
            +996 706 102 080
          </a>
          <a href="https://wa.me/996706102080" target="_blank" rel="noreferrer">
            <MessageCircle size={20} />
            WhatsApp
          </a>
          <a href="https://www.instagram.com/dr.jantai_shambetov/" target="_blank" rel="noreferrer">
            <Camera size={20} />
            Instagram
          </a>
          <span>
            <MapPin size={20} />
            Для пациентов: mrtrazbor@mail.ru
          </span>
          <a href="mailto:jantai.shambetov@gmail.com">
            <CalendarDays size={20} />
            jantai.shambetov@gmail.com
          </a>
        </div>
      </section>

      <footer className="footer">
        <strong>Жантай Шамбетов</strong>
        <span>© 2026</span>
        <a href="#">
          Наверх
          <ArrowRight size={16} />
        </a>
      </footer>
    </main>
  );
}
