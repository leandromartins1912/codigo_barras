class IdentificarReferencia {
    public identificarReferencia = (codigo: string) => {
        codigo = codigo.replace(/[^0-9]/g, '');

        const referencia = codigo.substr(2, 1);

        if (typeof codigo !== 'string') throw new TypeError('Insira uma string válida!');

        switch (referencia) {
            case '6':
                return {
                    mod: 10,
                    efetivo: true
                };
                break;
            case '7':
                return {
                    mod: 10,
                    efetivo: false
                };
                break;
            case '8':
                return {
                    mod: 11,
                    efetivo: true
                };
                break;
            case '9':
                return {
                    mod: 11,
                    efetivo: false
                };
                break;
            default:
                break;
        }
    }
}

export const identificarReferencia = new IdentificarReferencia()