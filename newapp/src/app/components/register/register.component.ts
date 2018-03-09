import { Component, OnInit } from '@angular/core';
import { ValidateService } from '../../services/validate.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
//Don't forget to inject the imported services.

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  name: String;
  username: String;
  email: String;
  password: String;

  constructor(private validateService: ValidateService, private flashMsg: FlashMessagesService,private authService: AuthService, private router: Router) { }

  ngOnInit() {
  }

  Register(){
    const user = {
      name: this.name,
      username: this.username,
      email: this.email,
      password: this.password
    }
    if(!this.validateService.validateRegister(user)){ //If not false then they're not all filled
      this.flashMsg.show('All values are not filled', {cssClass: 'alert-danger', timeout:2500});
      return false;
    }
    if(!this.validateService.validateEmail(user.email)){ //If not false then email not correct and print
      this.flashMsg.show('Not Valid Email', {cssClass: 'alert-danger', timeout:2500});
      return false;
    }
    this.authService.registerUser(user).subscribe(data => {
      if(data.success){
        this.flashMsg.show('You are now registered', {cssClass: 'alert-success', timeout:2500});
        this.router.navigate(['/login'])
        console.log('worked')
      }else{
        this.flashMsg.show('registration failed.  email must be unique to the username', {cssClass: 'alert-danger', timeout:2500});
        console.log("didnt work")
        this.router.navigate(['/register'])
      }
    })

  }
}
