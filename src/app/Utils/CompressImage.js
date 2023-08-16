import { compress } from "squoosh-compress";

import * as moment from "moment";

/**
 *
 * 壓縮圖片  by squoosh-compress
 *
 *
 */
const compressBase64Image = async (
  _base64Str,
  _quality,
  _fileType,
  _fileName = "T" + moment().valueOf()
) => {
  // base64 轉 File
  const imageFile = await data64ToFile(_base64Str);

  //壓縮圖片
  const compressImageFile = await compress(
    imageFile,
    {
      type: _fileType === "png" ? "browser-png" : "browser-jpeg",
      options: {
        quality: _quality,
      },
    },
    _fileName
  );

  // file to base64
  const imageBase64 = await fileToBase64(compressImageFile);
  return imageBase64;
};

/**
 *
 * base64 轉 File
 *
 *
 */

const data64ToFile = async (_base64, _fileName) => {
  const res = await fetch(_base64);
  const blob = await res.blob();
  return new File([blob], _fileName, { type: "image/png" });
};

/**
 *
 * file 轉 base64
 *
 *
 */
const fileToBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

export { compressBase64Image, data64ToFile, fileToBase64 };
