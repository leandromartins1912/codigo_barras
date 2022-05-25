import { substringReplace } from "../utils/substring-replace";
import { identificaTipoBoleto } from "./identifica-tipo-boleto";
import { identificaValorCodigoBarrasArreacadacao } from "./identifica-valor-codigo-barras-arrecadacao";

class IdentificaValor{
    public identificarValor = (codigo:string, tipoCodigo:string) => {

        const tipoBoleto = identificaTipoBoleto.identificarTipoBoleto(codigo);
    
        let valorBoleto = '';
        let valorFinal: any ;
    
        if (tipoCodigo == 'CODIGO_DE_BARRAS') {
            if (tipoBoleto == 'BANCO' || tipoBoleto == 'CARTAO_DE_CREDITO') {
                valorBoleto = codigo.substr(9, 10);
                valorFinal = valorBoleto.substr(0, 8) + '.' + valorBoleto.substr(8, 2);
    
                let char = valorFinal.substr(1, 1);
                while (char === '0') {
                    valorFinal = substringReplace.substringReplace(valorFinal, '', 0, 1);
                    char = valorFinal.substr(1, 1);
                }
            } else {
                valorFinal = identificaValorCodigoBarrasArreacadacao.identificarValorCodBarrasArrecadacao(codigo, 'CODIGO_DE_BARRAS');
            }
    
        } else if (tipoCodigo == 'LINHA_DIGITAVEL') {
            if (tipoBoleto == 'BANCO' || tipoBoleto == 'CARTAO_DE_CREDITO') {
                valorBoleto = codigo.substr(37);
                valorFinal = valorBoleto.substr(0, 8) + '.' + valorBoleto.substr(8, 2);
    
                let char = valorFinal.substr(1, 1);
                while (char === '0') {
                    valorFinal = substringReplace.substringReplace(valorFinal, '', 0, 1);
                    char = valorFinal.substr(1, 1);
                }
            } else {
                valorFinal = identificaValorCodigoBarrasArreacadacao.identificarValorCodBarrasArrecadacao(codigo, 'LINHA_DIGITAVEL');
            }
        }
        return parseFloat(valorFinal);
    }
}

export const identificaValor = new IdentificaValor()