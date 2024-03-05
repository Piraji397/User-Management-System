import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserServiceService {
  userList!: User[];

  constructor(private httpClient: HttpClient) {
    this.getUsers();
  }

  getUsers() {
    this.httpClient
      .get<User[]>('https://jsonplaceholder.typicode.com/users')
      .subscribe((data) => (this.userList = data));
  }

  addUser(user: User) {
    let newUser = {
      ...user,
      id: this.userList[this.userList.length - 1].id + 1,
    };
    this.userList.push(newUser);
  }

  updateUser(user: User) {
    let index = this.userList.findIndex((olduser) => olduser.id === user.id);
    this.userList[index] = user;
  }

  deleteUser(id: number) {
    this.userList = this.userList.filter((user) => user.id !== id);
  }
}
