let currentCrate = 0;
let currentCrateObj;
let save = {options: {

}};

import { 
    unusualPool,
    cA, 
    crateOrder,
    globalBonusItemArray,
    unusualifierArray,
    paintBonusArray,
    strangePartBonusArray,
    creepyCrateBonusArray,
    halloweenModeCrateList,
    hw11FX, 
    hw12FX, 
    hw13FX, 
    hw14FX,
    hw15FX,
    hw16FX,
    hw17FX,
    hw18FX,
    hw19FX,
    hw20FX,
    hw21FX,
    hw22FX,
    xmas19FX,
    xmas20FX,
    xmas21FX,
    xmas22FX,
    xmas23FX,
    summer23FX,
    nice2014UnusualPool,
    allGensFX,
    limitedLateSummerUnusualPool,
    hw23FX,
    } from "./crate.js";

const wearTable = ["", "FN", "MW", "FT", "WW", "BS"];
const sheenTable = ["", 128, 129, 130, 131, 132, 133, 134];
const killstreakerTable = ["", 135, 136, 137, 138, 139, 140, 141];

function crateHasRandomStranges(crate) {
    let result = false;
    for (let item of crate.loot) {
        if ([4, 6, 8, 9, 10].includes(item.quality)) {
            result = true;
            break;
        }
    }
    return result;
}
function getString(arg1, arg2) {
    return null;
}
function reportError(err) {
    self.postMessage({
        error: err
    })
}

