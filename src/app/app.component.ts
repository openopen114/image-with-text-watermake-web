import { Component, OnInit } from '@angular/core';
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
  // 拍攝的相片
  cppatureImage: string;

  // 是否顯示設定 drawer
  isShowSettingDrawer = false;

  // 浮水印文字 1
  text1: string = '';

  // 浮水印文字 1
  text2: string = '';

  // 浮水印文字 for watermakr dom display
  watermakrTextArr = [this.text1, this.text2];

  constructor(private fb: UntypedFormBuilder) {}

  ngOnInit(): void {}

  /**
   *
   * 拍照
   *
   *
   */
  async takePicture(_sourceType: string) {
    console.log('拍照');
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

    // 更新圖片
    this.cppatureImage = await compressBase64Image(
      image.dataUrl,
      0.68,
      image.format
    );

    // 更新浮水印文字
    this.watermakrTextArr = [this.text1, this.text2];

    // 關閉設定drawer
    this.showSettingDrawer(false);
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

  /**
   *
   * 顯示/關閉 設定 Drawer
   *
   *
   */

  showSettingDrawer(isOpen: boolean): void {
    this.isShowSettingDrawer = isOpen;
  }
}
