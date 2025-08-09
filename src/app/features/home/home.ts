import { Component, inject } from '@angular/core';
import { AuthService } from '../../core/services';
import { BoatsService } from '../../core/services/boats.service';
import { BoatsList } from '../../shared/components';

@Component({
  selector: 'app-home',
  imports: [BoatsList],
  templateUrl: './home.html',
  styleUrl: './home.css'
})

export class Home {

}
