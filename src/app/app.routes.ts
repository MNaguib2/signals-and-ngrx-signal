import { Routes } from '@angular/router';
import { ParentComponentComponent } from './parent-component/parent-component.component';
import { UserListComponent } from './user-list/user-list.component';

export const routes: Routes = [
  {path: 'signal-input', component: ParentComponentComponent},
  {path: 'ToSingle', component: UserListComponent}
];
