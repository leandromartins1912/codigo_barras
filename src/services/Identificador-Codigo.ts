class IdentificadorCodigo {
    public identificarTipoCodigo = (codigo: string) => {
        if (typeof codigo !== 'string') throw new TypeError('Insira uma string válida!');

        codigo = codigo.replace(/[^0-9]/g, '');

        if (codigo.length == 44) {
            return 'CODIGO_DE_BARRAS'
        } else if (codigo.length == 46 || codigo.length == 47 || codigo.length == 48) {
            return 'LINHA_DIGITAVEL'
        } else {
            return 'TAMANHO_INCORRETO';
        }
    }
}

export const identificarTipoCodigo = new IdentificadorCodigo()