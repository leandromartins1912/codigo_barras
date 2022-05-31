import { calculaMod } from '../validate/calcula-mod'

class CalculaDigitoVerificador {
    public calculaDVCodBarras = (codigo: any, posicaoCodigo: number, mod: number) => {
        codigo = codigo.replace(/[^0-9]/g, '');

        codigo = codigo.split('');
        codigo.splice(posicaoCodigo, 1);
        codigo = codigo.join('');

        if (mod === 10) {
            return calculaMod.calculaMod10(codigo);
        } else if (mod === 11) {
            return calculaMod.calculaMod11(codigo);
        }
    }
}

export const calculaDigitoVerificador = new CalculaDigitoVerificador()