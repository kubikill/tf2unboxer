function Crate(op) {
    /* Options:
    id - Determines crate name and icon, which are pulled from cratenames.js.
    series - Crate series number
    loot - Stores crate contents
    effects - Stores unusual effects available in this crate
    note - Crate note (like the "Items obtained from this case may have Strange and/or Unusual quality." text). Text is pulled from text.js
    autoChance - If the crate has only graded items from Commando to Elite grade, set this to true to automatically determine chance to get an item based on value:
        0 or undefined - Use chances set for each item.
        1 - Set item chances based on their grade, so the chance of unboxing an item with specific grade equals to:
            Mercenary - 80%
            Commando - 16%
            Assassin - 3.2%
            Elite - 0.8%
        2 - Give each item an equal chance to be unboxed.
    unusualtype - Determines if unusuals can be unboxed from this crate, and in what way.
        0 or undefined - Unusuals can't be unboxed from this crate.
        1 - Pick a random item from the universal unusual pool.
        2 - Pick a random item from the crate with quality 10. Items with higher grades have smaller chances to be picked.
        3 - Same as 2, but each item has an equal chance of being picked.
    bonus - Determines if bonus items can be unboxed from this crate.
    exclusiveBonus - Determines case exclusive bonus items
        loot - List of case exclusive bonus items
        chance - Chance of getting a case exclusive bonus item instead of a global bonus item. 1 = 0.01%, 10000 = 100%
    */
    this.id = op.id;
    this.series = op.series;
    this.loot = null;
    if (typeof op.effects === "undefined") {
        this.effects = [];
    } else {
        this.effects = op.effects;
    }
    if (typeof op.unusual === "undefined") {
        this.unusual = 0;
    } else {
        this.unusual = op.unusual;
    }
    if (typeof op.note === "undefined") {
        this.note = 0;
    } else {
        this.note = op.note
    }
    if (typeof op.autoChance === "undefined") {
        this.autoChance = 0;
    } else {
        this.autoChance = op.autoChance;
    }
    if (typeof op.bonus === "undefined") {
        this.bonus = false;
    } else {
        this.bonus = true;
    }
    if (typeof op.exclusiveBonus === "undefined") {
        this.exclusiveBonus = false;
    } else {
        this.exclusiveBonus = op.exclusiveBonus;
    }
    if (typeof op.oneExclusiveBonus === "undefined") {
        this.oneExclusiveBonus = false;
    } else {
        this.oneExclusiveBonus = op.oneExclusiveBonus;
    }
    if (typeof op.creepyBonus === "undefined") {
        this.creepyBonus = false;
    } else {
        this.creepyBonus = op.creepyBonus;
    }
}

function Item(op) {
    /* Options:
        id - Determines item name and icon, which are pulled from itemnames.js
        chance - Chance of getting that item. 1 = 0.01%, 10000 = 100%. Can be left blank if crate autoChance is set to true.
        quality - Determines item quality and/or behavior:
            0 - Unusual
            1 - Unique
            2 - Strange
            3 - Haunted
            4 - 90% chance to be Unique, 10% chance to be Strange
            5 - Decorated - 10% Battle Scarred, 20% Well Worn, 40% Field Tested, 20% Minimal Wear, 10% Factory New
            6 - Decorated - Same as 5, but also has 10% chance to be Strange and 1% chance to be Unusual
            7 - 99% to be Unique, 1% to be Unusual
            8 - 90% chance to be Unique, 10% to be Strange Haunted
            9 - Unique, but can be replaced: 10% to be Strange or 1% to be Unusual.
            10 - Same as 4, but it also has a 1% chance to be Unusual. Can be both Strange and Unusual
            11 - Killstreak Kit. 65% to be normal, 25% to be Specialized, 10% to be Professional.
            12 - Strangifier
        grade - Item grade.
    */
    this.id = op.id;
    if (typeof op.chance === "undefined" && typeof this.chance === "undefined") {
        this.chance = 0;
    } else {
        this.chance = op.chance;
    }
    this.quality = op.quality;
    if (typeof op.grade === 'undefined') { // Skin grade. 0 means it has no grade
        this.grade = 0;
    } else {
        this.grade = op.grade;
    }
}

