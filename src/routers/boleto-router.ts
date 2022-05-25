import express from 'express'
import { utils } from '../../src/utils/Utils'
import { identificarTipoCodigo } from '../services/Identificador-Codigo'
import { identificaTipoBoleto } from '../validate/identifica-tipo-boleto'
import { validarCodigoComDV } from '../validate/validar-digito-verificador'
import { Retorno } from '../types/types'
import { linhaDigitavelCodigoBarras } from '../validate/linha-digitavel-codigo-barras'
import { codigoBarrasLinhaDigitavel } from '../validate/codigo-barras-linha-digitavel'
import { identificaValor } from '../validate/identifica-valor'
import { identificarData } from '../validate/identificar-data'



const boletoRouter = express.Router()

boletoRouter.get('/', (req, res) => {
    res.send('boletos')
})

boletoRouter.get('/:id', (req, res) => {
    var retorno: Retorno = {
        sucesso: false,
        codigoInput: '',
        mensagem: '',
        tipoCodigoInput: '',
        tipoBoleto: '',
        codigoBarras: '',
        linhaDigitavel: '',
        vencimento: '',
        valor: 0
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

    if (!validarCodigoComDV(codigo, tipoCodigo)) {
        retorno.sucesso = false;
        retorno.codigoInput = codigo;
        retorno.mensagem = 'A validação do dígito verificador falhou. Tem certeza que inseriu a numeração correta?';
        res.status(400)
        return res.json(retorno)
    } else {
        retorno.sucesso = true;
        retorno.codigoInput = codigo;
        retorno.mensagem = 'Boleto válido';
        res.status(200)

        switch (tipoCodigo) {
            case 'LINHA_DIGITAVEL':
                retorno.tipoCodigoInput = 'LINHA_DIGITAVEL';
                retorno.tipoBoleto = identificaTipoBoleto.identificarTipoBoleto(codigo)!;
                retorno.codigoBarras = linhaDigitavelCodigoBarras.linhaDigitavel2CodBarras(codigo);
                retorno.linhaDigitavel = codigo;
                retorno.vencimento = identificarData(codigo, 'LINHA_DIGITAVEL').format('YYYY-MM-DD');
                retorno.valor = identificaValor.identificarValor(codigo, 'LINHA_DIGITAVEL');
                break;
            case 'CODIGO_DE_BARRAS':
                retorno.tipoCodigoInput = 'CODIGO_DE_BARRAS';
                retorno.tipoBoleto = identificaTipoBoleto.identificarTipoBoleto(codigo)!;
                retorno.codigoBarras = codigo;
                retorno.linhaDigitavel = codigoBarrasLinhaDigitavel.codBarras2LinhaDigitavel(codigo, false);
                retorno.vencimento = identificarData(codigo, 'CODIGO_DE_BARRAS').format('YYYY-MM-DD');
                retorno.valor = identificaValor.identificarValor(codigo, 'CODIGO_DE_BARRAS');
                break;
            default:
                break;
        }
    }
    return res.json(retorno)
})

export default boletoRouter