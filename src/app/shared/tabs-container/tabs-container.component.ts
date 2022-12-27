import { TabsComponent } from './../tabs/tabs.component';
import { Component, AfterContentInit, ContentChildren, QueryList, Input } from '@angular/core';

@Component({
  selector: 'app-tabs-container',
  templateUrl: './tabs-container.component.html',
  styleUrls: ['./tabs-container.component.css']
})
export class TabsContainerComponent implements AfterContentInit {
  @ContentChildren(TabsComponent) tabs: QueryList<TabsComponent> = new QueryList();
  // @Input() active = false;

  constructor() { }

  ngAfterContentInit(): void {
    const activeTab = this.tabs?.filter((tab: any) => tab.active);

    if(!activeTab  || activeTab.length === 0) {
      this.selectTab(this.tabs!.first);
    }
  }

  selectTab(tab: TabsComponent) {
    this.tabs?.forEach((t: any) => {
      t.active = false
    });

    tab.active = true

    return false; // Prevent the default behaviour of clicking an a tag. The hash tag will be removed from the url.
  }

}
