

import { validaDigitoVerficador } from '../validate/validar-digito-verificador';
import { identificaValor } from '../validate/identifica-valor'
import { identificarData } from '../validate/identificar-data'
import { identificaTipoBoleto } from '../validate/identifica-tipo-boleto'
import { calculaMod } from '../validate/calcula-mod'
import { identificarReferencia } from '../validate/identifica-referencia'
import { identificaValorCodigoBarrasArreacadacao } from '../validate/identifica-valor-codigo-barras-arrecadacao'
import { substringReplace } from '../utils/substring-replace'
import { calculaDigitoVerificador } from '../validate/calcula-digito-verificador-codigo';
import { linhaDigitavelCodigoBarras } from '../validate/linha-digitavel-codigo-barras';

describe("Informa se o código de barras inserido é válido, calculando seu dígito verificador", () => {

  describe("codigo Numeração do boleto", () => {
    it("true = boleto válido / false = boleto inválido - FALSE", () => {
      const result = validaDigitoVerficador.validarCodigoComDV(
        "1049837030970311150004700033061144489910000054501",
        "LINHA_DIGITAVEL"
      );
      expect(result).toBe(false);
    });
  });

  describe("codigo Numeração do boleto", () => {
    it("true = boleto válido / false = boleto inválido - TRUE", () => {
      const result = validaDigitoVerficador.validarCodigoComDV(
        "83860000005096000190000008017823000034306271",
        "CODIGO_DE_BARRAS"
      );
      expect(result).toBe(true);
    });
  });

});

describe("Identifica o valor no boleto inserido", () => {

  describe("Identifica o valor no boleto inserido", () => {
    it("TipoCodigo tipo de código inserido (CODIGO_DE_BARRAS / LINHA_DIGITAVEL)", () => {
      const result = identificaValor.identificarValor(
        "10498370309703111504700033061144489910000054501",
        "LINHA_DIGITAVEL"
      );
      expect(result).toBe(545.01);
    });
  });

  describe("Identifica o valor no boleto inserido", () => {
    it("TipoCodigo tipo de código inserido (CODIGO_DE_BARRAS / LINHA_DIGITAVEL)", () => {
      const result = identificaValor.identificarValor(
        "10498370309703111504700033061144489910000054601",
        "LINHA_DIGITAVEL"
      );
      expect(result).not.toBe(545.01);
    });
  });

  describe("Identifica o valor no boleto inserido", () => {
    it("TipoCodigo tipo de código inserido (CODIGO_DE_BARRAS / LINHA_DIGITAVEL)", () => {
      const result = identificaValor.identificarValor(
        "83860000005096000190000008017823000034306271",
        "CODIGO_DE_BARRAS"
      );
      expect(result).toBe(509.6);
    });
  });

  describe("Identifica o valor no boleto inserido", () => {
    it("TipoCodigo tipo de código inserido (CODIGO_DE_BARRAS / LINHA_DIGITAVEL)", () => {
      const result = identificaValor.identificarValor(
        "83860000005106000190000008017823000034306271",
        "CODIGO_DE_BARRAS"
      );
      expect(result).not.toBe(509.6);
    });
  });

});

describe("Converte a numeração da linha digitável em código de barras", () => {

  describe("codigo Numeração do boleto", () => {
    it("Converte a numeração da linha digitável em código de barras", () => {
      const result = linhaDigitavelCodigoBarras.linhaDigitavel2CodBarras(
        "83860000005096000190000008017823000034306271"
      );
      expect(result).toBe("83860000005960001900000801782300034306271");
    });
  });

  describe("Identifica o valor no boleto inserido", () => {
    it("TipoCodigo tipo de código inserido (CODIGO_DE_BARRAS / LINHA_DIGITAVEL)", () => {
      const result = linhaDigitavelCodigoBarras.linhaDigitavel2CodBarras(
        "83860000005096000190000008017823000034306285"
      );
      expect(result).not.toBe("83860000005960001900000801782300034306271");
    });
  });

});

