import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalComponent } from './components/modal/modal.component';
import { TabsContainerComponent } from './tabs-container/tabs-container.component';
import { TabsComponent } from './tabs/tabs.component';



@NgModule({
  declarations: [
    ModalComponent,
    TabsContainerComponent,
    TabsComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [ModalComponent, TabsContainerComponent, TabsComponent]
})
export class SharedModule { }
