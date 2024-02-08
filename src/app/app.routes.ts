import { Routes } from '@angular/router';
import { AgendaComponent } from './pages/agenda/agenda.component';

export const routes: Routes = [
    { path: '', component: AgendaComponent },
    { path: 'agenda', component: AgendaComponent }
];
