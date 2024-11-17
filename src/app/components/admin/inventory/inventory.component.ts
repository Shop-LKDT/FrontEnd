import { WarehouseProductService } from './../../../services/inventory.service';
import { Component, NgModule, OnInit } from '@angular/core';
import { Inventory } from '../../../models/inventory';
import { NgFor } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-inventory',
  standalone: true,
  imports: [NgFor,ReactiveFormsModule,
    FormsModule,
  ],
  templateUrl: './inventory.component.html',
  styleUrl: './inventory.component.scss'
})
export class InventoryComponent implements OnInit {
  inventories: Inventory[] = []; // Array to hold the inventory products
  totalinventorys: number = 50; // Total number of products
  inventorysPerPage: number = 5; // Products per page
  currentPage: number = 1; // Current page number
  pageSize: number = 6; // Pagination size
  totalPages: number = Math.ceil(this.totalinventorys / this.inventorysPerPage);
  quantity: number = 0; // Calculate total pages

  productToUpdate: Inventory | null = null; // Store selected product for update
  productToDeleteId: number | null = null; // Store selected product's ID for deletion
  addInventoryForm: FormGroup;
  constructor(private warehouseProductService: WarehouseProductService) {
    this.addInventoryForm = new FormGroup({
      location: new FormControl('', Validators.required),
      productId: new FormControl('', Validators.required),
      quantity: new FormControl('', [Validators.required, Validators.min(1)]),
    });
  }

  ngOnInit() {
    this.getData(this.currentPage);
  }

  // Change page logic
  changePage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.getData(this.currentPage);
    }
  }

  // Get data for the current page
  getData(page: number): void {
    this.warehouseProductService.getAllWarehouseProducts().subscribe({
      next: (response) => {
        this.inventories = response.data; // Assign data to inventories
        console.log(this.inventories); 
      },
      error: (error) => {
        console.error(error);
      },
    });
  }
  openEditModal(inventory: Inventory): void {
    this.productToUpdate = { ...inventory };  // Clone the object to avoid direct mutation
    console.log(this.productToUpdate);  
    // You can check in the console to see if it's correct
    const modal = document.getElementById('editCategoryModal') as any;
    if (modal) {
      modal.style.display = 'block';
      modal.classList.add('show');
    }
  }
  

  // Update product data
  updateData(): void {
    if (this.productToUpdate) {
      // Call service method to update the product quantity or other details
      this.warehouseProductService.updateWarehouseProduct(this.productToUpdate.id, this.productToUpdate.quantity).subscribe({
        next: (response) => {
          console.log('Product updated:', response);
          this.getData(this.currentPage); // Refresh the list after update
        },
        error: (error) => {
          console.error('Error updating product:', error);
        },
      });
    }
  }

  // Delete product
  deleteData(): void {
    if (this.productToDeleteId !== null) {
      this.warehouseProductService.deleteWarehouseProduct(this.productToDeleteId).subscribe({
        next: (response) => {
          console.log('Product deleted:', response);
          this.getData(this.currentPage); // Refresh the list after deletion
        },
        error: (error) => {
          console.error('Error deleting product:', error);
        },
      });
    }
  }

  // Set the selected product for update
  setProductToUpdate(product: Inventory): void {
    this.productToUpdate = { ...product }; // Make a copy to avoid direct binding
  }

  // Set the selected product ID for deletion
  setProductToDelete(id: number): void {
    this.productToDeleteId = id;
  }
}
