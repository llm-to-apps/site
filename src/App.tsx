import { useEffect, useState } from "react";
import {
  ArrowDown,
  ArrowRight,
  BarChart3,
  Building2,
  CheckCircle2,
  ClipboardList,
  Crown,
  CreditCard,
  Database,
  FolderKanban,
  Gift,
  LockKeyhole,
  Mail,
  MessageCircle,
  Mic,
  Loader2,
  Moon,
  PackageCheck,
  Plane,
  Plus,
  Menu,
  PiggyBank,
  Bot,
  Salad,
  Server,
  Sparkles,
  UsersRound,
  UserRound,
  Workflow
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

type AudienceMode = "you" | "company";

type GeneratedApp = {
  label: string;
  icon: LucideIcon;
  progress?: number;
  variant?: "more";
};

type QuoteCard = {
  quote: string;
  attribution: string;
  source: string;
  sourceUrl: string;
  interpretation: string;
};

type PitchPoint = {
  title: string;
  detail: string;
  icon: LucideIcon;
  badge?: string;
};

type WhoPaysSegment = {
  title: string;
  icon: LucideIcon;
  points: Array<{
    title: string;
    detail: string;
    icon: LucideIcon;
  }>;
};

type AppProps = {
  platformUrl?: string;
};

declare global {
  interface Window {
    __OS7_SITE_CONFIG__?: {
      platformUrl?: string;
    };
  }
}

const personalPromptExamples = [
  "I want to get my health under control",
  "I want to stop losing money without knowing where it goes",
  "I want to build a daily routine and not quit after one week",
  "I want to move into a new career in six months",
  "I want to organize my documents and important life admin"
];

const companyPromptExamples = [
  "I want to digitize my company",
  "I want to see customers, requests, and next actions in one place",
  "I want to understand payments, debt, and cashflow one month ahead",
  "I want approvals to stop living in chats and spreadsheets",
  "I want to see the state of the company every week without manual reports"
];

const audienceSlides: Record<
  AudienceMode,
  {
    navLabel: string;
    heroLead: string;
    promptExamples: string[];
    result: GeneratedApp[];
  }
> = {
  you: {
    navLabel: "For you",
    heroLead:
      "Describe a goal, routine, or decision process. OS7 creates apps, databases, dashboards, and workflows that become your personal operating surface.",
    promptExamples: personalPromptExamples,
    result: [
      { label: "Money Planner", icon: PiggyBank, progress: 82 },
      { label: "Sleep & Energy", icon: Moon, progress: 68 },
      { label: "Personal Kanban", icon: ClipboardList, progress: 74 },
      { label: "Nutrition Log", icon: Salad, progress: 59 },
      { label: "Family Hub", icon: UsersRound, progress: 77 },
      { label: "Trip Planner", icon: Plane, progress: 64 },
      { label: "Gift & Event Planner", icon: Gift, progress: 71 },
      { label: "and more ...", icon: Sparkles, variant: "more" }
    ]
  },
  company: {
    navLabel: "For company",
    heroLead:
      "Describe how the company works. OS7 creates CRM, finance, request, approval, and reporting systems adapted to the team instead of forcing the team into generic SaaS.",
    promptExamples: companyPromptExamples,
    result: [
      { label: "Own CRM", icon: UsersRound, progress: 86 },
      { label: "Invoicing Hub", icon: CreditCard, progress: 73 },
      { label: "Project Board", icon: FolderKanban, progress: 68 },
      { label: "Analytics & Reports", icon: BarChart3, progress: 81 },
      { label: "Email Campaigns", icon: Mail, progress: 57 },
      { label: "Team Workflows", icon: Workflow, progress: 76 },
      { label: "Inventory & Orders", icon: PackageCheck, progress: 62 },
      { label: "and more ...", icon: Sparkles, variant: "more" }
    ]
  }
};

const quoteCards: QuoteCard[] = [
  {
    quote: "They really do use LLM like an operating system.",
    attribution: "Sam Altman, OpenAI",
    source: "Sequoia Capital",
    sourceUrl: "https://sequoiacap.com/podcast/sam-altman-training-data/",
    interpretation: "People are already trying to use AI as a control layer. OS7 adds apps, databases, dashboards, workflows, and memory."
  },
  {
    quote: "Enterprises will increasingly create custom software on demand.",
    attribution: "McKinsey",
    source: "Unlocking the value of AI in software development",
    sourceUrl:
      "https://www.mckinsey.com/industries/technology-media-and-telecommunications/our-insights/unlocking-the-value-of-ai-in-software-development",
    interpretation: "Companies will increasingly create internal software around their actual processes instead of only buying generic SaaS."
  },
  {
    quote: "Software itself is getting disrupted.",
    attribution: "a16z",
    source: "The Trillion Dollar AI Software Development Stack",
    sourceUrl: "https://a16z.com/the-trillion-dollar-ai-software-development-stack/",
    interpretation: "AI is changing not only products, but the way software is created, modified, and distributed."
  }
];

const whoPaysSegments: WhoPaysSegment[] = [
  {
    title: "People",
    icon: UserRound,
    points: [
      {
        title: "Digitize routine life processes",
        detail: "Health, money, habits, documents, learning, projects, and family admin become structured systems.",
        icon: ClipboardList
      },
      {
        title: "Build tools around themselves",
        detail: "They want apps shaped around their goals and routines, not fixed workflows made for average users.",
        icon: Sparkles
      },
      {
        title: "Let agents run daily routines",
        detail: "Chat and voice become the control layer for reminders, updates, reports, and small decisions.",
        icon: MessageCircle
      }
    ]
  },
  {
    title: "Companies",
    icon: Building2,
    points: [
      {
        title: "Reduce software spend",
        detail: "Replace parts of the SaaS jungle with owned internal apps that fit the actual workflow.",
        icon: CreditCard
      },
      {
        title: "Digitize the business with AI",
        detail: "CRM, billing, reports, approvals, documents, and operations can be generated around company logic.",
        icon: Workflow
      },
      {
        title: "Operate through agents",
        detail: "Agents work with permissions, employees, data, documents, and workflows from one control layer.",
        icon: Bot
      }
    ]
  }
];

const businessModelPoints: PitchPoint[] = [
  {
    title: "Pay for agents",
    detail: "Customers pay when agents operate workflows, answer through chat or voice, update data, prepare reports, and run business actions.",
    icon: Bot
  },
  {
    title: "Don't pay for apps",
    detail: "Apps can be used through the UI for free: no per-seat SaaS tax, no paying again just because more people open the same tool.",
    icon: UsersRound
  },
  {
    title: "Infrastructure add-ons",
    detail: "Backups, version control, hosting, auto-scaling, audit logs, permissions, and production-grade operations become paid services.",
    icon: Server
  },
  {
    title: "Architect as a service",
    detail: "Companies can rent an AI-native architect and vibe-coder to design, build, and evolve custom internal systems on OS7.",
    icon: Crown
  }
];

const marketExpansionPoints: PitchPoint[] = [
  {
    title: "Every SaaS workflow gets rebuilt",
    detail: "CRM, finance, approvals, reports, documents, and internal tools need agent-native versions, not just AI buttons on old products.",
    icon: Workflow
  },
  {
    title: "Each company needs its own system",
    detail: "Agents cannot operate generic software well if the data model, permissions, documents, and workflow logic do not match the company.",
    icon: Building2
  },
  {
    title: "A new operating market opens",
    detail: "The opportunity is not another SaaS category. It is the layer where AI-built apps and agents replace fragmented SaaS stacks.",
    icon: Sparkles
  }
];

const competitorGroups: PitchPoint[] = [
  {
    title: "Incumbent SaaS",
    detail: "Salesforce, monday.com, Airtable, Notion, and vertical SaaS platforms will add agents to their existing products.",
    icon: Building2
  },
  {
    title: "Agent and automation platforms",
    detail: "Zapier, n8n, Relevance AI, Gumloop, and similar tools help teams automate tasks across existing software.",
    icon: Bot
  },
  {
    title: "AI app builders",
    detail: "Base44, Lovable, Bolt, Replit Agent, Emergent, v0, and others help people generate apps faster from prompts.",
    icon: Sparkles,
    badge: "we are here"
  }
];

const askStatusPoints: PitchPoint[] = [
  {
    title: "MVP",
    detail: "Deploy/run apps, agents bus, permissions",
    icon: CheckCircle2
  },
  {
    title: "Market fit",
    detail: "Pilot starts with 5 companies in August 2026",
    icon: Loader2
  },
  {
    title: "First users",
    detail: "Reach the first 100 active users",
    icon: Loader2
  }
];

const founderHighlights: PitchPoint[] = [
  {
    title: "20 years in software development",
    detail: "Deep product engineering background across architecture, platforms, and real production systems.",
    icon: Server
  },
  {
    title: "2 years building with AI",
    detail: "Hands-on work with AI-native product development, agents, coding workflows, and new software interfaces.",
    icon: Bot
  },
  {
    title: "Previous project exit",
    detail: "Successfully exited the previous project in April 2026 and is now fully focused on OS7.",
    icon: Sparkles
  },
  {
    title: "100% founder involvement",
    detail: "Product, architecture, customer learning, and investor narrative are led directly by the founder.",
    icon: Crown,
    badge: "no salary"
  }
];

const defaultPlatformUrl = "https://os7.dev/";

function hasInvestorSlidesParam() {
  if (typeof window === "undefined") {
    return false;
  }

  return new URLSearchParams(window.location.search).get("$") === "1";
}

function getClientPlatformUrl() {
  if (typeof window === "undefined") {
    return defaultPlatformUrl;
  }

  return window.__OS7_SITE_CONFIG__?.platformUrl || defaultPlatformUrl;
}

export function App({ platformUrl = getClientPlatformUrl() }: AppProps) {
  const [audience, setAudience] = useState<AudienceMode>("you");
  const [showInvestorSlides, setShowInvestorSlides] = useState(false);

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

  useEffect(() => {
    setShowInvestorSlides(hasInvestorSlidesParam());
  }, []);

  useEffect(() => {
    const isTypingTarget = (target: EventTarget | null) => {
      if (!(target instanceof HTMLElement)) {
        return false;
      }

      return target.matches("input, textarea, select, [contenteditable='true']");
    };

    const getSlides = () => Array.from(document.querySelectorAll<HTMLElement>("main > section"));

    const getCurrentSlide = () => {
      const slides = getSlides();
      if (slides.length === 0) {
        return null;
      }

      return slides.reduce((currentSlide, slide) => {
        const currentRect = currentSlide.getBoundingClientRect();
        const slideRect = slide.getBoundingClientRect();
        const currentVisible = Math.max(0, Math.min(window.innerHeight, currentRect.bottom) - Math.max(0, currentRect.top));
        const slideVisible = Math.max(0, Math.min(window.innerHeight, slideRect.bottom) - Math.max(0, slideRect.top));

        return slideVisible > currentVisible ? slide : currentSlide;
      }, slides[0]);
    };

    const clearPresentFocus = () => {
      document.querySelectorAll<HTMLElement>(".os7-present-active").forEach((step) => {
        step.classList.remove("os7-present-active");
        step.removeAttribute("aria-current");
      });
    };

    const focusPresentStep = (direction: 1 | -1) => {
      const slide = getCurrentSlide();
      if (!slide) {
        return false;
      }

      const steps = Array.from(slide.querySelectorAll<HTMLElement>("[data-present-step]"));
      if (steps.length === 0) {
        clearPresentFocus();
        return false;
      }

      const activeIndex = steps.findIndex((step) => step.classList.contains("os7-present-active"));
      const nextIndex =
        activeIndex === -1
          ? direction === 1
            ? 0
            : steps.length - 1
          : Math.max(0, Math.min(activeIndex + direction, steps.length - 1));

      clearPresentFocus();
      steps[nextIndex]?.classList.add("os7-present-active");
      steps[nextIndex]?.setAttribute("aria-current", "true");

      return true;
    };

    const toggleFullscreen = () => {
      if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen?.().catch(() => undefined);
        return;
      }

      document.exitFullscreen?.().catch(() => undefined);
    };

    const handleSlideKeys = (event: KeyboardEvent) => {
      if (event.defaultPrevented || event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) {
        return;
      }

      if (!["ArrowDown", "ArrowUp", "ArrowRight", "ArrowLeft", "Escape", "f", "F"].includes(event.key)) {
        return;
      }

      if (isTypingTarget(event.target)) {
        return;
      }

      if (event.key === "Escape") {
        clearPresentFocus();
        return;
      }

      if (event.key === "f" || event.key === "F") {
        event.preventDefault();
        toggleFullscreen();
        return;
      }

      if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
        if (focusPresentStep(event.key === "ArrowRight" ? 1 : -1)) {
          event.preventDefault();
        }
        return;
      }

      const slides = getSlides();
      if (slides.length === 0) {
        return;
      }

      event.preventDefault();
      clearPresentFocus();

      const anchorY = window.scrollY + 96;
      const currentIndex = slides.reduce((activeIndex, slide, index) => {
        const slideTop = slide.getBoundingClientRect().top + window.scrollY;
        return slideTop <= anchorY ? index : activeIndex;
      }, 0);
      const nextIndex =
        event.key === "ArrowDown"
          ? Math.min(currentIndex + 1, slides.length - 1)
          : Math.max(currentIndex - 1, 0);

      if (nextIndex === 0) {
        window.scrollTo({ top: 0, behavior: "smooth" });
        return;
      }

      slides[nextIndex]?.scrollIntoView({ behavior: "smooth", block: "start" });
    };

    window.addEventListener("keydown", handleSlideKeys);

    return () => window.removeEventListener("keydown", handleSlideKeys);
  }, []);

  const selectAudience = (mode: AudienceMode) => {
    setAudience(mode);
    window.history.replaceState(null, "", `${window.location.pathname}${window.location.search}#${mode}`);
  };

  return (
    <div className="min-h-screen bg-ink text-white antialiased">
      <Header platformUrl={platformUrl} showInvestorSlides={showInvestorSlides} />
      <main>
        <Hero audience={audience} onAudienceChange={selectAudience} />
        <ProblemSlide audience={audience} onAudienceChange={selectAudience} />
        <AppLibrarySystem audience={audience} />
        <CategoryShift />
        {showInvestorSlides && (
          <>
            <WhoPays />
            <BusinessModel />
            <WhyThisBecomesBig />
            <Competition />
            <Team />
            <Ask />
          </>
        )}
        <ResearchProof />
      </main>
      <Footer />
    </div>
  );
}

