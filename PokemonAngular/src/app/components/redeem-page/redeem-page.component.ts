import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { UserService } from "src/app/service/user.service";
import { RedeemUser } from "src/app/models/redeem-user";
@Component({
  selector: "app-redeem-page",
  templateUrl: "./redeem-page.component.html",
  styleUrls: ["./redeem-page.component.css"]
})
export class RedeemPageComponent implements OnInit {
  userModel = new RedeemUser("");
  constructor(private _http: HttpClient, private _userService: UserService) {
    var currentUser = JSON.parse(localStorage.getItem("currentUser"));
    console.log(currentUser.userId);

    this.userModel.userId = currentUser.userId;
    console.log(this.userModel);
    this._userService.getUserDuplicates(this.userModel).subscribe(data => {
      console.log("data", data);
    });
  }

  ngOnInit() {}
}
