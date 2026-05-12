import { Component, inject, input, OnInit, signal } from '@angular/core';
import { ProductsService } from '../../../../core/services/products.service';
import { log } from 'console';
import { Product } from '../../../../core/models/product.interface';
import { CurrencyPipe } from '@angular/common';
import { ActivatedRoute, RouterLink } from "@angular/router";
import { CartService } from '../../../../core/services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { CardComponent } from '../../../../shared/ui/card/card.component';

@Component({
  selector: 'app-product',
  imports: [CurrencyPipe, RouterLink,CardComponent],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css',
})
export class ProductComponent implements OnInit {
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
