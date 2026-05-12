import { Component, inject, OnInit, PLATFORM_ID, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../core/services/products.service';
import { log } from 'console';
import { Product } from '../../core/models/product.interface';
import { CurrencyPipe, isPlatformBrowser, NgClass } from '@angular/common';
import { CartService } from '../../core/services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { WishlistService } from '../../core/services/wishlist.service';

@Component({
  selector: 'app-details',
  imports: [CurrencyPipe, NgClass],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css',
})
export class DetailsComponent implements OnInit{
  private readonly activatedRoute=inject(ActivatedRoute)
  private readonly productsService=inject(ProductsService)
  private readonly cartService = inject(CartService);
  private readonly toastrService = inject(ToastrService);
  private readonly wishlistService = inject(WishlistService);
  private readonly pLATFORM_ID=inject(PLATFORM_ID)
  productDetails=signal<Product>({} as Product)
  wishlistIds = signal<string[]>([]);

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params)=>{
      this.getProductDetails(params.get('id')!)
    })

    if(isPlatformBrowser(this.pLATFORM_ID)){
     if (localStorage.getItem('freshToken')){
      this.loadWishlist();
     }
   }
  }

  getProductDetails(id:string){
    this.productsService.getSpecificProduct(id).subscribe({
      next:(res)=>{
        console.log(res.data);
        this.productDetails.set(res.data)
        
      },
      error:(err)=>{
        console.log(err);
        
      }
    })
  }

  addToCart(id: string): void {
    if (localStorage.getItem('freshToken')) {
      this.cartService.addToCart(id).subscribe({
        next: (res) => {
          console.log(res);
          this.cartService.cartCount.set(res.numOfCartItems)
          this.toastrService.success(res.message, 'FreshCart', { progressBar: true, closeButton: true })

        }

      })

    }

    else {
      this.toastrService.warning('Please Login First', 'FreshCart', { progressBar: true, closeButton: true })
    }
  }

  loadWishlist(): void {
    this.wishlistService.getloggeduserwishlist().subscribe({
      next: (res) => {
        const ids = res.data.map((item: any) => item._id);
        this.wishlistIds.set(ids);
      }
    });
  }

 
  toggleWishlist(id: string): void {
    if (!localStorage.getItem('freshToken')) {
      this.toastrService.warning('Please Login First', 'FreshCart');
      return;
    }

    const isFav = this.wishlistIds().includes(id);

    if (isFav) {
      this.wishlistService.removeproductfromwishlist(id).subscribe({
        next: (res) => {
          this.wishlistIds.set(res.data); 
          this.wishlistService.wishlistCount.set(res.data.length)
          this.toastrService.error('Removed from Wishlist', 'FreshCart');
        }
      });
    } else {
      this.wishlistService.addProductToWishlist(id).subscribe({
        next: (res) => {
          this.wishlistIds.set(res.data);
          this.wishlistService.wishlistCount.set(res.data.length) 
          this.toastrService.success(res.message, 'FreshCart');
        }
      });
    }
  }

}
