document.addEventListener("DOMContentLoaded",function(){let e=document.querySelectorAll(".contact__option-button"),t=document.getElementById("dynamic-form-fields"),a=document.getElementById("contact-form"),n="business";function i(e){fetch("data/form-config.json").then(e=>e.json()).then(a=>{let n=a[e],i="";n.forEach(t=>{let a=`${e}-${t.name}`;i+=`
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
`,i+=`<input type="hidden" name="timestamp" value="${Date.now()}">`,t.innerHTML=i;let o=document.getElementById(`${e}-message`);o&&o.addEventListener("input",r);let l=t.querySelectorAll("input, textarea");l.forEach(s)}).catch(e=>console.error("Error loading form configuration:",e))}function r(){this.style.height="auto",this.style.height=this.scrollHeight+"px"}function s(e){e.addEventListener("focusout",()=>l(e,!0)),e.addEventListener("input",()=>{e.classList.contains("touched")&&l(e,!1)}),e.addEventListener("focus",o)}function o(){this.classList.remove("invalid","touched"),this.setCustomValidity("");let e=this.nextElementSibling;e&&(e.textContent=e.dataset.originalText,e.classList.remove("error-message"))}function l(e,t){if("message"===e.name)return;let a=e.checkValidity(),n=e.nextElementSibling,i=n.dataset.originalText,r=e.hasAttribute("required"),s=""===e.value.trim();if(e.classList.add("touched"),a||!r&&s)o.call(e);else if(t&&(r||!s)){e.classList.add("invalid");let l=function e(t){if(t.validity.valueMissing)return"";if(t.validity.typeMismatch||t.validity.patternMismatch)switch(t.name){case"full-name":case"business-name":case"government-entity":return`Please enter a valid ${t.name.replace("-"," ")}.`;case"email":return"Please enter a valid email address.";case"phone":return"Please enter a valid Malaysian phone number.";default:return"Please enter a valid value."}return""}(e);n.textContent=l||i,n.classList.toggle("error-message",!!l),e.setCustomValidity(l)}else e.classList.remove("invalid"),n.textContent=i,n.classList.remove("error-message"),e.setCustomValidity("")}e.forEach(t=>{t.addEventListener("click",function(){e.forEach(e=>{e.classList.remove("contact__option-button--active"),e.setAttribute("aria-pressed","false")}),this.classList.add("contact__option-button--active"),this.setAttribute("aria-pressed","true"),i(n=this.dataset.form)})}),a.addEventListener("submit",function(e){e.preventDefault();let t=a.querySelectorAll("input, textarea"),r=!0;if(t.forEach(e=>{l(e,!0),e.checkValidity()||(r=!1)}),!r){console.log("Form validation failed");return}let s=parseInt(a.querySelector('input[name="timestamp"]').value),o=Date.now();if(o-s<3e3){console.log("Submission too quick, potential bot");return}let c=new FormData(a),d={};c.forEach((e,t)=>{d[t]=e}),d.formType=n,fetch("https://script.google.com/macros/s/AKfycby5VMqYcV1d2cy9ZrlKLEQcVvFgfCa6_L0ylcA4r36o6zv1I6aCywcPwVCdhCqrJRA5Fw/exec",{method:"POST",body:JSON.stringify(d),headers:{"Content-Type":"application/json"}}).then(e=>e.json()).then(e=>{console.log("Success:",e),alert("Thank you for your submission!"),a.reset(),i(n)}).catch(e=>{console.error("Error:",e),alert("An error occurred. Please try again later.")})}),i(n)});