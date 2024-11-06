document.addEventListener("DOMContentLoaded",function(){let e=document.querySelectorAll(".contact__option-button"),t=document.getElementById("dynamic-form-fields"),a=document.getElementById("contact-form"),n="business";function i(e){fetch("/data/form-config.json").then(e=>e.json()).then(a=>{let n=a[e],i="";n.forEach(t=>{let a=`${e}-${t.name}`;i+=`
    <div class="contact__form-group${t.fullWidth?" contact__form-group--full-width":""}">
        <input class="contact__form-input" 
            type="${t.type}" 
            id="${a}" 
            name="${t.name}" 
            ${t.required?"required":""} 
            ${t.minLength?`minlength="${t.minLength}"`:""}
            ${t.maxLength?`maxlength="${t.maxLength}"`:""}
            ${t.pattern?`pattern="${t.pattern}"`:""}
            placeholder=" " 
            aria-required="${t.required}">
        <label class="contact__form-label" for="${a}" data-original-text="${t.label}${t.required?" *":""}">${t.label}${t.required?" *":""}</label>
    </div>
`}),i+=`
<div class="contact__form-group contact__form-group--full-width">
    <textarea class="contact__form-textarea" id="${e}-message" name="message" placeholder=" " rows="1"></textarea>
    <label class="contact__form-label" for="${e}-message" data-original-text="Message">Message</label>
</div>
`,i+=`<input type="hidden" name="timestamp" value="${Date.now()}">`,t.innerHTML=i;let r=document.getElementById(`${e}-message`);r&&r.addEventListener("input",s);let l=t.querySelectorAll("input, textarea");l.forEach(o)}).catch(e=>console.error("Error loading form configuration:",e))}function s(){this.style.height="auto",this.style.height=this.scrollHeight+"px"}function o(e){e.addEventListener("focusout",()=>l(e,!0)),e.addEventListener("input",()=>{e.classList.contains("touched")&&l(e,!1)}),e.addEventListener("focus",r)}function r(){this.classList.remove("invalid","touched"),this.setCustomValidity("");let e=this.nextElementSibling;e&&(e.textContent=e.dataset.originalText,e.classList.remove("error-message"))}function l(e,t){if("message"===e.name||"hidden"===e.type)return;let a=e.checkValidity(),n=e.nextElementSibling;if(!n)return;let i=n.dataset.originalText,s=e.hasAttribute("required"),o=""===e.value.trim();if(e.classList.add("touched"),a||!s&&o)r.call(e);else if(t&&(s||!o)){e.classList.add("invalid");let l=function e(t){if(t.validity.valueMissing)return"";if(t.validity.typeMismatch||t.validity.patternMismatch)switch(t.name){case"full-name":case"business-name":case"government-entity":return`Please enter a valid ${t.name.replace("-"," ")}.`;case"email":return"Please enter a valid email address.";case"phone":return"Please enter a valid Malaysian phone number.";default:return"Please enter a valid value."}return""}(e);n.textContent=l||i,n.classList.toggle("error-message",!!l),e.setCustomValidity(l)}else e.classList.remove("invalid"),n.textContent=i,n.classList.remove("error-message"),e.setCustomValidity("")}e.forEach(t=>{t.addEventListener("click",function(){e.forEach(e=>{e.classList.remove("contact__option-button--active"),e.setAttribute("aria-pressed","false")}),this.classList.add("contact__option-button--active"),this.setAttribute("aria-pressed","true"),i(n=this.dataset.form)})}),a.addEventListener("submit",function(e){e.preventDefault();let t=a.querySelectorAll("input, textarea"),i=!0;if(t.forEach(e=>{"hidden"===e.type||(l(e,!0),e.checkValidity()||(i=!1))}),!i){console.log("Form validation failed");return}console.log("Form validation passed, preparing submission...");let s=new FormData(a),o={};s.forEach((e,t)=>{o[t]=e}),o.formType=n,console.log("Submitting data:",o),a.classList.add("loading"),fetch("https://script.google.com/macros/s/AKfycbwKqrt8H9mi2m2XKghEojli0pBJ2oNtOy6GQuwRD9dDFChBF946FgguBi65CnPHhDXssw/exec",{method:"POST",mode:"no-cors",headers:{"Content-Type":"application/json"},body:JSON.stringify(o)}).then(e=>{showThankYouMessage()}).catch(e=>{console.error("Error:",e),alert("An error occurred. Please try again later.")}).finally(()=>{a.classList.remove("loading")})}),i(n)});function showThankYouMessage(){let e=document.querySelector(".contact__container");e.innerHTML=`
<div class="contact__thank-you" role="alert">
<h2 class="contact__thank-you-title">Thank you!</h2>
<p class="contact__thank-you-message">
We will email you soon 💌.
</p>
<button class="contact__new-message-button" 
onclick="window.location.href='/'">
Back to home
</button>
</div>
`,window.scrollTo({top:0,behavior:"smooth"})}