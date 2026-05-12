import { Component, inject, OnInit, signal } from '@angular/core';
import { ProductsService } from '../../core/services/products.service';
import { CardComponent } from "../../shared/ui/card/card.component";
import { Product } from '../../core/models/product.interface';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-shop',
  imports: [CardComponent, RouterLink],
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.css',
})
export class ShopComponent implements OnInit{
  private readonly productsService = inject(ProductsService)
  
  productList = signal<Product[]>([])

  ngOnInit(): void {
    this.getProductData()
  }
  getProductData(): void {
    this.productsService.getAllProducts().subscribe({
      next: (res) => {
        console.log(res);
        this.productList.set(res.data)
      },
      error: (err) => {
        console.log(err);

      }
    })
  }

}
