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
  selector: 'app-cadastrar-tarefa',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './cadastrar-tarefa.component.html',
  styleUrl: './cadastrar-tarefa.component.css',
})
export class CadastrarTarefaComponent {
  // atributos
  categorias: any[] = [];

  constructor(private httpClient: HttpClient) {}

  form = new FormGroup({
    nome: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(100),
    ]),
    data: new FormGroup('', [Validators.required]),
    descricao: new FormGroup('', [
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(250),
    ]),
    categoriaId: new FormGroup('', [Validators.required]),
  });

  get f() {
    return this.form.controls;
  }

  ngOnInit() {
    this.httpClient.get(environments.apiCategorias).subscribe({
      next: (data) => {
        this.categorias = data as any[];
        console.log(this.categorias);
      },
    });
  }

  onSubmit() {
    this.httpClient
      .post(environments.apiTarefas, this.form.value, { responseType: 'text' })
      .subscribe({
        next: (data) => {
          alert(data);
          this.form.reset();
        },
      });
  }
}
