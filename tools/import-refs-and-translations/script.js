import {
    dataCrates
} from "../../src/js/cratenames.js"
''
import {
    dataItems
} from "../../src/js/itemnames.js";
import {
    dataEffects
} from "../../src/js/unusualeffects.js";

let vdfFile = [];
let wpFile = [];

// English, Polish, Simplified Chinese, Brazilian Portuguese, French, Czech, Hungarian, Romanian, Swedish, Russian
let translationProperty = ["eng", "pol", "sch", "bra", "fre", "cze", "hun", "rom", "swe", "rus"];
let warPaintString = [" War Paint", " Barwy wojenne", " 战绘", " Tinta de Guerra", " Peinture de guerre", " Válečné maskování", " Harci festés", " Vopsea de război", " Krigsfärg"];

let downloaded = 0;
let downloadedWp = 0;
let ready = 0;

function parseVDF(file, index) {
    let reader = new FileReader();
    reader.onload = function (el) {
        vdfFile[index] = VDF.parse(el.target.result).lang.Tokens;
        downloaded++;
        if (downloaded >= vdfUrlTable.length) {
            ready++;
            if (ready == 2) {
                document.querySelector("#readymsg").innerHTML = "Ready!";
            }
        }
    };
    reader.readAsText(file);
}

function parseWarPaint(file, index) {
    let reader = new FileReader();
    reader.onload = function (el) {
        console.log("checking " + index);
        wpFile[index] = VDF.parse(el.target.result).lang.Tokens;
        downloadedWp++;
        if (downloadedWp >= vdfUrlTable.length) {
            ready++;
            if (ready == 2) {
                document.querySelector("#readymsg").innerHTML = "Ready!";
            }
        }
    };
    reader.readAsText(file);
}

let vdfUrlTable = ["tf_english", "tf_polish", "tf_schinese", "tf_brazilian", "tf_french", "tf_czech", "tf_hungarian", "tf_romanian", "tf_swedish", "tf_russian"];
let wpUrlTable = ["tf_proto_obj_defs_english", "tf_proto_obj_defs_polish", "tf_proto_obj_defs_schinese", "tf_proto_obj_defs_brazilian", "tf_proto_obj_defs_french", "tf_proto_obj_defs_czech", "tf_proto_obj_defs_hungarian", "tf_proto_obj_defs_romanian", "tf_proto_obj_defs_swedish", "tf_proto_obj_defs_russian"];
let loadedOrder = [];
let vdfTable = [];
let wpTable = [];

function fetchVdf(file) {
    console.log(`Fetching ${file}`);
    fetch(`./vdf/${file}.txt`)
        .then(response => response.blob())
        .then((data) => {
            console.log(`Putting ${file}}`);
            parseVDF(data, file);
        })
}

function fetchWp(file) {
    fetch(`./vdf/${file}.txt`)
        .then(response => response.blob())
        .then((data) => {
            parseWarPaint(data,file);
        })
}

vdfUrlTable.forEach((file) => {
    fetchVdf(file);
});

wpUrlTable.forEach((file) => {
    fetchWp(file);
});

document.querySelector("#execute").onclick = () => {
    findTranslations();
}
document.querySelector("#createlist").onclick = () => {
    checkStrings(vdfFile[0]);
    checkWarPaint(wpFile[0]);
}

