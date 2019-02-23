import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-player-preview",
  templateUrl: "./player-preview.component.html",
  styleUrls: ["./player-preview.component.css"]
})
export class PlayerPreviewComponent implements OnInit {
  constructor() {}

  myData: Array<Array<any>>;
  ngOnInit() {
    this.myData = [
      ["London", 8136000],
      ["New York", 8538000],
      ["Paris", 2244000],
      ["Berlin", 3470000],
      ["Kairo", 19500000]
    ];
  }
}
