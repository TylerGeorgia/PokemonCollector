import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
@Injectable({
  providedIn: "root"
})
export class UserService {
  constructor(private _http: HttpClient) {}

  _leaderUrl = "http://localhost:8080/PokemonCollector/leader";

  getLeaderboard() {
    return this._http.get<any>(this._leaderUrl);
  }
}
