import { HardhatUserConfig } from "hardhat/config";

//import "@xyrusworx/hardhat-solidity-json";
import "../src";
import "@typechain/hardhat";

const config: HardhatUserConfig = {
  solidity: "0.8.6",
  networks: {
    hardhat: {},
  }
};

// noinspection JSUnusedGlobalSymbols
export default config;
