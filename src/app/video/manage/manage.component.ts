import { ModalService } from 'src/app/services/modal.service';
import { ClipService } from './../../services/clip.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import IClip from 'src/app/models/clip.model';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.css']
})
export class ManageComponent implements OnInit {
  videoOrder = '1';
  clips: IClip[] = [];
  activeClip: IClip | null = null;

  constructor(private router: Router, private route: ActivatedRoute, private clipService: ClipService, private modalService: ModalService) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params: Params) => {
      this.videoOrder = params.sort === '2' ? params.sort : '1';
    });

    this.clipService.getUserClips().subscribe(docs => {
      this.clips = [];

      docs.forEach(doc => {
        this.clips.push({
          docID: doc.id,
          ...doc.data()
        })
      })
    })
  }

  sort(event: Event) {
    const { value } = (event.target as HTMLSelectElement);

    this.router. navigate(['clips', 'a'], { 
      relativeTo: this.route, 
      queryParams: { sort: value }
    });
  }

  openModal(event: Event, clip: IClip) {
    event.preventDefault();

    this.activeClip = clip;

    this.modalService.toggleModal('editClip');
  }

  update($event: IClip) {
    this.clips.forEach((element, index) => {
      if(element.docID == $event.docID) {
        this.clips[index].title = $event.title
      }
    })
  }

  deleteClip($event: Event, clip: IClip) {
    $event.preventDefault();

    
    this.clipService.deleteClip(clip);

    this.clips.forEach((element, index) => {
      if(element.docID == clip.docID) {
        this.clips.splice(index, 1);
      }
    })
  }

}
