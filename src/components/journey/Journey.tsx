import { useEffect, useRef, useState } from "react";
import { ArrowRight, ArrowUpRight, ChartNoAxesCombined, Flag, Layers3, Lightbulb, Pause, Play, UsersRound } from "lucide-react";
import { Button } from "@/components/ui/button";
import { journeyCarouselItems } from "./chapters";
import { centeredChapter, INITIAL_PAUSE_MS, loopPosition, PIXELS_PER_SECOND } from "./motion";

const stages = [
  { title: "Foundation", body: "Learning & recognition", icon: Lightbulb },
  { title: "Ecosystem", body: "Salesforce innovation", icon: Layers3 },
  { title: "Leadership", body: "Driving social impact", icon: UsersRound },
  { title: "Expansion", body: "Strategic growth", icon: ChartNoAxesCombined },
  { title: "Building", body: "Global organizations", icon: Flag },
];
const count = journeyCarouselItems.length;

export function Journey() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const pausedRef = useRef(false);
  const [paused, setPaused] = useState(false);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    let position = 0;
    let cycle = 0;
    let step = 0;
    let frame = 0;
    let lastTime = 0;
    let startTime: number | null = null;
    let inView = false;
    let currentChapter = 0;
    const measure = () => {
      const first = track.children[0] as HTMLElement | undefined;
      const second = track.children[1] as HTMLElement | undefined;
      const duplicate = track.children[count] as HTMLElement | undefined;
      if (!first || !second || !duplicate) return;
      const oldCycle = cycle;
      cycle = duplicate.offsetLeft - first.offsetLeft;
      step = second.offsetLeft - first.offsetLeft;
      if (oldCycle > 0) position = position / oldCycle * cycle;
      render();
    };
    const render = () => {
      track.style.transform = `translate3d(calc(-1 * var(--journey-card-width) / 2 - ${cycle + position}px), 0, 0)`;
      if (progressRef.current) progressRef.current.style.transform = `scaleX(${(position / Math.max(cycle, 1))})`;
    };
    measure();
    const resize = new ResizeObserver(measure);
    resize.observe(section);
    const observer = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
    }, { threshold: 0.16 });
    observer.observe(section);
    const animate = (time: number) => {
      const delta = lastTime ? Math.min(time - lastTime, 64) : 0;
      lastTime = time;
      if (inView && startTime === null) startTime = time;
      if (inView && startTime !== null && time - startTime >= INITIAL_PAUSE_MS && !pausedRef.current && !media.matches) {
        position = loopPosition(position + delta / 1000 * PIXELS_PER_SECOND, cycle);
        render();
        const next = centeredChapter(position, step, count);
        if (next !== currentChapter) {
          currentChapter = next;
          setActive(next);
        }
      }
      frame = requestAnimationFrame(animate);
    };
    frame = requestAnimationFrame(animate);
    const handleMotion = () => { pausedRef.current = media.matches; setPaused(media.matches); };
    handleMotion();
    media.addEventListener("change", handleMotion);
    return () => {
      cancelAnimationFrame(frame);
      resize.disconnect();
      observer.disconnect();
      media.removeEventListener("change", handleMotion);
    };
  }, []);

  const togglePause = () => {
    pausedRef.current = !pausedRef.current;
    setPaused(pausedRef.current);
  };

  return (
    <section ref={sectionRef} id="experience" className="journey-section">
      <div className="journey-topline">
        <a className="journey-wordmark" href="#experience"><span className="journey-brand-mark"><Layers3 size={18} /></span> THE JOURNEY<span className="wordmark-dot">.</span></a>
        <div className="journey-top-note"><span className="status-dot" /> Always building. Always evolving.</div>
      </div>

      <header className="journey-heading">
        <div className="journey-eyebrow"><span>02 / EXPERIENCE</span><span className="eyebrow-line" /><span>IDEAS INTO IMPACT</span></div>
        <h1>From Foundations to Building<br /><span>Consulting Organizations.</span></h1>
        <p>A journey of continuous learning, leadership, innovation and global impact<br className="desktop-break" /> across technology and consulting.</p>
      </header>

      <div className="journey-carousel" role="region" aria-label="Career journey, chapters 01 through 08" aria-roledescription="carousel">
        <div className="journey-center-guide"><span /></div>
        <div className="journey-center-anchor">
          <div className="journey-track" ref={trackRef}>
            {[0, 1, 2].flatMap((group) => journeyCarouselItems.map((content, index) => {
              const Icon = content.icon;
              return (
                <article key={`${group}-${content.chapter}`} className={`journey-card ${active === index ? "is-active" : ""}`} aria-hidden={group !== 1 ? true : undefined}>
                  <div className="journey-card-header">
                    <div><p className="chapter-label">{content.chapter}</p><p className="chapter-period">{content.period}</p></div>
                    <span className="chapter-number">{String(index + 1).padStart(2, "0")}</span>
                  </div>
                  <div className="journey-card-content">
                    <div className="chapter-title-line"><span className="chapter-icon"><Icon size={21} strokeWidth={1.6} /></span>{content.status && <span className="chapter-status">{content.status}</span>}</div>
                    <h2>{content.title}</h2>
                    <p className="chapter-description">{content.body}</p>
                    <div className="chapter-bottom"><ul className="chapter-tags">{content.tags.map(tag => <li key={tag}>{tag}</li>)}</ul>
                      {content.href && <a href={content.href} target="_blank" rel="noreferrer" className="chapter-link" tabIndex={group !== 1 ? -1 : 0}>{content.linkLabel}<ArrowUpRight size={15} /></a>}
                    </div>
                  </div>
                </article>
              );
            }))}
          </div>
        </div>
      </div>

      <div className="journey-playback">
        <div className="journey-chapter-counter"><span>{String(active + 1).padStart(2, "0")}</span><span className="counter-divider">/</span>08 CHAPTERS</div>
        <div className="journey-progress"><div ref={progressRef} /></div>
        <Button variant="outline" size="icon" className="journey-pause" onClick={togglePause} aria-label={paused ? "Play journey" : "Pause journey"} title={paused ? "Play journey" : "Pause journey"}>{paused ? <Play /> : <Pause />}</Button>
      </div>

      <footer className="journey-stages">
        {stages.map((stage, index) => { const Icon = stage.icon; return <div className="journey-stage" key={stage.title}><span className="stage-icon"><Icon size={20} strokeWidth={1.6} /></span><div><h3>{stage.title}</h3><p>{stage.body}</p></div>{index < stages.length - 1 && <ArrowRight className="stage-arrow" size={16} />}</div>; })}
      </footer>
    </section>
  );
}