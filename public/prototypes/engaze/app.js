// Engaze, the HR companion: an interactive prototype in the Lucid design system. Vanilla JS, one state object, one render().
// Illustrative data. Esha, Manoj, the leave balances, the tax figures and the five principles come from the case study; the rest is invented for the demo.
const MARK=(s=28)=>`<svg class="logo" width="${s}" height="${s}" viewBox="0 0 100 100" aria-hidden="true"><defs><linearGradient id="tv${s}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#6B4CF0"/><stop offset="1" stop-color="#3D2AB8"/></linearGradient></defs><rect x="4" y="4" width="92" height="92" rx="26" fill="url(#tv${s})"/><path d="M27 33h46M50 33v38" stroke="#fff" stroke-width="12" stroke-linecap="round"/><circle cx="73" cy="70" r="7" fill="#9EF0DA"/></svg>`
const EMARK=`<svg class="logo" viewBox="0 0 113 129" aria-hidden="true"><path fill="currentColor" fill-rule="evenodd" d="M55.1 0.4 L54.2 0.6 L51.6 2.1 L49.6 3.0 L47.5 4.9 L44.0 6.2 L42.0 7.9 L40.1 8.8 L37.8 10.5 L34.9 11.8 L32.9 13.4 L29.8 14.5 L29.0 15.0 L27.6 16.5 L26.9 17.0 L25.9 18.0 L25.5 18.6 L25.1 20.1 L25.1 21.4 L25.0 21.5 L25.0 26.8 L25.1 26.9 L25.1 27.9 L25.0 28.0 L25.0 68.1 L24.9 68.2 L24.9 69.6 L24.5 70.4 L23.1 71.6 L22.5 71.9 L21.4 71.9 L20.8 71.5 L19.9 70.5 L19.5 69.1 L19.5 28.2 L19.4 28.1 L19.4 27.5 L18.9 26.4 L17.4 24.5 L16.6 24.0 L15.6 23.9 L14.5 24.4 L13.0 25.9 L12.5 26.8 L12.2 27.6 L12.2 30.4 L12.1 30.5 L12.1 35.1 L12.2 35.2 L12.1 61.9 L11.8 63.1 L11.1 64.4 L10.2 65.1 L9.4 65.1 L8.6 64.8 L8.0 64.1 L7.2 63.0 L6.8 61.1 L6.8 35.4 L6.4 33.5 L6.0 32.5 L5.2 31.6 L4.4 31.2 L2.4 31.2 L1.2 31.6 L0.6 32.2 L0.1 33.8 L0.1 61.8 L0.2 61.9 L0.2 62.6 L0.1 62.8 L0.1 66.8 L0.2 66.9 L0.2 67.5 L0.6 68.4 L1.4 69.1 L2.9 70.0 L4.4 71.2 L7.0 72.8 L8.2 73.9 L9.2 74.5 L12.0 75.5 L14.2 77.2 L17.2 78.6 L18.8 79.8 L20.0 80.4 L21.9 81.0 L24.1 83.1 L27.1 84.2 L29.1 85.9 L30.4 86.5 L31.2 86.8 L32.5 87.4 L34.5 88.8 L37.1 89.9 L38.8 91.2 L41.6 92.9 L43.2 94.2 L44.9 95.1 L45.8 96.0 L46.0 97.1 L45.5 99.0 L44.8 99.8 L44.0 100.0 L42.6 100.0 L41.5 99.6 L40.1 98.4 L36.4 96.8 L34.9 95.5 L32.4 94.4 L29.8 92.4 L27.0 91.2 L24.9 89.6 L22.5 88.4 L20.4 86.9 L16.8 85.4 L14.9 83.8 L12.1 82.2 L10.6 81.1 L7.2 79.8 L5.5 78.2 L4.2 77.9 L2.8 78.2 L1.8 78.8 L1.0 79.5 L0.5 80.6 L0.4 82.0 L0.6 82.8 L1.1 83.4 L2.9 84.5 L3.9 85.4 L7.2 87.2 L8.9 88.6 L11.9 89.9 L14.2 91.6 L17.2 93.0 L18.6 94.1 L19.9 94.8 L21.8 95.4 L24.1 97.5 L26.0 98.1 L27.0 98.6 L28.6 100.0 L29.6 100.6 L31.9 101.5 L33.4 102.9 L33.9 104.0 L33.9 105.0 L33.6 105.5 L32.9 106.1 L32.0 106.5 L30.8 106.8 L30.6 106.6 L29.9 106.6 L27.5 105.9 L26.4 105.2 L24.9 104.0 L23.6 103.4 L20.9 101.5 L19.6 100.9 L18.2 100.5 L16.9 99.9 L14.6 98.0 L12.2 96.8 L10.9 95.5 L9.9 95.0 L8.4 94.6 L6.9 94.0 L5.6 92.8 L5.0 92.4 L3.9 92.2 L1.8 93.0 L1.0 93.8 L0.5 94.8 L0.4 96.5 L0.6 97.1 L1.5 98.0 L2.4 98.5 L4.4 100.1 L6.6 101.2 L8.8 102.9 L11.2 103.9 L13.8 105.8 L17.2 107.4 L18.8 108.5 L20.1 109.1 L21.8 109.6 L23.9 111.8 L27.5 113.2 L28.9 114.4 L29.9 114.9 L32.0 115.0 L33.1 114.8 L34.2 114.2 L36.0 112.8 L38.6 111.5 L40.8 109.9 L43.5 108.8 L45.1 107.4 L46.1 106.8 L48.6 105.8 L50.4 104.4 L53.6 102.9 L55.9 101.2 L58.2 100.2 L60.9 98.4 L63.2 97.4 L65.5 95.5 L68.5 94.4 L70.6 92.8 L71.8 92.2 L73.5 91.1 L74.9 90.0 L76.0 89.5 L77.5 89.4 L77.6 89.2 L79.2 89.4 L79.8 89.6 L80.5 90.4 L80.8 91.1 L80.8 92.8 L80.4 93.6 L79.9 94.1 L77.6 95.1 L76.2 96.0 L75.1 97.0 L73.0 98.0 L71.0 99.8 L70.0 100.2 L68.4 100.6 L67.1 101.1 L65.5 102.6 L63.0 103.9 L61.0 105.4 L57.9 106.6 L55.8 108.5 L52.6 109.8 L51.2 110.9 L50.0 111.6 L47.5 112.4 L45.5 114.2 L43.1 115.5 L42.1 116.6 L41.5 118.1 L41.4 119.2 L41.6 119.9 L42.5 120.6 L44.2 121.2 L45.2 121.2 L48.2 120.4 L49.2 119.8 L50.5 118.6 L53.8 117.1 L55.4 115.9 L58.2 114.6 L60.1 113.1 L63.0 111.6 L65.1 110.0 L68.9 108.5 L70.4 107.2 L72.9 105.9 L74.9 104.4 L75.6 104.0 L77.1 103.6 L78.9 103.6 L79.9 104.0 L80.4 104.5 L80.8 105.5 L80.6 107.5 L80.0 108.4 L78.6 109.1 L77.2 109.6 L74.9 111.5 L72.6 112.6 L70.8 114.2 L68.0 115.1 L67.0 115.6 L65.8 116.9 L62.6 118.4 L61.0 119.8 L59.5 120.5 L58.5 120.8 L57.8 121.1 L54.6 124.1 L54.2 124.9 L54.2 126.1 L54.9 127.9 L55.9 128.8 L57.2 128.9 L58.6 128.5 L59.6 128.0 L61.1 126.9 L63.2 125.8 L64.6 124.6 L66.1 123.9 L67.2 123.6 L68.8 123.0 L70.2 121.8 L73.1 120.1 L74.6 118.9 L77.6 117.6 L80.2 115.6 L83.2 114.6 L85.4 112.6 L86.0 112.2 L87.2 110.9 L87.8 109.0 L87.8 90.8 L87.9 90.6 L87.9 86.5 L87.8 86.4 L87.8 78.8 L87.9 78.6 L87.9 77.5 L87.8 77.4 L87.8 73.5 L87.9 73.4 L87.8 61.6 L88.1 60.2 L88.8 59.0 L89.9 57.9 L90.8 57.5 L91.2 57.5 L91.9 57.8 L92.9 58.6 L93.4 59.9 L93.4 61.2 L93.2 61.4 L93.2 65.0 L93.4 65.1 L93.4 70.9 L93.2 71.0 L93.4 93.9 L93.2 94.0 L93.2 96.5 L93.4 96.6 L93.4 101.2 L93.9 102.8 L94.6 103.8 L95.9 105.0 L96.6 105.4 L97.2 105.4 L98.6 104.6 L99.9 103.2 L100.4 102.2 L100.5 101.6 L100.5 81.8 L100.6 81.6 L100.5 68.0 L100.9 66.6 L101.5 65.4 L102.5 64.4 L103.6 64.5 L104.9 65.5 L105.4 66.4 L105.8 67.8 L105.8 69.5 L105.9 69.6 L105.9 80.6 L106.0 80.8 L106.0 93.5 L106.1 93.6 L106.1 94.5 L106.5 96.2 L106.9 97.0 L107.4 97.5 L108.1 97.9 L110.5 97.8 L111.4 97.4 L112.1 96.5 L112.5 95.1 L112.5 93.9 L112.6 93.8 L112.6 66.6 L112.8 66.5 L112.8 65.1 L112.6 65.0 L112.6 62.0 L112.2 61.0 L111.4 60.1 L110.5 59.6 L109.0 58.4 L106.4 57.0 L103.8 54.9 L100.9 53.8 L99.2 52.4 L95.9 50.8 L94.4 49.6 L93.1 49.0 L91.0 48.2 L88.8 46.1 L85.4 44.8 L83.4 43.1 L80.4 41.8 L79.1 40.9 L77.6 40.1 L76.0 39.5 L73.5 37.6 L71.2 36.4 L69.6 35.0 L68.0 34.2 L67.4 33.8 L66.9 32.6 L67.0 31.4 L67.4 30.5 L68.1 29.8 L69.1 29.5 L70.0 29.5 L71.1 29.9 L72.9 31.4 L75.1 32.1 L76.1 32.6 L78.4 34.4 L81.0 35.5 L82.6 36.8 L86.2 38.4 L87.5 39.4 L89.6 40.6 L92.8 42.9 L94.9 43.8 L97.0 45.2 L100.6 47.1 L102.0 48.1 L105.5 49.5 L107.1 51.0 L107.8 51.4 L108.4 51.5 L109.4 51.4 L110.6 50.9 L112.0 49.5 L112.5 48.2 L112.5 47.0 L112.1 46.2 L111.6 45.8 L109.9 44.8 L108.2 43.4 L106.2 42.4 L103.8 40.5 L101.0 39.4 L98.9 37.8 L95.8 36.4 L93.9 35.0 L92.9 34.5 L91.2 34.0 L90.5 33.5 L89.8 32.5 L88.9 31.8 L87.6 31.2 L86.5 31.0 L85.1 30.2 L83.5 28.9 L81.5 27.8 L80.0 26.2 L79.2 25.0 L79.2 24.1 L80.1 23.2 L81.4 22.8 L82.8 22.8 L85.6 23.8 L88.6 25.9 L89.9 26.5 L92.4 28.4 L95.1 29.5 L97.2 31.1 L100.5 32.6 L102.1 33.9 L105.9 35.4 L107.2 36.8 L108.5 37.1 L109.4 37.0 L111.1 36.2 L111.8 35.6 L112.4 34.5 L112.5 32.8 L112.2 32.1 L111.6 31.4 L110.4 30.6 L108.8 29.2 L105.6 27.6 L103.6 26.0 L100.9 24.9 L99.1 23.5 L97.5 22.6 L95.6 21.9 L94.0 20.6 L93.0 20.1 L91.1 19.5 L90.4 19.0 L88.6 17.2 L86.6 16.6 L85.6 16.1 L83.9 14.8 L82.9 14.2 L81.8 14.1 L81.6 14.2 L79.9 14.4 L78.5 14.9 L77.0 16.1 L74.2 17.6 L72.5 19.0 L71.2 19.6 L69.9 20.0 L68.8 20.5 L65.8 22.8 L64.1 23.5 L62.2 24.9 L59.9 25.9 L57.0 28.0 L53.9 29.4 L52.0 30.8 L49.6 31.8 L47.5 33.6 L44.2 34.9 L42.4 36.4 L40.4 37.5 L38.0 39.1 L36.6 39.6 L35.0 39.6 L33.9 39.2 L33.1 38.6 L32.6 37.2 L32.6 36.1 L32.9 35.6 L33.5 35.0 L36.1 33.6 L37.8 32.4 L39.9 31.5 L41.9 29.6 L42.5 29.2 L45.2 28.4 L47.4 26.6 L50.0 25.4 L52.0 23.9 L55.8 22.4 L57.5 21.0 L60.0 19.6 L61.8 18.4 L64.6 17.0 L67.1 15.2 L69.9 14.0 L71.1 12.9 L71.6 11.5 L71.6 10.5 L71.2 9.5 L70.4 8.6 L68.6 7.8 L67.4 7.8 L64.1 9.0 L62.0 10.6 L59.2 11.9 L57.1 13.5 L54.5 14.6 L51.6 16.5 L49.6 17.4 L48.0 18.9 L47.2 19.4 L43.8 20.8 L42.1 22.1 L40.0 23.2 L38.2 24.6 L37.0 25.2 L35.2 25.6 L33.8 25.5 L33.0 25.1 L32.4 24.2 L32.2 23.0 L32.8 21.5 L33.6 20.6 L35.5 19.6 L37.5 18.1 L39.9 17.1 L42.1 15.1 L45.9 13.8 L47.1 12.6 L49.9 11.1 L51.5 9.9 L53.2 9.0 L55.0 8.5 L55.8 8.1 L56.9 7.1 L57.8 6.0 L58.4 4.9 L58.6 3.9 L58.5 2.4 L58.2 1.6 L57.5 0.8 L56.8 0.4Z M55.8 36.9 L57.1 36.9 L59.9 37.8 L63.5 40.1 L64.6 40.5 L65.9 41.1 L67.4 42.2 L70.8 43.8 L72.9 45.8 L75.9 46.9 L77.6 48.2 L79.5 49.2 L80.2 49.9 L80.8 50.9 L80.9 52.5 L81.0 52.6 L81.0 68.0 L80.9 68.1 L80.6 71.5 L80.2 73.4 L79.8 74.4 L79.0 75.2 L78.4 76.4 L77.2 79.5 L73.8 83.1 L72.8 83.8 L71.1 85.2 L69.9 85.9 L67.2 86.8 L65.5 88.2 L62.5 89.8 L60.9 91.1 L56.8 92.6 L55.5 92.6 L53.2 92.0 L52.0 91.4 L50.4 90.0 L47.4 88.8 L45.1 86.9 L44.0 86.4 L41.9 85.8 L41.2 85.4 L40.0 84.1 L39.2 83.6 L36.6 82.5 L34.8 81.1 L33.0 80.2 L32.2 79.5 L31.9 78.6 L31.9 78.0 L31.8 77.9 L31.8 61.4 L32.0 60.1 L32.1 57.9 L32.5 56.0 L33.1 54.8 L34.0 53.6 L35.4 50.2 L37.9 47.9 L38.2 47.2 L39.0 46.5 L40.5 45.5 L41.9 44.1 L42.6 43.6 L45.8 42.4 L47.1 41.2 L49.8 39.9 L52.1 38.1Z "/></svg>`
const CO='Tervana',APP='Engaze'
const sv=(d,v='0 0 20 20')=>`<svg viewBox="${v}" fill="none" stroke="currentColor" stroke-width="1.5">${d}</svg>`
const I={
 bell:sv('<path d="M5 14V9a5 5 0 0110 0v5l1.5 1.5h-13zM8.5 17.5h3"/>'),
 help:sv('<circle cx="10" cy="10" r="7.5"/><path d="M8 8a2 2 0 113 1.7c-.7.4-1 .8-1 1.6M10 14v.2"/>'),
 menu:sv('<path d="M3.5 6h13M3.5 10h13M3.5 14h13"/>'),
 day:sv('<rect x="3.5" y="4.5" width="13" height="12" rx="2"/><path d="M3.5 8.5h13M7 3v3M13 3v3"/>'),
 plus:sv('<path d="M10 4v12M4 10h12"/>'),
 chat:sv('<path d="M4 5.5A1.5 1.5 0 015.5 4h9A1.5 1.5 0 0116 5.5v7a1.5 1.5 0 01-1.5 1.5H9l-3.5 2.5V14h0A1.5 1.5 0 014 12.5z"/>'),
 send:sv('<path d="M10 16V4M5 9l5-5 5 5"/>'),
 clip:sv('<path d="M15 9.5l-5.3 5.3a3.3 3.3 0 01-4.7-4.7l5.6-5.6a2.2 2.2 0 013.1 3.1l-5.5 5.5a1.1 1.1 0 01-1.6-1.6l5-5"/>'),
 check:sv('<path d="M4 10.5l3.5 3.5L16 6"/>'),
 chev:sv('<path d="M5 8l5 5 5-5"/>'),
 arrow:sv('<path d="M4 10h12M11 5l5 5-5 5"/>'),
 back:sv('<path d="M16 10H4M9 5l-5 5 5 5"/>'),
 x:sv('<path d="M5 5l10 10M15 5L5 15"/>'),
 book:sv('<path d="M4 4.5A1.5 1.5 0 015.5 3H16v12H5.5A1.5 1.5 0 004 16.5zM4 16.5A1.5 1.5 0 005.5 18H16"/>'),
 shield:sv('<path d="M10 2.5l6 2.5v4.5c0 3.8-2.6 6.6-6 8-3.4-1.4-6-4.2-6-8V5zM7.2 10l2 2 3.6-3.8"/>'),
 thumb:sv('<path d="M6.5 9l3-6c1.2 0 2 .9 2 2v2.5h3.7a1.5 1.5 0 011.5 1.8l-1.1 5.5a1.5 1.5 0 01-1.5 1.2H6.5zM6.5 9H3.5v8h3"/>'),
 copy:sv('<rect x="7" y="7" width="9.5" height="9.5" rx="1.5"/><path d="M13 7V4.5A1 1 0 0012 3.5H4.5a1 1 0 00-1 1V12a1 1 0 001 1H7"/>'),
 retry:sv('<path d="M4 10a6 6 0 1 0 2-4.5M4 4v3h3"/>'),
 undo:sv('<path d="M7 5L3.5 8.5 7 12M4 8.5h8a4.5 4.5 0 010 9H9"/>'),
 cog:sv('<circle cx="10" cy="10" r="2.5"/><path d="M10 2.5v2M10 15.5v2M2.5 10h2M15.5 10h2M4.7 4.7l1.4 1.4M13.9 13.9l1.4 1.4M4.7 15.3l1.4-1.4M13.9 6.1l1.4-1.4"/>'),
 out:sv('<path d="M8 4H4.5v12H8M12 6l4 4-4 4M16 10H8"/>'),
 lock:sv('<rect x="4.5" y="9" width="11" height="8" rx="1.5"/><path d="M7 9V6.5a3 3 0 016 0V9"/>'),
 sun:sv('<circle cx="10" cy="10" r="3.5"/><path d="M10 2v2M10 16v2M2 10h2M16 10h2M4.3 4.3l1.4 1.4M14.3 14.3l1.4 1.4M4.3 15.7l1.4-1.4M14.3 5.7l1.4-1.4"/>'),
 wallet:sv('<rect x="3" y="5.5" width="14" height="10.5" rx="2"/><path d="M3 8.5h14M13 12h1.5"/>'),
 chart:sv('<path d="M4 16V9M8.5 16V4M13 16v-5M17 16H3"/>'),
 pen:sv('<path d="M12.5 4.5l3 3L7 16H4v-3zM11 6l3 3"/>'),
 clock:sv('<circle cx="10" cy="10" r="7"/><path d="M10 6v4l2.5 2"/>'),
 doc:sv('<path d="M6 2.5h5.5L15 6v11.5H6zM11 2.5V6h4"/>'),
 heart:sv('<path d="M10 16s-6-3.6-6-8a3.3 3.3 0 016-1.8A3.3 3.3 0 0116 8c0 4.4-6 8-6 8z"/>'),
}
const ORB=(sm,think)=>`<span class="orb ${sm?'sm':''} ${think?'think':''}">${EMARK}</span>`
/* entry animations play once: a key that was not on screen in the last render gets the class a */
let prevOn=new Set(),nowOn=new Set()
const an=k=>{nowOn.add(k);return prevOn.has(k)?'':'a'}
const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches

