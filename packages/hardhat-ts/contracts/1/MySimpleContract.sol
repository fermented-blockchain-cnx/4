pragma solidity >=0.8.0 <0.9.0;

//SPDX-License-Identifier: MIT

contract MySimpleContract {
  string public name;

  constructor(string memory _name) {
    name = _name;
  }

  function setName(string memory _name) public {
    name = _name;
  }

  function getName() public view returns (string memory) {
    return name;
  }
}
