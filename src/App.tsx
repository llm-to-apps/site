import { useEffect, useState } from "react";
import {
  ArrowRight,
  BarChart3,
  Building2,
  CalendarCheck,
  ClipboardList,
  CreditCard,
  FolderKanban,
  Gift,
  FileText,
  Mail,
  Loader2,
  Moon,
  PackageCheck,
  Plane,
  Menu,
  PiggyBank,
  Salad,
  Sparkles,
  UsersRound,
  UserRound,
  Workflow
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

type AudienceMode = "you" | "company";

type Scenario = {
  title: string;
  request: string;
  creates: string[];
};

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

const personalScenarios: Scenario[] = [
  {
    title: "Health and energy",
    request: "I want to understand why I am always tired and gradually get my energy back.",
    creates: ["sleep tracker", "energy journal", "symptom log", "weekly health review"]
  },
  {
    title: "Habits and routine",
    request: "I want to build a normal daily routine and stop quitting after one week.",
    creates: ["habit tracker", "routine planner", "consistency dashboard", "weekly adjustment flow"]
  },
  {
    title: "Personal finance",
    request: "I want to stop losing money without understanding where it goes and build an emergency fund.",
    creates: ["budget dashboard", "subscription tracker", "savings goals", "monthly cashflow report"]
  },
  {
    title: "Learning and career",
    request: "I want to move into a new career in six months without getting lost in materials.",
    creates: ["learning roadmap", "resource database", "study plan", "portfolio board"]
  },
  {
    title: "Reflection and clarity",
    request: "I want to understand what is happening with me and make decisions more calmly.",
    creates: ["reflection journal", "mood tracker", "decision log", "patterns dashboard"]
  },
  {
    title: "Documents and life admin",
    request: "I want to organize my documents, bills, insurance, and important life admin.",
    creates: ["document vault", "deadline tracker", "contract database", "life admin dashboard"]
  }
];

const companyScenarios: Scenario[] = [
  {
    title: "Sales and customers",
    request: "I want to see all customers, requests, deal statuses, and next actions in one place.",
    creates: ["CRM", "client database", "pipeline dashboard", "follow-up workflow"]
  },
  {
    title: "Finance and invoices",
    request: "I want to know who paid, who owes us, where payments are overdue, and what cashflow looks like next month.",
    creates: ["invoice dashboard", "cashflow report", "payment tracker", "overdue alerts"]
  },
  {
    title: "Operations",
    request: "I want requests, tasks, documents, and approvals to stop living in chats and spreadsheets.",
    creates: ["request pipeline", "approval workflows", "operations board", "team dashboards"]
  },
  {
    title: "Reports and management",
    request: "I want to see the state of the company every week without manually assembling reports.",
    creates: ["management reports", "KPI dashboard", "anomaly highlights", "weekly review flow"]
  }
];

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
    id: AudienceMode;
    navLabel: string;
    heroLead: string;
    example: string;
    promptExamples: string[];
    result: GeneratedApp[];
    scenarios: Scenario[];
  }
> = {
  you: {
    id: "you",
    navLabel: "For you",
    heroLead:
      "You do not need separate apps for habits, finance, health, learning, and projects. Describe your goal, and OS7 will create a system adapted to you with voice control and chat.",
    example: "I want to get my health under control.",
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
    ],
    scenarios: personalScenarios
  },
  company: {
    id: "company",
    navLabel: "For company",
    heroLead:
      "You do not need separate SaaS tools for CRM, finance, requests, documents, reports, and approvals. Describe how the company works, and OS7 will create a system adapted to your team with voice control and chat.",
    example: "I want to digitize my company.",
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
    ],
    scenarios: companyScenarios
  }
};

