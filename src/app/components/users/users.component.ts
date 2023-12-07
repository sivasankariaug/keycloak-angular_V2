import { Component } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent {
  POSTS: any;
  token: string;
  page: number = 1;
  count: number = 0;
  tableSize: number = 5;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.token = localStorage.getItem('token');
    console.log("list ", this.token);
    this.userList();
  }

  userList(): void {
    this.userService.getAllUserData(this.token).subscribe((Response: any) => {
      this.POSTS = Response;
      console.log(this.POSTS);
    })
  }

  onTableDataChange(event: any) {
    this.page = event;
    this.userList();
  }
}
