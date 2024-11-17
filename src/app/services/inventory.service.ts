import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { ApiResponse } from '../responses/api.response';
import { WareProductResponse } from '../responses/inventory.response';
@Injectable({
  providedIn: 'root'
})
export class WarehouseProductService {

  private apiUrl = `${environment.apiBaseUrl}/warehouse-products`; // Cấu hình apiUrl trong file environment

  constructor(private http: HttpClient) { }

  // Lấy tất cả các sản phẩm trong kho
  getAllWarehouseProducts(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(this.apiUrl);
  }

  // Lấy thông tin một sản phẩm trong kho theo ID
  getWarehouseProductById(id: number): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(`${this.apiUrl}/${id}`);
  }

  // Thêm mới một sản phẩm vào kho
  createWarehouseProduct(warehouseProduct: WareProductResponse): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(this.apiUrl, warehouseProduct);
  }

  // Cập nhật thông tin sản phẩm trong kho theo ID
  updateWarehouseProduct(id: number, quantity: number): Observable<ApiResponse> {
    return this.http.put<ApiResponse>(`${this.apiUrl}/${id}?quantity=${quantity}`, {});
  }

  // Cập nhật số lượng sản phẩm trong kho
  updateProductQuantity(id: number, quantity: number): Observable<ApiResponse> {
    const params = new HttpParams().set('quantity', quantity.toString());
    return this.http.patch<ApiResponse>(`${this.apiUrl}/${id}/quantity`, { params });
  }

  // Xóa một sản phẩm khỏi kho
  deleteWarehouseProduct(id: number): Observable<ApiResponse> {
    return this.http.delete<ApiResponse>(`${this.apiUrl}/${id}`);
  }

  // Kiểm tra số lượng tồn kho của một sản phẩm
  getAvailableQuantity(productId: number): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(`${this.apiUrl}/${productId}/quantity`);
  }
}
