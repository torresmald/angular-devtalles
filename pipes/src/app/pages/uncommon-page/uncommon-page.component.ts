import { Component, signal } from '@angular/core';
import { CardComponentComponent } from '../../components/card-component/card-component.component';
import { I18nPluralPipe, I18nSelectPipe } from '@angular/common';

interface Client {
  name: string;
  adddress: string;
  gender: 'male' | 'female';
}

@Component({
  selector: 'app-uncommon-page',
  imports: [CardComponentComponent, I18nSelectPipe, I18nPluralPipe],
  templateUrl: './uncommon-page.component.html',
  styles: ``,
})
export default class UncommonPageComponent {
  public client1: Client = {
    name: 'Jonathan',
    adddress: 'XDX',
    gender: 'male',
  };

  public client2: Client = {
    name: 'Sara',
    adddress: 'XDX',
    gender: 'female',
  };

  public welcomeMap = {
    male: 'Bienvenido',
    female: 'Bienvenida',
  };

  public client = signal(this.client1);
  public clients = signal(['Pepe', 'Maria', 'Juan', 'Rosa']);

  public messageMapping: { [k: string]: string } = {
    '=0': 'clientes',
    '=1': 'cliente',
    other: 'clientes',
  };

  public changeClient() {
    if (this.client().gender === 'female') {
      this.client.set(this.client1);
      return;
    }
    this.client.set(this.client2);
  }

  public deleteClient() {
    if (this.clients().length === 0) {
      this.clients.set(['Pepe', 'Maria', 'Juan', 'Rosa']);
      return
    }
    this.clients.set(this.clients().slice(1));
  }
}
