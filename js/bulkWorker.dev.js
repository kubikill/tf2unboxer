"use strict";

var currentCrate = 0;
var currentCrateObj;
var save = {
  options: {}
};
importScripts('../data/crate.prod.js');
var wearTable = ["", "FN", "MW", "FT", "WW", "BS"];
var wearTableNames = ["", 80, 81, 82, 83, 84];
var gradeTable = ["", "colorcivilian", "colorfreelance", "colormercenary", "colorcommando", "colorassassin", "colorelite"];
var sheenTable = ["", 128, 129, 130, 131, 132, 133, 134];
var killstreakerTable = ["", 135, 136, 137, 138, 139, 140, 141];

function crateHasRandomStranges(crate) {
  var result = false;
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = crate.loot[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var item = _step.value;

      if ([4, 6, 8, 9, 10].includes(item.quality)) {
        result = true;
        break;
      }
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator["return"] != null) {
        _iterator["return"]();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
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
  });
}

function unbox() {
  // This function handles the unboxing itself: which item is unboxed, what are its qualities, wear, effect etc.
  var randomNumber, unusualRandomNumber, itemId, itemWear, itemEffect, itemKillstreak, bonusDrops, cratePos;
  var itemQuality = [];

  try {
    var crate = currentCrateObj;
    randomNumber = Math.floor(Math.random() * 10000 + 1); // Between 1 and 10000

    unusualRandomNumber = Math.floor(Math.random() * 150 + 1); // Between 1 and 150

    var tempNumber = 0; // Select item from crate

    var crateItem;

    if (crate.unusual && (unusualRandomNumber === 1 || save.options.forceUnusual)) {
      // 0.66% chance
      // Item is a random unusual. Pick a random unusual, then assign Unusual (and Strange if applicable) qualities
      var unusualArray = [];

      (function () {
        switch (crate.unusual) {
          case 1:
            // Pick a random unusual from the general unusual pool
            unusualArray = unusualPool.slice();

            if (currentCrate === 96 && save.options.eotlGlitch) {
              unusualArray.push(916, 917, 918);
            }

            ;

            if (currentCrateObj.series >= 1 && currentCrateObj.series <= 55 && save.options.sniperVsSpyUnusuals) {
              unusualArray.push(1354, 1359, 1370, 62, 158, 194, 124, 70, 178);
            }

            itemId = unusualArray[Math.floor(Math.random() * unusualArray.length)];
            crateItem = {
              id: itemId,
              quality: null
            };
            break;

          case 2:
            // Pick a random unusual from the same crate, which can have the Unusual quality. Items with higher grades have a smaller chance of being picked
            var gradeRandom;

            if (save.options.forceGrade) {
              gradeRandom = save.options.forceGradeNum;
            } else {
              gradeRandom = Math.floor(Math.random() * 1000 + 1); // Between 1 and 1000

              if (gradeRandom <= 8) {
                // Elite - 0.8%
                gradeRandom = 6;
              } else if (gradeRandom <= 40) {
                // Assassin - 3.2%
                gradeRandom = 5;
              } else if (gradeRandom <= 200) {
                // Commando - 16%
                gradeRandom = 4;
              } else {
                // Mercnary - 80%
                gradeRandom = 3;
              }

              ;
            }

            while (unusualArray.length === 0) {
              unusualArray = crate.loot.filter(function (item) {
                return [6, 7, 9, 10].includes(item.quality) && item.grade == gradeRandom;
              });

              if (gradeRandom <= 2) {
                throw new Error();
              }

              gradeRandom--;
            }

            crateItem = unusualArray[Math.floor(Math.random() * unusualArray.length)];
            itemId = crateItem.id;
            break;

          case 3:
            // Same as case 1, but items have equal chance of being picked instead
            unusualArray = crate.loot.filter(function (item) {
              return [6, 7, 9, 10].includes(item.quality);
            });
            crateItem = unusualArray[Math.floor(Math.random() * unusualArray.length)];
            itemId = crateItem.id;
            break;
        }
      })();

      itemQuality.push("unusual");
    } else {
      // Unbox something else
      (function () {
        switch (crate.autoChance) {
          case 1:
            var gradeRandom;

            if (save.options.forceGrade) {
              gradeRandom = save.options.forceGradeNum;
            } else {
              gradeRandom = Math.floor(Math.random() * 1000 + 1); // Between 1 and 1000

              if (gradeRandom <= 8) {
                // Elite - 0.8%
                gradeRandom = 6;
              } else if (gradeRandom <= 40) {
                // Assassin - 3.2%
                gradeRandom = 5;
              } else if (gradeRandom <= 200) {
                // Commando - 16%
                gradeRandom = 4;
              } else {
                // Mercnary - 80%
                gradeRandom = 3;
              }

              ;
              if (crate.loot[0].grade === 1) gradeRandom -= 2;
            }

            var itemPool = [];

            while (itemPool.length === 0) {
              itemPool = crate.loot.filter(function (item) {
                return item.grade == gradeRandom;
              });

              if (gradeRandom <= 0) {
                throw new Error();
              }

              gradeRandom--;
            }

            var randomItemNumber = Math.floor(Math.random() * itemPool.length); // Between 0 and itemPool.length - 1

            crateItem = itemPool[randomItemNumber];
            cratePos = crate.loot.findIndex(function (it) {
              return it.id == crateItem.id;
            });
            break;

          case 2:
            var randomItemNumber2 = Math.floor(Math.random() * crate.loot.length); // Between 0 and crate.loot.length - 1

            crateItem = crate.loot[randomItemNumber2];
            cratePos = randomItemNumber2;
            break;

          default:
            randomNumber = Math.floor(Math.random() * 9900 + 1);

            for (var item in crate.loot) {
              if (randomNumber > tempNumber && randomNumber <= tempNumber + crate.loot[item].chance) {
                crateItem = crate.loot[item]; // Create a copy of the item we unboxed. Otherwise, we may end up modifying the item in the crate

                cratePos = item;
                break;
              } else {
                tempNumber += crate.loot[item].chance;
              }
            }

            ;
        }
      })();
    }

    itemId = crateItem.id; // Handle random unusual items and item qualities

    var generateWear = false;

    if (crateItem.quality != null) {
      // Item is not a random unusual. Assign quality
      var qualityRandomNumber;

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
          qualityRandomNumber = Math.floor(Math.random() * 10 + 1); // Between 1 and 10

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
          qualityRandomNumber = Math.floor(Math.random() * 10 + 1); // Between 1 and 10

          if (qualityRandomNumber == 10 || save.options.forceStrange) {
            itemQuality.push("strange");
          }

          ;
          break;

        case 8:
          qualityRandomNumber = Math.floor(Math.random() * 10 + 1); // Between 1 and 10

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
          };
          qualityRandomNumber = Math.floor(Math.random() * 100 + 1);

          if (qualityRandomNumber > 65 || save.options.forceProKit) {
            // Pick sheen
            itemKillstreak.sheen = Math.floor(Math.random() * (sheenTable.length - 1) + 1);
          }

          if (qualityRandomNumber > 90 || save.options.forceProKit) {
            // Pick killstreaker
            itemKillstreak.killstreaker = Math.floor(Math.random() * (killstreakerTable.length - 1) + 1);
          }

          break;

        case 12:
          itemQuality.push("strangifier");
          break;
      }

      ;
    }

    ;

    if (itemQuality.length === 1) {
      itemQuality = itemQuality[0];
    } else {
      itemQuality = itemQuality.join("");
    } // Wear


    itemWear = 0;

    if (generateWear) {
      var randomWear = Math.floor(Math.random() * 10 + 1);

      switch (randomWear) {
        case 1:
          itemWear = 1;
          break;

        case 2:
        case 3:
          itemWear = 2;
          break;

        case 4:
        case 5:
        case 6:
        case 7:
          itemWear = 3;
          break;

        case 8:
        case 9:
          itemWear = 4;
          break;

        case 10:
          itemWear = 5;
          break;
      }
    } // Unusual effect


    itemEffect = 0;

    if (itemQuality.includes("unusual")) {
      var effectsArray;

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

          case "xmas19":
            effectsArray = xmas19FX;
            break;

          case "xmas20":
            effectsArray = xmas20FX;
            break;
        }
      } else {
        effectsArray = crate.effects;
      }

      itemEffect = effectsArray[Math.floor(Math.random() * effectsArray.length)];
    }

    ; // Bonus drops

    bonusDrops = [];

    if (crate.bonus) {
      var bonusNum = 0;

      if (save.options.forceBonusItem) {
        bonusNum = 3;
      } else {
        bonusNum = 0;
        var bonusChance = Math.floor(Math.random() * 5 + 1); // Between 1 and 5

        if (bonusChance <= 2 || save.options.forceBonusItem) {
          // 40% chance to get bonus drop
          bonusNum++;
          bonusChance = Math.floor(Math.random() * 5 + 1); // Between 1 and 5

          if (bonusChance == 1) {
            // 20% chance to get another bonus drop 
            bonusNum++;
            bonusChance = Math.floor(Math.random() * 25 + 1); // Between 1 and 25

            if (bonusChance == 1) {
              // 4% chance
              bonusNum++;
            }
          }
        }
      }

      var oneExclusiveBonusUnboxed = false;

      for (; bonusNum > 0; bonusNum--) {
        var unusualifierChance = Math.floor(Math.random() * 1000 + 1); // Between 1 and 1000

        if (unusualifierChance <= 15 || save.options.forceUnusualifier) {
          // 1.5% chance
          // Unbox unusualifier
          var randomTaunt = Math.floor(Math.random() * unusualifierArray.length);
          bonusDrops.push({
            id: 770,
            taunt: unusualifierArray[randomTaunt]
          });
        } else {
          var unboxExclusive = false;

          if (crate.exclusiveBonus && !oneExclusiveBonusUnboxed) {
            var exclusiveBonusChance = Math.floor(Math.random() * 10000 + 1); // Between 1 and 10000

            if (exclusiveBonusChance <= crate.exclusiveBonus.chance) {
              unboxExclusive = true;

              if (crate.oneExclusiveBonus) {
                oneExclusiveBonusUnboxed = true;
              }
            }
          }

          if (unboxExclusive) {
            // Case exclusive bonus drop
            var randomBonus = Math.floor(Math.random() * crate.exclusiveBonus.loot.length);
            bonusDrops.push({
              id: crate.exclusiveBonus.loot[randomBonus]
            });
          } else {
            // Global bonus drop
            var _randomBonus = Math.floor(Math.random() * globalBonusItemArray.length);

            switch (globalBonusItemArray[_randomBonus]) {
              case "paint":
                // Pick random paint
                bonusDrops.push({
                  id: paintBonusArray[Math.floor(Math.random() * paintBonusArray.length)]
                });
                break;

              case "strangepart":
                // Pick random strange part
                bonusDrops.push({
                  id: strangePartBonusArray[Math.floor(Math.random() * strangePartBonusArray.length)]
                });
                break;

              default:
                bonusDrops.push({
                  id: globalBonusItemArray[_randomBonus]
                });
                break;
            }
          }
        }
      }
    } else if (crate.exclusiveBonus) {
      var _exclusiveBonusChance = Math.floor(Math.random() * 10000 + 1); // Between 1 and 10000


      if (_exclusiveBonusChance <= crate.exclusiveBonus.chance || save.options.forceBonusItem) {
        var _randomBonus2 = Math.floor(Math.random() * crate.exclusiveBonus.loot.length);

        bonusDrops.push({
          id: crate.exclusiveBonus.loot[_randomBonus2]
        });
      }
    }

    if (crate.creepyBonus) {
      var _bonusChance = Math.floor(Math.random() * 50 + 1); // Between 1 and 50


      if (_bonusChance === 1 || save.options.forceBonusItem) {
        // 2% chance
        var _randomBonus3 = Math.floor(Math.random() * creepyCrateBonusArray.length);

        var _itemKillstreak;

        if (creepyCrateBonusArray[_randomBonus3].quality === 11) {
          _itemKillstreak = {
            sheen: null,
            killstreaker: null
          };
          var randomKillstreak = Math.floor(Math.random() * 100 + 1);

          if (randomKillstreak > 65 || save.options.forceProKit) {
            // Pick sheen
            _itemKillstreak.sheen = Math.floor(Math.random() * (sheenTable.length - 1) + 1);
          }

          if (randomKillstreak > 90 || save.options.forceProKit) {
            // Pick killstreaker
            _itemKillstreak.killstreaker = Math.floor(Math.random() * (killstreakerTable.length - 1) + 1);
          }
        }

        bonusDrops.push({
          id: creepyCrateBonusArray[_randomBonus3].id,
          quality: creepyCrateBonusArray[_randomBonus3].quality,
          killstreak: _itemKillstreak
        });
      }
    } // Return item


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
    };
  } catch (err) {
    var errorMessage = "Something went wrong when executing unbox().\n    Error stack: ".concat(err.stack, "\n\n    currentCrate: ").concat(currentCrate, "\n    randomNumber: ").concat(randomNumber, "\n    unusualRandomNumber: ").concat(unusualRandomNumber, "\n    forceUnusual: ").concat(save.options.forceUnusual, "\n    itemId: ").concat(itemId, "\n    quality: ").concat(itemQuality, "\n    wear: ").concat(itemWear, "\n    effect: ").concat(itemEffect);
    console.error(errorMessage);
    reportError(errorMessage);
  }
}

