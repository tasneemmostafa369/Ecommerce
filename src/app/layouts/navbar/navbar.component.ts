import { Component, computed, inject, PLATFORM_ID, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from "@angular/router";
import { FlowbiteService } from '../../core/services/flowbite.service';
import { initFlowbite } from 'flowbite';
import { AuthService } from '../../core/auth/services/auth.service';
import { isPlatformBrowser } from '@angular/common';
import { CartService } from '../../core/services/cart.service';
import { Category } from '../../features/cart/models/cart.interface';
import { CategoriesService } from '../../core/services/categories.service';
import { WishlistService } from '../../core/services/wishlist.service';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  private readonly authService = inject(AuthService)
  private readonly cartService = inject(CartService)
  private readonly categoriesService = inject(CategoriesService)
  private readonly wishlistService = inject(WishlistService)
  logged = computed(() => this.authService.isLogged())
  private readonly pLATFORM_ID = inject(PLATFORM_ID)
  categories = signal<Category[]>([]);


  cartCount = computed(() => this.cartService.cartCount())
  wishlistCount = computed(() => this.wishlistService.wishlistCount())

  constructor(private flowbiteService: FlowbiteService) { }

  readonly targetCategories = ["Women's Fashion", "Men's Fashion", "Electronics", "Beauty & Health"];

  selectedCategories = computed(() => {
    return this.categories()
      .filter(cat => this.targetCategories.includes(cat.name))
      .sort((a, b) => this.targetCategories.indexOf(a.name) - this.targetCategories.indexOf(b.name));
  });


  ngOnInit(): void {
    this.flowbiteService.loadFlowbite((flowbite) => {
      initFlowbite();
    });

    if (isPlatformBrowser(this.pLATFORM_ID)) {
      if (localStorage.getItem('freshToken')) {
        this.authService.isLogged.set(true)
        this.getCartCount()
        this.getWishlistCount()

      }
    }

    this.categoriesService.GetAllCategories().subscribe({
      next: (res) => this.categories.set(res.data)
    });

  }

  logOut(): void {
    this.authService.signOut()
  }

  getCartCount(): void {
    this.cartService.getLoggedUserCart().subscribe({
      next: (res) => {
        this.cartService.cartCount.set(res.numOfCartItems)
      }
    })
  }

  getWishlistCount(): void {
    this.wishlistService.getloggeduserwishlist().subscribe({
      next: (res) => {
        this.wishlistService.wishlistCount.set(res.count)
        // console.log(res.count);
        
      }
    })
  }
}
