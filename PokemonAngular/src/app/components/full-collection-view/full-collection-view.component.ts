import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
@Component({
  selector: "app-full-collection-view",
  templateUrl: "./full-collection-view.component.html",
  styleUrls: ["./full-collection-view.component.css"]
})
export class FullCollectionViewComponent implements OnInit {
  something = "asdadadadad";
  pokemonName: string;
  pokemonURL: string;
  pokemonArr: any[] = new Array();

  constructor(private _http: HttpClient, private _router: Router) {}

  ngOnInit() {
    let authToken = JSON.parse(localStorage.getItem("authToken"));
    console.log("auth token", authToken);
    if (authToken == null) {
      console.log("inside of auth case");
      this._router.navigate(["/landing"]);
    } else {
      console.log("LOgged in");
    }
    //Create a local varaible to store first part of the pokeAPI URL.
    var tempUrl = "https://pokeapi.co/api/v2/pokemon/";
    // Store the localStorage object into a  local variable.

    let tempCollection = JSON.parse(localStorage.getItem("currentCollection"));
    console.log("tempCollection from local storage", tempCollection);

    var collection = tempCollection.ownedPokemon;
    console.log(
      "collection in full collection component: ",
      tempCollection.ownedPokemon
    );
    // //Loop through the collection object and push to the pokemonArray.
    for (let i = 0; i < tempCollection.length; i++) {
      console.log("are we in here??", tempCollection);
      //Add properties for URL and PokemonType to the collection.
      var spriteURL = "";
      var pokeTYPE = "";
      //Call the PokeAPI for pokemon Info
      this._http
        .get<any>(tempUrl + tempCollection[i].pokemonId + "/")
        .subscribe(data => {
          //Store URL of image in local varaible
          spriteURL = data.sprites.front_default;
          //Store type of pokemon in local variable.
          pokeTYPE = data.types[0].type.name;
          //Add a property to the collection object for URL
          tempCollection[i].URL = spriteURL;
          //ADD a property to the collection object for the Type.
          tempCollection[i].pokemonType = pokeTYPE;

          //console.log("PokemonArray", this.pokemonArr);
          //Push new collection object to pokemonArr proeprty.
          this.pokemonArr.push(tempCollection[i]);
          // console.log("PokemonArray: ", this.pokemonArr);
        });
    }
  }
}
