import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {
  nombre: string;
  email: string;
  clave: string;
  claveConfirmada: string;
  localidad: string;

  constructor() { }

  register() {
    
  }

  ngOnInit(): void {
  }

}
