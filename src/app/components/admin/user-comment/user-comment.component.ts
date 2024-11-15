import { Role } from './../../../models/role';
import { User } from './../../../models/user';
import { DatePipe, NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Comment } from '../../../models/comment';

@Component({
  selector: 'app-user-comment',
  standalone: true,
  imports: [NgFor,DatePipe],
  templateUrl: './user-comment.component.html',
  styleUrl: './user-comment.component.scss'
})

export class UserCommentComponent implements OnInit {
  comments: Comment[] = [];
  users: User[] = [];

  totalUsers: number = 100; // Tổng số người dùng giả định
  usersPerPage: number = 5; // Số người dùng trên mỗi trang
  currentPage: number = 1;
  pageSize: number = 6;
  totalPages: number = Math.ceil(this.totalUsers / this.usersPerPage); // Tổng số trang
  ngOnInit() {
    this.generateRandomUsers(this.currentPage);
  }
  changePage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.generateRandomUsers(this.currentPage);
    }
  }

  generateRandomUsers(page: number) {
    this.users = []; // Xóa dữ liệu cũ trước khi tạo mới
    const start = (page - 1) * this.usersPerPage; // Vị trí bắt đầu
    const end = start + this.usersPerPage; // Vị trí kết thúc

    for (let i = start + 1; i <= end; i++) {
      if (i > this.totalUsers) break; // Dừng lại nếu vượt quá tổng số người dùng

      this.users.push({
        id: i,
        fullname: `Người dùng ${i}`,
        phone_number: `0123${Math.floor(Math.random() * 900000) + 100000}`, // Số điện thoại ngẫu nhiên
        address: `Địa chỉ ${i}`,
        password: `password${i}`,
        active: i % 2 === 0,
        date_of_birth: new Date(1990 + (i % 30), Math.floor(Math.random() * 12), Math.floor(Math.random() * 28)), // Ngày sinh ngẫu nhiên
        facebook_account_id: 1, // Tùy chọn
        google_account_id: 1,
        role: 1, // Gán vai trò
      });
    }
  }
}
