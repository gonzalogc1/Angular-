import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CategoriaService } from '../../../../service/categoria-service';
import { Categoria } from '../../../../model/categoria';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-categoria-form',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './categoria-form.html',
  styleUrl: './categoria-form.css',
})
export class CategoriaForm implements OnInit {
  titulo: string = 'Crear Categoría';
  categoria: Categoria = new Categoria();

  private service = inject(CategoriaService);
  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);

  ngOnInit(): void {
    this.cargarCategoria();
  }

  cargarCategoria(): void {
    this.activatedRoute.params.subscribe(params => {
      const id = params['id'];
      if (id) {
        this.titulo = 'Editar Categoría';
        this.service.leerCategoria(id).subscribe({
          next: (data) => {
            this.categoria = data;
          },
          error: (err) => {
            console.error('Error al cargar la categoría:', err);
            Swal.fire({
              title: 'Error',
              text: 'No se pudo cargar la categoría para edición.',
              icon: 'error'
            });
          }
        });
      }
    });
  }

  guardar(): void {
    if (!this.categoria.nombre || !this.categoria.descripcion) {
      Swal.fire({
        title: 'Campos requeridos',
        text: 'Por favor, complete todos los campos del formulario.',
        icon: 'warning'
      });
      return;
    }

    if (this.categoria.idCategoria) {
      // Editar
      this.service.actualizarCategoria(this.categoria.idCategoria, this.categoria).subscribe({
        next: (response) => {
          Swal.fire({
            title: '¡Actualizado!',
            text: `La categoría "${response.nombre}" se ha actualizado exitosamente.`,
            icon: 'success'
          });
          this.router.navigate(['/listaDeCategorias']);
        },
        error: (err) => {
          console.error('Error al actualizar la categoría:', err);
          Swal.fire({
            title: 'Error al actualizar',
            text: 'Revisa si los campos del JSON coinciden con el Backend o intenta de nuevo.',
            icon: 'error'
          });
        }
      });
    } else {
      // Crear
      this.service.crearCategoria(this.categoria).subscribe({
        next: (response) => {
          Swal.fire({
            title: '¡Creado!',
            text: `La categoría "${response.nombre}" se ha creado exitosamente.`,
            icon: 'success'
          });
          this.router.navigate(['/listaDeCategorias']);
        },
        error: (err) => {
          console.error('Error al crear la categoría:', err);
          Swal.fire({
            title: 'Error al crear',
            text: 'Revisa si los campos del JSON coinciden con el Backend o intenta de nuevo.',
            icon: 'error'
          });
        }
      });
    }
  }
}
