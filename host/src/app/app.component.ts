import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {MenuBarComponent} from "./menu-bar/menu-bar.component";
import { SheetComponent } from "./shared/components/sheet/sheet.component";
import { sheetAnimation } from "../animations";
import { NgIf } from "@angular/common";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    standalone: true,
    imports: [MenuBarComponent, RouterOutlet, SheetComponent, NgIf],
    animations: [sheetAnimation]
})
export class AppComponent {
}
