import { Component, OnInit } from "@angular/core";
import { UserService } from "src/app/service/user.service";
import { RedeemUser } from "src/app/models/redeem-user";
import { CurrentSessionService } from "src/app/service/current-session.service";
@Component({
  selector: "app-user-home",
  templateUrl: "./user-home.component.html",
  styleUrls: ["./user-home.component.css"]
})
export class UserHomeComponent implements OnInit {
  userModel = new RedeemUser("");
  pokemonArr: any[] = new Array();

  constructor(
    private _userService: UserService,
    private _currentSession: CurrentSessionService
  ) {}

  ngOnInit() {
    console.log("LOCALSTORAGE", localStorage);

    //Setup shop local storage
    this._userService.getAllPokemon().subscribe(data => {
      localStorage.setItem("shop", JSON.stringify(data));
    });
    //Setup User Duplicates
    var currentUser = JSON.parse(localStorage.getItem("currentUser"));

    this.userModel.userId = currentUser.userId;
    console.log("User Model", this.userModel);
    this._userService.getUserDuplicates(this.userModel).subscribe(data => {
      localStorage.setItem("userDuplicates", JSON.stringify(data));
      //console.log("data in userHomePage", data);
    });
  }
}
