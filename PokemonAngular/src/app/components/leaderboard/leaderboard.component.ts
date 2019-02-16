import { Component, OnInit } from "@angular/core";
import { UserService } from "src/app/service/user.service";

@Component({
  selector: "app-leaderboard",
  templateUrl: "./leaderboard.component.html",
  styleUrls: ["./leaderboard.component.css"]
})
export class LeaderboardComponent implements OnInit {
  //Sets URL to get leader board information.
  //private localURL = "http://localhost:8080/PokemonCollector/leader";
  //Add instance of HttpClient to the constructor.
  leaderBoardObj = {};
  leaderboard = [];
  username: string;
  credit: number;
  score: number;
  constructor(private UserService: UserService) {}

  ngOnInit() {
    let currentLeaderBoard = [];
    this.leaderBoardObj = this.UserService.getLeaderboard().subscribe(
      data => (console.log(data), (currentLeaderBoard = data))
    );
    console.log(this.leaderboard);
    console.log(this.leaderboard);
  }
}
