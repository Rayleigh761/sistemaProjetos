import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'statusClass'
})
export class StatusClassPipe implements PipeTransform {

  transform(value: string): string {
    switch (value) {
      case 'Concluído':
        return 'status-aprovado';
      case 'A Aprovar':
      case 'A planejar':
      case 'A Validar':
      case 'A Dimensionar':
        return 'status-pendente';
      case 'Cancelado':
        return 'status-rejeitado';
      case 'Em Desenvolvimento':
      case 'Em correção':
        return 'status-dimensionado';
      default:
        return '';
    }
  }

}
