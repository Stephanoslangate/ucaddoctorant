import { Component, inject, OnInit } from '@angular/core';
import { UserService } from '../data-source/user.service';
import { User } from '../data-source/user.model';

@Component({
  selector: 'app-listuser',
  standalone: true,
  imports: [],
  templateUrl: './listuser.component.html',
  styleUrl: './listuser.component.css'
})
export class ListuserComponent implements OnInit{
 private readonly userService = inject(UserService);
  public readonly users = this.userService.users;
   ngOnInit(): void { 
    this.userService.get().subscribe();
    console.log(this.users)
  }
   public onDelete(user: User) {
      console.log("Ouiiiii")
      this.userService.delete(user.id||0).subscribe();
    }
}
