import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowUpRight, CalendarDays, Check, CloudRain, FolderKanban, Inbox, LayoutGrid, Library, Mic, Server, Settings, Sparkles, Sun, Timer, Wifi } from "lucide-react";
import { useCerebro, setState } from "@/lib/cerebro-store";
import { Donna } from "@/components/cerebro/Donna";

export const Route = createFileRoute("/")({
  head: () => ({ meta: [{ title: "Cerebro — Hoy" }, { name: "description", content: "La vida, en calma. Cerebro es el espacio personal de Bismarck." }] }),
  component: Home,
});

function useNow() {
  const [now, setNow] = useState<Date | null>(null);
  useEffect(() => { setNow(new Date()); const timer = setInterval(() => setNow(new Date()), 15000); return () => clearInterval(timer); }, []);
  return now;
}

const navigation = [
  { label: "Hoy", icon: LayoutGrid, active: true },
  { label: "Calendario", icon: CalendarDays },
  { label: "Tareas", icon: Check },
  { label: "Áreas", icon: FolderKanban },
];

function Panel({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <section className={`panel ${className}`}>{children}</section>;
}

function Label({ children }: { children: React.ReactNode }) {
  return <p className="label-os">{children}</p>;
}

function Home() {
  const state = useCerebro();
  const now = useNow();
  const hour = now?.getHours() ?? 9;
  const greeting = hour < 12 ? "Buenos días" : hour < 20 ? "Buenas tardes" : "Buenas noches";
  const date = now?.toLocaleDateString("es-ES", { weekday: "long", day: "numeric", month: "long" }) ?? "";

  return (
    <main className="min-h-dvh px-4 pb-32 pt-4 sm:px-6 lg:px-10">
      <header className="mx-auto flex max-w-[1180px] items-center justify-between gap-4 border-b border-white/10 pb-4">
        <div className="flex items-center gap-3">
          <div className="brand-mark">C</div>
          <div><p className="font-display text-sm font-semibold tracking-wide">Cerebro</p><p className="label-os">tu espacio personal</p></div>
        </div>
        <div className="hidden items-center gap-5 text-right sm:flex"><div><Label>servidor</Label><p className="mt-1 flex items-center justify-end gap-2 text-xs text-[#b6c8bc]"><span className="status-dot" /> demo · local</p></div><div className="h-8 w-px bg-white/10" /><button className="capture-button" aria-label="Captura rápida"><Inbox className="h-4 w-4" /><span>Capturar</span></button><button className="icon-button" aria-label="Ajustes"><Settings className="h-4 w-4" /></button></div>
      </header>

      <div className="mx-auto mt-8 max-w-[1180px]">
        <div className="mb-8 flex items-end justify-between gap-4"><div><Label>01 / hoy</Label><h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">{greeting}, Bismarck.</h1><p className="mt-1 text-sm text-muted-foreground capitalize">{date}</p></div><div className="text-right"><p className="font-mono text-2xl tabular-nums text-white/80 sm:text-3xl">{now ? now.toLocaleTimeString("es-ES", { hour: "2-digit", minute: "2-digit" }) : "--:--"}</p><p className="label-os mt-1">{state.demo ? "datos de muestra" : "conectado"}</p></div></div>

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-12">
          <Panel className="hero-panel relative overflow-hidden lg:col-span-7 lg:row-span-2">
            <div className="hero-wash" />
            <div className="relative flex h-full min-h-[360px] flex-col justify-between">
              <div className="flex items-center justify-between"><Label>02 / foco ahora</Label><span className="demo-badge">Demo</span></div>
              <div><p className="mb-4 text-sm text-white/55">{state.task.area}</p><h2 className="max-w-xl text-4xl font-semibold leading-[1.02] tracking-[-0.045em] sm:text-6xl">{state.task.title}</h2><div className="mt-6 border-l-2 border-[#E85002] pl-4"><Label>siguiente acción</Label><p className="mt-2 max-w-md text-base text-white/75">{state.task.next}</p></div></div>
              <div className="mt-8 flex flex-wrap items-center gap-3"><button className="primary-button"><Timer className="h-4 w-4" /> Empezar <ArrowUpRight className="h-4 w-4" /></button><div className="flex rounded-full border border-white/10 p-1">{[25, 50].map((minutes) => <button key={minutes} onClick={() => setState((x) => ({ ...x, duration: minutes }))} className={`rounded-full px-3 py-2 font-mono text-[11px] ${state.duration === minutes ? "bg-white/15 text-white" : "text-white/45"}`}>{minutes} min</button>)}</div></div>
            </div>
          </Panel>

          <Panel className="lg:col-span-5"><div className="flex items-start justify-between"><div><Label>03 / Donna</Label><h3 className="mt-3 text-xl font-semibold">Aquí para despejar</h3></div><Donna compact /></div><p className="mt-5 max-w-sm text-sm leading-relaxed text-muted-foreground">Tu día no tiene que resolverse de una vez. Empieza por una cosa; yo mantengo el resto a salvo.</p><button className="mt-5 flex min-h-11 w-full items-center justify-between rounded-2xl border border-white/10 bg-white/[.03] px-4 text-sm text-white/70 transition hover:bg-white/[.07]"><span className="flex items-center gap-2"><Mic className="h-4 w-4 text-[#8bd7e8]" /> Hablar con Donna</span><ArrowUpRight className="h-4 w-4" /></button></Panel>

          <Panel className="lg:col-span-5"><div className="flex items-start justify-between"><div><Label>04 / el tiempo</Label><h3 className="mt-3 text-xl font-semibold">Una tarde tranquila</h3></div><Sun className="h-5 w-5 text-[#E85002]" /></div><div className="mt-5 flex items-end gap-4"><p className="font-display text-6xl font-semibold tracking-[-.06em]">22°</p><div className="mb-2 text-sm text-muted-foreground"><p>Madrid</p><p>máx. 24° · mín. 15°</p></div></div><div className="mt-5 flex items-center justify-between border-t border-white/10 pt-4 text-xs text-muted-foreground"><span className="flex items-center gap-2"><CloudRain className="h-4 w-4 text-[#8bd7e8]" /> Lluvia posible a las 18:00</span><span>Demo</span></div></Panel>

          <Panel className="lg:col-span-4"><Label>05 / foco de hoy</Label><div className="mt-4 space-y-3">{state.priorities.slice(0, 3).map((item, index) => <div key={item} className="flex items-center gap-3"><span className={`font-mono text-xs ${index === 0 ? "text-[#E85002]" : "text-white/35"}`}>0{index + 1}</span><span className="flex-1 truncate text-sm text-white/75">{item}</span><span className="h-2 w-2 rounded-full border border-white/25" /></div>)}</div><div className="mt-5 flex items-center gap-2 text-xs text-muted-foreground"><Wifi className="h-3.5 w-3.5" /> 3 cosas, nada más</div></Panel>
          <Panel className="lg:col-span-4"><Label>06 / ritmo</Label><div className="mt-4 flex items-center gap-5"><div className="progress-ring"><span>—</span></div><div><p className="text-sm font-medium">Define tus hitos</p><p className="mt-1 text-xs leading-relaxed text-muted-foreground">El progreso aparece cuando tú decides cómo medirlo.</p></div></div></Panel>
          <Panel className="lg:col-span-4"><Label>07 / Donna hizo hoy</Label><div className="mt-4 flex items-start gap-3"><Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-[#E85002]" /><div><p className="text-sm text-white/75">Nada todavía</p><p className="mt-1 text-xs leading-relaxed text-muted-foreground">Cuando Donna actúe, podrás deshacer cada cambio aquí.</p></div></div></Panel>
        </div>
      </div>

      <nav className="dock" aria-label="Navegación principal"><div className="flex items-center gap-1 sm:gap-2">{navigation.slice(0, 2).map(({ label, icon: Icon, active }) => <button key={label} className={`dock-item ${active ? "dock-active" : ""}`}><Icon className="h-4 w-4" /><span>{label}</span></button>)}<button className="dock-donna" aria-label="Abrir Donna"><span className="h-8 w-8 rounded-full bg-orb animate-orb" /></button>{navigation.slice(2).map(({ label, icon: Icon }) => <button key={label} className="dock-item"><Icon className="h-4 w-4" /><span>{label}</span></button>)}<button className="dock-item hidden sm:flex"><Library className="h-4 w-4" /><span>Biblioteca</span></button><button className="dock-item hidden sm:flex"><Server className="h-4 w-4" /><span>Sistema</span></button></div></nav>
      <Donna />
    </main>
  );
}

export default Home;
