// Modal
var modalFecharPedido = document.getElementById("fecharPedido")

modalFecharPedido.addEventListener("click", function(event) {
    if(event.target.textContent == 'Concluir'){
        modalFecharPedido.style.display = "none"
    }
    if(event.target.textContent == 'Cancelar'){
        modalFecharPedido.style.display = "none"
    }
})