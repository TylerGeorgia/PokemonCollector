import { Component, OnInit } from "@angular/core";
import { UserService } from "src/app/service/user.service";
import { HttpClient } from "@angular/common/http";
@Component({
  selector: "app-collection-preview",
  templateUrl: "./collection-preview.component.html",
  styleUrls: ["./collection-preview.component.css"]
})
export class CollectionPreviewComponent implements OnInit {
  pokeOneName;
  pokeOneId;
  pokeOneType;

  pokeTwoName;
  pokeTwoId;
  pokeTwoType;

  pokeThreeName;
  pokeThreeId;
  pokeThreeType;

  constructor(private _userService: UserService, private _http: HttpClient) {}

  ngOnInit() {
    var pokeID;
    var tempUrl = "https://pokeapi.co/api/v2/pokemon/";

    //Get active users collection.

    this._userService.getUserCollection().subscribe(data => {
      console.log(data);
      console.log(data.ownedPokemon);
      localStorage.setItem(
        "currentCollection",
        JSON.stringify(data.ownedPokemon)
      );
      console.log(localStorage.getItem("currentCollection"));
      // console.log(data.ownedPokemon[0]);
      // console.log(data.ownedPokemon[0].pokemonName);

      var pokeOneName = data.ownedPokemon[0].pokemonName;
      this.pokeOneName = pokeOneName;
      var pokeOneId = data.ownedPokemon[0].pokemonId;
      this.pokeOneId = pokeOneId;

      //Get image from pokeAPI
      pokeID = pokeOneId;
      this._http.get<any>(tempUrl + pokeOneId + "/").subscribe(data => {
        console.log(data);
        var pokeOneType = data.types[0].type.name;
        this.pokeOneType = pokeOneType;

        $("#previewOne").append(
          '<img class="card-img-top pokeImgPreview" src="' +
            data.sprites.front_default +
            '"><div class="card-body"><p class="card-title">' +
            pokeOneName +
            '</p><p class="card-text"> Type: ' +
            pokeOneType +
            " </p> </div>"
        );
      });

      var pokeTwoName = data.ownedPokemon[1].pokemonName;
      this.pokeTwoName = pokeTwoName;
      var pokeTwoId = data.ownedPokemon[1].pokemonId;
      this.pokeTwoId = data.ownedPokemon[1].pokemonId;

      this._http.get<any>(tempUrl + pokeTwoId + "/").subscribe(data => {
        console.log(data);
        var pokeTwoType = data.types[0].type.name;
        this.pokeTwoType = pokeTwoType;

        $("#previewTwo").append(
          '<img class="card-img-top" src="' +
            data.sprites.front_default +
            '"><div class="card-body card-body-poke"><p class="card-title">' +
            pokeTwoName +
            '</p><p class="card-text"> Type: ' +
            pokeTwoType +
            " </p> </div>"
        );
      });

      var pokeThreeName = data.ownedPokemon[2].pokemonName;
      this.pokeThreeName = pokeThreeName;
      var pokeThreeId = data.ownedPokemon[2].pokemonId;
      this.pokeThreeId = data.ownedPokemon[2].pokemonId;

      this._http.get<any>(tempUrl + pokeThreeId + "/").subscribe(data => {
        console.log(data);
        var pokeThreeType = data.types[0].type.name;
        this.pokeThreeType = pokeThreeType;

        $("#previewThree").append(
          '<img class="card-img-top" src="' +
            data.sprites.front_default +
            '"><div class="card-body"><p class="card-title">' +
            pokeThreeName +
            '</p><p class="card-text"> Type: ' +
            pokeThreeType +
            " </p> </div>"
        );
      });
    });
  }
}