/* ---------- data ---------- */
const ME={n:'Esha Sharma',f:'Esha',r:'Senior Dev Lead',i:'ES',mail:'esha.sharma@tervana.com'}
const PROMPTS=[
 {k:'leave',t:'I need a sick leave for today.',i:'heart'},
 {k:'bal',t:'My leave balance',i:'sun'},
 {k:'ctc',t:'Show my CTC breakup',i:'chart'},
 {k:'fb',t:'Write a feedback for Arjun',i:'pen'},
 {k:'tax',t:'Old versus new tax regime for me',i:'wallet'},
 {k:'carry',t:'Can I carry forward unused leave?',i:'book'},
]
const STEPS={
 leave:[['Sick leave, for today','the leave type and the date'],['5 of 12 days left','her balance'],['What the policy allows','read before anything is applied'],['Manoj and the Platform team','who needs to know']],
 bal:[['Read your leave balances','as of today']],
 ctc:[['Read your compensation letter','2026 cycle']],
 fb:[['Read Arjun’s goals for this cycle','three goals'],['Looked at your shared work','last quarter']],
 tax:[['Read your declarations','FY 2026-27'],['Ran both regimes on your numbers','old and new'],['Checked the switch deadline','31 January']],
 carry:[['Searched the leave policy','v4.2']],
 ooo:[['Looked at your calendar','today'],['Matched the tone of your last out-of-office','']],
 fallback:[],
}
const TITLES={leave:'Sick leave today',bal:'Leave balance',ctc:'CTC breakup',fb:'Feedback for Arjun',tax:'Tax regime, FY 2026-27',carry:'Carrying leave forward',ooo:'Out-of-office',fallback:'Getting started'}
const route=t=>{t=t.toLowerCase()
 if(/sick|fever|unwell|leave (for )?today|day off|not well/.test(t))return'leave'
 if(/balance|how many (days|leaves)/.test(t))return'bal'
 if(/ctc|salary|pay ?slip|compensation|breakup|break-up/.test(t))return'ctc'
 if(/feedback|review for|appraisal/.test(t))return'fb'
 if(/tax|regime/.test(t))return'tax'
 if(/carry|forward|lapse/.test(t))return'carry'
 if(/out.of.office|ooo/.test(t))return'ooo'
 return'fallback'}
