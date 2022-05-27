import express from 'express'

import { identificarTipoCodigo } from '../services/Identificador-Codigo'
import { identificaTipoBoleto } from '../validate/identifica-tipo-boleto'

import { Retorno } from '../types/types'
import { linhaDigitavelCodigoBarras } from '../validate/linha-digitavel-codigo-barras'
import { codigoBarrasLinhaDigitavel } from '../validate/codigo-barras-linha-digitavel'
import { identificaValor } from '../validate/identifica-valor'
import { identificarData } from '../validate/identificar-data'
import { validaDigitoVerficador } from '../validate/validar-digito-verificador'


const boletoRouter = express.Router()

boletoRouter.get('/', (req, res) => {
    res.send('boletos')
})

boletoRouter.get('/:id', (req, res) => {
    var retorno: Retorno = { 
        codigoBarras: '',       
        valor: 0,
        vencimento: ''
    };


    var codigo = req.params.id.replace(/[^0-9]/g, '');
    let tipoCodigo = identificarTipoCodigo.identificarTipoCodigo(codigo);

    codigo.length == 36 ? codigo = codigo + '00000000000' : codigo = codigo + '0';

    if (![44, 46, 47, 48].includes(codigo.length)) {
        retorno.sucesso = false;
        retorno.codigoInput = codigo;
        retorno.mensagem = 'Por favor insira uma numeração válida. Códigos de barras SEMPRE devem ter 44 caracteres numéricos. Linhas digitáveis podem possuir 46 (boletos de cartão de crédito), 47 (boletos bancários/cobrança) ou 48 (contas convênio/arrecadação) caracteres numéricos. Qualquer caractere não numérico será desconsiderado.';
        res.status(400)
        return res.json(retorno);
    }

    if (codigo.substr(0, 1) == '8' && codigo.length == 46 || codigo.length == 47) {
        retorno.sucesso = false;
        retorno.codigoInput = codigo;
        retorno.mensagem = 'Este tipo de boleto deve possuir um código de barras 44 caracteres numéricos. Ou linha digitável de 48 caracteres numéricos.';
        res.status(400)
        return res.json(retorno);
    }

    if (!validaDigitoVerficador.validarCodigoComDV(codigo, tipoCodigo)) {
        retorno.sucesso = false;
        retorno.codigoInput = codigo;
        retorno.mensagem = 'A validação do dígito verificador falhou. Tem certeza que inseriu a numeração correta?';
        res.status(400)
        return res.json(retorno)
    } else {
        switch (tipoCodigo) {
            case 'LINHA_DIGITAVEL':
                retorno.codigoBarras = linhaDigitavelCodigoBarras.linhaDigitavel2CodBarras(codigo);
                retorno.valor = identificaValor.identificarValor(codigo, 'LINHA_DIGITAVEL');
                retorno.vencimento = identificarData(codigo, 'LINHA_DIGITAVEL').format('YYYY-MM-DD');
                break;
            case 'CODIGO_DE_BARRAS':               
                retorno.codigoBarras = codigo;               
                retorno.valor = identificaValor.identificarValor(codigo, 'CODIGO_DE_BARRAS');
                retorno.vencimento = identificarData(codigo, 'CODIGO_DE_BARRAS').format('YYYY-MM-DD');
                break;
            default:
                break;
        }
        res.status(200)
    }
    return res.json(retorno)
})

export default boletoRouter