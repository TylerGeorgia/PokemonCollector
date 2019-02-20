import { Component, OnInit } from "@angular/core";
import { UserService } from "src/app/service/user.service";
import { HttpClient } from "@angular/common/http";
@Component({
  selector: "app-collection-preview",
  templateUrl: "./collection-preview.component.html",
  styleUrls: ["./collection-preview.component.css"]
})
export class CollectionPreviewComponent implements OnInit {
  pokemonArr: any[] = new Array();

  constructor(private _userService: UserService, private _http: HttpClient) {}

  ngOnInit() {
    var pokeID;
    var tempUrl = "https://pokeapi.co/api/v2/pokemon/";

    // this._userService.getAllPokemon().subscribe(data => {
    //   localStorage.setItem("shop", JSON.stringify(data));
    // });

    // this._userService.getUserCollection().subscribe(data => {
    //   //console.log(data);
    //   //console.log(data.ownedPokemon);
    //   localStorage.setItem(
    //     "currentCollection",
    //     JSON.stringify(data.ownedPokemon)
    //   );
    // });

    //Get local storage object.
    var currentCollection = JSON.parse(
      localStorage.getItem("currentCollection")
    );
    console.log("currentCollection: ", currentCollection);

    let maxLength = currentCollection.length;
    console.log("maxLength: ", maxLength);
    //Generate Three random numbers.
    var randomThree = new Array();
    for (let i = 0; i < 3; i++) {
      randomThree.push(currentCollection[this.randomNumber(maxLength)]);
    }
    console.log("randomThree: ", randomThree);

    //Grab three random entries from current collection
    for (let i = 0; i < randomThree.length; i++) {
      //Add properties for URL and PokemonType to the collection.
      var spriteURL = "";
      var pokeTYPE = "";
      //Call the PokeAPI for pokemon Info
      this._http
        .get<any>(tempUrl + randomThree[i].pokemonId + "/")
        .subscribe(data => {
          //Store URL of image in local varaible
          spriteURL = data.sprites.front_default;
          //Store type of pokemon in local variable.
          pokeTYPE = data.types[0].type.name;
          //Add a property to the collection object for URL
          randomThree[i].URL = spriteURL;
          //ADD a property to the collection object for the Type.
          randomThree[i].pokemonType = pokeTYPE;
          console.log(randomThree);
          //console.log("PokemonArray", this.pokemonArr);
          //Push new collection object to pokemonArr proeprty.
          this.pokemonArr.push(randomThree[i]);
          // console.log("PokemonArray: ", this.pokemonArr);
        });
    }
  }

  randomNumber(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }
}
