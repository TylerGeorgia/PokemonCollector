import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { User } from "src/app/user";
import { LoginService } from "src/app/service/login.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  userModel = new User("", "");

  constructor(private _loginService: LoginService) {}

  ngOnInit() {}

  onSubmit() {
    console.log(this.userModel);
    this._loginService
      .login(this.userModel)
      .subscribe(
        data => console.log("Success!", data),
        error => console.error("Error", error)
      );
  }

  // private loginUrl = "http://localhost:8080/PokemonCollector/login";

  // onSubmit() {
  //   // this.clickMessage = "Hi, how are ya.";
  //   // console.log(this.clickMessage);
  //   let postData = new FormData();
  //   postData.append("USERNAME", "TEMP");
  //   postData.append("PASSWORD", "pass");

  //   this.http.post(this.loginUrl, postData).subscribe(
  //     data => {},
  //     err => {
  //       console.log("Error: " + err.error);
  //     }
  //   );
  // }
}
