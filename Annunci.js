fetch('./annunci.json').then((response) => response.json()).then((data) => {
    data.sort((a, b) => a.price - b.price);
    
    let radioWrapper = document.querySelector('#radioWrapper');
    let cardWrapper = document.querySelector('#cardWrapper');
    let priceInput = document.querySelector('#priceInput');
    let priceValue = document.querySelector('#priceValue');

    function radioCreate() {
        let categories = data.map((annuncio) => annuncio.category);
        let uniqueCategories = Array.from(new Set(categories));

        uniqueCategories.forEach((category) => {
            let div = document.createElement('div');
            div.classList.add('form-check');
            div.innerHTML = 
            `<input class="form-check-input" type="radio" name="categories" id="${category}">
             <label class="form-check-label" for="${category}">${category}</label>`;
            radioWrapper.appendChild(div);
        });
    }
    
    radioCreate();

    function stopWord(string) {
        return string.length > 13 ? string.split(' ')[0] + '...' : string;
    }

    function showCards(array) {
        cardWrapper.innerHTML = '';
        array.forEach((annuncio, i) => {
            let div = document.createElement('div');
            div.classList.add('card-custom');
            div.innerHTML = 
            `<img src="https://picsum.photos/${300 + i}" alt="immagine casuale" class="img-fluid img-card">
             <p class="h2 light-green" title="${annuncio.name}">${stopWord(annuncio.name)}</p>
             <p class="h3 light-green">${annuncio.category}</p>
             <p class="h4 light-green">${annuncio.price} €</p>`;
            cardWrapper.appendChild(div);
        });
    }

    showCards(data);

    function filterCategory(categoria) {
        let filtered;
        if (categoria === 'all') {
            filtered = data;
        } else {
            filtered = data.filter(function(annuncio) {
                return annuncio.category === categoria;
            });
        }
        showCards(filtered);
    }
    

    document.querySelectorAll('.form-check-input').forEach((button) => {
        button.addEventListener('click', () => filterCategory(button.id));
    });

    function setPriceFilter() {
        let prices = data.map((annuncio) => +annuncio.price).sort((a, b) => a - b);
        let maxPrice = Math.ceil(prices.pop());
        priceInput.max = maxPrice;
        priceInput.value = maxPrice;
        priceValue.innerHTML = maxPrice;
    }

    setPriceFilter();

    function filterPrice() {
        let filtered = data.filter((annuncio) => +annuncio.price <= priceInput.value);
        showCards(filtered);
    }

    priceInput.addEventListener('input', () => {
        priceValue.innerHTML = priceInput.value;
        filterPrice();
    });

});
