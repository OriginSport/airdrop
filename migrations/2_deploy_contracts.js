// var Token = artifacts.require("MyToken");
var AirDrop = artifacts.require("AirDrop");

module.exports = function(deployer) {
  // deployer.deploy(Token);
  deployer.deploy(AirDrop);
};