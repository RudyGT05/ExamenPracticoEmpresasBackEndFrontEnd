import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmpresaService, Empresa } from '../services/empresa';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-lista-empresas',
  templateUrl: './lista-empresas.html',
  styleUrls: ['./lista-empresas.css'],
  standalone: true,
  imports: [CommonModule, FormsModule,RouterModule]
})
export class ListaEmpresasComponent implements OnInit {
  empresas: Empresa[] = [];
  error: string | null = null;

  constructor(private empresaService: EmpresaService) {}

  ngOnInit(): void {
    this.cargarEmpresas();
  }

  cargarEmpresas() {
    this.empresaService.getEmpresas().subscribe({
      next: (data) => (this.empresas = data),
      error: (err) => {
        console.error(err);
        this.error = 'No se pudo cargar la lista de empresas';
      }
    });
  }

  eliminarEmpresa(id: number) {
    if (!confirm('¿Desea eliminar esta empresa?')) return;

    this.empresaService.deleteEmpresa(id).subscribe({
      next: () => {
        this.empresas = this.empresas.filter(e => e.id !== id);
      },
      error: (err) => {
        console.error(err);
        this.error = 'Error al eliminar la empresa';
      }
    });
  }
 

}
