import { Component, OnInit } from '@angular/core';
import { EmpresaService, Empresa } from '../services/empresa';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-empresa-form',
  templateUrl: './empresa-form.html',
  styleUrls: ['./empresa-form.css'],
  standalone: true,
  imports: [FormsModule, CommonModule]
})
export class EmpresaFormComponent implements OnInit {
  empresaSeleccionada: Empresa = {
    id: 0,
    nombreComercial: '',
    razonSocial: '',
    telefono: '',
    correo: '',
    NIT: '',
    estado: 'Activo',
    direccion: ''
  };

  modalModo: 'agregar' | 'editar' | 'ver' = 'agregar';


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private empresaService: EmpresaService
  ) {}

ngOnInit(): void {
  const id = this.route.snapshot.paramMap.get('id');
  const modoRuta = this.route.snapshot.data['modo'] as 'agregar' | 'editar' | 'ver';

  this.modalModo = modoRuta;

  if (id) {
    this.empresaService.getEmpresa(+id).subscribe({
      next: (empresa) => this.empresaSeleccionada = empresa,
      error: () => alert('No se pudo cargar la empresa')
    });
  }
}

 guardarEmpresa(): void {
  if (this.modalModo === 'agregar') {
    // En agregar, se envía todo, incluyendo correo
    this.empresaService.postEmpresa(this.empresaSeleccionada).subscribe({
      next: () => this.router.navigate(['/']),
      error: () => alert('Error al agregar empresa')
    });
  } else {
    // En editar, se excluye el correo
    const { correo, ...resto } = this.empresaSeleccionada;
    this.empresaService.putEmpresa(this.empresaSeleccionada.id, resto).subscribe({
      next: () => this.router.navigate(['/']),
      error: () => alert('Error al editar empresa')
    });
  }
}


  cancelar(): void {
    this.router.navigate(['/']);
  }
}
