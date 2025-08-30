import { Routes } from '@angular/router';
import { ListaEmpresasComponent } from './lista-empresas/lista-empresas';
import { EmpresaFormComponent } from './empresa-form/empresa-form';

export const routes: Routes = [
  { path: '', redirectTo: 'empresas', pathMatch: 'full' },
  { path: 'empresas', component: ListaEmpresasComponent },
  {
  path: 'empresa/nueva',
  component: EmpresaFormComponent,
  data: { modo: 'agregar' }
},
{
  path: 'empresa/editar/:id',
  component: EmpresaFormComponent,
  data: { modo: 'editar' }
},
{
  path: 'empresa/ver/:id',
  component: EmpresaFormComponent,
  data: { modo: 'ver' }
}

];
