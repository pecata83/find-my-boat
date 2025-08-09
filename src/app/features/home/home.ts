import { Component, inject } from '@angular/core';
import { AuthService } from '../../core/services';
import { BoatsService } from '../../core/services/boats.service';
import { BoatsList, Reviews } from '../../shared/components';

@Component({
  selector: 'app-home',
  imports: [BoatsList, Reviews],
  templateUrl: './home.html',
  styleUrl: './home.css'
})

export class Home {

}
