import { Component, OnInit } from '@angular/core';
import { LoginService } from '../service/login.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{
// [x: string]: any;
  fg!:FormGroup
hide: any;
  constructor(private loginService:LoginService,private fb:FormBuilder,private toastr: ToastrService,private router:Router){}
  register=false
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

  getToken(tokenCredentials: any) {
    console.log(tokenCredentials.username!='');
    
    if(tokenCredentials.username!=""
    &&
    tokenCredentials.password!==""){
      this.loginService.getToken(tokenCredentials).subscribe(
        (res: any) => {
          localStorage.setItem('token', res.token);
          console.log(localStorage.getItem('token'));
          this.toastr.success("LOGGED IN SUCCESSFULLY")
          localStorage.setItem('examStarted','true')
          this.router.navigateByUrl("exam")
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
    this.getToken(this.fg.value)
    console.log(this.fg.value);
  }
  change(){
    this.register=!this.register
  }
}
