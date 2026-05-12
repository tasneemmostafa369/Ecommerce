import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { BrandService } from '../../../../core/services/brand.service';
import { CardComponent } from "../../../../shared/ui/card/card.component";
import { ProductsService } from '../../../../core/services/products.service';
import { Product } from '../../../../core/models/product.interface';
import { Brand } from '../../../../core/models/brand.interface';

@Component({
  selector: 'app-brand-details',
  imports: [CardComponent, RouterLink],
  templateUrl: './brand-details.component.html',
  styleUrl: './brand-details.component.css',
})
export class BrandDetailsComponent {
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly brandService = inject(BrandService);
  private readonly productService = inject(ProductsService);
  
  brandDetails = signal<Brand>({} as Brand);
  productList=signal<Product[]>([])
  brandId: string | null = '';
  

 ngOnInit(): void {
  this.activatedRoute.paramMap.subscribe({
    next: (params) => {
      this.brandId = params.get('id');

      if (this.brandId) {
        this.brandService.getSpecificBrands(this.brandId).subscribe({
          next: (res) => {
            this.brandDetails.set(res.data);
          },
          error: (err) => console.log(err)
        });

        this.getProductsOfBrand();
      }
    }
  });
}

getProductsOfBrand() {
  if (this.brandId) {
    this.brandService.getProductsByBrand(this.brandId).subscribe({
      next: (res) => {
        this.productList.set(res.data);
      },
      error: (err) => console.log(err)
    });
  }
}
  
}
