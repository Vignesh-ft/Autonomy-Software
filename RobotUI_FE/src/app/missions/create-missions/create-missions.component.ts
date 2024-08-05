import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-create-missions',
  templateUrl: './create-missions.component.html',
  styleUrl: './create-missions.component.css'
})
export class CreateMissionsComponent {
  idParam:any
  nameParam:any

  constructor(private route: ActivatedRoute, private router:Router) { }
  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.idParam = params['id'];
      this.nameParam = params['name'];

      console.log(this.idParam, this.nameParam);
    });

    this.fetchDetails(this.idParam, this.nameParam);
  }

  fetchDetails(id: any, name:any){
    console.log([id,name])  //Do your API req and Store response in an variable
  }
}
