
class Utils {
    clearMask(codigo: string){
        return codigo.replace(/( |\.|-)/g, '');
    }
}

export const utils = new Utils()


