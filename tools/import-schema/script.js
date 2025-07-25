import {dataItems} from "../../src/js/itemnames.js";

let vdfFile;
let wpFile;

function parseVDF(el) {
    let file = el.target.files[0];
    if (!file) {
        return;
    }
    let reader = new FileReader();
    reader.onload = function (el) {
        vdfFile = VDF.parse(el.target.result).items_game.items;
        console.log(vdfFile);
        console.log("VDF loaded");
    };
    reader.readAsText(file);
}

document.querySelector("#loadvdfbtn").addEventListener("change", parseVDF, false);
document.querySelector("#createlist").onclick = () => {
    generateDef();
}

let regexor = /"([0-9]+)":/g;
let paintkitRegex = /([0-9]+)/g;
let wpRegex = /_([0-9]+)_/;

function parseOutput(input) {
    return input.replaceAll(`"img":`, `img:`)
        .replaceAll(`"eng":`, `eng:`)
        .replaceAll(regexor, "$1:")
        .replaceAll(`"pol":`, `pol:`)
        .replaceAll(`"sch":`, `sch:`)
        .replaceAll(`"fre":`, `fre:`)
        .replaceAll(`\\\\n`, ` `)
        .replaceAll(`\\u0005`, ``)
        .replaceAll('\\\\\\"', `\\"`)
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

function generateDef() {
    for (let vdfKey in vdfFile) {
        for (let refKey in itemRef) {
            if (vdfFile[vdfKey]["item_name"] === `#${refKey}` || vdfFile[vdfKey]["name"] === itemRef[refKey] || vdfFile[vdfKey]["name"] === `The ${itemRef[refKey]}` || vdfFile[vdfKey]["name"] === refKey) {
                for (let item in dataItems) {
                    if (itemRef[refKey] === dataItems[item].eng || itemRef[refKey] === `The ${dataItems[item].eng}`) {
                        dataItems[item].schema = parseInt(vdfKey);
                        break;
                    }
                }
            }
        }
        let vdfName = vdfFile[vdfKey]["name"].match(paintkitRegex);
        if (vdfName != null) {
            vdfName = vdfName[0];
            for (let wpKey in wpRef) {
                let wpRefDef = wpKey.match(wpRegex)[1];
                if (vdfName === wpRefDef) {
                    for (let item in dataItems) {
                        if (dataItems[item].eng === wpRef[wpKey]) {
                            dataItems[item].schema = parseInt(vdfKey);
                            break;
                        }
                    }
                }
            }
        }
    }
    document.querySelector("#itemnamesoutput").innerHTML += parseOutput(JSON.stringify(dataItems));
    document.querySelector("#itemnamesoutput").innerHTML += `<h1>MISSING STRINGS</h1>`
    for (let item in dataItems) {
        if (dataItems[item].schema == undefined) {
            document.querySelector("#itemnamesoutput").innerHTML += `${dataItems[item].eng}<br>`;
        }
    }
}

document.querySelector("#itembtn").onclick = () => {
    document.querySelector("#itemnamesoutput").style.display = "block";
}