import { calculaMod } from "./calcula-mod";
import { identificarReferencia } from "./identifica-referencia";
import { identificaTipoBoleto } from "./identifica-tipo-boleto";

class CodigoBarrasLinhaDigitavel{
    public codigoBarras2LinhaDigitavel = (codigo:string, formatada:boolean) => {
        codigo = codigo.replace(/[^0-9]/g, '');
    
        const tipoBoleto = identificaTipoBoleto.identificarTipoBoleto(codigo);
    
        let resultado = '';
    
        if (tipoBoleto == 'BANCO') {
            const novaLinha = codigo.substr(0, 4) + codigo.substr(19, 25) + codigo.substr(4, 1) + codigo.substr(5, 14);
    
            const bloco1 = novaLinha.substr(0, 9) + calculaMod.calculaMod10(novaLinha.substr(0, 9));
            const bloco2 = novaLinha.substr(9, 10) + calculaMod.calculaMod10(novaLinha.substr(9, 10));
            const bloco3 = novaLinha.substr(19, 10) + calculaMod.calculaMod10(novaLinha.substr(19, 10));
            const bloco4 = novaLinha.substr(29);
    
            resultado = (bloco1 + bloco2 + bloco3 + bloco4).toString();
    
            if (formatada) {
                resultado =
                    resultado.slice(0, 5) +
                    '.' +
                    resultado.slice(5, 10) +
                    ' ' +
                    resultado.slice(10, 15) +
                    '.' +
                    resultado.slice(15, 21) +
                    ' ' +
                    resultado.slice(21, 26) +
                    '.' +
                    resultado.slice(26, 32) +
                    ' ' +
                    resultado.slice(32, 33) +
                    ' ' +
                    resultado.slice(33);
            }
        } else {
            const identificacaoValorRealOuReferencia = identificarReferencia.identificarReferencia(codigo);
            var bloco1: string = '';
            var bloco2: string = '';
            var bloco3: string = '';
            var bloco4: string = '';

            if(identificacaoValorRealOuReferencia != null){                

                if (identificacaoValorRealOuReferencia.mod == 10) {
                    bloco1 = codigo.substr(0, 11) + calculaMod.calculaMod10(codigo.substr(0, 11));
                    bloco2 = codigo.substr(11, 11) + calculaMod.calculaMod10(codigo.substr(11, 11));
                    bloco3 = codigo.substr(22, 11) + calculaMod.calculaMod10(codigo.substr(22, 11));
                    bloco4 = codigo.substr(33, 11) + calculaMod.calculaMod10(codigo.substr(33, 11));
                } else if (identificacaoValorRealOuReferencia.mod == 11) {
                    bloco1 = codigo.substr(0, 11) + calculaMod.calculaMod11(codigo.substr(0, 11));
                    bloco2 = codigo.substr(11, 11) + calculaMod.calculaMod11(codigo.substr(11, 11));
                    bloco3 = codigo.substr(22, 11) + calculaMod.calculaMod11(codigo.substr(22, 11));
                    bloco4 = codigo.substr(33, 11) + calculaMod.calculaMod11(codigo.substr(33, 11));
                }
        
                resultado = bloco1 + bloco2 + bloco3 + bloco4;
            }
    
        }
    
        return resultado;
    }
}

export const codigoBarrasLinhaDigitavel = new CodigoBarrasLinhaDigitavel()