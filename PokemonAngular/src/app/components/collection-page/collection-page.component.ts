import { Component, OnInit } from "@angular/core";
import { UserService } from "src/app/service/user.service";
import { HttpClient } from "@angular/common/http";
@Component({
  selector: "app-collection-page",
  templateUrl: "./collection-page.component.html",
  styleUrls: ["./collection-page.component.css"]
})
export class CollectionPageComponent implements OnInit {
  constructor(private _userService: UserService, private _http: HttpClient) {}

  ngOnInit() {
    console.log("WE are in collection main page");
  }
}
