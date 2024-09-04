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
import { ActivatedRoute, Router } from '@angular/router';
import { environments } from '../../../environments/environment';

@Component({
  selector: 'app-editar-categoria',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './editar-categoria.component.html',
  styleUrl: './editar-categoria.component.css',
})
export class EditarCategoriaComponent {
  // atributos
  nome: string = '';
  id: number = 0;

  constructor(
    private httpClient: HttpClient,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.httpClient.get(`${environments.apiCategorias}/${this.id}`).subscribe({
      next: (data: any) => {
        this.id = data.id;
        this.nome = data.nome;
        this.form.setValue({ nome: this.nome });
      },
    });
  }

  form = new FormGroup({
    nome: new FormControl('', [Validators.required, Validators.minLength(6)]),
  });

  get f() {
    return this.form.controls;
  }

  onSubmit() {
    this.httpClient
      .put(`${environments.apiCategorias}/${this.id}`, this.form.value, {
        responseType: 'text',
      })
      .subscribe({
        next: (data) => {
          alert(data);
          this.router.navigate(['/pages/consultar-categorias']);
        },
      });
  }
}
