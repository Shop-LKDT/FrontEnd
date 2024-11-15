export interface Post {
  id: number; // Mã định danh duy nhất cho bài viết
  title: string; // Tiêu đề của bài viết
  content: string; // Nội dung của bài viết
  created_at: Date; // Ngày tạo bài viết
  images?: PostImage[];
  isPublished: boolean; // Trạng thái công khai của bài viết
}

export interface PostImage {
  id: number;
  imageUrl: string;
}

export interface PostDTO {
  title: string;
  content: string;
}
export interface ApiResponse<T> {
  message: string;
  status: string;
  data: T;
}
