import { Warehouse } from './../models/warehouse';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { ApiResponse } from '../responses/api.response';

@Injectable({
  providedIn: 'root'
})
export class WareHouseService {

  private apiUrl = `${environment.apiBaseUrl}/warehouses`;  // URL của API

  constructor(private http: HttpClient) { }

  // Lấy danh sách warehouse
  getAllWarehouses(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(this.apiUrl);
  }

  // Tạo warehouse mới
  createWarehouse(wareHouse: Warehouse): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(this.apiUrl, wareHouse);
  }
  getAllproductNotInWarehouse(warehouseId: number): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(`${this.apiUrl}/products-not-in-warehouse/${warehouseId}`);
  }

}
