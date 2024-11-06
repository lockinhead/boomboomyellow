const productGrid=document.querySelector(".products__grid");function setLoadingState(t){productGrid.setAttribute("aria-busy",t),t&&(productGrid.innerHTML=`
    <div class="products__loading" role="status">
        <span class="visually-hidden">Loading products, please wait...</span>
        <div aria-hidden="true">Loading products...</div>
    </div>
`)}function createProductItem(t){let{id:r,name:e,images:a,variations:o,description:i}=t,d;return`
<article class="products__item" itemscope itemtype="https://schema.org/Product">
    <a href="/products/${t.slug}" 
       class="products__link"
       aria-labelledby="product-name-${r}"
       aria-describedby="product-variations-${r}">
        <div class="products__image-wrapper">
            <img class="products__image" 
                 src="${a[0]||""}" 
                 alt="${e}"
                 itemprop="image"
                 loading="lazy"
                 decoding="async"
                 width="400"
                 height="711">
            <div class="products__details">
                <h2 class="products__name" id="product-name-${r}" itemprop="name">${e}</h2>
                <p class="products__variations" id="product-variations-${r}" itemprop="description">
                    ${o.length>0?`Available in ${o.length>1?o.slice(0,-1).join(", ")+(o.length>2?",":"")+" and "+o.slice(-1):o[0]}.*`:""}
                    <meta itemprop="brand" content="BoomBoomYellow">
                    <meta itemprop="category" content="Free-Range Chicken">
                </p>
            </div>
        </div>
    </a>
</article>
`}function showError(){return`
<div role="alert" class="products__error">
    <h2 class="visually-hidden">Error Message</h2>
    <p>Error loading products. Please try again later.</p>
    <button onclick="retryLoading()" class="products__retry-button">
        Retry Loading Products
    </button>
</div>
`}function retryLoading(){renderProducts()}async function fetchProducts(t=3){for(let r=0;r<t;r++)try{let e=await fetch("/data/productData.json");if(!e.ok)throw Error("Network response was not ok");return await e.json()}catch(a){if(r===t-1)throw a;await new Promise(t=>setTimeout(t,1e3*(r+1)))}}async function renderProducts(){try{setLoadingState(!0);let t=await fetchProducts(),r=document.createDocumentFragment(),e=document.createElement("div");for(e.innerHTML=t.map(createProductItem).join("");e.firstChild;)r.appendChild(e.firstChild);productGrid.innerHTML="",productGrid.appendChild(r)}catch(a){console.error("Error loading product data:",a),productGrid.innerHTML=showError()}finally{setLoadingState(!1)}}"loading"===document.readyState?document.addEventListener("DOMContentLoaded",renderProducts):renderProducts();