class SubstringReplace{
   public substringReplace = (str:string, repl:any, inicio:number, tamanho:number) => {
        if (inicio < 0) {
            inicio = inicio + str.length;
        }
    
        tamanho = tamanho !== undefined ? tamanho : str.length;
        if (tamanho < 0) {
            tamanho = tamanho + str.length - inicio;
        }
    
        return [
            str.slice(0, inicio),
            repl.substr(0, tamanho),
            repl.slice(tamanho),
            str.slice(inicio + tamanho)
        ].join('');
    }

}

export const substringReplace = new SubstringReplace()