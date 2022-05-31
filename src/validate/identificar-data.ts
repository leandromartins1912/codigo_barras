import { identificaTipoBoleto } from "./identifica-tipo-boleto";
import { linhaDigitavelCodigoBarras } from '../validate/linha-digitavel-codigo-barras'

export function identificarData(codigo: string, tipoCodigo: string) {

    var moment = require('moment');
    codigo = codigo.replace(/[^0-9]/g, '');
    const tipoBoleto = identificaTipoBoleto.identificarTipoBoleto(codigo);
    var linha = linhaDigitavelCodigoBarras.linhaDigitavel2CodBarras(codigo)

    let fatorData = '';
    let dataBoleto = moment("1997-10-07", "YYYY-MM-DD")


    if (tipoCodigo === 'CODIGO_DE_BARRAS') {
        if (tipoBoleto == 'BANCO') {
            fatorData = codigo.substr(5, 4)
        } else {
            fatorData = '0';
        }

    } else if (tipoCodigo === 'LINHA_DIGITAVEL') {
        if (tipoBoleto == 'BANCO') {
            fatorData = codigo.substr(33, 4)
        } else if (tipoBoleto === 'CONVENIO_ENERGIA_ELETRICA_E_GAS' || tipoBoleto === 'CONVENIO_TELECOMUNICACOES' || tipoBoleto === 'CONVENIO_SANEAMENTO' || tipoBoleto === 'ORGAOS_GOVERNAMENTAIS') {
            return linha.substr(19, 4) + '-' + linha.substr(23, 2) + '-' + linha.substr(25, 2);
        } else {
            fatorData = '0';
        }

    }

    dataBoleto.add(Number(fatorData), 'days');

    return dataBoleto.format('YYYY-MM-DD');
}