const fresh=()=>({turns:[],input:'',thread:null,bal:{sick:5,casual:4,earned:11},dd:null,menu:false,bell:false,help:false,dialog:null,drawer:null,toast:null,
 prefs:{length:'Short',lang:'English',notify:true},mem:{short:true,pune:true,manager:true},
 st:{},fbDraft:null,fbTone:'Warm',fbFocus:'Strengths',leaveLen:'1'})
let S=fresh(),uid=1

/* ---------- small parts ---------- */
const sel=(id,val,opts,act,cls='')=>`<div class="sel ${cls}"><button type="button" data-a="dd" data-id="${id}" aria-haspopup="listbox" aria-expanded="${S.dd===id}">${(opts.find(o=>o.v===val)||{}).l||val}${I.chev}</button>${S.dd===id?`<div class="opts ${an('dd'+id)}" role="listbox">${opts.map(o=>`<button type="button" role="option" aria-selected="${o.v===val}" data-a="${act}" data-v="${o.v}"><span>${o.l}${o.s?`<small>${o.s}</small>`:''}</span>${o.v===val?I.check:''}</button>`).join('')}</div>`:''}</div>`
const src=t=>`<span class="src">${I.book}${t}</span>`
const fb=(id,srcs=[])=>`<div class="fb"><button class="ic" aria-label="Helpful" aria-pressed="${!!S.st['up'+id]}" data-a="up" data-id="${id}">${I.thumb}</button><button class="ic" aria-label="Copy" data-a="copy">${I.copy}</button><button class="ic" aria-label="Try again" data-a="retry" data-id="${id}">${I.retry}</button>${srcs.length?`<span class="srcs">${srcs.map(src).join('')}</span>`:''}</div>`
const meter=(v,t,c='')=>`<span class="meter ${c}"><i style="width:${v/t*100}%"></i></span>`

