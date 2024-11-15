// favorite.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FavoriteService {
  private apiPrefix = 'http://localhost:8080/api/v1'; // Địa chỉ API thực tế

  constructor(private http: HttpClient) {}

  toggleFavorite(userID: number, productID: number): Observable<{ favorited: boolean }> {
    const params = new HttpParams()
      .set('userID', userID.toString())
      .set('productID', productID.toString());

    return this.http.post<{ favorited: boolean }>(`${this.apiPrefix}/favorites/toggle`, null, { params });
  }

  // Đảm bảo phương thức này có trong service
  checkFavorite(userID: number, productID: number): Observable<{ favorited: boolean }> {
    return this.http.get<{ favorited: boolean }>(`${this.apiPrefix}/favorites/check`, {
      params: new HttpParams()
        .set('userID', userID.toString())
        .set('productID', productID.toString())
    });
  }
}
