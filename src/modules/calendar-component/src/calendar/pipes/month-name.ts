import {Pipe} from '@angular/core';

@Pipe({
  name: 'monthName'
})
export class monthName {
  private lang: string; // (es or en)
  transform(value, args) {
    if (args === 'es') { this.lang = 'es'; }
    let monthNames = [ 'Janvier', 'Fevrier', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Aout', 'Septembre', 'Octobre', 'Novembre', 'Decembre' ];
    if (this.lang === 'es') {
      monthNames = [ 'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre' ];
    }
    return monthNames[value - 1];
  }
}
