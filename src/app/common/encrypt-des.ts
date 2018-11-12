/*
 * @Author: qiuz
 * @Date: 2018-06-19 11:16:40
 * */

import * as CryptoJS from 'crypto-js';

const MD5 = 'ab712c32fb3a85f35b4abb1b1ee17a94';
const DES_KEY = '50GAF4D9';
const DES_IV = 'AB2CAD24';

// 业务加密
export const DES = data => {
  return encryptByDES(JSON.stringify(data), DES_KEY, DES_IV);
};

// 业务解密
export const SED = desString => {
  const data = JSON.parse(decryptByDESModeEBC(desString, DES_KEY, DES_IV));
  return data;
};

// 请求加密
export const HttpDES = jsonData => {
  const sign = md5Encode(jsonData + MD5);
  return encryptByDES(JSON.stringify({ jsonData, sign }), DES_KEY, DES_IV);
};


// des加密
export const encryptByDES = function (message, key, iv) {
  // 把私钥转换成16进制的字符串
  const keyHex = CryptoJS.enc.Utf8.parse(key);
  const ivHex = CryptoJS.enc.Utf8.parse(iv);
  // 模式为ECB padding为Pkcs7
  // TripleDES
  const encrypted = CryptoJS.DES.encrypt(message, keyHex, {
    iv: ivHex,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7
  });
  // 加密出来是一个16进制的字符串
  return encrypted.toString();
};
// 解密
export const decryptByDESModeEBC = function (ciphertexat: string, key, iv) {
  // 把私钥转换成16进制的字符串
  const keyHex = CryptoJS.enc.Utf8.parse(key);
  const ivHex = CryptoJS.enc.Utf8.parse(iv);
  // 把需要解密的数据从16进制字符串转换成字符byte数组
  const decrypted = CryptoJS.DES.decrypt(
    // @ts-ignore
    {
      ciphertext: CryptoJS.enc.Base64.parse(ciphertexat)
    },
    keyHex,
    {
      iv: ivHex,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7
    }
  );
  // 以utf-8的形式输出解密过后内容
  const result_value = decrypted.toString(CryptoJS.enc.Utf8);
  return result_value;
};
// 这个默认是32位的
export const md5Encode = function (str) {
  return CryptoJS.MD5(str).toString();
};
