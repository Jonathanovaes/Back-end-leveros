const express = require('express');
const bodyParser = require('body-parser');
const pedidos = require('./base.json')
const cors = require('cors')
const app = express();
app.use(bodyParser.json())

app.use(cors({ origin: 'http://localhost:3000', credentials: true }));


app.listen(4000 ,()=>{
    console.log('Servidor iniciado na porta 4000!')
})




app.get('/pedidos', (req, res)=>{
    try {
        return res.status(200).json(pedidos)
    } catch (error) {
        return res.status(400).json({error})
    }
})

app.get('/pedidos/resumoStatus', (req, res)=>{
    try {
        const statusDesejado = "PENDENTE"; 

        const qtdStatusProcessando = pedidos.filter(objeto => objeto.status === "PROCESSANDO");
        const qtdStatusPendente= pedidos.filter(objeto => objeto.status === "CANCELADO");
        const qtdStatusCancelado = pedidos.filter(objeto => objeto.status === "APROVADO");
        const qtdStatusAprovado = pedidos.filter(objeto => objeto.status === "PENDENTE");

        return res.status(200).json({"qtdStatusProcessando": qtdStatusProcessando.length, 
                                     "qtdStatusPendente": qtdStatusPendente.length,
                                     "qtdStatusCancelado": qtdStatusCancelado.length,
                                     "qtdStatusAprovado": qtdStatusAprovado.length,
                                     "qtdTotalPedidos": pedidos.length })
    } catch (error) {
        console.log(error)
        return res.status(400).json({error})
    }
})

app.get('/pedidos/totalVendas', (req, res)=>{
    try {
        const total = calcularTotalVendas()
        return res.status(200).json(total)
    } catch (error) {
        return res.status(400).json({error})
    }
})


function calcularTotalVendas() {
    let totalVendas = 0;
  
    for (const objeto of pedidos) {
      if (objeto.status !== "CANCELADO") {
        totalVendas += objeto.valor;
      }
    }
  
    return totalVendas;
  }
  