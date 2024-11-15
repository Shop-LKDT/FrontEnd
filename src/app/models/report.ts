export interface Report {
  id: number;                // ID của báo cáo
  customerId: number;       // ID của khách hàng
  reportDate: Date;         // Ngày báo cáo
  content: string;          // Nội dung chi tiết của báo cáo
  status: number; // Trạng thái của báo cáo có thể là "1" (đang chờ), "2" (đã giải quyết), hoặc "3" (bị từ chối).
  response?: string;        // Phản hồi từ quản lý hoặc bộ phận liên quan (nếu có)
}
