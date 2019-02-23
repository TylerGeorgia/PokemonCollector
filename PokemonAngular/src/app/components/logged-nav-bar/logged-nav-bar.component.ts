import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { CurrentSessionService } from "src/app/service/current-session.service";
@Component({
  selector: "app-logged-nav-bar",
  templateUrl: "./logged-nav-bar.component.html",
  styleUrls: ["./logged-nav-bar.component.css"]
})
export class LoggedNavBarComponent implements OnInit {
  //Properties
  username: string = "";
  credit: number = 0;
  score: number = 0;

  constructor(
    private _router: Router,
    private _currentSession: CurrentSessionService
  ) {}

  ngOnInit() {
    let tempScore = JSON.parse(sessionStorage.getItem("score"));
    console.log("tempScore: ", tempScore);
    //Get Active User from local storage.
    var currentUser = JSON.parse(localStorage.getItem("currentUser"));

    //Set local variables for currentUser.
    var userName = currentUser.username;
    var credit = currentUser.credit;
    //var score = currentUser.score;
    var currentScore = JSON.parse(localStorage.getItem("currentScore"));
    var score = currentUser.score;

    //Bind active user info to properties.
    //Bind username
    this.username = userName;
    //Bind Credit Amount
    this.credit = credit;
    this.score = score;
  }

  setScore(newScore: number) {
    console.log(
      "Inside of setScore Method from LoggedNavBarComponent, Value of newScore : ",
      newScore
    );
    this.score = newScore;

    console.log(
      "After setting this.score to value of paramater passed this.score : ",
      this.score
    );
  }
  //Method call for onLogout click event.
  onLogout() {
    //Clears local storage of user object.
    localStorage.clear();
    //Route back to landing page.
    this._router.navigate(["/landing"]);
  }
}
