export interface Post {
  id: number; // Mã định danh duy nhất cho bài viết
  title: string; // Tiêu đề của bài viết
  content: string; // Nội dung của bài viết
  created_at: Date; // Ngày tạo bài viết
  isPublished: boolean; // Trạng thái công khai của bài viết
}
