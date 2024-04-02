//UNICSUL - Universidade Cruzeiro do Sul - Santo Amaro
//Analise Desenvolvimento de Sistemas - Noturno - 3º Sem
//Topicos Avançados de SI - I
//Autor: João Vitor Gualberto da Silva
//Data de Criação: 31/03/2024
//---------------------------------------------------------------------------------------
//Descrição:
//---------------------------------------------------------------------------------------
//- Criação de um servidor no qual processa informações de variaveis vindas pelo Request 
//do protocolo HTTP nos endpoints: "/", "/notas", "/imc" e "/dolar". onde:

//- "/" - Mostra a index

//- "/notas" - Recebe nota a1, a2 e media e retorna se esta aprovado ou reprovado de
//acordo com a media recebida (como variavel);

//- "/imc" - Recebe peso e altura, calcula o imc e retorna o resultado.

//- "/dolar" - Recebe o valor do dolar (cotação do dia), quanto deseja converter em reais
//- e retorna o valor correspondente em dolar convertido.


// Importando os modulos:
const http = require('http');
const url = require('url');

const PORT = 5678;

const server = http.createServer((req, res) => {
    const reqUrl = url.parse(req.url, true);
    const path = reqUrl.pathname;
    const query = reqUrl.query;

    if (path === '/') {
        res.writeHead(200, {'Content-Type': 'text/plain; charset=utf-8'});
        res.end("End-Point: INDEX ('/')\n");
    } else if (path === '/imc') {
        const valorPeso = parseFloat(query.peso);
        const valorAltura = parseFloat(query.altura);

        if (isNaN(valorAltura) || isNaN(valorPeso)) {
            res.writeHead(400, {'Content-Type': 'text/plain; charset=utf-8'});
            res.end("400 - Entre com um valor válido\n");
        } else {
            const imc = valorPeso / (valorAltura * valorAltura);

            let status = '';
            if (imc <= 19.5) {
                status = 'Abaixo do Peso';
            } else if (imc <= 25) {
                status = 'Peso Normal';
            } else if (imc <= 30) {
                status = 'Sobrepeso';
            } else if (imc <= 35) {
                status = 'Obesidade I';
            } else if (imc <= 40) {
                status = 'Obesidade II';
            } else {
                status = 'Obesidade III';
            }

            res.writeHead(200, {'Content-Type': 'text/plain; charset=utf-8'});
            res.end(`Peso: ${valorPeso.toFixed(2)} Kg\nAltura: ${valorAltura.toFixed(2)} m\nIMC = ${imc.toFixed(2)} - ${status}\n`);
        }

    } else if (path === '/notas') {
        const notaA1 = parseFloat(query.a1);
        const notaA2 = parseFloat(query.a2);
        const media = parseFloat(query.med);

        if (isNaN(notaA1) || isNaN(notaA2) || isNaN(media)) {
            res.writeHead(400, {'Content-Type': 'text/plain; charset=utf-8'});
            res.end("400 - Entre com um valor válido\n");
        } else {
            const calculo = (notaA1 + notaA2) / 2;

            const status = (calculo >= media) ? 'Aprovado' : 'Reprovado';

            res.writeHead(200, {'Content-Type': 'text/plain; charset=utf-8'});
            res.end(`Considerando notas:\nA1: ${notaA1.toFixed(2)}\nA2: ${notaA2.toFixed(2)}\nMédia = ${calculo.toFixed(2)} - ${status}\n`);
        }

    } else if (path === '/dolar') {
        const valorDolar = parseFloat(query.dolar);
        const valorReais = parseFloat(query.reais);

        if (isNaN(valorDolar) || isNaN(valorReais)) {
            res.writeHead(400, {'Content-Type': 'text/plain; charset=utf-8'});
            res.end("400 - Entre com um valor válido\n");
        } else {
            const convertido = valorReais / valorDolar;

            res.writeHead(200, {'Content-Type': 'text/plain; charset=utf-8'});
            res.end(`R$${valorReais.toFixed(2)} por U$${valorDolar.toFixed(2)} é igual a U$${convertido.toFixed(2)} convertidos\n`);
        }
    } else {
        res.writeHead(404, {'Content-Type': 'text/plain; charset=utf-8'});
        res.end("404 - Página não encontrada\n");
    }
});

server.listen(PORT, () => {
    console.log(`[OK] - Servidor iniciado na porta: ${PORT}`);
});
