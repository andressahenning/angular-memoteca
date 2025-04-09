import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgFor } from '@angular/common';
import { NgIf } from '@angular/common';
import { PensamentoComponent } from '../pensamento/pensamento.component';
import { Pensamento } from '../pensamento';
import { PensamentoService } from '../pensamento.service';

@Component({
  selector: 'app-listar-pensamento',
  imports: [NgFor, NgIf, PensamentoComponent],
  templateUrl: './listar-pensamento.component.html',
  styleUrl: './listar-pensamento.component.css'
})

export class ListarPensamentoComponent {

  listaPensamentos: Pensamento[] = []

  constructor(
    private router: Router,
    private service: PensamentoService
  ) {}

  navegarParaCriarPensamento() {
    this.router.navigate(['/criarPensamento'])
  }

  ngOnInit(): void {
    this.service.listar().subscribe((listaPensamentos) => {
      this.listaPensamentos = listaPensamentos;
    });
  }
}

