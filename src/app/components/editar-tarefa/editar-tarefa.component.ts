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

@Component({
  selector: 'app-editar-tarefa',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './editar-tarefa.component.html',
  styleUrl: './editar-tarefa.component.css',
})
export class EditarTarefaComponent {
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
}
