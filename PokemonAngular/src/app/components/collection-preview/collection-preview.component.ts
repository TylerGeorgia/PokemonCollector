import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
@Component({
  selector: "app-collection-preview",
  templateUrl: "./collection-preview.component.html",
  styleUrls: ["./collection-preview.component.css"]
})
export class CollectionPreviewComponent implements OnInit {
  constructor(private http: HttpClient) {}
  private url = "https://pokeapi.co/api/v2/pokemon/1/";
  ngOnInit() {
    // let obs = this.http.get(this.url);
    // obs.subscribe(response =>
    //  console.log(response));
  }
}