/* ---------- frame ---------- */
function render(){
 nowOn=new Set()
 const app=document.getElementById('app')
 const keep=document.activeElement&&document.activeElement.id==='q'?document.activeElement.selectionStart:null
 const sc=document.querySelector('.scroll'),top=sc?sc.scrollTop:0
 app.innerHTML=`<div class="app">${topbar()}<div class="body"><aside class="nav hide-m">${threads()}</aside>${main()}<aside class="ctx">${context()}</aside></div></div>${drawer()}${dialog()}${S.toast?`<div class="toast ${an('toast'+S.toast)}" role="status">${S.toast}</div>`:''}`
 const s2=document.querySelector('.scroll');if(s2){s2.scrollTop=S._stick?s2.scrollHeight:top;S._stick=false}
 if(keep!==null){const q=document.getElementById('q');q.focus();q.setSelectionRange(keep,keep)}
 prevOn=nowOn
}
function topbar(){return `<header class="top">
 <button class="ic only-m" data-a="drawer" data-v="nav" aria-label="Conversations">${I.menu}</button>
 <button class="brand" data-a="home" aria-label="${APP} home">${MARK(28)}<span class="co">${CO}</span><span class="sep"></span><span class="app-n">${APP}</span></button><span class="sp"></span>
 <button class="ic only-t" data-a="drawer" data-v="ctx" aria-label="Your day">${I.day}</button>
 <span class="anc"><button class="ic" data-a="bell" aria-label="Notifications" aria-haspopup="true" aria-expanded="${S.bell}">${I.bell}<span class="dot"></span></button>${S.bell?`<div class="menu ${an('bell')}" style="width:340px"><div class="mh"><span class="t-sub">Notifications</span></div>${[['tax','You could save about ₹24,000 in tax','Today, 09:02'],['carry','One earned leave day lapses on 31 December','Yesterday']].map(n=>`<button class="item" data-a="ask" data-k="${n[0]}"><span class="orb sm">${EMARK}</span><span><span style="display:block">${n[1]}</span><span class="t-small">${n[2]}</span></span></button>`).join('')}</div>`:''}</span>
 <span class="anc hide-m"><button class="ic" data-a="help" aria-label="Help" aria-haspopup="true" aria-expanded="${S.help}">${I.help}</button>${S.help?`<div class="menu ${an('help')}" style="width:320px"><div class="mh"><span class="t-sub">How ${APP} works</span></div><div style="padding:0 10px 10px;font-size:13.5px;color:var(--ink-2);line-height:1.55">Ask in your own words. ${APP} reads what you mean, shows how it worked it out, cites the policy it used, and checks with you before it acts. It sounds the same every time: warm first, then clear.</div><hr><button data-a="ask" data-k="fallback">${I.chat}What can you do?</button></div>`:''}</span>
 <span class="anc"><button class="me" data-a="menu" aria-label="Your profile" aria-haspopup="true" aria-expanded="${S.menu}"><span class="av">${ME.i}</span><span class="n hide-m">${ME.n}</span><span class="hide-m" style="display:grid">${I.chev.replace('<svg','<svg width="12" height="12"')}</span></button>${S.menu?`<div class="menu ${an('menu')}"><div style="padding:10px 10px 8px;display:flex;gap:10px;align-items:center"><span class="av">${ME.i}</span><div><div class="b">${ME.n}</div><div class="t-small">${ME.r} · Platform team</div></div></div><hr><button data-a="settings">${I.cog}Settings</button><button data-a="reset">${I.retry}Reset the prototype</button><hr><button data-a="back">${I.out}Back to the case study</button></div>`:''}</span>
</header>`}
function threads(){
 const t=S.thread
 return `<button class="new" data-a="home">${I.plus}New conversation</button>
 ${t?`<div class="cap">Today</div><button class="th on" data-a="noop">${I.chat}<span>${t}</span></button>`:''}
 <div class="cap">Earlier</div>
 ${['Cab reimbursement, Pune','My learning plan','Update my address','Payslip for October'].map(x=>`<button class="th" data-a="toast" data-v="Earlier conversations are not part of this prototype.">${I.chat}<span>${x}</span></button>`).join('')}
 <div class="nav-foot"><a href="/craft/engaze">${I.back}Back to the case study</a><p class="t-small" style="margin-top:4px">A prototype with sample data. Nothing is sent anywhere.</p></div>`}
