import { Component, OnInit } from "@angular/core";
import { User } from "src/app/user";
import { UserService } from "src/app/service/user.service";
import { Router } from "@angular/router";
import { CurrentSessionService } from "src/app/service/current-session.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  userModel = new User("", "");
  // activeUser: User;
  // activeUserModel = new User("hello", "password");

  constructor(
    private _router: Router,
    private _userService: UserService,
    private _currentSession: CurrentSessionService
  ) {}

  ngOnInit() {
    console.log("LocalStorage: Start of Login Comp", localStorage);
  }

  //onSubmit Method for submission of the login form.
  onSubmit() {
    this._userService.login(this.userModel).subscribe(
      data => {
        console.log("Success!", data);

        if (data == null) {
          console.log("invalid login");
          




        } else {
          console.log("data ", data);
          console.log(data.username);

          localStorage.setItem("currentUser", JSON.stringify(data));
          sessionStorage.setItem("score", data.score);
          localStorage.setItem("authToken", JSON.stringify(true));
          //Check Local Storage
          //console.log("LocalStorage after set currentCollection", localStorage);
          //Route to new userHome
          this._router.navigate(["/userhome"]);
          //return (this.activeUserModel = data);
        }
      },
      error => {
        console.log("Error", error);
      }
    );
  }
}
