import { NgClass } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Pensamento } from '../pensamento';
import { Router } from '@angular/router';
import { PensamentoService } from '../pensamento.service';

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
    modelo: 'modelo2',
    favorito: false
  }

  @Input() listaFavoritos: Pensamento[] = [];

  larguraPensamento(): string {
    if(this.pensamento.conteudo.length >= 256) {
      return 'pensamento-g'
    }
    return 'pensamento-p'
  }

  constructor(
    private router: Router,
    private service: PensamentoService
  ) {}

  irParaEditar(id: string) {
    this.router.navigate([`/pensamentos/editarPensamento/${id}`]);
  }

  irParaExcluir(id: string) {
    this.router.navigate([`/pensamentos/excluirPensamento/${id}`]);
  }

  mudarIconeFavorito(): string {
    if(this.pensamento.favorito == false) {
      return 'inativo'
    }
    return 'ativo'
  }

  atualizarFavoritos() {
    this.service.mudarFavorito(this.pensamento).subscribe((pensamentoAtualizado) => {
      this.pensamento.favorito = pensamentoAtualizado.favorito;
      this.listaFavoritos.splice(this.listaFavoritos.indexOf(this.pensamento), 1)
    });
  }
}