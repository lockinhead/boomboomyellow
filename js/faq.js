const faqContainer=document.getElementById("faq-container"),observerOptions={root:null,rootMargin:"50px",threshold:.1},observer=new IntersectionObserver(t=>{t.forEach(t=>{t.isIntersecting&&(loadFAQContent(),observer.disconnect())})},observerOptions);function initializeFAQ(){observer.observe(faqContainer)}async function loadFAQContent(){try{let t=await caches.open("faq-cache-v1"),e=await t.match("/data/faqData.json");e||(e=await fetch("/data/faqData.json"),t.put("/data/faqData.json",e.clone()));let o=await e.json(),n=document.createDocumentFragment();o.forEach((t,e)=>{let o=createFAQDropdown(t,e);n.appendChild(o)}),faqContainer.appendChild(n),setupDropdowns()}catch(a){console.error("Error loading FAQ data:",a),faqContainer.innerHTML=`
    <div role="alert" class="help__error">
        <p>Error loading FAQ data. Please try again later.</p>
        <button onclick="retryLoading()" class="help__retry-button">
            Retry Loading
        </button>
    </div>`}}function createFAQDropdown(t,e){let o=document.createElement("div");o.className="dropdown";let n=t.subtopics?t.subtopics.map(createSubtopic).join(""):createSubtopic({title:t.subtitle||t.question,answer:t.answer});return o.innerHTML=`
<h3 class="dropdown-title">
    ${t.title||t.question}
    <svg class="dropdown-arrow" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 36" fill="currentColor" width="24" height="24">
        <path d="M16.6077,26.056L23.5647,19.034C24.1467,18.446,24.1447,17.4999987,23.5587,16.916L16.5587,9.938C15.9737,9.353,15.0217,9.354,14.4377,9.941C13.8527,10.5279,13.8547,11.478,14.4407,12.062L20.3817,17.984L14.4777,23.944C13.8947,24.533,13.8977,25.482,14.4867,26.065C14.7787,26.355,15.1607,26.4999987,15.5427,26.4999987C15.9287,26.4999987,16.3147,26.352,16.6077,26.056Z"/>
    </svg>
</h3>
<div class="dropdown-content">
    ${n}
</div>
`,o}function createSubtopic(t){return`
<div class="dropdown-subtopic">
    <h4 class="dropdown-subtitle">${t.title}</h4>
    <p class="dropdown-description">${t.answer}</p>
</div>
`}function setupDropdowns(){let t=document.querySelectorAll(".help__faq .dropdown");t.forEach(t=>{let e=t.querySelector(".dropdown-title");e.addEventListener("click",()=>{t.classList.toggle("expanded")})})}"loading"===document.readyState?document.addEventListener("DOMContentLoaded",initializeFAQ):initializeFAQ();