function context(){const b=S.bal
 return `<section class="panel"><div class="t-sub">Your time off</div><div class="bal">
  <div class="r"><span>Sick leave</span><b class="num">${b.sick} of 12 left</b>${meter(b.sick,12)}</div>
  <div class="r"><span>Casual leave</span><b class="num">${b.casual} of 10 left</b>${meter(b.casual,10)}</div>
  <div class="r"><span>Earned leave</span><b class="num">${b.earned} of 18 left</b>${meter(b.earned,18)}</div></div></section>
 <section class="panel"><div class="t-sub">Worth a look</div>
  <button class="todo" data-a="ask" data-k="tax"><i style="background:var(--primary)"></i><span><b>Compare your tax regimes</b><span class="t-small">Switching closes on 31 January</span></span></button>
  <button class="todo" data-a="ask" data-k="carry"><i style="background:var(--med)"></i><span><b>One leave day lapses</b><span class="t-small">On 31 December</span></span></button></section>
 <section class="panel"><div class="t-sub">What ${APP} can see</div><ul class="seeit">
  <li>${I.sun}Leave balances and history</li><li>${I.wallet}Payslips and tax declarations</li><li>${I.book}Company policies</li><li>${I.clock}Your calendar, today only</li></ul></section>
 <section class="panel"><div class="t-sub">What ${APP} remembers</div>
  ${[['short','You prefer short answers'],['pune','You work from the Pune office'],['manager','Your manager is Manoj Kumar']].map(([k,l])=>`<button class="mem" role="switch" aria-checked="${S.mem[k]}" data-a="mem" data-k="${k}"><span>${l}</span><span class="switch ${S.mem[k]?'on':''}"></span></button>`).join('')}
  <p class="t-small" style="margin-top:8px">Turn anything off and ${APP} stops using it.</p></section>`}
function main(){
 const empty=!S.turns.length
 const busy=S.turns.some(t=>t.from==='e'&&!t.ready)
 return `<main class="main"><div class="scroll"><div class="col">${empty?hello():`<div class="thread" aria-live="polite">${S.turns.map(turn).join('')}</div>`}</div></div>
 <div class="dock"><div class="col"><form class="composer" data-a="form"><input id="q" autocomplete="off" value="${S.input.replace(/"/g,'&quot;')}" placeholder="${busy?`${APP} is working it out…`:'Ask about leave, pay, tax or policies'}" aria-label="Message ${APP}"><button type="button" class="ic hide-m" aria-label="Attach a file" data-a="toast" data-v="Attachments are not part of this prototype.">${I.clip}</button><button class="send" type="submit" aria-label="Send" ${S.input.trim()&&!busy?'':'disabled'}>${I.send}</button></form>
 <p class="fine">${I.lock}Only you can see this conversation. ${APP} checks with you before it acts.</p></div></div></main>`}
function hello(){const h=new Date().getHours(),g=h<12?'Good morning':h<17?'Good afternoon':'Good evening'
 return `<section class="hello fade ${an('hello')}">${ORB()}<h1>${g}, ${ME.f}.</h1><p>Two things are worth a look today. Or ask anything about your leave, pay, tax or policies.</p>
 <div class="nudges">
  <button class="nudge" data-a="ask" data-k="tax"><span class="k"><i style="background:var(--primary)"></i>Tax</span><strong>You could save about ₹24,000 this year</strong><span class="d">The new regime fits your declarations better. Switching closes on 31 January.</span><em>Compare for me ${I.arrow}</em></button>
  <button class="nudge" data-a="ask" data-k="carry"><span class="k"><i style="background:var(--med)"></i>Leave</span><strong>One earned leave day lapses on 31 December</strong><span class="d">You have 11 earned days. Ten carry forward.</span><em>Show the rule ${I.arrow}</em></button>
 </div>
 <div class="suggest"><div class="t-lab">Or try</div><div class="chips">${PROMPTS.filter(p=>!['tax','carry'].includes(p.k)).map(p=>`<button data-a="ask" data-k="${p.k}">${I[p.i]}${p.t}</button>`).join('')}</div></div></section>`}

