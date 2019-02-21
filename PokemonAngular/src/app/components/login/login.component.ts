import { Component, OnInit } from "@angular/core";
import { User } from "src/app/user";
import { UserService } from "src/app/service/user.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  userModel = new User("", "");
  // activeUser: User;
  // activeUserModel = new User("hello", "password");

  constructor(private _router: Router, private _userService: UserService) {}

  ngOnInit() {}
  //onSubmit Method for submission of the login form.
  onSubmit() {
    this._userService.login(this.userModel).subscribe(
      data => {
        console.log("Success!", data);
        if (data == null) {
          console.log("invalid login");
        } else {
          //Store Active User as Local Storage Object

          localStorage.setItem("currentUser", JSON.stringify(data));
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
