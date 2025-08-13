import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ErrorModalService {
    visible$ = new BehaviorSubject(false);
    message$ = new BehaviorSubject('An unexpected error occurred.');

    show(message?: string) {
        if (message) this.message$.next(message);
        this.visible$.next(true);
    }

    hide() {
        this.visible$.next(false);
    }
}
