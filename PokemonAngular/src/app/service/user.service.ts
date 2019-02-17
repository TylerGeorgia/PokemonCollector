import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { User } from "src/app/user";
import { RegisterUser } from "../models/register-user";
@Injectable({
  providedIn: "root"
})
export class UserService {
  constructor(private _http: HttpClient) {}
  //URL endpoint for getting all users to for the leaderboard.
  _leaderUrl = "http://localhost:8080/PokemonCollector/leader";
  //URL endpoint for registering a new user.
  _createUrl = "http://localhost:8080/PokemonCollector/create";
  //URL endpoint for generating a new pokemon.
  _generateUrl = "http://localhost:8080/PokemonCollector/generate";
  //URL endpoint for getting active users collection.
  _userCollectionUrl = "http://localhost:8080/PokemonCollector/collection";
  //URL endpoint for user login.
  _loginUrl = "http://localhost:8080/PokemonCollector/login";

  //Method call for GET request for leaderboard users.
  getLeaderboard() {
    return this._http.get<any>(this._leaderUrl);
  }
  //Method call fo POST request for registering a new user.
  createUser(newUser: RegisterUser) {
    return this._http.post<any>(this._createUrl, newUser);
  }
  //Method call for GET request for generating a new pokemon.
  generatePokemon() {
    return this._http.get<any>(this._generateUrl);
  }
  //Method call for GET request for retieving the active users collection.
  getUserCollection() {
    return this._http.get<any>(this._userCollectionUrl);
  }

  //Method call for POST request for login.
  login(user: User) {
    return this._http.post<any>(this._loginUrl, user);
  }
}
