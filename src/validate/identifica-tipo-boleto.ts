class IdentificaTipoBoleto {
    public identificarTipoBoleto = (codigo: string) => {
        codigo = codigo.replace(/[^0-9]/g, '');

        if (typeof codigo !== 'string') throw new TypeError('Insira uma string válida!');

        if (codigo.substr(-14) == '00000000000000' || codigo.substr(5, 14) == '00000000000000') {
            return 'CARTAO_DE_CREDITO';
        } else if (codigo.substr(0, 1) == '8') {
            if (codigo.substr(1, 1) == '1') {
                return 'ARRECADACAO_PREFEITURA';
            } else if (codigo.substr(1, 1) == '2') {
                return 'CONVENIO_SANEAMENTO';
            } else if (codigo.substr(1, 1) == '3') {
                return 'CONVENIO_ENERGIA_ELETRICA_E_GAS';
            } else if (codigo.substr(1, 1) == '4') {
                return 'CONVENIO_TELECOMUNICACOES';
            } else if (codigo.substr(1, 1) == '5') {
                return 'ARRECADACAO_ORGAOS_GOVERNAMENTAIS';
            } else if (codigo.substr(1, 1) == '6' || codigo.substr(1, 1) == '9') {
                return 'OUTROS';
            } else if (codigo.substr(1, 1) == '7') {
                return 'ARRECADACAO_TAXAS_DE_TRANSITO';
            }
        } else {
            return 'BANCO';
        }
    }
}

export const identificaTipoBoleto = new IdentificaTipoBoleto()