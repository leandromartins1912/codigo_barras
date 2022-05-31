import { identificaTipoBoleto } from './identifica-tipo-boleto'
import { calculaMod } from './calcula-mod'
import { identificarReferencia } from './identifica-referencia'
import { calculaDigitoVerificador } from '../validate/calcula-digito-verificador-codigo'

class ValidaDigitoVerficador {

    public validarCodigoComDV = (codigo: string, tipoCodigo: string) => {
        codigo = codigo.replace(/[^0-9]/g, '');

        var resultado;
        var tipoBoleto = identificaTipoBoleto.identificarTipoBoleto(codigo);
        const identificacaoValorRealOuReferencia = identificarReferencia.identificarReferencia(codigo);

        if (tipoCodigo === 'LINHA_DIGITAVEL') {
            if (tipoBoleto == 'BANCO' || tipoBoleto == 'CARTAO_DE_CREDITO') {
                const bloco1 = codigo.substr(0, 9) + calculaMod.calculaMod10(codigo.substr(0, 9));
                const bloco2 = codigo.substr(10, 10) + calculaMod.calculaMod10(codigo.substr(10, 10));
                const bloco3 = codigo.substr(21, 10) + calculaMod.calculaMod10(codigo.substr(21, 10));
                const bloco4 = codigo.substr(32, 1);
                const bloco5 = codigo.substr(33);

                resultado = (bloco1 + bloco2 + bloco3 + bloco4 + bloco5).toString();
            } else {

                if (identificacaoValorRealOuReferencia != null) {
                    var bloco1: string = '';
                    var bloco2: string = '';
                    var bloco3: string = '';
                    var bloco4: string = '';
                    if (identificacaoValorRealOuReferencia.mod === 10) {
                        bloco1 = codigo.substr(0, 11) + calculaMod.calculaMod10(codigo.substr(0, 11));
                        bloco2 = codigo.substr(12, 11) + calculaMod.calculaMod10(codigo.substr(12, 11));
                        bloco3 = codigo.substr(24, 11) + calculaMod.calculaMod10(codigo.substr(24, 11));
                        bloco4 = codigo.substr(36, 11) + calculaMod.calculaMod10(codigo.substr(36, 11));
                    } else if (identificacaoValorRealOuReferencia.mod === 11) {
                        bloco1 = codigo.substr(0, 11);
                        bloco2 = codigo.substr(12, 11);
                        bloco3 = codigo.substr(24, 11);
                        bloco4 = codigo.substr(36, 11);

                        let dv1 = parseInt(codigo.substr(11, 1));
                        let dv2 = parseInt(codigo.substr(23, 1));
                        let dv3 = parseInt(codigo.substr(35, 1));
                        let dv4 = parseInt(codigo.substr(47, 1));

                        let valid = (calculaMod.calculaMod11(bloco1) == dv1 &&
                            calculaMod.calculaMod11(bloco2) == dv2 &&
                            calculaMod.calculaMod11(bloco3) == dv3 &&
                            calculaMod.calculaMod11(bloco4) == dv4)

                        return valid;
                    }

                    resultado = bloco1 + bloco2 + bloco3 + bloco4;
                }
            }
        } else if (tipoCodigo === 'CODIGO_DE_BARRAS') {            

            if (tipoBoleto == 'BANCO' || tipoBoleto == 'CARTAO_DE_CREDITO') {
                const DV = calculaDigitoVerificador.calculaDVCodBarras(codigo, 4, 11);
                resultado = codigo.substr(0, 4) + DV + codigo.substr(5);
            } else {
                if (identificacaoValorRealOuReferencia != null) {
                    resultado = codigo.split('');
                    resultado.splice(3, 1);
                    resultado = resultado.join('');

                    const DV = calculaDigitoVerificador.calculaDVCodBarras(codigo, 3, identificacaoValorRealOuReferencia.mod);
                    resultado = resultado.substr(0, 3) + DV + resultado.substr(3);

                }

            }
        }
        return codigo === resultado;
    }
}

export const validaDigitoVerficador = new ValidaDigitoVerficador()