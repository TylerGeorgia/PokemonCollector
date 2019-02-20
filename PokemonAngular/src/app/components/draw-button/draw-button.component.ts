import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { UserService } from "src/app/service/user.service";
@Component({
  selector: "app-draw-button",
  templateUrl: "./draw-button.component.html",
  styleUrls: ["./draw-button.component.css"]
})
export class DrawButtonComponent implements OnInit {
  clickMessage = "";

  private localURL = "http://localhost:8080/PokemonCollector/generate";
  private myJSON;
  private url = "https://pokeapi.co/api/v2/pokemon/1/";
  constructor(private _userService: UserService, private _http: HttpClient) {}

  ngOnInit() {
    //By making the get request here in the on init() we can assign the value from the observable to our local class variable and the access those values in someother event aka on the button click.
    //let obs = this.http.get<any>(this.localURL);
    //obs.subscribe(response => (this.myJSON = response));
  }

  onClickMe() {
    this._userService.generatePokemon().subscribe(data => console.log(data));
    //Some testing stuff
    // this.clickMessage = "Hi, how are ya.";
    // console.log(this.clickMessage);
    //Any HttpClient request should be done in a service then used with DependencyInjection this could be the solution to this problem.
    //Set an observable to the result of the http.get request on the url
    //let obs = this.http.get<any>(this.localURL);
    //Assign the one time observable response to a property of the class.
    //obs.subscribe(response => (this.myJSON = response));
    //WE could log the response itself instead of assigning it to a variable in our class and see the successful JSON is returned we just cannot access it.
    //obs.subscribe(response => console.log(response.types[0].type.name));
    //obs.subscribe(response => console.log(response.name));
    //This doesnt work for some reason did work in landingpage with json from our database.
    //obs.subscribe(response => response.name);
    // console.log(obs);
    // console.log(obs.subscribe);
    //This next log statement wont work because it has yet to be defined as a JSON object.
    //console.log(this.myJSON);
    //These will work only if the initial setup of the getRequest and assignment of our local JSON object is in a different block. EX: in the init method.
    //console.log(this.myJSON.name);
    //console.log(this.myJSON.types[0].type.name);
  }
}