describe("Identifica o fator da data de vencimento do boleto", () => {

  describe("codigo Numeração do boleto", () => {
    it("tipoCodigo tipo de código inserido LINHA_DIGITAVEL", () => {
      const result = identificarData(
        "10498370309703111504700033061144489910000054501",
        "LINHA_DIGITAVEL"
      );
      expect(result).toEqual("2022-05-20");
    });

    describe("codigo Numeração do boleto", () => {
      it("tipoCodigo tipo de código inserido CODIGO_DE_BARRAS", () => {
        const result = identificarData(
          "23799755200003700003381260007827139500006330",
          "CODIGO_DE_BARRAS"
        );
        expect(result).toEqual("2018-06-11");
      });
    });

  });

  describe("Identifica o tipo de boleto inserido a partir da validação de seus dois dígitos iniciais.", () => {

    describe("codigo Numeração do boleto", () => {
      it("Tipo : BANCO", () => {
        const result = identificaTipoBoleto.identificarTipoBoleto(
          "10498370309703111504700033061144489910000054501"
        );
        expect(result).toEqual('BANCO');
      });
    });

    describe("codigo Numeração do boleto", () => {
      it("Tipo: ARRECADACAO_PREFEITURA", () => {
        const result = identificaTipoBoleto.identificarTipoBoleto(
          "816800000001546429112016906170000028443941090039"
        );
        expect(result).toEqual('ARRECADACAO_PREFEITURA');
      });
    });

    describe("codigo Numeração do boleto", () => {
      it("Tipo: CONVENIO_TELECOMUNICACOES", () => {
        const result = identificaTipoBoleto.identificarTipoBoleto(
          "846700000009577601090118004714188507401302518618"
        );
        expect(result).toEqual('CONVENIO_TELECOMUNICACOES');
      });
    });

    describe("codigo Numeração do boleto", () => {
      it("Tipo: CONVENIO_SANEAMENTO", () => {
        const result = identificaTipoBoleto.identificarTipoBoleto(
          "826300000013150803612020205180000031385304202216"
        );
        expect(result).toEqual('CONVENIO_SANEAMENTO');
      });
    });

    describe("codigo Numeração do boleto", () => {
      it("Tipo: ORGAOS_GOVERNAMENTAIS", () => {
        const result = identificaTipoBoleto.identificarTipoBoleto(
          "85800000007387902322018040310211362774511488"
        );
        expect(result).toEqual('ORGAOS_GOVERNAMENTAIS');
      });
    });

  });

  describe("Função auxiliar para remover os zeros à esquerda dos valores detectados no código inserido", () => {

    describe("str Texto a ser verificado, repl Texto que substituirá, inicio Posição inicial, tamanho Tamanho", () => {
      it("Função auxiliar para remover os zeros à esquerda dos valores detectados no código inserido", () => {
        const result = substringReplace.substringReplace('00000545.01', '', -1, 1)
        expect(result).toEqual('00000545.0');
      });
    });

    describe("str Texto a ser verificado, repl Texto que substituirá, inicio Posição inicial, tamanho Tamanho", () => {
      it("Função auxiliar para remover os zeros à esquerda dos valores detectados no código inserido", () => {
        const result = substringReplace.substringReplace('00000545.01', '', -1, -1)
        expect(result).toEqual('00000545.01');
      });
    });

    describe("str Texto a ser verificado, repl Texto que substituirá, inicio Posição inicial, tamanho Tamanho", () => {
      it("Função auxiliar para remover os zeros à esquerda dos valores detectados no código inserido", () => {
        const result = substringReplace.substringReplace('00000545.01', '', -1, -1)
        expect(result).toEqual('00000545.01');
      });
    });

  });

  describe("Calcula o dígito verificador de uma numeração a partir do módulo 10", () => {

    describe("numero Numeração", () => {
      it("Deve retornar a soma em caso o mod10", () => {
        const result = calculaMod.calculaMod10('341910904')
        expect(result).toEqual(0);
      });

      it("Deve retornar a soma em caso o mod10", () => {
        const result = calculaMod.calculaMod10('0906499816')
        expect(result).toEqual(5);
      });

      it("Deve retornar a soma em caso o mod10", () => {
        const result = calculaMod.calculaMod10('6001803000')
        expect(result).toEqual(1);
      });

      it("Deve retornar a soma em caso o mod10", () => {
        const result = calculaMod.calculaMod10('6001803000123')
        expect(result).not.toEqual(1);
      });

    });

  });

  describe("Calcula o dígito verificador de uma numeração a partir do módulo 11", () => {
    describe("Calcula Mod11", () => {
      it("Calcula o dígito verificador de uma numeração a partir do módulo 11", () => {
        const result = calculaMod.calculaMod11('2379755200003700003381260007827139500006330')
        expect(result).toEqual(9);
      });

    });
  })

  describe("Identifica o o código de referência do boleto para determinar qual módulo será utilizado para calcular os dígitos verificadores", () => {

    describe("codigo Numeração do boleto", () => {
      it("tipoCodigo tipo de código inserido (CODIGO_DE_BARRAS / LINHA_DIGITAVEL)", () => {
        const result = identificarReferencia.identificarReferencia('84670000000577601090110047141885040130251861');
        expect(result).toEqual({ "efetivo": true, "mod": 10 });
      });
    });

    describe("codigo Numeração do boleto", () => {
      it("tipoCodigo tipo de código inserido (CODIGO_DE_BARRAS / LINHA_DIGITAVEL)", () => {
        const result = identificarReferencia.identificarReferencia('83860000005096000190000008017823000034306271')
        expect(result).toEqual({ "efetivo": true, "mod": 11 });
      });
    });

  });

  describe("Identifica o valor no CÓDIGO DE BARRAS do boleto do tipo 'Arrecadação'", () => {
    it("codigo Numeração do boleto, tipoCodigo tipo de código inserido (CODIGO_DE_BARRAS / LINHA_DIGITAVEL)", () => {
      const result = identificaValorCodigoBarrasArreacadacao.identificarValorCodBarrasArrecadacao('84670000000577601090110047141885040130251861', 'LINHA_DIGITAVEL')
      expect(result).toEqual('077.60');
    });
  });


  describe("Calcula o dígito verificador de toda a numeração do código de barras", () => {
    describe("posicaoCodigo Posição onde deve se encontrar o dígito verificador", () => {
      it("mod Módulo 10", () => {
        const result = calculaDigitoVerificador.calculaDVCodBarras('10498.37030 97031.115047 00031.211733 9 89020000054501', 1, 10)
        expect(result).toEqual(5);
      });
    });

    describe("posicaoCodigo Posição onde deve se encontrar o dígito verificador", () => {
      it("mod Módulo 11", () => {
        const result = calculaDigitoVerificador.calculaDVCodBarras('83860000005096000190000008017823000034306271', 4, 11)
        expect(result).toEqual(7);
      });
    });

  });

});

