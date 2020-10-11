import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';
import { switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { Crisis } from '../crisis'
import { CrisisService } from '../crisis.service'


@Component({
  selector: 'app-crisis-detail',
  templateUrl: './crisis-detail.component.html',
  styleUrls: ['./crisis-detail.component.css']
})
export class CrisisDetailComponent implements OnInit {
  crisis$: Observable<Crisis>;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private crisisService: CrisisService,
    private location: Location
  ) { }

  ngOnInit(): void {
    //this.getHero();
    this.crisis$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
        this.crisisService.getCrisis(+params.get('id')))
    );
  }

  save(): void {
    // this.heroService.updateHero(this.hero)
    //   .subscribe(() => this.goBack());
  }

  gotoHeroes(crisis: Crisis) {
    const crisisId = crisis ? crisis.id : null;
    
    //this.router.navigate(['/crises', { id: crisisId, foo: 'foo' }]);
    this.router.navigate(['../', { id: crisisId, foo: 'foo' }], { relativeTo: this.route });
  }
}
