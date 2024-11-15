import { Component } from '@angular/core';
import { Report } from '../../../models/report';
import { DatePipe, NgFor } from '@angular/common';

@Component({
  selector: 'app-report-from-customer',
  standalone: true,
  imports: [NgFor, DatePipe],
  templateUrl: './report-from-customer.component.html',
  styleUrl: './report-from-customer.component.scss'
})
export class ReportFromCustomerComponent {
  Reports: Report[] = [];

  totalReports: number = 20;
  ReportsPerPage: number = 5;
  currentPage: number = 1;
  pageSize: number = 6;
  totalPages: number = Math.ceil(this.totalReports / this.ReportsPerPage); // Tổng số trang
  ngOnInit() {
    this.generateRandomReports(this.currentPage);
  }
  changePage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.generateRandomReports(this.currentPage);
    }
  }

  generateRandomReports(page: number) {
    this.Reports = []; // Xóa dữ liệu cũ trước khi tạo mới
    const start = (page - 1) * this.ReportsPerPage; // Vị trí bắt đầu
    const end = start + this.ReportsPerPage; // Vị trí kết thúc

    for (let i = start + 1; i <= end; i++) {
      if (i > this.totalReports) break; // Dừng lại nếu vượt quá tổng số người dùng

      this.Reports.push({
        id: i,
        customerId: i,
        reportDate: new Date(1990 + (i % 30), Math.floor(Math.random() * 12), Math.floor(Math.random() * 28)), // Ngày sinh ngẫu nhiên
        content: `Nội dung của bài viết ${i}`, // Nội dung bài báo cáo
        status: 1,
        response: `Phản hồi về bài báo cáo ${i}`,
      });
    }
  }
}