function checkStrings(contents) {
    let missingStrings = [];
    let crateOutput = "{";
    let itemOutput = "";
    let fxOutput = "";

    for (let vdfKey in contents) {
        if (contents[vdfKey].substring(0, 4).toLowerCase() == "the ") {
            contents[vdfKey] = contents[vdfKey].substring(4);
        }
    }

    // Checking cratenames.js

    for (let crateKey in dataCrates) {
        let crateString = dataCrates[crateKey].eng;
        let vdfStringFound = false;
        for (let vdfKey in contents) {
            let vdfString = contents[vdfKey];
            if (crateString === vdfString) {
                let translatedStringKey = vdfKey.replace("[english]", "");
                crateOutput += `"${translatedStringKey}": "${crateString}",<br>`;
                vdfStringFound = true;
                delete contents[vdfKey];
                delete contents[translatedStringKey];
                break;
            }
        }
        if (!vdfStringFound) {
            missingStrings.push(crateString);
        }
    }
    if (missingStrings.length > 0) {
        crateOutput += `}<h1>MISSING STRINGS</h1> ${missingStrings.join("<br>")}`;
    } else {
        crateOutput += `}<h1>No missing strings</h1>`;
    }
    document.querySelector("#cratenamesoutput").innerHTML += crateOutput;

    // Checking itemnames.js

    missingStrings = [];

    for (let itemKey in dataItems) {
        let itemString = dataItems[itemKey].eng;
        if (itemString.includes(" War Paint")) {
            itemString.replace(" War Paint", "");
        }
        let vdfStringFound = false;
        for (let vdfKey in contents) {
            let vdfString = contents[vdfKey];
            if (itemString === vdfString) {
                let translatedStringKey = vdfKey.replace("[english]", "");
                itemOutput += `"${translatedStringKey}": "${itemString}",<br>`;
                vdfStringFound = true;
                delete contents[vdfKey];
                delete contents[translatedStringKey];
                break;
            }
        }
        if (!vdfStringFound) {
            for (let vdfKey in contents) {
                let vdfString = "The " + contents[vdfKey];
                if (itemString === vdfString) {
                    let translatedStringKey = vdfKey.replace("[english]", "");
                    itemOutput += `"${translatedStringKey}": "${itemString}",<br>`;
                    vdfStringFound = true;
                    delete contents[vdfKey];
                    delete contents[translatedStringKey];
                    break;
                }
            }
        }
        if (!vdfStringFound) {
            missingStrings.push(itemString);
        }
    }
    if (missingStrings.length > 0) {
        itemOutput += `}<h1>MISSING STRINGS</h1> ${missingStrings.join("<br>")}`;
    } else {
        itemOutput += `}<h1>No missing strings</h1>`;
    }
    document.querySelector("#itemnamesoutput").innerHTML += itemOutput;

    // Checking unusualeffects.js

    missingStrings = [];

    for (let fxKey in dataEffects) {
        let fxString = dataEffects[fxKey].eng;
        let vdfStringFound = false;
        for (let vdfKey in contents) {
            let vdfString = contents[vdfKey];
            if (fxString === vdfString) {
                let translatedStringKey = vdfKey.replace("[english]", "");
                fxOutput += `"${translatedStringKey}": "${fxString}",<br>`;
                vdfStringFound = true;
                delete contents[vdfKey];
                delete contents[translatedStringKey];
                break;
            }
        }
        if (!vdfStringFound) {
            missingStrings.push(fxString);
        }
    }
    if (missingStrings.length > 0) {
        fxOutput += `}<h1>MISSING STRINGS</h1> ${missingStrings.join("<br>")}`;
    } else {
        fxOutput += `}<h1>No missing strings</h1>`;
    }
    document.querySelector("#unusualfxoutput").innerHTML += fxOutput;
}

function checkWarPaint(contents) {
    let missingStrings = [];
    let output = "{";

    let warPaintList = [];

    for (let itemKey in dataItems) {
        let itemString = dataItems[itemKey].eng;
        if (itemString.includes("War Paint")) {
            warPaintList.push(itemString.substring(0, itemString.length - 10));
        }
    }
    for (let wp of warPaintList) {
        for (let vdfKey in contents) {
            let vdfString = contents[vdfKey];
            if (wp === vdfString) {
                output += `"${vdfKey}": "${wp} War Paint",<br>`;
            }
        }
    }

    /* for (let crateKey in dataCrates) {
        let crateString = dataCrates[crateKey].eng;
        let vdfStringFound = false;
        for (let vdfKey in contents) {
            let vdfString = contents[vdfKey];
            if (crateString === vdfString) {
                let translatedStringKey = vdfKey.replace("[english]", "");
                crateOutput += `"${translatedStringKey}": "${crateString}",<br>`;
                vdfStringFound = true;
                delete contents[vdfKey];
                delete contents[translatedStringKey];
                break;
            }
        }
        if (!vdfStringFound) {
            missingStrings.push(crateString);
        }
    } */

    if (missingStrings.length > 0) {
        output += `}<h1>MISSING STRINGS</h1> ${missingStrings.join("<br>")}`;
    } else {
        output += `}<h1>No missing strings</h1>`;
    }
    document.querySelector("#warpaintoutput").innerHTML += output;
}

let regexor = /"([0-9]+)":/g;

function parseOutput(input) {
    return input.replaceAll(`"img":`, `img:`)
        .replaceAll(`"eng":`, `eng:`)
        .replaceAll(regexor, "$1:")
        .replaceAll(`"pol":`, `pol:`)
        .replaceAll(`"sch":`, `sch:`)
        .replaceAll(`"fre":`, `fre:`)
        .replaceAll(`\\\\n`, ` `)
        .replaceAll(`\\u0005`, ``)
        .replaceAll(`"spa":`, `spa:`)
        .replaceAll(`"ger":`, `ger:`)
        .replaceAll(`"bra":`, `bra:`)
        .replaceAll(`"cze":`, `cze:`)
        .replaceAll(`"hun":`, `hun:`)
        .replaceAll(`"rom":`, `rom:`)
        .replaceAll(`"swe":`, `swe:`)
        .replaceAll(`"rus":`, `rus:`)
        .replaceAll(`"schema":`, `schema:`)
        .replaceAll(`"schema2":`, `schema2:`);
}

