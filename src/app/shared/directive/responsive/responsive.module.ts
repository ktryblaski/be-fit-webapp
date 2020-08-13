import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ForMobileDirective} from "./for-mobile.directive";
import {ForLandscapeMobileDirective} from "./for-landscape-mobile.directive";
import {ForDesktopDirective} from "./for-desktop.directive";
import {ForMediaDirective} from "./for-media.directive";
import {ClassForMediaDirective} from "./class-for-media.directive";

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    ForMobileDirective,
    ForLandscapeMobileDirective,
    ForDesktopDirective,
    ForMediaDirective,
    ClassForMediaDirective,
  ],
  exports: [
    ForMobileDirective,
    ForLandscapeMobileDirective,
    ForDesktopDirective,
    ForMediaDirective,
    ClassForMediaDirective,
  ]
})
export class ResponsiveModule { }
