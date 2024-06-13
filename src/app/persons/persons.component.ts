import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { PersonsService } from './persons.service';

@Component({
  selector: 'app-persons',
  templateUrl: './persons.component.html',
})
export class PersonsComponent implements OnInit, OnDestroy {
  personList: string[];
  private personListSubs: Subscription;

  constructor(private prsService: PersonsService) {}

  ngOnInit(): void {
    this.personListSubs = this.prsService.personsChanged.subscribe(
      (persons) => {
        this.personList = persons;
      }
    );
    this.prsService.fetchPersons();
  }

  onRemovePerson(personName: string): void {
    this.prsService.removePerson(personName);
  }

  ngOnDestroy() {
    this.personListSubs.unsubscribe();
  }
}
