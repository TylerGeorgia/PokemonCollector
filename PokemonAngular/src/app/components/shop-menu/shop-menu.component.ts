import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { UserService } from "src/app/service/user.service";
import { PokemonObject } from "src/app/models/pokemon-object";

@Component({
  selector: "app-shop-menu",
  templateUrl: "./shop-menu.component.html",
  styleUrls: ["./shop-menu.component.css"]
  // template: `
  //   <div class="container">
  //     <div class="row">
  //       <div class="col">
  //         <div id="card-gallery-grid">
  //           <div class="pokemon-card-outer" *ngFor="let pokemon of pokemonArr">
  //             <h1>{{ pokemon.pokemonName }}</h1>
  //             <img src="{{ pokemon.URL }}" />
  //             <h5>{{ pokemon.pokemonType }}</h5>
  //           </div>
  //         </div>
  //       </div>
  //     </div>
  //   </div>
  // `
})
export class ShopMenuComponent implements OnInit {
  pokemonModel = new PokemonObject("");
  pokeID: string = "";
  pokemonArr: any[] = new Array();
  constructor(private _http: HttpClient, private _userService: UserService) {}

  ngOnInit() {
    //Create URL front for pokeAPI.
    var tempUrl = "https://pokeapi.co/api/v2/pokemon/";
    // Store the localStorage object into a  local variable.
    var shopCollection = JSON.parse(localStorage.getItem("shop"));
    //console.log(shopCollection.length);
    var spriteURL = "";
    var pokemonType = "";
    for (let i = 0; i < shopCollection.length; i++) {
      //Call PokeAPI for every item in collection.
      this._http
        .get<any>(tempUrl + shopCollection[i].pokemonId + "/")
        .subscribe(data => {
          spriteURL = data.sprites.front_default;
          pokemonType = data.types[0].type.name;
          //console.log("URL ", spriteURL);
          //console.log(collection[i]);
          shopCollection[i].URL = spriteURL;
          shopCollection[i].pokemonType = pokemonType;
          this.pokemonArr.push(shopCollection[i]);
          //console.log(collection);
          console.log(this.pokemonArr[5]);
        });
    }
  }

  onBuyClick() {
    //Get User Id
    let currentUser = JSON.parse(localStorage.getItem("currentUser"));
    console.log("currentUser: ", currentUser);
    //Get Pokemon ID
    console.log(event.returnValue);
    //Send Post to redeem with both
  }
}
