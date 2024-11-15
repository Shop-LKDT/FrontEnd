import { Component, OnInit } from '@angular/core';
import { Supplier } from '../../../models/supplier';
import { DatePipe, NgFor } from '@angular/common';

@Component({
  selector: 'app-supplier',
  standalone: true,
  imports: [NgFor,DatePipe],
  templateUrl: './supplier.component.html',
  styleUrl: './supplier.component.scss'
})
export class SupplierComponent implements OnInit{
  suppliers: Supplier[] = []; // Mảng lưu trữ các nhà cung cấp

  totalsuppliers: number = 50;
  suppliersPerPage: number = 5;
  currentPage: number = 1;
  pageSize: number = 6;
  totalPages: number = Math.ceil(this.totalsuppliers / this.suppliersPerPage); // Tổng số trang
  ngOnInit() {
    this.generateRandomsuppliers(this.currentPage);
  }
  changePage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.generateRandomsuppliers(this.currentPage);
    }
  }

  generateRandomsuppliers(page: number) {
    this.suppliers = []; // Xóa dữ liệu cũ trước khi tạo mới
    const start = (page - 1) * this.suppliersPerPage; // Vị trí bắt đầu
    const end = start + this.suppliersPerPage; // Vị trí kết thúc

    for (let i = start + 1; i <= end; i++) {
      if (i > this.totalsuppliers) break; // Dừng lại nếu vượt quá tổng số người dùng

      this.suppliers.push({
        supplierID: i,
        name: `Nhà cung cấp ${i}`,
        phone: `0123${Math.floor(Math.random() * 900000) + 100000}`, // Số điện thoại ngẫu nhiên
        address: `Địa chỉ nhà cung cấp ${i}`,
        email: `email${i}@.email.com`, 
      });
    }
  }
}
