import { ClipService } from './../../services/clip.service';
import { Validators, FormControl, FormGroup } from '@angular/forms';
import IClip from 'src/app/models/clip.model';
import { ModalService } from 'src/app/services/modal.service';
import { Component, OnInit, OnDestroy, Input, OnChanges, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit, OnDestroy, OnChanges {
  @Input() activeClip: IClip | null = null;
  @Output() update = new EventEmitter();

  showAlert = false;
  alertColor = 'blue';
  alertMsg = 'Please wait! Your edited clip is been uploaded...';
  inSubmission = false;

  constructor(
    private modalService: ModalService,
    private clipService: ClipService) { }

  clipID = new FormControl('');
  title = new FormControl('', [
    Validators.required, Validators.minLength(3)
  ])
  editForm = new FormGroup({
    title: this.title,
    clipID: this.clipID
  })

  ngOnInit(): void {
    this.modalService.register('editClip');
  }

  ngOnChanges(): void {
    if(!this.activeClip) {
      return
    }

    this.inSubmission = false;
    this.showAlert = false;
    this.clipID.setValue(this.activeClip.docID);
    this.title.setValue(this.activeClip.title);
  }

  ngOnDestroy(): void {
    this.modalService.unregister('editClip');
  }

  async submit() {
    if(!this.activeClip) {
      return
    }

    this.inSubmission = true;
    this.showAlert = true;
    this.alertColor = 'blue',
    this.alertMsg = 'Please wait! Updating clip...'

    try {
      console.log(this.clipID.value);
      await this.clipService.updateClip(this.title.value, this.clipID.value)

    } catch (error) {
      this.inSubmission = false;
      this.showAlert = false;
      this.alertColor = 'red';
      this.alertMsg = 'Something went wrong. Your clip was not updated. Please try again later.'
      console.log(error);
      return
    }

    this.activeClip.title = this.title as unknown as string
    this.update.emit(this.activeClip);

    this.inSubmission = false;
    this.alertColor = 'green';
    this.alertMsg = 'Success!';
  }

}
