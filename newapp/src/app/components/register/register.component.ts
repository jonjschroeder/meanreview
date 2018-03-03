import { Component, OnInit } from '@angular/core';
import { ValidateService } from '../../services/validate.service';
import {FlashMessagesService} from 'angular2-flash-messages';

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

  constructor(private validateService: ValidateService, private flashMsg: FlashMessagesService) { }

  ngOnInit() {
  }

  Register(){
    const user = {
      name: this.name,
      email: this.email,
      username: this.username,
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

  }
}
