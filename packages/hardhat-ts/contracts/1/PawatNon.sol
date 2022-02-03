pragma solidity >=0.8.0 <0.9.0;

//SPDX-License-Identifier: MIT

contract PawatNon {
  string public name = 'P';

  constructor() {
    // what should we do on deploy?
  }

  function setName(string memory newPurpose) public {
    name = newPurpose;
  }
}
