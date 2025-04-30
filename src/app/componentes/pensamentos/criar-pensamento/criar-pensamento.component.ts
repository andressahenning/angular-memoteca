import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router} from '@angular/router';
import { PensamentoService } from '../pensamento.service';
import { NgClass, NgIf } from '@angular/common';

@Component({
  selector: 'app-criar-pensamento',
  imports: [NgClass, NgIf, ReactiveFormsModule],
  templateUrl: './criar-pensamento.component.html',
  styleUrl: './criar-pensamento.component.css'
})

export class CriarPensamentoComponent {
  constructor(
    private router: Router,
    private service: PensamentoService,
    private formBuilder: FormBuilder
  ) {} 
  
  formulario!: FormGroup;

  ngOnInit(): void {
    this.formulario = this.formBuilder.group({
      conteudo: ['', Validators.compose([
        Validators.required,
        Validators.pattern(/(.|\s)*\S(.|\s)*/) //expressão regular
      ])],
      autoria: ['', Validators.compose([
        Validators.required,
        Validators.minLength(3)
      ])],
      modelo: ['modelo1'],
      favorito: [false]
    })
  }
  
  criarPensamento() {
    console.log(this.formulario.get('autoria')?.errors)
    if(this.formulario.valid){
      this.service.criar(this.formulario.value).subscribe(() => {
        this.router.navigate(['/listarPensamento'])
      })
    }
  }
  
  cancelarPensamento() {
    this.router.navigate(['/listarPensamento'])
  }

  habilitarBotao(): string {
    if(this.formulario.valid) {
      return 'botao'
    } else {
      return 'botao__desabilitado'
    }
  }
}