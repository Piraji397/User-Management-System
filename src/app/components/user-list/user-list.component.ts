import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserServiceService } from 'src/app/shared/user-service.service';
import { faEdit, faTrashAlt } from '@fortawesome/free-regular-svg-icons';
import { User } from 'src/app/models/user.model';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { DataServiceService } from 'src/app/shared/data-service.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent implements OnInit {
  edit = faEdit;
  delete = faTrashAlt;
  userSubscription!: Subscription;

  constructor(
    public userService: UserServiceService,
    private router: Router,
    private dataService: DataServiceService
  ) {}

  ngOnInit(): void {
    // this.userSubscription = this.dataService.user.subscribe((data) => {
    //   console.log(data);
    // });
  }

  editUser(user: User) {
    this.dataService.user.next(user);
    this.router.navigateByUrl('/addUser');
  }

  deleteUser(id: number) {
    this.userService.deleteUser(id);
  }

  addNewUser() {
    this.router.navigateByUrl('/addUser');
  }

  // ngOnDestroy(): void {
  //   if (this.userSubscription) {
  //     this.userSubscription.unsubscribe();
  //   }
  // }
}
