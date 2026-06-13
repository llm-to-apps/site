import { useEffect, useState } from "react";
import {
  ArrowRight,
  BarChart3,
  BriefcaseBusiness,
  Building2,
  Database,
  FileText,
  HeartPulse,
  LayoutDashboard,
  Menu,
  Network,
  UserRound,
  Workflow
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

type AudienceMode = "you" | "company";

const personalApps = [
  "здоровье",
  "привычки",
  "сон",
  "питание",
  "тренировки",
  "цели",
  "финансы",
  "документы",
  "проекты",
  "личная база знаний"
];

const companyApps = [
  "CRM",
  "заявки клиентов",
  "финансы",
  "счета",
  "склад",
  "HR",
  "документы",
  "проекты",
  "дашборды",
  "согласования"
];

const weakChatPoints = [
  "данные тонут в сообщениях",
  "таблицы неудобны",
  "дашборды ограничены",
  "процессами трудно управлять",
  "состояние системы сложно проверить"
];

const audienceSlides: Record<
  AudienceMode,
  {
    id: AudienceMode;
    icon: LucideIcon;
    navLabel: string;
    title: string;
    lead: string;
    example: string;
    items: string[];
    result: string[];
  }
> = {
  you: {
    id: "you",
    icon: HeartPulse,
    navLabel: "Для тебя",
    title: "Для тебя",
    lead:
      "Раньше человек искал приложения под привычки, финансы, здоровье и обучение. Теперь он описывает цель, а OS7 создает систему под него.",
    example: "Хочу взять здоровье под контроль",
    items: personalApps,
    result: ["health dashboard", "sleep tracker", "nutrition log", "progress charts", "weekly check-in"]
  },
  company: {
    id: "company",
    icon: BriefcaseBusiness,
    navLabel: "Для компании",
    title: "Для твоей компании",
    lead:
      "Компания описывает, как она работает. OS7 превращает это во внутренний софт, базы, панели, отчеты и процессы.",
    example: "Хочу оцифровать компанию",
    items: companyApps,
    result: ["CRM", "client database", "request pipeline", "invoice dashboard", "approval workflows"]
  }
};

export function App() {
  const [audience, setAudience] = useState<AudienceMode>("you");

  useEffect(() => {
    const syncFromHash = () => {
      if (window.location.hash === "#company") {
        setAudience("company");
      }

      if (window.location.hash === "#you") {
        setAudience("you");
      }
    };

    syncFromHash();
    window.addEventListener("hashchange", syncFromHash);

    return () => window.removeEventListener("hashchange", syncFromHash);
  }, []);

  const selectAudience = (mode: AudienceMode) => {
    setAudience(mode);
    window.history.replaceState(null, "", `#${mode}`);
  };

  return (
    <div className="min-h-screen bg-ink text-white antialiased">
      <Header audience={audience} onAudienceChange={selectAudience} />
      <main>
        <Hero audience={audience} onAudienceChange={selectAudience} />
        <CoreIdea />
        <Audience audience={audience} onAudienceChange={selectAudience} />
        <EndOfSaas />
      </main>
      <Footer />
    </div>
  );
}

function Header({
  audience,
  onAudienceChange
}: {
  audience: AudienceMode;
  onAudienceChange: (mode: AudienceMode) => void;
}) {
  return (
    <header className="sticky top-0 z-50 border-b border-line bg-ink/80 backdrop-blur-xl">
      <nav className="mx-auto flex h-20 w-full max-w-7xl items-center justify-between px-5">
        <a href="#" className="flex items-center gap-3">
          <span className="flex h-9 w-[74px] items-center justify-center rounded-lg border border-line bg-white px-2">
            <img src="/brand/os7-logo.svg" alt="OS7" className="h-6 w-auto" />
          </span>
          <span className="text-xs font-semibold uppercase tracking-[0.18em] text-white/44">Beta</span>
        </a>
        <div className="hidden items-center gap-8 md:flex">
          <a href="#idea" className="text-sm text-white/62 transition hover:text-white">
            Идея
          </a>
          <button
            type="button"
            onClick={() => onAudienceChange("you")}
            className={`text-sm transition ${audience === "you" ? "text-white" : "text-white/62 hover:text-white"}`}
          >
            Для тебя
          </button>
          <button
            type="button"
            onClick={() => onAudienceChange("company")}
            className={`text-sm transition ${audience === "company" ? "text-white" : "text-white/62 hover:text-white"}`}
          >
            Для компании
          </button>
          <a href="#saas" className="text-sm text-white/62 transition hover:text-white">
            SaaS
          </a>
        </div>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => onAudienceChange(audience)}
            className="hidden h-11 items-center gap-2 rounded-lg border border-line px-5 text-sm font-medium text-white transition hover:border-white/25 hover:bg-white/5 sm:flex"
          >
            Начать бесплатно
            <ArrowRight className="size-4" />
          </button>
          <button className="flex size-11 items-center justify-center rounded-lg border border-line bg-white/5 md:hidden">
            <Menu className="size-5" />
          </button>
        </div>
      </nav>
    </header>
  );
}

