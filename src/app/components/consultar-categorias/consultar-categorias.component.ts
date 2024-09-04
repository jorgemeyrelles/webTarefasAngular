import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { environments } from '../../../environments/environment';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-consultar-categorias',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './consultar-categorias.component.html',
  styleUrl: './consultar-categorias.component.css',
})
export class ConsultarCategoriasComponent {
  //atributo para armazenar a lista de categorias
  categorias: any[] = []; //array de objetos

  //declarando e inicializando a biblioteca HttpClient do angular
  constructor(private httpClient: HttpClient) {}

  //função executada sempre que a página abrir
  ngOnInit() {
    //executando uma chamada para o serviço de consulta de categorias
    this.httpClient.get(environments.apiCategorias).subscribe({
      //aguardando a resposta da API
      next: (data) => {
        //capturando os dados obtidos
        this.categorias = data as any[]; //armazenando os dados
      },
    });
  }

  onDelete(id: number) {
    if (confirm('Deseja deletar essa categoria?')) {
      this.httpClient
        .delete(`${environments.apiCategorias}/${id}`, {
          responseType: 'text',
        })
        .subscribe({
          next: (data) => {
            alert(data);
            this.ngOnInit();
          },
        });
    }
  }
}
