
import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ProductsService } from '../../core/services/products.service';
import { CardComponent } from "../../shared/ui/card/card.component";
import { CategoriesService } from '../../core/services/categories.service';
import { Product } from '../../core/models/product.interface';

@Component({
  selector: 'app-category-product',
  imports: [CardComponent,RouterLink],
  templateUrl: './category-product.component.html',
  styleUrl: './category-product.component.css',
})
export class CategoryProductComponent {
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly productsService = inject(ProductsService);
  private readonly categoriesService = inject(CategoriesService); 

  productList = signal<Product[]>([]);
  categoryInfo = signal<any>(null);
  isLoading = signal(true);

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.getCategoryDetails(id);
        this.getProducts(id);
      }
    });
  }

  getCategoryDetails(id: string) {
    this.categoriesService.getSpecificCategory(id).subscribe({
      next: (res) => this.categoryInfo.set(res.data)
    });
  }

  getProducts(id: string) {
    this.isLoading.set(true);
    this.productsService.getAllProducts(id).subscribe({
      next: (res) => {
        this.productList.set(res.data);
        this.isLoading.set(false);
      },
      error: () => this.isLoading.set(false)
    });
  }
}
