import { Component, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CartService } from '../../core/services/cart.service';

@Component({
  selector: 'app-checkout',
  imports: [RouterLink,ReactiveFormsModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css',
})
export class CheckoutComponent implements OnInit{

  private readonly activatedRoute=inject(ActivatedRoute)
  private readonly fb=inject(FormBuilder)
  private readonly cartService=inject(CartService)
  private readonly router=inject(Router)
  cartId=signal<string>('')
  falg=signal<string>('cash')

  cityList: string[] = [
    'Cairo', 'Alexandria', 'Giza', 'Shubra el Kheima', 'Port Said', 
    'Suez', 'El Mahalla el Kubra', 'Mansoura', 'Tanta', 'Asyut'
  ];

  checkout:FormGroup=this.fb.group({
    shippingAddress:this.fb.group({
      city:['',[Validators.required]],
      details:['',[Validators.required,Validators.minLength(10)]],
      phone:['',[Validators.required,Validators.pattern(/^01[0125][0-9]{8}$/)]],
    })
  })


  ngOnInit(): void {
    this.getCarId()
  }

  getCarId():void{
    this.activatedRoute.paramMap.subscribe((params)=>{
      console.log(params.get('id'));
    
       this.cartId.set(params.get('id')!)
    })
  }

  changeFlag(el:HTMLInputElement):void{
    this.falg.set(el.value)
  }

  submitForm():void{
    if(this.checkout.valid){
      // api cash
      if(this.falg()==='cash'){
        this.cartService.createCashOrder(this.cartId(),this.checkout.value).subscribe({
          next:(res)=>{
            if(res.status==='success'){
              this.router.navigate(['/allorders'])
            }
            
          }
        })
        
      }
      else{
        this.cartService.createVisaOrder(this.cartId(),this.checkout.value).subscribe({
          next:(res)=>{
            if(res.status==='success'){
              window.open(res.session.url,'_self')
            }
            
          }
        })
        
      }
      // api visa
      
    }
  }



}
