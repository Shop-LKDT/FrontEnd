import { Component } from '@angular/core';
import { ProductCartComponent } from '../product-cart/product-cart.component';
import { Router } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { UserService } from '../../services/user.service';
import { Favorite, FavoriteService } from '../../services/favorite.service';
import { UserResponse } from '../../responses/user/user.response';
import { Product } from '../../models/product';
import { forkJoin } from 'rxjs';
import { ProductService } from '../../services/product.service';
import { CommonModule } from '@angular/common';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-favorite-product',
  standalone: true,
  imports: [ProductCartComponent,
    CommonModule
  ],
  templateUrl: './favorite-product.component.html',
  styleUrl: './favorite-product.component.scss'
})
export class FavoriteProductComponent {
  userResponse?: UserResponse | null = null;
  favorites: Favorite[] = [];
  products: Product[] = [];
  constructor( private router:Router,
    private cartService: CartService,
    private userService: UserService,
    private favoriteService: FavoriteService,
    private productService:ProductService
    ){}

    ngOnInit(): void {
      this.userResponse = this.userService.getUserResponseFromLocalStorage();
      this.loadFavorites();
    }
    loadFavorites(): void {
      if (!this.userResponse || !this.userResponse.id) {

        return;
      }
      this.favoriteService.getFavoritesByUserId(this.userResponse?.id).subscribe({
        next: (favorites) => {
          this.favorites = favorites;
          console.log('Favorites loaded:', this.favorites);
          this.loadFavoriteProducts();
          console.log('Favorites loaded:', this.favorites);
        },
        error: (err) => {
          console.error('Error loading favorites:', err);
        },
      });
    }


    loadFavoriteProducts(): void {
      console.log('Loading favorite products...', this.favorites);

      // Gọi API lấy chi tiết từng sản phẩm dựa trên product_id từ danh sách favorites
      const productRequests = this.favorites.map((favorite) =>
        this.productService.getDetailProduct(favorite.product_id)
      );

      // Đợi tất cả các yêu cầu hoàn thành bằng forkJoin
      forkJoin(productRequests).subscribe({
        next: (responses) => {

          this.products = responses.map((response) => {
            const product = response.data;
            product.url = `${environment.apiBaseUrl}/products/images/${product.thumbnail}`;

            return product;
          });

          console.log('Favorite Products with URLs:', this.products);
        },
        error: (err) => {
          console.error('Error loading product details:', err);
        },
      });
    }

}
