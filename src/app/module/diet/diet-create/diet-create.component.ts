import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs";
import {Router} from "@angular/router";
import {DietFormHandler} from "../diet-form/diet-form-handler";
import {DietCreateService} from "./diet-create.service";

@Component({
  selector: 'app-diet-create',
  templateUrl: './diet-create.component.html',
  styleUrls: ['./diet-create.component.scss'],
  providers: [DietCreateService]
})
export class DietCreateComponent implements OnInit {

  formHandler: DietFormHandler = new DietFormHandler();

  saving$: Observable<boolean>;

  constructor(private service: DietCreateService,
              private router: Router) { }

  ngOnInit(): void {
    this.saving$ = this.service.saving$;
  }

  handleCreate(): void {
    this.service.save(this.formHandler);
  }

  handleCancel(): void {
    this.router.navigate(['diet']);
  }

}
