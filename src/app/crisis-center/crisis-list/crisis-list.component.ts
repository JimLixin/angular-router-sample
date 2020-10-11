import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { Crisis } from '../crisis'
import { CRISES } from '../mock-crises'
import { CrisisService } from '../crisis.service'
import { MessageService } from '../../message.service';

@Component({
  selector: 'app-crisis-list',
  templateUrl: './crisis-list.component.html',
  styleUrls: ['./crisis-list.component.css']
})
export class CrisisListComponent implements OnInit {
  crises: Crisis[];
  crises$: Observable<Crisis[]>;
  selectedId: number;

  constructor(
    private crisisService: CrisisService, 
    private messageService: MessageService,
    private route: ActivatedRoute
    ) { }

  getHeroes(): void{
    this.crisisService.getCrises().subscribe(crises => this.crises = crises);
  };

  ngOnInit(): void {

    this.crises$ = this.route.paramMap.pipe(
      switchMap(params => {
        // (+) before `params.get()` turns the string into a number
        this.selectedId = +params.get('id');
        return this.crisisService.getCrises();
      })
    );
  }

  add(crisis: Crisis): void{}

  delete(): void{}
}
