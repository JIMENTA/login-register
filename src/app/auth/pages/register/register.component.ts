import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import  Swall from 'sweetalert2';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: [
  
  ]
})
export class RegisterComponent {
  myForm : FormGroup = this.fb.group({
    name:['Tester', Validators.required],
    email:['test1@test.com',[ Validators.required, Validators.email]],
    password:['123456', [Validators.required, Validators.minLength(6)]],

  });

  constructor ( private authService : AuthService, private fb : FormBuilder, private router : Router ){
    
  }

  register() {
    console.log(this.myForm.value)
    const {name,email, password} = this.myForm.value;

    this.authService.register(name, email, password)
    .subscribe ( ok => {
    if ( ok ) {
      this.router.navigateByUrl('/dashboard')
    } else {
      Swall.fire ('Error', ok , 'error')
    }
  })  
}

}
