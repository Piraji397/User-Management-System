import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddOrUpdateUserComponent } from './components/add-or-update-user/add-or-update-user.component';
import { UserListComponent } from './components/user-list/user-list.component';

const routes: Routes = [
  { path: '', component: UserListComponent },
  { path: 'addUser', component: AddOrUpdateUserComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