/* ---------- turns ---------- */
function turn(t){
 if(t.from==='me')return `<p class="msg-me fade ${an('m'+t.id)}">${t.text}</p>`
 const st=STEPS[t.k]||[]
 const stepsHtml=st.length?`<ul class="steps ${t.ready?'done':''}">${t.ready?`<li class="h" data-a="steps" data-id="${t.id}">${I.check.replace('<svg','<svg width="12" height="12"')} Worked it out in ${st.length} step${st.length>1?'s':''} ${t.open?'':'· show'}</li>${t.open?st.map(s=>`<li><span class="ck">${I.check}</span><span>${s[0]} <small>${s[1]}</small></span></li>`).join(''):''}`:`<li class="h">Working it out</li>${st.slice(0,t.n+1).map((s,i)=>`<li>${i<t.n?`<span class="ck">${I.check}</span>`:'<span class="spin"></span>'}<span>${s[0]} <small>${s[1]}</small></span></li>`).join('')}`}</ul>`:''
 return `<div class="turn fade ${an('t'+t.id)}">${ORB(true,!t.ready)}<div><div class="who">${APP}</div>${stepsHtml}${t.ready?`<div class="fade ${an('r'+t.id)}">${(R[t.k]||R.fallback)(t)}</div>`:''}</div></div>`}

