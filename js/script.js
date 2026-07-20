// ===========================
// MODAL PRODUCTOS MAKEV
// ===========================

// Elementos del DOM
const modal = document.getElementById("productModal");
const modalImage = document.getElementById("modalImage");
const modalTitle = document.getElementById("modalTitle");
const modalPrice = document.getElementById("modalPrice");
const modalDescription = document.getElementById("modalDescription");
const modalFeatures = document.getElementById("modalFeatures");
const modalThumbs = document.getElementById("modalThumbs");

const buyButton = document.getElementById("buyWhatsapp");

const prevBtn = document.querySelector(".prev-btn");
const nextBtn = document.querySelector(".next-btn");
const closeModal = document.querySelector(".close-modal");

// Variables de la galería
let currentImages = [];
let currentIndex = 0;

// ===========================
// Cargar galería
// ===========================

function loadGallery(images){

    currentImages = images.map(img => img.trim());

    currentIndex = 0;

    modalImage.src = currentImages[currentIndex];

    modalThumbs.innerHTML = "";

    currentImages.forEach((img,index)=>{

        const thumb = document.createElement("img");

        thumb.src = img;
        thumb.className = "thumb";

        if(index===0){
            thumb.classList.add("active-thumb");
        }

        thumb.addEventListener("click",()=>{

            currentIndex=index;

            updateGallery();

        });

        modalThumbs.appendChild(thumb);

    });

}

// ===========================
// Actualizar imagen
// ===========================

function updateGallery(){

    modalImage.src=currentImages[currentIndex];

    document.querySelectorAll(".thumb").forEach((thumb,index)=>{

        thumb.classList.toggle("active-thumb",index===currentIndex);

    });

}

// ===========================
// Flechas
// ===========================

prevBtn.onclick=()=>{

    currentIndex--;

    if(currentIndex<0){

        currentIndex=currentImages.length-1;

    }

    updateGallery();

}

nextBtn.onclick=()=>{

    currentIndex++;

    if(currentIndex>=currentImages.length){

        currentIndex=0;

    }

    updateGallery();

}

// ===========================
// Abrir modal
// ===========================

document.querySelectorAll(".btn-product").forEach(button=>{

    button.addEventListener("click",()=>{

        modal.classList.add("active");

        modalTitle.textContent=button.dataset.name;
        modalPrice.textContent=button.dataset.price;
        modalDescription.textContent=button.dataset.description;

        // Características
        modalFeatures.innerHTML="";

        if(button.dataset.features){

            button.dataset.features
            .split("|")
            .forEach(feature=>{

                modalFeatures.innerHTML+=`<li>✔ ${feature}</li>`;

            });

        }

        // Galería
        loadGallery(button.dataset.images.split(","));

        // WhatsApp

        buyButton.onclick=()=>{

            const numero="573177081051";

            const mensaje=`Hola 👋, estoy interesado en el ${button.dataset.name} por ${button.dataset.price}. ¿Sigue disponible?`;

            window.open(
                `https://wa.me/${numero}?text=${encodeURIComponent(mensaje)}`,
                "_blank"
            );

        }

    });

});

// ===========================
// Cerrar modal
// ===========================

closeModal.onclick=()=>{

    modal.classList.remove("active");

}

window.onclick=(e)=>{

    if(e.target===modal){

        modal.classList.remove("active");

    }

}