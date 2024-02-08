import { Component, signal } from '@angular/core';
import { Contacto } from '../../model/contacto';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';


@Component({
  selector: 'app-agenda',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './agenda.component.html',
  styleUrl: './agenda.component.css'
})
export class AgendaComponent {

  listContact = signal<Contacto[]>([]);

  telefonoControlador = new FormControl('', {
    nonNullable: true,
    validators: [
      Validators.pattern(/^[0-9]{9}$/),
      Validators.required
    ]
  });

  nombreControlador = new FormControl('', {
    nonNullable: true,
    validators: [
      Validators.minLength(2),
      Validators.required
    ]
  });

  // checkForm() {
  //   if(this.telefonoControlador.valid && this.nombreControlador.valid) {
  //     this.addContacto();
  //     return true
  //   }else {
  //     return false
  //   }
  // }

  addContacto() {
    if (this.telefonoControlador.valid && this.nombreControlador.valid) {

      this.listContact.update(contacto => [...contacto, {
        id: Date.now(),
        nombre: this.nombreControlador.value,
        telefono: this.telefonoControlador.value
      }])
      return true
    }else{
     return false
    }
  }

  borrarContacto(contacto: Contacto) {
    this.listContact.update(contactos => contactos.filter(c => c.id !== contacto.id))
  }

  modificarContacto(contacto: Contacto) {
    this.listContact.update((cs) => {
      return cs.map(c => {
        if (contacto.id === c.id) {
          return {
            ...c,
            nombre: this.nombreControlador.value,
            telefono: this.telefonoControlador.value
          }
        }
        return {
          ...c
        }
      });
    });
  }
    
  

  borrarAgenda() {
    this.listContact.set([])
  }
}
