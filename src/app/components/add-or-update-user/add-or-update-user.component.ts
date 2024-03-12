import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataServiceService } from 'src/app/shared/data-service.service';
import { UserServiceService } from 'src/app/shared/user-service.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-add-or-update-user',
  templateUrl: './add-or-update-user.component.html',
  styleUrls: ['./add-or-update-user.component.scss'],
})
export class AddOrUpdateUserComponent implements OnInit, OnDestroy {
  userForm: FormGroup;
  userSubscription!: Subscription;

  constructor(
    private fb: FormBuilder,
    private userService: UserServiceService,
    private router: Router,
    public dataService: DataServiceService
  ) {
    this.userForm = fb.group({
      id: [''],
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: [
        '',
        [
          Validators.required,
          Validators.pattern('[A-Za-z0-9._%-]+@[A-Za-z0-9._%-]+\\.[a-z]{2,4}'),
        ],
      ],
      address: fb.group({
        street: [''],
        city: [''],
        zipcode: [''],
      }),
    });
  }

  ngOnInit(): void {
    if (this.dataService.editUser) {
      this.userSubscription = this.dataService.user.subscribe((data) => {
        // console.log(data);
        this.userForm.setValue({
          id: data.id,
          name: data.name,
          email: data.email,
          address: {
            street: data.address.street,
            city: data.address.city,
            zipcode: data.address.zipcode,
          },
        });
        this.dataService.editUser = true;
      });
    }
  }

  handleSubmit() {
    // console.log('called', this.userForm.value);
    if (!this.dataService.editUser) {
      this.userService.addUser(this.userForm.value);
    } else {
      this.userService.updateUser(this.userForm.value);
      this.dataService.editUser = false;
    }
    this.userForm.reset();
    this.router.navigateByUrl('/');
  }

  ngOnDestroy(): void {
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
  }
}
