import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpParams,
} from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { Subject, throwError } from 'rxjs';

import { Product } from './product.model';

@Injectable({ providedIn: 'root' })
export class ProductsService {
  error = new Subject<string>();

  constructor(private http: HttpClient) {}

  create(productName: string, amount: number) {
    const product: Product = { productName: productName, amount: amount };
    this.http
      .post<{name: string}>(
        'https://localhost:44349/api/products',
        product,
        {
          observe: 'response'
        }
      )
      .subscribe(
        responseData => {
          console.log(responseData);
        },
        error => {
          this.error.next(error.message);
        }
      );
  }

  updateProduct(product: Product) {
    console.log('service', product);
    return this.http
      .put<Product>(
        `https://localhost:44349/api/products/${product.productId}`,
        {
          ProductId: product.productId,
          ProductName: product.productName,
          Amount: product.amount
        },
        {
          observe: 'response'
        }
      );
  }  

  fetchProducts() {
    let searchParams = new HttpParams();
    searchParams = searchParams.append('print', 'pretty');
    searchParams = searchParams.append('custom', 'key');
    return this.http
      .get<{ [key: string]: Product }>(
        'https://localhost:44349/api/products',
        {
          headers: new HttpHeaders({ 'Custom-Header': 'header' }),
          params: searchParams,
          responseType: 'json'
        }
      )
      .pipe(
        map(responseData => {
          const products: Product[] = [];
          for (const key in responseData) {
            if (responseData.hasOwnProperty(key)) {
                products.push({ ...responseData[key]});
            }
          }
          return products;
        }),
        catchError(errorRes => {
          return throwError(errorRes);
        })
      );
  }

  fetchProduct(id: number | null) {
    let searchParams = new HttpParams();
    searchParams = searchParams.append('print', 'pretty');
    searchParams = searchParams.append('custom', 'key');
    return this.http
      .get<Product>(
        `https://localhost:44349/api/products/${id}`,
        {
          headers: new HttpHeaders({ 'Custom-Header': 'header' }),
          params: searchParams,
          responseType: 'json'
        }
      )
      .pipe(
        map(responseData => {
          const product = responseData;
          return product;
        }),
        catchError(errorRes => {
          return throwError(errorRes);
        })
      );
  }  

  remove(id: number) {
    return this.http
      .delete<Product>(`https://localhost:44349/api/products/${id}`);
  }
}
