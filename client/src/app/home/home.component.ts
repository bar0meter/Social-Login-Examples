import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { mergeMap } from "rxjs/operators";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"]
})
export class HomeComponent implements OnInit {
  user;
  id: string;
  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    const routePromise = this.route.queryParams.toPromise();
    routePromise.then(params => {
      this.id = params["id"];
    });
  }
}
