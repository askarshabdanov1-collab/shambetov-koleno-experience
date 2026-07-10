import type { AnatomyFocus, TreatmentCategory, TreatmentTab } from "@/types/treatment";

const kneeFocus = (label: string, highlightedMeshes: string[] = ["rightKnee"]): AnatomyFocus => ({
  cameraPosition: [-0.26, -1.2, 3.35],
  cameraTarget: [-0.26, -1.27, 0],
  modelRotation: [0, -0.08, 0],
  highlightedMeshes,
  hotspotPosition: [-0.26, -1.27, 0.08],
  hotspotLabel: label,
  hotspots: [{
    position: [-0.26, -1.27, 0.08],
    label,
    detail: "Анатомическая проекция",
    side: "left",
  }],
  view: "knee",
});

const shoulderFocus = (label: string): AnatomyFocus => ({
  cameraPosition: [-0.61, 1.4, 3.55],
  cameraTarget: [-0.61, 1.38, 0],
  modelRotation: [0, 0.12, 0],
  highlightedMeshes: ["rightShoulder"],
  hotspotPosition: [-0.62, 1.38, 0.35],
  hotspotLabel: label,
  hotspots: [{
    position: [-0.62, 1.38, 0.35],
    label,
    detail: "Плечевой сустав • проекция",
    side: "left",
  }],
  view: "shoulder",
});

const fullFocus = (label: string, category: TreatmentCategory): AnatomyFocus => ({
  cameraPosition: [0, 0.05, 8.35],
  cameraTarget: [0, 0.05, 0],
  modelRotation: [0, -0.18, 0],
  highlightedMeshes: [],
  hotspotPosition: category === "rehabilitation" ? [-0.26, -1.24, 0.08] : [0, 0.62, 0.34],
  hotspotLabel: label,
  hotspots: [{
    position: category === "rehabilitation" ? [-0.26, -1.24, 0.08] : [0, 0.62, 0.34],
    label,
    detail: category === "rehabilitation" ? "Функциональная зона" : "Область осмотра",
    side: "left",
  }],
  view: "full",
});

export const defaultAnatomyFocus = fullFocus("Опорно-двигательный аппарат", "non-surgical");

