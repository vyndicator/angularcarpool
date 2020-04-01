import { Component, OnInit } from '@angular/core';
import { AppRoutingModule } from '../app-routing.module';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.css']
})
export class TopbarComponent implements OnInit {

  constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
      iconRegistry.addSvgIcon(
      'calendar',
      sanitizer.bypassSecurityTrustResourceUrl('/assets/img/date_range-24px.svg'));
      iconRegistry.addSvgIcon(
        'home',
        sanitizer.bypassSecurityTrustResourceUrl('/assets/img/assessment-24px.svg'));
   }
   

  ngOnInit(): void {
    imports: [
      AppRoutingModule
    ]
  }

}
