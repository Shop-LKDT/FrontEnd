import { Component, OnInit } from '@angular/core';
import { User } from '../../../models/user';
import { DatePipe, NgFor } from '@angular/common';
import { Post } from '../../../models/post';

@Component({
  selector: 'app-post',
  standalone: true,
  imports: [NgFor, DatePipe],
  templateUrl: './post.component.html',
  styleUrl: './post.component.scss'
})
export class PostComponent implements OnInit{
  posts: Post[] = []; // Mảng chứa danh sách bài viết
  totalPosts: number = 100; // Tổng số bài viết giả định
  postsPerPage: number = 5; // Số bài viết trên mỗi trang
  currentPage: number = 1;
  totalPages: number = Math.ceil(this.totalPosts / this.postsPerPage); // Tổng số trang

  ngOnInit() {
    this.generateRandomPosts(this.currentPage);
  }

  changePage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.generateRandomPosts(this.currentPage);
    }
  }

  generateRandomPosts(page: number) {
    this.posts = []; // Xóa dữ liệu cũ trước khi tạo mới
    const start = (page - 1) * this.postsPerPage; // Vị trí bắt đầu
    const end = start + this.postsPerPage; // Vị trí kết thúc

    for (let i = start + 1; i <= end; i++) {
      if (i > this.totalPosts) break;

      this.posts.push({
        id: i,
        title: `Bài viết ${i}`, // Tiêu đề bài viết
        content: `Nội dung của bài viết ${i}`, // Nội dung bài viết
        created_at: new Date(), // Ngày tạo bài viết
        isPublished: i % 2 === 0, // Trạng thái công khai
      });
    }
  }
}
