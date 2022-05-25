import { identificaTipoBoleto } from "./identifica-tipo-boleto";

    export function identificarData(codigo: string, tipoCodigo: string) {
        //var moment = require('moment-timezone'); moment("1997-10-07 20:54:59.000Z", "UTC");
        var moment = require('moment');
        codigo = codigo.replace(/[^0-9]/g, '');
        const tipoBoleto = identificaTipoBoleto.identificarTipoBoleto(codigo);

        let fatorData = '';
        let dataBoleto = moment("1997-10-07", "YYYY-MM-DD")

        if (tipoCodigo === 'CODIGO_DE_BARRAS') {
            if (tipoBoleto == 'BANCO' || tipoBoleto == 'CARTAO_DE_CREDITO') {
                fatorData = codigo.substr(5, 4)
            } else {
                fatorData = '0';
            }
        } else if (tipoCodigo === 'LINHA_DIGITAVEL') {
            if (tipoBoleto == 'BANCO' || tipoBoleto == 'CARTAO_DE_CREDITO') {
                fatorData = codigo.substr(33, 4)
            } else {
                fatorData = '0';
            }
        }

        dataBoleto.add(Number(fatorData), 'days');

        return dataBoleto;
    }


