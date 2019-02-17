import { Component, OnInit } from "@angular/core";
import { UserService } from "src/app/service/user.service";

@Component({
  selector: "app-leaderboard",
  templateUrl: "./leaderboard.component.html",
  styleUrls: ["./leaderboard.component.css"]
})
export class LeaderboardComponent implements OnInit {
  constructor(private _userService: UserService) {}

  ngOnInit() {
    this._userService.getLeaderboard().subscribe(data => {
      console.log(data);
      for (var i = 0; i < data.length; i++) {
        console.log(data[i]);
        $("#leaderboardTable")
          .find("tbody")
          .append(
            "<tr><td>" +
              data[i].score +
              "</td><td>" +
              data[i].username +
              "</td></tr>"
          );
      }
    });
  }
}
