"use strict";

/*
 * IPFS storage adapter for Ghost.
 *
 * @author : Alex Baker <alex.baker.fon@gmail.com>
 * @updated : 24th Dec 2022
 */

require("dotenv").config();

const StorageBase = require("ghost-storage-base");
const fs = require("fs");
const ipfs = require("ipfs-storage");

class IPFSAdapter extends StorageBase {
  constructor(options) {
    super(options);

    const { defaultStorage } = options;

    this.defaultStorage = defaultStorage || "";
    this.config = options[defaultStorage] || {};

    if (!Object.keys(this.config).length) {
      if (this.defaultStorage === "filebase") {
        this.config.key = process.env.FILEBASE_KEY;
        this.config.secret = process.env.FILEBASE_SECRET;
        this.config.bucket = process.env.FILEBASE_BUCKET;
      } else if (this.defaultStorage === "pinata") {
        this.config.jwt = process.env.PINATA_JWT;
      } else if (this.defaultStorage === "fleek") {
        this.config.key = process.env.FLEEK_KEY;
        this.config.secret = process.env.FLEEK_SECRET;
        this.config.bucket = process.env.FLEEK_BUCKET;
      } else if (this.defaultStorage === "web3") {
        this.config.token = process.env.WEB3_TOKEN;
      }
    }
  }

  /**
   * Checks for existance of file (handle 404's proper).
   *
   * @param fileName
   * @param targetDir
   * @returns Promise<boolean>
   */
  exists(fileName, targetDir) {
    return Promise.resolve(true);
  }

  /**
   * Saves the image to IPFS storage (Filebase, Pinata, Fleek, Web3, etc).
   *
   * @param image - is the express image object
   * @returns Promise.<string> - a promise which ultimately returns the
   * full url to the uploaded image
   */
  save(image) {
    return new Promise(async (resolve, reject) => {
      try {
        fs.readFile(image.path, async (err, data) => {
          if (err) {
            return reject(err);
          }
          const url = await ipfs.uploadFile[this.defaultStorage](this.config, {
            hash: image.name,
            ext: "",
            buffer: data,
          });
          resolve(url);
        });
      } catch (e) {
        reject(e);
      }
    });
  }

  /**
   * Ghost calls `.serve()` as part of its middleware stack,
   * and mounts the returned function as the middleware for serving images.
   *
   * @returns Handler
   */
  serve() {
    return (req, res, next) => {
      next();
    };
  }

  /**
   * @param fileName
   * @returns Promise<boolean>
   */
  delete(fileName) {
    return new Promise(async (resolve, reject) => {
      try {
        await ipfs.deleteFile[this.defaultStorage](this.config, fileName);
        resolve(true);
      } catch (e) {
        reject(e);
      }
    });
  }

  /**
   * @returns Promise<Buffer>
   */
  read() {}
}

module.exports = IPFSAdapter;
