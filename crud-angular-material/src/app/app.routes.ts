import { Routes } from '@angular/router';
import { CadastroComponent, ConsultaComponent } from './domains/cliente/components';

export const routes: Routes = [
    {path: 'cadastro', component: CadastroComponent},
    {path: 'editar', component: CadastroComponent, data: { modo: 'edicao' }},
    {path: 'consulta', component: ConsultaComponent}
];