function unbox() { // This function handles the unboxing itself: which item is unboxed, what are its qualities, wear, effect etc.
    let randomNumber, unusualRandomNumber, itemId, itemWear, itemEffect, itemKillstreak, bonusDrops, cratePos;
    let itemQuality = [];
    try {
        const crate = currentCrateObj;
        randomNumber = Math.floor((Math.random() * 10000) + 1); // Between 1 and 10000
        unusualRandomNumber = Math.floor((Math.random() * 150) + 1) // Between 1 and 150
        let tempNumber = 0;
        // Select item from crate
        let crateItem;
        if (crate.unusual && ((unusualRandomNumber === 1) || save.options.forceUnusual)) { // 0.66% chance
            // Item is a random unusual. Pick a random unusual, then assign Unusual (and Strange if applicable) qualities
            let unusualArray = [];
            switch (crate.unusual) {
                case 1: // Pick a random unusual from the general unusual pool
                    unusualArray = unusualPool.slice();
                    if (currentCrate === 96 && save.options.eotlGlitch) {
                        unusualArray.push(916, 917, 918);
                    };
                    if (currentCrateObj.series >= 1 && currentCrateObj.series <= 55 && save.options.sniperVsSpyUnusuals) {
                        unusualArray.push(1354, 1359, 1370, 62, 158, 194, 124, 70, 178);
                    }
                    if (currentCrateObj.series === 89) {
                        unusualArray = unusualArray.concat(nice2014UnusualPool);
                    } else if (currentCrateObj.series === 86) {
                        unusualArray = unusualArray.concat(limitedLateSummerUnusualPool);
                    }
                    itemId = unusualArray[Math.floor(Math.random() * unusualArray.length)];

                    if (nice2014UnusualPool.includes(itemId)) {
                        let qualityRandomNumber = Math.floor((Math.random() * 10) + 1); // Between 1 and 10
                        if (qualityRandomNumber == 10 || save.options.forceStrange) {
                            itemQuality.push("strange");
                        }
                    }

                    crateItem = {
                        id: itemId,
                        quality: null
                    };
                    break;
                case 2: // Pick a random unusual from the same crate, which can have the Unusual quality. Items with higher grades have a smaller chance of being picked
                    let gradeRandom;
                    if (save.options.forceGrade) {
                        gradeRandom = save.options.forceGradeNum;
                    } else {
                        gradeRandom = Math.floor((Math.random() * 1000) + 1); // Between 1 and 1000
                        if (gradeRandom <= 8) { // Elite - 0.8%
                            gradeRandom = 6;
                        } else if (gradeRandom <= 40) { // Assassin - 3.2%
                            gradeRandom = 5;
                        } else if (gradeRandom <= 200) { // Commando - 16%
                            gradeRandom = 4;
                        } else { // Mercnary - 80%
                            gradeRandom = 3;
                        };
                    }
                    while (unusualArray.length === 0) {
                        unusualArray = crate.loot.filter(item => {
                            return [6, 7, 9, 10].includes(item.quality) && item.grade == gradeRandom;
                        });
                        if (gradeRandom <= 2) {
                            throw new Error;
                        }
                        gradeRandom--;
                    }
                    crateItem = unusualArray[Math.floor(Math.random() * unusualArray.length)];
                    itemId = crateItem.id;
                    break;
                case 3: // Same as case 2, but items have equal chance of being picked instead
                    unusualArray = crate.loot.filter(item => {
                        return [6, 7, 9, 10].includes(item.quality);
                    });
                    crateItem = unusualArray[Math.floor(Math.random() * unusualArray.length)];
                    itemId = crateItem.id;
                    break;
            }
            itemQuality.push("unusual");
        } else {
            // Unbox something else
            switch (crate.autoChance) {
                case 1:
                    let gradeRandom;
                    if (save.options.forceGrade) {
                        gradeRandom = save.options.forceGradeNum;
                    } else {
                        gradeRandom = Math.floor((Math.random() * 1000) + 1); // Between 1 and 1000
                        if (gradeRandom <= 8) { // Elite - 0.8%
                            gradeRandom = 6;
                        } else if (gradeRandom <= 40) { // Assassin - 3.2%
                            gradeRandom = 5;
                        } else if (gradeRandom <= 200) { // Commando - 16%
                            gradeRandom = 4;
                        } else { // Mercnary - 80%
                            gradeRandom = 3;
                        };

                        if (crate.loot[0].grade === 1) gradeRandom -= 2;
                    }
                    let itemPool = [];
                    while (itemPool.length === 0) {
                        itemPool = crate.loot.filter(item => {
                            return item.grade == gradeRandom;
                        });
                        if (gradeRandom <= 0) {
                            throw new Error;
                        }
                        gradeRandom--;
                    }

                    let randomItemNumber = Math.floor(Math.random() * (itemPool.length)); // Between 0 and itemPool.length - 1
                    crateItem = itemPool[randomItemNumber];
                    cratePos = crate.loot.findIndex(it => {
                        return it.id == crateItem.id;
                    })
                    break;

                case 2:
                    let randomItemNumber2 = Math.floor(Math.random() * (crate.loot.length)); // Between 0 and crate.loot.length - 1
                    crateItem = crate.loot[randomItemNumber2];
                    cratePos = randomItemNumber2;
                    break;

                default:
                    randomNumber = Math.floor((Math.random() * 9900) + 1);
                    for (const item in crate.loot) {
                        if (randomNumber > tempNumber && randomNumber <= tempNumber + crate.loot[item].chance) {
                            crateItem = crate.loot[item]; // Create a copy of the item we unboxed. Otherwise, we may end up modifying the item in the crate
                            cratePos = item;
                            break;
                        } else {
                            tempNumber += crate.loot[item].chance;
                        }
                    };
            }
        }
        itemId = crateItem.id;

        // Handle random unusual items and item qualities
        let generateWear = false;
        if (crateItem.quality != null) {
            // Item is not a random unusual. Assign quality
            let qualityRandomNumber;
            switch (crateItem.quality) {
                case 0:
                    itemQuality.push("unusual");
                    break;
                case 1:
                case 7:
                    itemQuality.push("unique");
                    break;
                case 2:
                    itemQuality.push("strange");
                    break;
                case 3:
                    itemQuality.push("haunted");
                    break;
                case 4:
                case 9:
                case 10:
                    qualityRandomNumber = Math.floor((Math.random() * 10) + 1); // Between 1 and 10
                    if (qualityRandomNumber == 10 || save.options.forceStrange) {
                        itemQuality.push("strange");
                    } else {
                        itemQuality.push("unique");
                    }
                    break;
                case 5:
                    generateWear = true;
                    break;
                case 6:
                    generateWear = true;
                    qualityRandomNumber = Math.floor((Math.random() * 10) + 1); // Between 1 and 10
                    if (qualityRandomNumber == 10 || save.options.forceStrange) {
                        itemQuality.push("strange");
                    };
                    break;
                case 8:
                    qualityRandomNumber = Math.floor((Math.random() * 10) + 1); // Between 1 and 10
                    if (qualityRandomNumber == 10 || save.options.forceStrange) {
                        itemQuality.push("strange", "haunted");
                    } else {
                        itemQuality.push("unique");
                    }
                    break;
                case 11:
                    itemQuality.push("unique");
                    itemKillstreak = {
                        sheen: null,
                        killstreaker: null
                    }
                    qualityRandomNumber = Math.floor((Math.random() * 100) + 1);
                    if (qualityRandomNumber > 65 || save.options.forceProKit) {
                        // Pick sheen
                        itemKillstreak.sheen = Math.floor((Math.random() * (sheenTable.length - 1)) + 1);
                    }
                    if (qualityRandomNumber > 90 || save.options.forceProKit) {
                        // Pick killstreaker
                        itemKillstreak.killstreaker = Math.floor((Math.random() * (killstreakerTable.length - 1)) + 1);
                    }
                    break;
                case 12:
                    itemQuality.push("strangifier");
                    break;
            };
        };
        if (itemQuality.length === 1) {
            itemQuality = itemQuality[0];
        } else {
            itemQuality = itemQuality.join("");
        }

        // Wear
        itemWear = 0;
        if (generateWear) {
            let randomWear = Math.floor((Math.random() * 10) + 1);
            switch (randomWear) {
                case 1: // 10% - Battle Scarred
                    itemWear = 1;
                    break;
                case 2:
                case 3: // 20% - Well-Worn
                    itemWear = 2;
                    break;
                case 4:
                case 5:
                case 6:
                case 7: // 40% - Field-Tested
                    itemWear = 3;
                    break;
                case 8:
                case 9: // 20% - Minimal Wear
                    itemWear = 4;
                    break;
                case 10: // 10% - Factory New
                    itemWear = 5;
                    break;
            }
        }

        // Unusual effect
        itemEffect = 0;
        if (itemQuality.includes("unusual")) {
            let effectsArray;
            if (!["none", null, undefined].includes(save.options.halloweenMode) && halloweenModeCrateList[save.options.halloweenMode].includes(currentCrate)) {
                switch (save.options.halloweenMode) {
                    case "hw11":
                        effectsArray = hw11FX;
                        break;
                    case "hw12":
                        effectsArray = hw12FX;
                        break;
                    case "hw13":
                        effectsArray = hw13FX;
                        break;
                    case "hw14":
                        effectsArray = hw14FX;
                        break;
                    case "hw16":
                        effectsArray = hw16FX;
                        break;
                    case "hw17":
                        effectsArray = hw17FX;
                        break;
                    case "hw18":
                        effectsArray = hw18FX;
                        break;
                    case "hw19":
                        effectsArray = hw19FX;
                        break;
                    case "hw20":
                        effectsArray = hw20FX;
                        break;
                    case "hw21":
                        effectsArray = hw21FX;
                        break;
                    case "hw22":
                        effectsArray = hw22FX;
                        break;
                    case "hw23":
                        effectsArray = hw23FX;
                        break;
                    case "xmas19":
                        effectsArray = xmas19FX;
                        break;
                    case "xmas20":
                        effectsArray = xmas20FX;
                        break;
                    case "xmas21":
                        effectsArray = xmas21FX;
                        break;
                    case "xmas22":
                        effectsArray = xmas22FX;
                        break;
                    case "xmas23":
                        effectsArray = xmas23FX;
                        break;
                    case "summer23":
                        effectsArray = summer23FX;
                        break;
                }
            } else {
                effectsArray = crate.effects;

                // If unboxing an Unusual robohat from the Robo Community Crate, add 1st, 2nd and 3rd gen effects to effect pool
                if (currentCrateObj.series === 58) {
                    for (let item of currentCrateObj.loot) {
                        if (itemId === item.id) {
                            effectsArray = effectsArray.concat(allGensFX);
                        }
                    }
                }
            }
            itemEffect = effectsArray[Math.floor(Math.random() * effectsArray.length)];
        };

        // Bonus drops

        bonusDrops = [];
        if (crate.bonus) {
            let bonusNum = 0;
            if (save.options.forceBonusItem) {
                bonusNum = 3;
            } else {
                bonusNum = 0;
                let bonusChance = Math.floor((Math.random() * 5) + 1); // Between 1 and 5
                if (bonusChance <= 2 || save.options.forceBonusItem) { // 40% chance to get bonus drop
                    bonusNum++;
                    bonusChance = Math.floor((Math.random() * 5) + 1) // Between 1 and 5
                    if (bonusChance == 1) { // 20% chance to get another bonus drop (8%)
                        bonusNum++;
                        bonusChance = Math.floor((Math.random() * 25) + 1) // Between 1 and 25
                        if (bonusChance == 1) { // 4% chance to get third bonus drop (0.32%)
                            bonusNum++;
                        }
                    }
                }
            }
            let oneExclusiveBonusUnboxed = false;
            for (; bonusNum > 0; bonusNum--) {
                let unusualifierChance = Math.floor((Math.random() * 1000) + 1) // Between 1 and 1000
                if (unusualifierChance <= 15 || save.options.forceUnusualifier) { // 1.5% chance
                    // Unbox unusualifier
                    let randomTaunt = Math.floor(Math.random() * unusualifierArray.length);
                    bonusDrops.push({
                        id: 770,
                        taunt: unusualifierArray[randomTaunt]
                    })
                } else {
                    let unboxExclusive = false;
                    if (crate.exclusiveBonus && !oneExclusiveBonusUnboxed) {
                        let exclusiveBonusChance = Math.floor((Math.random() * 10000) + 1) // Between 1 and 10000
                        if (exclusiveBonusChance <= crate.exclusiveBonus.chance) {
                            unboxExclusive = true;
                            if (crate.oneExclusiveBonus) {
                                oneExclusiveBonusUnboxed = true;
                            }
                        }
                    }

                    if (unboxExclusive) {
                        // Case exclusive bonus drop
                        let randomBonus = Math.floor(Math.random() * crate.exclusiveBonus.loot.length);
                        bonusDrops.push({
                            id: crate.exclusiveBonus.loot[randomBonus]
                        })
                    } else {
                        // Global bonus drop
                        let randomBonus = Math.floor(Math.random() * globalBonusItemArray.length)
                        switch (globalBonusItemArray[randomBonus]) {
                            case "paint": // Pick random paint
                                bonusDrops.push({
                                    id: paintBonusArray[Math.floor(Math.random() * paintBonusArray.length)]
                                });
                                break;
                            case "strangepart": // Pick random strange part
                                bonusDrops.push({
                                    id: strangePartBonusArray[Math.floor(Math.random() * strangePartBonusArray.length)]
                                });
                                break;
                            default:
                                bonusDrops.push({
                                    id: globalBonusItemArray[randomBonus]
                                })
                                break;
                        }
                    }
                }
            }
        } else if (crate.exclusiveBonus) {
            let exclusiveBonusChance = Math.floor((Math.random() * 10000) + 1) // Between 1 and 10000
            if (exclusiveBonusChance <= crate.exclusiveBonus.chance || save.options.forceBonusItem) {
                let randomBonus = Math.floor(Math.random() * crate.exclusiveBonus.loot.length);
                bonusDrops.push({
                    id: crate.exclusiveBonus.loot[randomBonus]
                })
            }
        }
        if (crate.creepyBonus) {
            let bonusChance = Math.floor((Math.random() * 50) + 1) // Between 1 and 50
            if (bonusChance === 1 || save.options.forceBonusItem) { // 2% chance
                let randomBonus = Math.floor(Math.random() * creepyCrateBonusArray.length);
                let itemKillstreak;
                if (creepyCrateBonusArray[randomBonus].quality === 11) {
                    itemKillstreak = {
                        sheen: null,
                        killstreaker: null
                    }
                    let randomKillstreak = Math.floor((Math.random() * 100) + 1);
                    if (randomKillstreak > 65 || save.options.forceProKit) {
                        // Pick sheen
                        itemKillstreak.sheen = Math.floor((Math.random() * (sheenTable.length - 1)) + 1);
                    }
                    if (randomKillstreak > 90 || save.options.forceProKit) {
                        // Pick killstreaker
                        itemKillstreak.killstreaker = Math.floor((Math.random() * (killstreakerTable.length - 1)) + 1);
                    }

                }
                bonusDrops.push({
                    id: creepyCrateBonusArray[randomBonus].id,
                    quality: creepyCrateBonusArray[randomBonus].quality,
                    killstreak: itemKillstreak
                })
            }
        }

        // Return item
        return {
            id: itemId,
            cratePos: cratePos,
            name: getString("item", itemId),
            quality: itemQuality,
            wear: itemWear,
            grade: crateItem.grade,
            effect: itemEffect,
            killstreak: itemKillstreak,
            bonus: bonusDrops
        }
    } catch (err) {
        let errorMessage = `Something went wrong when executing unbox().
    Error stack: ${err.stack}

    currentCrate: ${currentCrate}
    randomNumber: ${randomNumber}
    unusualRandomNumber: ${unusualRandomNumber}
    forceUnusual: ${save.options.forceUnusual}
    itemId: ${itemId}
    quality: ${itemQuality}
    wear: ${itemWear}
    effect: ${itemEffect}`;

        console.error(errorMessage);
        reportError(errorMessage);
    }
}

