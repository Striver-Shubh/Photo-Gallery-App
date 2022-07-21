import { Component } from '@angular/core';
import { Camera } from '@awesome-cordova-plugins/camera/ngx';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page {
  clickedImage;
  constructor(private camera: Camera) {}
  takePicture() {
    this.camera
      .getPicture({
        quality: 100,
        destinationType: this.camera.DestinationType.DATA_URL,
        encodingType: this.camera.EncodingType.JPEG,
        mediaType: this.camera.MediaType.PICTURE,
        sourceType: this.camera.PictureSourceType.CAMERA,
      })
      .then((res) => {
        this.clickedImage = 'data:image/jpeg;base64,' + res;
      })
      .catch((e) => console.log(e));
  }
  savedPicture() {
    this.camera
      .getPicture({
        sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
        destinationType: this.camera.DestinationType.DATA_URL,
      })
      .then((res) => {
        this.clickedImage = 'data:image/jpeg;base64,' + res;
      })
      .catch((e) => console.log(e));
  }
  // startCamera() {
  //   this.clickedImage = this.takePicture.takePicture();
  //   console.log(this.clickedImage);
  // }
}
