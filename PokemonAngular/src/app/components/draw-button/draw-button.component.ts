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
  pokemonName: string = "";
  pokemonType: string = "";
  pokemonURL: string = "";
  cardShow: boolean = false;
  constructor(private _userService: UserService, private _http: HttpClient) {}

  ngOnInit() {}

  onClickMe() {
    //add d-none class to id of generate-pokemon-pokeball
    //Remove d-none from id of pokemon-card-name
    if (this.cardShow) {
      $("#generate-pokemon-pokeball").removeClass("d-none");
      $("#generate-pokemon-card").addClass("d-none");
      $("#generate-pokemon-draw-btn").addClass("d-none");
    }
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

        //tempPokemon.URL = spriteURL;
        //tempPokemon.pokemonType = pokeTYPE;

        this.pokemonName = tempPokemon.pokemonName;
        this.pokemonType = pokeTYPE;
        this.pokemonURL = spriteURL;

        //this.pokemonArr.push(tempPokemon);
      });
    });
  }

  onBallClick() {
    //Hide pokeball img and show card div
    $("#generate-pokemon-pokeball").addClass("d-none");
    $("#generate-pokemon-card").removeClass("d-none");
    $("#generate-pokemon-draw-btn").removeClass("d-none");
    this.cardShow = true;
  }
}
