import {Component, Input} from '@angular/core';
import {Component as ComponentTODO} from "../../../../shared/model/domain/component";

@Component({
  selector: 'app-components-table',
  templateUrl: './components-table.component.html',
  styleUrls: ['./components-table.component.css']
})
export class ComponentsTableComponent {

  @Input()
  components: ComponentTODO[]

  constructor() { }

}
