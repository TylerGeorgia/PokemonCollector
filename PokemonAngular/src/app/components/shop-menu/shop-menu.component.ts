import { Component, OnInit, Input } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { UserService } from "src/app/service/user.service";
import { PokemonObject } from "src/app/models/pokemon-object";
import { BuyTicket } from "src/app/models/buy-ticket";

@Component({
  selector: "app-shop-menu",
  templateUrl: "./shop-menu.component.html",
  styleUrls: ["./shop-menu.component.css"]
  // template: `
  //   <div id="card-gallery-grid">
  //     <div class="pokemon-card-outer" *ngFor="let pokemon of pokemonArr">
  //       <h4 class="pokemon-card-name">{{ pokemon.pokemonName }}</h4>
  //       <img class="pokemon-card-img" src="{{ pokemon.URL }}" />

  //       <div class="pokemon-card-info-cont">
  //         <div>Type: {{ pokemon.pokemonType }}</div>
  //         <br />
  //         <div>Cost: {{ pokemon.pokemonRarity }}</div>

  //         <button class="shop-buy-btn" (click)="onBuyClick()">
  //           Buy
  //         </button>
  //       </div>
  //     </div>
  //   </div>
  // `
})
export class ShopMenuComponent implements OnInit {
  pokemonModel = new PokemonObject("");
  buyTicketModel = new BuyTicket("", "");
  pokeID: string = "";
  pokemonArr: any[] = new Array();
  @Input()
  _value: number;
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

  // onBuyClick() {
  //   //Get User Id
  //   let currentUser = JSON.parse(localStorage.getItem("currentUser"));
  //   console.log("currentUser: ", currentUser);
  //   //Get Pokemon ID
  //   console.log(this.pokemonModel);
  //   //Send Post to redeem with both
  // }

  onBuySubmit() {
    // console.log(this.pokemonModel);
    //console.log(this.pokemonModel);
    //Get User Id
    let currentUser = JSON.parse(localStorage.getItem("currentUser"));
    let userId = currentUser.userId;

    //Get Pokemon ID
    console.log(this.pokemonModel.pokemonId);
    this.buyTicketModel.POKEID = this.pokemonModel.pokemonId;
    this.buyTicketModel.USERID = currentUser.userId;
    console.log(this.buyTicketModel);
    //console.log(this._userService.buyPokemon(this.buyTicketModel));
    this._userService.buyPokemon(this.buyTicketModel).subscribe(data => {
      console.log(data);
    });
    console.log(this._userService.buyPokemon(this.buyTicketModel));
  }
}
