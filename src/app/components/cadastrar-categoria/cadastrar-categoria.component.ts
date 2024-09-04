import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { environments } from '../../../environments/environment';

@Component({
  selector: 'app-cadastrar-categoria',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './cadastrar-categoria.component.html',
  styleUrl: './cadastrar-categoria.component.css',
})
export class CadastrarCategoriaComponent {
  //método construtor
  constructor(private httpClient: HttpClient) {}

  //construindo a estrutura do formulário
  form = new FormGroup({
    //campo 'nome'
    nome: new FormControl('', [Validators.required, Validators.minLength(6)]),
  });

  //função para verificar se os campos do formulário
  //estão com erro de validação / preenchimento
  get f() {
    return this.form.controls;
  }

  //função executada no evento SUBMIT do formulário
  onSubmit() {
    this.httpClient
      .post(environments.apiCategorias, this.form.value, {
        responseType: 'text',
      })
      .subscribe({
        //capturando o retorno obtido da API
        next: (data) => {
          alert(data); //exibindo um pop-up com a mensagem
          this.form.reset(); //limpar os campos do formulário
        },
      });
  }
}