function findTranslations() {
    let missingStringHTMLCrates = [];
    let missingStringHTMLItems = [];
    let missingStringHTMLEffects = [];
    for (let [index, file] of vdfFile.entries()) {
        if (index == 0) {
            return;
        }
        let missingStrings = [];

        for (let crateKey in dataCrates) { // For each crate in dataCrates
            let crateString = dataCrates[crateKey].eng;
            for (let ref in crateRef) { // For each string in crateRef
                if (crateRef[ref] == crateString) {
                    if (file.hasOwnProperty(ref) && dataCrates[crateKey].eng.toLowerCase() != file[ref].toLowerCase()) {
                        dataCrates[crateKey][translationProperty[index]] = file[ref];
                    } else {
                        console.log(`crate hasOwnProperty failed ${translationProperty[index]}`)
                    }
                }
            }
            if (!dataCrates[crateKey].hasOwnProperty(translationProperty[index])) {
                missingStrings.push(crateString);
            }
        };
        missingStringHTMLCrates.push(`<br><h1>MISSING STRINGS ${translationProperty[index]}</h1> ${missingStrings.join("<br>")}<br>`);

        missingStrings = [];

        for (let itemKey in dataItems) { // For each crate in cratename
            if (translationProperty[index] == "rom" || translationProperty[index] == "cze") {
                break;
            }
            if (["770", "452", "764", "765", "766"].includes(itemKey) && dataItems[itemKey][translationProperty[index]] != undefined) {
                console.log(`Skipped ${itemKey} for ${translationProperty[index]}`);
                continue;
            }
            let itemString = dataItems[itemKey].eng;
            for (let ref in itemRef) { // For each string in crateRef
                if (itemRef[ref] == itemString) {
                    if (file.hasOwnProperty(ref) && dataItems[itemKey].eng.toLowerCase() != file[ref].toLowerCase()) {
                        dataItems[itemKey][translationProperty[index]] = file[ref];
                    } else {
                        console.log(`item hasOwnProperty failed for ${translationProperty[index]} ${ref}`)
                    }
                }
            }
            for (let ref in wpRef) {
                if (wpRef[ref] == itemString) {
                    if (wpFile[index].hasOwnProperty(ref)) {
                        dataItems[itemKey][translationProperty[index]] = wpFile[index][ref] + warPaintString[index];
                    } else {
                        console.log(`wp hasOwnProperty failed for ${translationProperty[index]} ${ref}`)
                    }
                }
            }
            if (!dataItems[itemKey].hasOwnProperty(translationProperty[index])) {
                missingStrings.push(itemString);
            }
        };
        missingStringHTMLItems.push(`<br><h1>MISSING STRINGS ${translationProperty[index]}</h1> ${missingStrings.join("<br>")}<br>`);

        missingStrings = [];

        for (let fxKey in dataEffects) { // For each crate in cratename
            let fxString = dataEffects[fxKey].eng;
            for (let ref in fxRef) { // For each string in crateRef
                if (fxRef[ref] == fxString) {
                    if (file.hasOwnProperty(ref) && dataEffects[fxKey].eng.toLowerCase() != file[ref].toLowerCase()) {
                        dataEffects[fxKey][translationProperty[index]] = file[ref];
                    } else {
                        console.log(`fx hasOwnProperty failed ${translationProperty[index]}`)
                    }
                }
            }
            if (!dataEffects[fxKey].hasOwnProperty(translationProperty[index])) {
                missingStrings.push(fxString);
            }
        };
        missingStringHTMLEffects.push(`<br><h1>MISSING STRINGS ${translationProperty[index]}</h1> ${missingStrings.join("<br>")}`);
    });
    document.querySelector("#cratenamesoutput").innerHTML = parseOutput(JSON.stringify(dataCrates)) + missingStringHTMLCrates.join("");
    document.querySelector("#itemnamesoutput").innerHTML = parseOutput(JSON.stringify(dataItems)) + missingStringHTMLItems.join("");;
    document.querySelector("#unusualfxoutput").innerHTML = parseOutput(JSON.stringify(dataEffects)) + missingStringHTMLEffects.join("");;
}

document.querySelector("#cratebtn").onclick = () => {
    document.querySelector("#cratenamesoutput").style.display = "block";
    document.querySelector("#itemnamesoutput").style.display = "none";
    document.querySelector("#unusualfxoutput").style.display = "none";
}
document.querySelector("#itembtn").onclick = () => {
    document.querySelector("#cratenamesoutput").style.display = "none";
    document.querySelector("#itemnamesoutput").style.display = "block";
    document.querySelector("#unusualfxoutput").style.display = "none";
}
document.querySelector("#fxbtn").onclick = () => {
    document.querySelector("#cratenamesoutput").style.display = "none";
    document.querySelector("#itemnamesoutput").style.display = "none";
    document.querySelector("#unusualfxoutput").style.display = "block";
}