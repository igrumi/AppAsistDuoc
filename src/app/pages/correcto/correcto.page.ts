import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-correcto',
  templateUrl: './correcto.page.html',
  styleUrls: ['./correcto.page.scss'],
})
export class CorrectoPage implements OnInit {
  clave: string;
  constructor(private readonly activeroute: ActivatedRoute,
    private readonly router: Router) { }

  ngOnInit() {
    this.activeroute.queryParams.subscribe(() => {     
      this.clave = this.router.getCurrentNavigation().extras.state.clave;
    });
  }

}
