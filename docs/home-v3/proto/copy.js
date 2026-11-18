const P=new URLSearchParams(location.search);const KF=P.get('kf')||'01';const M=innerWidth<700;document.documentElement.classList.toggle('m',M);
const COPY={
'01':{h:'Design is undergoing a profound transformation.',s:'Evolving human behaviour. Changing business ambitions. And the technology enabling both. I work at their convergence.'},
'03':{h:'From possibility to practice.',s:'A selection of experiences shaped across enterprise, AI and digital products.'},
'05':{h:'Because meaningful work takes collective effort.',s:'Building teams. Developing talent. Creating the conditions for good design to thrive.'},
'08':{h:'The next chapter is still taking shape.',s:'Exploring new possibilities in design, business and AI. Always open to meaningful collaborations and conversations.'}};
const WORKS=[{id:'sap-search',t:'AI-Powered Search',h:'Enterprise search that gets things done'},{id:'sap-agentic',t:'Agentic Order Confirmations',h:'Supplier order confirmations, where agents do the legwork and humans make the call'},{id:'airline-app',t:'Travel Booking',h:'Redesigning the trip, not the booking flow'}];
const COVER=id=>'/Users/I752155/Documents/AIStuff/Port/AmitSpace/public/images/covers/'+id+'-1600.webp';
const HDR=`<div class="hdr"><span class="nm">Amit Kumar Tiwari</span><span class="nav"><span>Craft</span><span>Leadership</span><span>Practice</span><span>About</span><span>Contact</span></span></div>`;
const RAIL=n=>`<div class="rail">${[1,2,3,4,5,6,7,8].map(i=>`<i class="${i==n?'on':''}"></i>`).join('')}</div>`;
// seeded random
let _s=7;const rnd=()=>(_s=(_s*16807)%2147483647)/2147483647;
