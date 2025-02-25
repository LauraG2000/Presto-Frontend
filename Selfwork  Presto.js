let navbar = document.querySelector('#navbar');
let links = document.querySelectorAll('.nav-link');
let logoNav = document.querySelector('#logoNav');
let logo2 = document.querySelector('#logo2');
let navbarCollapse = document.querySelector('.navbar-collapse');

window.addEventListener('scroll', () => {
    let scrolled = window.scrollY;

    if (scrolled > 0) {
        navbar.style.backgroundColor = 'var(--dark-green)';
        navbarCollapse.style.backgroundColor = 'var(--dark-green)';
        navbar.style.height = '70px';

        links.forEach((link) => {
            link.style.color = 'var(--light-green)';
        });

        // Cambia logo on scroll
        logoNav.src = 'http://127.0.0.1:5500/Media/baloon-l.png';
        logo2.src = 'http://127.0.0.1:5500/Media/logo2-l.png';
    } else {
        navbar.style.backgroundColor = 'var(--light-green)';
        navbarCollapse.style.backgroundColor = 'var(--light-green)';
        navbar.style.height = '140px';

        links.forEach((link) => {
            link.style.color = 'var(--dark-green)';
        });

        // Cambia logo on scroll (per contrasto)
        logoNav.src = 'http://127.0.0.1:5500/Media/baloon-d.png';
        logo2.src = 'http://127.0.0.1:5500/Media/logo2-d.png';
    }
});

let check = true;

logo2.addEventListener('click',() =>{
    if (check == false) {
        logo2.style.transform = `rotate(90deg)`
        check = true;
    }else{
        logo2.style.transform = `rotate(0deg)`
        check = false;
    }
})

let firstNumber = document.querySelector('#firstNumber');
let secondNumber = document.querySelector('#secondNumber');
let thirdNumber = document.querySelector('#thirdNumber');

let confirm = true;

function createInterval(n, element, time) {
    let counter = 0;
    
    let interval = setInterval(()=>{
        if(counter < n){
            counter++
            element.innerHTML = counter;
        }else{
            console.log('stop');
            clearInterval(interval);
        }
    }, time);
    
    setTimeout(()=>{
        confirm = true;
    }, 10000);
}

let ovbserver = new IntersectionObserver((entries)=>{
    entries.forEach((entry)=> {
        if(entry.isIntersecting && confirm){
            createInterval(300, firstNumber, 50);
            createInterval(200, secondNumber, 100);
            createInterval(100, thirdNumber, 200);
            confirm = false;
        }
    })
});

ovbserver.observe(firstNumber);
ovbserver.observe(secondNumber);
ovbserver.observe(thirdNumber);





// Swiper
let reviews = [
    {user: 'Martina B.', description: 'Adoro questo sito di annunci!', rank: 5},
    {user: 'Caterina L.', description: 'Inizialmente mi trovavo bene, ma dopo il terzo acquisto ho avuto parecchi problemi con reso e rimborso', rank: 3 },
    {user: 'Emma L.', description: 'Bello.', rank: 4 },
    {user: 'Kevin D.', description: 'Dò 5 stelle perchè è un ottimo sito, mi trovo benissimo', rank: 5},
];

let swiperWrapper = document.querySelector('.swiper-wrapper');

reviews.forEach((review) => {
    let div = document.createElement('div');
    div.classList.add('swiper-slide'); 

    // Calcola quante stelle vuote aggiungere in base al punteggio
    let filledStars = '<i class="fa-solid fa-star"></i>'.repeat(review.rank);
    let emptyStars = '<i class="fa-regular fa-star"></i>'.repeat(5 - review.rank); 

    div.innerHTML = `
      <div class="card-review position-relative">
            <div class="d-flex justify-content-center py-5 star">
                ${filledStars}${emptyStars}
            </div>
            <p class="lead text-center text-light">${review.description}</p>
                <div class="position-absolute bottom-2 end-2">
                    <h4 class="lead">${review.user}</h4>
                </div>
        </div>
    `;

    swiperWrapper.appendChild(div);
});


const swiper = new Swiper('.swiper', {
    loop: true,
    effect: "coverflow",
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: "auto",
    autoplay: {
        delay: 3000,
        disableOnInteraction: false,
      },
    speed: 1000,
});

