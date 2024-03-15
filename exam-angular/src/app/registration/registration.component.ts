import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../service/login.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent {
  fg!:FormGroup
  hide: any;
    constructor(private loginService:LoginService,private fb:FormBuilder,private toastr: ToastrService,private router:Router){}
  
    email = new FormControl('', [Validators.required, Validators.email]);
  
    getErrorMessage() {
      return this.email.hasError('required') ? 'You must enter a value' :
          this.email.hasError('email') ? 'Not a valid email' :
              '';
    }
  
    ngOnInit(): void {
      this.fg = this.fb.group({
        username:['', Validators.required],
        password:['', Validators.required],
      })
    }
  
    register(registerCredentials: any) {
      console.log(registerCredentials.username);
      
      if(registerCredentials.username!=""
      &&
      registerCredentials.password!==""){
        this.loginService.register(registerCredentials).subscribe(
          (res: any) => {
            localStorage.setItem('token', res.token);
            console.log(localStorage.getItem('token'));
            this.toastr.success(res.STATUS)
            localStorage.setItem('examStarted','true')
            this.router.navigateByUrl("")
          },
          (error: any) => {
            // Handle error here
            console.error('Error occurred while getting token:', error);
            console.error('Error occurred while getting token:', error.error.REASON);
            this.toastr.error(error.error.REASON); 
            // Optionally, you can show an error message to the user or perform other actions
          }
        );
      }else{
        this.toastr.error("Username or password should not be blank");
      }
    }
    
  
    submit(){
      this.register(this.fg.value)
      console.log(this.fg.value);
    }
  }
  