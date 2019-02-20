import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { UserService } from "src/app/service/user.service";
@Component({
  selector: "app-draw-button",
  templateUrl: "./draw-button.component.html",
  styleUrls: ["./draw-button.component.css"]
})
export class DrawButtonComponent implements OnInit {
  pokemonArr: any[] = new Array();
  constructor(private _userService: UserService, private _http: HttpClient) {}

  ngOnInit() {}

  onClickMe() {
    //Create a local varaible to store first part of the pokeAPI URL.
    var tempUrl = "https://pokeapi.co/api/v2/pokemon/";

    this._userService.generatePokemon().subscribe(data => {
      //console.log(data);
      let tempPokemon = data;
      console.log(tempPokemon);
      var spriteURL = "";
      var pokeTYPE = "";
      //Get info from pokeAPI
      this._http.get<any>(tempUrl + tempPokemon.pokemonId).subscribe(data => {
        spriteURL = data.sprites.front_default;
        pokeTYPE = data.types[0].type.name;

        tempPokemon.URL = spriteURL;
        tempPokemon.pokemonType = pokeTYPE;

        this.pokemonArr.push(tempPokemon);
      });
    });
  }
}
