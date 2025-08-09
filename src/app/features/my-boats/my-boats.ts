import { Component } from '@angular/core';
import { BoatsList, Reviews } from '../../shared/components';

@Component({
  selector: 'app-my-boats',
  imports: [BoatsList, Reviews],
  templateUrl: './my-boats.html',
  styleUrl: './my-boats.css'
})
export class MyBoats {

}
