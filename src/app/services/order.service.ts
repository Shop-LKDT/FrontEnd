import { ProductService } from './product.service';
import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpParams,
  HttpHeaders
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { OrderDTO } from '../dtos/order/order.dto';
import { OrderResponse } from '../responses/order/order.response';
import { ApiResponse } from '../responses/api.response';
import { TokenService } from './token.service';
@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private apiUrl = `${environment.apiBaseUrl}/orders`;
  private apiGetAllOrders = `${environment.apiBaseUrl}/orders/get-orders-by-keyword`;
  private token: string = this.tokenService.getToken(); // Thay bằng token thật hoặc lấy từ service xác thực


  constructor(private http: HttpClient, private tokenService: TokenService) {}

  placeOrder(orderData: OrderDTO): Observable<ApiResponse> {
    // Gửi yêu cầu đặt hàng
    return this.http.post<ApiResponse>(this.apiUrl, orderData);
  }
  getOrderById(orderId: number): Observable<ApiResponse> {
    const url = `${environment.apiBaseUrl}/orders/${orderId}`;
    return this.http.get<ApiResponse>(url);
  }
  getOrdersByUserId(userId: number): Observable<ApiResponse> {
    const url = `${environment.apiBaseUrl}/orders/user/${userId}`;
    return this.http.get<ApiResponse>(url, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.token}`,
      })
    });
  }
  getAllOrders(keyword:string,
    page: number, limit: number
  ): Observable<ApiResponse> {
      const params = new HttpParams()
      .set('keyword', keyword)
      .set('page', page.toString())
      .set('limit', limit.toString());
      return this.http.get<ApiResponse>(this.apiGetAllOrders, { params });
  }
  updateOrder(orderId: number, orderData: OrderDTO): Observable<ApiResponse> {
    const url = `${environment.apiBaseUrl}/orders/${orderId}`;
    return this.http.put<ApiResponse>(url, orderData);
  }
  deleteOrder(orderId: number): Observable<ApiResponse> {
    const url = `${environment.apiBaseUrl}/orders/${orderId}`;
    return this.http.delete<ApiResponse>(url);
  }

   // Hàm lấy tổng doanh thu
   getTotalRevenue(): Observable<string> {
    return this.http.get<string>(`${environment.apiBaseUrl}/orders/total-revenue`);
  }

  getMonthlyRevenue(): Observable<number[]> {
    return this.http.get<number[]>(`${environment.apiBaseUrl}/orders/monthly-revenue`);
  }
}
