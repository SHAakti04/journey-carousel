import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight, BookOpen, Layers3, Pause, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { journeyCarouselItems, type MilestoneContent } from "./chapters";
import { CHAPTER_READ_MS, nextChapter, PAGE_TURN_MS } from "./motion";

const themes = ["Building what’s next.", "Connecting possibilities.", "A new chapter of growth.", "Leadership with purpose.", "Turning insight into action.", "Making data tell a story.", "Bridging worlds.", "Where it all began."];

function ChapterPage({ chapter, index }: { chapter: MilestoneContent; index: number }) {
  const Icon = chapter.icon;
  return <div className="notebook-page-copy">
    <div className="notebook-page-top"><span>THE JOURNEY / {chapter.chapter.toUpperCase()}</span><Icon size={19} strokeWidth={1.5} /></div>
    <div className="notebook-entry">
      <p className="notebook-date"><span />{chapter.period}</p>
      {chapter.status && <span className="notebook-status">{chapter.status}</span>}
      <h2>{chapter.title}</h2>
      <span className="notebook-ink-line" />
      <p className="notebook-description">{chapter.body}</p>
      <ul className="notebook-tags">{chapter.tags.map(tag => <li key={tag}>{tag}</li>)}</ul>
      {chapter.href && <a className="notebook-link" href={chapter.href} target="_blank" rel="noreferrer">{chapter.linkLabel}<ArrowUpRight size={15} /></a>}
    </div>
    <div className="notebook-page-bottom"><span>A STORY STILL BEING WRITTEN</span><span>{String(index + 1).padStart(2, "0")}</span></div>
  </div>;
}

export function Journey() {
  const [active, setActive] = useState(0);
  const [turn, setTurn] = useState<{ target: number; direction: number } | null>(null);
  const [paused, setPaused] = useState(false);
  const [reduced, setReduced] = useState(false);
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const busyRef = useRef(false);
  const content = journeyCarouselItems[active];

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => { setReduced(media.matches); if (media.matches) setPaused(true); };
    update();
    media.addEventListener("change", update);
    const observer = new IntersectionObserver(([entry]) => setVisible(entry?.isIntersecting ?? false), { threshold: 0.2 });
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => { media.removeEventListener("change", update); observer.disconnect(); if (timerRef.current) clearTimeout(timerRef.current); };
  }, []);

  const openChapter = useCallback((target: number, direction = 1) => {
    if (busyRef.current || target === active) return;
    if (reduced) { setActive(target); return; }
    busyRef.current = true;
    setTurn({ target, direction });
    timerRef.current = setTimeout(() => {
      setActive(target);
      setTurn(null);
      busyRef.current = false;
    }, PAGE_TURN_MS);
  }, [active, reduced]);

  useEffect(() => {
    if (paused || turn || !visible) return;
    const timer = setTimeout(() => openChapter(nextChapter(active, 1, journeyCarouselItems.length)), CHAPTER_READ_MS);
    return () => clearTimeout(timer);
  }, [active, paused, turn, visible, openChapter]);

  if (!content) return null;
  const destination = turn ? journeyCarouselItems[turn.target] : undefined;
  const Icon = content.icon;
  return <section ref={sectionRef} id="experience" className="notebook-section" onKeyDown={event => {
    if (event.key === "ArrowRight") { event.preventDefault(); openChapter(nextChapter(active, 1, 8)); }
    if (event.key === "ArrowLeft") { event.preventDefault(); openChapter(nextChapter(active, -1, 8), -1); }
  }}>
    <div className="notebook-nav"><a href="#experience" className="notebook-brand"><Layers3 size={19} />THE JOURNEY<span>.</span></a><span className="notebook-nav-note"><span />Always building. Always evolving.</span></div>
    <header className="notebook-heading"><p className="notebook-eyebrow">02 / EXPERIENCE <span /> EIGHT CHAPTERS. ONE JOURNEY.</p><h1>Every chapter.<br className="notebook-mobile-break" /> <span>A new possibility.</span></h1><p>A journey of learning, leadership and building consulting organizations.</p></header>
    <div className="notebook-stage">
      <div className={`notebook-book ${turn ? "is-turning" : ""}`} role="region" aria-label="Eight-chapter journey notebook">
        <div className="notebook-cover" />
        <div className="notebook-paper-stack" />
        <div className="notebook-left-page">
          <div key={active} className="notebook-chapter-art">
            <div className="notebook-art-top"><BookOpen size={16} /><span>NOTES FROM THE JOURNEY</span></div>
            <div className="notebook-art-center"><span className="notebook-small-label">CHAPTER</span><div className="notebook-big-number">{String(active + 1).padStart(2, "0")}</div><div className="notebook-sketch"><span /><Icon size={45} strokeWidth={1} /><span /></div><p>{themes[active]}</p><span className="notebook-art-period">{content.period}</span></div>
            <div className="notebook-art-bottom"><span>LEARNING. LEADING. BUILDING.</span><span>EST. A LIFETIME OF CURIOSITY</span></div>
          </div>
        </div>
        <div className="notebook-binding">{Array.from({ length: 9 }, (_, i) => <i key={i} />)}</div>
        <div className="notebook-right-page" key={`page-${active}`} aria-live="polite"><ChapterPage chapter={content} index={active} /></div>
        {turn && destination && <div className={`notebook-turning-leaf ${turn.direction < 0 ? "is-backward" : ""}`} aria-hidden="true"><div className="notebook-leaf-front"><ChapterPage chapter={content} index={active} /></div><div className="notebook-leaf-back"><span>{String(turn.target + 1).padStart(2, "0")}</span><BookOpen size={26} /><p>{themes[turn.target]}</p></div></div>}
        <div className="notebook-bookmark"><span>{String(active + 1).padStart(2, "0")}</span></div>
      </div>
    </div>
    <div className="notebook-controls">
      <Button variant="ghost" size="icon" aria-label="Previous chapter" title="Previous chapter" disabled={!!turn} onClick={() => openChapter(nextChapter(active, -1, 8), -1)}><ArrowLeft /></Button>
      <div className="notebook-chapter-tabs" role="tablist" aria-label="Choose chapter">{journeyCarouselItems.map((chapter, index) => <Button key={chapter.chapter} role="tab" aria-selected={index === active} aria-label={`Open ${chapter.chapter}`} variant="ghost" className={`notebook-tab ${index === active ? "is-selected" : ""}`} disabled={!!turn} onClick={() => openChapter(index, index > active ? 1 : -1)}>{String(index + 1).padStart(2, "0")}</Button>)}</div>
      <Button variant="ghost" size="icon" aria-label="Next chapter" title="Next chapter" disabled={!!turn} onClick={() => openChapter(nextChapter(active, 1, 8))}><ArrowRight /></Button>
      <span className="notebook-control-divider" />
      <Button variant="outline" size="icon" className="notebook-play" aria-label={paused ? "Play journey" : "Pause journey"} title={paused ? "Play journey" : "Pause journey"} onClick={() => setPaused(!paused)}>{paused ? <Play /> : <Pause />}</Button>
    </div>
    <footer className="notebook-footer"><span>FROM FOUNDATIONS TO GLOBAL IMPACT</span><span>CHAPTER {String(active + 1).padStart(2, "0")} <span className="notebook-footer-slash">/</span> 08</span></footer>
  </section>;
}
