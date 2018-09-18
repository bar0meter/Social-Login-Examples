import { Component, OnInit } from "@angular/core";
import { LoginService } from "../login.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  constructor(private ser: LoginService) {}

  ngOnInit() {}

  loginFB(e) {
    e.preventDefault();
    this.ser.login().subscribe(response => console.log(response));
  }
}
