import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Component({
  selector: "app-draw-button",
  templateUrl: "./draw-button.component.html",
  styleUrls: ["./draw-button.component.css"]
})
export class DrawButtonComponent implements OnInit {
  clickMessage = "";

  private url = "https://pokeapi.co/api/v2/pokemon/1/";
  private localURL = "http://localhost:8080/PokemonCollector/leader";
  constructor(private http: HttpClient) {}

  ngOnInit() {}

  onClickMe() {
    // this.clickMessage = "Hi, how are ya.";
    // console.log(this.clickMessage);
    let obs = this.http.get(this.url);
    obs.subscribe(response => console.log(response));
  }
}