const quoteCards: QuoteCard[] = [
  {
    quote: "They really do use it like an operating system.",
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

const defaultPlatformUrl = "https://os7.dev/";

function getClientPlatformUrl() {
  if (typeof window === "undefined") {
    return defaultPlatformUrl;
  }

  return window.__OS7_SITE_CONFIG__?.platformUrl || defaultPlatformUrl;
}

export function App({ platformUrl = getClientPlatformUrl() }: AppProps) {
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
      <Header audience={audience} onAudienceChange={selectAudience} platformUrl={platformUrl} />
      <main>
        <Hero audience={audience} onAudienceChange={selectAudience} platformUrl={platformUrl} />
        <ProblemSlide />
        <AppLibrarySystem />
        <UseCases audience={audience} onAudienceChange={selectAudience} />
        <EndOfSaas />
        <ResearchProof />
      </main>
      <Footer />
    </div>
  );
}

function Header({
  audience,
  onAudienceChange,
  platformUrl
}: {
  audience: AudienceMode;
  onAudienceChange: (mode: AudienceMode) => void;
  platformUrl: string;
}) {
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
          <button
            type="button"
            onClick={() => onAudienceChange("you")}
            className={`text-sm transition ${audience === "you" ? "text-white" : "text-white/62 hover:text-white"}`}
          >
            For you
          </button>
          <button
            type="button"
            onClick={() => onAudienceChange("company")}
            className={`text-sm transition ${audience === "company" ? "text-white" : "text-white/62 hover:text-white"}`}
          >
            For company
          </button>
          <a href="#saas" className="text-sm text-white/62 transition hover:text-white">
            SaaS
          </a>
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
  onAudienceChange,
  platformUrl
}: {
  audience: AudienceMode;
  onAudienceChange: (mode: AudienceMode) => void;
  platformUrl: string;
}) {
  const activeSlide = audienceSlides[audience];

  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_23%_18%,rgba(37,213,155,0.19),transparent_34%),radial-gradient(circle_at_77%_30%,rgba(139,92,246,0.16),transparent_31%),linear-gradient(180deg,rgba(255,255,255,0.035),transparent_42%)]" />
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/16 to-transparent" />
      <div className="relative mx-auto w-full max-w-7xl px-5 pt-8">
        <AudienceSwitch audience={audience} onAudienceChange={onAudienceChange} className="mx-auto max-w-[320px]" compact />
      </div>
      <div className="relative mx-auto grid min-h-[calc(100vh-128px)] w-full max-w-7xl items-center gap-12 px-5 pb-14 pt-10 lg:grid-cols-[0.82fr_1.18fr] lg:pb-16">
        <div>
          <h1 className="max-w-4xl text-3xl font-semibold leading-[1.08] tracking-normal text-white md:text-5xl">
            Build your
            <br />
            {audience === "you" ? "own OS with AI" : "company OS with AI"}
          </h1>
          <p className="mt-7 max-w-2xl text-lg leading-8 text-white/64">
            {activeSlide.heroLead}
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href={platformUrl}
              className="inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-white px-5 text-sm font-semibold text-ink transition hover:bg-white/88"
            >
              Build your system
              <ArrowRight className="size-4" />
            </a>
          </div>
        </div>
        <SystemPreview audience={audience} onAudienceChange={onAudienceChange} />
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

const agentSystemRows = [
  {
    agent: "Money Agent",
    app: "Money Planner",
    icon: PiggyBank
  },
  {
    agent: "Health Agent",
    app: "Sleep & Energy",
    icon: Moon
  },
  {
    agent: "Project Agent",
    app: "Personal Kanban",
    icon: ClipboardList
  },
  {
    agent: "Company Agent",
    app: "Own CRM",
    icon: UsersRound
  }
];

const problemPoints = [
  {
    label: "Too many separate apps",
    detail: "Every area of life or work ends up in another tool."
  },
  {
    label: "Data gets trapped inside each tool",
    detail: "Information exists, but it does not become one useful system."
  },
  {
    label: "Changing software is slow and expensive",
    detail: "People and teams adapt to fixed workflows because custom software used to be costly."
  }
];

