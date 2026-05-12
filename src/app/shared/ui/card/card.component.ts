import { Component, inject, input, PLATFORM_ID, signal } from '@angular/core';
import { Product } from '../../../core/models/product.interface';
import { RouterLink } from "@angular/router";
import { ToastrService } from 'ngx-toastr';
import { CartService } from '../../../core/services/cart.service';
import { CurrencyPipe, isPlatformBrowser } from '@angular/common';
import { WishlistService } from '../../../core/services/wishlist.service';

@Component({
  selector: 'app-card',
  imports: [RouterLink,CurrencyPipe],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css',
})
export class CardComponent {


 
  product = input.required<Product>();
  private readonly cartService = inject(CartService);
  private readonly toastrService = inject(ToastrService);
  private readonly wishlistService = inject(WishlistService);
  private readonly pLATFORM_ID=inject(PLATFORM_ID)

  wishlistIds = signal<string[]>([]);

  ngOnInit(): void {
   if(isPlatformBrowser(this.pLATFORM_ID)){
     if (localStorage.getItem('freshToken')){
      this.loadWishlist();
     }
   }
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


   // addToWishlist(id:string):void{
  //   if (localStorage.getItem('freshToken')) {
  //     this.wishlistService.addProductToWishlist(id).subscribe({
  //       next: (res) => {
  //         console.log(res);
  //         // this.cartService.cartCount.set(res.numOfCartItems)
  //         this.toastrService.success(res.message, 'FreshCart', { progressBar: true, closeButton: true })

  //       }

  //     })

  //   }

  //   else {
  //     this.toastrService.warning('Please Login First', 'FreshCart', { progressBar: true, closeButton: true })
  //   }
  // }
}
