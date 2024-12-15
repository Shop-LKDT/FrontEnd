import { OrderResponse } from './../../../responses/order/order.response';
import { UserResponse } from './../../../responses/user/user.response';
import { UserService } from './../../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../../services/order.service';
@Component({
  selector: 'app-card-profile',
  standalone: true,
  imports: [],
  templateUrl: './card-profile.component.html',
  styleUrl: './card-profile.component.scss'
})
export class CardProfileComponent implements OnInit {
  userResponse?: UserResponse | null;
  orderResponses: OrderResponse[] = [];
  constructor(
    private userService:UserService,
    private orderService:OrderService
  ) {}

  ngOnInit(): void {
    this.getCurrentUser();
    console.log(this.orderResponses.length);
  }
  getCurrentUser(): void {
    this.userResponse = this.userService.getUserResponseFromLocalStorage();
    if (this.userResponse) {
      this.getOrdersByUserId(this.userResponse.id);
  
    }
  }
  getOrdersByUserId(userId: number): void {
    this.orderService.getOrdersByUserId(userId).subscribe((response) => {
      this.orderResponses = response.data;
    });
  }

}
