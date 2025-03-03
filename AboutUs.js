let opener = document.querySelector('.opener');
let circle = document.querySelector('.circle');

let teachers = [
    {name: 'Matteo', description: 'Docente Frontend di Hackademy 69', url: './media/teacher1.png'},
    {name: 'Giorgia', description: 'Docente Frontend e responsabile Hackademy', url: './media/teacher2.png'},
    {name: 'Alessia', description: 'Docente Backend di Hackademy', url: './media/teacher3.png'},
    {name: 'Luca', description: 'Docente Backend di Hackademy 69', url: './media/teacher4.png'}
];

teachers.forEach((docente) => {
    let div = document.createElement('div');
    div.classList.add('moved');
    
    div.style.backgroundImage = `url(${docente.url})`;
    circle.appendChild(div);
});


let movedDivs = document.querySelectorAll('.moved'); 
let check = false;
let flipCard = document.querySelector('.flip-card')
let cardWrapper = document.querySelector('#cardWrapper');



opener.addEventListener('click', () => {
    if (check == false) {
        opener.style.transform = `rotate(45deg)`;
        movedDivs.forEach((element, i) => { 
            let angle = (360 * i) / movedDivs.length; 
            element.style.transform = `rotate(${angle}deg) translate(150px) rotate(-${angle}deg)`;
        });
        check = true;    
    }else{
        check = false;
        opener.style.transform = ``;
        movedDivs.forEach((element, i) => { 
            element.style.transform = ``;
        });
        cardWrapper.innerHTML= '';
    }
});

let cardName = document.querySelector('#cardName');
let cardText = document.querySelector('#cardText');

movedDivs.forEach((moved, i)=>{
    moved.addEventListener('click', ()=>{
        let docente = teachers[i];
        cardWrapper.innerHTML= '';


        let div = document.createElement('div');
        div.classList.add('flip-card');
        div.innerHTML = `          
            <div class="inner">
                <div class="inner-face"></div>
                <div class="inner-back">
                    <p id="cardName" class="h4 neon-green"> ${docente.name} </p>
                    <p id="cardText" class="lead light-green">${docente.description}</p>
            </div>
          </div>
        `;
        cardWrapper.appendChild(div);
        
        let innerFace = document.querySelector('.inner-face');
        





        innerFace.style.backgroundImage= `url(${docente.url})`;
      ;
    });
})