function Hero({
  audience,
  onAudienceChange
}: {
  audience: AudienceMode;
  onAudienceChange: (mode: AudienceMode) => void;
}) {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_28%_22%,rgba(37,213,155,0.18),transparent_34%),radial-gradient(circle_at_78%_32%,rgba(139,92,246,0.13),transparent_31%)]" />
      <div className="relative mx-auto grid min-h-[calc(100vh-80px)] w-full max-w-7xl items-center gap-12 px-5 py-16 lg:grid-cols-[0.88fr_1.12fr] lg:py-20">
        <div>
          <h1 className="max-w-4xl text-4xl font-semibold leading-[1.04] tracking-normal text-white md:text-6xl">
            Операционная система тебя
          </h1>
          <p className="mt-7 max-w-2xl text-lg leading-8 text-white/64">
            Опиши, как ты живешь или работаешь. OS7 создаст приложения, базы данных, дашборды и процессы
            под тебя или твою компанию.
          </p>
        </div>
        <SystemPreview audience={audience} onAudienceChange={onAudienceChange} />
      </div>
    </section>
  );
}

function AudienceSwitch({
  audience,
  onAudienceChange,
  className = ""
}: {
  audience: AudienceMode;
  onAudienceChange: (mode: AudienceMode) => void;
  className?: string;
}) {
  return (
    <div
      className={`grid w-full max-w-md grid-cols-2 rounded-xl border border-line bg-white/5 p-1 ${className}`}
      role="tablist"
      aria-label="Выбор аудитории"
    >
      {(["you", "company"] as const).map((mode) => {
        const active = audience === mode;
        const Icon = mode === "you" ? UserRound : Building2;

        return (
          <button
            key={mode}
            type="button"
            role="tab"
            aria-selected={active}
            onClick={() => onAudienceChange(mode)}
            className={`flex h-12 items-center justify-center gap-2 rounded-lg text-sm font-semibold transition ${
              active ? "bg-white text-ink shadow-sm" : "text-white/64 hover:bg-white/5 hover:text-white"
            }`}
          >
            {audienceSlides[mode].navLabel}
            <Icon className="size-4" />
          </button>
        );
      })}
    </div>
  );
}

function SystemPreview({
  audience,
  onAudienceChange
}: {
  audience: AudienceMode;
  onAudienceChange: (mode: AudienceMode) => void;
}) {
  const activeSlide = audienceSlides[audience];
  const blocks = [
    { label: "Намерение", value: activeSlide.example, icon: Workflow, tone: "text-gold" },
    { label: "Память", value: "База данных", icon: Database, tone: "text-mint" },
    { label: "Структура", value: "Интерфейсы", icon: LayoutDashboard, tone: "text-violet" },
    { label: "Действие", value: "Рабочие процессы", icon: Network, tone: "text-sky-300" }
  ];

  return (
    <div className="relative min-h-[520px] overflow-hidden rounded-2xl border border-line bg-panel/82 p-5 shadow-glow backdrop-blur-xl">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.045)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.045)_1px,transparent_1px)] bg-[size:44px_44px]" />
      <div className="relative border-b border-line pb-4">
        <AudienceSwitch audience={audience} onAudienceChange={onAudienceChange} />
      </div>
      <div className="relative mt-10 grid gap-5 md:grid-cols-2">
        {blocks.map((block, index) => {
          const Icon = block.icon;
          return (
            <div key={block.label} className="relative rounded-xl border border-line bg-ink/80 p-4">
              <div className="mb-5 flex items-center justify-between">
                <span className="text-xs uppercase tracking-[0.18em] text-white/38">{block.label}</span>
                <Icon className={`size-4 ${block.tone}`} />
              </div>
              <p className="text-xl font-semibold">{block.value}</p>
              <div className="mt-4 h-2 rounded-full bg-white/8">
                <div className="h-full rounded-full bg-mint" style={{ width: `${58 + index * 10}%` }} />
              </div>
            </div>
          );
        })}
      </div>
      <div className="relative mt-6 rounded-xl border border-line bg-black/30 p-4 font-mono text-xs leading-6 text-white/58">
        <span className="text-mint">chat</span>: {activeSlide.example}
        <br />
        <span className="text-violet">app</span>: {activeSlide.result.join(" · ")}
      </div>
    </div>
  );
}

function CoreIdea() {
  return (
    <section id="idea" className="mx-auto grid w-full max-w-7xl gap-10 px-5 py-24 lg:grid-cols-[0.9fr_1.1fr]">
      <div>
        <SectionIntro eyebrow="Главная идея" title="Чат нужен для намерения. Приложения нужны для системы." />
        <p className="mt-6 max-w-xl leading-8 text-white/62">
          ИИ нужно место, где данные можно хранить, структурировать, визуализировать и использовать со временем.
          Обычного чата для этого недостаточно.
        </p>
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        {weakChatPoints.map((point) => (
          <div key={point} className="rounded-lg border border-line bg-panel px-4 py-4 text-sm leading-6 text-white/68">
            {point}
          </div>
        ))}
      </div>
    </section>
  );
}

