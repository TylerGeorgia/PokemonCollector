import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Component({
  selector: "app-full-collection-view",
  templateUrl: "./full-collection-view.component.html",
  styleUrls: ["./full-collection-view.component.css"]
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
export class FullCollectionViewComponent implements OnInit {
  something = "asdadadadad";
  pokemonName: string;
  pokemonURL: string;
  pokemonArr: any[] = new Array();

  constructor(private _http: HttpClient) {}

  ngOnInit() {
    //Create a local varaible to store first part of the pokeAPI URL.
    var tempUrl = "https://pokeapi.co/api/v2/pokemon/";
    // Store the localStorage object into a  local variable.
    var collection = JSON.parse(localStorage.getItem("currentCollection"));

    // //Loop through the collection object and push to the pokemonArray.
    for (let i = 0; i < collection.length; i++) {
      //Add properties for URL and PokemonType to the collection.
      var spriteURL = "";
      var pokeTYPE = "";
      //Call the PokeAPI for pokemon Info
      this._http
        .get<any>(tempUrl + collection[i].pokemonId + "/")
        .subscribe(data => {
          //Store URL of image in local varaible
          spriteURL = data.sprites.front_default;
          //Store type of pokemon in local variable.
          pokeTYPE = data.types[0].type.name;
          //Add a property to the collection object for URL
          collection[i].URL = spriteURL;
          //ADD a property to the collection object for the Type.
          collection[i].pokemonType = pokeTYPE;
          console.log(collection);
          //console.log("PokemonArray", this.pokemonArr);
          //Push new collection object to pokemonArr proeprty.
          this.pokemonArr.push(collection[i]);
          // console.log("PokemonArray: ", this.pokemonArr);
        });
    }
  }
}
