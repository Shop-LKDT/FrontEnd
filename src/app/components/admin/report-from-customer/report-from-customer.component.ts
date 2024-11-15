import { TokenService } from './../../../services/token.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Report } from '../../../models/report';
import { CommonModule, DatePipe, NgFor } from '@angular/common';
import { ReportService } from '../../../services/report.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ReportDto } from '../../../dtos/report/report.dto';
import { ApiResponse } from '../../../responses/api.response';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
@Component({
  selector: 'app-report-from-customer',
  templateUrl: './report-from-customer.component.html',
  styleUrls: ['./report-from-customer.component.scss'],
  standalone: true,
  
  imports: [
    CommonModule,
    FormsModule, // Cho ngModel
    ReactiveFormsModule, 
  ]
  
})
export class ReportFromCustomerComponent implements OnInit {
  addReportForm!: FormGroup;
  reports: Report[] = [];

  totalReports: number = 20;
  ReportsPerPage: number = 5;
  currentPage: number = 0;
  pageSize: number = 40;
  totalPages: number = Math.ceil(this.totalReports / this.ReportsPerPage); // Tổng số trang
  constructor(
    private reportService: ReportService,
    
    // private router: Router,
    // private route: ActivatedRoute,
  ) {
    this.getAllReports(this.currentPage, this.pageSize);
  }
  ngOnInit() {
    
    
  }
  getAllReports(page: number, size: number) { 

    this.reportService.getAllReports(page,size).subscribe({
      next: (response: ApiResponse) => {
        this.reports = response.data;
        console.log(this.reports, "jfskdfbsdkbsdfj");
        
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  // deleteReport(reportId: number) {
  //   this.reportService.deleteReport(reportId).subscribe({
  //     next: (response) => {
  //       this.getAllReports(this.currentPage, this.pageSize);
  //     },
  //     error: (error) => {
  //       console.log(error);
  //     }
  //   });
  // }
  changePage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.getAllReports(this.currentPage, this.pageSize);
    }
  }
}
