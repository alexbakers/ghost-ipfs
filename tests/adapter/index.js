'use strict';

const path = require('path');

describe('IPFSAdapter', function () {
    for (const f of ['save']) {
        require(path.join(__dirname, f));
    }
});