function Header({ platformUrl, showInvestorSlides }: { platformUrl: string; showInvestorSlides: boolean }) {
  return (
    <header className="sticky top-0 z-50 border-b border-line bg-ink/80 backdrop-blur-xl">
      <nav className="mx-auto flex h-20 w-full max-w-7xl items-center justify-between px-5">
        <a href="#" className="flex items-center gap-3">
          <span className="flex h-9 w-[74px] items-center justify-center rounded-lg border border-line bg-white px-2">
            <img src="/assets/os7-logo.svg" alt="OS7" className="h-6 w-auto" />
          </span>
          <span className="text-xs font-semibold uppercase tracking-[0.18em] text-white/44">Beta</span>
        </a>
        <div className="hidden items-center gap-8 md:flex">
          <a href="#problem" className="text-sm text-white/62 transition hover:text-white">
            SaaS Jungle
          </a>
          <a href="#system" className="text-sm text-white/62 transition hover:text-white">
            Agentic apps
          </a>
          <a href="#why-now" className="text-sm text-white/62 transition hover:text-white">
            Vibe-coding
          </a>
          {showInvestorSlides && (
            <>
              <a href="#who-pays" className="text-sm text-white/62 transition hover:text-white">
                Who pays
              </a>
              <a href="#business-model" className="text-sm text-white/62 transition hover:text-white">
                Model
              </a>
              <a href="#big-market" className="text-sm text-white/62 transition hover:text-white">
                Market
              </a>
              <a href="#competition" className="text-sm text-white/62 transition hover:text-white">
                Competition
              </a>
              <a href="#team" className="text-sm text-white/62 transition hover:text-white">
                Team
              </a>
              <a href="#ask" className="text-sm text-white/62 transition hover:text-white">
                We ask
              </a>
            </>
          )}
        </div>
        <div className="flex items-center gap-3">
          <a
            href={platformUrl}
            className="hidden h-11 items-center gap-2 rounded-lg border border-line px-5 text-sm font-medium text-white transition hover:border-white/25 hover:bg-white/5 sm:flex"
          >
            Start free
            <ArrowRight className="size-4" />
          </a>
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
  const activeSlide = audienceSlides[audience];

  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_23%_18%,rgba(37,213,155,0.19),transparent_34%),radial-gradient(circle_at_77%_30%,rgba(139,92,246,0.16),transparent_31%),linear-gradient(180deg,rgba(255,255,255,0.035),transparent_42%)]" />
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/16 to-transparent" />
      <div className="relative mx-auto w-full max-w-7xl px-5 pt-8">
        <AudienceSwitch audience={audience} onAudienceChange={onAudienceChange} className="mx-auto max-w-xs" compact />
      </div>
      <div className="relative mx-auto grid min-h-[calc(100vh-128px)] w-full max-w-7xl items-center gap-12 px-5 pb-14 pt-10 lg:grid-cols-[0.82fr_1.18fr] lg:pb-16">
        <div className="os7-present-pad" data-present-step>
          <h1 className="max-w-4xl text-3xl/[1.3] font-semibold tracking-normal text-white md:text-5xl/[1.3]">
            Turn intent into{" "}
            <br />
            {audience === "you" ? "your own OS" : "a company OS"}
          </h1>
          <p className="mt-7 max-w-2xl text-lg leading-8 text-white/64">
            {activeSlide.heroLead}
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href="#problem"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-lg border border-line bg-white/[0.035] px-5 text-sm font-semibold text-white transition hover:border-white/25 hover:bg-white/8"
            >
              Know more
              <ArrowDown className="size-4 os7-scroll-arrow" />
            </a>
          </div>
        </div>
        <div className="os7-present-pad" data-present-step>
          <SystemPreview audience={audience} onAudienceChange={onAudienceChange} />
        </div>
      </div>
    </section>
  );
}

