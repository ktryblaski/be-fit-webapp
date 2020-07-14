import {Component, OnInit} from '@angular/core';
import {ComponentsListService} from "./components-list.service";
import {Observable} from "rxjs";
import {Component as ComponentTODO} from "../../../shared/model/domain/component";

// TODO
@Component({
  selector: 'app-components-list',
  templateUrl: './components-list.component.html',
  styleUrls: ['./components-list.component.css'],
  providers: [ComponentsListService]
})
export class ComponentsListComponent implements OnInit {

  public components$: Observable<ComponentTODO[]>;
  public loaded$: Observable<boolean>;
  public loading$: Observable<boolean>;

  constructor(private service: ComponentsListService) { }

  ngOnInit(): void {
    this.components$ = this.service.components$;
    this.loaded$ = this.service.loaded$;
    this.loading$ = this.service.loading$;

    this.service.load();
  }

}
