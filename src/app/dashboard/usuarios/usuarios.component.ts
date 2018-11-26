import { Component, OnInit } from '@angular/core';
declare var M: any;

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: []
})
export class UsuariosComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    M.Tooltip.init(document.querySelectorAll('.tooltipped'));
  }

}
