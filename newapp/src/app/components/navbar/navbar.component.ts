import { Component, OnInit } from '@angular/core';
import { ValidateService } from '../../services/validate.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private validateService: ValidateService, private flashMsg: FlashMessagesService,private authService: AuthService, private router: Router) { }

  ngOnInit() {
  }
onLogoutClick(){
  this.authService.logout();
  this.flashMsg.show('You are logged out', {
    cssClass:'alert-success',
    timeout:2500
  });
  this.router.navigate(['login']);
  return false;
}
}
