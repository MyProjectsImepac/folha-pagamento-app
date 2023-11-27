import { Component } from '@angular/core';
import { Cordinator } from '../entities/cordinator';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-cordinator-details',
  templateUrl: './cordinator-details.component.html',
  styleUrls: ['./cordinator-details.component.css']
})

export class CordinatorDetailsComponent {

  cordinator: Cordinator = this.activatedRoute.snapshot.data['cordinator'];

  constructor(private activatedRoute: ActivatedRoute) { }
}
