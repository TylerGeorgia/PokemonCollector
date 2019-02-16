import { Component } from "@angular/core";
import { User } from "./user";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  //Options binded to the dropdown in the form.
  topics = ["Angular", "React", "Vue"];
  //Create instance of the User class.
  userModel = new User(
    "",
    "rob@test.com",
    5556665566,
    "Angular",
    "morning",
    true
  );
}