// Unusual cosmetics pool
export const unusualPool = [5, 6, 13, 14, 21, 22, 23, 28, 29, 30, 34, 35, 36, 43, 44, 45, 47, 48, 49, 51, 52, 55, 56, 57, 58, 63, 64, 65, 71, 72, 73, 111, 117, 118, 122, 123, 130, 131, 133, 134, 135, 136, 137, 140, 142, 143, 147, 148, 152, 153, 157, 160, 166, 167, 172, 177, 182, 183, 187, 188, 197, 198, 204, 210, 211, 225, 230, 235, 240, 245, 246, 250, 265, 266, 275, 281, 289, 290, 292, 294, 301, 303, 305, 308, 316, 317, 327, 341, 342, 358, 359, 362, 366, 370, 375, 376, 383, 387, 388, 389, 390, 392, 393, 394, 395, 397, 399, 400, 401, 402, 405, 407, 408, 409, 411, 413, 414, 415, 417, 418, 420, 422, 423, 425, 427, 430, 431, 432, 433, 435, 436, 438, 439, 440, 441, 454, 455, 457, 459, 460, 464, 465, 467, 471, 472, 475, 479, 480, 481, 483, 487, 488, 490, 492, 496, 501, 503, 504, 506, 510, 512, 516, 524, 525, 526, 537, 538, 541, 547, 549, 552, 553, 666, 685, 689, 691, 692, 693, 694, 696, 704, 705, 710, 712, 715, 718, 720, 725, 727, 732, 733, 739, 746, 749, 754, 755, 756, 777, 779, 784, 785, 786, 791, 792, 793, 794, 798, 804, 812, 815, 818, 902, 905, 906, 907, 908, 909, 913, 964, 1355, 1357, 1358, 1360, 1361, 1362, 1363, 1364, 1365, 1366, 1367, 1368, 1369, 1371, 1372, 1373, 1374, 1375, 1376, 1377, 1378, 1379, 1380, 1381, 1382, 1383, 1384, 1385, 1386, 1387, 1388, 1389, 1390, 1391, 1392, 1393, 1394, 1395, 1397, 1399, 1400, 1401, 1403, 1404, 1405, 1406, 1407, 1408, 1410, 1411, 1412, 1413, 1414, 1415, 1416, 1417, 1418, 1419, 1421];
export const miscUnusualPool = [46, 50, 53, 54, 191, 260, 291, 343, 434, 470, 482, 707, 1356, 1396, 1398, 1402, 1409, 1420];
export const sniperVsSpyUnusualsPool = [62, 70, 124, 158, 178, 194, 1354, 1359, 1370];
export const eotlGlitchUnusualPool = [916, 917, 918];
export const nice2014UnusualPool = [929, 932, 933, 936, 939, 941, 942, 943, 945, 949, 953];
export const limitedLateSummerUnusualPool = [893];
// Unusual effect containers
const gen1FX = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];
const gen2FX = [28, 29, 30, 31, 32, 33, 34, 35];
const gen3FX = [55, 56, 57, 58, 59, 60, 61];
export const allGensFX = gen1FX.concat(gen2FX, gen3FX);
export const hw11FX = [36, 37, 38, 39]
export const hw12FX = hw11FX.concat([40, 41, 42, 43, 44]);
export const hw13FX = [62, 63, 64, 65, 66, 67, 68, 69];
export const hw14FX = [70, 71, 72, 73, 74, 75];
export const creepyCrateFx = hw12FX.concat(hw13FX, hw14FX);
export const hw15FX = [89, 90, 91, 92, 93, 94, 95];
export const hw16FX = [96, 97, 98, 99];
export const hw17FX = hw12FX.concat(hw13FX, hw14FX, hw15FX, hw16FX);
export const hw18FX = [100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110];
export const hw19FX = [111, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122];
export const hw20FX = [143, 144, 145, 146, 147, 148, 149, 150];
export const hw21FX = [174, 175, 176, 177, 178, 179, 180, 181, 182, 183, 184, 185, 186, 187, 188];
export const hw22FX = [233, 234, 235, 236, 237, 238, 239, 240, 241, 242, 243, 244];
export const hw23FX = [264, 265, 266, 267, 268, 269, 270, 271, 272, 273, 274, 275, 276];
const tauntFX = [15, 16, 17, 18, 19, 20, 21, 22, 23];
const oldWeaponFX = [24, 25, 26, 27];
const weaponFX = [24, 25, 26];
const roboFX = [45, 46, 47, 48, 49, 50, 51, 52, 53, 54];
const eotlFX = [76, 77, 78, 79];
const invasionFX = allGensFX.concat([80, 81, 82, 83, 84, 85, 86, 87, 88]);
export const xmas19FX = [123, 124, 125, 126, 127, 128, 129, 130, 131, 132, 133];
export const xmas20FX = [151, 152, 153, 154, 155, 156, 157, 158, 159, 160, 161, 162];
export const xmas21FX = [189, 190, 191, 192, 193, 194, 195, 196, 197, 198, 199, 200, 201, 202, 203, 204];
export const xmas22FX = [245, 246, 247, 248, 249, 250, 251];
export const xmas23FX = [277, 278, 279, 280, 281, 282, 283, 284, 285, 286, 287, 288];
const summer20FX = allGensFX.concat([134, 135, 136, 137, 138, 139, 140, 141, 142]);
const summer21FX = allGensFX.concat([163, 164, 165, 166, 167, 168, 169, 170, 171, 172, 173]);
const summer22FX = allGensFX.concat([205, 206, 207, 208, 209, 210, 211, 212, 213, 214, 215, 216, 217, 218, 219, 220, 221, 222, 223, 224, 225, 226, 227, 228, 229, 230, 231, 232]);
export const summer23FX = [252, 253, 254, 255, 256, 257, 258, 259, 260, 261, 262, 263];
export const summer24FX = [289, 290, 291, 292, 293, 294, 295, 296, 297, 298, 299, 300, 301, 302, 303, 304, 305, 306];
// Global bonus item list
export const globalBonusItemArray = [24, 7, 74, 762, 763, "paint", "strangepart", 15, 767, 768, 769];
// List of taunts used for unusualifiers
export const unusualifierArray = [75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 149, 920, 973, 974, 1033, 1611, 1612, 1613, 1614, 1615, 1616, 1617, 1618, 1619, 1620, 1621, 1622, 1623, 1624, 1625, 1626, 1627, 1628, 1629, 1630, 1631, 1632, 1633, 1634, 1635, 1636, 1637, 1638, 1639, 1640, 1641, 1642, 1643, 1644, 1645, 1646, 1699, 1700, 1701, 1702, 1703, 1704, 1705, 1706, 1763, 1764, 1765, 1766, 1767, 1788, 1789, 1790, 1854, 1855, 1856, 1857, 1858, 1882, 1883, 1884, 1920, 1921, 1922, 1923, 1924, 1925, 1955, 1956, 1957, 1958, 1982, 1983, 1984, 2008, 2009, 2010, 2011];
// List of paints used for bonus items
export const paintBonusArray = [8, 9, 16, 17, 37, 66, 105, 106, 107, 108, 109, 110, 112, 113, 114, 119, 125, 126, 127, 248, 249, 771, 820, 821, 822, 823, 824, 825, 826];
// List of strange parts used for bonus items
export const strangePartBonusArray = [256, 257, 258, 262, 263, 264, 269, 270, 272, 273, 274, 278, 279, 280, 298, 299, 300, 313, 314, 315, 367, 368, 369, 373, 374, 380, 381, 382, 446, 447, 453, 529, 530, 658, 659, 660, 663, 664, 665, 669, 670, 671, 760, 761, 833, 834, 961, 962, 963];
// List of Unlocked Creepy Crate bonus items
export const creepyCrateBonusArray = [
    { id: 1652, quality: 12 },
    { id: 1653, quality: 12 },
    { id: 1654, quality: 12 },
    { id: 1655, quality: 12 },
    { id: 1656, quality: 12 },
    { id: 1657, quality: 12 },
    { id: 1658, quality: 12 },
    { id: 1659, quality: 12 },
    { id: 1660, quality: 12 },
    { id: 1661, quality: 12 },
    { id: 1662, quality: 12 },
    { id: 1663, quality: 12 },
    { id: 1664, quality: 12 },
    { id: 1652, quality: 11 },
    { id: 1653, quality: 11 },
]
// Steam Market item whitelist
export const steamMarketWhitelist = [772, 773, 774, 775, 318, 212, 213, 214, 215, 216, 217, 218, 219, 220, 221, 345, 346, 347, 348, 349, 350, 351, 352, 353, 673, 674, 675, 676, 677, 678, 679, 680, 681, 922, 923, 924, 925, 926, 927, 928, 929, 930, 931, 932, 933, 934, 935, 936, 937, 938, 939, 940, 941, 942, 943, 944, 945, 946, 947, 948, 949, 950, 951, 952, 953, 954, 955, 956, 957, 889, 890, 891, 892, 893, 894, 895, 896, 897,];
// List of crates affected by specific Halloween events
export let halloweenModeCrateList = {};
halloweenModeCrateList.hw11 = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31];
halloweenModeCrateList.hw12 = halloweenModeCrateList.hw11.concat([32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48]);
halloweenModeCrateList.hw13 = halloweenModeCrateList.hw12.concat([49, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71]);
halloweenModeCrateList.hw14 = halloweenModeCrateList.hw13.concat([73, 74, 75, 76, 77, 78, 79, 80, 83, 84, 85, 86]);
halloweenModeCrateList.hw16 = halloweenModeCrateList.hw14.concat([96, 97, 98, 99, 100, 101, 104, 105, 106, 107, 110, 111, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122]);
halloweenModeCrateList.hw17 = [104, 105, 106, 107, 110, 111, 123, 124, 125, 126, 127];
halloweenModeCrateList.hw18 = halloweenModeCrateList.hw17.concat([132, 134]);
halloweenModeCrateList.hw19 = halloweenModeCrateList.hw18.concat([135, 137, 138]);
halloweenModeCrateList.xmas19 = halloweenModeCrateList.hw19.concat([139]);
halloweenModeCrateList.hw20 = halloweenModeCrateList.xmas19.concat([140, 142]);
halloweenModeCrateList.xmas20 = halloweenModeCrateList.hw20.concat([143]);
halloweenModeCrateList.hw21 = halloweenModeCrateList.xmas20.concat([145, 147]);
halloweenModeCrateList.xmas21 = halloweenModeCrateList.hw21.concat([148]);
halloweenModeCrateList.hw22 = halloweenModeCrateList.xmas21.concat([150, 151]);
halloweenModeCrateList.xmas22 = halloweenModeCrateList.hw22.concat([152]);
halloweenModeCrateList.summer23 = halloweenModeCrateList.xmas22.concat([154]);
halloweenModeCrateList.hw23 = halloweenModeCrateList.summer23.concat([155]);
halloweenModeCrateList.xmas23 = halloweenModeCrateList.hw23.concat([157]);
halloweenModeCrateList.summer24 = halloweenModeCrateList.xmas23.concat([158]);
// Crate array
export let cA = [
    new Crate({ id: 1, series: 1, effects: gen1FX, unusual: 1, autoChance: 2 }), /*  [0] */
    new Crate({ id: 1, series: 2, effects: gen1FX, unusual: 1 }),
    new Crate({ id: 1, series: 3, effects: gen1FX, unusual: 1 }),
    new Crate({ id: 1, series: 4, effects: gen1FX, unusual: 1 }),
    new Crate({ id: 1, series: 5, effects: gen1FX, unusual: 1 }),
    new Crate({ id: 2, series: 6, effects: gen1FX, unusual: 1 }), /* [5] */
    new Crate({ id: 1, series: 7, effects: gen1FX, unusual: 1 }),
    new Crate({ id: 1, series: 8, effects: gen1FX, unusual: 1 }),
    new Crate({ id: 1, series: 9, effects: gen1FX, unusual: 1 }),
    new Crate({ id: 1, series: 10, effects: gen1FX, unusual: 1 }),
    new Crate({ id: 1, series: 11, effects: gen1FX, unusual: 1 }), /*  [10] */
    new Crate({ id: 1, series: 12, effects: gen1FX, unusual: 1 }),
    new Crate({ id: 1, series: 13, effects: gen1FX, unusual: 1 }),
    new Crate({ id: 1, series: 14, effects: gen1FX, unusual: 1 }),
    new Crate({ id: 1, series: 15, effects: gen1FX, unusual: 1 }),
    new Crate({ id: 1, series: 16, effects: gen1FX, unusual: 1 }), /* [15] */
    new Crate({ id: 1, series: 17, effects: gen1FX, unusual: 1 }),
    new Crate({ id: 1, series: 18, effects: gen1FX, unusual: 1 }),
    new Crate({ id: 1, series: 19, effects: gen1FX, note: 1, unusual: 1 }),
    new Crate({ id: 1, series: 20, effects: gen1FX, note: 1, unusual: 1 }),
    new Crate({ id: 1, series: 21, effects: gen1FX, note: 1, unusual: 1 }), /*  [20] */
    new Crate({ id: 5, series: 22, effects: gen1FX, unusual: 1, autoChance: 2 }),
    new Crate({ id: 1, series: 23, effects: gen1FX, note: 1, unusual: 1 }),
    new Crate({ id: 1, series: 24, effects: gen1FX, note: 1, unusual: 1 }),
    new Crate({ id: 1, series: 25, effects: gen1FX, note: 1, unusual: 1 }),
    new Crate({ id: 1, series: 26, effects: gen2FX, note: 1, unusual: 1 }), /* [25] */
    new Crate({ id: 1, series: 27, effects: gen2FX, note: 1, unusual: 1 }),
    new Crate({ id: 1, series: 28, effects: gen2FX, note: 1, unusual: 1 }),
    new Crate({ id: 1, series: 29, effects: gen2FX, note: 1, unusual: 1 }),
    new Crate({ id: 6, series: 30, effects: gen2FX, note: 1, unusual: 1, autoChance: 2 }),
    new Crate({ id: 1, series: 31, effects: gen2FX, note: 1, unusual: 1 }), /*  [30] */
    new Crate({ id: 1, series: 32, effects: gen2FX, note: 1, unusual: 1 }),
    new Crate({ id: 1, series: 33, effects: gen2FX, note: 1, unusual: 1 }),
    new Crate({ id: 1, series: 34, effects: gen2FX, note: 1, unusual: 1 }),
    new Crate({ id: 7, series: 35, effects: gen2FX, note: 2, unusual: 1 }),
    new Crate({ id: 8, series: 36, effects: gen2FX, unusual: 1 }), /* [35] */
    new Crate({ id: 1, series: 37, effects: gen2FX, note: 1, unusual: 1 }),
    new Crate({ id: 1, series: 38, effects: gen2FX, note: 1, unusual: 1 }),
    new Crate({ id: 1, series: 39, effects: gen2FX, note: 1, unusual: 1 }),
    new Crate({ id: 6, series: 40, effects: gen2FX, note: 1, unusual: 1, autoChance: 2 }),
    new Crate({ id: 1, series: 41, effects: gen2FX, note: 1, unusual: 1 }), /*  [40] */
    new Crate({ id: 1, series: 42, effects: gen2FX, note: 1, unusual: 1 }),
    new Crate({ id: 1, series: 43, effects: gen2FX, note: 1, unusual: 1 }),
    new Crate({ id: 1, series: 44, effects: gen2FX, note: 1, unusual: 1 }),
    new Crate({ id: 1, series: 45, effects: gen2FX, note: 1, unusual: 1 }),
    new Crate({ id: 9, series: 46, effects: gen2FX, note: 1, unusual: 1 }), /* [45] */
    new Crate({ id: 1, series: 47, effects: gen2FX, note: 1, unusual: 1 }),
    new Crate({ id: 10, series: 48, effects: gen2FX, unusual: 1 }),
    new Crate({ id: 1, series: 49, effects: gen2FX, note: 1, unusual: 1 }),
    new Crate({ id: 6, series: 50, effects: gen2FX, note: 1, unusual: 1, autoChance: 2 }),
    new Crate({ id: 11, series: 51, effects: hw12FX, note: 3, unusual: 1, autoChance: 2 }), /*  [50] */
    new Crate({ id: 12, series: 52, effects: gen2FX, note: 2, unusual: 1, autoChance: 2 }),
    new Crate({ id: 13, series: 53, effects: gen2FX, unusual: 1, autoChance: 2 }),
    new Crate({ id: 1, series: 54, effects: gen2FX, note: 1, unusual: 1 }),
    new Crate({ id: 1, series: 55, effects: gen2FX, note: 1, unusual: 1 }),
    new Crate({ id: 1, series: 56, effects: gen2FX, note: 1, unusual: 1 }), /* [55] */
    new Crate({ id: 1, series: 57, effects: gen2FX, note: 1, unusual: 1 }),
    new Crate({ id: 14, series: 58, effects: roboFX, unusual: 1, autoChance: 2 }),
    new Crate({ id: 1, series: 59, effects: gen3FX, note: 1, unusual: 1 }),
    new Crate({ id: 15, series: 60, effects: gen3FX, note: 1, unusual: 1, autoChance: 2 }),
    new Crate({ id: 16, series: 61, effects: gen3FX, unusual: 1, autoChance: 2 }), /*  [60] */
    new Crate({ id: 17, series: 62, effects: gen3FX, unusual: 1, autoChance: 2 }),
    new Crate({ id: 18, series: 63, effects: gen3FX, unusual: 1, autoChance: 2 }),
    new Crate({ id: 19, series: 64, effects: gen3FX, unusual: 1, autoChance: 2 }),
    new Crate({ id: 20, series: 65, effects: gen3FX, unusual: 1, autoChance: 2 }),
    new Crate({ id: 21, series: 66, effects: gen3FX, unusual: 1, autoChance: 2 }), /* [65] */
    new Crate({ id: 22, series: 67, effects: gen3FX, unusual: 1, autoChance: 2 }),
    new Crate({ id: 23, series: 68, effects: gen3FX, unusual: 1, autoChance: 2 }),
    new Crate({ id: 24, series: 69, effects: gen3FX, unusual: 1, autoChance: 2 }),
    new Crate({ id: 1, series: 71, effects: gen3FX, note: 1, unusual: 1 }),
    new Crate({ id: 25, series: 72, effects: gen3FX, unusual: 1, autoChance: 2 }), /*  [70] */
    new Crate({ id: 26, series: 73, effects: gen3FX, unusual: 1, autoChance: 2 }),
    new Crate({ id: 27, series: 74, effects: hw13FX, unusual: 1, autoChance: 2 }),
    new Crate({ id: 1, series: 75, effects: gen3FX, note: 1, unusual: 1 }),
    new Crate({ id: 1, series: 76, effects: gen3FX, note: 1, unusual: 1 }),
    new Crate({ id: 1, series: 77, effects: gen3FX, note: 1, unusual: 1 }), /* [75] */
    new Crate({ id: 28, series: 78, effects: gen3FX, note: 2, unusual: 1, autoChance: 2 }),
    new Crate({ id: 29, series: 79, effects: gen3FX, unusual: 1, autoChance: 2 }),
    new Crate({ id: 30, series: 81, effects: gen3FX, unusual: 1, autoChance: 2 }),
    new Crate({ id: 31, series: 82, effects: gen3FX, unusual: 1 }),
    new Crate({ id: 31, series: 83, effects: gen3FX, note: 142, unusual: 1, autoChance: 2 }), /*  [80] */
    new Crate({ id: 3, series: 0, effects: tauntFX, note: 7, unusual: 3, autoChance: 2 }), /*  Mann Co. Audition Reel */
    new Crate({ id: 32, series: 0, note: 2, autoChance: 2 }), /*  Bread Box */
    new Crate({ id: 33, series: 0, effects: gen3FX, unusual: 1, autoChance: 2 }), /*  Mann Co. Stockpile Crate */
    new Crate({ id: 31, series: 84, effects: gen3FX, note: 142, unusual: 1, autoChance: 2 }),
    new Crate({ id: 31, series: 85, effects: gen3FX, unusual: 1 }), /* [85] */
    new Crate({ id: 43, series: 86, effects: gen3FX, note: 4, unusual: 1, autoChance: 2 }),
    new Crate({ id: 34, series: 0, effects: creepyCrateFx, note: 8, unusual: 1, autoChance: 2, creepyBonus: true }), /*  Unlocked Creepy Scout Crate */
    new Crate({ id: 35, series: 0, effects: creepyCrateFx, note: 8, unusual: 1, autoChance: 2, creepyBonus: true }), /*  Unlocked Creepy Soldier Crate */
    new Crate({ id: 36, series: 0, effects: creepyCrateFx, note: 8, unusual: 1, autoChance: 2, creepyBonus: true }), /*  Unlocked Creepy Pyro Crate */
    new Crate({ id: 37, series: 0, effects: creepyCrateFx, note: 8, unusual: 1, autoChance: 2, creepyBonus: true }), /*  Unlocked Creepy Demo Crate [90] */
    new Crate({ id: 38, series: 0, effects: creepyCrateFx, note: 8, unusual: 1, autoChance: 2, creepyBonus: true }), /*  Unlocked Creepy Heavy Crate */
    new Crate({ id: 39, series: 0, effects: creepyCrateFx, note: 8, unusual: 1, autoChance: 2, creepyBonus: true }), /*  Unlocked Creepy Engineer Crate */
    new Crate({ id: 40, series: 0, effects: creepyCrateFx, note: 8, unusual: 1, autoChance: 2, creepyBonus: true }), /*  Unlocked Creepy Medic Crate */
    new Crate({ id: 41, series: 0, effects: creepyCrateFx, note: 8, unusual: 1, autoChance: 2, creepyBonus: true }), /*  Unlocked Creepy Sniper Crate */
    new Crate({ id: 42, series: 0, effects: creepyCrateFx, note: 8, unusual: 1, autoChance: 2, creepyBonus: true }), /*  Unlocked Creepy Spy Crate [95] */
    new Crate({ id: 44, series: 87, effects: eotlFX, note: 2, unusual: 1, autoChance: 2 }),
    new Crate({ id: 45, series: 88, effects: allGensFX, note: 2, unusual: 1, autoChance: 2 }),
    new Crate({ id: 46, series: 89, effects: allGensFX, note: 4, unusual: 1, autoChance: 2 }),
    new Crate({ id: 31, series: 90, effects: allGensFX, note: 6, unusual: 1 }),
    new Crate({ id: 31, series: 91, effects: allGensFX, note: 142, unusual: 1, autoChance: 2 }), /*  [100] */
    new Crate({ id: 31, series: 92, effects: allGensFX, note: 1, unusual: 1 }),
    new Crate({ id: 4, series: 93, effects: oldWeaponFX, note: 5, unusual: 2, autoChance: 1, bonus: true }), /*  Concealed Killer Weapons Case */
    new Crate({ id: 47, series: 94, effects: oldWeaponFX, note: 5, unusual: 2, autoChance: 1, bonus: true }),
    new Crate({ id: 48, series: 95, effects: allGensFX, note: 5, unusual: 2, autoChance: 1, bonus: true }),
    new Crate({ id: 49, series: 96, effects: invasionFX, note: 5, unusual: 2, autoChance: 1, bonus: true }), /* [105] */
    new Crate({ id: 50, series: 97, effects: invasionFX, note: 5, unusual: 2, autoChance: 1, bonus: true }),
    new Crate({ id: 51, series: 98, effects: hw15FX, note: 5, unusual: 2, autoChance: 1, bonus: true }),
    new Crate({ id: 52, series: 99, effects: weaponFX, note: 5, unusual: 2, autoChance: 1, bonus: true }),
    new Crate({ id: 53, series: 100, effects: weaponFX, note: 5, unusual: 2, autoChance: 1, bonus: true }),
    new Crate({ id: 54, series: 101, effects: allGensFX, note: 5, unusual: 2, autoChance: 1, bonus: true }), /*  [110] */
    new Crate({ id: 55, series: 102, effects: allGensFX, note: 5, unusual: 2, autoChance: 1, bonus: true }),
    new Crate({ id: 31, series: 103, effects: allGensFX, note: 1, unusual: 1 }),
    new Crate({ id: 56, series: 104, effects: hw16FX.concat(allGensFX), note: 5, unusual: 2, autoChance: 1, bonus: true, exclusiveBonus: { loot: [827, 828, 829], chance: 5000 } }),
    new Crate({ id: 57, series: 105, effects: allGensFX, note: 5, unusual: 2, autoChance: 1, bonus: true, exclusiveBonus: { loot: [972], chance: 4000 }, oneExclusiveBonus: true }),
    new Crate({ id: 58, series: 106, effects: allGensFX, note: 5, unusual: 2, autoChance: 1, bonus: true }), /* [115] */
    new Crate({ id: 59, series: 107, effects: allGensFX, note: 5, unusual: 2, autoChance: 1, bonus: true }),
    new Crate({ id: 60, series: 108, effects: allGensFX, note: 5, unusual: 2, autoChance: 1, bonus: true }),
    new Crate({ id: 61, series: 109, effects: weaponFX, note: 5, unusual: 2, autoChance: 1, bonus: true }),
    new Crate({ id: 62, series: 110, effects: weaponFX, note: 5, unusual: 2, autoChance: 1, bonus: true }),
    new Crate({ id: 63, series: 111, autoChance: 1 }), /*  [120] */
    new Crate({ id: 64, series: 114, autoChance: 1 }),
    new Crate({ id: 65, series: 117, effects: allGensFX, note: 5, unusual: 2, autoChance: 1, bonus: true, exclusiveBonus: { loot: [972], chance: 4000 }, oneExclusiveBonus: true }),
    new Crate({ id: 66, series: 118, effects: weaponFX, note: 5, unusual: 2, autoChance: 1, bonus: true }),
    new Crate({ id: 67, series: 119, effects: allGensFX, note: 5, unusual: 2, autoChance: 1, bonus: true }),
    new Crate({ id: 68, series: 120, effects: hw18FX.concat(allGensFX), note: 5, unusual: 2, autoChance: 1, bonus: true, exclusiveBonus: { loot: [832, 835, 836, 837], chance: 5000 } }), /* [125] */
    new Crate({ id: 69, series: 121, effects: weaponFX, note: 5, unusual: 2, autoChance: 1, bonus: true }),
    new Crate({ id: 70, series: 122, effects: allGensFX, note: 5, unusual: 2, autoChance: 1, bonus: true, exclusiveBonus: { loot: [972], chance: 4000 }, oneExclusiveBonus: true }),
    new Crate({ id: 71, series: 123, effects: allGensFX, note: 5, unusual: 2, autoChance: 1, bonus: true }),
    new Crate({ id: 72, series: 0, effects: allGensFX, note: 5, unusual: 3, autoChance: 2 }),
    new Crate({ id: 73, series: 0, effects: allGensFX, note: 5, unusual: 3, autoChance: 2 }), /*  [130] */
    new Crate({ id: 74, series: 0, effects: allGensFX, note: 5, unusual: 3, autoChance: 2 }),
    new Crate({ id: 75, series: 0, effects: allGensFX, note: 5, unusual: 3, autoChance: 2 }),
    new Crate({ id: 76, series: 0, effects: allGensFX, note: 5, unusual: 3, autoChance: 2 }),
    new Crate({ id: 77, series: 0, effects: allGensFX, note: 5, unusual: 3, autoChance: 2 }),
    new Crate({ id: 78, series: 0, effects: allGensFX, note: 5, unusual: 3, autoChance: 2 }), /* [135] */
    new Crate({ id: 79, series: 0, effects: allGensFX, note: 5, unusual: 3, autoChance: 2 }),
    new Crate({ id: 80, series: 0, effects: allGensFX, note: 5, unusual: 3, autoChance: 2 }),
    new Crate({ id: 81, series: 0, effects: allGensFX, note: 5, unusual: 3, autoChance: 2 }),
    new Crate({ id: 82, series: 124, effects: hw19FX.concat(allGensFX), note: 5, unusual: 2, autoChance: 1, bonus: true, exclusiveBonus: { loot: [1647, 1648, 1649, 1650, 1651], chance: 5000 } }),
    new Crate({ id: 83, series: 125, effects: xmas19FX.concat(allGensFX), note: 5, unusual: 2, autoChance: 1, bonus: true, exclusiveBonus: { loot: [972], chance: 4000 }, oneExclusiveBonus: true }), /*  [140] */
    new Crate({ id: 84, series: 126, effects: weaponFX, note: 5, unusual: 2, autoChance: 1, bonus: true }),
    new Crate({ id: 85, series: 127, effects: summer20FX, note: 5, unusual: 2, autoChance: 1, bonus: true }),
    new Crate({ id: 86, series: 128, effects: hw20FX.concat(allGensFX), note: 5, unusual: 2, autoChance: 1, bonus: true, exclusiveBonus: { loot: [966, 967, 968, 969, 970, 971], chance: 5000 } }),
    new Crate({ id: 87, series: 129, effects: weaponFX, note: 5, unusual: 2, autoChance: 1, bonus: true }),
    new Crate({ id: 88, series: 130, effects: xmas20FX.concat(allGensFX), note: 5, unusual: 2, autoChance: 1, bonus: true, exclusiveBonus: { loot: [972], chance: 4000 }, oneExclusiveBonus: true }), /* [145] */
    new Crate({ id: 89, series: 131, effects: weaponFX, note: 5, unusual: 2, autoChance: 1, bonus: true }),
    new Crate({ id: 90, series: 132, effects: summer21FX, note: 5, unusual: 2, autoChance: 1, bonus: true }),
    new Crate({ id: 91, series: 133, effects: hw21FX.concat(allGensFX), note: 5, unusual: 2, autoChance: 1, bonus: true, exclusiveBonus: { loot: [1745, 1746, 1747, 1748, 1749], chance: 5000 } }),
    new Crate({ id: 92, series: 134, effects: weaponFX, note: 5, unusual: 2, autoChance: 1, bonus: true }),
    new Crate({ id: 93, series: 135, effects: xmas21FX.concat(allGensFX), note: 5, unusual: 2, autoChance: 1, bonus: true, exclusiveBonus: { loot: [972], chance: 4000 }, oneExclusiveBonus: true }), /* [150] */
    new Crate({ id: 94, series: 136, effects: summer22FX, note: 5, unusual: 2, autoChance: 1, bonus: true}),
    new Crate({ id: 95, series: 137, effects: hw22FX.concat(allGensFX), note: 5, unusual: 2, autoChance: 1, bonus: true, exclusiveBonus: { loot: [1838, 1839, 1840, 1841,1842], chance: 5000 } }),
    new Crate({ id: 96, series: 138, effects: weaponFX, note: 5, unusual: 2, autoChance: 1, bonus: true }), 
    new Crate({ id: 97, series: 139, effects: xmas22FX.concat(allGensFX), note: 5, unusual: 2, autoChance: 1, bonus: true, exclusiveBonus: { loot: [972], chance: 4000 }, oneExclusiveBonus: true }),
    new Crate({ id: 98, series: 140, effects: summer23FX.concat(allGensFX), note: 5, unusual: 2, autoChance: 1, bonus: true }), /* [155] */
    new Crate({ id: 99, series: 141, effects: weaponFX, note: 5, unusual: 2, autoChance: 1, bonus: true }), 
    new Crate({ id: 100, series: 142, effects: hw23FX.concat(allGensFX), note: 5, unusual: 2, autoChance: 1, bonus: true, exclusiveBonus: { loot: [1951, 1952, 1953, 1954], chance: 5000} }), 
    new Crate({ id: 101, series: 143, effects: xmas23FX, note: 5, unusual: 2, autoChance: 1, bonus: true, exclusiveBonus: { loot: [972], chance: 4000 }, oneExclusiveBonus: true }),
    new Crate({ id: 102, series: 144, effects: summer24FX, note: 5, unusual: 2, autoChance: 1, bonus: true }),

];
// This is the order the crates will show up in the menu
export let crateOrder = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 129, 130, 131, 132, 133, 134, 135, 136, 137, 138, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122, 123, 124, 125, 126, 127, 128, 139, 140, 141, 142, 143, 144, 145, 146, 147, 148, 149, 150, 151, 152, 153, 154, 155, 156, 157, 158, 159];
// Define loot for each crate
cA[0].loot = [
    new Item({ id: 1, quality: 1 }),
    new Item({ id: 2, quality: 1 }),
    new Item({ id: 3, quality: 1 }),
    new Item({ id: 4, quality: 1 }),
    new Item({ id: 5, quality: 1 }),
    new Item({ id: 6, quality: 1 }),
    new Item({ id: 7, quality: 1 }),
    new Item({ id: 8, quality: 1 }),
    new Item({ id: 9, quality: 1 })
];
cA[1].loot = [
    new Item({ id: 10, chance: 1350, quality: 1 }),
    new Item({ id: 11, chance: 1350, quality: 1 }),
    new Item({ id: 12, chance: 1350, quality: 1 }),
    new Item({ id: 13, chance: 900, quality: 1 }),
    new Item({ id: 14, chance: 900, quality: 1 }),
    new Item({ id: 15, chance: 1350, quality: 1 }),
    new Item({ id: 16, chance: 1350, quality: 1 }),
    new Item({ id: 17, chance: 1350, quality: 1 })
];
cA[2].loot = [
    new Item({ id: 18, chance: 1650, quality: 1 }),
    new Item({ id: 19, chance: 1650, quality: 1 }),
    new Item({ id: 20, chance: 1650, quality: 1 }),
    new Item({ id: 21, chance: 825, quality: 1 }),
    new Item({ id: 22, chance: 825, quality: 1 }),
    new Item({ id: 23, chance: 825, quality: 1 }),
    new Item({ id: 24, chance: 1650, quality: 1 }),
    new Item({ id: 9, chance: 825, quality: 1 })
];
cA[3].loot = [
    new Item({ id: 25, chance: 1650, quality: 1 }),
    new Item({ id: 26, chance: 1650, quality: 1 }),
    new Item({ id: 27, chance: 1650, quality: 1 }),
    new Item({ id: 28, chance: 825, quality: 1 }),
    new Item({ id: 29, chance: 825, quality: 1 }),
    new Item({ id: 30, chance: 825, quality: 1 }),
    new Item({ id: 8, chance: 1650, quality: 1 }),
    new Item({ id: 15, chance: 825, quality: 1 })
];
cA[4].loot = [
    new Item({ id: 7, chance: 1350, quality: 1 }),
    new Item({ id: 31, chance: 1800, quality: 1 }),
    new Item({ id: 32, chance: 1800, quality: 1 }),
    new Item({ id: 33, chance: 1800, quality: 1 }),
    new Item({ id: 34, chance: 450, quality: 1 }),
    new Item({ id: 35, chance: 450, quality: 1 }),
    new Item({ id: 36, chance: 450, quality: 1 }),
    new Item({ id: 30, chance: 450, quality: 1 }),
    new Item({ id: 37, chance: 1350, quality: 1 })
];
cA[5].loot = [
    new Item({ id: 38, chance: 1340, quality: 1 }),
    new Item({ id: 39, chance: 1340, quality: 1 }),
    new Item({ id: 40, chance: 1340, quality: 1 }),
    new Item({ id: 41, chance: 1340, quality: 1 }),
    new Item({ id: 42, chance: 1340, quality: 1 }),
    new Item({ id: 43, chance: 200, quality: 1 }),
    new Item({ id: 44, chance: 200, quality: 1 }),
    new Item({ id: 45, chance: 200, quality: 1 }),
    new Item({ id: 46, chance: 200, quality: 1 }),
    new Item({ id: 47, chance: 200, quality: 1 }),
    new Item({ id: 48, chance: 200, quality: 1 }),
    new Item({ id: 49, chance: 200, quality: 1 }),
    new Item({ id: 50, chance: 200, quality: 1 }),
    new Item({ id: 51, chance: 200, quality: 1 }),
    new Item({ id: 52, chance: 200, quality: 1 }),
    new Item({ id: 53, chance: 200, quality: 1 }),
    new Item({ id: 54, chance: 200, quality: 1 }),
    new Item({ id: 55, chance: 200, quality: 1 }),
    new Item({ id: 56, chance: 200, quality: 1 }),
    new Item({ id: 57, chance: 200, quality: 1 }),
    new Item({ id: 58, chance: 200, quality: 1 })
];
cA[6].loot = [
    new Item({ id: 59, chance: 1700, quality: 1 }),
    new Item({ id: 60, chance: 1700, quality: 1 }),
    new Item({ id: 18, chance: 1700, quality: 1 }),
    new Item({ id: 62, chance: 350, quality: 1 }),
    new Item({ id: 63, chance: 350, quality: 1 }),
    new Item({ id: 64, chance: 350, quality: 1 }),
    new Item({ id: 65, chance: 350, quality: 1 }),
    new Item({ id: 24, chance: 1700, quality: 1 }),
    new Item({ id: 66, chance: 1700, quality: 1 })
];
cA[7].loot = [
    new Item({ id: 67, chance: 1700, quality: 1 }),
    new Item({ id: 68, chance: 1700, quality: 1 }),
    new Item({ id: 69, chance: 1700, quality: 1 }),
    new Item({ id: 70, chance: 350, quality: 1 }),
    new Item({ id: 71, chance: 350, quality: 1 }),
    new Item({ id: 72, chance: 350, quality: 1 }),
    new Item({ id: 73, chance: 350, quality: 1 }),
    new Item({ id: 15, chance: 1700, quality: 1 }),
    new Item({ id: 74, chance: 1700, quality: 1 })
];
cA[8].loot = [
    new Item({ id: 105, chance: 1600, quality: 1 }),
    new Item({ id: 106, chance: 1600, quality: 1 }),
    new Item({ id: 107, chance: 1600, quality: 1 }),
    new Item({ id: 108, chance: 1600, quality: 1 }),
    new Item({ id: 109, chance: 1600, quality: 1 }),
    new Item({ id: 110, chance: 1600, quality: 1 }),
    new Item({ id: 111, chance: 300, quality: 1 })
];
cA[9].loot = [
    new Item({ id: 112, chance: 1700, quality: 1 }),
    new Item({ id: 113, chance: 1700, quality: 1 }),
    new Item({ id: 114, chance: 1700, quality: 1 }),
    new Item({ id: 115, chance: 1450, quality: 1 }),
    new Item({ id: 116, chance: 1450, quality: 1 }),
    new Item({ id: 117, chance: 634, quality: 1 }),
    new Item({ id: 118, chance: 633, quality: 1 }),
    new Item({ id: 62, chance: 633, quality: 1 })
];
cA[10].loot = [
    new Item({ id: 37, chance: 1700, quality: 1 }),
    new Item({ id: 16, chance: 1700, quality: 1 }),
    new Item({ id: 119, chance: 1700, quality: 1 }),
    new Item({ id: 120, chance: 1450, quality: 1 }),
    new Item({ id: 121, chance: 1450, quality: 1 }),
    new Item({ id: 122, chance: 634, quality: 1 }),
    new Item({ id: 123, chance: 633, quality: 1 }),
    new Item({ id: 124, chance: 633, quality: 1 })
];
cA[11].loot = [
    new Item({ id: 125, chance: 1700, quality: 1 }),
    new Item({ id: 126, chance: 1700, quality: 1 }),
    new Item({ id: 127, chance: 1700, quality: 1 }),
    new Item({ id: 128, chance: 1450, quality: 1 }),
    new Item({ id: 129, chance: 1450, quality: 1 }),
    new Item({ id: 130, chance: 634, quality: 1 }),
    new Item({ id: 131, chance: 633, quality: 1 }),
    new Item({ id: 49, chance: 633, quality: 1 })
];
cA[12].loot = [
    new Item({ id: 8, chance: 1700, quality: 1 }),
    new Item({ id: 105, chance: 1700, quality: 1 }),
    new Item({ id: 106, chance: 1700, quality: 1 }),
    new Item({ id: 132, chance: 1450, quality: 1 }),
    new Item({ id: 18, chance: 1450, quality: 1 }),
    new Item({ id: 133, chance: 634, quality: 1 }),
    new Item({ id: 134, chance: 633, quality: 1 }),
    new Item({ id: 135, chance: 633, quality: 1 })
];
cA[13].loot = [
    new Item({ id: 9, chance: 1700, quality: 1 }),
    new Item({ id: 107, chance: 1700, quality: 1 }),
    new Item({ id: 108, chance: 1700, quality: 1 }),
    new Item({ id: 12, chance: 1450, quality: 1 }),
    new Item({ id: 27, chance: 1450, quality: 1 }),
    new Item({ id: 73, chance: 634, quality: 1 }),
    new Item({ id: 136, chance: 633, quality: 1 }),
    new Item({ id: 44, chance: 633, quality: 1 })
];
cA[14].loot = [
    new Item({ id: 66, chance: 1700, quality: 1 }),
    new Item({ id: 109, chance: 1700, quality: 1 }),
    new Item({ id: 110, chance: 1700, quality: 1 }),
    new Item({ id: 10, chance: 1450, quality: 1 }),
    new Item({ id: 25, chance: 1450, quality: 1 }),
    new Item({ id: 111, chance: 634, quality: 1 }),
    new Item({ id: 46, chance: 633, quality: 1 }),
    new Item({ id: 137, chance: 633, quality: 1 })
];
cA[15].loot = [
    new Item({ id: 112, chance: 1700, quality: 1 }),
    new Item({ id: 37, chance: 1700, quality: 1 }),
    new Item({ id: 125, chance: 1700, quality: 1 }),
    new Item({ id: 11, chance: 1450, quality: 1 }),
    new Item({ id: 138, chance: 1450, quality: 1 }),
    new Item({ id: 65, chance: 634, quality: 1 }),
    new Item({ id: 57, chance: 633, quality: 1 }),
    new Item({ id: 28, chance: 633, quality: 1 })
];
cA[16].loot = [
    new Item({ id: 113, chance: 1700, quality: 1 }),
    new Item({ id: 16, chance: 1700, quality: 1 }),
    new Item({ id: 126, chance: 1700, quality: 1 }),
    new Item({ id: 139, chance: 1450, quality: 1 }),
    new Item({ id: 31, chance: 1450, quality: 1 }),
    new Item({ id: 140, chance: 634, quality: 1 }),
    new Item({ id: 51, chance: 633, quality: 1 }),
    new Item({ id: 53, chance: 633, quality: 1 })
];
cA[17].loot = [
    new Item({ id: 114, chance: 1700, quality: 1 }),
    new Item({ id: 119, chance: 1700, quality: 1 }),
    new Item({ id: 127, chance: 1700, quality: 1 }),
    new Item({ id: 141, chance: 1450, quality: 1 }),
    new Item({ id: 2, chance: 1450, quality: 1 }),
    new Item({ id: 142, chance: 634, quality: 1 }),
    new Item({ id: 47, chance: 633, quality: 1 }),
    new Item({ id: 143, chance: 633, quality: 1 })
];
cA[18].loot = [
    new Item({ id: 59, chance: 2100, quality: 2 }),
    new Item({ id: 144, chance: 2100, quality: 2 }),
    new Item({ id: 145, chance: 2100, quality: 2 }),
    new Item({ id: 146, chance: 2100, quality: 2 }),
    new Item({ id: 147, chance: 500, quality: 1 }),
    new Item({ id: 148, chance: 500, quality: 1 }),
    new Item({ id: 149, chance: 500, quality: 1 })
];
cA[19].loot = [
    new Item({ id: 150, chance: 2225, quality: 2 }),
    new Item({ id: 26, chance: 2225, quality: 2 }),
    new Item({ id: 151, chance: 2225, quality: 2 }),
    new Item({ id: 60, chance: 2225, quality: 2 }),
    new Item({ id: 152, chance: 500, quality: 1 }),
    new Item({ id: 153, chance: 500, quality: 1 })
];
cA[20].loot = [
    new Item({ id: 154, chance: 2225, quality: 2 }),
    new Item({ id: 151, chance: 2225, quality: 2 }),
    new Item({ id: 155, chance: 2225, quality: 2 }),
    new Item({ id: 156, chance: 2225, quality: 2 }),
    new Item({ id: 157, chance: 500, quality: 1 }),
    new Item({ id: 158, chance: 500, quality: 1 })
];
cA[21].loot = [
    new Item({ id: 159, quality: 1 }),
    new Item({ id: 160, quality: 1 }),
    new Item({ id: 161, quality: 1 }),
    new Item({ id: 162, quality: 1 }),
    new Item({ id: 163, quality: 1 }),
    new Item({ id: 164, quality: 1 }),
    new Item({ id: 165, quality: 1 }),
    new Item({ id: 166, quality: 1 }),
    new Item({ id: 167, quality: 1 })
];
cA[22].loot = [
    new Item({ id: 168, chance: 2250, quality: 2 }),
    new Item({ id: 169, chance: 2250, quality: 2 }),
    new Item({ id: 170, chance: 2250, quality: 2 }),
    new Item({ id: 171, chance: 2250, quality: 2 }),
    new Item({ id: 172, chance: 450, quality: 1 }),
    new Item({ id: 65, chance: 450, quality: 1 })
];
cA[23].loot = [
    new Item({ id: 173, chance: 2250, quality: 2 }),
    new Item({ id: 174, chance: 2250, quality: 2 }),
    new Item({ id: 175, chance: 2250, quality: 2 }),
    new Item({ id: 176, chance: 2250, quality: 2 }),
    new Item({ id: 177, chance: 450, quality: 1 }),
    new Item({ id: 178, chance: 450, quality: 1 })
];
cA[24].loot = [
    new Item({ id: 179, chance: 2250, quality: 2 }),
    new Item({ id: 180, chance: 2250, quality: 2 }),
    new Item({ id: 31, chance: 2250, quality: 2 }),
    new Item({ id: 181, chance: 2250, quality: 2 }),
    new Item({ id: 182, chance: 450, quality: 1 }),
    new Item({ id: 183, chance: 450, quality: 1 })
];
cA[25].loot = [
    new Item({ id: 184, chance: 2250, quality: 2 }),
    new Item({ id: 120, chance: 2250, quality: 2 }),
    new Item({ id: 185, chance: 2250, quality: 2 }),
    new Item({ id: 186, chance: 2250, quality: 2 }),
    new Item({ id: 187, chance: 450, quality: 1 }),
    new Item({ id: 188, chance: 450, quality: 1 })
];
cA[26].loot = [
    new Item({ id: 189, chance: 2250, quality: 2 }),
    new Item({ id: 132, chance: 2250, quality: 2 }),
    new Item({ id: 18, chance: 2250, quality: 2 }),
    new Item({ id: 190, chance: 2250, quality: 2 }),
    new Item({ id: 56, chance: 450, quality: 1 }),
    new Item({ id: 191, chance: 450, quality: 1 })
];
cA[27].loot = [
    new Item({ id: 151, chance: 2250, quality: 2 }),
    new Item({ id: 192, chance: 2250, quality: 2 }),
    new Item({ id: 38, chance: 2250, quality: 2 }),
    new Item({ id: 193, chance: 2250, quality: 2 }),
    new Item({ id: 35, chance: 450, quality: 1 }),
    new Item({ id: 194, chance: 450, quality: 1 })
];
cA[28].loot = [
    new Item({ id: 195, chance: 2250, quality: 2 }),
    new Item({ id: 10, chance: 2250, quality: 2 }),
    new Item({ id: 196, chance: 2250, quality: 2 }),
    new Item({ id: 146, chance: 2250, quality: 2 }),
    new Item({ id: 197, chance: 450, quality: 1 }),
    new Item({ id: 198, chance: 450, quality: 1 })
];
cA[29].loot = [
    new Item({ id: 115, quality: 2 }),
    new Item({ id: 199, quality: 2 }),
    new Item({ id: 200, quality: 2 }),
    new Item({ id: 2, quality: 2 }),
    new Item({ id: 201, quality: 2 })
];
cA[30].loot = [
    new Item({ id: 138, chance: 2250, quality: 2 }),
    new Item({ id: 202, chance: 2250, quality: 2 }),
    new Item({ id: 203, chance: 2250, quality: 2 }),
    new Item({ id: 139, chance: 2250, quality: 2 }),
    new Item({ id: 204, chance: 450, quality: 1 }),
    new Item({ id: 58, chance: 450, quality: 1 })
];
cA[31].loot = [
    new Item({ id: 128, chance: 2250, quality: 2 }),
    new Item({ id: 205, chance: 2250, quality: 2 }),
    new Item({ id: 12, chance: 2250, quality: 2 }),
    new Item({ id: 3, chance: 2250, quality: 2 }),
    new Item({ id: 53, chance: 450, quality: 1 }),
    new Item({ id: 48, chance: 450, quality: 1 })
];
cA[32].loot = [
    new Item({ id: 206, chance: 2250, quality: 2 }),
    new Item({ id: 207, chance: 2250, quality: 2 }),
    new Item({ id: 121, chance: 2250, quality: 2 }),
    new Item({ id: 27, chance: 2250, quality: 2 }),
    new Item({ id: 52, chance: 450, quality: 1 }),
    new Item({ id: 58, chance: 450, quality: 1 })
];
cA[33].loot = [
    new Item({ id: 208, chance: 2250, quality: 2 }),
    new Item({ id: 209, chance: 2250, quality: 2 }),
    new Item({ id: 33, chance: 2250, quality: 2 }),
    new Item({ id: 4, chance: 2250, quality: 2 }),
    new Item({ id: 210, chance: 450, quality: 1 }),
    new Item({ id: 211, chance: 450, quality: 1 })
];
cA[34].loot = [
    new Item({ id: 212, chance: 1042, quality: 4 }),
    new Item({ id: 213, chance: 522, quality: 4 }),
    new Item({ id: 214, chance: 1042, quality: 4 }),
    new Item({ id: 215, chance: 1042, quality: 4 }),
    new Item({ id: 216, chance: 1042, quality: 4 }),
    new Item({ id: 217, chance: 1042, quality: 4 }),
    new Item({ id: 218, chance: 1042, quality: 4 }),
    new Item({ id: 219, chance: 1042, quality: 4 }),
    new Item({ id: 220, chance: 1042, quality: 4 }),
    new Item({ id: 221, chance: 1042, quality: 4 })
];
cA[35].loot = [
    new Item({ id: 222, chance: 1742, quality: 1 }),
    new Item({ id: 223, chance: 1742, quality: 1 }),
    new Item({ id: 224, chance: 1741, quality: 1 }),
    new Item({ id: 225, chance: 425, quality: 1 }),
    new Item({ id: 226, chance: 425, quality: 1 }),
    new Item({ id: 227, chance: 425, quality: 1 }),
    new Item({ id: 228, chance: 425, quality: 1 }),
    new Item({ id: 229, chance: 425, quality: 1 }),
    new Item({ id: 230, chance: 425, quality: 1 }),
    new Item({ id: 231, chance: 425, quality: 1 }),
    new Item({ id: 232, chance: 425, quality: 1 }),
    new Item({ id: 233, chance: 425, quality: 1 }),
    new Item({ id: 234, chance: 425, quality: 1 }),
    new Item({ id: 235, chance: 425, quality: 1 })
];
cA[36].loot = [
    new Item({ id: 236, chance: 2250, quality: 2 }),
    new Item({ id: 237, chance: 2250, quality: 2 }),
    new Item({ id: 238, chance: 2250, quality: 2 }),
    new Item({ id: 239, chance: 2250, quality: 2 }),
    new Item({ id: 240, chance: 450, quality: 1 }),
    new Item({ id: 177, chance: 450, quality: 1 })
];
cA[37].loot = [
    new Item({ id: 241, chance: 2250, quality: 2 }),
    new Item({ id: 242, chance: 2250, quality: 2 }),
    new Item({ id: 243, chance: 2250, quality: 2 }),
    new Item({ id: 244, chance: 2250, quality: 2 }),
    new Item({ id: 245, chance: 450, quality: 1 }),
    new Item({ id: 246, chance: 450, quality: 1 })
];
cA[38].loot = [
    new Item({ id: 116, chance: 2357, quality: 2 }),
    new Item({ id: 247, chance: 2357, quality: 2 }),
    new Item({ id: 175, chance: 2357, quality: 2 }),
    new Item({ id: 248, chance: 943, quality: 1 }),
    new Item({ id: 249, chance: 943, quality: 1 }),
    new Item({ id: 250, chance: 472, quality: 1 }),
    new Item({ id: 34, chance: 471, quality: 1 })
];
cA[39].loot = [
    new Item({ id: 223, quality: 2 }),
    new Item({ id: 69, quality: 2 }),
    new Item({ id: 251, quality: 2 }),
    new Item({ id: 252, quality: 2 }),
    new Item({ id: 253, quality: 2 })
];
cA[40].loot = [
    new Item({ id: 254, chance: 1980, quality: 2 }),
    new Item({ id: 60, chance: 1980, quality: 2 }),
    new Item({ id: 255, chance: 1980, quality: 2 }),
    new Item({ id: 256, chance: 990, quality: 1 }),
    new Item({ id: 257, chance: 990, quality: 1 }),
    new Item({ id: 258, chance: 990, quality: 1 }),
    new Item({ id: 259, chance: 495, quality: 1 }),
    new Item({ id: 260, chance: 495, quality: 1 })
];
cA[41].loot = [
    new Item({ id: 261, chance: 1980, quality: 2 }),
    new Item({ id: 41, chance: 1980, quality: 2 }),
    new Item({ id: 169, chance: 1980, quality: 2 }),
    new Item({ id: 262, chance: 990, quality: 1 }),
    new Item({ id: 263, chance: 990, quality: 1 }),
    new Item({ id: 264, chance: 990, quality: 1 }),
    new Item({ id: 265, chance: 495, quality: 1 }),
    new Item({ id: 266, chance: 495, quality: 1 })
];
cA[42].loot = [
    new Item({ id: 267, chance: 2200, quality: 2 }),
    new Item({ id: 268, chance: 2200, quality: 2 }),
    new Item({ id: 11, chance: 2200, quality: 2 }),
    new Item({ id: 269, chance: 1100, quality: 1 }),
    new Item({ id: 270, chance: 1100, quality: 1 }),
    new Item({ id: 122, chance: 550, quality: 1 }),
    new Item({ id: 49, chance: 550, quality: 1 })
];
cA[43].loot = [
    new Item({ id: 150, chance: 1980, quality: 2 }),
    new Item({ id: 271, chance: 1980, quality: 2 }),
    new Item({ id: 3, chance: 1980, quality: 2 }),
    new Item({ id: 272, chance: 990, quality: 1 }),
    new Item({ id: 273, chance: 990, quality: 1 }),
    new Item({ id: 274, chance: 990, quality: 1 }),
    new Item({ id: 275, chance: 495, quality: 1 }),
    new Item({ id: 23, chance: 495, quality: 1 })
];
cA[44].loot = [
    new Item({ id: 145, chance: 1980, quality: 2 }),
    new Item({ id: 276, chance: 1980, quality: 2 }),
    new Item({ id: 277, chance: 1980, quality: 2 }),
    new Item({ id: 278, chance: 990, quality: 1 }),
    new Item({ id: 279, chance: 990, quality: 1 }),
    new Item({ id: 280, chance: 990, quality: 1 }),
    new Item({ id: 281, chance: 495, quality: 1 }),
    new Item({ id: 64, chance: 495, quality: 1 })
];
cA[45].loot = [
    new Item({ id: 282, chance: 1250, quality: 2 }),
    new Item({ id: 283, chance: 1250, quality: 2 }),
    new Item({ id: 284, chance: 600, quality: 1 }),
    new Item({ id: 285, chance: 600, quality: 1 }),
    new Item({ id: 286, chance: 600, quality: 1 }),
    new Item({ id: 287, chance: 600, quality: 1 }),
    new Item({ id: 288, chance: 600, quality: 1 }),
    new Item({ id: 289, chance: 600, quality: 1 }),
    new Item({ id: 290, chance: 600, quality: 1 }),
    new Item({ id: 291, chance: 600, quality: 1 }),
    new Item({ id: 292, chance: 600, quality: 1 }),
    new Item({ id: 293, chance: 600, quality: 1 }),
    new Item({ id: 294, chance: 600, quality: 1 }),
    new Item({ id: 295, chance: 400, quality: 1 }),
    new Item({ id: 296, chance: 400, quality: 1 })
];
cA[46].loot = [
    new Item({ id: 67, chance: 1980, quality: 2 }),
    new Item({ id: 179, chance: 1980, quality: 2 }),
    new Item({ id: 297, chance: 1980, quality: 2 }),
    new Item({ id: 298, chance: 990, quality: 1 }),
    new Item({ id: 299, chance: 990, quality: 1 }),
    new Item({ id: 300, chance: 990, quality: 1 }),
    new Item({ id: 301, chance: 495, quality: 1 }),
    new Item({ id: 134, chance: 495, quality: 1 })
];
cA[47].loot = [
    new Item({ id: 302, chance: 1050, quality: 1 }),
    new Item({ id: 303, chance: 1050, quality: 1 }),
    new Item({ id: 304, chance: 1050, quality: 1 }),
    new Item({ id: 305, chance: 1050, quality: 1 }),
    new Item({ id: 306, chance: 1050, quality: 1 }),
    new Item({ id: 307, chance: 1050, quality: 1 }),
    new Item({ id: 308, chance: 1050, quality: 1 }),
    new Item({ id: 309, chance: 1050, quality: 1 }),
    new Item({ id: 310, chance: 1050, quality: 1 }),
    new Item({ id: 311, chance: 450, quality: 1 })
];
cA[48].loot = [
    new Item({ id: 20, chance: 1980, quality: 2 }),
    new Item({ id: 312, chance: 1980, quality: 2 }),
    new Item({ id: 170, chance: 1980, quality: 2 }),
    new Item({ id: 313, chance: 990, quality: 1 }),
    new Item({ id: 314, chance: 990, quality: 1 }),
    new Item({ id: 315, chance: 990, quality: 1 }),
    new Item({ id: 316, chance: 495, quality: 1 }),
    new Item({ id: 317, chance: 495, quality: 1 })
];
cA[49].loot = [
    new Item({ id: 318, quality: 1 }),
    new Item({ id: 319, quality: 2 }),
    new Item({ id: 320, quality: 2 }),
    new Item({ id: 321, quality: 2 }),
    new Item({ id: 322, quality: 2 })
];
cA[50].loot = [
    new Item({ id: 323, quality: 3 }),
    new Item({ id: 324, quality: 3 }),
    new Item({ id: 325, quality: 3 }),
    new Item({ id: 326, quality: 3 }),
    new Item({ id: 327, quality: 3 }),
    new Item({ id: 328, quality: 3 }),
    new Item({ id: 329, quality: 3 }),
    new Item({ id: 330, quality: 3 }),
    new Item({ id: 331, quality: 3 }),
    new Item({ id: 332, quality: 3 }),
    new Item({ id: 333, quality: 3 }),
    new Item({ id: 334, quality: 3 }),
    new Item({ id: 335, quality: 3 }),
    new Item({ id: 336, quality: 3 }),
    new Item({ id: 337, quality: 3 }),
    new Item({ id: 338, quality: 3 }),
    new Item({ id: 339, quality: 3 }),
    new Item({ id: 340, quality: 3 }),
    new Item({ id: 341, quality: 3 }),
    new Item({ id: 342, quality: 3 }),
    new Item({ id: 343, quality: 3 }),
    new Item({ id: 344, quality: 3 })
];
cA[51].loot = [
    new Item({ id: 345, quality: 4 }),
    new Item({ id: 346, quality: 4 }),
    new Item({ id: 347, quality: 4 }),
    new Item({ id: 348, quality: 4 }),
    new Item({ id: 349, quality: 4 }),
    new Item({ id: 350, quality: 4 }),
    new Item({ id: 351, quality: 4 }),
    new Item({ id: 352, quality: 4 }),
    new Item({ id: 353, quality: 4 })
];
cA[52].loot = [
    new Item({ id: 354, quality: 1 }),
    new Item({ id: 355, quality: 1 }),
    new Item({ id: 356, quality: 1 }),
    new Item({ id: 357, quality: 1 }),
    new Item({ id: 358, quality: 1 }),
    new Item({ id: 359, quality: 1 }),
    new Item({ id: 360, quality: 1 }),
    new Item({ id: 361, quality: 1 }),
    new Item({ id: 362, quality: 1 }),
    new Item({ id: 363, quality: 1 }),
    new Item({ id: 364, quality: 1 }),
    new Item({ id: 365, quality: 1 }),
    new Item({ id: 366, quality: 1 })
];
cA[53].loot = [
    new Item({ id: 222, chance: 1980, quality: 2 }),
    new Item({ id: 224, chance: 1980, quality: 2 }),
    new Item({ id: 189, chance: 1980, quality: 2 }),
    new Item({ id: 367, chance: 990, quality: 1 }),
    new Item({ id: 368, chance: 990, quality: 1 }),
    new Item({ id: 369, chance: 990, quality: 1 }),
    new Item({ id: 370, chance: 495, quality: 1 }),
    new Item({ id: 371, chance: 495, quality: 1 })
];
cA[54].loot = [
    new Item({ id: 372, chance: 1980, quality: 2 }),
    new Item({ id: 26, chance: 1980, quality: 2 }),
    new Item({ id: 186, chance: 1980, quality: 2 }),
    new Item({ id: 373, chance: 990, quality: 1 }),
    new Item({ id: 374, chance: 990, quality: 1 }),
    new Item({ id: 257, chance: 990, quality: 1 }),
    new Item({ id: 375, chance: 495, quality: 1 }),
    new Item({ id: 376, chance: 495, quality: 1 })
];
cA[55].loot = [
    new Item({ id: 377, chance: 1980, quality: 2 }),
    new Item({ id: 378, chance: 1980, quality: 2 }),
    new Item({ id: 379, chance: 1980, quality: 2 }),
    new Item({ id: 380, chance: 990, quality: 1 }),
    new Item({ id: 381, chance: 990, quality: 1 }),
    new Item({ id: 382, chance: 990, quality: 1 }),
    new Item({ id: 211, chance: 495, quality: 1 }),
    new Item({ id: 383, chance: 495, quality: 1 })
];
cA[56].loot = [
    new Item({ id: 40, chance: 2200, quality: 2 }),
    new Item({ id: 384, chance: 2200, quality: 2 }),
    new Item({ id: 190, chance: 2200, quality: 2 }),
    new Item({ id: 385, chance: 1100, quality: 1 }),
    new Item({ id: 167, chance: 1100, quality: 1 }),
    new Item({ id: 44, chance: 1100, quality: 1 })
];
cA[57].loot = [
    new Item({ id: 386, quality: 1 }),
    new Item({ id: 387, quality: 1 }),
    new Item({ id: 388, quality: 1 }),
    new Item({ id: 389, quality: 1 }),
    new Item({ id: 390, quality: 1 }),
    new Item({ id: 391, quality: 1 }),
    new Item({ id: 392, quality: 1 }),
    new Item({ id: 393, quality: 1 }),
    new Item({ id: 394, quality: 1 }),
    new Item({ id: 395, quality: 1 }),
    new Item({ id: 396, quality: 1 }),
    new Item({ id: 397, quality: 1 }),
    new Item({ id: 398, quality: 1 }),
    new Item({ id: 399, quality: 1 }),
    new Item({ id: 400, quality: 1 }),
    new Item({ id: 401, quality: 1 }),
    new Item({ id: 402, quality: 1 }),
    new Item({ id: 403, quality: 1 }),
    new Item({ id: 404, quality: 1 }),
    new Item({ id: 405, quality: 1 }),
    new Item({ id: 406, quality: 1 }),
    new Item({ id: 407, quality: 1 }),
    new Item({ id: 408, quality: 1 }),
    new Item({ id: 409, quality: 1 }),
    new Item({ id: 410, quality: 1 }),
    new Item({ id: 411, quality: 1 }),
    new Item({ id: 412, quality: 1 }),
    new Item({ id: 413, quality: 1 }),
    new Item({ id: 414, quality: 1 }),
    new Item({ id: 415, quality: 1 }),
    new Item({ id: 416, quality: 1 }),
    new Item({ id: 417, quality: 1 }),
    new Item({ id: 418, quality: 1 }),
    new Item({ id: 419, quality: 1 }),
    new Item({ id: 420, quality: 1 }),
    new Item({ id: 421, quality: 1 }),
    new Item({ id: 422, quality: 1 }),
    new Item({ id: 423, quality: 1 }),
    new Item({ id: 424, quality: 1 }),
    new Item({ id: 425, quality: 1 }),
    new Item({ id: 426, quality: 1 }),
    new Item({ id: 427, quality: 1 }),
    new Item({ id: 428, quality: 1 }),
    new Item({ id: 429, quality: 1 }),
    new Item({ id: 430, quality: 1 }),
    new Item({ id: 431, quality: 1 }),
    new Item({ id: 432, quality: 1 }),
    new Item({ id: 433, quality: 1 }),
    new Item({ id: 434, quality: 1 }),
    new Item({ id: 435, quality: 1 }),
    new Item({ id: 436, quality: 1 }),
    new Item({ id: 437, quality: 1 }),
    new Item({ id: 438, quality: 1 }),
    new Item({ id: 439, quality: 1 }),
    new Item({ id: 440, quality: 1 }),
    new Item({ id: 441, quality: 1 }),
    new Item({ id: 442, quality: 1 })
];
cA[58].loot = [
    new Item({ id: 443, chance: 1980, quality: 2 }),
    new Item({ id: 444, chance: 1980, quality: 2 }),
    new Item({ id: 445, chance: 1980, quality: 2 }),
    new Item({ id: 446, chance: 990, quality: 1 }),
    new Item({ id: 258, chance: 990, quality: 1 }),
    new Item({ id: 447, chance: 990, quality: 1 }),
    new Item({ id: 308, chance: 495, quality: 1 }),
    new Item({ id: 448, chance: 495, quality: 1 })
];
cA[59].loot = [
    new Item({ id: 449, quality: 2 }),
    new Item({ id: 450, quality: 2 }),
    new Item({ id: 451, quality: 2 }),
    new Item({ id: 1573, quality: 12 }),
    new Item({ id: 453, quality: 1 })
];
cA[60].loot = [
    new Item({ id: 454, quality: 1 }),
    new Item({ id: 455, quality: 1 }),
    new Item({ id: 456, quality: 1 }),
    new Item({ id: 457, quality: 1 }),
    new Item({ id: 458, quality: 1 }),
    new Item({ id: 459, quality: 1 }),
    new Item({ id: 460, quality: 1 }),
    new Item({ id: 461, quality: 1 }),
    new Item({ id: 462, quality: 1 }),
    new Item({ id: 463, quality: 1 })
];
cA[61].loot = [
    new Item({ id: 464, quality: 1 }),
    new Item({ id: 465, quality: 1 }),
    new Item({ id: 466, quality: 1 }),
    new Item({ id: 467, quality: 1 }),
    new Item({ id: 468, quality: 1 }),
    new Item({ id: 469, quality: 1 }),
    new Item({ id: 470, quality: 1 }),
    new Item({ id: 471, quality: 1 })
];
cA[62].loot = [
    new Item({ id: 472, quality: 1 }),
    new Item({ id: 473, quality: 1 }),
    new Item({ id: 474, quality: 1 }),
    new Item({ id: 475, quality: 1 }),
    new Item({ id: 476, quality: 1 }),
    new Item({ id: 477, quality: 1 }),
    new Item({ id: 478, quality: 1 }),
    new Item({ id: 479, quality: 1 })
];
cA[63].loot = [
    new Item({ id: 480, quality: 1 }),
    new Item({ id: 481, quality: 1 }),
    new Item({ id: 482, quality: 1 }),
    new Item({ id: 483, quality: 1 }),
    new Item({ id: 484, quality: 1 }),
    new Item({ id: 485, quality: 1 }),
    new Item({ id: 486, quality: 1 }),
    new Item({ id: 487, quality: 1 })
];
cA[64].loot = [
    new Item({ id: 488, quality: 1 }),
    new Item({ id: 489, quality: 1 }),
    new Item({ id: 490, quality: 1 }),
    new Item({ id: 491, quality: 1 }),
    new Item({ id: 492, quality: 1 }),
    new Item({ id: 493, quality: 1 }),
    new Item({ id: 494, quality: 1 }),
    new Item({ id: 495, quality: 1 })
];
cA[65].loot = [
    new Item({ id: 496, quality: 1 }),
    new Item({ id: 497, quality: 1 }),
    new Item({ id: 498, quality: 1 }),
    new Item({ id: 499, quality: 1 }),
    new Item({ id: 500, quality: 1 }),
    new Item({ id: 501, quality: 1 }),
    new Item({ id: 502, quality: 1 }),
    new Item({ id: 503, quality: 1 })
];
cA[66].loot = [
    new Item({ id: 504, quality: 1 }),
    new Item({ id: 505, quality: 1 }),
    new Item({ id: 506, quality: 1 }),
    new Item({ id: 507, quality: 1 }),
    new Item({ id: 508, quality: 1 }),
    new Item({ id: 509, quality: 1 }),
    new Item({ id: 510, quality: 1 }),
    new Item({ id: 511, quality: 1 })
];
cA[67].loot = [
    new Item({ id: 512, quality: 1 }),
    new Item({ id: 513, quality: 1 }),
    new Item({ id: 514, quality: 1 }),
    new Item({ id: 515, quality: 1 }),
    new Item({ id: 516, quality: 1 }),
    new Item({ id: 517, quality: 1 }),
    new Item({ id: 518, quality: 1 }),
    new Item({ id: 519, quality: 1 })
];
cA[68].loot = [
    new Item({ id: 520, quality: 1 }),
    new Item({ id: 521, quality: 1 }),
    new Item({ id: 522, quality: 1 }),
    new Item({ id: 523, quality: 1 }),
    new Item({ id: 524, quality: 1 }),
    new Item({ id: 525, quality: 1 }),
    new Item({ id: 526, quality: 1 }),
    new Item({ id: 527, quality: 1 })
];
cA[69].loot = [
    new Item({ id: 25, chance: 1980, quality: 2 }),
    new Item({ id: 528, chance: 1980, quality: 2 }),
    new Item({ id: 68, chance: 1980, quality: 2 }),
    new Item({ id: 256, chance: 990, quality: 1 }),
    new Item({ id: 529, chance: 990, quality: 1 }),
    new Item({ id: 530, chance: 990, quality: 1 }),
    new Item({ id: 519, chance: 495, quality: 1 }),
    new Item({ id: 303, chance: 495, quality: 1 })
];
cA[70].loot = [
    new Item({ id: 531, quality: 1 }),
    new Item({ id: 532, quality: 1 }),
    new Item({ id: 533, quality: 1 }),
    new Item({ id: 534, quality: 1 }),
    new Item({ id: 535, quality: 1 }),
    new Item({ id: 536, quality: 1 }),
    new Item({ id: 537, quality: 1 }),
    new Item({ id: 538, quality: 1 }),
    new Item({ id: 539, quality: 1 }),
    new Item({ id: 540, quality: 1 }),
    new Item({ id: 541, quality: 1 }),
    new Item({ id: 542, quality: 1 })
];
cA[71].loot = [
    new Item({ id: 543, quality: 1 }),
    new Item({ id: 544, quality: 1 }),
    new Item({ id: 545, quality: 1 }),
    new Item({ id: 546, quality: 1 }),
    new Item({ id: 547, quality: 1 }),
    new Item({ id: 548, quality: 1 }),
    new Item({ id: 549, quality: 1 }),
    new Item({ id: 550, quality: 1 }),
    new Item({ id: 551, quality: 1 }),
    new Item({ id: 552, quality: 1 }),
    new Item({ id: 553, quality: 1 }),
    new Item({ id: 554, quality: 1 })
];
cA[72].loot = [
    new Item({ id: 555, quality: 3 }),
    new Item({ id: 556, quality: 3 }),
    new Item({ id: 557, quality: 3 }),
    new Item({ id: 558, quality: 3 }),
    new Item({ id: 559, quality: 3 }),
    new Item({ id: 560, quality: 3 }),
    new Item({ id: 561, quality: 3 }),
    new Item({ id: 562, quality: 3 }),
    new Item({ id: 563, quality: 3 }),
    new Item({ id: 564, quality: 3 }),
    new Item({ id: 565, quality: 3 }),
    new Item({ id: 566, quality: 3 }),
    new Item({ id: 567, quality: 3 }),
    new Item({ id: 568, quality: 3 }),
    new Item({ id: 569, quality: 3 }),
    new Item({ id: 570, quality: 3 }),
    new Item({ id: 571, quality: 3 }),
    new Item({ id: 572, quality: 3 }),
    new Item({ id: 573, quality: 3 }),
    new Item({ id: 574, quality: 3 }),
    new Item({ id: 575, quality: 3 }),
    new Item({ id: 576, quality: 3 }),
    new Item({ id: 577, quality: 3 }),
    new Item({ id: 578, quality: 3 }),
    new Item({ id: 579, quality: 3 }),
    new Item({ id: 580, quality: 3 }),
    new Item({ id: 581, quality: 3 }),
    new Item({ id: 582, quality: 3 }),
    new Item({ id: 583, quality: 3 }),
    new Item({ id: 584, quality: 3 }),
    new Item({ id: 585, quality: 3 }),
    new Item({ id: 586, quality: 3 }),
    new Item({ id: 587, quality: 3 }),
    new Item({ id: 588, quality: 3 }),
    new Item({ id: 589, quality: 3 }),
    new Item({ id: 590, quality: 3 }),
    new Item({ id: 591, quality: 3 }),
    new Item({ id: 592, quality: 3 }),
    new Item({ id: 593, quality: 3 }),
    new Item({ id: 594, quality: 3 }),
    new Item({ id: 595, quality: 3 }),
    new Item({ id: 596, quality: 3 }),
    new Item({ id: 597, quality: 3 }),
    new Item({ id: 598, quality: 3 }),
    new Item({ id: 599, quality: 3 }),
    new Item({ id: 600, quality: 3 }),
    new Item({ id: 601, quality: 3 }),
    new Item({ id: 602, quality: 3 }),
    new Item({ id: 603, quality: 3 }),
    new Item({ id: 604, quality: 3 }),
    new Item({ id: 605, quality: 3 }),
    new Item({ id: 606, quality: 3 }),
    new Item({ id: 607, quality: 3 }),
    new Item({ id: 608, quality: 3 }),
    new Item({ id: 609, quality: 3 }),
    new Item({ id: 610, quality: 3 }),
    new Item({ id: 611, quality: 3 }),
    new Item({ id: 612, quality: 3 }),
    new Item({ id: 613, quality: 3 }),
    new Item({ id: 614, quality: 3 }),
    new Item({ id: 615, quality: 3 }),
    new Item({ id: 616, quality: 3 }),
    new Item({ id: 617, quality: 3 }),
    new Item({ id: 618, quality: 3 }),
    new Item({ id: 619, quality: 3 }),
    new Item({ id: 620, quality: 3 }),
    new Item({ id: 621, quality: 3 }),
    new Item({ id: 622, quality: 3 }),
    new Item({ id: 623, quality: 3 }),
    new Item({ id: 624, quality: 3 }),
    new Item({ id: 625, quality: 3 }),
    new Item({ id: 626, quality: 3 }),
    new Item({ id: 627, quality: 3 }),
    new Item({ id: 628, quality: 3 }),
    new Item({ id: 629, quality: 3 }),
    new Item({ id: 630, quality: 3 }),
    new Item({ id: 631, quality: 3 }),
    new Item({ id: 632, quality: 3 }),
    new Item({ id: 633, quality: 3 }),
    new Item({ id: 634, quality: 3 }),
    new Item({ id: 635, quality: 3 }),
    new Item({ id: 636, quality: 3 }),
    new Item({ id: 637, quality: 3 }),
    new Item({ id: 638, quality: 3 }),
    new Item({ id: 639, quality: 3 }),
    new Item({ id: 640, quality: 3 }),
    new Item({ id: 641, quality: 3 }),
    new Item({ id: 642, quality: 3 }),
    new Item({ id: 643, quality: 3 }),
    new Item({ id: 644, quality: 3 }),
    new Item({ id: 645, quality: 3 }),
    new Item({ id: 646, quality: 3 }),
    new Item({ id: 647, quality: 3 }),
    new Item({ id: 648, quality: 3 }),
    new Item({ id: 649, quality: 3 }),
    new Item({ id: 650, quality: 3 }),
    new Item({ id: 651, quality: 3 }),
    new Item({ id: 652, quality: 3 }),
    new Item({ id: 653, quality: 3 }),
    new Item({ id: 654, quality: 3 }),
    new Item({ id: 655, quality: 3 }),
    new Item({ id: 656, quality: 3 })
];
cA[73].loot = [
    new Item({ id: 19, chance: 1980, quality: 2 }),
    new Item({ id: 657, chance: 1980, quality: 2 }),
    new Item({ id: 132, chance: 1980, quality: 2 }),
    new Item({ id: 658, chance: 990, quality: 1 }),
    new Item({ id: 659, chance: 990, quality: 1 }),
    new Item({ id: 660, chance: 990, quality: 1 }),
    new Item({ id: 43, chance: 495, quality: 1 }),
    new Item({ id: 284, chance: 495, quality: 1 })
];
cA[74].loot = [
    new Item({ id: 661, chance: 1980, quality: 2 }),
    new Item({ id: 176, chance: 1980, quality: 2 }),
    new Item({ id: 662, chance: 1980, quality: 2 }),
    new Item({ id: 663, chance: 990, quality: 1 }),
    new Item({ id: 664, chance: 990, quality: 1 }),
    new Item({ id: 665, chance: 990, quality: 1 }),
    new Item({ id: 666, chance: 495, quality: 1 }),
    new Item({ id: 359, chance: 495, quality: 1 })
];
cA[75].loot = [
    new Item({ id: 667, chance: 1980, quality: 2 }),
    new Item({ id: 144, chance: 1980, quality: 2 }),
    new Item({ id: 668, chance: 1980, quality: 2 }),
    new Item({ id: 669, chance: 990, quality: 1 }),
    new Item({ id: 670, chance: 990, quality: 1 }),
    new Item({ id: 671, chance: 990, quality: 1 }),
    new Item({ id: 672, chance: 495, quality: 1 }),
    new Item({ id: 50, chance: 495, quality: 1 })
];
cA[76].loot = [
    new Item({ id: 673, quality: 4 }),
    new Item({ id: 674, quality: 4 }),
    new Item({ id: 675, quality: 4 }),
    new Item({ id: 676, quality: 4 }),
    new Item({ id: 677, quality: 4 }),
    new Item({ id: 678, quality: 4 }),
    new Item({ id: 679, quality: 4 }),
    new Item({ id: 680, quality: 4 }),
    new Item({ id: 681, quality: 4 })
];
cA[77].loot = [
    new Item({ id: 682, quality: 1 }),
    new Item({ id: 683, quality: 1 }),
    new Item({ id: 684, quality: 1 }),
    new Item({ id: 685, quality: 1 }),
    new Item({ id: 686, quality: 1 }),
    new Item({ id: 687, quality: 1 }),
    new Item({ id: 688, quality: 1 }),
    new Item({ id: 689, quality: 1 }),
    new Item({ id: 690, quality: 1 }),
    new Item({ id: 691, quality: 1 }),
    new Item({ id: 692, quality: 1 }),
    new Item({ id: 693, quality: 1 }),
    new Item({ id: 694, quality: 1 }),
    new Item({ id: 695, quality: 1 }),
    new Item({ id: 696, quality: 1 }),
    new Item({ id: 697, quality: 1 }),
    new Item({ id: 698, quality: 1 }),
    new Item({ id: 699, quality: 1 }),
    new Item({ id: 700, quality: 1 }),
    new Item({ id: 701, quality: 1 }),
    new Item({ id: 702, quality: 1 }),
    new Item({ id: 703, quality: 1 }),
    new Item({ id: 704, quality: 1 }),
    new Item({ id: 705, quality: 1 }),
    new Item({ id: 706, quality: 1 }),
    new Item({ id: 707, quality: 1 }),
    new Item({ id: 708, quality: 1 }),
    new Item({ id: 709, quality: 1 }),
    new Item({ id: 710, quality: 1 }),
    new Item({ id: 711, quality: 1 }),
    new Item({ id: 712, quality: 1 }),
    new Item({ id: 713, quality: 1 })
];
cA[78].loot = [
    new Item({ id: 714, quality: 1 }),
    new Item({ id: 715, quality: 1 }),
    new Item({ id: 716, quality: 1 }),
    new Item({ id: 717, quality: 1 }),
    new Item({ id: 718, quality: 1 }),
    new Item({ id: 719, quality: 1 }),
    new Item({ id: 720, quality: 1 }),
    new Item({ id: 721, quality: 1 }),
    new Item({ id: 722, quality: 1 }),
    new Item({ id: 723, quality: 1 }),
    new Item({ id: 724, quality: 1 }),
    new Item({ id: 725, quality: 1 }),
    new Item({ id: 726, quality: 1 }),
    new Item({ id: 727, quality: 1 }),
    new Item({ id: 728, quality: 1 }),
    new Item({ id: 729, quality: 1 }),
    new Item({ id: 730, quality: 1 }),
    new Item({ id: 731, quality: 1 }),
    new Item({ id: 732, quality: 1 }),
    new Item({ id: 733, quality: 1 }),
    new Item({ id: 734, quality: 1 }),
    new Item({ id: 735, quality: 1 }),
    new Item({ id: 736, quality: 1 }),
    new Item({ id: 737, quality: 1 }),
    new Item({ id: 738, quality: 1 }),
    new Item({ id: 739, quality: 1 }),
    new Item({ id: 740, quality: 1 }),
    new Item({ id: 741, quality: 1 }),
    new Item({ id: 742, quality: 1 }),
    new Item({ id: 743, quality: 1 }),
    new Item({ id: 744, quality: 1 }),
    new Item({ id: 745, quality: 1 }),
    new Item({ id: 746, quality: 1 }),
    new Item({ id: 747, quality: 1 }),
    new Item({ id: 748, quality: 1 }),
    new Item({ id: 749, quality: 1 }),
    new Item({ id: 750, quality: 1 }),
    new Item({ id: 751, quality: 1 }),
    new Item({ id: 752, quality: 1 }),
    new Item({ id: 753, quality: 1 }),
    new Item({ id: 754, quality: 1 }),
    new Item({ id: 755, quality: 1 }),
    new Item({ id: 756, quality: 1 })
];
cA[79].loot = [
    new Item({ id: 757, chance: 2000, quality: 12 }),
    new Item({ id: 758, chance: 2000, quality: 12 }),
    new Item({ id: 759, chance: 2000, quality: 12 }),
    new Item({ id: 760, chance: 1000, quality: 1 }),
    new Item({ id: 761, chance: 1000, quality: 1 }),
    new Item({ id: 264, chance: 1000, quality: 1 }),
    new Item({ id: 177, chance: 500, quality: 12 }),
    new Item({ id: 130, chance: 500, quality: 12 })
];
cA[80].loot = [
    new Item({ id: 150, quality: 11 }),
    new Item({ id: 170, quality: 11 }),
    new Item({ id: 189, quality: 11 }),
    new Item({ id: 151, quality: 11 }),
    new Item({ id: 205, quality: 11 }),
    new Item({ id: 154, quality: 11 }),
    new Item({ id: 224, quality: 11 }),
    new Item({ id: 195, quality: 11 })
];
cA[81].loot = [
    new Item({ id: 75, quality: 7 }),
    new Item({ id: 76, quality: 7 }),
    new Item({ id: 77, quality: 7 }),
    new Item({ id: 78, quality: 7 }),
    new Item({ id: 79, quality: 7 }),
    new Item({ id: 80, quality: 7 }),
    new Item({ id: 81, quality: 7 }),
    new Item({ id: 82, quality: 7 }),
    new Item({ id: 83, quality: 7 }),
    new Item({ id: 84, quality: 7 }),
    new Item({ id: 85, quality: 7 }),
    new Item({ id: 86, quality: 7 }),
    new Item({ id: 87, quality: 7 }),
    new Item({ id: 88, quality: 7 }),
    new Item({ id: 89, quality: 7 })
];
cA[82].loot = [
    new Item({ id: 772, quality: 4 }),
    new Item({ id: 773, quality: 4 }),
    new Item({ id: 774, quality: 4 }),
    new Item({ id: 775, quality: 4 }),
];
cA[83].loot = [
    new Item({ id: 776, quality: 1 }),
    new Item({ id: 777, quality: 1 }),
    new Item({ id: 778, quality: 1 }),
    new Item({ id: 779, quality: 1 }),
    new Item({ id: 780, quality: 1 }),
    new Item({ id: 781, quality: 1 }),
    new Item({ id: 782, quality: 1 }),
    new Item({ id: 783, quality: 1 }),
    new Item({ id: 784, quality: 1 }),
    new Item({ id: 785, quality: 1 }),
    new Item({ id: 786, quality: 1 }),
    new Item({ id: 787, quality: 1 }),
    new Item({ id: 788, quality: 1 }),
    new Item({ id: 789, quality: 1 }),
    new Item({ id: 790, quality: 1 }),
    new Item({ id: 791, quality: 1 }),
    new Item({ id: 792, quality: 1 }),
    new Item({ id: 793, quality: 1 }),
    new Item({ id: 794, quality: 1 }),
    new Item({ id: 795, quality: 1 }),
    new Item({ id: 796, quality: 1 }),
    new Item({ id: 797, quality: 1 }),
    new Item({ id: 798, quality: 1 }),
    new Item({ id: 799, quality: 1 }),
    new Item({ id: 800, quality: 1 }),
    new Item({ id: 801, quality: 1 }),
    new Item({ id: 802, quality: 1 }),
    new Item({ id: 803, quality: 1 }),
    new Item({ id: 804, quality: 1 }),
    new Item({ id: 805, quality: 1 }),
    new Item({ id: 806, quality: 1 }),
    new Item({ id: 807, quality: 1 }),
    new Item({ id: 808, quality: 1 }),
    new Item({ id: 809, quality: 1 }),
    new Item({ id: 810, quality: 1 }),
    new Item({ id: 811, quality: 1 }),
    new Item({ id: 812, quality: 1 }),
    new Item({ id: 813, quality: 1 }),
    new Item({ id: 814, quality: 1 }),
    new Item({ id: 815, quality: 1 }),
    new Item({ id: 816, quality: 1 }),
    new Item({ id: 817, quality: 1 }),
    new Item({ id: 818, quality: 1 }),
    new Item({ id: 819, quality: 1 })
];
cA[84].loot = [
    new Item({ id: 145, quality: 11 }),
    new Item({ id: 155, quality: 11 }),
    new Item({ id: 60, quality: 11 }),
    new Item({ id: 69, quality: 11 }),
    new Item({ id: 181, quality: 11 }),
    new Item({ id: 1128, quality: 11 }),
    new Item({ id: 199, quality: 11 }),
    new Item({ id: 173, quality: 11 }),
    new Item({ id: 192, quality: 11 })
];
cA[85].loot = [
    new Item({ id: 1572, chance: 1500, quality: 12 }),
    new Item({ id: 830, chance: 1500, quality: 12 }),
    new Item({ id: 831, chance: 1500, quality: 12 }),
    new Item({ id: 1571, chance: 1500, quality: 12 }),
    new Item({ id: 833, chance: 1000, quality: 1 }),
    new Item({ id: 834, chance: 1000, quality: 1 }),
    new Item({ id: 262, chance: 1000, quality: 1 }),
    new Item({ id: 1404, chance: 334, quality: 12 }),
    new Item({ id: 1466, chance: 333, quality: 12 }),
    new Item({ id: 251, chance: 333, quality: 12 })
];
cA[86].loot = [
    new Item({ id: 889, quality: 4 }),
    new Item({ id: 890, quality: 4 }),
    new Item({ id: 891, quality: 4 }),
    new Item({ id: 892, quality: 4 }),
    new Item({ id: 893, quality: 9 }),
    new Item({ id: 894, quality: 4 }),
    new Item({ id: 895, quality: 4 }),
    new Item({ id: 896, quality: 4 }),
    new Item({ id: 897, quality: 4 })
];
cA[87].loot = [
    new Item({ id: 838, quality: 8 }),
    new Item({ id: 839, quality: 8 }),
    new Item({ id: 840, quality: 8 }),
    new Item({ id: 841, quality: 8 }),
    new Item({ id: 842, quality: 8 }),
    new Item({ id: 843, quality: 8 })
];
cA[88].loot = [
    new Item({ id: 844, quality: 8 }),
    new Item({ id: 845, quality: 8 }),
    new Item({ id: 846, quality: 8 }),
    new Item({ id: 847, quality: 8 }),
    new Item({ id: 848, quality: 8 })
];
cA[89].loot = [
    new Item({ id: 849, quality: 8 }),
    new Item({ id: 850, quality: 8 }),
    new Item({ id: 851, quality: 8 }),
    new Item({ id: 852, quality: 8 }),
    new Item({ id: 853, quality: 8 }),
    new Item({ id: 854, quality: 8 })
];
cA[90].loot = [
    new Item({ id: 855, quality: 8 }),
    new Item({ id: 856, quality: 8 }),
    new Item({ id: 857, quality: 8 }),
    new Item({ id: 858, quality: 8 }),
    new Item({ id: 859, quality: 8 })
];
cA[91].loot = [
    new Item({ id: 860, quality: 8 }),
    new Item({ id: 861, quality: 8 }),
    new Item({ id: 862, quality: 8 }),
    new Item({ id: 863, quality: 8 }),
    new Item({ id: 864, quality: 8 })
];
cA[92].loot = [
    new Item({ id: 865, quality: 8 }),
    new Item({ id: 866, quality: 8 }),
    new Item({ id: 867, quality: 8 }),
    new Item({ id: 868, quality: 8 }),
    new Item({ id: 869, quality: 8 })
];
cA[93].loot = [
    new Item({ id: 870, quality: 8 }),
    new Item({ id: 871, quality: 8 }),
    new Item({ id: 872, quality: 8 }),
    new Item({ id: 873, quality: 8 }),
    new Item({ id: 874, quality: 8 }),
    new Item({ id: 875, quality: 8 }),
    new Item({ id: 876, quality: 8 })
];
cA[94].loot = [
    new Item({ id: 877, quality: 8 }),
    new Item({ id: 878, quality: 8 }),
    new Item({ id: 879, quality: 8 }),
    new Item({ id: 880, quality: 8 }),
    new Item({ id: 881, quality: 8 }),
    new Item({ id: 882, quality: 8 }),
    new Item({ id: 883, quality: 8 })
];
cA[95].loot = [
    new Item({ id: 884, quality: 8 }),
    new Item({ id: 885, quality: 8 }),
    new Item({ id: 886, quality: 8 }),
    new Item({ id: 887, quality: 8 }),
    new Item({ id: 888, quality: 8 })
];
cA[96].loot = [
    new Item({ id: 898, quality: 4 }),
    new Item({ id: 899, quality: 4 }),
    new Item({ id: 900, quality: 4 }),
    new Item({ id: 901, quality: 4 }),
    new Item({ id: 902, quality: 4 }),
    new Item({ id: 903, quality: 4 }),
    new Item({ id: 904, quality: 4 }),
    new Item({ id: 905, quality: 4 }),
    new Item({ id: 906, quality: 4 }),
    new Item({ id: 907, quality: 4 }),
    new Item({ id: 908, quality: 4 }),
    new Item({ id: 909, quality: 4 }),
    new Item({ id: 910, quality: 4 }),
    new Item({ id: 911, quality: 4 }),
    new Item({ id: 912, quality: 4 }),
    new Item({ id: 913, quality: 4 }),
    new Item({ id: 914, quality: 4 }),
    new Item({ id: 915, quality: 4 }),
    new Item({ id: 916, quality: 4 }),
    new Item({ id: 917, quality: 4 }),
    new Item({ id: 918, quality: 4 }),
    new Item({ id: 919, quality: 4 }),
    new Item({ id: 920, quality: 1 }),
    new Item({ id: 921, quality: 4 })
];
cA[97].loot = [
    new Item({ id: 922, quality: 4 }),
    new Item({ id: 923, quality: 4 }),
    new Item({ id: 924, quality: 4 }),
    new Item({ id: 925, quality: 4 }),
    new Item({ id: 926, quality: 4 }),
    new Item({ id: 927, quality: 4 }),
    new Item({ id: 928, quality: 4 })
];
cA[98].loot = [
    new Item({ id: 929, quality: 9 }),
    new Item({ id: 930, quality: 4 }),
    new Item({ id: 931, quality: 4 }),
    new Item({ id: 932, quality: 9 }),
    new Item({ id: 933, quality: 9 }),
    new Item({ id: 934, quality: 4 }),
    new Item({ id: 935, quality: 4 }),
    new Item({ id: 936, quality: 9 }),
    new Item({ id: 937, quality: 4 }),
    new Item({ id: 938, quality: 4 }),
    new Item({ id: 939, quality: 9 }),
    new Item({ id: 940, quality: 4 }),
    new Item({ id: 941, quality: 9 }),
    new Item({ id: 942, quality: 9 }),
    new Item({ id: 943, quality: 9 }),
    new Item({ id: 944, quality: 4 }),
    new Item({ id: 945, quality: 9 }),
    new Item({ id: 946, quality: 4 }),
    new Item({ id: 947, quality: 4 }),
    new Item({ id: 948, quality: 4 }),
    new Item({ id: 949, quality: 9 }),
    new Item({ id: 950, quality: 4 }),
    new Item({ id: 951, quality: 4 }),
    new Item({ id: 952, quality: 4 }),
    new Item({ id: 953, quality: 9 }),
    new Item({ id: 954, quality: 4 }),
    new Item({ id: 955, quality: 4 }),
    new Item({ id: 956, quality: 4 }),
    new Item({ id: 957, quality: 4 })
];
cA[99].loot = [
    new Item({ id: 958, chance: 1213, quality: 12 }),
    new Item({ id: 959, chance: 1213, quality: 12 }),
    new Item({ id: 960, chance: 1213, quality: 2 }),
    new Item({ id: 961, chance: 1213, quality: 1 }),
    new Item({ id: 962, chance: 1212, quality: 1 }),
    new Item({ id: 963, chance: 1212, quality: 1 }),
    new Item({ id: 964, chance: 1212, quality: 4 }),
    new Item({ id: 198, chance: 1212, quality: 4 }),
    new Item({ id: 965, chance: 100, quality: 2 }),
    new Item({ id: 115, chance: 100, quality: 2 })
];
cA[100].loot = [
    new Item({ id: 180, quality: 11 }),
    new Item({ id: 193, quality: 11 }),
    new Item({ id: 176, quality: 11 }),
    new Item({ id: 201, quality: 11 }),
    new Item({ id: 372, quality: 11 }),
    new Item({ id: 444, quality: 11 }),
    new Item({ id: 450, quality: 11 }),
    new Item({ id: 1571, quality: 11 }),
    new Item({ id: 1572, quality: 11 })
];
cA[101].loot = [
    new Item({ id: 39, chance: 1607, quality: 2 }),
    new Item({ id: 975, chance: 1607, quality: 2 }),
    new Item({ id: 976, chance: 1607, quality: 2 }),
    new Item({ id: 977, chance: 1607, quality: 2 }),
    new Item({ id: 978, chance: 1607, quality: 2 }),
    new Item({ id: 42, chance: 333, quality: 2 }),
    new Item({ id: 141, chance: 333, quality: 2 }),
    new Item({ id: 979, chance: 333, quality: 2 }),
    new Item({ id: 980, chance: 333, quality: 2 }),
    new Item({ id: 981, chance: 333, quality: 2 }),
    new Item({ id: 982, chance: 100, quality: 12 }),
    new Item({ id: 199, chance: 100, quality: 2 })
];
cA[102].loot = [
    new Item({ id: 104, quality: 6, grade: 3 }),
    new Item({ id: 103, quality: 6, grade: 3 }),
    new Item({ id: 102, quality: 6, grade: 3 }),
    new Item({ id: 101, quality: 6, grade: 3 }),
    new Item({ id: 100, quality: 6, grade: 3 }),
    new Item({ id: 99, quality: 6, grade: 3 }),
    new Item({ id: 98, quality: 6, grade: 4 }),
    new Item({ id: 97, quality: 6, grade: 4 }),
    new Item({ id: 96, quality: 6, grade: 4 }),
    new Item({ id: 95, quality: 6, grade: 4 }),
    new Item({ id: 94, quality: 6, grade: 5 }),
    new Item({ id: 93, quality: 6, grade: 5 }),
    new Item({ id: 92, quality: 6, grade: 5 }),
    new Item({ id: 91, quality: 6, grade: 6 }),
    new Item({ id: 90, quality: 6, grade: 6 })
];
cA[103].loot = [
    new Item({ id: 983, quality: 6, grade: 3 }),
    new Item({ id: 984, quality: 6, grade: 3 }),
    new Item({ id: 985, quality: 6, grade: 3 }),
    new Item({ id: 986, quality: 6, grade: 3 }),
    new Item({ id: 987, quality: 6, grade: 3 }),
    new Item({ id: 988, quality: 6, grade: 4 }),
    new Item({ id: 989, quality: 6, grade: 4 }),
    new Item({ id: 990, quality: 6, grade: 4 }),
    new Item({ id: 991, quality: 6, grade: 4 }),
    new Item({ id: 992, quality: 6, grade: 4 }),
    new Item({ id: 993, quality: 6, grade: 5 }),
    new Item({ id: 994, quality: 6, grade: 5 }),
    new Item({ id: 995, quality: 6, grade: 5 }),
    new Item({ id: 996, quality: 6, grade: 6 }),
    new Item({ id: 997, quality: 6, grade: 6 })
];
cA[104].loot = [
    new Item({ id: 998, quality: 4, grade: 3 }),
    new Item({ id: 999, quality: 4, grade: 3 }),
    new Item({ id: 1000, quality: 4, grade: 3 }),
    new Item({ id: 1001, quality: 10, grade: 3 }),
    new Item({ id: 1002, quality: 4, grade: 3 }),
    new Item({ id: 1003, quality: 4, grade: 3 }),
    new Item({ id: 1004, quality: 4, grade: 3 }),
    new Item({ id: 1005, quality: 10, grade: 4 }),
    new Item({ id: 1006, quality: 10, grade: 4 }),
    new Item({ id: 1007, quality: 10, grade: 4 }),
    new Item({ id: 1008, quality: 10, grade: 4 }),
    new Item({ id: 1009, quality: 10, grade: 5 }),
    new Item({ id: 1010, quality: 4, grade: 5 }),
    new Item({ id: 1011, quality: 10, grade: 5 }),
    new Item({ id: 1012, quality: 10, grade: 6 }),
    new Item({ id: 1013, quality: 10, grade: 6 }),
];
cA[105].loot = [
    new Item({ id: 1014, quality: 10, grade: 3 }),
    new Item({ id: 1015, quality: 4, grade: 3 }),
    new Item({ id: 1016, quality: 4, grade: 3 }),
    new Item({ id: 1017, quality: 4, grade: 3 }),
    new Item({ id: 1018, quality: 4, grade: 4 }),
    new Item({ id: 1019, quality: 4, grade: 4 }),
    new Item({ id: 1020, quality: 4, grade: 4 }),
    new Item({ id: 1021, quality: 4, grade: 5 }),
    new Item({ id: 1022, quality: 4, grade: 5 }),
    new Item({ id: 1023, quality: 10, grade: 6 }),
    new Item({ id: 1024, quality: 4, grade: 6 }),
];
cA[106].loot = [
    new Item({ id: 1025, quality: 4, grade: 3 }),
    new Item({ id: 1026, quality: 4, grade: 3 }),
    new Item({ id: 1027, quality: 4, grade: 3 }),
    new Item({ id: 1028, quality: 10, grade: 3 }),
    new Item({ id: 1029, quality: 4, grade: 4 }),
    new Item({ id: 1030, quality: 10, grade: 4 }),
    new Item({ id: 1031, quality: 4, grade: 4 }),
    new Item({ id: 1032, quality: 4, grade: 5 }),
    new Item({ id: 1033, quality: 4, grade: 5 }),
    new Item({ id: 1034, quality: 4, grade: 6 })
];
cA[107].loot = [
    new Item({ id: 1053, quality: 10, grade: 3 }),
    new Item({ id: 1035, quality: 4, grade: 3 }),
    new Item({ id: 1036, quality: 4, grade: 3 }),
    new Item({ id: 1037, quality: 10, grade: 3 }),
    new Item({ id: 1038, quality: 4, grade: 3 }),
    new Item({ id: 1039, quality: 4, grade: 3 }),
    new Item({ id: 1040, quality: 10, grade: 3 }),
    new Item({ id: 1041, quality: 4, grade: 3 }),
    new Item({ id: 1042, quality: 4, grade: 4 }),
    new Item({ id: 1043, quality: 4, grade: 4 }),
    new Item({ id: 1044, quality: 10, grade: 4 }),
    new Item({ id: 1045, quality: 4, grade: 4 }),
    new Item({ id: 1046, quality: 10, grade: 4 }),
    new Item({ id: 1047, quality: 10, grade: 4 }),
    new Item({ id: 1048, quality: 4, grade: 5 }),
    new Item({ id: 1049, quality: 4, grade: 5 }),
    new Item({ id: 1050, quality: 4, grade: 5 }),
    new Item({ id: 1051, quality: 4, grade: 6 }),
    new Item({ id: 1052, quality: 4, grade: 6 })
];
cA[108].loot = [
    new Item({ id: 1054, quality: 6, grade: 3 }),
    new Item({ id: 1055, quality: 6, grade: 3 }),
    new Item({ id: 1056, quality: 6, grade: 3 }),
    new Item({ id: 1057, quality: 6, grade: 3 }),
    new Item({ id: 1058, quality: 6, grade: 3 }),
    new Item({ id: 1059, quality: 6, grade: 3 }),
    new Item({ id: 1060, quality: 6, grade: 3 }),
    new Item({ id: 1061, quality: 6, grade: 3 }),
    new Item({ id: 1062, quality: 6, grade: 3 }),
    new Item({ id: 1063, quality: 6, grade: 3 }),
    new Item({ id: 1064, quality: 6, grade: 3 }),
    new Item({ id: 1065, quality: 6, grade: 4 }),
    new Item({ id: 1066, quality: 6, grade: 4 }),
    new Item({ id: 1067, quality: 6, grade: 4 }),
    new Item({ id: 1068, quality: 6, grade: 4 }),
    new Item({ id: 1069, quality: 6, grade: 4 }),
    new Item({ id: 1070, quality: 6, grade: 4 }),
    new Item({ id: 1071, quality: 6, grade: 4 }),
    new Item({ id: 1072, quality: 6, grade: 5 }),
    new Item({ id: 1073, quality: 6, grade: 5 }),
    new Item({ id: 1074, quality: 6, grade: 5 }),
    new Item({ id: 1075, quality: 6, grade: 5 }),
    new Item({ id: 1076, quality: 6, grade: 6 }),
    new Item({ id: 1077, quality: 6, grade: 6 }),
    new Item({ id: 1078, quality: 6, grade: 6 }),
];
cA[109].loot = [
    new Item({ id: 1079, quality: 6, grade: 3 }),
    new Item({ id: 1080, quality: 6, grade: 3 }),
    new Item({ id: 1081, quality: 6, grade: 3 }),
    new Item({ id: 1082, quality: 6, grade: 3 }),
    new Item({ id: 1083, quality: 6, grade: 3 }),
    new Item({ id: 1084, quality: 6, grade: 3 }),
    new Item({ id: 1085, quality: 6, grade: 3 }),
    new Item({ id: 1086, quality: 6, grade: 3 }),
    new Item({ id: 1087, quality: 6, grade: 4 }),
    new Item({ id: 1088, quality: 6, grade: 4 }),
    new Item({ id: 1089, quality: 6, grade: 4 }),
    new Item({ id: 1090, quality: 6, grade: 4 }),
    new Item({ id: 1091, quality: 6, grade: 4 }),
    new Item({ id: 1092, quality: 6, grade: 5 }),
    new Item({ id: 1093, quality: 6, grade: 5 }),
    new Item({ id: 1094, quality: 6, grade: 5 }),
    new Item({ id: 1095, quality: 6, grade: 6 }),
    new Item({ id: 1096, quality: 6, grade: 6 }),
];
cA[110].loot = [
    new Item({ id: 1097, quality: 10, grade: 3 }),
    new Item({ id: 1098, quality: 10, grade: 3 }),
    new Item({ id: 1099, quality: 4, grade: 3 }),
    new Item({ id: 1100, quality: 10, grade: 3 }),
    new Item({ id: 1101, quality: 4, grade: 3 }),
    new Item({ id: 1102, quality: 4, grade: 3 }),
    new Item({ id: 1103, quality: 4, grade: 3 }),
    new Item({ id: 1104, quality: 4, grade: 3 }),
    new Item({ id: 1105, quality: 4, grade: 3 }),
    new Item({ id: 1106, quality: 4, grade: 3 }),
    new Item({ id: 1107, quality: 4, grade: 4 }),
    new Item({ id: 1108, quality: 4, grade: 4 }),
    new Item({ id: 1109, quality: 4, grade: 4 }),
    new Item({ id: 1110, quality: 10, grade: 4 }),
    new Item({ id: 1111, quality: 10, grade: 5 }),
];
cA[111].loot = [
    new Item({ id: 1112, quality: 4, grade: 3 }),
    new Item({ id: 1113, quality: 4, grade: 3 }),
    new Item({ id: 1114, quality: 4, grade: 3 }),
    new Item({ id: 1115, quality: 4, grade: 3 }),
    new Item({ id: 1116, quality: 10, grade: 3 }),
    new Item({ id: 1117, quality: 4, grade: 3 }),
    new Item({ id: 1118, quality: 10, grade: 4 }),
    new Item({ id: 1119, quality: 10, grade: 4 }),
    new Item({ id: 1120, quality: 4, grade: 4 }),
    new Item({ id: 1121, quality: 4, grade: 4 }),
    new Item({ id: 1122, quality: 4, grade: 5 }),
    new Item({ id: 1123, quality: 10, grade: 5 }),
    new Item({ id: 1124, quality: 4, grade: 6 }),
    new Item({ id: 1125, quality: 10, grade: 6 }),
];
cA[112].loot = [
    new Item({ id: 258, chance: 700, quality: 1 }),
    new Item({ id: 373, chance: 700, quality: 1 }),
    new Item({ id: 272, chance: 700, quality: 1 }),
    new Item({ id: 670, chance: 700, quality: 1 }),
    new Item({ id: 665, chance: 700, quality: 1 }),
    new Item({ id: 1126, chance: 100, quality: 2 }),
    new Item({ id: 156, chance: 700, quality: 2 }),
    new Item({ id: 31, chance: 700, quality: 2 }),
    new Item({ id: 139, chance: 700, quality: 2 }),
    new Item({ id: 208, chance: 700, quality: 2 }),
    new Item({ id: 173, chance: 700, quality: 2 }),
    new Item({ id: 1127, chance: 700, quality: 2 }),
    new Item({ id: 1128, chance: 700, quality: 2 }),
    new Item({ id: 1129, chance: 700, quality: 2 }),
    new Item({ id: 1130, chance: 700, quality: 2 })
];
cA[113].loot = [
    new Item({ id: 1131, quality: 4, grade: 3 }),
    new Item({ id: 1132, quality: 4, grade: 3 }),
    new Item({ id: 1133, quality: 4, grade: 3 }),
    new Item({ id: 1134, quality: 10, grade: 3 }),
    new Item({ id: 1135, quality: 4, grade: 3 }),
    new Item({ id: 1136, quality: 4, grade: 3 }),
    new Item({ id: 1137, quality: 4, grade: 4 }),
    new Item({ id: 1138, quality: 10, grade: 3 }),
    new Item({ id: 1139, quality: 10, grade: 3 }),
    new Item({ id: 1140, quality: 10, grade: 3 }),
    new Item({ id: 1141, quality: 10, grade: 4 }),
    new Item({ id: 1142, quality: 10, grade: 4 }),
    new Item({ id: 1143, quality: 4, grade: 4 }),
    new Item({ id: 1144, quality: 4, grade: 4 }),
    new Item({ id: 1145, quality: 10, grade: 4 }),
    new Item({ id: 1146, quality: 10, grade: 4 }),
    new Item({ id: 1147, quality: 10, grade: 5 }),
    new Item({ id: 1148, quality: 10, grade: 5 }),
    new Item({ id: 1149, quality: 4, grade: 5 }),
    new Item({ id: 1150, quality: 10, grade: 6 }),
    new Item({ id: 1151, quality: 4, grade: 6 }),
];
cA[114].loot = [
    new Item({ id: 1152, quality: 4, grade: 3 }),
    new Item({ id: 1153, quality: 4, grade: 3 }),
    new Item({ id: 1154, quality: 10, grade: 3 }),
    new Item({ id: 1155, quality: 4, grade: 3 }),
    new Item({ id: 1156, quality: 10, grade: 3 }),
    new Item({ id: 1157, quality: 4, grade: 3 }),
    new Item({ id: 1158, quality: 4, grade: 3 }),
    new Item({ id: 1159, quality: 4, grade: 4 }),
    new Item({ id: 1160, quality: 4, grade: 4 }),
    new Item({ id: 1161, quality: 10, grade: 4 }),
    new Item({ id: 1162, quality: 4, grade: 4 }),
    new Item({ id: 1163, quality: 10, grade: 4 }),
    new Item({ id: 1164, quality: 4, grade: 5 }),
    new Item({ id: 1165, quality: 4, grade: 5 }),
    new Item({ id: 1166, quality: 10, grade: 5 }),
    new Item({ id: 1167, quality: 10, grade: 6 }),
    new Item({ id: 1168, quality: 10, grade: 6 }),
];
cA[115].loot = [
    new Item({ id: 1169, quality: 4, grade: 3 }),
    new Item({ id: 1170, quality: 4, grade: 3 }),
    new Item({ id: 1171, quality: 4, grade: 3 }),
    new Item({ id: 1172, quality: 10, grade: 3 }),
    new Item({ id: 1173, quality: 10, grade: 3 }),
    new Item({ id: 1174, quality: 4, grade: 3 }),
    new Item({ id: 1175, quality: 10, grade: 3 }),
    new Item({ id: 1176, quality: 4, grade: 3 }),
    new Item({ id: 1177, quality: 4, grade: 3 }),
    new Item({ id: 1178, quality: 4, grade: 4 }),
    new Item({ id: 1179, quality: 4, grade: 4 }),
    new Item({ id: 1180, quality: 4, grade: 4 }),
    new Item({ id: 1181, quality: 4, grade: 4 }),
    new Item({ id: 1182, quality: 10, grade: 4 }),
    new Item({ id: 1183, quality: 4, grade: 5 }),
    new Item({ id: 1184, quality: 10, grade: 5 }),
    new Item({ id: 1185, quality: 10, grade: 5 }),
    new Item({ id: 1186, quality: 10, grade: 6 }),
    new Item({ id: 1187, quality: 10, grade: 6 }),
];
cA[116].loot = [
    new Item({ id: 1188, quality: 4, grade: 3 }),
    new Item({ id: 1189, quality: 4, grade: 3 }),
    new Item({ id: 1190, quality: 10, grade: 3 }),
    new Item({ id: 1191, quality: 10, grade: 3 }),
    new Item({ id: 1192, quality: 4, grade: 3 }),
    new Item({ id: 1193, quality: 4, grade: 3 }),
    new Item({ id: 1194, quality: 10, grade: 3 }),
    new Item({ id: 1195, quality: 4, grade: 3 }),
    new Item({ id: 1196, quality: 10, grade: 3 }),
    new Item({ id: 1197, quality: 4, grade: 3 }),
    new Item({ id: 1198, quality: 4, grade: 4 }),
    new Item({ id: 1199, quality: 4, grade: 4 }),
    new Item({ id: 1200, quality: 4, grade: 4 }),
    new Item({ id: 1201, quality: 4, grade: 4 }),
    new Item({ id: 1202, quality: 10, grade: 4 }),
    new Item({ id: 1203, quality: 4, grade: 5 }),
    new Item({ id: 1204, quality: 4, grade: 5 }),
    new Item({ id: 1205, quality: 10, grade: 5 }),
    new Item({ id: 1206, quality: 10, grade: 6 }),
    new Item({ id: 1207, quality: 4, grade: 6 }),
];
cA[117].loot = [
    new Item({ id: 1208, quality: 4, grade: 3 }),
    new Item({ id: 1209, quality: 10, grade: 3 }),
    new Item({ id: 1210, quality: 4, grade: 3 }),
    new Item({ id: 1211, quality: 4, grade: 3 }),
    new Item({ id: 1212, quality: 4, grade: 3 }),
    new Item({ id: 1213, quality: 4, grade: 3 }),
    new Item({ id: 1214, quality: 4, grade: 3 }),
    new Item({ id: 1215, quality: 10, grade: 3 }),
    new Item({ id: 1216, quality: 4, grade: 3 }),
    new Item({ id: 1217, quality: 10, grade: 3 }),
    new Item({ id: 1218, quality: 4, grade: 4 }),
    new Item({ id: 1219, quality: 10, grade: 4 }),
    new Item({ id: 1220, quality: 4, grade: 4 }),
    new Item({ id: 1221, quality: 4, grade: 4 }),
    new Item({ id: 1222, quality: 10, grade: 4 }),
    new Item({ id: 1223, quality: 4, grade: 5 }),
    new Item({ id: 1224, quality: 4, grade: 5 }),
    new Item({ id: 1225, quality: 10, grade: 5 }),
    new Item({ id: 1226, quality: 10, grade: 6 }),
    new Item({ id: 1227, quality: 4, grade: 6 }),
];
cA[118].loot = [
    new Item({ id: 1228, quality: 6, grade: 3 }),
    new Item({ id: 1229, quality: 6, grade: 3 }),
    new Item({ id: 1230, quality: 6, grade: 3 }),
    new Item({ id: 1231, quality: 6, grade: 3 }),
    new Item({ id: 1232, quality: 6, grade: 3 }),
    new Item({ id: 1233, quality: 6, grade: 4 }),
    new Item({ id: 1234, quality: 6, grade: 4 }),
    new Item({ id: 1235, quality: 6, grade: 4 }),
    new Item({ id: 1236, quality: 6, grade: 5 }),
    new Item({ id: 1237, quality: 6, grade: 5 }),
    new Item({ id: 1238, quality: 6, grade: 6 }),
];
cA[119].loot = [
    new Item({ id: 1239, quality: 6, grade: 3 }),
    new Item({ id: 1240, quality: 6, grade: 3 }),
    new Item({ id: 1241, quality: 6, grade: 3 }),
    new Item({ id: 1242, quality: 6, grade: 3 }),
    new Item({ id: 1243, quality: 6, grade: 3 }),
    new Item({ id: 1244, quality: 6, grade: 4 }),
    new Item({ id: 1245, quality: 6, grade: 4 }),
    new Item({ id: 1246, quality: 6, grade: 4 }),
    new Item({ id: 1247, quality: 6, grade: 4 }),
    new Item({ id: 1248, quality: 6, grade: 5 }),
    new Item({ id: 1249, quality: 6, grade: 5 }),
    new Item({ id: 1250, quality: 6, grade: 5 }),
    new Item({ id: 1251, quality: 6, grade: 6 }),
];
cA[120].loot = [
    new Item({ id: 1252, quality: 5, grade: 1 }),
    new Item({ id: 1253, quality: 5, grade: 1 }),
    new Item({ id: 1254, quality: 5, grade: 2 }),
    new Item({ id: 1255, quality: 5, grade: 2 }),
    new Item({ id: 1256, quality: 5, grade: 3 }),
    new Item({ id: 1257, quality: 5, grade: 3 }),
    new Item({ id: 1258, quality: 5, grade: 3 }),
    new Item({ id: 1259, quality: 5, grade: 4 }),
    new Item({ id: 1260, quality: 5, grade: 4 }),
    new Item({ id: 1261, quality: 5, grade: 4 }),
];
cA[121].loot = [
    new Item({ id: 1262, quality: 5, grade: 1 }),
    new Item({ id: 1263, quality: 5, grade: 1 }),
    new Item({ id: 1264, quality: 5, grade: 2 }),
    new Item({ id: 1265, quality: 5, grade: 2 }),
    new Item({ id: 1266, quality: 5, grade: 3 }),
    new Item({ id: 1267, quality: 5, grade: 3 }),
    new Item({ id: 1268, quality: 5, grade: 4 }),
    new Item({ id: 1269, quality: 5, grade: 4 }),
];
cA[122].loot = [
    new Item({ id: 1270, quality: 4, grade: 3 }),
    new Item({ id: 1271, quality: 10, grade: 3 }),
    new Item({ id: 1272, quality: 4, grade: 3 }),
    new Item({ id: 1273, quality: 4, grade: 3 }),
    new Item({ id: 1274, quality: 10, grade: 3 }),
    new Item({ id: 1275, quality: 10, grade: 3 }),
    new Item({ id: 1276, quality: 10, grade: 3 }),
    new Item({ id: 1277, quality: 10, grade: 3 }),
    new Item({ id: 1278, quality: 4, grade: 3 }),
    new Item({ id: 1279, quality: 10, grade: 3 }),
    new Item({ id: 1280, quality: 4, grade: 4 }),
    new Item({ id: 1281, quality: 4, grade: 4 }),
    new Item({ id: 1282, quality: 10, grade: 4 }),
    new Item({ id: 1283, quality: 10, grade: 4 }),
    new Item({ id: 1284, quality: 4, grade: 4 }),
    new Item({ id: 1285, quality: 4, grade: 5 }),
    new Item({ id: 1286, quality: 10, grade: 5 }),
    new Item({ id: 1287, quality: 4, grade: 5 }),
    new Item({ id: 1288, quality: 10, grade: 6 }),
    new Item({ id: 1289, quality: 10, grade: 6 }),
];
cA[123].loot = [
    new Item({ id: 1290, quality: 6, grade: 3 }),
    new Item({ id: 1291, quality: 6, grade: 3 }),
    new Item({ id: 1292, quality: 6, grade: 3 }),
    new Item({ id: 1293, quality: 6, grade: 3 }),
    new Item({ id: 1294, quality: 6, grade: 3 }),
    new Item({ id: 1295, quality: 6, grade: 3 }),
    new Item({ id: 1296, quality: 6, grade: 3 }),
    new Item({ id: 1297, quality: 6, grade: 3 }),
    new Item({ id: 1298, quality: 6, grade: 4 }),
    new Item({ id: 1299, quality: 6, grade: 4 }),
    new Item({ id: 1300, quality: 6, grade: 4 }),
    new Item({ id: 1301, quality: 6, grade: 4 }),
    new Item({ id: 1302, quality: 6, grade: 5 }),
    new Item({ id: 1303, quality: 6, grade: 5 }),
    new Item({ id: 1304, quality: 6, grade: 6 }),
];
cA[124].loot = [
    new Item({ id: 1305, quality: 10, grade: 3 }),
    new Item({ id: 1306, quality: 4, grade: 3 }),
    new Item({ id: 1307, quality: 4, grade: 3 }),
    new Item({ id: 1308, quality: 10, grade: 3 }),
    new Item({ id: 1309, quality: 4, grade: 3 }),
    new Item({ id: 1310, quality: 10, grade: 3 }),
    new Item({ id: 1311, quality: 10, grade: 3 }),
    new Item({ id: 1312, quality: 4, grade: 3 }),
    new Item({ id: 1313, quality: 10, grade: 4 }),
    new Item({ id: 1314, quality: 10, grade: 4 }),
    new Item({ id: 1315, quality: 4, grade: 4 }),
    new Item({ id: 1316, quality: 10, grade: 4 }),
    new Item({ id: 1317, quality: 4, grade: 4 }),
    new Item({ id: 1318, quality: 4, grade: 4 }),
    new Item({ id: 1319, quality: 4, grade: 4 }),
    new Item({ id: 1320, quality: 4, grade: 5 }),
    new Item({ id: 1321, quality: 4, grade: 5 }),
    new Item({ id: 1322, quality: 10, grade: 5 }),
    new Item({ id: 1323, quality: 4, grade: 6 }),
];
cA[125].loot = [
    new Item({ id: 1324, quality: 4, grade: 3 }),
    new Item({ id: 1325, quality: 10, grade: 3 }),
    new Item({ id: 1326, quality: 4, grade: 3 }),
    new Item({ id: 1327, quality: 10, grade: 3 }),
    new Item({ id: 1328, quality: 10, grade: 3 }),
    new Item({ id: 1329, quality: 4, grade: 3 }),
    new Item({ id: 1330, quality: 10, grade: 3 }),
    new Item({ id: 1331, quality: 10, grade: 3 }),
    new Item({ id: 1332, quality: 4, grade: 3 }),
    new Item({ id: 1333, quality: 4, grade: 3 }),
    new Item({ id: 1334, quality: 4, grade: 4 }),
    new Item({ id: 1335, quality: 4, grade: 4 }),
    new Item({ id: 1336, quality: 4, grade: 4 }),
    new Item({ id: 1337, quality: 4, grade: 4 }),
    new Item({ id: 1338, quality: 10, grade: 4 }),
    new Item({ id: 1339, quality: 4, grade: 4 }),
    new Item({ id: 1340, quality: 10, grade: 5 }),
    new Item({ id: 1341, quality: 4, grade: 5 }),
    new Item({ id: 1342, quality: 10, grade: 5 }),
    new Item({ id: 1343, quality: 10, grade: 6 }),
];
cA[126].loot = [
    new Item({ id: 1344, quality: 6, grade: 3 }),
    new Item({ id: 1345, quality: 6, grade: 3 }),
    new Item({ id: 1346, quality: 6, grade: 3 }),
    new Item({ id: 1347, quality: 6, grade: 3 }),
    new Item({ id: 1348, quality: 6, grade: 4 }),
    new Item({ id: 1349, quality: 6, grade: 4 }),
    new Item({ id: 1350, quality: 6, grade: 4 }),
    new Item({ id: 1351, quality: 6, grade: 5 }),
    new Item({ id: 1352, quality: 6, grade: 5 }),
    new Item({ id: 1353, quality: 6, grade: 6 })
];
cA[127].loot = [
    new Item({ id: 1422, quality: 4, grade: 3 }),
    new Item({ id: 1423, quality: 4, grade: 3 }),
    new Item({ id: 1424, quality: 10, grade: 3 }),
    new Item({ id: 1425, quality: 4, grade: 3 }),
    new Item({ id: 1426, quality: 4, grade: 3 }),
    new Item({ id: 1427, quality: 4, grade: 3 }),
    new Item({ id: 1428, quality: 10, grade: 3 }),
    new Item({ id: 1429, quality: 10, grade: 3 }),
    new Item({ id: 1430, quality: 10, grade: 3 }),
    new Item({ id: 1431, quality: 4, grade: 4 }),
    new Item({ id: 1432, quality: 10, grade: 4 }),
    new Item({ id: 1433, quality: 4, grade: 4 }),
    new Item({ id: 1434, quality: 4, grade: 4 }),
    new Item({ id: 1435, quality: 4, grade: 4 }),
    new Item({ id: 1436, quality: 4, grade: 5 }),
    new Item({ id: 1437, quality: 10, grade: 5 }),
    new Item({ id: 1438, quality: 10, grade: 5 }),
    new Item({ id: 1439, quality: 10, grade: 6 }),
];
cA[128].loot = [
    new Item({ id: 1440, quality: 10, grade: 3 }),
    new Item({ id: 1441, quality: 4, grade: 3 }),
    new Item({ id: 1442, quality: 10, grade: 3 }),
    new Item({ id: 1443, quality: 4, grade: 3 }),
    new Item({ id: 1444, quality: 4, grade: 3 }),
    new Item({ id: 1445, quality: 10, grade: 3 }),
    new Item({ id: 1446, quality: 4, grade: 3 }),
    new Item({ id: 1447, quality: 10, grade: 3 }),
    new Item({ id: 1448, quality: 10, grade: 3 }),
    new Item({ id: 1449, quality: 4, grade: 3 }),
    new Item({ id: 1450, quality: 4, grade: 4 }),
    new Item({ id: 1451, quality: 10, grade: 4 }),
    new Item({ id: 1452, quality: 4, grade: 4 }),
    new Item({ id: 1453, quality: 4, grade: 4 }),
    new Item({ id: 1454, quality: 4, grade: 4 }),
    new Item({ id: 1455, quality: 4, grade: 4 }),
    new Item({ id: 1456, quality: 4, grade: 5 }),
    new Item({ id: 1457, quality: 10, grade: 5 }),
    new Item({ id: 1458, quality: 10, grade: 5 }),
    new Item({ id: 1459, quality: 4, grade: 5 }),
    new Item({ id: 1460, quality: 10, grade: 6 }),
    new Item({ id: 1461, quality: 10, grade: 6 }),
];
cA[129].loot = [
    new Item({ id: 776, quality: 4 }),
    new Item({ id: 301, quality: 10 }),
    new Item({ id: 1462, quality: 10 }),
    new Item({ id: 225, quality: 10 }),
    new Item({ id: 517, quality: 4 }),
    new Item({ id: 386, quality: 4 }),
    new Item({ id: 1355, quality: 10 }),
    new Item({ id: 387, quality: 10 }),
    //Row2
    new Item({ id: 226, quality: 4 }),
    new Item({ id: 1463, quality: 4 }),
    new Item({ id: 900, quality: 4 }),
    new Item({ id: 521, quality: 4 }),
    new Item({ id: 698, quality: 4 }),
    new Item({ id: 508, quality: 4 }),
    new Item({ id: 486, quality: 4 }),
    new Item({ id: 361, quality: 4 }),
    //Row3
    new Item({ id: 288, quality: 4 }),
    new Item({ id: 448, quality: 4 }),
    new Item({ id: 289, quality: 10 }),
    new Item({ id: 532, quality: 4 }),
    new Item({ id: 777, quality: 10 }),
    new Item({ id: 666, quality: 10 }),
    new Item({ id: 506, quality: 10 }),
    new Item({ id: 499, quality: 4 }),
    //Row4
    new Item({ id: 1358, quality: 10 }),
    new Item({ id: 703, quality: 4 }),
    new Item({ id: 778, quality: 4 }),
    new Item({ id: 779, quality: 10 }),
    new Item({ id: 780, quality: 4 }),
    new Item({ id: 710, quality: 10 }),
    new Item({ id: 704, quality: 10 }),
    new Item({ id: 781, quality: 4 }),
    //Row5
    new Item({ id: 331, quality: 4 }),
    new Item({ id: 1464, quality: 4 }),
    new Item({ id: 912, quality: 4 }),
    new Item({ id: 714, quality: 4 }),
    new Item({ id: 307, quality: 4 }),
    new Item({ id: 21, quality: 10 }),
    new Item({ id: 389, quality: 10 }),
    new Item({ id: 172, quality: 10 })
];
cA[130].loot = [
    new Item({ id: 709, quality: 4 }),
    new Item({ id: 519, quality: 4 }),
    new Item({ id: 287, quality: 4 }),
    new Item({ id: 480, quality: 10 }),
    new Item({ id: 782, quality: 4 }),
    new Item({ id: 459, quality: 10 }),
    new Item({ id: 921, quality: 4 }),
    new Item({ id: 918, quality: 4 }),
    //Row2
    new Item({ id: 509, quality: 4 }),
    new Item({ id: 514, quality: 4 }),
    new Item({ id: 913, quality: 10 }),
    new Item({ id: 1368, quality: 10 }),
    new Item({ id: 520, quality: 4 }),
    new Item({ id: 390, quality: 10 }),
    new Item({ id: 715, quality: 10 }),
    new Item({ id: 292, quality: 10 }),
    //Row3
    new Item({ id: 485, quality: 4 }),
    new Item({ id: 1369, quality: 10 }),
    new Item({ id: 716, quality: 4 }),
    new Item({ id: 229, quality: 4 }),
    new Item({ id: 518, quality: 4 }),
    new Item({ id: 1367, quality: 10 }),
    new Item({ id: 783, quality: 4 }),
    new Item({ id: 713, quality: 4 }),
    //Row4
    new Item({ id: 914, quality: 4 }),
    new Item({ id: 488, quality: 10 }),
    new Item({ id: 908, quality: 10 }),
    new Item({ id: 476, quality: 4 }),
    new Item({ id: 692, quality: 10 }),
    new Item({ id: 358, quality: 10 }),
    new Item({ id: 391, quality: 4 }),
    new Item({ id: 1465, quality: 4 }),
    //Row5
    new Item({ id: 784, quality: 10 }),
    new Item({ id: 1360, quality: 10 }),
    new Item({ id: 392, quality: 10 }),
    new Item({ id: 137, quality: 10 }),
    new Item({ id: 393, quality: 10 }),
    new Item({ id: 475, quality: 10 }),
    new Item({ id: 308, quality: 10 }),
    new Item({ id: 525, quality: 10 })
];
cA[131].loot = [
    new Item({ id: 550, quality: 4 }),
    new Item({ id: 1466, quality: 4 }),
    new Item({ id: 469, quality: 4 }),
    new Item({ id: 1376, quality: 10 }),
    new Item({ id: 682, quality: 4 }),
    new Item({ id: 394, quality: 10 }),
    new Item({ id: 549, quality: 10 }),
    new Item({ id: 1371, quality: 10 }),
    //Row2
    new Item({ id: 510, quality: 10 }),
    new Item({ id: 1467, quality: 4 }),
    new Item({ id: 343, quality: 4 }),
    new Item({ id: 785, quality: 10 }),
    new Item({ id: 1468, quality: 4 }),
    new Item({ id: 489, quality: 4 }),
    new Item({ id: 395, quality: 10 }),
    new Item({ id: 786, quality: 10 }),
    //Row3
    new Item({ id: 396, quality: 4 }),
    new Item({ id: 397, quality: 10 }),
    new Item({ id: 245, quality: 10 }),
    new Item({ id: 787, quality: 4 }),
    new Item({ id: 788, quality: 4 }),
    new Item({ id: 398, quality: 4 }),
    new Item({ id: 230, quality: 10 }),
    new Item({ id: 496, quality: 10 }),
    //Row4
    new Item({ id: 370, quality: 10 }),
    new Item({ id: 296, quality: 4 }),
    new Item({ id: 231, quality: 4 }),
    new Item({ id: 1469, quality: 4 }),
    new Item({ id: 1377, quality: 10 }),
    new Item({ id: 789, quality: 4 }),
    new Item({ id: 463, quality: 4 }),
    new Item({ id: 399, quality: 10 }),
    //Row5
    new Item({ id: 904, quality: 4 }),
    new Item({ id: 5, quality: 10 }),
    new Item({ id: 483, quality: 10 }),
    new Item({ id: 400, quality: 10 }),
    new Item({ id: 1470, quality: 4 }),
    new Item({ id: 401, quality: 10 }),
    new Item({ id: 310, quality: 4 }),
    new Item({ id: 402, quality: 10 }),
    //Row6
    new Item({ id: 183, quality: 10 }),
    new Item({ id: 403, quality: 4 }),
    new Item({ id: 404, quality: 4 }),
    new Item({ id: 790, quality: 4 }),
    new Item({ id: 791, quality: 10 }),
    new Item({ id: 718, quality: 10 }),
    new Item({ id: 527, quality: 4 }),
    new Item({ id: 699, quality: 4 }),
    //Row7
    new Item({ id: 705, quality: 10 }),
    new Item({ id: 686, quality: 4 }),
    new Item({ id: 546, quality: 4 }),
    new Item({ id: 898, quality: 4 }),
    new Item({ id: 1379, quality: 10 }),
    new Item({ id: 354, quality: 4 }),
    new Item({ id: 342, quality: 10 })
];
cA[132].loot = [
    new Item({ id: 1471, quality: 4 }),
    new Item({ id: 1472, quality: 4 }),
    new Item({ id: 792, quality: 10 }),
    new Item({ id: 309, quality: 4 }),
    new Item({ id: 285, quality: 4 }),
    new Item({ id: 512, quality: 10 }),
    new Item({ id: 405, quality: 10 }),
    new Item({ id: 406, quality: 4 }),
    //Row2
    new Item({ id: 907, quality: 10 }),
    new Item({ id: 407, quality: 10 }),
    new Item({ id: 1386, quality: 10 }),
    new Item({ id: 719, quality: 4 }),
    new Item({ id: 357, quality: 4 }),
    new Item({ id: 408, quality: 10 }),
    new Item({ id: 461, quality: 4 }),
    new Item({ id: 915, quality: 4 }),
    //Row3
    new Item({ id: 901, quality: 4 }),
    new Item({ id: 409, quality: 10 }),
    new Item({ id: 793, quality: 10 }),
    new Item({ id: 498, quality: 4 }),
    new Item({ id: 477, quality: 4 }),
    new Item({ id: 487, quality: 10 }),
    new Item({ id: 118, quality: 10 }),
    new Item({ id: 410, quality: 4 }),
    //Row4
    new Item({ id: 711, quality: 4 }),
    new Item({ id: 548, quality: 4 }),
    new Item({ id: 721, quality: 4 }),
    new Item({ id: 1473, quality: 4 }),
    new Item({ id: 537, quality: 10 }),
    new Item({ id: 48, quality: 10 }),
    new Item({ id: 411, quality: 10 }),
    new Item({ id: 794, quality: 10 }),
    //Row5
    new Item({ id: 722, quality: 4 }),
    new Item({ id: 1380, quality: 10 }),
    new Item({ id: 412, quality: 4 }),
    new Item({ id: 795, quality: 4 }),
    new Item({ id: 796, quality: 4 }),
    new Item({ id: 1474, quality: 4 }),
    new Item({ id: 464, quality: 10 }),
    new Item({ id: 413, quality: 10 }),
    //Row6
    new Item({ id: 724, quality: 10 }),
    new Item({ id: 492, quality: 10 }),
    new Item({ id: 712, quality: 10 }),
    new Item({ id: 281, quality: 10 }),
    new Item({ id: 341, quality: 10 }),
    new Item({ id: 507, quality: 4 })
];
cA[133].loot = [
    new Item({ id: 284, quality: 4 }),
    new Item({ id: 516, quality: 10 }),
    new Item({ id: 491, quality: 4 }),
    new Item({ id: 474, quality: 4 }),
    new Item({ id: 725, quality: 10 }),
    new Item({ id: 414, quality: 10 }),
    new Item({ id: 726, quality: 4 }),
    new Item({ id: 727, quality: 10 }),
    //Row2
    new Item({ id: 905, quality: 10 }),
    new Item({ id: 522, quality: 4 }),
    new Item({ id: 728, quality: 4 }),
    new Item({ id: 415, quality: 10 }),
    new Item({ id: 1391, quality: 10 }),
    new Item({ id: 729, quality: 4 }),
    new Item({ id: 363, quality: 4 }),
    new Item({ id: 468, quality: 4 }),
    //Row3
    new Item({ id: 917, quality: 4 }),
    new Item({ id: 481, quality: 10 }),
    new Item({ id: 730, quality: 4 }),
    new Item({ id: 1475, quality: 4 }),
    new Item({ id: 697, quality: 4 }),
    new Item({ id: 693, quality: 10 }),
    new Item({ id: 131, quality: 10 }),
    new Item({ id: 1392, quality: 10 }),
    //Row4
    new Item({ id: 265, quality: 10 }),
    new Item({ id: 731, quality: 4 }),
    new Item({ id: 505, quality: 4 }),
    new Item({ id: 732, quality: 10 }),
    new Item({ id: 232, quality: 4 }),
    new Item({ id: 916, quality: 4 }),
    new Item({ id: 303, quality: 10 }),
    new Item({ id: 416, quality: 4 }),
    //Row5
    new Item({ id: 1476, quality: 4 }),
    new Item({ id: 197, quality: 10 }),
    new Item({ id: 733, quality: 10 }),
    new Item({ id: 501, quality: 10 }),
    new Item({ id: 417, quality: 10 }),
    new Item({ id: 462, quality: 4 }),
    new Item({ id: 734, quality: 4 }),
    new Item({ id: 735, quality: 4 }),
    //Row6
    new Item({ id: 797, quality: 4 })
];
cA[134].loot = [
    new Item({ id: 736, quality: 4 }),
    new Item({ id: 366, quality: 10 }),
    new Item({ id: 1394, quality: 10 }),
    new Item({ id: 672, quality: 4 }),
    new Item({ id: 798, quality: 10 }),
    new Item({ id: 418, quality: 10 }),
    new Item({ id: 708, quality: 4 }),
    new Item({ id: 473, quality: 4 }),
    //Row2
    new Item({ id: 799, quality: 4 }),
    new Item({ id: 737, quality: 4 }),
    new Item({ id: 800, quality: 4 }),
    new Item({ id: 1393, quality: 10 }),
    new Item({ id: 700, quality: 4 }),
    new Item({ id: 513, quality: 4 }),
    new Item({ id: 533, quality: 4 }),
    new Item({ id: 293, quality: 4 }),
    //Row3
    new Item({ id: 899, quality: 4 }),
    new Item({ id: 801, quality: 4 }),
    new Item({ id: 802, quality: 4 }),
    new Item({ id: 803, quality: 4 }),
    new Item({ id: 467, quality: 10 }),
    new Item({ id: 804, quality: 10 }),
    new Item({ id: 1396, quality: 4 }),
    new Item({ id: 420, quality: 10 }),
    //Row4
    new Item({ id: 304, quality: 4 }),
    new Item({ id: 458, quality: 4 }),
    new Item({ id: 143, quality: 10 }),
    new Item({ id: 35, quality: 10 }),
    new Item({ id: 738, quality: 4 }),
    new Item({ id: 903, quality: 4 }),
    new Item({ id: 233, quality: 4 }),
    new Item({ id: 421, quality: 4 }),
    //Row5
    new Item({ id: 1477, quality: 4 }),
    new Item({ id: 1478, quality: 10 }),
    new Item({ id: 964, quality: 10 }),
    new Item({ id: 422, quality: 10 }),
    new Item({ id: 423, quality: 10 }),
    new Item({ id: 805, quality: 4 }),
    new Item({ id: 523, quality: 4 }),
    new Item({ id: 739, quality: 10 }),
    //Row6
    new Item({ id: 740, quality: 4 }),
    new Item({ id: 1397, quality: 10 })
];
cA[135].loot = [ // Medic
    new Item({ id: 545, quality: 4 }),
    new Item({ id: 690, quality: 4 }),
    new Item({ id: 1479, quality: 4 }),
    new Item({ id: 524, quality: 10 }),
    new Item({ id: 424, quality: 4 }),
    new Item({ id: 806, quality: 4 }),
    new Item({ id: 741, quality: 4 }),
    new Item({ id: 1480, quality: 4 }),
    //Row2
    new Item({ id: 515, quality: 4 }),
    new Item({ id: 478, quality: 4 }),
    new Item({ id: 465, quality: 10 }),
    new Item({ id: 482, quality: 10 }),
    new Item({ id: 504, quality: 10 }),
    new Item({ id: 497, quality: 4 }),
    new Item({ id: 526, quality: 10 }),
    new Item({ id: 490, quality: 10 }),
    //Row3
    new Item({ id: 356, quality: 4 }),
    new Item({ id: 360, quality: 4 }),
    new Item({ id: 742, quality: 4 }),
    new Item({ id: 743, quality: 4 }),
    new Item({ id: 744, quality: 4 }),
    new Item({ id: 290, quality: 10 }),
    new Item({ id: 425, quality: 10 }),
    new Item({ id: 745, quality: 4 }),
    //Row4
    new Item({ id: 746, quality: 10 }),
    new Item({ id: 696, quality: 10 }),
    new Item({ id: 426, quality: 4 }),
    new Item({ id: 306, quality: 4 }),
    new Item({ id: 551, quality: 4 }),
    new Item({ id: 807, quality: 4 }),
    new Item({ id: 1481, quality: 4 }),
    new Item({ id: 689, quality: 10 }),
    //Row5
    new Item({ id: 188, quality: 10 }),
    new Item({ id: 427, quality: 10 }),
    new Item({ id: 428, quality: 4 }),
    new Item({ id: 701, quality: 4 }),
    new Item({ id: 553, quality: 10 }),
    new Item({ id: 748, quality: 4 }),
    new Item({ id: 429, quality: 4 }),
    new Item({ id: 371, quality: 4 }),
    //Row6
    new Item({ id: 316, quality: 10 }),
    new Item({ id: 1482, quality: 4 }),
    new Item({ id: 749, quality: 10 }),
    new Item({ id: 430, quality: 10 }),
    new Item({ id: 123, quality: 10 }),
    new Item({ id: 431, quality: 10 }),
    new Item({ id: 542, quality: 4 }),
    new Item({ id: 808, quality: 4 })
];
cA[136].loot = [ // Sniper
    new Item({ id: 750, quality: 4 }),
    new Item({ id: 500, quality: 4 }),
    new Item({ id: 538, quality: 10 }),
    new Item({ id: 536, quality: 4 }),
    new Item({ id: 493, quality: 4 }),
    new Item({ id: 359, quality: 10 }),
    new Item({ id: 259, quality: 4 }),
    new Item({ id: 706, quality: 4 }),
    //Row2
    new Item({ id: 511, quality: 4 }),
    new Item({ id: 695, quality: 4 }),
    new Item({ id: 1407, quality: 10 }),
    new Item({ id: 702, quality: 4 }),
    new Item({ id: 751, quality: 4 }),
    new Item({ id: 302, quality: 4 }),
    new Item({ id: 432, quality: 10 }),
    new Item({ id: 539, quality: 4 }),
    //Row3
    new Item({ id: 294, quality: 10 }),
    new Item({ id: 1402, quality: 4 }),
    new Item({ id: 234, quality: 4 }),
    new Item({ id: 134, quality: 10 }),
    new Item({ id: 1483, quality: 10 }),
    new Item({ id: 809, quality: 4 }),
    new Item({ id: 135, quality: 10 }),
    new Item({ id: 433, quality: 10 }),
    //Row4
    new Item({ id: 323, quality: 4 }),
    new Item({ id: 688, quality: 4 }),
    new Item({ id: 434, quality: 10 }),
    new Item({ id: 1406, quality: 10 }),
    new Item({ id: 810, quality: 4 }),
    new Item({ id: 472, quality: 10 }),
    new Item({ id: 1405, quality: 10 })
];
cA[137].loot = [ // Spy
    new Item({ id: 495, quality: 4 }),
    new Item({ id: 811, quality: 4 }),
    new Item({ id: 812, quality: 10 }),
    new Item({ id: 136, quality: 10 }),
    new Item({ id: 753, quality: 4 }),
    new Item({ id: 435, quality: 10 }),
    new Item({ id: 479, quality: 10 }),
    new Item({ id: 466, quality: 4 }),
    //Row2
    new Item({ id: 436, quality: 10 }),
    new Item({ id: 286, quality: 4 }),
    new Item({ id: 1484, quality: 4 }),
    new Item({ id: 375, quality: 10 }),
    new Item({ id: 355, quality: 4 }),
    new Item({ id: 540, quality: 4 }),
    new Item({ id: 503, quality: 10 }),
    new Item({ id: 305, quality: 10 }),
    //Row3
    new Item({ id: 541, quality: 10 }),
    new Item({ id: 1413, quality: 10 }),
    new Item({ id: 437, quality: 4 }),
    new Item({ id: 754, quality: 10 }),
    new Item({ id: 460, quality: 10 }),
    new Item({ id: 484, quality: 4 }),
    new Item({ id: 813, quality: 4 }),
    new Item({ id: 326, quality: 4 }),
    //Row4
    new Item({ id: 814, quality: 4 }),
    new Item({ id: 1485, quality: 4 }),
    new Item({ id: 1486, quality: 4 })
];
cA[138].loot = [ // Allclass
    new Item({ id: 227, quality: 4 }),
    new Item({ id: 1420, quality: 4 }),
    new Item({ id: 295, quality: 4 }),
    new Item({ id: 442, quality: 4 }),
    new Item({ id: 543, quality: 4 }),
    new Item({ id: 329, quality: 4 }),
    new Item({ id: 388, quality: 10 }),
    new Item({ id: 906, quality: 10 }),
    //Row2
    new Item({ id: 456, quality: 4 }),
    new Item({ id: 454, quality: 10 }),
    new Item({ id: 235, quality: 10 }),
    new Item({ id: 816, quality: 4 }),
    new Item({ id: 1487, quality: 4 }),
    new Item({ id: 1488, quality: 4 }),
    new Item({ id: 902, quality: 10 }),
    new Item({ id: 552, quality: 10 }),
    //Row3
    new Item({ id: 327, quality: 10 }),
    new Item({ id: 544, quality: 4 }),
    new Item({ id: 717, quality: 4 }),
    new Item({ id: 720, quality: 10 }),
    new Item({ id: 687, quality: 4 }),
    new Item({ id: 755, quality: 10 }),
    new Item({ id: 684, quality: 4 }),
    new Item({ id: 1489, quality: 4 }),
    //Row4
    new Item({ id: 419, quality: 4 }),
    new Item({ id: 328, quality: 10 }),
    new Item({ id: 340, quality: 4 }),
    new Item({ id: 817, quality: 4 }),
    new Item({ id: 471, quality: 10 }),
    new Item({ id: 1490, quality: 4 }),
    new Item({ id: 911, quality: 4 }),
    new Item({ id: 554, quality: 4 }),
    //Row5
    new Item({ id: 438, quality: 10 }),
    new Item({ id: 494, quality: 4 }),
    new Item({ id: 275, quality: 10 }),
    new Item({ id: 291, quality: 4 }),
    new Item({ id: 547, quality: 10 }),
    new Item({ id: 1418, quality: 10 }),
    new Item({ id: 1419, quality: 10 }),
    new Item({ id: 1491, quality: 4 }),
    //Row6
    new Item({ id: 1417, quality: 10 }),
    new Item({ id: 691, quality: 10 }),
    new Item({ id: 756, quality: 10 }),
    new Item({ id: 502, quality: 4 }),
    new Item({ id: 1492, quality: 4 }),
    new Item({ id: 815, quality: 10 }),
    new Item({ id: 365, quality: 4 }),
    new Item({ id: 439, quality: 10 }),
    //Row7
    new Item({ id: 383, quality: 10 }),
    new Item({ id: 747, quality: 4 }),
    new Item({ id: 364, quality: 4 }),
    new Item({ id: 685, quality: 10 }),
    new Item({ id: 1414, quality: 10 }),
    new Item({ id: 440, quality: 10 }),
    new Item({ id: 228, quality: 4 }),
    new Item({ id: 1493, quality: 4 }),
    //Row8
    new Item({ id: 707, quality: 10 }),
    new Item({ id: 457, quality: 10 }),
    new Item({ id: 1494, quality: 4 }),
    new Item({ id: 325, quality: 4 }),
    new Item({ id: 250, quality: 10 }),
    new Item({ id: 910, quality: 4 }),
    new Item({ id: 723, quality: 4 }),
    new Item({ id: 535, quality: 4 }),
    //Row9
    new Item({ id: 332, quality: 4 }),
    new Item({ id: 683, quality: 4 }),
    new Item({ id: 1495, quality: 4 }),
    new Item({ id: 818, quality: 10 }),
    new Item({ id: 752, quality: 4 }),
    new Item({ id: 362, quality: 10 }),
    new Item({ id: 1415, quality: 10 }),
    new Item({ id: 441, quality: 10 }),
    //Row10
    new Item({ id: 694, quality: 10 }),
    new Item({ id: 1496, quality: 4 }),
    new Item({ id: 1497, quality: 4 }),
    new Item({ id: 531, quality: 4 }),
    new Item({ id: 470, quality: 4 }),
    new Item({ id: 819, quality: 10 }),
    new Item({ id: 534, quality: 4 }),
    new Item({ id: 455, quality: 10 }),
    //Row11
    new Item({ id: 909, quality: 10 })
];
cA[139].loot = [ //
    new Item({ id: 1499, quality: 4, grade: 3 }),
    new Item({ id: 1500, quality: 4, grade: 3 }),
    new Item({ id: 1501, quality: 4, grade: 3 }),
    new Item({ id: 1502, quality: 4, grade: 3 }),
    new Item({ id: 1503, quality: 4, grade: 3 }),
    new Item({ id: 1504, quality: 4, grade: 3 }), //
    new Item({ id: 1505, quality: 10, grade: 3 }),
    new Item({ id: 1506, quality: 10, grade: 3 }),
    new Item({ id: 1507, quality: 10, grade: 3 }),
    new Item({ id: 1508, quality: 4, grade: 3 }),
    new Item({ id: 1509, quality: 10, grade: 4 }),
    new Item({ id: 1510, quality: 10, grade: 4 }),
    new Item({ id: 1511, quality: 4, grade: 4 }),
    new Item({ id: 1512, quality: 10, grade: 4 }), //
    new Item({ id: 1513, quality: 4, grade: 4 }),
    new Item({ id: 1514, quality: 4, grade: 4 }),
    new Item({ id: 1515, quality: 4, grade: 5 }),
    new Item({ id: 1516, quality: 4, grade: 5 }),
    new Item({ id: 1517, quality: 4, grade: 5 }),
    new Item({ id: 1518, quality: 10, grade: 5 }),
    new Item({ id: 1519, quality: 4, grade: 6 }),
    new Item({ id: 1520, quality: 10, grade: 6 }),
];
cA[140].loot = [ // xmas 2019 cosmetics
    new Item({ id: 1521, quality: 4, grade: 3 }),
    new Item({ id: 1522, quality: 10, grade: 3 }),
    new Item({ id: 1523, quality: 10, grade: 3 }),
    new Item({ id: 1524, quality: 4, grade: 3 }),
    new Item({ id: 1525, quality: 10, grade: 3 }),
    new Item({ id: 1526, quality: 4, grade: 3 }), //
    new Item({ id: 1527, quality: 10, grade: 3 }),
    new Item({ id: 1528, quality: 10, grade: 3 }),
    new Item({ id: 1529, quality: 4, grade: 3 }),
    new Item({ id: 1530, quality: 4, grade: 4 }),
    new Item({ id: 1531, quality: 10, grade: 4 }),
    new Item({ id: 1532, quality: 10, grade: 4 }),
    new Item({ id: 1533, quality: 10, grade: 4 }),
    new Item({ id: 1534, quality: 4, grade: 4 }), //
    new Item({ id: 1535, quality: 4, grade: 5 }),
    new Item({ id: 1536, quality: 10, grade: 5 }),
    new Item({ id: 1537, quality: 10, grade: 5 }),
    new Item({ id: 1538, quality: 10, grade: 6 }),
];
cA[141].loot = [ // xmas 2019 weapons
    new Item({ id: 1539, quality: 6, grade: 3 }),
    new Item({ id: 1540, quality: 6, grade: 3 }),
    new Item({ id: 1541, quality: 6, grade: 3 }),
    new Item({ id: 1542, quality: 6, grade: 3 }),
    new Item({ id: 1543, quality: 6, grade: 4 }),
    new Item({ id: 1544, quality: 6, grade: 4 }),
    new Item({ id: 1545, quality: 6, grade: 4 }),
    new Item({ id: 1546, quality: 6, grade: 5 }),
    new Item({ id: 1547, quality: 6, grade: 5 }),
    new Item({ id: 1548, quality: 6, grade: 6 })
];
cA[142].loot = [ // summer 2020 cosmetics
    new Item({ id: 1549, quality: 4, grade: 3 }),
    new Item({ id: 1550, quality: 4, grade: 3 }),
    new Item({ id: 1551, quality: 10, grade: 3 }),
    new Item({ id: 1552, quality: 4, grade: 3 }),
    new Item({ id: 1553, quality: 10, grade: 3 }),
    new Item({ id: 1554, quality: 4, grade: 3 }), //
    new Item({ id: 1555, quality: 10, grade: 3 }),
    new Item({ id: 1556, quality: 10, grade: 3 }),
    new Item({ id: 1557, quality: 10, grade: 3 }),
    new Item({ id: 1558, quality: 10, grade: 3 }),
    new Item({ id: 1559, quality: 4, grade: 4 }),
    new Item({ id: 1560, quality: 4, grade: 4 }),
    new Item({ id: 1561, quality: 10, grade: 4 }),
    new Item({ id: 1562, quality: 4, grade: 4 }), //
    new Item({ id: 1563, quality: 10, grade: 4 }),
    new Item({ id: 1564, quality: 4, grade: 4 }),
    new Item({ id: 1565, quality: 10, grade: 5 }),
    new Item({ id: 1566, quality: 4, grade: 5 }),
    new Item({ id: 1567, quality: 4, grade: 5 }),
    new Item({ id: 1568, quality: 10, grade: 5 }),
    new Item({ id: 1569, quality: 10, grade: 6 }),
    new Item({ id: 1570, quality: 4, grade: 6 }),
];
cA[143].loot = [ // hw 2020 cosmetics
    new Item({ id: 1574, quality: 10, grade: 3 }),
    new Item({ id: 1575, quality: 4, grade: 3 }),
    new Item({ id: 1576, quality: 10, grade: 3 }),
    new Item({ id: 1577, quality: 4, grade: 3 }),
    new Item({ id: 1578, quality: 10, grade: 3 }),
    new Item({ id: 1579, quality: 10, grade: 3 }),
    new Item({ id: 1580, quality: 4, grade: 3 }),
    new Item({ id: 1581, quality: 10, grade: 3 }),
    new Item({ id: 1582, quality: 4, grade: 3 }),
    new Item({ id: 1583, quality: 4, grade: 3 }),
    new Item({ id: 1584, quality: 10, grade: 4 }),
    new Item({ id: 1585, quality: 4, grade: 4 }),
    new Item({ id: 1586, quality: 4, grade: 4 }),
    new Item({ id: 1587, quality: 10, grade: 4 }),
    new Item({ id: 1588, quality: 4, grade: 4 }),
    new Item({ id: 1589, quality: 10, grade: 4 }),
    new Item({ id: 1590, quality: 4, grade: 5 }),
    new Item({ id: 1591, quality: 10, grade: 5 }),
    new Item({ id: 1592, quality: 10, grade: 5 }),
    new Item({ id: 1593, quality: 10, grade: 5 }),
    new Item({ id: 1594, quality: 4, grade: 6 }),
    new Item({ id: 1595, quality: 10, grade: 6 }),
];
cA[144].loot = [ // hw 2020 war paints
    new Item({ id: 1596, quality: 6, grade: 3 }),
    new Item({ id: 1597, quality: 6, grade: 3 }),
    new Item({ id: 1598, quality: 6, grade: 3 }),
    new Item({ id: 1599, quality: 6, grade: 3 }),
    new Item({ id: 1600, quality: 6, grade: 3 }),
    new Item({ id: 1601, quality: 6, grade: 3 }),
    new Item({ id: 1602, quality: 6, grade: 3 }),
    new Item({ id: 1603, quality: 6, grade: 4 }),
    new Item({ id: 1604, quality: 6, grade: 4 }),
    new Item({ id: 1605, quality: 6, grade: 4 }),
    new Item({ id: 1606, quality: 6, grade: 4 }),
    new Item({ id: 1607, quality: 6, grade: 5 }),
    new Item({ id: 1608, quality: 6, grade: 5 }),
    new Item({ id: 1609, quality: 6, grade: 5 }),
    new Item({ id: 1610, quality: 6, grade: 6 }),
];
cA[145].loot = [ // xmas 2020 cosmetics
    new Item({ id: 1666, quality: 10, grade: 3 }),
    new Item({ id: 1667, quality: 4, grade: 3 }),
    new Item({ id: 1668, quality: 4, grade: 3 }),
    new Item({ id: 1669, quality: 10, grade: 3 }),
    new Item({ id: 1670, quality: 10, grade: 3 }),
    new Item({ id: 1671, quality: 4, grade: 3 }),
    new Item({ id: 1672, quality: 4, grade: 3 }),
    new Item({ id: 1673, quality: 10, grade: 3 }),
    new Item({ id: 1674, quality: 4, grade: 3 }),
    new Item({ id: 1675, quality: 10, grade: 3 }),
    new Item({ id: 1676, quality: 10, grade: 4 }),
    new Item({ id: 1677, quality: 10, grade: 4 }),
    new Item({ id: 1678, quality: 4, grade: 4 }),
    new Item({ id: 1679, quality: 10, grade: 4 }),
    new Item({ id: 1680, quality: 10, grade: 4 }),
    new Item({ id: 1681, quality: 4, grade: 4 }),
    new Item({ id: 1682, quality: 10, grade: 5 }),
    new Item({ id: 1683, quality: 10, grade: 5 }),
    new Item({ id: 1684, quality: 10, grade: 5 }),
    new Item({ id: 1685, quality: 10, grade: 6 })
];
cA[146].loot = [ // xmas 2020 war paints
    new Item({ id: 1686, quality: 6, grade: 3 }),
    new Item({ id: 1687, quality: 6, grade: 3 }),
    new Item({ id: 1688, quality: 6, grade: 3 }),
    new Item({ id: 1689, quality: 6, grade: 3 }),
    new Item({ id: 1690, quality: 6, grade: 3 }),
    new Item({ id: 1691, quality: 6, grade: 3 }),
    new Item({ id: 1692, quality: 6, grade: 4 }),
    new Item({ id: 1693, quality: 6, grade: 4 }),
    new Item({ id: 1694, quality: 6, grade: 4 }),
    new Item({ id: 1695, quality: 6, grade: 4 }),
    new Item({ id: 1696, quality: 6, grade: 5 }),
    new Item({ id: 1697, quality: 6, grade: 5 }),
    new Item({ id: 1698, quality: 6, grade: 6 })
];
cA[147].loot = [ // summer 2021 cosmetic case
    new Item({ id: 1707, quality: 4, grade: 3 }),
    new Item({ id: 1708, quality: 10, grade: 3 }),
    new Item({ id: 1709, quality: 10, grade: 3 }),
    new Item({ id: 1710, quality: 10, grade: 3 }),
    new Item({ id: 1711, quality: 10, grade: 3 }),
    new Item({ id: 1712, quality: 10, grade: 3 }),
    new Item({ id: 1713, quality: 4, grade: 3 }),
    new Item({ id: 1714, quality: 4, grade: 3 }),
    new Item({ id: 1715, quality: 10, grade: 3 }),
    new Item({ id: 1716, quality: 10, grade: 4 }),
    new Item({ id: 1717, quality: 4, grade: 4 }),
    new Item({ id: 1718, quality: 4, grade: 4 }),
    new Item({ id: 1719, quality: 4, grade: 4 }),
    new Item({ id: 1720, quality: 4, grade: 4 }),
    new Item({ id: 1721, quality: 10, grade: 5 }),
    new Item({ id: 1722, quality: 4, grade: 5 }),
    new Item({ id: 1723, quality: 10, grade: 5 }),
    new Item({ id: 1724, quality: 10, grade: 6 }),
];
cA[148].loot = [ // hw 2021 cosmetic case
    new Item({ id: 1725, quality: 10, grade: 3 }),
    new Item({ id: 1726, quality: 4, grade: 3 }),
    new Item({ id: 1727, quality: 10, grade: 3 }),
    new Item({ id: 1728, quality: 4, grade: 3 }),
    new Item({ id: 1729, quality: 10, grade: 3 }),
    new Item({ id: 1730, quality: 4, grade: 3 }),
    new Item({ id: 1731, quality: 10, grade: 3 }),
    new Item({ id: 1732, quality: 4, grade: 3 }),
    new Item({ id: 1733, quality: 4, grade: 3 }),
    new Item({ id: 1734, quality: 4, grade: 3 }),
    new Item({ id: 1735, quality: 10, grade: 4 }),
    new Item({ id: 1736, quality: 4, grade: 4 }),
    new Item({ id: 1737, quality: 4, grade: 4 }),
    new Item({ id: 1738, quality: 10, grade: 4 }),
    new Item({ id: 1739, quality: 4, grade: 4 }),
    new Item({ id: 1740, quality: 10, grade: 4 }),
    new Item({ id: 1741, quality: 4, grade: 5 }),
    new Item({ id: 1742, quality: 10, grade: 5 }),
    new Item({ id: 1743, quality: 10, grade: 5 }),
    new Item({ id: 1744, quality: 10, grade: 6 }),
];
cA[149].loot = [ // hw 2021 war paints
    new Item({ id: 1750, quality: 6, grade: 3 }),
    new Item({ id: 1751, quality: 6, grade: 3 }),
    new Item({ id: 1752, quality: 6, grade: 3 }),
    new Item({ id: 1753, quality: 6, grade: 3 }),
    new Item({ id: 1754, quality: 6, grade: 3 }),
    new Item({ id: 1755, quality: 6, grade: 3 }),
    new Item({ id: 1756, quality: 6, grade: 4 }),
    new Item({ id: 1757, quality: 6, grade: 4 }),
    new Item({ id: 1758, quality: 6, grade: 4 }),
    new Item({ id: 1759, quality: 6, grade: 4 }),
    new Item({ id: 1760, quality: 6, grade: 5 }),
    new Item({ id: 1761, quality: 6, grade: 5 }),
    new Item({ id: 1762, quality: 6, grade: 6 })
];
cA[150].loot = [ // winter 2021 cosmetic case
    new Item({ id: 1768, quality: 10, grade: 3 }),
    new Item({ id: 1769, quality: 10, grade: 3 }),
    new Item({ id: 1770, quality: 4, grade: 3 }),
    new Item({ id: 1771, quality: 4, grade: 3 }),
    new Item({ id: 1772, quality: 10, grade: 3 }),
    new Item({ id: 1773, quality: 10, grade: 3 }),
    new Item({ id: 1774, quality: 4, grade: 3 }),
    new Item({ id: 1775, quality: 10, grade: 3 }),
    new Item({ id: 1776, quality: 10, grade: 3 }),
    new Item({ id: 1777, quality: 10, grade: 3 }),
    new Item({ id: 1778, quality: 4, grade: 4 }),
    new Item({ id: 1779, quality: 10, grade: 4 }),
    new Item({ id: 1780, quality: 10, grade: 4 }),
    new Item({ id: 1781, quality: 10, grade: 4 }),
    new Item({ id: 1782, quality: 4, grade: 4 }),
    new Item({ id: 1783, quality: 10, grade: 4 }),
    new Item({ id: 1784, quality: 10, grade: 5 }),
    new Item({ id: 1785, quality: 10, grade: 5 }),
    new Item({ id: 1786, quality: 10, grade: 5 }),
    new Item({ id: 1787, quality: 4, grade: 6 }),
];
cA[151].loot = [ // summer 2022 cosmetic case
    new Item({ id: 1791, quality: 10, grade: 3 }),
    new Item({ id: 1792, quality: 4, grade: 3 }),
    new Item({ id: 1793, quality: 10, grade: 3 }),
    new Item({ id: 1794, quality: 4, grade: 3 }),
    new Item({ id: 1795, quality: 4, grade: 3 }),
    new Item({ id: 1796, quality: 4, grade: 3 }),
    new Item({ id: 1797, quality: 10, grade: 3 }),
    new Item({ id: 1798, quality: 4, grade: 3 }),
    new Item({ id: 1799, quality: 4, grade: 3 }),
    new Item({ id: 1800, quality: 4, grade: 3 }),
    new Item({ id: 1801, quality: 10, grade: 4 }),
    new Item({ id: 1802, quality: 4, grade: 4 }),
    new Item({ id: 1803, quality: 4, grade: 4 }),
    new Item({ id: 1804, quality: 10, grade: 4 }),
    new Item({ id: 1805, quality: 4, grade: 4 }),
    new Item({ id: 1806, quality: 4, grade: 4 }),
    new Item({ id: 1807, quality: 10, grade: 4 }),
    new Item({ id: 1808, quality: 10, grade: 4 }),
    new Item({ id: 1809, quality: 4, grade: 5 }),
    new Item({ id: 1810, quality: 10, grade: 5 }),
    new Item({ id: 1811, quality: 10, grade: 5 }),
    new Item({ id: 1812, quality: 10, grade: 5 }),
    new Item({ id: 1813, quality: 4, grade: 5 }),
    new Item({ id: 1814, quality: 4, grade: 6 }),
    new Item({ id: 1815, quality: 10, grade: 6 }),
];
cA[152].loot = [ // halloween 2022 cosmetic case
    new Item({ id: 1816, quality: 10, grade: 3 }),
    new Item({ id: 1817, quality: 10, grade: 3 }),
    new Item({ id: 1818, quality: 4, grade: 3 }),
    new Item({ id: 1819, quality: 4, grade: 3 }),
    new Item({ id: 1820, quality: 10, grade: 3 }),
    new Item({ id: 1821, quality: 4, grade: 3 }),
    new Item({ id: 1822, quality: 10, grade: 3 }),
    new Item({ id: 1823, quality: 10, grade: 3 }),
    new Item({ id: 1824, quality: 4, grade: 3 }),
    new Item({ id: 1825, quality: 4, grade: 3 }),
    new Item({ id: 1826, quality: 10, grade: 4 }),
    new Item({ id: 1827, quality: 4, grade: 4 }),
    new Item({ id: 1828, quality: 4, grade: 4 }),
    new Item({ id: 1829, quality: 4, grade: 4 }),
    new Item({ id: 1830, quality: 4, grade: 4 }),
    new Item({ id: 1831, quality: 10, grade: 4 }),
    new Item({ id: 1832, quality: 10, grade: 5 }),
    new Item({ id: 1833, quality: 4, grade: 5 }),
    new Item({ id: 1834, quality: 4, grade: 5 }),
    new Item({ id: 1835, quality: 10, grade: 5 }),
    new Item({ id: 1836, quality: 10, grade: 6 }),
    new Item({ id: 1837, quality: 10, grade: 6 }),
];
cA[153].loot = [ // hw 2022 war paints
    new Item({ id: 1843, quality: 6, grade: 3 }),
    new Item({ id: 1844, quality: 6, grade: 3 }),
    new Item({ id: 1845, quality: 6, grade: 3 }),
    new Item({ id: 1846, quality: 6, grade: 3 }),
    new Item({ id: 1847, quality: 6, grade: 3 }),
    new Item({ id: 1848, quality: 6, grade: 4 }),
    new Item({ id: 1849, quality: 6, grade: 4 }),
    new Item({ id: 1850, quality: 6, grade: 4 }),
    new Item({ id: 1851, quality: 6, grade: 5 }),
    new Item({ id: 1852, quality: 6, grade: 5 }),
    new Item({ id: 1853, quality: 6, grade: 6 }),
];
cA[154].loot = [ // winter 2022 cosmetic case
    new Item({ id: 1859, quality: 10, grade: 3 }),
    new Item({ id: 1860, quality: 10, grade: 3 }),
    new Item({ id: 1861, quality: 4, grade: 3 }),
    new Item({ id: 1862, quality: 10, grade: 3 }),
    new Item({ id: 1863, quality: 4, grade: 3 }),
    new Item({ id: 1864, quality: 10, grade: 3 }),
    new Item({ id: 1865, quality: 4, grade: 3 }),
    new Item({ id: 1866, quality: 10, grade: 3 }),
    new Item({ id: 1867, quality: 4, grade: 3 }),
    new Item({ id: 1868, quality: 10, grade: 3 }),
    new Item({ id: 1869, quality: 4, grade: 4 }),
    new Item({ id: 1870, quality: 10, grade: 4 }),
    new Item({ id: 1871, quality: 4, grade: 4 }),
    new Item({ id: 1872, quality: 10, grade: 4 }),
    new Item({ id: 1873, quality: 4, grade: 4 }),
    new Item({ id: 1874, quality: 10, grade: 4 }),
    new Item({ id: 1875, quality: 4, grade: 4 }),
    new Item({ id: 1876, quality: 4, grade: 5 }),
    new Item({ id: 1877, quality: 10, grade: 5 }),
    new Item({ id: 1878, quality: 4, grade: 5 }),
    new Item({ id: 1879, quality: 4, grade: 5 }),
    new Item({ id: 1880, quality: 10, grade: 6 }),
    new Item({ id: 1881, quality: 10, grade: 6 }),
];
cA[155].loot = [ // summer 2023 cosmetic case
    new Item({ id: 1885, quality: 4, grade: 3 }),
    new Item({ id: 1886, quality: 4, grade: 3 }),
    new Item({ id: 1887, quality: 4, grade: 3 }),
    new Item({ id: 1888, quality: 10, grade: 3 }),
    new Item({ id: 1889, quality: 4, grade: 3 }),
    new Item({ id: 1890, quality: 10, grade: 3 }),
    new Item({ id: 1891, quality: 4, grade: 3 }),
    new Item({ id: 1892, quality: 4, grade: 3 }),
    new Item({ id: 1893, quality: 10, grade: 3 }),
    new Item({ id: 1894, quality: 10, grade: 3 }),
    new Item({ id: 1895, quality: 4, grade: 4 }),
    new Item({ id: 1896, quality: 4, grade: 4 }),
    new Item({ id: 1897, quality: 10, grade: 4 }),
    new Item({ id: 1898, quality: 4, grade: 4 }),
    new Item({ id: 1899, quality: 10, grade: 4 }),
    new Item({ id: 1900, quality: 4, grade: 4 }),
    new Item({ id: 1901, quality: 4, grade: 4 }),
    new Item({ id: 1902, quality: 10, grade: 4 }),
    new Item({ id: 1903, quality: 4, grade: 5 }),
    new Item({ id: 1904, quality: 10, grade: 5 }),
    new Item({ id: 1905, quality: 4, grade: 5 }),
    new Item({ id: 1906, quality: 10, grade: 5 }),
    new Item({ id: 1907, quality: 4, grade: 5 }),
    new Item({ id: 1908, quality: 10, grade: 6 }),
    new Item({ id: 1909, quality: 10, grade: 6 }),
];
cA[156].loot = [ // summer 2023 war paints
    new Item({ id: 1910, quality: 6, grade: 3 }),
    new Item({ id: 1911, quality: 6, grade: 3 }),
    new Item({ id: 1912, quality: 6, grade: 3 }),
    new Item({ id: 1913, quality: 6, grade: 3 }),
    new Item({ id: 1914, quality: 6, grade: 4 }),
    new Item({ id: 1915, quality: 6, grade: 4 }),
    new Item({ id: 1916, quality: 6, grade: 4 }),
    new Item({ id: 1917, quality: 6, grade: 5 }),
    new Item({ id: 1918, quality: 6, grade: 5 }),
    new Item({ id: 1919, quality: 6, grade: 6 }),
];
cA[157].loot = [ // halloween 2023 cosmetic case
    new Item({ id: 1926, quality: 4, grade: 3 }),
    new Item({ id: 1927, quality: 4, grade: 3 }),
    new Item({ id: 1928, quality: 4, grade: 3 }),
    new Item({ id: 1929, quality: 4, grade: 3 }),
    new Item({ id: 1930, quality: 4, grade: 3 }),
    new Item({ id: 1931, quality: 10, grade: 3 }),
    new Item({ id: 1932, quality: 10, grade: 3 }),
    new Item({ id: 1933, quality: 4, grade: 3 }),
    new Item({ id: 1934, quality: 10, grade: 3 }),
    new Item({ id: 1935, quality: 10, grade: 3 }),
    new Item({ id: 1936, quality: 4, grade: 4 }),
    new Item({ id: 1937, quality: 4, grade: 4 }),
    new Item({ id: 1938, quality: 4, grade: 4 }),
    new Item({ id: 1939, quality: 4, grade: 4 }),
    new Item({ id: 1940, quality: 10, grade: 4 }),
    new Item({ id: 1941, quality: 4, grade: 4 }),
    new Item({ id: 1942, quality: 4, grade: 4 }),
    new Item({ id: 1943, quality: 4, grade: 4 }),
    new Item({ id: 1944, quality: 10, grade: 5 }),
    new Item({ id: 1945, quality: 4, grade: 5 }),
    new Item({ id: 1946, quality: 4, grade: 5 }),
    new Item({ id: 1947, quality: 10, grade: 5 }),
    new Item({ id: 1948, quality: 10, grade: 5 }),
    new Item({ id: 1949, quality: 10, grade: 6 }),
    new Item({ id: 1950, quality: 10, grade: 6 }),
];
cA[158].loot = [ // winter 2023 cosmetic case
    new Item({ id: 1959, quality: 4, grade: 3 }),
    new Item({ id: 1960, quality: 10, grade: 3 }),
    new Item({ id: 1961, quality: 10, grade: 3 }),
    new Item({ id: 1962, quality: 4, grade: 3 }),
    new Item({ id: 1963, quality: 10, grade: 3 }),
    new Item({ id: 1964, quality: 4, grade: 3 }),
    new Item({ id: 1965, quality: 10, grade: 3 }),
    new Item({ id: 1966, quality: 4, grade: 3 }),
    new Item({ id: 1967, quality: 10, grade: 3 }),
    new Item({ id: 1968, quality: 4, grade: 3 }),
    new Item({ id: 1969, quality: 4, grade: 4 }),
    new Item({ id: 1970, quality: 4, grade: 4 }),
    new Item({ id: 1971, quality: 4, grade: 4 }),
    new Item({ id: 1972, quality: 10, grade: 4 }),
    new Item({ id: 1973, quality: 4, grade: 4 }),
    new Item({ id: 1974, quality: 10, grade: 4 }),
    new Item({ id: 1975, quality: 4, grade: 4 }),
    new Item({ id: 1976, quality: 10, grade: 5 }),
    new Item({ id: 1977, quality: 10, grade: 5 }),
    new Item({ id: 1978, quality: 4, grade: 5 }),
    new Item({ id: 1979, quality: 4, grade: 5 }),
    new Item({ id: 1980, quality: 10, grade: 6 }),
    new Item({ id: 1981, quality: 10, grade: 6 }),
];
cA[159].loot = [ // summer 2024 cosmetic case
    new Item({ id: 1985, quality: 4, grade: 3 }),
    new Item({ id: 1986, quality: 10, grade: 3 }),
    new Item({ id: 1987, quality: 10, grade: 3 }),
    new Item({ id: 1988, quality: 10, grade: 3 }),
    new Item({ id: 1989, quality: 4, grade: 3 }),
    new Item({ id: 1990, quality: 4, grade: 3 }),
    new Item({ id: 1991, quality: 4, grade: 3 }),
    new Item({ id: 1992, quality: 10, grade: 3 }),
    new Item({ id: 1993, quality: 4, grade: 3 }),
    new Item({ id: 1994, quality: 10, grade: 3 }),
    new Item({ id: 1995, quality: 4, grade: 4 }),
    new Item({ id: 1996, quality: 4, grade: 4 }),
    new Item({ id: 1997, quality: 10, grade: 4 }),
    new Item({ id: 1998, quality: 10, grade: 4 }),
    new Item({ id: 1999, quality: 4, grade: 4 }),
    new Item({ id: 2000, quality: 10, grade: 4 }),
    new Item({ id: 2001, quality: 4, grade: 4 }),
    new Item({ id: 2002, quality: 4, grade: 5 }),
    new Item({ id: 2003, quality: 10, grade: 5 }),
    new Item({ id: 2004, quality: 4, grade: 5 }),
    new Item({ id: 2005, quality: 10, grade: 5 }),
    new Item({ id: 2006, quality: 4, grade: 6 }),
    new Item({ id: 2007, quality: 4, grade: 6 }),
];