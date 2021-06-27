import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Slimmemeter';
  isDarkTheme: boolean = false;
  isChecked = false;


  ngOnInit()
  {
    this.isDarkTheme = localStorage.getItem('theme') === "Dark" ? true:false
  }

  storeThemeSelection()
  {
    localStorage.setItem('theme', this.isDarkTheme ? "Dark" : "Light")
  }
}
