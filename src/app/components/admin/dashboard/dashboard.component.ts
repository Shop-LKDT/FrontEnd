import { CurrencyPipe, NgFor } from '@angular/common';
import { RouterModule } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { Inject, PLATFORM_ID, AfterViewInit, Component, ElementRef, ViewChild, OnInit } from '@angular/core';

import { Chart, registerables } from 'chart.js' //npm install chart.js
Chart.register(...registerables);

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [NgFor,RouterModule,CurrencyPipe,],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit, AfterViewInit {
  totalProductCount: number = 100;
  totalOrderPrice: number = 11003200;
  totalUsers: number = 10034;
  totalQuest: number = 100;

  @ViewChild('myChart', { static: true }) myChart!: ElementRef<HTMLCanvasElement>;

  constructor(@Inject(PLATFORM_ID) private platformId: object) {}

  ngOnInit(): void {
    // Khởi tạo các giá trị hoặc thực hiện bất kỳ logic nào cần thiết
  }

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.renderChart();
    }
  }

  renderChart() {
    const ctx = this.myChart.nativeElement.getContext('2d');
    if (!ctx) return;

    // Dữ liệu cho từng tháng
    const monthlyLabels = ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6',
                           'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'];

    const monthlyData = [
      1000, 1500, 1200, 1700, 1300, 1900,
      2200, 2400, 2100, 2500, 3000, 3200
    ];

    // Dữ liệu cho từng quý
    const quarterlyData = [
      monthlyData.slice(0, 3).reduce((a, b) => a + b, 0), // Tổng doanh thu Quý 1
      monthlyData.slice(3, 6).reduce((a, b) => a + b, 0), // Tổng doanh thu Quý 2
      monthlyData.slice(6, 9).reduce((a, b) => a + b, 0), // Tổng doanh thu Quý 3
      monthlyData.slice(9, 12).reduce((a, b) => a + b, 0) // Tổng doanh thu Quý 4
    ];

    // Dữ liệu cho từng năm
    const yearlyLabels = ['2021', '2022', '2023', '2024'];
    const yearlyData = [30000, 40000, 50000, 60000]; // Dữ liệu doanh thu theo năm

    // Tạo biểu đồ
    new Chart(ctx, {
      type: 'line', // Loại biểu đồ
      data: {
        labels: monthlyLabels, // Nhãn theo tháng
        datasets: [
          {
            label: 'Doanh thu hàng tháng',
            data: monthlyData, // Dữ liệu theo tháng
            backgroundColor: 'rgba(75, 192, 192, 0.2)', // Màu nền
            borderColor: 'rgba(75, 192, 192, 1)', // Màu viền
            borderWidth: 2,
            fill: true, // Đổ màu phía dưới đường
          },
          {
            label: 'Doanh thu hàng quý',
            data: [
              quarterlyData[0], // Quý 1
              null, // Quý 2 không có dữ liệu trong tháng
              null,
              quarterlyData[1], // Quý 2
              null,
              null,
              quarterlyData[2], // Quý 3
              null,
              null,
              quarterlyData[3], // Quý 4
              null,
              null,
            ],
            backgroundColor: 'rgba(255, 206, 86, 0.2)',
            borderColor: 'rgba(255, 206, 86, 1)',
            borderWidth: 2,
            fill: true,
          },
          {
            label: 'Doanh thu hàng năm',
            data: [
              null, null, null, null, // Không có dữ liệu trong tháng
              null, null, null, null,
              null, null, null, null,
              yearlyData[0], // 2021
            ],
            backgroundColor: 'rgba(153, 102, 255, 0.2)',
            borderColor: 'rgba(153, 102, 255, 1)',
            borderWidth: 2,
            fill: true,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  }
}
