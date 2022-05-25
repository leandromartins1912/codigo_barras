class CalcularMod {
    public calculaMod10 = (numero: string) => {

        numero = numero.replace(/\D/g, '');
        var i;
        var mult = 2;
        var soma = 0;
        var s = '';

        for (i = numero.length - 1; i >= 0; i--) {
            s = (mult * parseInt(numero.charAt(i))) + s;
            if (--mult < 1) {
                mult = 2;
            }
        }
        for (i = 0; i < s.length; i++) {
            soma = soma + parseInt(s.charAt(i));
        }
        soma = soma % 10;
        if (soma != 0) {
            soma = 10 - soma;
        }
        return soma;
    }

    public calculaMod11 = (bloco: string) => {
        let sequencia = [4, 3, 2, 9, 8, 7, 6, 5];
        let digit = 0;
        let j = 0;
        let DAC = 0;


        for (var i = 0; i < bloco.length; i++) {
            let mult = sequencia[j];
            j++;
            j %= sequencia.length;
            digit += mult * parseInt(bloco.charAt(i));
        }

        DAC = digit % 11;

        if (DAC == 0 || DAC == 1)
            return 0;
        if (DAC == 10)
            return 1;

        return (11 - DAC);
    }
}

export const calculaMod = new CalcularMod()