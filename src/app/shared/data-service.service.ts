import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class DataServiceService {
  initialData: User = {
    id: 1,
    name: 'new user',
    email: 'new@gmail.com',
    address: {
      street: 'Swargate',
      city: 'Pune',
      zipcode: '4546456',
    },
  };
  user = new BehaviorSubject(this.initialData);
  constructor() {}
}