function addToInventory(unboxResult, saveObj, saveToStorage) {
    let itemNum;
    if (unboxResult.cratePos != null) {
        switch (currentCrateObj.loot[unboxResult.cratePos].quality) {
            case 4:
            case 8:
            case 9:
            case 10:
                if (["strange", "strangehaunted"].includes(unboxResult.quality)) {
                    itemNum = saveObj.crates[crateOrder[currentCrate]][unboxResult.cratePos].q += 1;
                } else {
                    itemNum = saveObj.crates[crateOrder[currentCrate]][unboxResult.cratePos].n += 1;
                }
                break;
            case 5:
                itemNum = saveObj.crates[crateOrder[currentCrate]][unboxResult.cratePos][wearTable[unboxResult.wear]] += 1;
                break;
            case 6:
                if (unboxResult.quality === "strange") {
                    itemNum = saveObj.crates[crateOrder[currentCrate]][unboxResult.cratePos][`${wearTable[unboxResult.wear]}q`] += 1;
                } else {
                    itemNum = saveObj.crates[crateOrder[currentCrate]][unboxResult.cratePos][wearTable[unboxResult.wear]] += 1;
                }
                break;
            case 11:
                let found = false;
                if (unboxResult.killstreak.killstreaker) {
                    for (let item of saveObj.crates[crateOrder[currentCrate]][unboxResult.cratePos].p) {
                        if (item.s === unboxResult.killstreak.sheen && item.p === unboxResult.killstreak.killstreaker) {
                            itemNum = item.n += 1;
                            found = true;
                            break;
                        }
                    }
                    if (!found) {
                        itemNum = 1;
                        saveObj.crates[crateOrder[currentCrate]][unboxResult.cratePos].p.push({
                            n: 1,
                            s: unboxResult.killstreak.sheen,
                            k: unboxResult.killstreak.killstreaker
                        })
                    }
                } else if (unboxResult.killstreak.sheen) {
                    for (let item of saveObj.crates[crateOrder[currentCrate]][unboxResult.cratePos].s) {
                        if (item.s === unboxResult.killstreak.sheen) {
                            itemNum = item.n += 1;
                            found = true;
                            break;
                        }
                    }
                    if (!found) {
                        itemNum = 1;
                        saveObj.crates[crateOrder[currentCrate]][unboxResult.cratePos].s.push({
                            n: 1,
                            s: unboxResult.killstreak.sheen
                        })
                    }
                } else {
                    itemNum = saveObj.crates[crateOrder[currentCrate]][unboxResult.cratePos].n += 1;
                }
                break;
            default:
                itemNum = saveObj.crates[crateOrder[currentCrate]][unboxResult.cratePos].n += 1;
        }
    }
    for (let bonusItem of unboxResult.bonus) {
        if (currentCrateObj.exclusiveBonus.loot != undefined && currentCrateObj.exclusiveBonus.loot.includes(bonusItem.id)) {
            saveObj.crates[crateOrder[currentCrate]][currentCrateObj.loot.length + currentCrateObj.exclusiveBonus.loot.findIndex(arrayItem => {
                return arrayItem === bonusItem.id;
            })].n++;
        } else if (currentCrateObj.creepyBonus) {
            let bonusItemPos = creepyCrateBonusArray.findIndex(arrayItem => {
                return arrayItem.id === bonusItem.id && arrayItem.quality === bonusItem.quality;
            });

            if (bonusItem.quality == 12 || (bonusItem.killstreak != null && bonusItem.killstreak.sheen === null)) {
                saveObj.crates[crateOrder[currentCrate]][currentCrateObj.loot.length + bonusItemPos].n++;
            } else if (bonusItem.killstreak.killstreaker === null) {
                let found = false;
                for (let item of saveObj.crates[crateOrder[currentCrate]][currentCrateObj.loot.length + bonusItemPos].s) {
                    if (item.s === bonusItem.killstreak.sheen) {
                        item.n += 1;
                        found = true;
                        break;
                    }
                }
                if (!found) {
                    saveObj.crates[crateOrder[currentCrate]][currentCrateObj.loot.length + bonusItemPos].s.push({
                        n: 1,
                        s: bonusItem.killstreak.sheen
                    })
                }
            } else {
                let found = false;
                for (let item of saveObj.crates[crateOrder[currentCrate]][currentCrateObj.loot.length + bonusItemPos].p) {
                    if (item.s === bonusItem.killstreak.sheen && item.p === bonusItem.killstreak.killstreaker) {
                        item.n += 1;
                        found = true;
                        break;
                    }
                }
                if (!found) {
                    saveObj.crates[crateOrder[currentCrate]][currentCrateObj.loot.length + bonusItemPos].p.push({
                        n: 1,
                        s: bonusItem.killstreak.sheen,
                        k: bonusItem.killstreak.killstreaker
                    })
                }
            }

        } else if (bonusItem.id != 770) {
            let found = false;
            for (let saveItem of saveObj.bonusItems) {
                if (saveItem.i === bonusItem.id) {
                    saveItem.n++;
                    found = true;
                    break;
                }
            }
            if (!found) {
                saveObj.bonusItems.push({
                    i: bonusItem.id,
                    n: 1,
                })
            }
        }
    }
    if (saveToStorage) {
        localStorage.setItem("unboxertf-crates", JSON.stringify(save.crates));
        localStorage.setItem("unboxertf-bonusitems", JSON.stringify(save.bonusItems));
    }
    return itemNum;
}