function ProblemSlide() {
  return (
    <section id="problem" className="border-y border-line bg-white/[0.018]">
      <div className="mx-auto grid w-full max-w-7xl gap-10 px-5 py-24 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <div>
          <SectionIntro eyebrow="The problem" title="Life and work are scattered across tools that were not built for you" />
          <p className="mt-6 max-w-xl leading-8 text-white/62">
            Habits live in one app. Finances in another. Company work is split across CRM, invoices, spreadsheets,
            chats, documents, and reports. The data exists, but the system does not.
          </p>
        </div>

        <div className="rounded-2xl border border-white/12 bg-panel/82 p-5">
          <div className="grid gap-3">
            {problemPoints.map((point, index) => (
              <div key={point.label} className="rounded-xl border border-line bg-ink/70 p-5">
                <div className="flex items-center gap-3">
                  <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-white/6 text-xs font-semibold text-white/44">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div className="text-base font-semibold text-white">{point.label}</div>
                </div>
                <p className="mt-3 text-sm leading-6 text-white/54">{point.detail}</p>
              </div>
            ))}
          </div>

          <div className="mt-5 rounded-xl border border-line bg-black/25 p-5 text-center">
            <div className="text-xs uppercase tracking-[0.18em] text-white/34">Missing layer</div>
            <div className="mt-3 text-lg font-semibold text-white">A custom operating system</div>
            <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-white/54">
              One system that matches how you live or how your company actually works.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function AppLibrarySystem() {
  return (
    <section id="system" className="border-y border-line bg-white/[0.025]">
      <div className="mx-auto grid w-full max-w-7xl gap-10 px-5 py-24 lg:grid-cols-[0.86fr_1.14fr] lg:items-center">
        <div>
          <SectionIntro eyebrow="How it works" title="Install AI-built apps. Operate them with agents." />
          <p className="mt-6 max-w-xl leading-8 text-white/62">
            OS7 starts from a library of ready-made apps. Install what you need, adapt each app with vibe coding,
            and let specialized subagents operate them through chat, voice, and tools.
          </p>
          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            {["App library", "Vibe coding", "Subagents"].map((item) => (
              <div key={item} className="rounded-lg border border-line bg-ink/70 px-4 py-3 text-sm font-medium text-white/68">
                {item}
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-white/12 bg-panel/82 p-5 shadow-glow">
          <div className="rounded-xl border border-line bg-ink/72 p-5">
            <div className="mx-auto max-w-sm rounded-xl border border-mint/18 bg-mint/8 px-5 py-4 text-center">
              <div className="mx-auto mb-3 flex size-11 items-center justify-center rounded-full bg-mint/10 text-mint">
                <UserRound className="size-5" />
              </div>
              <div className="text-xs uppercase tracking-[0.18em] text-white/36">Control layer</div>
              <div className="mt-2 text-xl font-semibold text-white">Your Agent</div>
              <div className="mt-2 text-sm text-white/54">chat / voice</div>
            </div>

            <div className="mx-auto h-8 w-px bg-line" />

            <div className="grid gap-3 md:grid-cols-2">
              {agentSystemRows.map((row) => {
                const Icon = row.icon;

                return (
                  <div key={row.agent} className="rounded-xl border border-line bg-white/[0.035] p-4">
                    <div className="flex items-center gap-3">
                      <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-white/6 text-mint">
                        <Workflow className="size-4" />
                      </span>
                      <div>
                        <div className="text-sm font-semibold text-white">{row.agent}</div>
                        <div className="text-xs text-white/42">subagent</div>
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
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function UseCases({
  audience,
  onAudienceChange
}: {
  audience: AudienceMode;
  onAudienceChange: (mode: AudienceMode) => void;
}) {
  const slide = audienceSlides[audience];

  return (
    <section id="use-cases" className="mx-auto w-full max-w-7xl px-5 py-24">
      <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
        <SectionIntro
          eyebrow={audience === "you" ? "Life requests" : "Company requests"}
          title={audience === "you" ? "OS7 builds a system for quality of life" : "OS7 builds a system for company operations"}
        />
        <AudienceSwitch audience={audience} onAudienceChange={onAudienceChange} className="lg:max-w-[360px]" />
      </div>
      <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {slide.scenarios.map((scenario) => (
          <ScenarioCard key={scenario.title} scenario={scenario} />
        ))}
      </div>
    </section>
  );
}

function ScenarioCard({ scenario }: { scenario: Scenario }) {
  return (
    <article className="flex min-h-[310px] flex-col rounded-xl border border-line bg-panel p-5">
      <div className="mb-5 flex items-center gap-3">
        <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-mint/10 text-mint">
          <Workflow className="size-5" />
        </span>
        <h3 className="text-lg font-semibold leading-6 text-white">{scenario.title}</h3>
      </div>
      <div className="rounded-lg border border-line bg-ink/80 p-4">
        <p className="text-xs uppercase tracking-[0.18em] text-white/34">Request</p>
        <p className="mt-3 text-sm leading-6 text-white/74">{scenario.request}</p>
      </div>
      <div className="mt-5">
        <p className="text-xs uppercase tracking-[0.18em] text-white/34">OS7 creates</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {scenario.creates.map((item) => (
            <span key={item} className="rounded-md border border-line bg-white/5 px-2.5 py-1.5 text-xs text-white/64">
              {item}
            </span>
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
          <SectionIntro eyebrow="Thesis" title="The end of generic SaaS." />
          <p className="mt-6 max-w-xl leading-8 text-white/62">
            Software used to be expensive, so people and companies bought generic SaaS and adapted to it.
            Now AI sharply lowers the cost of creating software. That means software can adapt to a person or company.
          </p>
        </div>
        <div className="rounded-xl border border-line bg-panel p-5">
          <div className="flex items-center gap-3 border-b border-line pb-4">
            <BarChart3 className="size-5 text-mint" />
            <span className="font-medium">What AI creates</span>
          </div>
          <div className="grid gap-3 pt-5 sm:grid-cols-2">
            {["apps", "databases", "dashboards", "workflows", "admin panels", "reports"].map((item) => (
              <div key={item} className="rounded-lg border border-line bg-ink px-4 py-3 text-sm text-white/70">
                {item}
              </div>
            ))}
          </div>
          <div className="mt-5 rounded-lg border border-line bg-black/25 p-4 text-sm leading-7 text-white/58">
            When software creation becomes dramatically cheaper, generic SaaS is no longer the only answer.
            OS7 makes custom software mainstream: it creates and adapts it for a person or company with voice control and chat.
          </div>
        </div>
      </div>
    </section>
  );
}

function ResearchProof() {
  return (
    <section id="research" className="border-t border-line bg-white/[0.025]">
      <div className="mx-auto w-full max-w-7xl px-5 py-24">
        <SectionIntro eyebrow="Why now" title="AI changes not only apps. It changes software production." />
        <p className="mt-6 max-w-3xl leading-8 text-white/62">
          If AI can plan, write, test, modify, and maintain software, custom applications become available beyond large companies.
          People and teams can describe how they live or work and get a system shaped around that reality.
        </p>
        <div className="mt-10 grid gap-4 lg:grid-cols-3">
          {quoteCards.map((card) => (
            <a
              key={card.quote}
              href={card.sourceUrl}
              className="group flex min-h-[330px] flex-col rounded-xl border border-line bg-ink p-5 transition hover:border-mint/30 hover:bg-white/[0.035]"
              target="_blank"
              rel="noreferrer"
            >
              <div className="mb-5 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.18em] text-mint">
                <Sparkles className="size-4" />
                {card.source}
              </div>
              <blockquote className="text-2xl font-semibold leading-tight text-white">“{card.quote}”</blockquote>
              <p className="mt-4 text-sm font-medium text-white/58">{card.attribution}</p>
              <p className="mt-auto pt-8 text-sm leading-6 text-white/58 transition group-hover:text-white/72">
                {card.interpretation}
              </p>
            </a>
          ))}
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
          <a href="#you" className="transition hover:text-white">
            For you
          </a>
          <a href="#company" className="transition hover:text-white">
            For company
          </a>
        </div>
      </div>
    </footer>
  );
}