const R={
 leave(t){const s=S.st[t.id]||'draft',n=+S.leaveLen
  if(s==='applied'||s==='undone'){const left=S.st['u'+t.id]||0
   return s==='undone'?`<p class="say">Undone. Your sick leave is back to ${S.bal.sick} of 12 days. Nobody was told.</p><div class="chips" style="margin-top:12px"><button data-a="leave-apply" data-id="${t.id}">Apply it again</button></div>`:
   `<div class="card"><div class="done-row"><span class="tick">${I.check}</span><div class="x"><b>Sick leave applied for ${n===1?'today':'today and tomorrow'}</b><p>Approved within policy. Manoj and the Platform team know you’re out.</p></div>${left>0?`<button class="btn btn-g btn-sm" data-a="leave-undo" data-id="${t.id}">${I.undo}Undo · ${left}s</button>`:''}</div></div>
   <p class="say" style="margin-top:14px">Rest up, ${ME.f}. Anything else for today?</p><div class="chips" style="margin-top:10px"><button data-a="ask" data-k="ooo">Set an out-of-office</button><button data-a="ask" data-k="bal">My leave balance</button></div>${fb(t.id)}`}
  const after=S.bal.sick-n
  return `<p class="say">Sorry you’re unwell, ${ME.f}. Rest up. I’ve got sick leave ready for today. Have a look before I apply it.</p>
  <div class="card"><div class="hd"><span class="chip c-p">Sick leave</span>${src('Leave policy §3.2')}</div><div class="bd">
   <dl class="kv"><div><dt>When</dt><dd>${n===1?'Today':'Today and tomorrow'}</dd></div><div><dt>Length</dt>${s==='edit'?`<dd style="margin-top:4px">${sel('len',S.leaveLen,[{v:'1',l:'1 day',s:'Today'},{v:'2',l:'2 days',s:'Today and tomorrow'}],'set-len')}</dd>`:`<dd>${n} day${n>1?'s':''}</dd>`}</div><div><dt>Balance after</dt><dd class="num">${after} of 12 days</dd></div></dl>
   ${S.mem.manager?`<div class="tell"><span class="t-lab">I’ll tell</span><span class="p"><span class="av sm p2">MK</span>Manoj Kumar, your manager</span><span class="p"><span class="av sm p4">#</span>Platform team</span></div>`:`<div class="tell"><span class="t-lab">I’ll tell</span><span class="p">Your manager</span></div>`}
   <p class="note">${I.shield}<span>Within policy. ${n===1?'One day doesn’t':'Two days don’t'} need a medical certificate.</span></p></div>
   <div class="ft"><button class="btn btn-p" data-a="leave-apply" data-id="${t.id}">${I.check}Apply sick leave</button>${s==='edit'?`<button class="btn btn-g" data-a="leave-edit" data-id="${t.id}" data-v="draft">Done</button>`:`<button class="btn btn-s" data-a="leave-edit" data-id="${t.id}" data-v="edit">Change</button>`}</div></div>`},
 bal(t){const b=S.bal
  return `<p class="say">You have <b>${b.sick} sick</b>, <b>${b.casual} casual</b> and <b>${b.earned} earned</b> days left this year.</p>
  <div class="card"><div class="bd bal">
   <div class="r"><span>Sick leave</span><b class="num">${b.sick} of 12</b>${meter(b.sick,12)}</div>
   <div class="r"><span>Casual leave</span><b class="num">${b.casual} of 10</b>${meter(b.casual,10)}</div>
   <div class="r"><span>Earned leave</span><b class="num">${b.earned} of 18</b>${meter(b.earned,18,'s')}<span class="t-small" style="grid-column:1/-1">1 day lapses on 31 December unless you take it.</span></div></div></div>${fb(t.id,['Leave records, today'])}`},
 ctc(t){const P=[['Basic',45,'#5B3FE0'],['House rent allowance',18,'#8E7BF0'],['Special allowance',22,'#22C7E8'],['Provident fund',6,'#14936F'],['Variable pay, at target',9,'#D98E1F']]
  return `<p class="say">Your annual CTC is <b>₹32.4 lakh</b>. Basic is the largest part; the variable pay depends on the year-end review.</p>
  <div class="card"><div class="bd"><div class="t-lab">Annual CTC, 2026 cycle</div><div class="big num" style="margin-top:4px">₹32.4L</div>
   <div class="stack" role="img" aria-label="CTC breakup">${P.map(p=>`<i style="width:${p[1]}%;background:${p[2]}"></i>`).join('')}</div>
   <div class="legend">${P.map(p=>`<div><i style="background:${p[2]}"></i><span>${p[0]}</span><b class="num">₹${(32.4*p[1]/100).toFixed(1)}L</b></div>`).join('')}</div></div>
   <div class="ft"><button class="btn btn-s btn-sm" data-a="toast" data-v="The monthly view is not part of this prototype.">See it month by month</button></div></div>${fb(t.id,['Compensation letter, 2026'])}`},
 fb(t){const s=S.st[t.id]||'draft'
  if(s==='sent')return `<div class="card"><div class="done-row"><span class="tick">${I.check}</span><div class="x"><b>Shared in Arjun’s review</b><p>Arjun sees it when his manager publishes the review. You can edit it until then.</p></div></div></div>${fb(t.id)}`
  return `<p class="say">Here’s a draft based on Arjun’s goals and the work you shared. Change the tone or the focus, then edit anything.</p>
  <div class="card"><div class="bd"><div class="opts-row"><label><span class="t-lab">Tone</span>${sel('tone',S.fbTone,[{v:'Warm',l:'Warm',s:'Encouraging, personal'},{v:'Direct',l:'Direct',s:'Plain and specific'}],'set-tone')}</label><label><span class="t-lab">Focus</span>${sel('focus',S.fbFocus,[{v:'Strengths',l:'Strengths'},{v:'Growth',l:'Room to grow'},{v:'Both',l:'Both'}],'set-focus')}</label></div>
   <textarea class="input" rows="7" aria-label="Feedback draft">${fbText()}</textarea></div>
   <div class="ft"><button class="btn btn-p" data-a="fb-send" data-id="${t.id}">Share in his review</button><button class="btn btn-g" data-a="toast" data-v="Saved as a draft.">Save as draft</button></div></div>`},
 tax(t){const s=S.st[t.id]||'view'
  return `<p class="say">The new regime saves you about <b>₹24,000</b> this year.${S.prefs.length==='Detailed'||!S.mem.short?' Your 80C claims are modest and you claim no HRA or home loan interest, so the old regime’s deductions don’t make up for its higher rates.':' Your deductions are too small to make the old regime worth it.'}</p>
  <div class="card"><div class="bd"><div class="tax"><div class="bars">${[['Old regime',142,'₹1.42L'],['New regime',118,'₹1.18L']].map((b,i)=>`<div class="bar ${i?'best':''}"><span class="v num">${b[2]}</span><span class="stick" style="height:${b[1]/142*110}px"></span><span class="l">${b[0]}</span></div>`).join('')}</div>
   <div class="why"><div class="t-lab">Tax you’d pay, based on</div><dl><dt>80C claims</dt><dd class="num">₹60,000</dd><dt>House rent allowance</dt><dd>None</dd><dt>Home loan interest</dt><dd>None</dd></dl></div></div></div>
   ${s==='confirm'?`<div class="confirm"><b>Switch to the new regime?</b><div>Your tax deduction changes from the December payslip. You can switch back until 31 January.</div><div class="row"><button class="btn btn-p btn-sm" data-a="tax-set" data-id="${t.id}" data-v="done">Confirm the switch</button><button class="btn btn-g btn-sm" data-a="tax-set" data-id="${t.id}" data-v="view">Not now</button></div></div>`:''}
   ${s==='done'?`<div class="done-row" style="border-top:1px solid var(--line)"><span class="tick">${I.check}</span><div class="x"><b>Switched to the new regime</b><p>It shows on your December payslip.</p></div></div>`:''}
   ${s==='view'?`<div class="ft"><button class="btn btn-p" data-a="tax-set" data-id="${t.id}" data-v="confirm">Switch to the new regime</button><button class="btn btn-s" data-a="toast" data-v="The full breakdown is not part of this prototype.">See the full breakdown</button></div>`:''}</div>${fb(t.id,['Your declarations, FY 2026-27','Tax rules, FY 2026-27'])}`},
 carry(t){return `<p class="say">Yes, for earned leave. Up to <b>10 days</b> carry forward into next year; casual and sick leave reset on 1 January. You have ${S.bal.earned} earned days, so <b>${Math.max(0,S.bal.earned-10)} lapses</b> unless you take it by 31 December.</p>
  <blockquote class="quote">“Unused earned leave of up to ten (10) days may be carried forward to the following calendar year. Balances above this limit lapse on 31 December.”<footer>${src('Leave policy v4.2, §5.1')}</footer></blockquote>
  <p class="hand">Need an exception? <button class="link" data-a="toast" data-v="Ananya in HR has this conversation. She’ll reply here.">Ask Ananya in HR</button>, and I’ll pass this conversation along so you don’t repeat yourself.</p>${fb(t.id)}`},
 ooo(t){const s=S.st[t.id]||'draft'
  if(s==='on')return `<div class="card"><div class="done-row"><span class="tick">${I.check}</span><div class="x"><b>Out-of-office is on</b><p>Until tomorrow, 9 am.</p></div><button class="btn btn-g btn-sm" data-a="ooo" data-id="${t.id}" data-v="off">Turn off</button></div></div>`
  if(s==='off')return `<p class="say">Done. Your out-of-office stays off.</p>`
  return `<p class="say">Here’s one in your usual tone. Edit it if you like.</p><div class="card"><div class="hd"><span class="chip c-n">Out-of-office</span><span class="t-small">Today until tomorrow, 9 am</span></div><div class="bd"><textarea class="input" rows="6" aria-label="Out-of-office message">Hi,\n\nI’m out sick today and back tomorrow. For anything urgent on the platform release, please reach Manoj.\n\nThanks,\nEsha</textarea></div><div class="ft"><button class="btn btn-p" data-a="ooo" data-id="${t.id}" data-v="on">Turn it on</button><button class="btn btn-g" data-a="ooo" data-id="${t.id}" data-v="off">Discard</button></div></div>`},
 fallback(t){return `<p class="say">I can help with leave, pay, tax and HR policies, and I always check with you before I act. Try one of these:</p><div class="chips" style="margin-top:12px">${PROMPTS.map(p=>`<button data-a="ask" data-k="${p.k}">${I[p.i]}${p.t}</button>`).join('')}</div>`},
}
function fbText(){const w=S.fbTone==='Warm',f=S.fbFocus
 const a=w?'Arjun, this quarter you made the platform release feel calm, and that is not easy.':'Arjun, you delivered the platform release on time with no rollback.'
 const st=w?' You took the migration plan from a rough sketch to something the whole team trusted, and you made time to pair with the two new joiners.':' You owned the migration plan end to end and paired with the two new joiners each week.'
 const gr=w?' One thing to grow into next: share your thinking earlier. The reviews would move faster if people saw the plan while it was still taking shape.':' Next cycle, share plans earlier. Reviews slowed when the plan arrived complete.'
 if(S.fbDraft!=null)return S.fbDraft
 return a+(f!=='Growth'?st:'')+(f!=='Strengths'?gr:'')+(w?'\n\nThank you. It shows.\nEsha':'\n\nEsha')}

/* ---------- overlays ---------- */
function drawer(){if(!S.drawer)return''
 const l=S.drawer==='nav'
 return `<div class="drawer ${l?'l':'r'} ${an('drawer'+S.drawer)}" data-a="close-drawer"><div class="in" data-stop="1"><div class="dhd"><span class="t-sec">${l?'Conversations':'Your day'}</span><button class="ic" data-a="close-drawer" aria-label="Close">${I.x}</button></div>${l?`<div class="nav">${threads()}</div>`:`<div class="ctx">${context()}</div>`}</div></div>`}
function dialog(){if(S.dialog!=='settings')return''
 return `<div class="scrim ${an('settings')}" data-a="close-d"><div class="dialog" role="dialog" aria-modal="true" aria-label="Settings" data-stop="1"><div class="dh">Settings<button class="ic" data-a="close-d" aria-label="Close">${I.x}</button></div><div class="db">
 <div class="srow">Answer length${sel('length',S.prefs.length,[{v:'Short',l:'Short',s:'The answer, then the reason'},{v:'Detailed',l:'Detailed',s:'With the working shown'}],'set-pref-length','right')}</div>
 <div class="srow">Language${sel('lang',S.prefs.lang,[{v:'English',l:'English'},{v:'Hindi',l:'हिन्दी'}],'set-pref-lang','right')}</div>
 <button class="srow" style="width:100%;text-align:left" role="switch" aria-checked="${S.prefs.notify}" data-a="notify">Tell me when something needs a look<span class="switch ${S.prefs.notify?'on':''}"></span></button>
 </div><div class="df"><button class="btn btn-p" data-a="close-d">Done</button></div></div></div>`}

/* ---------- behaviour ---------- */
const toast=t=>{S.toast=t;clearTimeout(window._tt);window._tt=setTimeout(()=>{S.toast=null;render()},2600)}
const closeAll=()=>{S.menu=S.bell=S.help=false;S.dd=null}
function ask(text,k=route(text)){
 if(S.turns.some(t=>t.from==='e'&&!t.ready))return
 closeAll();S.drawer=null
 const id=uid++
 S.turns.push({from:'me',text,id:'q'+id},{from:'e',k,id,ready:false,n:0,open:false})
 if(!S.thread)S.thread=TITLES[k]
 S.input='';S._stick=true;render()
 const t=S.turns[S.turns.length-1],n=(STEPS[k]||[]).length
 const tick=()=>{if(t.n<n-1){t.n++;S._stick=true;render();setTimeout(tick,reduce?0:620)}else setTimeout(()=>{t.ready=true;S._stick=true;render()},reduce?0:560)}
 setTimeout(tick,reduce?0:620)
}
document.addEventListener('click',e=>{
 const el=e.target.closest('[data-a]')
 const inside=(x,keep)=>el&&el.dataset.a===x&&e.target.closest('[data-stop]')&&!e.target.closest(keep)
 if(inside('close-drawer','.dhd')||inside('close-d','.df,.dh')){if(S.dd){S.dd=null;render()}return}
 if(!el){if(S.menu||S.bell||S.help||S.dd){closeAll();render()}return}
 const a=el.dataset.a,id=+el.dataset.id,v=el.dataset.v
 if(a==='form')return
 if(S.dd&&a!=='dd'&&!a.startsWith('set-'))S.dd=null
 const A={
  noop:()=>{},
  home:()=>{S.turns=[];S.thread=null;S.st={};S.drawer=null;closeAll();render()},
  ask:()=>{const p=PROMPTS.find(p=>p.k===el.dataset.k);ask(p?p.t:el.dataset.k==='ooo'?'Set an out-of-office for today':'What can you do?',el.dataset.k)},
  menu:()=>{const o=!S.menu;closeAll();S.menu=o;render()},
  bell:()=>{const o=!S.bell;closeAll();S.bell=o;render()},
  help:()=>{const o=!S.help;closeAll();S.help=o;render()},
  dd:()=>{S.dd=S.dd===el.dataset.id?null:el.dataset.id;render()},
  drawer:()=>{closeAll();S.drawer=v;render()},
  'close-drawer':()=>{S.drawer=null;render()},
  settings:()=>{closeAll();S.dialog='settings';render()},
  'close-d':()=>{S.dialog=null;S.dd=null;render()},
  reset:()=>{S=fresh();render()},
  back:()=>{location.href='/craft/engaze'},
  toast:()=>{toast(v);render()},
  mem:()=>{S.mem[el.dataset.k]=!S.mem[el.dataset.k];render()},
  notify:()=>{S.prefs.notify=!S.prefs.notify;render()},
  steps:()=>{const t=S.turns.find(t=>t.id===id);t.open=!t.open;render()},
  up:()=>{S.st['up'+id]=!S.st['up'+id];render()},
  copy:()=>{toast('Copied');render()},
  retry:()=>{toast('Same answer: nothing has changed since.');render()},
  'leave-edit':()=>{S.st[id]=v;render()},
  'set-len':()=>{S.leaveLen=v;S.dd=null;render()},
  'leave-apply':()=>{S.st[id]='applied';S.bal.sick-=+S.leaveLen;S.st['u'+id]=30;render();clearInterval(window['_u'+id]);window['_u'+id]=setInterval(()=>{S.st['u'+id]--;if(S.st['u'+id]<=0)clearInterval(window['_u'+id]);render()},1000)},
  'leave-undo':()=>{clearInterval(window['_u'+id]);S.st[id]='undone';S.bal.sick+=+S.leaveLen;render()},
  'set-tone':()=>{S.fbDraft=null;S.fbTone=v;S.dd=null;render()},
  'set-focus':()=>{S.fbDraft=null;S.fbFocus=v;S.dd=null;render()},
  'fb-send':()=>{S.st[id]='sent';render()},
  'tax-set':()=>{S.st[id]=v;if(v==='done')toast('Switched. Your December payslip will show it.');render()},
  ooo:()=>{S.st[id]=v;render()},
  'set-pref-length':()=>{S.prefs.length=v;S.dd=null;render()},
  'set-pref-lang':()=>{S.prefs.lang=v;S.dd=null;if(v!=='English')toast('Only English is part of this prototype.');render()},
 }
 if(A[a]){e.preventDefault();A[a]()}
})
document.addEventListener('input',e=>{if(e.target.getAttribute('aria-label')==='Feedback draft')S.fbDraft=e.target.value;if(e.target.id==='q'){S.input=e.target.value;const b=document.querySelector('.send');const busy=S.turns.some(t=>t.from==='e'&&!t.ready);b.disabled=!S.input.trim()||busy}})
document.addEventListener('submit',e=>{e.preventDefault();if(S.input.trim())ask(S.input.trim())})
document.addEventListener('keydown',e=>{if(e.key==='Escape'){if(S.dd){S.dd=null}else if(S.dialog){S.dialog=null}else if(S.drawer){S.drawer=null}else closeAll();render()}})
addEventListener('resize',()=>{if(innerWidth>1180&&S.drawer==='ctx'){S.drawer=null;render()}if(innerWidth>760&&S.drawer==='nav'){S.drawer=null;render()}})
render()
