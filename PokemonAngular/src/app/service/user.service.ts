import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { User } from "src/app/user";
import { RegisterUser } from "../models/register-user";
import { HttpParams } from "@angular/common/http";
@Injectable({
  providedIn: "root"
})
export class UserService {
  constructor(private _http: HttpClient) {}

  currentUser = JSON.parse(localStorage.getItem("currentUser"));

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
  //URL endpoint for shop getALl
  _shopUrl = "http://localhost:8080/PokemonCollector/shop";

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
    var currentUser = JSON.parse(localStorage.getItem("currentUser"));
    var userID: string;
    userID = currentUser.userId;
    let params = new HttpParams().set("USERID", userID);
    return this._http.get<any>(this._generateUrl, { params });
  }
  //Method call for GET request for retieving the active users collection.
  getUserCollection() {
    // console.log(this.currentUser);
    // console.log(this._userCollectionUrl);
    var currentUser = JSON.parse(localStorage.getItem("currentUser"));
    var userID: string;
    userID = currentUser.userId;
    let params = new HttpParams().set("USERID", userID);
    return this._http.get<any>(this._userCollectionUrl, { params });
  }

  //Method call for POST request for login.
  login(user: User) {
    return this._http.post<any>(this._loginUrl, user);
  }

  //Method cal for GET to get all pokemon for the shop.
  getAllPokemon() {
    return this._http.get<any>(this._shopUrl);
  }
}
