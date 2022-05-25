import { identificaTipoBoleto } from "./identifica-tipo-boleto";

class LinhaDigitavelCodigoBarras{
    public linhaDigitavel2CodBarras = (codigo:any) => {
        codigo = codigo.replace(/[^0-9]/g, '');
    
        const tipoBoleto = identificaTipoBoleto.identificarTipoBoleto(codigo);
    
        let resultado = '';
    
        if (tipoBoleto == 'BANCO' || tipoBoleto == 'CARTAO_DE_CREDITO') {
            resultado = codigo.substr(0, 4) +
                codigo.substr(32, 1) +
                codigo.substr(33, 14) +
                codigo.substr(4, 5) +
                codigo.substr(10, 10) +
                codigo.substr(21, 10);
        } else {
    
            codigo = codigo.split('');
            codigo.splice(11, 1);
            codigo.splice(22, 1);
            codigo.splice(33, 1);
            codigo.splice(44, 1);
            codigo = codigo.join('');
    
            resultado = codigo;
        }
    
        return resultado;
    }
}

export const linhaDigitavelCodigoBarras = new LinhaDigitavelCodigoBarras()
