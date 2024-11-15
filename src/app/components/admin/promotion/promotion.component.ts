import { DatePipe, NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Coupon } from '../../../models/coupon';

@Component({
  selector: 'app-promotion',
  standalone: true,
  imports: [NgFor, DatePipe],
  templateUrl: './promotion.component.html',
  styleUrl: './promotion.component.scss'
})
export class PromotionComponent implements OnInit{
  promotions: Coupon[] = []; // Danh sách các khuyến mãi
  currentPage: number = 1;      // Trang hiện tại
  promotionsPerPage: number = 5; // Số lượng khuyến mãi trên mỗi trang
  totalPromotions: number = 50;   // Tổng số khuyến mãi
  totalPages: number = Math.ceil(this.totalPromotions / this.promotionsPerPage); // Tổng số trang

  ngOnInit() {
    this.generateRandomPromotions(this.currentPage); // Tạo danh sách khuyến mãi ngẫu nhiên

  }

  // Tạo danh sách khuyến mãi giả lập
  generateRandomPromotions(page: number) {
    this.promotions = []; // Xóa dữ liệu cũ trước khi tạo mới
    const start = (page - 1) * this.promotionsPerPage; // Vị trí bắt đầu
    const end = start + this.promotionsPerPage; // Vị trí kết thúc

    for (let i = start + 1; i <= end; i++) {
      if (i > this.totalPromotions) break; // Dừng lại nếu vượt quá tổng số bài viết
      this.promotions.push({
        id: i,
        code: `1212fssfe_${i}`,
        active: 1,
      });
    }

  }


  // Thay đổi trang
  changePage(page: number) {
    if (page >= 1 && page <= Math.ceil(this.totalPromotions / this.promotionsPerPage)) {
      this.currentPage = page; // Cập nhật trang hiện tại
      this.generateRandomPromotions(this.currentPage);
    }
  }
}
