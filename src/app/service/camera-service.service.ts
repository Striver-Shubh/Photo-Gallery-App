import { Injectable } from '@angular/core';
import { Camera, CameraOptions } from '@awesome-cordova-plugins/camera/ngx';

@Injectable({
  providedIn: 'root',
})
export class CameraServiceService {
  constructor(private camera: Camera) {}

  takePicture(): string {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
    };
    let base64Image;
    this.camera
      .getPicture(options)
      .then((imgData) => {
        base64Image = imgData;
      })
      .catch((err) => (base64Image = 'camera issue: ' + err));
    return base64Image;
  }
}
