import { Component, OnInit } from "@angular/core";
import { UserService } from "src/app/service/user.service";

@Component({
  selector: "app-user-home",
  templateUrl: "./user-home.component.html",
  styleUrls: ["./user-home.component.css"]
})
export class UserHomeComponent implements OnInit {
  constructor(private _userService: UserService) {}

  ngOnInit() {
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
    this._userService.getUserCollection().subscribe(data => {
      //console.log(data);
      //console.log(data.ownedPokemon);
      localStorage.setItem(
        "currentCollection",
        JSON.stringify(data.ownedPokemon)
      );
    });
  }
}