function addToUnusuals(unboxResult, saveObj, saveToStorage) {
    if (unboxResult.quality.includes("unusual")) {
        if (["strange", "strangeunusual", "unusualstrange"].includes(unboxResult.quality)) {
            saveObj.unusuals.push([unboxResult.id, unboxResult.effect, 1, unboxResult.wear]);
        } else {
            saveObj.unusuals.push([unboxResult.id, unboxResult.effect, 0, unboxResult.wear]);
        }

        if (saveToStorage) {
            updateUnusualStats(save.unusuals[save.unusuals.length - 1], true);
        }
    }

    for (let bonusItem of unboxResult.bonus) {
        if (bonusItem.id === 770) {
            saveObj.unusuals.push([bonusItem.id, bonusItem.taunt, 0, 0]);
            if (saveToStorage) {
                updateUnusualStats(save.unusuals[save.unusuals.length - 1], true);
            }
        }
    }

    if (saveToStorage) {
        localStorage.setItem("unboxertf-unusuals", JSON.stringify(save.unusuals));
    }
}

function addToStats(unboxResult, saveObj, saveToStorage) {
    // Update stats
    saveObj.stats["crates-opened"] += 1;
    saveObj.stats["keys-money"] = (parseFloat(saveObj.stats["keys-money"]) + 2.49).toFixed(2);
    switch (unboxResult.quality) {
        case "unique":
            saveObj.stats["unique-unboxed"] += 1;
            break;
        case "strange":
            saveObj.stats["strange-unboxed"] += 1;
            break;
        case "haunted":
            saveObj.stats["haunted-unboxed"] += 1;
            break;
        case "unusual":
        case "unusualunique":
            saveObj.stats["unusual-unboxed"] += 1;
            break;
        case "strangehaunted":
            saveObj.stats["strange-unboxed"] += 1;
            saveObj.stats["haunted-unboxed"] += 1;
            saveObj.stats["strangehaunted-unboxed"] += 1;
            break;
        case "strangeunusual":
        case "unusualstrange":
            saveObj.stats["strange-unboxed"] += 1;
            saveObj.stats["unusual-unboxed"] += 1;
            saveObj.stats["strangeunusual-unboxed"] += 1;
            break;
    }
    if (unboxResult.wear) {
        saveObj.stats["decorated-unboxed"] += 1;
    };

    if (unboxResult.grade) {
        saveObj.stats["grade-unboxed"] += 1;
    }

    switch (unboxResult.grade) {
        case 1:
            saveObj.stats["civilian-unboxed"] += 1;
            break;
        case 2:
            saveObj.stats["freelance-unboxed"] += 1;
            break;
        case 3:
            saveObj.stats["mercenary-unboxed"] += 1;
            break;
        case 4:
            saveObj.stats["commando-unboxed"] += 1;
            break;
        case 5:
            saveObj.stats["assassin-unboxed"] += 1;
            break;
        case 6:
            saveObj.stats["elite-unboxed"] += 1;
            break;
    };

    switch (unboxResult.wear) {
        case 1:
            saveObj.stats["factorynew-unboxed"] += 1;
            break;
        case 2:
            saveObj.stats["minimalwear-unboxed"] += 1;
            break;
        case 3:
            saveObj.stats["fieldtested-unboxed"] += 1;
            break;
        case 4:
            saveObj.stats["wellworn-unboxed"] += 1;
            break;
        case 5:
            saveObj.stats["battlescarred-unboxed"] += 1;
            break;
    }

    if (["unusual", "unusualunique", "strangeunusual", "unusualstrange"].includes(unboxResult.quality)) {
        if (saveObj.stats["unboxes-since-last-unusual"] < saveObj.stats["min-unusual-drought"] || saveObj.stats["min-unusual-drought"] === "N/A") {
            saveObj.stats["min-unusual-drought"] = saveObj.stats["unboxes-since-last-unusual"];
        }
        saveObj.crateStats[crateOrder[currentCrate]].u++;

        saveObj.stats["unusual-avg-array"].push(saveObj.stats["unboxes-since-last-unusual"]);
        let avg = 0;
        for (let num of saveObj.stats["unusual-avg-array"]) {
            avg += parseInt(num);
        }
        saveObj.stats["unusual-avg"] = Math.round(avg / saveObj.stats["unusual-avg-array"].length);

        saveObj.stats["unusual-avgprice-array"].push((saveObj.stats["unboxes-since-last-unusual"] * 2.49).toFixed(2));
        avg = 0;
        for (let num of saveObj.stats["unusual-avgprice-array"]) {
            avg += parseFloat(num);
        }
        saveObj.stats["unusual-avgprice"] = (avg / saveObj.stats["unusual-avg-array"].length).toFixed(2);
        saveObj.stats["unboxes-since-last-unusual"] = 0;
    } else {
        if (currentCrateObj.unusual) {
            saveObj.stats["unboxes-since-last-unusual"] += 1;
            if (saveObj.stats["unboxes-since-last-unusual"] > saveObj.stats["max-unusual-drought"]) {
                saveObj.stats["max-unusual-drought"] = saveObj.stats["unboxes-since-last-unusual"];
            }
        }
    }

    saveObj.stats["bonus-unboxed"] += unboxResult.bonus.length;

    if (currentCrateObj.unusual) {
        saveObj.stats["unusual-chances"] += 1;
    }
    if (crateHasRandomStranges(currentCrateObj)) {
        saveObj.stats["strange-chances"] += 1;
        if (unboxResult.quality.includes("strange")) {
            saveObj.stats["random-strange-unboxed"] += 1;
        }
    };

    saveObj.crateStats[crateOrder[currentCrate]].n++;
    if (unboxResult.bonus.length > 0) {
        saveObj.crateStats[crateOrder[currentCrate]].b += unboxResult.bonus.length;
        switch (unboxResult.bonus.length) {
            case 1:
                saveObj.stats["single-bonus-unboxed"]++;
                break;
            case 2:
                saveObj.stats["double-bonus-unboxed"]++;
                break;
            case 3:
                saveObj.stats["triple-bonus-unboxed"]++;
                break;
        }
    }

    for (let bonusItem of unboxResult.bonus) {
        if (bonusItem.id === 770) {
            saveObj.crateStats[crateOrder[currentCrate]].u++;
            saveObj.stats["unusualifiers-unboxed"]++;
        }
    }

    if (saveToStorage) {
        localStorage.setItem("unboxertf-cratestats", JSON.stringify(save.crateStats));
        localStorage.setItem("unboxertf-stats", JSON.stringify(save.stats));
    }
}

self.onmessage = function(e) {
    if (e.data.crate != undefined) {
        let bulkSave = e.data.bulkSave;
        save.options = JSON.parse(e.data.options);
        currentCrate = e.data.crate;
        currentCrateObj = cA[crateOrder[currentCrate]];
    
        let bulkCounter = 0;
        while (bulkCounter < e.data.crateNum) {
            let item = unbox();
            if (!e.data.cheats) {
                self.postMessage({
                    item: item
                });
            }
            addToInventory(item, bulkSave);
            addToUnusuals(item, bulkSave);
            addToStats(item, bulkSave);
            bulkCounter++;
            if (bulkCounter % 1000 == 0) {
                self.postMessage({
                    progress: bulkCounter
                })
            }
        }
        self.postMessage({
            complete: true,
            bulkSave: JSON.stringify(bulkSave)
        })
    }
}