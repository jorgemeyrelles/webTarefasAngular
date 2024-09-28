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
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-consultar-tarefas',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterLink],
  templateUrl: './consultar-tarefas.component.html',
  styleUrl: './consultar-tarefas.component.css',
})
export class ConsultarTarefasComponent {
  // atributos
  tarefas: any[] = [];

  constructor(private httpClient: HttpClient) {}
  form = new FormGroup({
    dataMin: new FormControl('', [Validators.required]),
    dataMax: new FormControl('', [Validators.required]),
  });

  get f() {
    return this.form.controls;
  }

  onSubmit() {
    const { dataMin, dataMax } = this.form.value;
    this.httpClient
      .get(`${environments.apiTarefas}/${dataMin}/${dataMax}`)
      .subscribe({
        next: (data) => {
          this.tarefas = data as any[];
        },
      });
  }

  onDelete(id: number) {
    console.log(id);
    
    this.httpClient
      .delete(`${environments.apiTarefas}/${id}`, { responseType: 'text' })
      .subscribe({
        next: (data) => {
          alert(data);
          this.onSubmit();
        },
      });
  }
}
