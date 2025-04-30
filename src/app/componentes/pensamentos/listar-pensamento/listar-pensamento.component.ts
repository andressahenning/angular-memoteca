import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgFor } from '@angular/common';
import { NgIf } from '@angular/common';
import { PensamentoComponent } from '../pensamento/pensamento.component';
import { Pensamento } from '../pensamento';
import { PensamentoService } from '../pensamento.service';
import { BotaoCarregarMaisComponent } from "./botao-carregar-mais/botao-carregar-mais.component";
import { NgModel, FormsModule } from '@angular/forms';

@Component({
  selector: 'app-listar-pensamento',
  imports: [NgFor, NgIf, PensamentoComponent, BotaoCarregarMaisComponent, FormsModule],
  templateUrl: './listar-pensamento.component.html',
  styleUrls: ['./listar-pensamento.component.css']
})

export class ListarPensamentoComponent implements OnInit {

  listaPensamentos: Pensamento[] = []
  paginaAtual: number = 1;
  haMaisPensamentos: boolean = true;
  filtro: string = '';
  favoritos: boolean = false;
  listaFavoritos: Pensamento[] = [];
  titulo: string = 'Meu Mural'

  constructor(
    private router: Router,
    private service: PensamentoService
  ) {}

  navegarParaCriarPensamento() {
    this.router.navigate(['/criarPensamento'])
  }

  ngOnInit(): void {
    this.service.listar(this.paginaAtual, this.filtro, this.favoritos).subscribe((listaPensamentos) => {
      this.listaPensamentos = listaPensamentos;
    });
  }

  carregarMaisPensamentos() {
    this.service.listar(++this.paginaAtual, this.filtro, this.favoritos)
      .subscribe(listaPensamentos => {
        this.listaPensamentos.push(...listaPensamentos)
        if(!listaPensamentos.length) {
          this.haMaisPensamentos = false
        }
      })
  }

  pesquisarPensamentos() {
    this.haMaisPensamentos = true
    this.paginaAtual = 1;
    this.service.listar(this.paginaAtual, this.filtro, this.favoritos)
      .subscribe(listaPensamentos => {
        this.listaPensamentos = listaPensamentos
      })
  }

  testeBotao() {
    console.log('Botão Meu Mural clicado');
  }

  recarregarComponente() {
    this.titulo = 'Meu Mural';
    this.filtro = '';
    this.favoritos = false;
    this.paginaAtual = 1;
    this.haMaisPensamentos = true;
  
    this.service.listar(this.paginaAtual, this.filtro, this.favoritos)
      .subscribe(lista => {
        this.listaPensamentos = lista;
      });
  }

  listarFavoritos() {
    this.titulo = 'Meus Favoritos'
    this.favoritos = true
    this.haMaisPensamentos = true
    this.paginaAtual = 1
    this.service.listar(this.paginaAtual, this.filtro, this.favoritos)
      .subscribe(listaPensamentosFavoritos => {
        this.listaPensamentos = listaPensamentosFavoritos
        this.listaFavoritos = listaPensamentosFavoritos
      })
  }
}