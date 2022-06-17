import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { ProductsService } from '../products.service';
import { Product } from '../product.model';

@Component({
  selector: 'product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent implements OnInit { 
    product: Product | null = null;
    id: number = 1;

    constructor(
      private productsService: ProductsService, 
      private route: ActivatedRoute, 
      private router: Router) {};

    ngOnInit() {
      this.route.params.subscribe(params => this.id = params['id']);  
      this.productsService.fetchProduct(this.id)
                          .subscribe(product => this.product = product);      
    } 
  
    onUpdateProduct(product: Product) {
      const updatedProduct = {
        productId: this.id,
        productName: product.productName,
        amount: product.amount
      }

      this.productsService.updateProduct(updatedProduct).subscribe();
      this.redirect();
    }     

    onRemoveProduct() {
      this.productsService.remove(this.id).subscribe();
      this.redirect();
    }  
    
    redirect() {
      setTimeout(() => {
        this.router.navigateByUrl('products');
      }, 200);  
    }
}
