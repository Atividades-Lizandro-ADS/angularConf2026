import { CommonModule } from '@angular/common';
import { Component, input, model, output } from '@angular/core';

@Component({
  selector: 'app-ticket-item-component',
  imports: [CommonModule],
  templateUrl: './ticket-item-component.html',
  styleUrl: './ticket-item-component.scss',
})
export class TicketItemComponent {
  eventName = input.required<string>();
  couponVal= output<number>();
  qtd = model<number>(1);
  cancel = output<void>();

  AdicionarIngresso(): void{
    this.qtd.update( v => v+1)
  }

  SubtrairIngresso(): void{
    this.qtd.update( v=> Math.max(1, v-1));
  }

  Cancelar(): void{
    this.cancel.emit();
  }

  UsarCupom(event: Event): void{
    const val = (event.target as HTMLInputElement).value.trim();
    if(val){
      alert(`buscando cupom ${val}`)
      const desconto = Number(val);
      if(!isNaN(desconto)){
        this.couponVal.emit(desconto);
      }
    }
  }
}
