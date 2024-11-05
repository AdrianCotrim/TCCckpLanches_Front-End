const token = localStorage.getItem('authToken');
const entregasArray = [];
const pedidos = document.getElementById("pedidos");
pedidos.style.cursor = "pointer"
let pedidoSelecionado = null;

fetch("http://localhost:8080/pedidos", {
    headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json'
    }
})
.then(response => response.json())
.then(dados => dados.forEach(pedido => {
    if(pedido.deliveryDTO != null){
        entregasArray.push(pedido);
        buscaEntregas(pedido);
    }
    }))
.catch(erro => console.log(erro))

console.log(entregasArray);


function buscaEntregas(pedido){
    const entregaDiv = document.createElement("div");
    const entregaCont = document.createElement("div");
    const nomeCliente = document.createElement("p");
    const numero = document.createElement("label");
    const valor = document.createElement("label");
    const situacaoPedido = document.createElement("div");

    entregaDiv.classList.add("pedido", "mt-3", "me-2", "ms-2", "mb-1");
    entregaCont.classList.add("info-pedido");
    numero.classList.add("pe-5");
    valor.classList.add("valor");
    situacaoPedido.classList.add("situacao-pedido");

    if(pedido.orderStatus == 'FINALIZADO'){
        situacaoPedido.style.backgroundColor = "var(--verde)";
    } else if(pedido.orderStatus == 'PRONTO'){
        situacaoPedido.style.backgroundColor = "var(--azul)";
    } else{
        situacaoPedido.style.backgroundColor = "var(--vermelho)";
    }

    nomeCliente.textContent = pedido.customerName;
    numero.textContent = "Nº "+pedido.orderId;
    valor.textContent = "R$"+pedido.totalValue;

    entregaCont.appendChild(nomeCliente);
    entregaCont.appendChild(numero);
    entregaCont.appendChild(valor);
    entregaDiv.appendChild(entregaCont);
    entregaDiv.appendChild(situacaoPedido);
    
    pedidos.appendChild(entregaDiv);
}
/////////
const id = document.getElementById('id-entrega');
const cliente = document.getElementById("cliente");
const endereco = document.getElementById("endereco");
const complemento = document.getElementById("complemento");
const valorPedido = document.getElementById("valorPedido");
const valorTaxa = document.getElementById("valorTaxa");
const valorTotal = document.getElementById("valorTotal");

pedidos.addEventListener("click", (event) => {
    if(event.target.classList.contains("info-pedido")){
        document.getElementById('info-entrega').style.display = 'block';
        pedidoSelecionado = event.target.parentNode;
        console.log(pedidoSelecionado);
        
        const nome = pedidoSelecionado.querySelector(".info-pedido").firstChild.textContent;
        
        entregasArray.forEach(entrega => {
            if(entrega.customerName == nome){
                id.value = entrega.deliveryDTO.id;
                console.log(id.value);
                cliente.textContent = entrega.customerName;
                endereco.textContent = entrega.deliveryDTO.address;
                complemento.textContent = entrega.deliveryDTO.complement ? entrega.deliveryDTO.complement : "*"
                valorPedido.textContent = "R$"+entrega.subValue;
                valorTaxa.textContent = "R$"+entrega.deliveryDTO.fee;
                valorTotal.textContent = "R$"+entrega.totalValue;
                
            }
        });
        
    }
})