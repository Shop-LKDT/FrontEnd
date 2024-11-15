import { Component, OnInit } from '@angular/core';
import { Inventory } from '../../../models/inventory';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-inventory',
  standalone: true,
  imports: [NgFor],
  templateUrl: './inventory.component.html',
  styleUrl: './inventory.component.scss'
})
export class InventoryComponent implements OnInit{
  inventories: Inventory[] = []; // Mảng lưu trữ các sản phẩm tồn kho

  totalinventorys: number = 50;
  inventorysPerPage: number = 5;
  currentPage: number = 1;
  pageSize: number = 6;
  totalPages: number = Math.ceil(this.totalinventorys / this.inventorysPerPage); // Tổng số trang
  ngOnInit() {
    this.generateRandominventorys(this.currentPage);
  }
  changePage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.generateRandominventorys(this.currentPage);
    }
  }

  generateRandominventorys(page: number) {
    this.inventories = []; // Xóa dữ liệu cũ trước khi tạo mới
    const start = (page - 1) * this.inventorysPerPage; // Vị trí bắt đầu
    const end = start + this.inventorysPerPage; // Vị trí kết thúc

    for (let i = start + 1; i <= end; i++) {
      if (i > this.totalinventorys) break; // Dừng lại nếu vượt quá tổng số người dùng

      this.inventories.push({
        id: i,
        productId: 102,
        productName: `Sản phẩm_${i}`,
        quantity: 20,
        location: 'Khu vực B2',
      });
    }
  }
}
