import { Component, ViewChild, OnInit } from '@angular/core';
import { LoginDTO } from '../../dtos/user/login.dto';
import { UserService } from '../../services/user.service';
import { TokenService } from '../../services/token.service';
import {  Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Role } from '../../models/role'; // Đường dẫn đến model Role
import { UserResponse } from '../../responses/user/user.response';
import { CartService } from '../../services/cart.service';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiResponse } from '../../responses/api.response';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
  imports: [FooterComponent, HeaderComponent, CommonModule, FormsModule],
})
export class LoginComponent  {
  @ViewChild('loginForm') loginForm!: NgForm;

  phoneNumber: string = '';
  password: string = '';
  showPassword: boolean = false;

  roles: Role[] = []; // Mảng roles
  rememberMe: boolean = true;
  selectedRole: Role | undefined; // Biến để lưu giá trị được chọn từ dropdown
  userResponse?: UserResponse;


  constructor(
    private router: Router,
    private userService: UserService,
    private tokenService: TokenService,
    private cartService: CartService
  ) {}
  createAccount() {
    this.router.navigate(['/register']);
  }
  login() {
    const message = `phone: ${this.phoneNumber}` + `password: ${this.password}`;
    //console.error(message);

    const loginDTO: LoginDTO = {
      phone_number: this.phoneNumber,
      password: this.password,
      role_id: this.selectedRole?.id ?? 1,
      email: '',
    };
    this.userService.login(loginDTO).subscribe({
      next: (apiResponse: ApiResponse) => {
        const { token } = apiResponse.data;
        if (this.rememberMe) {
          this.tokenService.setToken(token);
          this.userService.getUserDetail(token).subscribe({
            next: (apiResponse2: ApiResponse) => {
              this.userResponse = {
                ...apiResponse2.data,
                date_of_birth: new Date(apiResponse2.data.date_of_birth),
              };
              this.userService.saveUserResponseToLocalStorage(
                this.userResponse
              );
              if (this.userResponse?.role.name == 'admin') {
                this.router.navigate(['/admin']);
              } else if (this.userResponse?.role.name == 'user') {
                this.router.navigate(['/']);
              }
            },
            complete: () => {
              this.cartService.refreshCart();
            },
            error: (error: HttpErrorResponse) => {
              console.error(error?.error?.message ?? '');
            },
          });
        }
      },
      complete: () => {},
      error: (error: HttpErrorResponse) => {
        console.error(error?.error?.message ?? '');
      },
    });
  }
  togglePassword() {
    this.showPassword = !this.showPassword;
  }
  continueWithGoogle() {
    window.location.href = 'http://localhost:8088/oauth2/authorization/google';
  }
}
