import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { UserService } from "src/app/service/user.service";
import { PokemonObject } from "src/app/models/pokemon-object";
import { RedeemUser } from "src/app/models/redeem-user";
import { RedeemTicket } from "src/app/models/redeem-ticket";
import { Router } from "@angular/router";
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
  pokemonName: string = "";
  pokemonType: string = "";
  pokemonURL: string = "";
  constructor(
    private _http: HttpClient,
    private _userService: UserService,
    private _router: Router
  ) {
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

    //Create URL front for pokeAPI.
    var tempUrl = "https://pokeapi.co/api/v2/pokemon/";
    var spriteURL = "";
    var pokemonType = "";
    //Loop through current duplicates and generate form elements
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

      console.log(currentDuplicates[i]);
    }
    // var currentUser = JSON.parse(localStorage.getItem("currentUser"));
    // var tempDuplicateArray = new Array();
    // this.userModel.userId = currentUser.userId;
    // this._userService.getUserDuplicates(this.userModel).subscribe(data => {
    //   console.log("data from get userDuplicates", data);
    //   // // //Create URL front for pokeAPI.
    //   var tempUrl = "https://pokeapi.co/api/v2/pokemon/";
    //   var spriteURL = "";
    //   var pokemonType = "";
    //   // //Loop through current duplicates and generate form elements
    //   for (let i = 0; i < data.length; i++) {
    //     //   //Call PokeAPI for every item in collection.
    //     this._http
    //       .get<any>(tempUrl + data[i].pokemonId + "/")
    //       .subscribe(data => {
    //         console.log(data);
    //         spriteURL = data.sprites.front_default;
    //         pokemonType = data.types[0].type.name;
    //         tempDuplicateArray[i].URL = spriteURL;
    //         tempDuplicateArray[i].pokemonType = pokemonType;
    //         this.pokemonArr.push(tempDuplicateArray[i]);
    //       });
    //   }
    // });
  }

  onRedeemSubmit() {
    //Get User Id
    let currentUser = JSON.parse(localStorage.getItem("currentUser"));
    let userId = currentUser.userId;
    //console.log("userId: ", userId);
    //Get Pokemon ID
    console.log("pokemoniD: ", this.pokemonModel.pokemonId);
    localStorage.setItem("redeemTicket", JSON.stringify(this.pokemonModel));
    var tempUrl = "https://pokeapi.co/api/v2/pokemon/";
    let redeemPokemonID = this.pokemonModel.pokemonId;
    this._http.get<any>(tempUrl + redeemPokemonID + "/").subscribe(data => {
      console.log(
        "Response from PokeApi request for pokemon getting redeemed: ",
        data
      );
      this.pokemonName = data.name;
      this.pokemonType = data.types[0].type.name;
      this.pokemonURL = data.sprites.front_default;
    });

    this._userService.redeemPokemonById().subscribe(data => {
      localStorage.setItem("currentUser", JSON.stringify(data.owner));
      localStorage.setItem("userDuplicates", JSON.stringify(data.ownedPokemon));
    });
  }

  onBuyAll() {
    this._userService.redeemAll().subscribe(data => {
      console.log("Inside buy all", data);
      //localStorage.setItem("currentUser", JSON.stringify(data.owner));
    });
  }
}