function addToInventory(unboxResult, saveObj, saveToStorage) {
  var itemNum;

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
          itemNum = saveObj.crates[crateOrder[currentCrate]][unboxResult.cratePos]["".concat(wearTable[unboxResult.wear], "q")] += 1;
        } else {
          itemNum = saveObj.crates[crateOrder[currentCrate]][unboxResult.cratePos][wearTable[unboxResult.wear]] += 1;
        }

        break;

      case 11:
        var found = false;

        if (unboxResult.killstreak.killstreaker) {
          var _iteratorNormalCompletion2 = true;
          var _didIteratorError2 = false;
          var _iteratorError2 = undefined;

          try {
            for (var _iterator2 = saveObj.crates[crateOrder[currentCrate]][unboxResult.cratePos].p[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
              var item = _step2.value;

              if (item.s === unboxResult.killstreak.sheen && item.p === unboxResult.killstreak.killstreaker) {
                itemNum = item.n += 1;
                found = true;
                break;
              }
            }
          } catch (err) {
            _didIteratorError2 = true;
            _iteratorError2 = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion2 && _iterator2["return"] != null) {
                _iterator2["return"]();
              }
            } finally {
              if (_didIteratorError2) {
                throw _iteratorError2;
              }
            }
          }

          if (!found) {
            itemNum = 1;
            saveObj.crates[crateOrder[currentCrate]][unboxResult.cratePos].p.push({
              n: 1,
              s: unboxResult.killstreak.sheen,
              k: unboxResult.killstreak.killstreaker
            });
          }
        } else if (unboxResult.killstreak.sheen) {
          var _iteratorNormalCompletion3 = true;
          var _didIteratorError3 = false;
          var _iteratorError3 = undefined;

          try {
            for (var _iterator3 = saveObj.crates[crateOrder[currentCrate]][unboxResult.cratePos].s[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
              var _item = _step3.value;

              if (_item.s === unboxResult.killstreak.sheen) {
                itemNum = _item.n += 1;
                found = true;
                break;
              }
            }
          } catch (err) {
            _didIteratorError3 = true;
            _iteratorError3 = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion3 && _iterator3["return"] != null) {
                _iterator3["return"]();
              }
            } finally {
              if (_didIteratorError3) {
                throw _iteratorError3;
              }
            }
          }

          if (!found) {
            itemNum = 1;
            saveObj.crates[crateOrder[currentCrate]][unboxResult.cratePos].s.push({
              n: 1,
              s: unboxResult.killstreak.sheen
            });
          }
        } else {
          itemNum = saveObj.crates[crateOrder[currentCrate]][unboxResult.cratePos].n += 1;
        }

        break;

      default:
        itemNum = saveObj.crates[crateOrder[currentCrate]][unboxResult.cratePos].n += 1;
    }
  }

  var _iteratorNormalCompletion4 = true;
  var _didIteratorError4 = false;
  var _iteratorError4 = undefined;

  try {
    var _loop = function _loop() {
      var bonusItem = _step4.value;

      if (currentCrateObj.exclusiveBonus.loot != undefined && currentCrateObj.exclusiveBonus.loot.includes(bonusItem.id)) {
        saveObj.crates[crateOrder[currentCrate]][currentCrateObj.loot.length + currentCrateObj.exclusiveBonus.loot.findIndex(function (arrayItem) {
          return arrayItem === bonusItem.id;
        })].n++;
      } else if (currentCrateObj.creepyBonus) {
        var bonusItemPos = creepyCrateBonusArray.findIndex(function (arrayItem) {
          return arrayItem.id === bonusItem.id && arrayItem.quality === bonusItem.quality;
        });

        if (bonusItem.quality == 12 || bonusItem.killstreak != null && bonusItem.killstreak.sheen === null) {
          saveObj.crates[crateOrder[currentCrate]][currentCrateObj.loot.length + bonusItemPos].n++;
        } else if (bonusItem.killstreak.killstreaker === null) {
          var _found = false;
          var _iteratorNormalCompletion5 = true;
          var _didIteratorError5 = false;
          var _iteratorError5 = undefined;

          try {
            for (var _iterator5 = saveObj.crates[crateOrder[currentCrate]][currentCrateObj.loot.length + bonusItemPos].s[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
              var _item2 = _step5.value;

              if (_item2.s === bonusItem.killstreak.sheen) {
                _item2.n += 1;
                _found = true;
                break;
              }
            }
          } catch (err) {
            _didIteratorError5 = true;
            _iteratorError5 = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion5 && _iterator5["return"] != null) {
                _iterator5["return"]();
              }
            } finally {
              if (_didIteratorError5) {
                throw _iteratorError5;
              }
            }
          }

          if (!_found) {
            saveObj.crates[crateOrder[currentCrate]][currentCrateObj.loot.length + bonusItemPos].s.push({
              n: 1,
              s: bonusItem.killstreak.sheen
            });
          }
        } else {
          var _found2 = false;
          var _iteratorNormalCompletion6 = true;
          var _didIteratorError6 = false;
          var _iteratorError6 = undefined;

          try {
            for (var _iterator6 = saveObj.crates[crateOrder[currentCrate]][currentCrateObj.loot.length + bonusItemPos].p[Symbol.iterator](), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
              var _item3 = _step6.value;

              if (_item3.s === bonusItem.killstreak.sheen && _item3.p === bonusItem.killstreak.killstreaker) {
                _item3.n += 1;
                _found2 = true;
                break;
              }
            }
          } catch (err) {
            _didIteratorError6 = true;
            _iteratorError6 = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion6 && _iterator6["return"] != null) {
                _iterator6["return"]();
              }
            } finally {
              if (_didIteratorError6) {
                throw _iteratorError6;
              }
            }
          }

          if (!_found2) {
            saveObj.crates[crateOrder[currentCrate]][currentCrateObj.loot.length + bonusItemPos].p.push({
              n: 1,
              s: bonusItem.killstreak.sheen,
              k: bonusItem.killstreak.killstreaker
            });
          }
        }
      } else if (bonusItem.id != 770) {
        var _found3 = false;
        var _iteratorNormalCompletion7 = true;
        var _didIteratorError7 = false;
        var _iteratorError7 = undefined;

        try {
          for (var _iterator7 = saveObj.bonusItems[Symbol.iterator](), _step7; !(_iteratorNormalCompletion7 = (_step7 = _iterator7.next()).done); _iteratorNormalCompletion7 = true) {
            var saveItem = _step7.value;

            if (saveItem.i === bonusItem.id) {
              saveItem.n++;
              _found3 = true;
              break;
            }
          }
        } catch (err) {
          _didIteratorError7 = true;
          _iteratorError7 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion7 && _iterator7["return"] != null) {
              _iterator7["return"]();
            }
          } finally {
            if (_didIteratorError7) {
              throw _iteratorError7;
            }
          }
        }

        if (!_found3) {
          saveObj.bonusItems.push({
            i: bonusItem.id,
            n: 1
          });
        }
      }
    };

    for (var _iterator4 = unboxResult.bonus[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
      _loop();
    }
  } catch (err) {
    _didIteratorError4 = true;
    _iteratorError4 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion4 && _iterator4["return"] != null) {
        _iterator4["return"]();
      }
    } finally {
      if (_didIteratorError4) {
        throw _iteratorError4;
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

  var _iteratorNormalCompletion8 = true;
  var _didIteratorError8 = false;
  var _iteratorError8 = undefined;

  try {
    for (var _iterator8 = unboxResult.bonus[Symbol.iterator](), _step8; !(_iteratorNormalCompletion8 = (_step8 = _iterator8.next()).done); _iteratorNormalCompletion8 = true) {
      var bonusItem = _step8.value;

      if (bonusItem.id === 770) {
        saveObj.unusuals.push([bonusItem.id, bonusItem.taunt, 0, 0]);

        if (saveToStorage) {
          updateUnusualStats(save.unusuals[save.unusuals.length - 1], true);
        }
      }
    }
  } catch (err) {
    _didIteratorError8 = true;
    _iteratorError8 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion8 && _iterator8["return"] != null) {
        _iterator8["return"]();
      }
    } finally {
      if (_didIteratorError8) {
        throw _iteratorError8;
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
  }

  ;

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
  }

  ;

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
    var avg = 0;
    var _iteratorNormalCompletion9 = true;
    var _didIteratorError9 = false;
    var _iteratorError9 = undefined;

    try {
      for (var _iterator9 = saveObj.stats["unusual-avg-array"][Symbol.iterator](), _step9; !(_iteratorNormalCompletion9 = (_step9 = _iterator9.next()).done); _iteratorNormalCompletion9 = true) {
        var num = _step9.value;
        avg += parseInt(num);
      }
    } catch (err) {
      _didIteratorError9 = true;
      _iteratorError9 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion9 && _iterator9["return"] != null) {
          _iterator9["return"]();
        }
      } finally {
        if (_didIteratorError9) {
          throw _iteratorError9;
        }
      }
    }

    saveObj.stats["unusual-avg"] = Math.round(avg / saveObj.stats["unusual-avg-array"].length);
    saveObj.stats["unusual-avgprice-array"].push((saveObj.stats["unboxes-since-last-unusual"] * 2.49).toFixed(2));
    avg = 0;
    var _iteratorNormalCompletion10 = true;
    var _didIteratorError10 = false;
    var _iteratorError10 = undefined;

    try {
      for (var _iterator10 = saveObj.stats["unusual-avgprice-array"][Symbol.iterator](), _step10; !(_iteratorNormalCompletion10 = (_step10 = _iterator10.next()).done); _iteratorNormalCompletion10 = true) {
        var _num = _step10.value;
        avg += parseFloat(_num);
      }
    } catch (err) {
      _didIteratorError10 = true;
      _iteratorError10 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion10 && _iterator10["return"] != null) {
          _iterator10["return"]();
        }
      } finally {
        if (_didIteratorError10) {
          throw _iteratorError10;
        }
      }
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
  }

  ;
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

  var _iteratorNormalCompletion11 = true;
  var _didIteratorError11 = false;
  var _iteratorError11 = undefined;

  try {
    for (var _iterator11 = unboxResult.bonus[Symbol.iterator](), _step11; !(_iteratorNormalCompletion11 = (_step11 = _iterator11.next()).done); _iteratorNormalCompletion11 = true) {
      var bonusItem = _step11.value;

      if (bonusItem.id === 770) {
        saveObj.crateStats[crateOrder[currentCrate]].u++;
        saveObj.stats["unusualifiers-unboxed"]++;
      }
    }
  } catch (err) {
    _didIteratorError11 = true;
    _iteratorError11 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion11 && _iterator11["return"] != null) {
        _iterator11["return"]();
      }
    } finally {
      if (_didIteratorError11) {
        throw _iteratorError11;
      }
    }
  }

  if (saveToStorage) {
    localStorage.setItem("unboxertf-cratestats", JSON.stringify(save.crateStats));
    localStorage.setItem("unboxertf-stats", JSON.stringify(save.stats));
  }
}

self.onmessage = function (e) {
  if (e.data.crate != undefined) {
    var bulkSave = e.data.bulkSave;
    save.options = JSON.parse(e.data.options);
    currentCrate = e.data.crate;
    currentCrateObj = cA[crateOrder[currentCrate]];
    var bulkCounter = 0;

    while (bulkCounter < e.data.crateNum) {
      var item = unbox();

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
        });
      }
    }

    self.postMessage({
      complete: true,
      bulkSave: JSON.stringify(bulkSave)
    });
  }
};