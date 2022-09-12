function buscarProducto() {
    const input = document.getElementById("filtro").value.toUpperCase();
    const cards = productosEl.getElementsByClassName("seccionEncuadrado--mediano")
    
    for(let i = 0; i < cards.length; i++) {
        let titulo = cards[i].querySelector("h2");
        
        if(titulo.innerHTML.toUpperCase().indexOf(input) > -1) {
            cards[i].style.display = ""
        } else {
            cards[i].style.display = "none";
        }
    }
    
}