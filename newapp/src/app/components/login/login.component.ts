import { Component, OnInit } from '@angular/core';
import { ValidateService } from '../../services/validate.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username: String;
  password: String;

  constructor(private validateService: ValidateService, private flashMsg: FlashMessagesService,private authService: AuthService, private router: Router) { }

  ngOnInit() {
  }
  onLoginSubmit(){
    const user = {
      username: this.username,
      password: this.password
    }

    if(!this.validateService.validateLogin(user)){ //If not false then they're not all filled
      this.flashMsg.show('Fill in all fields', {cssClass: 'alert-danger', timeout:2500});
      return false;
    }
    // console.log(this.username)
    this.authService.loginUser(user).subscribe(data => {
      if(data.success){
        this.authService.storeUserData(data.token, data.user);
        this.flashMsg.show('You are now logged in', {cssClass: 'alert-success', timeout:2500});
        this.router.navigate([''])
        console.log('worked')
      }else{
        this.flashMsg.show('Please retry', {cssClass: 'alert-danger', timeout:2500});
        console.log("didnt work")
        this.router.navigate(['/login'])
      }
    })
  }
}

