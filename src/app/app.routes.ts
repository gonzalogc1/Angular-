import { Routes } from '@angular/router';
import { ListCategoria } from './components/features/categorias/list-categoria/list-categoria';
import { CategoriaForm } from './components/features/categorias/categoria-form/categoria-form';
import { Home } from './components/home/home';
import { Calculadora } from './calculadora/calculadora';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: Home },
  { path: 'calculadora', component: Calculadora },
  { path: 'listaDeCategorias', component: ListCategoria },
  { path: 'categoriaForm', component: CategoriaForm },
  { path: 'categoriaForm/:id', component: CategoriaForm },
];
