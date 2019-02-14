import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  constructor(private http: HttpClient) {}

  ngOnInit() {}
  private loginUrl = "http://localhost:8080/PokemonCollector/login";

  onSubmit() {
    // this.clickMessage = "Hi, how are ya.";
    // console.log(this.clickMessage);
    let postData = new FormData();
    postData.append("user", "login");
    postData.append("password", "pass");

    this.http.post(this.loginUrl, postData).subscribe(
      data => {},
      err => {
        console.log("Error: " + err.error);
      }
    );
  }
}
