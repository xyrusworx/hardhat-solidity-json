import {task} from "hardhat/config";
import fs from "fs";
import path from "path";

async function makeDirIfNotExists(directory) {
    await new Promise<void>((resolve) => {
        fs.access(directory, function(err) {
            if (err && err.code === 'ENOENT') {
                fs.mkdirSync(directory, {recursive: true});
            }
            resolve();
        });
    })
}

// noinspection JSUnusedGlobalSymbols
export default task("solidity-json", "Extract Standard Solidity Input JSON", async (taskArgs, hre) => {
    const names = await hre.artifacts.getAllFullyQualifiedNames();
    const baseDir = "./artifacts/solidity-json";

    const handled = [];

    for (const name of names) {

        const [fileName] = name.split(':');

        // skip, if non-local file
        if (!fs.existsSync(path.join("./", fileName))) {
            continue;
        }

        // only one output per file
        if (handled.find(x => x === fileName)) {
            continue;
        }
        handled.push(fileName);

        const buildInfo = await hre.artifacts.getBuildInfo(name);
        const artifactStdJson = JSON.stringify(buildInfo.input,null, 4);

        const fullFileName = path.join(baseDir, fileName + ".json");
        const directoryName = path.dirname(fullFileName);

        console.log("> Extracting standard Solidity Input JSON for", fileName);

        await makeDirIfNotExists(directoryName);
        fs.writeFileSync(fullFileName, artifactStdJson);
    }
});
