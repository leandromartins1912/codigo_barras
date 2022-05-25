import { substringReplace } from "../utils/substring-replace";
import { identificarReferencia } from "./identifica-referencia";

class IdentificaValorCodigoBarrasArreacadacao {
    public identificarValorCodBarrasArrecadacao = (codigo: string, tipoCodigo: string) => {
        codigo = codigo.replace(/[^0-9]/g, '');

        const isValorEfetivo = identificarReferencia.identificarReferencia(codigo)!.efetivo;

        let valorBoleto:any = '';
        let valorFinal;

        if (isValorEfetivo) {
            if (tipoCodigo == 'LINHA_DIGITAVEL') {
                valorBoleto = codigo.substr(4, 14);
                valorBoleto = codigo.split('');
                valorBoleto.splice(11, 1);
                valorBoleto = valorBoleto.join('');
                valorBoleto = valorBoleto.substr(4, 11);
            } else if (tipoCodigo == 'CODIGO_DE_BARRAS') {
                valorBoleto = codigo.substr(4, 11);
            }

            valorFinal = valorBoleto.substr(0, 9) + '.' + valorBoleto.substr(9, 2);

            let char = valorFinal.substr(1, 1);
            while (char === '0') {
                valorFinal = substringReplace.substringReplace(valorFinal, '', 0, 1);
                char = valorFinal.substr(1, 1);
            }

        } else {
            valorFinal = 0;
        }

        return valorFinal;
    }

}

export const identificaValorCodigoBarrasArreacadacao = new IdentificaValorCodigoBarrasArreacadacao()