import { Component, ElementRef, OnInit } from '@angular/core';
import {
  Camera,
  CameraResultType,
  CameraSource,
  CameraDirection,
} from '@capacitor/camera';
import { compressBase64Image } from './Utils/CompressImage.js';
import * as htmlToImage from 'html-to-image';
import download from 'downloadjs';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  workerImage: string;
  validateForm!: UntypedFormGroup;

  constructor(private fb: UntypedFormBuilder) {}

  watermakrTextArr = ['', ''];

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      text1: [null],
      text2: [null],
    });
  }

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
  }

  submitForm(): void {
    console.log('submit', this.validateForm.value);

    const { text1, text2 } = this.validateForm.value;

    this.watermakrTextArr = [text1, text2];
  }
}
