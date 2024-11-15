import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RegisterDTO } from '../dtos/user/register.dto';
import { LoginDTO } from '../dtos/user/login.dto';
import { environment } from '../../environments/environment';
import { HttpUtilService } from './http.util.service';
import { UserResponse } from '../responses/user/user.response';
import { UpdateUserDTO } from '../dtos/user/update.user.dto';
import { DOCUMENT } from '@angular/common';
import { inject } from '@angular/core';
import { ApiResponse } from '../responses/api.response';
import { LoginResponse } from '../responses/user/login.response';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiRegister = `${environment.apiBaseUrl}/users/register`;
  private apiLogin = `${environment.apiBaseUrl}/users/login`;
  private apiUserDetail = `${environment.apiBaseUrl}/users/details`;
  private apiLoginGoogle = `${environment.apiBaseUrl}/comments/emails`;
  private apiContainPhoneNumber = `${environment.apiBaseUrl}/users/phone/`;


  private http = inject(HttpClient);
  private httpUtilService = inject(HttpUtilService);

  localStorage?:Storage;

  private apiConfig = {
    headers: this.httpUtilService.createHeaders(),
  }

  constructor(
    @Inject(DOCUMENT) private document: Document
  ) {
    this.localStorage = document.defaultView?.localStorage;
  }

  register(registerDTO: RegisterDTO):Observable<ApiResponse> {
    return this.http.post<ApiResponse>(this.apiRegister, registerDTO, this.apiConfig);
  }

  login(loginDTO: LoginDTO): Observable<any> {
    return this.http.post<ApiResponse>(`${environment.apiBaseUrl}/users/login`, loginDTO, this.apiConfig);
  }
  loginGG(loginDTO: LoginDTO): Observable<any> {
    return this.http.post<LoginResponse>(`${environment.apiBaseUrl}/users/login/oauth2?email=${loginDTO.email}`, this.apiConfig);
  }
  getUserDetail(token: string): Observable<ApiResponse> {
    return this.http.post<any>(`${environment.apiBaseUrl}/users/details`, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      })
    })
  }
  updateUserDetail(token: string, updateUserDTO: UpdateUserDTO): Observable<ApiResponse>  {
    debugger
    let userResponse = this.getUserResponseFromLocalStorage();
    return this.http.put<ApiResponse>(`${this.apiUserDetail}/${userResponse?.id}`,updateUserDTO,{
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      })
    })
  }
  saveUserResponseToLocalStorage(userResponse?: UserResponse) {
    try {
      debugger
      if(userResponse == null || !userResponse) {
        return;
      }
      // Convert the userResponse object to a JSON string
      const userResponseJSON = JSON.stringify(userResponse);
      // Save the JSON string to local storage with a key (e.g., "userResponse")
      this.localStorage?.setItem('user', userResponseJSON);
      console.log('User response saved to local storage.');
    } catch (error) {
      console.error('Error saving user response to local storage:', error);
    }
  }
  getUserResponseFromLocalStorage():UserResponse | null {
    try {
      // Retrieve the JSON string from local storage using the key
      const userResponseJSON = this.localStorage?.getItem('user');
      if(userResponseJSON == null || userResponseJSON == undefined) {
        return null;
      }
      // Parse the JSON string back to an object
      const userResponse = JSON.parse(userResponseJSON!);
      console.log('User response retrieved from local storage.');
      return userResponse;
    } catch (error) {
      console.error('Error retrieving user response from local storage:', error);
      return null; // Return null or handle the error as needed
    }
  }
  removeUserFromLocalStorage():void {
    try {
      // Remove the user data from local storage using the key
      this.localStorage?.removeItem('user');
      console.log('User data removed from local storage.');
    } catch (error) {
      console.error('Error removing user data from local storage:', error);
      // Handle the error as needed
    }
  }
  getUsers(params: { page: number, limit: number, keyword: string }): Observable<ApiResponse> {
    const url = `${environment.apiBaseUrl}/users`;
    return this.http.get<ApiResponse>(url, { params: params });
  }

  // Hàm lấy danh sách tất cả user
  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${environment.apiBaseUrl}/users/all`);
  }
  // Đếm số lượng user
  countUsers(): Observable<number> {
    return new Observable((observer) => {
      this.getAllUsers().subscribe({
        next: (users) => {
          observer.next(users.length);
          observer.complete();
        },
        error: (err) => {
          console.error('Error fetching users:', err);
          observer.error(err);
        },
      });
    });
  }

  resetPassword(userId: number): Observable<ApiResponse> {
    const url = `${environment.apiBaseUrl}/users/reset-password/${userId}`;
    return this.http.put<ApiResponse>(url, null, this.apiConfig);
  }

  toggleUserStatus(params: { userId: number, enable: boolean }): Observable<ApiResponse> {
    const url = `${environment.apiBaseUrl}/users/block/${params.userId}/${params.enable ? '1' : '0'}`;
    return this.http.put<ApiResponse>(url, null, this.apiConfig);
  }

  getGoogleUserInfo(id: number): Observable<any>{
    return this.http.get<any>(`${this.apiLoginGoogle}/${id}`)
  }
  getUserByPhoneNumber(phone_number: string): Observable<any> {
    return this.http.get(this.apiContainPhoneNumber + phone_number);
  }
  existingUser(id:number){
    return this.http.get<ApiResponse>(`${environment.apiBaseUrl}/users/existingUser?gg_id=${id}`);
  }


}
