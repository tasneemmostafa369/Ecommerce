import { Component, inject, OnInit, PLATFORM_ID, signal } from '@angular/core';
import { WishlistService } from '../../core/services/wishlist.service';
import { Wishlist } from '../../core/models/wishlist.interface';
import { RouterLink } from "@angular/router";
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-withlist',
  imports: [RouterLink],
  templateUrl: './withlist.component.html',
  styleUrl: './withlist.component.css',
})
export class WithlistComponent implements OnInit{
  private readonly wishlistService=inject(WishlistService)
  private readonly pLATFORM_ID=inject(PLATFORM_ID)
  wishlistDetails=signal<Wishlist[]>([])

  ngOnInit(): void {
    if (isPlatformBrowser(this.pLATFORM_ID)) {
      if (localStorage.getItem('freshToken')) {
        this.getWishlistData();
      }
    }
  }
  getWishlistData():void{
    this.wishlistService.getloggeduserwishlist().subscribe({
      next:(res)=>{
        console.log(res);
        this.wishlistDetails.set(res.data)
      }
    })
  }

  removeItem(id:string):void{
    this.wishlistService.removeproductfromwishlist(id).subscribe({
      next:(res)=>{
        console.log(res);
        // this.getWishlistData()
        this.wishlistDetails.set(this.wishlistDetails().filter(item => item._id !== id));
        this.wishlistService.wishlistCount.set(res.data.length)
      }
    })
  }
}
