import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Post, PostDTO, ApiResponse, PostImage } from '../models/post.model';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private apiUrl = `${environment.apiBaseUrl}/posts`; // API URL cho posts

  constructor(private http: HttpClient) {}

  // 1. Tạo mới một bài đăng
  createPost(postDTO: PostDTO): Observable<ApiResponse<Post>> {
    return this.http.post<ApiResponse<Post>>(this.apiUrl, postDTO);
  }

  // 2. Lấy tất cả các bài đăng có phân trang
  getAllPosts(page: number = 0, size: number = 10): Observable<ApiResponse<Post[]>> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());
    return this.http.get<ApiResponse<Post[]>>(this.apiUrl, { params });
  }

  // 3. Cập nhật một bài đăng theo ID
  updatePost(id: number, postDTO: PostDTO): Observable<ApiResponse<Post>> {
    return this.http.put<ApiResponse<Post>>(`${this.apiUrl}/${id}`, postDTO);
  }

  // 4. Xóa một bài đăng theo ID
  deletePost(id: number): Observable<ApiResponse<null>> {
    return this.http.delete<ApiResponse<null>>(`${this.apiUrl}/${id}`);
  }

  // 5. Upload hình ảnh cho bài đăng
  uploadPostImages(postId: number, files: File[]): Observable<ApiResponse<PostImage[]>> {
    const formData = new FormData();
    files.forEach((file) => formData.append('files', file));
    const headers = new HttpHeaders().set('enctype', 'multipart/form-data');
    return this.http.post<ApiResponse<PostImage[]>>(`${this.apiUrl}/uploads/${postId}`, formData, { headers });
  }

  // 6. Xem một hình ảnh của bài đăng
  viewImage(imageName: string): Observable<Blob> {
    return this.http.get(`${this.apiUrl}/images/${imageName}`, { responseType: 'blob' });
  }
}
