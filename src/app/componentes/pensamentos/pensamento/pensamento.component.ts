import { NgClass } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Pensamento } from '../pensamento';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pensamento',
  standalone: true,
  imports: [NgClass],
  templateUrl: './pensamento.component.html',
  styleUrl: './pensamento.component.css'
})

export class PensamentoComponent {
  @Input() pensamento: Pensamento = {
    id: '',
    conteudo: 'I love Angular',
    autoria: 'Andressa',
    modelo: 'modelo2'
  }

  larguraPensamento(): string {
    if(this.pensamento.conteudo.length >= 256) {
      return 'pensamento-g'
    }
    return 'pensamento-p'
  }

  constructor(private router: Router) {}

  irParaEditar(id: string) {
    this.router.navigate([`/pensamentos/editarPensamento/${id}`]);
  }

  irParaExcluir(id: string) {
    this.router.navigate([`/pensamentos/excluirPensamento/${id}`]);
  }
}