function Audience({
  audience,
  onAudienceChange
}: {
  audience: AudienceMode;
  onAudienceChange: (mode: AudienceMode) => void;
}) {
  const slide = audienceSlides[audience];

  return (
    <section id={audience} className="border-y border-line bg-white/[0.025]">
      <div className="mx-auto w-full max-w-7xl px-5 py-24">
        <SectionIntro eyebrow="Два контекста" title="Одна проблема: жизнь и работа разбросаны по кускам" />
        <div className="mt-10">
          <AudienceSwitch audience={audience} onAudienceChange={onAudienceChange} />
        </div>
        <div className="mt-5">
          <AudienceCard
            key={slide.id}
            icon={slide.icon}
            title={slide.title}
            lead={slide.lead}
            example={slide.example}
            items={slide.items}
            result={slide.result}
          />
        </div>
      </div>
    </section>
  );
}

function AudienceCard({
  icon: Icon,
  title,
  lead,
  example,
  items,
  result
}: {
  icon: LucideIcon;
  title: string;
  lead: string;
  example: string;
  items: string[];
  result: string[];
}) {
  return (
    <article className="grid min-h-[480px] gap-6 rounded-xl border border-line bg-ink p-6 lg:grid-cols-[0.92fr_1.08fr]">
      <div>
        <div className="flex items-center gap-3">
          <span className="flex size-11 items-center justify-center rounded-lg bg-white/5">
            <Icon className="size-5 text-mint" />
          </span>
          <h3 className="text-2xl font-semibold">{title}</h3>
        </div>
        <p className="mt-6 leading-8 text-white/60">{lead}</p>
        <div className="mt-6 rounded-lg border border-line bg-panel p-4">
          <p className="text-xs uppercase tracking-[0.18em] text-white/38">Пример запроса</p>
          <p className="mt-3 text-lg font-medium text-white">{example}</p>
        </div>
        <div className="mt-6 flex flex-wrap gap-2">
          {items.map((item) => (
            <span key={item} className="rounded-full border border-line bg-white/5 px-3 py-1.5 text-sm text-white/64">
              {item}
            </span>
          ))}
        </div>
      </div>
      <div className="rounded-xl border border-line bg-panel p-5">
        <div className="flex items-center gap-3 border-b border-line pb-4">
          <LayoutDashboard className="size-5 text-mint" />
          <span className="font-medium">OS7 создает</span>
        </div>
        <div className="grid gap-3 pt-5">
          {result.map((item, index) => (
            <div key={item} className="flex items-center gap-3 rounded-lg border border-line bg-ink px-4 py-3">
              <span className="flex size-8 items-center justify-center rounded-md bg-white/5 text-xs font-semibold text-mint">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="text-sm text-white/72">{item}</span>
            </div>
          ))}
        </div>
      </div>
    </article>
  );
}

function EndOfSaas() {
  return (
    <section id="saas" className="mx-auto w-full max-w-7xl px-5 py-24">
      <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <SectionIntro eyebrow="Тезис" title="Конец универсального SaaS." />
          <p className="mt-6 max-w-xl leading-8 text-white/62">
            Не нужно подстраивать жизнь или бизнес под чужой интерфейс. Пользователь описывает процесс,
            а софт подстраивается под него.
          </p>
        </div>
        <div className="rounded-xl border border-line bg-panel p-5">
          <div className="flex items-center gap-3 border-b border-line pb-4">
            <BarChart3 className="size-5 text-mint" />
            <span className="font-medium">Что создает ИИ</span>
          </div>
          <div className="grid gap-3 pt-5 sm:grid-cols-2">
            {["приложения", "базы данных", "дашборды", "workflow", "админки", "отчеты"].map((item) => (
              <div key={item} className="rounded-lg border border-line bg-ink px-4 py-3 text-sm text-white/70">
                {item}
              </div>
            ))}
          </div>
          <div className="mt-5 rounded-lg border border-line bg-black/25 p-4 text-sm leading-7 text-white/58">
            Раньше компания покупала SaaS. Теперь компания описывает, как она работает, а ИИ создает софт под нее.
          </div>
        </div>
      </div>
    </section>
  );
}

function SectionIntro({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <div className="max-w-3xl">
      <div className="mb-4 flex items-center gap-2 text-sm font-medium uppercase tracking-[0.18em] text-mint">
        <FileText className="size-4" />
        {eyebrow}
      </div>
      <h2 className="text-4xl font-semibold leading-tight md:text-5xl">{title}</h2>
    </div>
  );
}

function Footer() {
  return (
    <footer className="border-t border-line px-5 py-10">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-5 text-sm text-white/48 md:flex-row md:items-center md:justify-between">
        <span>OS7 2026</span>
        <div className="flex gap-5">
          <a href="#idea" className="transition hover:text-white">
            Идея
          </a>
          <a href="#you" className="transition hover:text-white">
            Для тебя
          </a>
          <a href="#company" className="transition hover:text-white">
            Для компании
          </a>
        </div>
      </div>
    </footer>
  );
}
