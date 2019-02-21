import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { UserService } from "src/app/service/user.service";
import { PokemonObject } from "src/app/models/pokemon-object";
import { RedeemUser } from "src/app/models/redeem-user";
import { RedeemTicket } from "src/app/models/redeem-ticket";
@Component({
  selector: "app-redeem-page",
  templateUrl: "./redeem-page.component.html",
  styleUrls: ["./redeem-page.component.css"]
})
export class RedeemPageComponent implements OnInit {
  userModel = new RedeemUser("");
  redeemTicketModel = new RedeemTicket("", "");
  pokemonArr: any[] = new Array();
  pokemonModel = new PokemonObject("");
  constructor(private _http: HttpClient, private _userService: UserService) {
    // var currentUser = JSON.parse(localStorage.getItem("currentUser"));
    // console.log(currentUser.userId);
    // this.userModel.userId = currentUser.userId;
    // console.log(this.userModel);
    // this._userService.getUserDuplicates(this.userModel).subscribe(data => {
    //   localStorage.setItem("userDuplicates", JSON.stringify(data));
    //   console.log("data", data);
    // });
  }

  ngOnInit() {
    var currentDuplicates = JSON.parse(localStorage.getItem("userDuplicates"));
    console.log(currentDuplicates);
    // //Create URL front for pokeAPI.
    var tempUrl = "https://pokeapi.co/api/v2/pokemon/";
    var spriteURL = "";
    var pokemonType = "";
    // //Loop through current duplicates and generate form elements
    for (let i = 0; i < currentDuplicates.length; i++) {
      //   //Call PokeAPI for every item in collection.
      this._http
        .get<any>(tempUrl + currentDuplicates[i].pokemonId + "/")
        .subscribe(data => {
          console.log(data);
          spriteURL = data.sprites.front_default;
          pokemonType = data.types[0].type.name;
          currentDuplicates[i].URL = spriteURL;
          currentDuplicates[i].pokemonType = pokemonType;
          this.pokemonArr.push(currentDuplicates[i]);
        });
      //   this._http
      //     .get<any>(tempUrl + currentDuplicates[i].pokemonId + "/")
      //     .subscribe(data => {
      //       spriteURL = data.sprites.front_default;
      //       pokemonType = data.types[0].type.name;
      //       //console.log("URL ", spriteURL);
      //       //console.log(collection[i]);
      //       currentDuplicates[i].URL = spriteURL;
      //       currentDuplicates[i].pokemonType = pokemonType;
      //       this.pokemonArr.push(currentDuplicates[i]);
      //       //console.log(collection);
      //       //console.log(this.pokemonArr[5]);
      //     });
      console.log(currentDuplicates[i]);
    }
  }

  onRedeemSubmit() {
    //Get User Id
    let currentUser = JSON.parse(localStorage.getItem("currentUser"));
    let userId = currentUser.userId;
    console.log("userId: ", userId);
    //Get Pokemon ID
    console.log("pokemoniD: ", this.pokemonModel.pokemonId);
    localStorage.setItem("redeemTicket", JSON.stringify(this.pokemonModel));

    this._userService.redeemPokemonById().subscribe(data => {
      console.log(data);
    });
  }

  onBuyAll() {
    this._userService.redeemAll().subscribe(data => console.log(data));
  }
}
