import { Component, signal, computed } from '@angular/core';
import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';
import { Ingresso } from '../../interfaces/ingresso';
import { ResumoPipePipe } from '../../pipes/resumo-pipe-pipe';
import { CardComponent } from '../card-component/card-component';
import { DESCRICOES } from '../../constantes/descs';
import { PRECOS } from '../../constantes/precos';
import { mockIngressos } from '../../constantes/mock';

@Component({
  selector: 'app-checkout-component',
  standalone: true,
  imports: [CommonModule, CardComponent, ResumoPipePipe, DatePipe, CurrencyPipe],
  templateUrl: './checkout-component.html',
  styleUrl: './checkout-component.scss',
})
export class CheckoutComponent {
  Status = signal<string>('Aguardando Finalização');
  desconto = signal<number>(0);
  tipoSelecionado = signal<'VIP' | 'STANDARD' | 'MEIA'>('STANDARD');
  proximoId = signal<number>(4);

  ingressos = signal<Ingresso[]>(mockIngressos);

  totalBruto = computed(() =>
    this.ingressos().reduce((acc, i) => acc + i.preco, 0)
  );

  totalFinal = computed(() => {
    const total = this.totalBruto() - this.desconto();
    return total < 0 ? 0 : total;
  });

  ehCancelado(): boolean {
    return this.Status().toLowerCase().includes('cancelamento');
  }

  onCancel(): void {
    this.Status.set('O usuário efetuou o cancelamento da compra.');
  }

  adicionarIngresso(): void {
    const tipo = this.tipoSelecionado();
    const novoIngresso: Ingresso = {
      id: this.proximoId(),
      nome: 'Angular Conf 2026',
      tipo,
      data: new Date('2026-09-15'),
      preco: PRECOS[tipo],
      descricao: DESCRICOES[tipo],
    };
    this.ingressos.update((lista) => [...lista, novoIngresso]);
    this.proximoId.update((id) => id + 1);
    this.revalidarDesconto();
  }

  removerIngresso(id: number): void {
    this.ingressos.update((lista) => lista.filter((i) => i.id !== id));
    this.revalidarDesconto();
  }

  AplicarDesconto(valor: number): void {
    const totalAtual = this.totalBruto();
    const totalDesconto = totalAtual - valor;
    if (totalDesconto >= 50 ) {
      this.desconto.set(valor);
    }
    
    else {
      this.desconto.set(totalAtual - 50);
      alert('Desconto limitado. O valor mínimo do pedido é R$ 50,00');
    }
  }

  private revalidarDesconto(): void {
    const descAtual = this.desconto();
    if (descAtual > 0) {
      this.AplicarDesconto(descAtual);
    }
  }

  onTipoChange(event: Event): void {
    const valor = (event.target as HTMLSelectElement).value as 'VIP' | 'STANDARD' | 'MEIA';
    this.tipoSelecionado.set(valor);
  }
}