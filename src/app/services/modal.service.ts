import { Injectable } from '@angular/core';

interface IModal {
  id: string;
  visible: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  private modals: IModal[] = [];

  constructor() { }

  register(id: string) {
    this.modals.push({
      id,
      visible: false
    })
    // console.log(this.modals);
  }

  unregister(id: string) {
    this.modals = this.modals.filter(element => element.id !== id)
  }

  isModalOpen(id: string): boolean {
    return !!this.modals.find(element => element.id === id)?.visible; // Double negation converts a non-bolean value to boolean
    // Does the same job as the upper line. Return boolean value
    // return Boolean(this.modals.find(element => element.id === id)?.visible);
  }

  toggleModal(id: string) {
    const modal = this.modals.find(element => element.id === id);
    console.log(modal);
    if(modal) {
      modal.visible = !modal.visible;
    }
    // this.visible = !this.visible;
  }
}
