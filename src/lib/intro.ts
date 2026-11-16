/**
 * Logo intro: plays once per browser session, on the first page a visitor opens.
 *
 * Everything that moves is a CSS animation of `transform` or `opacity` (see "Logo intro" in
 * globals.css), so the browser runs it on the compositor and it stays smooth while React
 * is still loading and hydrating the page underneath.
 *
 * The small script below runs in <head> before the first paint. It decides whether the
 * intro plays and drives it through one flag: a `<style id="intro-on">` element it adds to
 * <head>. The CSS keys every intro rule off that element (`:root:has(#intro-on…)`), so no
 * attribute is ever written to an element React manages, and the page renders normally
 * when the flag is absent (no JavaScript, reduced motion, a repeat visit…).
 *
 * Flag states:  (added) overlay shown, page entrances held
 *               [data-go]    logo loaded and drawn once — the timeline starts
 *               [data-fly]   the header logo was found: the symbol flies into its place
 *               [data-exit]  page scrolling and clicks are released
 *               [data-skip]  the visitor pressed a key / clicked / scrolled: fast exit
 *               [data-done]  overlay removed from rendering
 *               (removed)    every intro rule is gone
 */

/** sessionStorage key that marks the intro as seen for this browser session. */
export const INTRO_STORAGE_KEY = 'efc-intro'

/**
 * Milliseconds after the logo has loaded. These match the CSS:
 *  - `reveal` is the default `--intro-offset` (when the page's own entrance starts);
 *  - by `done` every overlay animation has ended; by `clean` the page's entrance has too.
 */
export const INTRO_TIMELINE = {
  /**
   * Earliest start, counted from when the page's HTML arrives (when this script runs). The
   * browser drops a few frames while it paints a page for the first time; starting the
   * motion after that burst keeps its fast opening frames smooth. The visitor sees a
   * brief, quiet beat of paper first.
   */
  earliest: 320,
  /** Without the logo after this long (slow connection), skip the intro. */
  giveUp: 1800,
  exit: 1800,
  reveal: 2250,
  done: 3300,
  clean: 5200,
} as const

/** Width ÷ height of the supplied artwork (src/assets/brand). */
const LOGO_RATIO = 546 / 579
const MARK_RATIO = 546 / 451

const sameRatio = (width: null | number | undefined, height: null | number | undefined, ratio: number) =>
  Boolean(width && height && Math.abs(width / height / ratio - 1) < 0.01)

type Upload = { height?: null | number; width?: null | number } | null | number | undefined

/**
 * The intro animates the supplied logo artwork. If a different logo has been chosen in
 * Site settings, it is not played, so it can never show an outdated logo.
 */
export const isSuppliedLogo = (logo: Upload): boolean =>
  logo === null || logo === undefined || (typeof logo === 'object' && sameRatio(logo.width, logo.height, LOGO_RATIO))

/** Whether a header logo has the proportions of the supplied symbol (the intro's landing spot). */
export const isSuppliedMark = (width: number, height: number): boolean => sameRatio(width, height, MARK_RATIO)

/**
 * The inline <head> script. Kept as ES5 with no dependencies: it runs before anything else
 * on the page. `logoSrc` is the URL of the logo file the intro layers are cut from (the
 * same URL the <Intro /> overlay uses); the script loads and decodes it before starting.
 */
export const introScript = (logoSrc: string): string => {
  const T = INTRO_TIMELINE

  return `(function(){
var d=document,w=window,K=${JSON.stringify(INTRO_STORAGE_KEY)},SRC=${JSON.stringify(logoSrc)};
try{
if(d.visibilityState==='hidden'||d.prerendering||w.self!==w.top)return;
if(!(w.CSS&&CSS.supports&&CSS.supports('selector(:has(a))')))return;
var mq=function(q){return w.matchMedia(q).matches};
if(mq('(prefers-reduced-motion: reduce)')||mq('(forced-colors: active)'))return;
if(!new URLSearchParams(location.search).has('intro')&&sessionStorage.getItem(K))return;
sessionStorage.setItem(K,'1');
}catch(e){return}
var s=d.createElement('style'),offset='',fly='',state=0,t0=0,timers=[],W0=w.innerWidth;
s.id='intro-on';
var put=function(){s.textContent=(offset?':root{--intro-offset:'+offset+'}':'')+(fly?'.intro{'+fly+'}':'')};
var flag=function(n){s.setAttribute('data-'+n,'')};
var at=function(ms,f){timers.push(setTimeout(function(){try{f()}catch(e){end()}},ms))};
var clear=function(){for(var i=0;i<timers.length;i++)clearTimeout(timers[i]);timers=[]};
var release=function(){if(!w.__introHold)return;w.__introHold=false;if(w.__introPending){w.__introPending=false;if(w.__reveal)w.__reveal()}};
var EV=['keydown','pointerdown','wheel','touchstart','resize'];
var listen=function(on){for(var i=0;i<EV.length;i++){if(on)w.addEventListener(EV[i],skip,{capture:true,passive:true});else w.removeEventListener(EV[i],skip,true)}};
var end=function(){clear();state=3;listen(false);release();if(s.parentNode)s.parentNode.removeChild(s)};
var finish=function(done,clean){at(done,function(){flag('done')});at(clean,end)};
var skip=function(e){
if(state>1)return;
if(e&&e.type==='resize'&&w.innerWidth===W0)return;
offset=(state?Math.round(performance.now()-t0):0)+40+'ms';put();
state=2;clear();listen(false);
flag('go');flag('skip');flag('exit');release();
finish(450,2600);
};
// Where the symbol lands: the header logo, measured once the page is laid out.
var measure=function(){try{
var tg=d.querySelector('[data-intro-target]'),fl=d.querySelector('.intro__fly-x');
if(tg&&fl){var a=fl.getBoundingClientRect(),b=tg.getBoundingClientRect();
if(a.height>0&&b.height>0){
fly='--fly-x:'+(b.left+b.width/2-a.left-a.width/2).toFixed(2)+'px;--fly-y:'+(b.top+b.height/2-a.top-a.height/2).toFixed(2)+'px;--fly-s:'+(b.height/a.height).toFixed(4);
put();flag('fly')}}
}catch(e){}};
var go=function(){
if(state)return;state=1;t0=performance.now();
flag('go');
at(${T.exit},function(){state=2;listen(false);flag('exit')});
at(${T.reveal},release);
finish(${T.done},${T.clean});
};
put();d.head.appendChild(s);
w.__introHold=true;w.__introEnd=end;
listen(true);
var img=new Image(),loaded=false,parsed=d.readyState!=='loading',queued=false,T0=performance.now();
var start=function(){if(!state){try{go()}catch(e){end()}}};
var ready=function(){if(loaded&&parsed&&!state&&!queued){queued=true;setTimeout(function(){measure();requestAnimationFrame(function(){requestAnimationFrame(start)})},Math.max(0,${T.earliest}-(performance.now()-T0)))}};
img.src=SRC;
(img.decode?img.decode():new Promise(function(r,j){img.onload=r;img.onerror=j})).then(function(){loaded=true;ready()},function(){skip()});
if(!parsed)d.addEventListener('DOMContentLoaded',function(){parsed=true;ready()});
at(${T.giveUp},function(){if(!state)skip()});
})();`
}
