class IdentificarReferencia {
    public identificarReferencia = (codigo: string) => {
        codigo = codigo.replace(/[^0-9]/g, '');

        const referencia = codigo.substr(2, 1);

        if (typeof codigo !== 'string') throw new TypeError('Insira uma string válida!');

        if (referencia == '6') {
            return {
                mod: 10,
                efetivo: true
            }
        }

        if (referencia == '7') {
            return {
                mod: 10,
                efetivo: false
            }
        }

        if (referencia == '8') {
            return {
                mod: 11,
                efetivo: true
            }
        }

        if (referencia == '9') {
            return {
                mod: 11,
                efetivo: false
            }
        }
    }
}

export const identificarReferencia = new IdentificarReferencia()