import { Routes } from '@angular/router';
import { authGuard } from './core/auth/guards/auth-guard';

export const routes: Routes = [
    {
        path: "",
        loadComponent: () => import('./features/home/home.component').then(m => m.HomeComponent),
        title: 'Home'
    },
    {
        path: "brands",
        loadComponent: () => import('./features/brands/brands.component').then(m => m.BrandsComponent),
        title: 'Our Brands'
    },
    {
        path: "brand-details/:id",
        loadComponent: () => import('./features/brands/components/brand-details/brand-details.component').then(m => m.BrandDetailsComponent),
        title: 'Our Brands'
    },
    {
        path: "cart",
        loadComponent: () => import('./features/cart/cart.component').then(m => m.CartComponent),
        title: 'Shopping Cart',
        canActivate:[authGuard]
    },
    {
        path: "categories",
        loadComponent: () => import('./features/categories/categories.component').then(m => m.CategoriesComponent),
        title: 'Categories'
    },
    {
        path: "category-details/:id",
        loadComponent: () => import('./features/categories/components/category-details/category-details.component').then(m => m.CategoryDetailsComponent),
        title: 'CategoriesDetails'
    },
    {
        path: "category-products/:id",
        loadComponent: () => import('./features/category-product/category-product.component').then(m => m.CategoryProductComponent),
        title: 'CategoriesDetails'
    },
    
    {
        path: "checkout/:id",
        loadComponent: () => import('./features/checkout/checkout.component').then(m => m.CheckoutComponent),
        title: 'Checkout',
        canActivate:[authGuard]
    },
    {
        path: "details/:id/:slug",
        loadComponent: () => import('./features/details/details.component').then(m => m.DetailsComponent),
        title: 'Product Details'
    },
    {
        path: "forgot",
        loadComponent: () => import('./features/forgot/forgot.component').then(m => m.ForgotComponent),
        title: 'Forgot Password'
    },
    {
        path: "login",
        loadComponent: () => import('./features/login/login.component').then(m => m.LoginComponent),
        title: 'Login'
    },
    {
        path: "allorders",
        loadComponent: () => import('./features/orders/orders.component').then(m => m.OrdersComponent),
        title: 'My Orders',
        canActivate:[authGuard]
    },
    {
        path: "register",
        loadComponent: () => import('./features/register/register.component').then(m => m.RegisterComponent),
        title: 'Register'
    },
    {
        path: "shop",
        loadComponent: () => import('./features/shop/shop.component').then(m => m.ShopComponent),
        title: 'Shop'
    },
    {
        path: "wishlist", // Note: Changed from 'withlist' to 'wishlist' for standard naming
        loadComponent: () => import('./features/withlist/withlist.component').then(m => m.WithlistComponent),
        title: 'My Wishlist',
        canActivate:[authGuard]
    },
    {
        path: "**",
        loadComponent: () => import('./features/notfound/notfound.component').then(m => m.NotfoundComponent),
        title: '404 - Page Not Found'
    }
];