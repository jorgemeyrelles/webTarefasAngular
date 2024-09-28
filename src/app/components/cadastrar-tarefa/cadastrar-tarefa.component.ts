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
  selector: 'app-editar-tarefa',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './cadastrar-tarefa.component.html',
  styleUrl: './cadastrar-tarefa.component.css',
})
export class EditarTarefaComponent {
  //atributo
  tarefa: any[] = [];

  //método construtor
  constructor(private httpClient: HttpClient) {}

  //estrutura do formulário:
  form = new FormGroup({
    nome: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(100),
    ]),
    data: new FormControl('', [Validators.required]),
    descricao: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(250),
    ]),
    categoriaId: new FormControl('', [Validators.required]),
  });

  //exibir os erros de validação de cada campo
  get f() {
    return this.form.controls;
  }

  //função executada quando o componente for aberto
  ngOnInit() {
    //fazendo uma requisição para a API no serviço de consulta de categorias
    this.httpClient.get(environments.apiTarefas).subscribe({
      next: (data) => {
        //capturando o retorno da consulta
        this.tarefa = data as any;
      },
    });
  }

  //função para enviar os dados do formulário para a API
  onSubmit() {
    //fazendo a requisição POST para cadastra a tarefa na API
    this.httpClient
      .post(environments.apiTarefas, this.form.value, { responseType: 'text' })
      .subscribe({
        next: (data) => {
          //capturando o retorno da API
          //exibir mensagem para o usuário (pop-up)
          alert(data);
          //limpar o formulário
          this.form.reset();
        },
      });
  }
}
