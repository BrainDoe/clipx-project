import { Router } from '@angular/router';
import { ClipService } from './../../services/clip.service';
import { Validators, FormGroup } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { Component, OnDestroy } from '@angular/core';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/compat/storage';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';
import { v4 as uuid } from 'uuid';
import { last, switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnDestroy {
  isDragover = false;
  file: File | null = null;
  formVisible = false;
  task?: AngularFireUploadTask

  // Firebase properties
  user: firebase.User | null = null;

  // Alert Properties
  showAlert = false;
  alertColor = 'blue';
  alertMsg = 'Please wait! Your clip is being uplaoded...';
  inSubmission = false;
  
  percentage = 0;
  showPercentage = false;

  constructor(private fireStorage: AngularFireStorage, private auth: AngularFireAuth, private clipService: ClipService, private router: Router) { auth.user.subscribe(user => this.user = user) }

  ngOnDestroy(): void {
    this.task?.cancel(); // Ensures that the request is cancelled when the component is distroyed or rather when the user navigate to another page.
  }

  title = new FormControl('', [
    Validators.required, Validators.minLength(3)
  ]);

  uploadForm = new FormGroup({
    title: this.title
  })

  storeFile(event: Event) {
    this.isDragover = false;

    this.file = (event as DragEvent).dataTransfer ? 
    (event as DragEvent).dataTransfer?.files.item(0) ?? null : (event.target as HTMLInputElement).files?.item(0) ?? null // Nullish Coelescence operator can intercept undefined values

    if(!this.file || this.file.type !== 'video/mp4') {
      return
    }

    this.title.setValue(this.file.name.replace(/\.[^/.]+$/, ''));

    this.formVisible = true;
  }

  uploadFile() {
    this.uploadForm.disable();

    // Alert Properties
    this.showAlert = true;
    this.alertColor = 'blue';
    this.alertMsg = 'Please wait! Your clip is being uplaoded...';
    this.inSubmission = true;
    this.showPercentage = true;

    const clipFileName = uuid();
    const clipPath = `clipx/${clipFileName}.mp4`;

    this.task = this.fireStorage.upload(clipPath, this.file);
    // Video reference
    const clipRef = this.fireStorage.ref(clipPath);

    this.task.percentageChanges().subscribe(progress => {
      this.percentage = progress as number / 100;
    });

    this.task.snapshotChanges().pipe(
      last(),
      switchMap(() => clipRef.getDownloadURL())
    ).subscribe({
      next: async (url) => {
        const clip = {
          uid: this.user?.uid as string,
          displayName: this.user?.displayName as string,
          title: this.title.value,
          fileName: `${clipFileName}.mp4`,
          url,
          timestamp: firebase.firestore.FieldValue.serverTimestamp()
        };

        const clipDocRef = await this.clipService.createClip(clip);

        // console.log(clip);

        this.alertColor = 'green';
        this.alertMsg = 'Success! Your clip has been uploaded!';
        this.showPercentage = false;

        setTimeout(() => {
          this.router.navigate([
            'clip', clipDocRef.id
          ])
        }, 100);
      },
      error: (error) => {
        this.uploadForm.enable();
        this.alertColor = 'red';
        this.alertMsg = 'Upload failed! Please try again!';
        this.inSubmission = true;
        this.showPercentage = false;
      }
    });
  }

}
