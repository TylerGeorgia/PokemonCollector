import { Component, OnInit } from "@angular/core";
import { UserService } from "src/app/service/user.service";
import { RedeemUser } from "src/app/models/redeem-user";

@Component({
  selector: "app-user-home",
  templateUrl: "./user-home.component.html",
  styleUrls: ["./user-home.component.css"]
})
export class UserHomeComponent implements OnInit {
  userModel = new RedeemUser("");
  pokemonArr: any[] = new Array();
  constructor(private _userService: UserService) {}

  ngOnInit() {
    console.log("LOCALSTORAGE", localStorage);
    //Get the active user from local storage object.
    //var currentUser = JSON.parse(localStorage.getItem("currentUser"));
    //console.log("currentUser", currentUser);
    //Make call to get collection for active user.
    //var userCollection = JSON.parse(localStorage.getItem("userCollection"));
    //console.log(userCollection);
    //Setup shop local storage
    this._userService.getAllPokemon().subscribe(data => {
      localStorage.setItem("shop", JSON.stringify(data));
    });
    //Setup User Duplicates
    var currentUser = JSON.parse(localStorage.getItem("currentUser"));
    //console.log("local storage - currentUser - user-home", currentUser);

    this.userModel.userId = currentUser.userId;
    console.log("User Model", this.userModel);
    this._userService.getUserDuplicates(this.userModel).subscribe(data => {
      localStorage.setItem("userDuplicates", JSON.stringify(data));
      //console.log("data in userHomePage", data);
    });

    // this._userService.getUserCollection().subscribe(data => {
    //   //console.log("-userHome - response from getUserCollection", data);
    //   //console.log(data.ownedPokemon);
    //   localStorage.setItem(
    //     "currentCollection",
    //     JSON.stringify(data.ownedPokemon)
    //   );
    // });

    // console.log(
    //   "local Storage - currentCollection - userHome",
    //   JSON.parse(localStorage.getItem("currentCollection"))
    // );
  }
}
