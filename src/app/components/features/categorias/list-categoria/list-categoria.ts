import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CategoriaService } from '../../../../service/categoria-service';
import { Categoria } from '../../../../model/categoria';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-categoria',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './list-categoria.html',
  styleUrl: './list-categoria.css',
})
export class ListCategoria implements OnInit {
  readonly titulo = 'Categoria de Productos';
  listaDeCategorias = signal<Categoria[]>([]);
  //inyectar el servicio
  private service = inject(CategoriaService);

  ngOnInit() {
    this.cargarCtaegorias();
  }

  private cargarCtaegorias() {
    this.service.mostrarCategoria().subscribe({
      next: (data) => {
        this.listaDeCategorias.set(data);
      },
      error: (err) => {
        console.error('Error al cargar las categorías:', err);
      }
    });
  }

  eliminarCategoria(categoria: Categoria) {
    if (!categoria.idCategoria) return; // Asegurarse de que exista el ID

    Swal.fire({
      title: '¿Estás seguro?',
      text: `No podrás revertir esto. La categoría "${categoria.nombre}" será eliminada.`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.service.eliminarCategoria(categoria.idCategoria!).subscribe({
          next: () => {
            // Recargar la lista de categorías después de eliminar
            this.cargarCtaegorias();

            Swal.fire({
              title: '¡Eliminado!',
              text: 'La categoría ha sido eliminada exitosamente.',
              icon: 'success'
            });
          },
          error: (err) => {
            console.error('Error al eliminar la categoría:', err);
            Swal.fire({
              title: 'Error',
              text: 'Hubo un problema al intentar eliminar la categoría.',
              icon: 'error'
            });
          }
        });
      }
    });
  }

  /*
  categorias: Categoria[] = [];

  // Inyección de dependencias a través del constructor
  constructor(private categoriaService: CategoriaService) {}

  ngOnInit(): void {
    // Al inicializar el componente, pedimos la lista de categorías a la API
    this.cargarCategorias();
  }

  cargarCategorias(): void {
    this.categoriaService.mostrarCategoria().subscribe({
      next: (data) => {
        this.categorias = data;
      },
      error: (err) => {
        console.error('Error al cargar las categorías:', err);
      }
    });
  }
  */
}
