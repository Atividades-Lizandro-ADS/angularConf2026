import { Component, signal } from '@angular/core';
import { TicketItemComponent } from '../ticket-item-component/ticket-item-component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-checkout-component',
  standalone: true,
  imports: [CommonModule,TicketItemComponent],
  templateUrl: './checkout-component.html',
  styleUrl: './checkout-component.scss',
})
export class CheckoutComponent {
  qtd = signal<number>(1);
  Status=signal<string>('Aguardando Finalização');
  desconto= signal<number>(0);

  ehCancelado(): boolean{
    return this.Status().toLowerCase().includes('cancelamento');    
  }

  onCancel(): void{
    this.Status.set('O usuário efetuou o cancelamento da compra.');
  }

  AplicarDesconto(valor: number): void{
    const totalAtual = this.qtd()*150;
    const totalDesconto = totalAtual - valor;

    if(totalDesconto >= 100){
      this.desconto.set(valor);
    }else{
      this.desconto.set(totalAtual - 100);
      alert('Desconto limitado. O valor mínimo do pedido é R$ 100,00');
    }
  }
}
