import { Validators, FormGroup } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { v4 as uuid } from 'uuid';
import { last } from 'rxjs/operators';


@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {
  isDragover = false;
  file: File | null = null;
  formVisible = false;

  // Alert Properties
  showAlert = false;
  alertColor = 'blue';
  alertMsg = 'Please wait! Your clip is being uplaoded...';
  inSubmission = false;
  
  percentage = 0;
  showPercentage = false;

  constructor(private fireStorage: AngularFireStorage) { }

  ngOnInit(): void {
  }

  title = new FormControl('', [
    Validators.required, Validators.minLength(3)
  ]);

  uploadForm = new FormGroup({
    title: this.title
  })

  storeFile(event: Event) {
    this.isDragover = false;

    this.file = (event as DragEvent).dataTransfer?.files.item(0) ?? null // Nullish Coelescence operator can intercept undefined values

    if(!this.file || this.file.type !== 'video/mp4') {
      return
    }

    this.title.setValue(this.file.name.replace(/\.[^/.]+$/, ''));

    this.formVisible = true;
  }

  uploadFile() {
    // Alert Properties
    this.showAlert = true;
    this.alertColor = 'blue';
    this.alertMsg = 'Please wait! Your clip is being uplaoded...';
    this.inSubmission = true;
    this.showPercentage = true;

    const clipFileName = uuid();
    const clipPath = `clipx/${clipFileName}.mp4`;

    const task = this.fireStorage.upload(clipPath, this.file);
    task.percentageChanges().subscribe(progress => {
      this.percentage = progress as number / 100;
    });

    task.snapshotChanges().pipe(
      last()
    ).subscribe({
      next: (snapshot) => {
        this.alertColor = 'green';
        this.alertMsg = 'Success! Your clip has been uploaded!';
        this.showPercentage = false;
      },
      error: (error) => {
        this.alertColor = 'red';
        this.alertMsg = 'Upload failed! Please try again!';
        this.inSubmission = true;
        this.showPercentage = true;
        console.error(error);
      }
    });
  }

}
