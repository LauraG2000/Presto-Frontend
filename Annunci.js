fetch('./annunci.json')
.then((response) => response.json())
.then((data) => {
    data.sort((a, b) => a.price - b.price);
    
    let radioWrapper = document.querySelector('#radioWrapper');
    let cardWrapper = document.querySelector('#cardWrapper');
    let priceInput = document.querySelector('#priceInput');  
    let priceValue = document.querySelector('#priceValue');
    let wordInput = document.querySelector('#wordInput');
    
    // Trova il prezzo massimo tra tutti gli annunci
    let maxInitialPrice = Math.ceil(Math.max(...data.map(annuncio => +annuncio.price))); 
    
    // Imposta il massimo e il valore iniziale del filtro del prezzo
    priceInput.max = maxInitialPrice;
    priceInput.value = maxInitialPrice;
    priceValue.innerHTML = maxInitialPrice;
    
    // Variabili per tenere traccia dei filtri attivi
    let activeCategory = 'all';
    let activePrice = priceInput.value; // Prezzo iniziale
    let activeWord = '';
    
    // Crea i radio button per le categorie
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
    
    // Funzione per abbreviare il nome se troppo lungo
    function stopWord(string) {
        return string.length > 13 ? string.split(' ')[0] + '...' : string;
    }
    
    // Mostra gli annunci filtrati
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
    
    // Funzione per filtrare gli annunci per categoria
    function filterCategory(categoria) {
        activeCategory = categoria; // Aggiorna la categoria attiva
        setPriceFilter(); // Ricalcola il massimo prezzo per la nuova categoria
        globalFilter(); // Rapplica i filtri concatenati
    }
    
    // Funzione per aggiornare il filtro del prezzo in base alla categoria
    function setPriceFilter() {
        let filteredData;
        // Se è selezionata una categoria specifica, filtra i dati
        if (activeCategory !== 'all') {
            filteredData = data.filter((annuncio) => annuncio.category === activeCategory);
        } else {
            // Se è selezionato 'all', non filtriamo per categoria
            filteredData = data;
        }
        
        // Ottieni i prezzi della categoria filtrata e calcola il massimo
        let prices = filteredData.map((annuncio) => +annuncio.price).sort((a, b) => a - b);
        let maxPrice = prices.length > 0 ? Math.ceil(prices.pop()) : 0; // Prevenire errori se non ci sono annunci
        
        // Imposta il prezzo massimo e il valore del range
        priceInput.max = maxPrice;
        priceInput.value = maxPrice;
        priceValue.innerHTML = maxPrice;
    }
    
    // Funzione per filtrare per prezzo
    function filterPrice() {
        activePrice = priceInput.value; // Aggiorna il prezzo attivo
        globalFilter();
    }
    
    // Funzione per filtrare per parola
    function filterWord(parola) {
        activeWord = parola.toLowerCase(); // Aggiorna la parola attiva
        globalFilter();
    }
    
    // Funzione globale che applica tutti i filtri
    function globalFilter() {
        let filteredData = data;
        
        // Filtra per categoria
        if (activeCategory !== 'all') {
            filteredData = filteredData.filter((annuncio) => annuncio.category === activeCategory);
        }
        
        // Filtra per prezzo
        filteredData = filteredData.filter((annuncio) => +annuncio.price <= activePrice);
        
        // Filtra per parola
        if (activeWord) {
            filteredData = filteredData.filter((annuncio) => annuncio.name.toLowerCase().includes(activeWord));
        }
        
        showCards(filteredData);
    }
    
    // Event listeners
    document.querySelectorAll('.form-check-input').forEach((button) => {
        button.addEventListener('click', () => filterCategory(button.id));
    });
    
    priceInput.addEventListener('input', () => {
        priceValue.innerHTML = priceInput.value;
        filterPrice();
    });
    
    wordInput.addEventListener('input', () => {
        filterWord(wordInput.value);
    });
});
