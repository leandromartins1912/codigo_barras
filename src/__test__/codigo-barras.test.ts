

import { validaDigitoVerficador } from 'src/validate/validar-digito-verificador';
import { identificaValor } from '../validate/identifica-valor'

describe("Valida campos código de barras", () => {
  describe("validarDigitoVerificador", () => {
    it("Valida se tipo de código de barras informado é Linha Digitavel, deve retornar um TRUE", () => {
      const result = validaDigitoVerficador.validarCodigoComDV(
        "10498370309703111504700033061144489910000054501",
        "LINHA_DIGITAVEL"
      );
      expect(result).toBe(true);
    });
  });

  describe("Identifica Valor final do código de Barras", () => {
    it("Valida se tipo de código de barras informado é Linha Digitavel, deve retornar um FALSE", () => {
      const result = validaDigitoVerficador.validarCodigoComDV(
        "1049837030970311150004700033061144489910000054501",
        "LINHA_DIGITAVEL"
      );
      expect(result).toBe(false);
    });
  });  
});

describe("Identifica Valor do código de barras", () => {
  describe("identificarValorCodBarrasArrecadacao", () => {
    it("Identifica o Valor do código de barras", () => {
      const result = identificaValor.identificarValor(
        "10498370309703111504700033061144489910000054501",
        "LINHA_DIGITAVEL"
      );
      expect(result).toBe(545.01);
    });
  });  
  
});
