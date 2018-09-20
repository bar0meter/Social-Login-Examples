import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { switchMap } from "rxjs/operators";
import { LoginService } from "../login.service";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"]
})
export class HomeComponent implements OnInit {
  user;
  id: string;
  constructor(private route: ActivatedRoute, private ser: LoginService) {}

  ngOnInit() {
    const profile = this.route.queryParams;
    profile
      .pipe(switchMap(params => this.ser.getUser(params["id"])))
      .subscribe(value => {
        this.user = value;
      });
  }
}
