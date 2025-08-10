import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthentifactionService, Credentials } from './data-source/authentifaction.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{
  ngOnInit(): void {
    if(localStorage.getItem('token')){
      localStorage.removeItem('token')
    }
  }
  private route = inject(Router);
  private authentificationService = inject(AuthentifactionService);
  formLogin = new FormGroup(
    {
      email: new FormControl('',Validators.required),
      password: new FormControl('',Validators.required),
   }
  );
  
  onSubmit(){
    if(localStorage.getItem('token')){
      localStorage.removeItem('token')
    }
    this.authentificationService.login(this.formLogin.value as Credentials).subscribe(
      (value) => {
        if(value){
          this.route.navigate(["/home"]);
        }
      }
    )
    this.formLogin.reset();
    
  }
 

}