function AudienceSwitch({
  audience,
  onAudienceChange,
  className = "",
  compact = false
}: {
  audience: AudienceMode;
  onAudienceChange: (mode: AudienceMode) => void;
  className?: string;
  compact?: boolean;
}) {
  return (
    <div
      className={`grid w-full max-w-md grid-cols-2 gap-2 rounded-full border border-line bg-white/5 p-1.5 ${className}`}
      role="tablist"
      aria-label="Audience selection"
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
            className={`flex items-center justify-center gap-2 rounded-full font-semibold transition ${
              active ? "bg-white text-ink shadow-sm" : "text-white/58 hover:bg-white/5 hover:text-white"
            } ${compact ? "h-11 text-sm" : "h-12 text-sm"}`}
          >
            <Icon className="size-4" />
            {audienceSlides[mode].navLabel}
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

  return (
    <div>
      <div className="rounded-xl border border-line bg-ink/72 p-6">
        <div className="flex items-start gap-3">
          <span className="mt-0.5 flex size-14 shrink-0 items-center justify-center rounded-xl bg-mint/10 text-mint">
            <UserRound className="size-7" />
          </span>
          <div className="min-w-0 flex-1">
            <div className="text-xs uppercase tracking-[0.18em] text-white/36">Describe the operating system</div>
            <div className="mt-3 min-h-14 break-words text-lg font-medium leading-7 text-white">
              <TypedPrompt prompts={activeSlide.promptExamples} />
              <span className="ml-1 inline-block h-5 w-1 translate-y-0.5 animate-pulse bg-mint" />
            </div>
          </div>
        </div>
      </div>

      <div className="mt-3 rounded-xl border border-line bg-ink/72 p-5">
        <div className="mb-4 flex items-center gap-2 text-sm font-medium text-white/72">
          <Loader2 className="size-4 text-mint os7-spin" />
          Generating by AI
        </div>
        <div className="grid gap-2 sm:grid-cols-2">
          {activeSlide.result.map((item) => {
            const Icon = item.icon;

            if (item.variant === "more") {
              return (
                <div key={item.label} className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-white/42">
                  <Sparkles className="size-4 shrink-0 text-mint/70" />
                  <span>{item.label}</span>
                </div>
              );
            }

            return (
              <div key={item.label} className="rounded-lg border border-line bg-white/[0.035] px-3 py-2.5">
                <div className="flex items-center gap-2 text-sm text-white/68">
                  <Icon className="size-4 shrink-0 text-mint" />
                  <span>{item.label}</span>
                </div>
                <div className="mt-2 h-1 overflow-hidden rounded-full bg-white/8">
                  <div
                    className="os7-app-progress h-full rounded-full bg-white/20"
                    style={{ "--os7-progress-target": `${item.progress || 66}%` } as React.CSSProperties}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function TypedPrompt({ prompts }: { prompts: string[] }) {
  const [promptIndex, setPromptIndex] = useState(0);
  const [visibleLength, setVisibleLength] = useState(prompts[0]?.length || 0);
  const [phase, setPhase] = useState<"typing" | "pause" | "deleting">("pause");

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion || prompts.length === 0) {
      setPromptIndex(0);
      setVisibleLength(prompts[0]?.length || 0);
      setPhase("pause");
      return;
    }

    setPromptIndex(0);
    setVisibleLength(0);
    setPhase("typing");
  }, [prompts]);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion || prompts.length === 0) {
      return undefined;
    }

    const currentPrompt = prompts[promptIndex] || "";
    let delay = 32;

    if (phase === "pause") {
      delay = 850;
    }

    if (phase === "deleting") {
      delay = 14;
    }

    const timer = window.setTimeout(() => {
      if (phase === "typing") {
        if (visibleLength < currentPrompt.length) {
          setVisibleLength((length) => length + 1);
        } else {
          setPhase("pause");
        }
        return;
      }

      if (phase === "pause") {
        setPhase("deleting");
        return;
      }

      if (visibleLength > 0) {
        setVisibleLength((length) => Math.max(0, length - 1));
      } else {
        setPromptIndex((index) => (index + 1) % prompts.length);
        setPhase("typing");
      }
    }, delay);

    return () => window.clearTimeout(timer);
  }, [phase, promptIndex, prompts, visibleLength]);

  return <span>{(prompts[promptIndex] || "").slice(0, visibleLength)}</span>;
}

const problemSlides: Record<
  AudienceMode,
  {
    title: string;
    copy: string;
    points: Array<{
      label: string;
      detail: string;
      icon: LucideIcon;
    }>;
  }
> = {
  you: {
    title: "Your life is scattered across tools that were not built for you",
    copy:
      "Habits live in one app. Finances in another. Health data somewhere else. Projects, notes, documents, and decisions get split across apps, chats, and spreadsheets. The data exists, but it never becomes one system you can actually rely on.",
    points: [
      {
        label: "Too many separate apps",
        detail: "Each area gets its own tool, reminders, and missing context.",
        icon: FolderKanban
      },
      {
        label: "Your data never becomes a system",
        detail: "Health, money, habits, and projects stay disconnected.",
        icon: Database
      },
      {
        label: "You adapt to fixed workflows",
        detail: "Most apps force you to follow their structure.",
        icon: Workflow
      }
    ]
  },
  company: {
    title: "Companies operate in a SaaS jungle built for someone else",
    copy:
      "Companies pay separately for CRM, invoices, tasks, reports, documents, approvals, and internal tools. Each product has its own logic, data drifts out of sync, and business processes become more complex because teams work around software limits.",
    points: [
      {
        label: "Too many SaaS subscriptions",
        detail: "CRM, invoices, tasks, reports, and approvals usually charge per user.",
        icon: CreditCard
      },
      {
        label: "Data falls out of sync",
        detail: "Different systems, different formats, and little connection between them.",
        icon: Database
      },
      {
        label: "Business processes constrained by tool limits",
        detail: "Teams add manual steps because the tools do not fit.",
        icon: Workflow
      }
    ]
  }
};

function ProblemSlide({
  audience,
  onAudienceChange
}: {
  audience: AudienceMode;
  onAudienceChange: (mode: AudienceMode) => void;
}) {
  const slide = problemSlides[audience];

  return (
    <section id="problem" className="relative scroll-mt-20 overflow-hidden border-y border-line bg-white/[0.018]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_82%_18%,rgba(37,213,155,0.13),transparent_32%),radial-gradient(circle_at_18%_60%,rgba(139,92,246,0.13),transparent_30%),linear-gradient(180deg,rgba(255,255,255,0.025),transparent_48%)]" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/14 to-transparent" />
      <div className="relative mx-auto grid w-full max-w-7xl gap-14 px-5 pb-24 pt-20">
        <div className="os7-present-pad mx-auto mb-4 max-w-4xl text-center" data-present-step>
          <h2 className="text-3xl/[1.3] font-semibold md:text-5xl/[1.3]">{slide.title}</h2>
        </div>

        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div>
            <div className="grid gap-3">
              {slide.points.map((point) => {
                const Icon = point.icon;

                return (
                  <div
                    key={point.label}
                    data-present-step
                    className="os7-problem-card rounded-lg border border-line bg-white/[0.035] px-3 py-3.5"
                  >
                    <div className="flex items-center gap-2 text-lg font-semibold text-white/72">
                      <Icon className="size-4 shrink-0 text-mint" />
                      <span>{point.label}</span>
                    </div>
                    <p className="mt-2 text-sm leading-6 text-white/50">{point.detail}</p>
                  </div>
                );
              })}
            </div>
          </div>

          <div>
            <div className="mb-6">
              <AudienceSwitch audience={audience} onAudienceChange={onAudienceChange} className="os7-audience-switch-compact max-w-[272px]" compact />
            </div>
            <p className="os7-present-pad max-w-xl text-lg leading-9 text-white/62" data-present-step>{slide.copy}</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href="#system"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-lg border border-line bg-white/[0.035] px-5 text-sm font-semibold text-white transition hover:border-white/25 hover:bg-white/8"
              >
                Agentic apps
                <ArrowDown className="size-4 os7-scroll-arrow" />
              </a>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

const softwareZeroRisks: PitchPoint[] = [
  {
    title: "Not safe",
    detail: "A quick generated app can miss authentication, permissions, data validation, backups, and basic security boundaries.",
    icon: LockKeyhole
  },
  {
    title: "Hard to extend",
    detail: "Without a clear architecture, each new feature becomes harder to add and the product turns into fragile one-off code.",
    icon: Workflow
  },
  {
    title: "Not built to scale",
    detail: "A personal prototype can work once, but fail when data grows, teams collaborate, or workflows become operational.",
    icon: Server
  }
];

const systemSlides: Record<
  AudienceMode,
  {
    eyebrow: string;
    title: string;
    copy: string;
    chips: string[];
    orchestratorLabel: string;
    controlLabel: string;
    rows: Array<{
      agent: string;
      app: string;
      icon: LucideIcon;
    }>;
  }
> = {
  you: {
    eyebrow: "AI Native Life",
    title: "AI builds the apps. Agents operate them.",
    copy:
      "With OS7, you can develop your own agentic apps and let specialized agents operate them through chat, voice, and tools. The platform gives one place for your agents, data, documents, goals, routines, and permissions.",
    chips: ["Personal app library", "Vibe coding", "Life agents"],
    orchestratorLabel: "AI Native Life",
    controlLabel: "Your Agent",
    rows: [
      {
        agent: "Money Sub Agent",
        app: "Money Planner",
        icon: PiggyBank
      },
      {
        agent: "Health Sub Agent",
        app: "Sleep & Energy",
        icon: Moon
      },
      {
        agent: "Project Sub Agent",
        app: "Personal Kanban",
        icon: ClipboardList
      }
    ]
  },
  company: {
    eyebrow: "AI Native Company",
    title: "AI builds the apps. Agents operate them.",
    copy:
      "With OS7, a company can develop its own agentic apps and let agents operate real business workflows. The platform gives one gateway for agent management, employee authorization, access control, data, documents, and operations.",
    chips: ["Company app library", "Process coding", "Operations agents"],
    orchestratorLabel: "AI Native Company",
    controlLabel: "Company Agent",
    rows: [
      {
        agent: "Customers Sub Agent",
        app: "Your Own CRM",
        icon: UsersRound
      },
      {
        agent: "Finance Sub Agent",
        app: "Billing System",
        icon: CreditCard
      },
      {
        agent: "Reports Sub Agent",
        app: "KPI Dashboards",
        icon: BarChart3
      }
    ]
  }
};

function AppLibrarySystem({ audience }: {
  audience: AudienceMode;
}) {
  const slide = systemSlides[audience];

  return (
    <section id="system" className="relative scroll-mt-20 overflow-hidden border-y border-line bg-white/[0.025]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(139,92,246,0.14),transparent_32%),radial-gradient(circle_at_82%_66%,rgba(37,213,155,0.12),transparent_34%),linear-gradient(180deg,rgba(255,255,255,0.028),transparent_50%)]" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/14 to-transparent" />
      <div className="relative mx-auto grid w-full max-w-7xl gap-10 px-5 py-24 lg:grid-cols-[0.96fr_1.04fr] lg:items-start">
        <div className="os7-present-pad" data-present-step>
          <div className="max-w-3xl">
            <h2 className="text-4xl/[1.3] font-semibold md:text-5xl/[1.3]">{slide.title}</h2>
          </div>
          <p className="mt-6 max-w-xl leading-8 text-white/62">{slide.copy}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href="#why-now"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-lg border border-line bg-white/[0.035] px-5 text-sm font-semibold text-white transition hover:border-white/25 hover:bg-white/8"
            >
              SaaS is dead
              <ArrowDown className="size-4 os7-scroll-arrow" />
            </a>
          </div>
        </div>

        <div>
          <div>
            <div className="mx-auto max-w-sm rounded-xl border border-mint/10 bg-mint/[0.045] px-5 py-4 text-center" data-present-step>
              <div className="mx-auto mb-3 flex size-11 items-center justify-center rounded-full bg-mint/10 text-mint">
                <Crown className="size-5" />
              </div>
              <div className="text-xs uppercase tracking-[0.18em] text-white/36">{slide.orchestratorLabel}</div>
              <div className="mt-2 flex items-center justify-center gap-3">
                <div className="text-xl font-semibold text-white">{slide.controlLabel}</div>
                <div className="flex items-center gap-2 text-white/54">
                  <MessageCircle className="size-4" aria-label="Chat" />
                  <Mic className="size-4" aria-label="Voice" />
                </div>
              </div>
            </div>

            <div className="relative mt-8">
              <div className="grid gap-3 md:grid-cols-2">
                {slide.rows.map((row) => {
                  const Icon = row.icon;

                  return (
                    <div key={row.agent} className="rounded-xl border border-line bg-white/[0.035] p-4" data-present-step>
                      <div className="flex items-center gap-3">
                        <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-white/6 text-mint">
                          <Bot className="size-4" />
                        </span>
                        <div>
                          <div className="text-base font-semibold text-white">{row.agent}</div>
                        </div>
                      </div>

                      <div className="my-4 h-px bg-line" />

                      <div className="flex items-center gap-3 rounded-lg border border-line bg-ink/80 px-3 py-3">
                        <Icon className="size-4 text-mint" />
                        <span className="text-sm font-medium text-white/72">{row.app}</span>
                      </div>
                    </div>
                  );
                })}
                <div className="relative min-h-[154px] overflow-hidden rounded-xl border border-line bg-white/[0.025] p-4" data-present-step>
                  <div className="pointer-events-none space-y-4 opacity-40">
                    <div className="flex items-center gap-3">
                      <div className="size-9 rounded-lg bg-white/6" />
                      <div className="h-3 w-32 rounded-full bg-white/8" />
                    </div>
                    <div className="h-px bg-line" />
                    <div className="h-11 rounded-lg border border-line bg-ink/60" />
                  </div>

                  <div className="absolute inset-0 flex items-center justify-center bg-ink/44 backdrop-blur-[2px]">
                    <div className="pointer-events-none inline-flex h-10 items-center justify-center gap-2 rounded-lg border border-line bg-white/[0.055] px-4 text-sm font-semibold text-white">
                      <Plus className="size-4" />
                      Add Sub Agent
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function CategoryShift() {
  return (
    <section id="why-now" className="relative scroll-mt-20 overflow-hidden border-y border-line bg-white/[0.018]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_22%_28%,rgba(244,200,103,0.12),transparent_30%),radial-gradient(circle_at_80%_62%,rgba(139,92,246,0.12),transparent_32%),linear-gradient(180deg,rgba(255,255,255,0.026),transparent_52%)]" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/14 to-transparent" />
      <div className="relative mx-auto grid w-full max-w-7xl gap-10 px-5 py-24 lg:grid-cols-[1.18fr_0.82fr] lg:items-start">
        <div className="os7-present-pad order-2" data-present-step>
          <h2 className="max-w-3xl text-4xl/[1.3] font-semibold md:text-5xl/[1.3]">AI collapses the cost of software</h2>
          <p className="mt-6 max-w-xl leading-8 text-white/62">
            Vibe coding makes software creation accessible to almost anyone. An operator, founder,
            marketer, or non-technical person can now generate an app for themselves.
          </p>
          <p className="mt-5 max-w-xl leading-8 text-white/62">
            But the first version is not the same as durable software. The missing piece is a platform that turns
            AI-generated apps into secure, extensible, scalable systems.
          </p>
        </div>

        <div className="order-1">
          <div className="rounded-xl border border-gold/20 bg-gold/8 p-5" data-present-step>
            <div className="mb-3 flex items-center gap-2 text-lg font-semibold leading-7 text-gold">
              <Sparkles className="size-4" />
              Anyone with Claude and Codex can build anything
            </div>
            <p className="text-base leading-7 text-white/62">
              For an MVP, often yes. But durable software still needs structure, security, permissions, data, documents,
              workflows, agents, and room to grow.
            </p>
          </div>

          <div className="mt-4 grid gap-3 md:grid-cols-3">
            {softwareZeroRisks.map((risk) => {
              const Icon = risk.icon;

              return (
                <article key={risk.title} className="rounded-xl border border-line bg-ink/72 p-4" data-present-step>
                  <div className="flex items-center gap-3">
                    <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-white/6 text-mint">
                      <Icon className="size-4" />
                    </span>
                    <h3 className="text-base font-semibold leading-6 text-white">{risk.title}</h3>
                  </div>
                  <p className="mt-3 text-sm leading-6 text-white/54">{risk.detail}</p>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

function ResearchProof() {
  return (
    <section id="research" className="relative overflow-hidden border-t border-line bg-white/[0.025]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_26%,rgba(37,213,155,0.12),transparent_30%),radial-gradient(circle_at_84%_64%,rgba(139,92,246,0.12),transparent_34%),linear-gradient(180deg,rgba(255,255,255,0.026),transparent_52%)]" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/14 to-transparent" />
      <div className="relative mx-auto w-full max-w-7xl px-5 py-24">
        <div className="os7-present-pad" data-present-step>
          <h2 className="text-4xl/[1.3] font-semibold md:text-5xl/[1.3]">
            AI changes not only apps.
            <br />
            It changes software production.
          </h2>
        </div>
        <p className="mt-6 max-w-3xl leading-8 text-white/62">
          If AI can plan, write, test, modify, and maintain software, custom applications become available beyond large companies.
          People and teams can describe how they live or work and get a system shaped around that reality.
        </p>
        <div className="mt-10 grid gap-4 lg:grid-cols-3">
          {quoteCards.map((card) => (
            <a
              key={card.quote}
              href={card.sourceUrl}
              data-present-step
              className="group relative flex min-h-[280px] flex-col overflow-hidden rounded-xl border border-line bg-ink p-5 transition hover:-translate-y-1 hover:border-mint/25 hover:bg-white/[0.035]"
              target="_blank"
              rel="noreferrer"
            >
              <div className="mb-4 text-4xl font-semibold leading-none text-mint/28">“</div>
              <blockquote className="text-xl font-semibold leading-[1.2] text-white">{card.quote}</blockquote>
              <div className="mt-4 h-px bg-line" />
              <p className="mt-4 text-sm font-semibold text-white/72">{card.attribution}</p>
              <p className="mt-auto pt-6 text-sm leading-6 text-white/56 transition group-hover:text-white/72">
                {card.interpretation}
              </p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

function WhoPays() {
  return (
    <section id="who-pays" className="relative scroll-mt-20 overflow-hidden border-t border-line bg-white/[0.018]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_28%,rgba(37,213,155,0.13),transparent_30%),radial-gradient(circle_at_82%_64%,rgba(244,200,103,0.11),transparent_32%),linear-gradient(180deg,rgba(255,255,255,0.026),transparent_52%)]" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/14 to-transparent" />
      <div className="relative mx-auto w-full max-w-7xl px-5 pb-24 pt-12">
        <div className="os7-present-pad mx-auto max-w-3xl text-center" data-present-step>
          <h2 className="text-4xl/[1.3] font-semibold md:text-5xl/[1.3]">Who pays</h2>
        </div>

        <div className="mt-6 grid gap-5 lg:grid-cols-2">
          {whoPaysSegments.map((segment) => {
            const SegmentIcon = segment.icon;

            return (
              <article key={segment.title} className="rounded-xl p-5" data-present-step>
                <div className="flex items-center gap-4">
                  <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-white/6 text-mint">
                    <SegmentIcon className="size-6" />
                  </span>
                  <div>
                    <h3 className="text-2xl font-semibold leading-8 text-white">{segment.title}</h3>
                  </div>
                </div>

                <div className="mt-7 grid gap-3">
                  {segment.points.map((point) => {
                    const Icon = point.icon;

                    return (
                      <div key={point.title} className="rounded-lg border border-line bg-white/[0.035] px-4 py-4">
                        <div className="flex items-center gap-3">
                          <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-white/6 text-mint">
                            <Icon className="size-4" />
                          </span>
                          <h4 className="text-base font-semibold leading-6 text-white">{point.title}</h4>
                        </div>
                        <p className="mt-3 pl-12 text-sm leading-6 text-white/54">{point.detail}</p>
                      </div>
                    );
                  })}
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function BusinessModel() {
  return (
    <section id="business-model" className="relative scroll-mt-20 overflow-hidden border-t border-line bg-white/[0.025]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_22%_22%,rgba(139,92,246,0.13),transparent_30%),radial-gradient(circle_at_78%_70%,rgba(37,213,155,0.12),transparent_34%),linear-gradient(180deg,rgba(255,255,255,0.026),transparent_52%)]" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/14 to-transparent" />
      <div className="relative mx-auto grid w-full max-w-7xl gap-10 px-5 py-24 lg:grid-cols-[0.86fr_1.14fr] lg:items-start">
        <div>
          <div className="os7-present-pad" data-present-step>
            <h2 className="text-4xl/[1.3] font-semibold md:text-5xl/[1.3]">Business model</h2>
            <p className="mt-6 max-w-xl text-2xl font-semibold leading-[1.25] text-white">
              Pay for agents, don't pay for apps
            </p>
            <p className="mt-6 max-w-xl leading-8 text-white/62">
              OS7 separates the app layer from the agent layer. The UI can stay free and unlimited, while paid usage grows
              when agents actually operate workflows, data, documents, and decisions.
            </p>
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          {businessModelPoints.map((point) => {
            const Icon = point.icon;

            return (
              <article key={point.title} className="rounded-xl border border-line bg-ink/72 p-5" data-present-step>
                <div className="flex items-center gap-3">
                  <span className="flex size-11 shrink-0 items-center justify-center rounded-lg bg-white/6 text-mint">
                    <Icon className="size-5" />
                  </span>
                  <h3 className="text-xl font-semibold leading-7 text-white">{point.title}</h3>
                </div>
                <p className="mt-3 text-sm leading-6 text-white/56">{point.detail}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function WhyThisBecomesBig() {
  return (
    <section id="big-market" className="relative scroll-mt-20 overflow-hidden border-t border-line bg-white/[0.018]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_24%,rgba(244,200,103,0.12),transparent_30%),radial-gradient(circle_at_84%_68%,rgba(139,92,246,0.13),transparent_34%),linear-gradient(180deg,rgba(255,255,255,0.026),transparent_52%)]" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/14 to-transparent" />
      <div className="relative mx-auto grid w-full max-w-7xl gap-10 px-5 py-24 lg:grid-cols-[0.74fr_1.26fr] lg:items-start">
        <div className="os7-present-pad" data-present-step>
          <h2 className="text-4xl/[1.3] font-semibold md:text-5xl/[1.3]">Why this becomes big</h2>
          <p className="mt-6 max-w-2xl text-2xl font-semibold leading-[1.25] text-white">
            The whole SaaS stack has to be rewritten for agents, for thousands of companies.
          </p>
          <p className="mt-6 max-w-xl leading-8 text-white/62">
            Existing SaaS was built for humans clicking through fixed interfaces. Agent-native software needs different
            architecture: permissions, memory, APIs, workflows, data models, and operational context designed for agents
            from the start.
          </p>
        </div>

        <div className="grid gap-3">
          {marketExpansionPoints.map((point) => {
            const Icon = point.icon;

            return (
              <article key={point.title} className="rounded-xl border border-line bg-ink/72 p-5" data-present-step>
                <div className="flex items-start gap-4">
                  <span className="flex size-11 shrink-0 items-center justify-center rounded-lg bg-white/6 text-mint">
                    <Icon className="size-5" />
                  </span>
                  <div>
                    <h3 className="text-xl font-semibold leading-7 text-white">{point.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-white/56">{point.detail}</p>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Competition() {
  return (
    <section id="competition" className="relative scroll-mt-20 overflow-hidden border-t border-line bg-white/[0.025]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_72%,rgba(37,213,155,0.12),transparent_30%),radial-gradient(circle_at_82%_24%,rgba(139,92,246,0.13),transparent_34%),linear-gradient(180deg,rgba(255,255,255,0.026),transparent_52%)]" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/14 to-transparent" />
      <div className="relative mx-auto grid w-full max-w-7xl gap-10 px-5 py-24 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
        <div className="os7-present-pad" data-present-step>
          <h2 className="text-4xl/[1.3] font-semibold md:text-5xl/[1.3]">Competition</h2>
          <p className="mt-6 max-w-2xl text-2xl font-semibold leading-[1.25] text-white">
            Many companies will build pieces of this market.
          </p>
          <p className="mt-6 max-w-xl leading-8 text-white/62">
            That is a good signal. AI-native software is becoming inevitable, but the market is too large and fragmented
            for one winner to cover every workflow, data model, permission structure, and company-specific process.
          </p>
          <div className="mt-7 rounded-xl border border-mint/15 bg-mint/[0.045] p-5">
            <p className="text-lg font-semibold leading-7 text-white">
              OS7 competes by becoming the operating layer for company-specific agentic apps.
            </p>
          </div>
        </div>

        <div className="grid gap-3">
          {competitorGroups.map((group) => {
            const Icon = group.icon;

            return (
              <article key={group.title} className="rounded-xl border border-line bg-ink/72 p-5" data-present-step>
                <div className="flex items-start gap-4">
                  <span className="flex size-11 shrink-0 items-center justify-center rounded-lg bg-white/6 text-mint">
                    <Icon className="size-5" />
                  </span>
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="text-xl font-semibold leading-7 text-white">{group.title}</h3>
                      {group.badge && (
                        <span className="rounded-full border border-mint/20 bg-mint/10 px-2.5 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-mint">
                          {group.badge}
                        </span>
                      )}
                    </div>
                    <p className="mt-2 text-sm leading-6 text-white/56">{group.detail}</p>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Ask() {
  return (
    <section id="ask" className="relative scroll-mt-20 overflow-hidden border-t border-line bg-white/[0.018]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_24%,rgba(37,213,155,0.13),transparent_30%),radial-gradient(circle_at_82%_72%,rgba(244,200,103,0.12),transparent_34%),linear-gradient(180deg,rgba(255,255,255,0.026),transparent_52%)]" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/14 to-transparent" />
      <div className="relative mx-auto grid w-full max-w-7xl gap-10 px-5 py-24 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
        <div className="os7-present-pad" data-present-step>
          <h2 className="text-4xl/[1.3] font-semibold md:text-5xl/[1.3]">We ask</h2>
          <p className="mt-6 max-w-2xl text-2xl font-semibold leading-[1.25] text-white">
            Pre-seed: EUR 100k for 20%
          </p>
          <p className="mt-6 max-w-xl leading-8 text-white/62">
            The capital goes into establishing the company, marketing, growth experiments, and acquiring the first active users.
          </p>
        </div>

        <div>
          <div className="rounded-xl border border-mint/15 bg-mint/[0.045] p-6" data-present-step>
            <div className="text-sm font-semibold uppercase tracking-[0.18em] text-mint">Use of funds</div>
            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              <div className="rounded-lg border border-line bg-ink/72 p-4">
                <div className="text-lg font-semibold text-white">Establish company</div>
                <p className="mt-2 text-sm leading-6 text-white/56">Legal registration, bank account, and basic operating setup.</p>
              </div>
              <div className="rounded-lg border border-line bg-ink/72 p-4">
                <div className="text-lg font-semibold text-white">Marketing</div>
                <p className="mt-2 text-sm leading-6 text-white/56">Position OS7 for early adopters and design partners.</p>
              </div>
              <div className="rounded-lg border border-line bg-ink/72 p-4">
                <div className="text-lg font-semibold text-white">First users</div>
                <p className="mt-2 text-sm leading-6 text-white/56">Acquire, onboard, and learn from the first active users.</p>
              </div>
            </div>
          </div>

          <div className="mt-4 grid gap-3 md:grid-cols-3">
            {askStatusPoints.map((point) => {
              const Icon = point.icon;

              return (
                <article key={point.title} className="rounded-xl border border-line bg-ink/72 p-4" data-present-step>
                  <div className="flex items-center gap-3">
                    <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-white/6 text-mint">
                      <Icon className={`size-4 ${point.icon === Loader2 ? "os7-spin" : ""}`} />
                    </span>
                    <h3 className="text-base font-semibold leading-6 text-white">{point.title}</h3>
                  </div>
                  <p className="mt-3 text-sm leading-6 text-white/56">{point.detail}</p>
                </article>
              );
            })}
          </div>

          <div className="mt-4 rounded-xl border border-line bg-ink/72 p-5" data-present-step>
            <div className="flex items-center gap-3 text-lg font-semibold leading-7 text-white">
              <Sparkles className="size-5 text-mint" />
              Next milestone
            </div>
            <p className="mt-2 text-sm leading-6 text-white/56">
              In 6 months, target a seed round at a $1M valuation.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function Team() {
  return (
    <section id="team" className="relative scroll-mt-20 overflow-hidden border-t border-line bg-white/[0.025]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_28%,rgba(139,92,246,0.13),transparent_30%),radial-gradient(circle_at_82%_68%,rgba(37,213,155,0.12),transparent_34%),linear-gradient(180deg,rgba(255,255,255,0.026),transparent_52%)]" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/14 to-transparent" />
      <div className="relative mx-auto grid w-full max-w-7xl gap-10 px-5 py-24 lg:grid-cols-[0.82fr_1.18fr] lg:items-start">
        <div>
          <h2 className="text-4xl/[1.3] font-semibold md:text-5xl/[1.3]">Team</h2>
          <div className="mt-7 rounded-xl border border-mint/15 bg-mint/[0.045] p-6" data-present-step>
            <div className="flex items-start gap-4">
              <img
                src="/assets/anton.jpg"
                alt="Anton Breslavsky"
                className="size-16 shrink-0 rounded-xl border border-line object-cover"
              />
              <div>
                <div className="text-sm font-semibold uppercase tracking-[0.18em] text-mint">Founder</div>
                <h3 className="mt-2 text-3xl font-semibold leading-tight text-white">Anton Breslavsky</h3>
                <p className="mt-4 max-w-xl leading-8 text-white/62">
                  Founder-led execution with a rare mix of long software experience, AI-native development practice,
                  and direct ownership of product, architecture, and early customer learning.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          {founderHighlights.map((point) => {
            const Icon = point.icon;

            return (
              <article key={point.title} className="rounded-xl border border-line bg-ink/72 p-5" data-present-step>
                <div className="mb-5 flex size-11 items-center justify-center rounded-lg bg-white/6 text-mint">
                  <Icon className="size-5" />
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="text-xl font-semibold leading-7 text-white">{point.title}</h3>
                  {point.badge && (
                    <span className="rounded-full border border-mint/20 bg-mint/10 px-2.5 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-mint">
                      {point.badge}
                    </span>
                  )}
                </div>
                <p className="mt-3 text-sm leading-6 text-white/56">{point.detail}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-line px-5 py-10">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-5 text-sm text-white/48 md:flex-row md:items-center md:justify-between">
        <span>OS7 2026 · AI-native operating system</span>
      </div>
    </footer>
  );
}
