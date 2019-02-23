import { Component, OnInit } from "@angular/core";
import { UserService } from "src/app/service/user.service";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
@Component({
  selector: "app-collection-page",
  templateUrl: "./collection-page.component.html",
  styleUrls: ["./collection-page.component.css"]
})
export class CollectionPageComponent implements OnInit {
  constructor(
    private _userService: UserService,
    private _http: HttpClient,
    private _router: Router
  ) {}

  ngOnInit() {
    let authToken = JSON.parse(localStorage.getItem("authToken"));
    console.log("auth token", authToken);
    if (authToken == null) {
      console.log("inside of auth case");
      this._router.navigate(["/landing"]);
    } else {
      console.log("LOgged in");
    }
    console.log("WE are in collection main page");
  }
}