export const treatmentTabs: TreatmentTab[] = [
  {
    id: "knee",
    label: "Колено",
    items: [
      { id: "meniscus", category: "knee", title: "Мениск", text: "Разбираем тип повреждения, блокировку сустава и возможность сохранить ткань мениска без лишнего удаления.", anatomyFocus: { ...kneeFocus("Мениски правого колена", ["meniscus"]), hotspots: [
        { position: [-0.18, -1.3, 0.08], label: "Медиальный мениск", detail: "Медиальная суставная щель • проекция", side: "right" },
        { position: [-0.34, -1.3, 0.07], label: "Латеральный мениск", detail: "Латеральная суставная щель • проекция", side: "left", variant: "secondary" },
      ] } },
      { id: "acl", category: "knee", title: "Крестообразная связка", text: "Оценка нестабильности, подготовка к реконструкции ПКС и план восстановления после операции.", anatomyFocus: { ...kneeFocus("Передняя крестообразная связка", ["acl"]), cameraPosition: [-0.26, -1.2, 3.2], hotspots: [
        { position: [-0.26, -1.27, 0.075], label: "Передняя крестообразная связка", detail: "Глубокая структура • проекция", side: "left" },
      ] } },
      { id: "patella", category: "knee", title: "Надколенник", text: "Лечение боли, нестабильности и последствий смещения надколенника с подбором нагрузки.", anatomyFocus: { ...kneeFocus("Надколенник", ["patella"]), hotspotPosition: [-0.26, -1.16, 0.08], hotspots: [
        { position: [-0.26, -1.16, 0.08], label: "Надколенник", detail: "Передняя поверхность колена", side: "left" },
      ] } },
      { id: "cartilage", category: "knee", title: "Хрящ", text: "Диагностика хрящевых дефектов, контроль боли и подбор тактики от реабилитации до артроскопии.", anatomyFocus: { ...kneeFocus("Суставной хрящ", ["cartilage"]), hotspots: [
        { position: [-0.22, -1.3, 0.075], label: "Суставной хрящ", detail: "Суставная поверхность • проекция", side: "left" },
      ] } },
      { id: "arthrosis", category: "knee", title: "Артроз", text: "Подбор лечения по стадии артроза: движение, инъекционные методы, контроль боли и хирургические варианты.", anatomyFocus: { ...kneeFocus("Медиальная суставная щель", ["cartilage", "rightKnee"]), hotspotPosition: [-0.18, -1.3, 0.075], hotspots: [
        { position: [-0.18, -1.3, 0.075], label: "Медиальная суставная щель", detail: "Зона типичных изменений при артрозе", side: "right" },
      ] } },
      { id: "prp", category: "knee", title: "PRP-терапия", text: "Инъекционная терапия собственной плазмой как часть восстановительного плана при подходящих показаниях.", anatomyFocus: { ...kneeFocus("Зона внутрисуставного доступа"), hotspotPosition: [-0.36, -1.12, 0.07], hotspots: [
        { position: [-0.36, -1.12, 0.07], label: "Внутрисуставной доступ", detail: "Типичная суперолатеральная зона", side: "left" },
      ] } },
    ],
  },
  {
    id: "shoulder",
    label: "Плечо",
    items: [
      { id: "shoulder-joint", category: "shoulder", title: "Плечевой сустав", text: "Разбор боли, ограничения движения, импинджмента и повреждений вращательной манжеты плеча.", anatomyFocus: shoulderFocus("Плечевой сустав") },
      { id: "shoulder-dislocation", category: "shoulder", title: "Вывих плеча", text: "Оценка нестабильности плеча после вывиха и подбор лечения для снижения риска повторной травмы.", anatomyFocus: { ...shoulderFocus("Плечевой сустав"), hotspots: [
        { position: [-0.62, 1.38, 0.35], label: "Плечевой сустав", detail: "Головка плечевой кости • проекция", side: "left" },
      ] } },
      { id: "shoulder-pain", category: "shoulder", title: "Боль при движении", text: "Проверяем причину боли при подъеме руки и составляем план лечения без лишних назначений.", anatomyFocus: shoulderFocus("Плечевой комплекс") },
      { id: "shoulder-arthroscopy", category: "shoulder", title: "Артроскопия плеча", text: "Минимально инвазивное лечение, когда консервативной терапии уже недостаточно.", anatomyFocus: { ...shoulderFocus("Артроскопический доступ"), hotspotPosition: [-0.69, 1.34, 0.3], hotspots: [
        { position: [-0.69, 1.34, 0.3], label: "Артроскопический доступ", detail: "Латеральный портал • проекция", side: "left" },
      ] } },
    ],
  },
  {
    id: "non-surgical",
    label: "Без операции",
    items: [
      { id: "non-surgical-prp", category: "non-surgical", title: "PRP-терапия", text: "Подходит не всем, поэтому сначала оцениваем диагноз, стадию изменений и цель лечения.", anatomyFocus: { ...kneeFocus("Зона внутрисуставного доступа"), hotspotPosition: [-0.36, -1.12, 0.07], hotspots: [
        { position: [-0.36, -1.12, 0.07], label: "Внутрисуставной доступ", detail: "Типичная суперолатеральная зона", side: "left" },
      ] } },
      { id: "rehabilitation-plan", category: "non-surgical", title: "Реабилитация", text: "Постепенное восстановление силы, контроля движения и уверенности в суставе.", anatomyFocus: fullFocus("Консервативное восстановление", "non-surgical") },
      { id: "mri-review", category: "non-surgical", title: "Разбор МРТ", text: "Объясняем снимки понятным языком и отделяем важные находки от случайных изменений.", anatomyFocus: fullFocus("Оценка анатомической области", "non-surgical") },
      { id: "pain-control", category: "non-surgical", title: "Контроль боли", text: "Составляем план нагрузки, терапии и наблюдения, чтобы не лечить снимок вместо пациента.", anatomyFocus: fullFocus("Индивидуальная зона боли", "non-surgical") },
    ],
  },
  {
    id: "rehabilitation",
    label: "Реабилитация",
    items: [
      { id: "post-arthroscopy", category: "rehabilitation", title: "После артроскопии", text: "Этапное возвращение объема движения и нагрузки после вмешательства на суставе.", anatomyFocus: fullFocus("Восстановление движения", "rehabilitation") },
      { id: "post-acl", category: "rehabilitation", title: "После реконструкции ПКС", text: "План восстановления колена после реконструкции связки с контролем сроков и критериев нагрузки.", anatomyFocus: { ...kneeFocus("Передняя крестообразная связка", ["acl"]), hotspots: [
        { position: [-0.26, -1.27, 0.075], label: "Передняя крестообразная связка", detail: "Глубокая структура • проекция", side: "left" },
      ] } },
      { id: "sports-injury", category: "rehabilitation", title: "Спортивные травмы", text: "Возвращение к тренировкам через силу мышц, координацию и безопасное увеличение нагрузки.", anatomyFocus: fullFocus("Функциональное восстановление", "rehabilitation") },
      { id: "home-program", category: "rehabilitation", title: "Домашняя программа", text: "Понятные упражнения и ограничения, которые пациент может выполнять между приемами.", anatomyFocus: fullFocus("Контроль движения", "rehabilitation") },
    ],
  },
];
