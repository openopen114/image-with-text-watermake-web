import { Component, ElementRef, ViewChild } from '@angular/core';
import {
  Camera,
  CameraResultType,
  CameraSource,
  CameraDirection,
} from '@capacitor/camera';
import { defineCustomElements } from '@ionic/pwa-elements/loader';
import { compressBase64Image } from './Utils/CompressImage.js';
import html2canvas from 'html2canvas';

import * as htmlToImage from 'html-to-image';
import { toPng, toJpeg, toBlob, toPixelData, toSvg } from 'html-to-image';

import download from 'downloadjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  @ViewChild('screen') screen: ElementRef;
  @ViewChild('canvas') canvas: ElementRef;
  @ViewChild('downloadLink') downloadLink: ElementRef;

  title = 'image-with-text-watermake-web';

  workerImage: string;

  /**
   *
   * 拍照
   *
   *
   */
  async takePicture(_sourceType: string) {
    // await this.defineCustomElementsPromise();
    const image = await Camera.getPhoto({
      quality: 68,
      allowEditing: true,
      height: 1500,
      width: 1500,
      resultType: CameraResultType.DataUrl,
      direction: CameraDirection.Rear,
      source: CameraSource.Camera,
    });

    // this.workerImage = image.dataUrl;
    this.workerImage = await compressBase64Image(
      image.dataUrl,
      0.68,
      image.format
    );

    // this.workerImage = `data:image/${image.format};base64,${image.base64String}`;
  }

  /**
   *
   * 下載
   *
   *
   */
  downloadImage() {
    console.log('downloadImage');

    const captureElement: HTMLElement = document.querySelector('#capture');

    htmlToImage.toPng(captureElement).then(function (dataUrl) {
      download(dataUrl, 'my-node.png');
    });

    /*
    // Select the element that you want to capture
    const captureElement: HTMLElement = document.querySelector('#capture');

    // Call the html2canvas function and pass the element as an argument
    html2canvas(captureElement).then((canvas) => {
      // Get the image data as a base64-encoded string
      const imageData = canvas.toDataURL('image/png');

      // Do something with the image data, such as saving it as a file or sending it to a server
      // For example, you can create an anchor element and trigger a download action
      const link = document.createElement('a');
      link.setAttribute('download', 'screenshot.png');
      link.setAttribute('href', imageData);
      link.click();
    });
    */
  }
}
