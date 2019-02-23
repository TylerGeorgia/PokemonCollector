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
  pokemonCount: number = 0;
  //Properties
  username: string = "";
  credit: number = 0;
  score: number = 0;
  constructor(
    private _http: HttpClient,
    private _userService: UserService,
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
    //Setup User Duplicates
    var currentUser = JSON.parse(localStorage.getItem("currentUser"));

    this.userModel.userId = currentUser.userId;
    console.log("User Model", this.userModel);
    this._userService.getUserDuplicates(this.userModel).subscribe(data => {
      localStorage.setItem("userDuplicates", JSON.stringify(data));
      //console.log("data in userHomePage", data);
      //Create URL front for pokeAPI.
      var tempUrl = "https://pokeapi.co/api/v2/pokemon/";
      var spriteURL = "";
      var pokemonType = "";
      var currentDuplicates = data;
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

        console.log(" dupes count ", currentDuplicates[i]);
        this.pokemonCount = currentDuplicates[i].count - 1;
        // console.log(currentDuplicates[i].count);
        // console.log(this.pokemonCount);
      }
    });

    //////////////////////////////////////////////////////////////////////////////////////
    let tempScore = JSON.parse(sessionStorage.getItem("score"));
    console.log("tempScore: ", tempScore);
    //Get Active User from local storage.
    var currentUser = JSON.parse(localStorage.getItem("currentUser"));

    //Set local variables for currentUser.
    var userName = currentUser.username;
    var credit = currentUser.credit;
    //var score = currentUser.score;
    var currentScore = JSON.parse(localStorage.getItem("currentScore"));
    var score = currentUser.score;

    //Bind active user info to properties.
    //Bind username
    this.username = userName;
    //Bind Credit Amount
    this.credit = credit;
    this.score = score;
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
      //console.log("data.owner from redeem", data.owner.credit);
      this.credit = data.owner.credit;
      localStorage.setItem("currentUser", JSON.stringify(data.owner));
      localStorage.setItem("userDuplicates", JSON.stringify(data.ownedPokemon));
      location.reload(true);
    });
  }

  onBuyAll() {
    this._userService.redeemAll().subscribe(data => {
      console.log("Inside buy all", data);
      this.credit = data;
      location.reload(true);
      //localStorage.setItem("currentUser", JSON.stringify(data.owner));
    });
  }

  //Method call for onLogout click event.
  onLogout() {
    //Clears local storage of user object.
    localStorage.clear();
    //Route back to landing page.
    this._router.navigate(["/landing"]);
  }
}
