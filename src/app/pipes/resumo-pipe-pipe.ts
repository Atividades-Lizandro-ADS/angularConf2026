import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'resumo',
  standalone:true
})
export class ResumoPipePipe implements PipeTransform {
  transform(texto: string, max: number = 20): string {
    if(texto.length>max){
      return texto.substring(0,max) + "...";
    }
    return texto;
  }
}
