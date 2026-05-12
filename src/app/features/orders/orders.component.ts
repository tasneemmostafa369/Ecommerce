import { Component, inject, PLATFORM_ID, signal } from '@angular/core';
import { CartService } from '../../core/services/cart.service';
import { CurrencyPipe, DatePipe, isPlatformBrowser, NgClass } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-orders',
  imports: [NgClass,DatePipe,CurrencyPipe,RouterLink],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.css',
})
export class OrdersComponent {
  private readonly ordersService = inject(CartService);
  private readonly pLATFORM_ID=inject(PLATFORM_ID)
  
  ordersList = signal<any[]>([]);

  ngOnInit(): void {
    if(isPlatformBrowser(this.pLATFORM_ID)){
      const token = localStorage.getItem('freshToken');
    if (token) {
      const userId = this.getUserIdFromToken(token);

      if (userId) {
        this.getAllOrders(userId)
      }
    }
    }
  }

  getAllOrders(id:string):void{
    this.ordersService.getAllOrders().subscribe({
          next: (res) => {
            const userOrders = res.data.filter((order: any) => order.user._id === id);
            this.ordersList.set(userOrders);
          },
          error: (err) => console.error("Error:", err)
        });
  }
  private getUserIdFromToken(token: string): string | null {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));

      return JSON.parse(jsonPayload).id;
    } catch (e) {
      console.error("Invalid Token Format", e);
      return null;
    }
  }

  expandedOrderId = signal<string | null>(null);

  toggleDetails(orderId: string): void {
    if (this.expandedOrderId() === orderId) {
      this.expandedOrderId.set(null); 
    } else {
      this.expandedOrderId.set(orderId); 
    }
  }
}


