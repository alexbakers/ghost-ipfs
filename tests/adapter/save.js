"use strict";

const { expect } = require("chai"),
  { join } = require("path"),
  IPFSAdapter = require(join(__dirname, "../../"));

let ipfsAdapter = null;

describe("save", function () {
  before(function () {
    ipfsAdapter = new IPFSAdapter({
      defaultStorage: "web3",
    });
  });

  it("should upload successfully", function (done) {
    this.timeout(10000);
    ipfsAdapter
      .save({
        path: join(__dirname, "../../public/banner.png"),
        name: "banner.png",
      })
      .then((url) => {
        expect(url).to.equals(
          "https://bafkreidpx6pofofnlvw6szrp3mk3qunxvmnauuoaawhlquq2kn3vonc4i4.ipfs.w3s.link"
        );
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  afterEach(function () {
    ipfsAdapter.delete(
      "https://bafkreidpx6pofofnlvw6szrp3mk3qunxvmnauuoaawhlquq2kn3vonc4i4.ipfs.w3s.link"
    );
  });
});
