import { Component, OnInit } from '@angular/core';
import { Inventory } from '../../../models/inventory';
import { NgFor, NgIf } from '@angular/common';

import { InventoryService } from '../../../services/inventory.service';
import { ApiResponse } from '../../../responses/api.response';
import {  FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-inventory',
  standalone: true,
  imports: [NgFor, ReactiveFormsModule, NgIf] ,
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.scss']
})
export class InventoryComponent implements OnInit {
  idToDelete: number | null = null; // Lưu ID của sản phẩm cần xóa
  selectedInventory: any = null;
  inventory: any = {};  // Sản phẩm được chọn để sửa
  inventories: Inventory[] = [];  // Array to hold the warehouse products
  totalinventorys: number = 50;  // Total number of products (this could come from API)
  inventorysPerPage: number = 5;  // Number of products per page
  currentPage: number = 1;  // Current page
  pageSize: number = 6;  // The maximum number of pages
  totalPages: number = Math.ceil(this.totalinventorys / this.inventorysPerPage);  // Total pages
  inventoryForm: FormGroup;
  constructor(private inventoryService:InventoryService ) {
    // this.getData(this.currentPage);
    this.inventoryForm = new FormGroup({
      quantity: new FormControl('', [Validators.required, Validators.min(1)])
    });
  }

  ngOnInit() {
    this.getData();  // Fetch data on component initialization
    console.log('Inventory data:', this.inventories);
  }

  // Pagination change handler
  changePage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.getData();  // Fetch data for the selected page
    }
  }

  // Method to fetch data for the current page
  getData(): void {
    // Assuming that the API method takes the page and pageSize as arguments
    this.inventoryService.getAllWarehouseProducts().subscribe(
      (response: ApiResponse) => {
        if (response && response.data) {
          this.inventories = response.data;  // Assuming 'data' contains the list of products
          console.log('Inventory data:', this.inventories);
        } else {
          console.error('No data found for page ' );
        }
      },
      error => {
        console.error('Error fetching inventory data:', error);
      }
    );
  }

  updateInventory(): void {
    if (this.inventoryForm.valid) {
      const updatedQuantity = this.inventoryForm.get('quantity')?.value; // Lấy số lượng mới từ form
      console.log('Updating inventory with quantity:', updatedQuantity);

      this.inventoryService.updateWarehouseProduct(this.selectedInventory.id, updatedQuantity).subscribe(
        (response: ApiResponse) => {
          console.log('Update response:', response);
          if (response.status === 'OK') {
            alert('Quantity updated successfully');
            this.getData(); // Refresh danh sách sau khi cập nhật
          } else {
            alert('Failed to update quantity');
          }
        },
        (error) => {
          console.error('Error updating inventory:', error);
          alert('An error occurred while updating the quantity.');
        }
      );
    } else {
      alert('Please enter a valid quantity.');
    }
  }
  openEditModal(inventory: any): void {
    this.selectedInventory = { ...inventory }; // Sao chép thông tin để chỉnh sửa
    console.log('Selected inventory:', this.selectedInventory);
    this.inventoryForm.patchValue({
      quantity: inventory.quantity
    });
  }

  confirmDelete(): void {
    if (this.idToDelete !== null) {
      this.inventoryService.deleteWarehouseProduct(this.idToDelete).subscribe(
        (response: ApiResponse) => {
          console.log('Delete response:', response);
          if (response.status === 'OK') {
            alert('Kho lưu trữ đã được xóa thành công');
            this.getData(); // Làm mới danh sách sau khi xóa
          } else {
            alert('Không thể xóa kho lưu trữ');
          }

        },
        (error) => {
          console.error('Error deleting inventory:', error);
          alert('Đã xảy ra lỗi khi xóa kho lưu trữ.');

        }
      );
    }
  }
  openDeleteModal(id: number): void {
    this.idToDelete = id; // Lưu lại ID của sản phẩm cần xóa
    const modal = document.getElementById('confirmDeleteModal');
    if (modal) {
      // Mở modal
      (modal as any).style.display = 'block';
    }
  }

}
