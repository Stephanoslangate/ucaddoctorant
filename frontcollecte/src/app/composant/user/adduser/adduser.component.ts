import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../data-source/user.service';

export interface Credentials {
    last_name: string;
    first_name: string;
    email: string;
    telephone: string;
    password1: string;
    username: string;
    fonction: string;

}
@Component({
  selector: 'app-adduser',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './adduser.component.html',
  styleUrl: './adduser.component.css'
})
export class AdduserComponent {

    private route = inject(Router);
    private readonly userService = inject(UserService);
  public readonly users = this.userService.users;
     usertForm = new FormGroup({
      last_name: new FormControl('',Validators.required),
      first_name: new FormControl('',Validators.required),
      email: new FormControl('',[Validators.required, Validators.email]),
      telephone: new FormControl('',Validators.required),
      password1: new FormControl('',Validators.required),
      username: new FormControl('',Validators.required),
      fonction: new FormControl('',Validators.required),  
   })
    public onSave() {
           this.userService.create(this.usertForm.value as Credentials).subscribe(
           (response)=>{
             if(response)
               console.log("Added successfuly")
             else
               console.log("Not add")
           }
         );  
         this.usertForm.reset();
     }
}
