function Crate(crateid, seriesnum, unusualeffects, cratenote) {
    this.id = crateid;
    this.series = seriesnum;
    this.loot = {};
    this.effects = unusualeffects;
    if (typeof cratenote === 'undefined') {
        this.note = '0';
    }
    else {
        this.note = cratenote;
    }
}

function Item(itemid, percent, itemquality, skingrade) {
    this.id = itemid;
    this.chance = percent;
    this.quality = itemquality;
    if (typeof skingrade === 'undefined') {
        this.grade = '0';
    }
    else {
        this.grade = skingrade;
    }
}
var language = "eng";
// Unusual cosmetics pool
var unusualPool = [5, 6, 13, 14, 21, 22, 23, 28, 29, 30, 34, 35, 36, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 62, 63, 64, 65, 70, 71, 72, 73, 111, 117, 118, 122, 123, 124, 130, 131, 133, 134, 135, 136, 137, 140, 142, 143, 147, 148, 152, 153, 157, 158, 160, 166, 167, 172, 177, 178, 182, 183, 187, 188, 191, 194, 197, 198, 204, 210, 211, 225, 230, 235, 240, 245, 246, 250, 260, 265, 266, 275, 281, 289, 290, 291, 292, 294, 301, 303, 305, 308, 316, 317, 327, 341, 342, 343, 358, 359, 362, 366, 370, 375, 376, 383, 387, 388, 389, 390, 392, 393, 394, 395, 397, 399, 400, 401, 402, 405, 407, 408, 409, 411, 413, 414, 415, 417, 418, 420, 422, 423, 425, 427, 430, 431, 432, 433, 434, 435, 436, 438, 439, 440, 441, 454, 455, 457, 459, 460, 464, 465, 467, 470, 471, 472, 475, 479, 480, 481, 482, 483, 487, 488, 490, 492, 496, 501, 503, 504, 506, 510, 512, 516, 524, 525, 526, 537, 538, 541, 547, 549, 552, 553, 666, 685, 689, 691, 692, 693, 694, 696, 704, 705, 707, 710, 712, 715, 718, 720, 725, 727, 732, 733, 739, 746, 749, 754, 755, 756, 777, 779, 784, 785, 786, 791, 792, 793, 794, 798, 804, 812, 815, 818, 893, 902, 905, 906, 907, 908, 909, 913, 916, 917, 918, 929, 932, 933, 936, 939, 941, 942, 943, 945, 949, 953, 964, 1354, 1355, 1356, 1357, 1358, 1359, 1360, 1361, 1362, 1363, 1364, 1365, 1366, 1367, 1368, 1369, 1370, 1371, 1372, 1373, 1374, 1375, 1376, 1377, 1378, 1379, 1380, 1381, 1382, 1383, 1384, 1385, 1386, 1387, 1388, 1389, 1390, 1391, 1392, 1393, 1394, 1395, 1396, 1397, 1398, 1399, 1400, 1401, 1402, 1403, 1404, 1405, 1406, 1407, 1408, 1409, 1410, 1411, 1412, 1413, 1414, 1415, 1416, 1417, 1418, 1419, 1420, 1421];
var gen1FX = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];
var gen2FX = [28, 29, 30, 31, 32, 33, 34, 35];
var gen3FX = [55, 56, 57, 58, 59, 60, 61];
var allGensFX = gen1FX.concat(gen2FX, gen3FX);
var hw12FX = [36, 37, 38, 39, 40, 41, 42, 43, 44];
var hw13FX = hw12FX.concat([62, 63, 64, 65, 66, 67, 68, 69]);
var hw14FX = hw13FX.concat([70, 71, 72, 73, 74, 75]);
var hw15FX = [89, 90, 91, 92, 93, 94, 95];
var hw16FX = [96, 97, 98, 99];
var hw18FX = [100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110];
var hw19FX = [111, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122];
var tauntFX = [15, 16, 17, 18, 19, 20, 21, 22, 23];
var oldWeaponFX = [24, 25, 26, 27];
var weaponFX = [24, 25, 26];
var roboFX = [45, 46, 47, 48, 49, 50, 51, 52, 53, 54];
var eotlFX = [76, 77, 78, 79];
var invasionFX = allGensFX.concat([80, 81, 82, 83, 84, 85, 86, 87, 88]);
var xmas19FX = [123, 124, 125, 126, 127, 128, 129, 130, 131, 132, 133];
// Crate array
var cA = [
    hello = "there",
    c1 = new Crate(1, 1, gen1FX),
    c2 = new Crate(1, 2, gen1FX),
    c3 = new Crate(1, 3, gen1FX),
    c4 = new Crate(1, 4, gen1FX),
    c5 = new Crate(1, 5, gen1FX),
    c6 = new Crate(2, 6, gen1FX),
    c7 = new Crate(1, 7, gen1FX),
    c8 = new Crate(1, 8, gen1FX),
    c9 = new Crate(1, 9, gen1FX),
    c10 = new Crate(1, 10, gen1FX),
    c11 = new Crate(1, 11, gen1FX),
    c12 = new Crate(1, 12, gen1FX),
    c13 = new Crate(1, 13, gen1FX),
    c14 = new Crate(1, 14, gen1FX),
    c15 = new Crate(1, 15, gen1FX),
    c16 = new Crate(1, 16, gen1FX),
    c17 = new Crate(1, 17, gen1FX),
    c18 = new Crate(1, 18, gen1FX),
    c19 = new Crate(1, 19, gen1FX, 1),
    c20 = new Crate(1, 20, gen1FX, 1),
    c21 = new Crate(1, 21, gen1FX, 1),
    c22 = new Crate(5, 22, gen1FX),
    c23 = new Crate(1, 23, gen1FX, 1),
    c24 = new Crate(1, 24, gen1FX, 1),
    c25 = new Crate(1, 25, gen1FX, 1),
    c26 = new Crate(1, 26, gen2FX, 1),
    c27 = new Crate(1, 27, gen2FX, 1),
    c28 = new Crate(1, 28, gen2FX, 1),
    c29 = new Crate(1, 29, gen2FX, 1),
    c30 = new Crate(6, 30, gen2FX, 1),
    c31 = new Crate(1, 31, gen2FX, 1),
    c32 = new Crate(1, 32, gen2FX, 1),
    c33 = new Crate(1, 33, gen2FX, 1),
    c34 = new Crate(1, 34, gen2FX, 1),
    c35 = new Crate(7, 35, gen2FX, 2),
    c36 = new Crate(8, 36, gen2FX),
    c37 = new Crate(1, 37, gen2FX, 1),
    c38 = new Crate(1, 38, gen2FX, 1),
    c39 = new Crate(1, 39, gen2FX, 1),
    c40 = new Crate(6, 40, gen2FX, 1),
    c41 = new Crate(1, 41, gen2FX, 1),
    c42 = new Crate(1, 42, gen2FX, 1),
    c43 = new Crate(1, 43, gen2FX, 1),
    c44 = new Crate(1, 44, gen2FX, 1),
    c45 = new Crate(1, 45, gen2FX, 1),
    c46 = new Crate(9, 46, gen2FX, 1),
    c47 = new Crate(1, 47, gen2FX, 1),
    c48 = new Crate(10, 48, gen2FX),
    c49 = new Crate(1, 49, gen2FX, 1),
    c50 = new Crate(6, 50, gen2FX, 1),
    c51 = new Crate(11, 51, hw12FX, 3),
    c52 = new Crate(12, 52, gen2FX, 2),
    c53 = new Crate(13, 53, gen2FX),
    c54 = new Crate(1, 54, gen2FX, 1),
    c55 = new Crate(1, 55, gen2FX, 1),
    c56 = new Crate(1, 56, gen2FX, 1),
    c57 = new Crate(1, 57, gen2FX, 1),
    c58 = new Crate(14, 58, roboFX),
    c59 = new Crate(1, 59, gen3FX, 1),
    c60 = new Crate(15, 60, gen3FX, 1),
    c61 = new Crate(16, 61, gen3FX),
    c62 = new Crate(17, 62, gen3FX),
    c63 = new Crate(18, 63, gen3FX),
    c64 = new Crate(19, 64, gen3FX),
    c65 = new Crate(20, 65, gen3FX),
    c66 = new Crate(21, 66, gen3FX),
    c67 = new Crate(22, 67, gen3FX),
    c68 = new Crate(23, 68, gen3FX),
    c69 = new Crate(24, 69, gen3FX),
    c70 = new Crate(1, 71, gen3FX, 1),
    c71 = new Crate(25, 72, gen3FX),
    c72 = new Crate(26, 73, gen3FX),
    c73 = new Crate(27, 74, hw13FX),
    c74 = new Crate(1, 75, gen3FX, 1),
    c75 = new Crate(1, 76, gen3FX, 1),
    c76 = new Crate(1, 77, gen3FX, 1),
    c77 = new Crate(28, 78, gen3FX, 2),
    c78 = new Crate(29, 79, gen3FX),
    c79 = new Crate(30, 81, gen3FX),
    c80 = new Crate(31, 82, gen3FX),
    c81 = new Crate(31, 83, gen3FX),
    c82 = new Crate(3, 0, tauntFX, 7), // Mann Co. Audition Reel
    c83 = new Crate(32, 0, [], 2), // Bread Box
    c84 = new Crate(33, 0, gen3FX), // Mann Co. Stockpile Crate
    c85 = new Crate(31, 84, gen3FX),
    c86 = new Crate(31, 85, gen3FX),
    c87 = new Crate(43, 86, gen3FX),
    c88 = new Crate(34, 0, hw14FX, 8), // Unlocked Creepy Scout Crate
    c89 = new Crate(35, 0, hw14FX, 8), // Unlocked Creepy Soldier Crate
    c90 = new Crate(36, 0, hw14FX, 8), // Unlocked Creepy Pyro Crate
    c91 = new Crate(37, 0, hw14FX, 8), // Unlocked Creepy Demo Crate
    c92 = new Crate(38, 0, hw14FX, 8), // Unlocked Creepy Heavy Crate
    c93 = new Crate(39, 0, hw14FX, 8), // Unlocked Creepy Engineer Crate
    c94 = new Crate(40, 0, hw14FX, 8), // Unlocked Creepy Medic Crate
    c95 = new Crate(41, 0, hw14FX, 8), // Unlocked Creepy Sniper Crate
    c96 = new Crate(42, 0, hw14FX, 8), // Unlocked Creepy Spy Crate
    c97 = new Crate(44, 87, eotlFX, 4),
    c98 = new Crate(45, 88, allGensFX, 2),
    c99 = new Crate(46, 89, allGensFX, 4),
    c100 = new Crate(31, 90, allGensFX, 6),
    c101 = new Crate(31, 91, allGensFX),
    c102 = new Crate(31, 92, allGensFX, 1),
    c103 = new Crate(4, 93, oldWeaponFX, 5), // Concealed Killer Weapons Case
    c104 = new Crate(47, 94, oldWeaponFX, 5),
    c105 = new Crate(48, 95, allGensFX, 5),
    c106 = new Crate(49, 96, invasionFX, 5),
    c107 = new Crate(50, 97, invasionFX, 5),
    c108 = new Crate(51, 98, hw15FX, 5),
    c109 = new Crate(52, 99, weaponFX, 5),
    c110 = new Crate(53, 100, weaponFX, 5),
    c111 = new Crate(54, 101, allGensFX, 5),
    c112 = new Crate(55, 102, allGensFX, 5),
    c113 = new Crate(31, 103, allGensFX, 1),
    c114 = new Crate(56, 104, hw16FX, 5),
    c115 = new Crate(57, 105, allGensFX, 5),
    c116 = new Crate(58, 106, allGensFX, 5),
    c117 = new Crate(59, 107, allGensFX, 5),
    c118 = new Crate(60, 108, allGensFX, 5),
    c119 = new Crate(61, 109, weaponFX, 5),
    c120 = new Crate(62, 110, weaponFX, 5),
    c121 = new Crate(63, 111, []),
    c122 = new Crate(64, 114, []),
    c123 = new Crate(65, 117, allGensFX, 5),
    c124 = new Crate(66, 118, weaponFX, 5),
    c125 = new Crate(67, 119, allGensFX, 5),
    c126 = new Crate(68, 120, hw18FX, 5),
    c127 = new Crate(69, 121, weaponFX, 5),
    c128 = new Crate(70, 122, allGensFX, 5),
    c129 = new Crate(71, 123, allGensFX, 5),
    c130 = new Crate(72, 0, allGensFX, 5),
    c131 = new Crate(73, 0, allGensFX, 5),
    c132 = new Crate(74, 0, allGensFX, 5),
    c133 = new Crate(75, 0, allGensFX, 5),
    c134 = new Crate(76, 0, allGensFX, 5),
    c135 = new Crate(77, 0, allGensFX, 5),
    c136 = new Crate(78, 0, allGensFX, 5),
    c137 = new Crate(79, 0, allGensFX, 5),
    c138 = new Crate(80, 0, allGensFX, 5),
    c139 = new Crate(81, 0, allGensFX, 5),
    c140 = new Crate(82, 124, hw19FX, 5),
    c141 = new Crate(83, 125, xmas19FX, 5),
    c142 = new Crate(84, 126, weaponFX, 5),
];
// This is the order the crates will show up in the menu
var crateOrder = ["yo", 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 130, 131, 132, 133, 134, 135, 136, 137, 138, 139, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122, 123, 124, 125, 126, 127, 128, 129, 140, 141, 142];
/* Quality:
1 - 100% chance to be Unique
2 - 100% chance to be Strange
3 - 100% chance to be Haunted
4 - 90% chance to be Unique, 10% chance to be Strange
5 - Decorated - 10% Battle Scarred, 20% Well Worn, 40% Field Tested, 20% Minimal Wear, 10% Factory New
6 - Decorated - Same as 5, but also has 10% chance to be Strange and 1% chance to be Unusual
7 - 99% Unique, 1% to be Unusual
8 - 100% chance to be Unique, but can be overriden: 10% chance to be Haunted, 10% chance to be Strange
9 - 100% Unique, but can be overriden: 10% to be Strange, 1% to be Unusual
10 - Same as 4, but can be Unusual
*/
cA[1].loot = {
    i1: new Item(1, 1100, 1),
    i2: new Item(2, 1100, 1),
    i3: new Item(3, 1100, 1),
    i4: new Item(4, 1100, 1),
    i5: new Item(5, 1100, 1),
    i6: new Item(6, 1100, 1),
    i7: new Item(7, 1100, 1),
    i8: new Item(8, 1100, 1),
    i9: new Item(9, 1100, 1),
    i10: new Item(0, 100, 0)
};
cA[2].loot = {
    i1: new Item(10, 1350, 1),
    i2: new Item(11, 1350, 1),
    i3: new Item(12, 1350, 1),
    i4: new Item(13, 900, 1),
    i5: new Item(14, 900, 1),
    i6: new Item(15, 1350, 1),
    i7: new Item(16, 1350, 1),
    i8: new Item(17, 1350, 1),
    i9: new Item(0, 100, 0)
};
cA[3].loot = {
    i1: new Item(18, 1650, 1),
    i2: new Item(19, 1650, 1),
    i3: new Item(20, 1650, 1),
    i4: new Item(21, 825, 1),
    i5: new Item(22, 825, 1),
    i6: new Item(23, 825, 1),
    i7: new Item(24, 1650, 1),
    i8: new Item(9, 825, 1),
    i9: new Item(0, 100, 0)
};
cA[4].loot = {
    i1: new Item(25, 1650, 1),
    i2: new Item(26, 1650, 1),
    i3: new Item(27, 1650, 1),
    i4: new Item(28, 825, 1),
    i5: new Item(29, 825, 1),
    i6: new Item(30, 825, 1),
    i7: new Item(8, 1650, 1),
    i8: new Item(15, 825, 1),
    i9: new Item(0, 100, 0)
};
cA[5].loot = {
    i1: new Item(7, 1350, 1),
    i2: new Item(31, 1800, 1),
    i3: new Item(32, 1800, 1),
    i4: new Item(33, 1800, 1),
    i5: new Item(34, 450, 1),
    i6: new Item(35, 450, 1),
    i7: new Item(36, 450, 1),
    i8: new Item(30, 450, 1),
    i9: new Item(37, 1350, 1),
    i10: new Item(0, 100, 0)
};
cA[6].loot = {
    i1: new Item(38, 1340, 1),
    i2: new Item(39, 1340, 1),
    i3: new Item(40, 1340, 1),
    i4: new Item(41, 1340, 1),
    i5: new Item(42, 1340, 1),
    i6: new Item(43, 200, 1),
    i7: new Item(44, 200, 1),
    i8: new Item(45, 200, 1),
    i9: new Item(46, 200, 1),
    i10: new Item(47, 200, 1),
    i11: new Item(48, 200, 1),
    i12: new Item(49, 200, 1),
    i13: new Item(50, 200, 1),
    i14: new Item(51, 200, 1),
    i15: new Item(52, 200, 1),
    i16: new Item(53, 200, 1),
    i17: new Item(54, 200, 1),
    i18: new Item(55, 200, 1),
    i19: new Item(56, 200, 1),
    i20: new Item(57, 200, 1),
    i21: new Item(58, 200, 1),
    i22: new Item(0, 100, 0)
};
cA[7].loot = {
    i1: new Item(59, 1700, 1),
    i2: new Item(60, 1700, 1),
    i3: new Item(61, 1700, 1),
    i4: new Item(62, 350, 1),
    i5: new Item(63, 350, 1),
    i6: new Item(64, 350, 1),
    i7: new Item(65, 350, 1),
    i8: new Item(24, 1700, 1),
    i9: new Item(66, 1700, 1),
    i10: new Item(0, 100, 0)
};
cA[8].loot = {
    i1: new Item(67, 1700, 1),
    i2: new Item(68, 1700, 1),
    i3: new Item(69, 1700, 1),
    i4: new Item(70, 350, 1),
    i5: new Item(71, 350, 1),
    i6: new Item(72, 350, 1),
    i7: new Item(73, 350, 1),
    i8: new Item(15, 1700, 1),
    i9: new Item(74, 1700, 1),
    i10: new Item(0, 100, 0)
};
cA[9].loot = {
    i1: new Item(105, 1600, 1),
    i2: new Item(106, 1600, 1),
    i3: new Item(107, 1600, 1),
    i4: new Item(108, 1600, 1),
    i5: new Item(109, 1600, 1),
    i6: new Item(110, 1600, 1),
    i7: new Item(111, 300, 1),
    i8: new Item(0, 100, 0)
};
cA[10].loot = {
    i1: new Item(112, 1700, 1),
    i2: new Item(113, 1700, 1),
    i3: new Item(114, 1700, 1),
    i4: new Item(115, 1450, 1),
    i5: new Item(116, 1450, 1),
    i6: new Item(117, 634, 1),
    i7: new Item(118, 633, 1),
    i8: new Item(62, 633, 1),
    i9: new Item(0, 100, 0)
};
cA[11].loot = {
    i1: new Item(37, 1700, 1),
    i2: new Item(16, 1700, 1),
    i3: new Item(119, 1700, 1),
    i4: new Item(120, 1450, 1),
    i5: new Item(121, 1450, 1),
    i6: new Item(122, 634, 1),
    i7: new Item(123, 633, 1),
    i8: new Item(124, 633, 1),
    i9: new Item(0, 100, 0)
};
cA[12].loot = {
    i1: new Item(125, 1700, 1),
    i2: new Item(126, 1700, 1),
    i3: new Item(127, 1700, 1),
    i4: new Item(128, 1450, 1),
    i5: new Item(129, 1450, 1),
    i6: new Item(130, 634, 1),
    i7: new Item(131, 633, 1),
    i8: new Item(49, 633, 1),
    i9: new Item(0, 100, 0)
};
cA[13].loot = {
    i1: new Item(8, 1700, 1),
    i2: new Item(105, 1700, 1),
    i3: new Item(106, 1700, 1),
    i4: new Item(132, 1450, 1),
    i5: new Item(18, 1450, 1),
    i6: new Item(133, 634, 1),
    i7: new Item(134, 633, 1),
    i8: new Item(135, 633, 1),
    i9: new Item(0, 100, 0)
};
cA[14].loot = {
    i1: new Item(9, 1700, 1),
    i2: new Item(107, 1700, 1),
    i3: new Item(108, 1700, 1),
    i4: new Item(12, 1450, 1),
    i5: new Item(27, 1450, 1),
    i6: new Item(73, 634, 1),
    i7: new Item(136, 633, 1),
    i8: new Item(44, 633, 1),
    i9: new Item(0, 100, 0)
};
cA[15].loot = {
    i1: new Item(66, 1700, 1),
    i2: new Item(109, 1700, 1),
    i3: new Item(110, 1700, 1),
    i4: new Item(10, 1450, 1),
    i5: new Item(25, 1450, 1),
    i6: new Item(111, 634, 1),
    i7: new Item(46, 633, 1),
    i8: new Item(137, 633, 1),
    i9: new Item(0, 100, 0)
};
cA[16].loot = {
    i1: new Item(112, 1700, 1),
    i2: new Item(37, 1700, 1),
    i3: new Item(125, 1700, 1),
    i4: new Item(11, 1450, 1),
    i5: new Item(138, 1450, 1),
    i6: new Item(65, 634, 1),
    i7: new Item(57, 633, 1),
    i8: new Item(28, 633, 1),
    i9: new Item(0, 100, 0)
};
cA[17].loot = {
    i1: new Item(113, 1700, 1),
    i2: new Item(16, 1700, 1),
    i3: new Item(126, 1700, 1),
    i4: new Item(139, 1450, 1),
    i5: new Item(31, 1450, 1),
    i6: new Item(140, 634, 1),
    i7: new Item(51, 633, 1),
    i8: new Item(53, 633, 1),
    i9: new Item(0, 100, 0)
};
cA[18].loot = {
    i1: new Item(114, 1700, 1),
    i2: new Item(119, 1700, 1),
    i3: new Item(127, 1700, 1),
    i4: new Item(141, 1450, 1),
    i5: new Item(2, 1450, 1),
    i6: new Item(142, 634, 1),
    i7: new Item(47, 633, 1),
    i8: new Item(143, 633, 1),
    i9: new Item(0, 100, 0)
};
cA[19].loot = {
    i1: new Item(59, 2100, 2),
    i2: new Item(144, 2100, 2),
    i3: new Item(145, 2100, 2),
    i4: new Item(146, 2100, 2),
    i5: new Item(147, 500, 1),
    i6: new Item(148, 500, 1),
    i7: new Item(149, 500, 1),
    i8: new Item(0, 100, 0)
};
cA[20].loot = {
    i1: new Item(150, 2225, 2),
    i2: new Item(26, 2225, 2),
    i3: new Item(151, 2225, 2),
    i4: new Item(60, 2225, 2),
    i5: new Item(152, 500, 1),
    i6: new Item(153, 500, 1),
    i7: new Item(0, 100, 0)
};
cA[21].loot = {
    i1: new Item(154, 2225, 2),
    i2: new Item(151, 2225, 2),
    i3: new Item(155, 2225, 2),
    i4: new Item(156, 2225, 2),
    i5: new Item(157, 500, 1),
    i6: new Item(158, 500, 1),
    i7: new Item(0, 100, 0)
};
cA[22].loot = {
    i1: new Item(159, 1100, 1),
    i2: new Item(160, 1100, 1),
    i3: new Item(161, 1100, 1),
    i4: new Item(162, 1100, 1),
    i5: new Item(163, 1100, 1),
    i6: new Item(164, 1100, 1),
    i7: new Item(165, 1100, 1),
    i8: new Item(166, 1100, 1),
    i9: new Item(167, 1100, 1),
    i10: new Item(0, 100, 0)
};
cA[23].loot = {
    i1: new Item(168, 2250, 2),
    i2: new Item(169, 2250, 2),
    i3: new Item(170, 2250, 2),
    i4: new Item(171, 2250, 2),
    i5: new Item(172, 450, 1),
    i6: new Item(65, 450, 1),
    i7: new Item(0, 100, 0)
};
cA[24].loot = {
    i1: new Item(173, 2250, 2),
    i2: new Item(174, 2250, 2),
    i3: new Item(175, 2250, 2),
    i4: new Item(176, 2250, 2),
    i5: new Item(177, 450, 1),
    i6: new Item(178, 450, 1),
    i7: new Item(0, 100, 0)
};
cA[25].loot = {
    i1: new Item(179, 2250, 2),
    i2: new Item(180, 2250, 2),
    i3: new Item(31, 2250, 2),
    i4: new Item(181, 2250, 2),
    i5: new Item(182, 450, 1),
    i6: new Item(183, 450, 1),
    i7: new Item(0, 100, 0)
};
cA[26].loot = {
    i1: new Item(184, 2250, 2),
    i2: new Item(120, 2250, 2),
    i3: new Item(185, 2250, 2),
    i4: new Item(186, 2250, 2),
    i5: new Item(187, 450, 1),
    i6: new Item(188, 450, 1),
    i7: new Item(0, 100, 0)
};
cA[27].loot = {
    i1: new Item(189, 2250, 2),
    i2: new Item(132, 2250, 2),
    i3: new Item(18, 2250, 2),
    i4: new Item(190, 2250, 2),
    i5: new Item(56, 450, 1),
    i6: new Item(191, 450, 1),
    i7: new Item(0, 100, 0)
};
cA[28].loot = {
    i1: new Item(151, 2250, 2),
    i2: new Item(192, 2250, 2),
    i3: new Item(38, 2250, 2),
    i4: new Item(193, 2250, 2),
    i5: new Item(35, 450, 1),
    i6: new Item(194, 450, 1),
    i7: new Item(0, 100, 0)
};
cA[29].loot = {
    i1: new Item(195, 2250, 2),
    i2: new Item(10, 2250, 2),
    i3: new Item(196, 2250, 2),
    i4: new Item(146, 2250, 2),
    i5: new Item(197, 450, 1),
    i6: new Item(198, 450, 1),
    i7: new Item(0, 100, 0)
};
cA[30].loot = {
    i1: new Item(115, 1980, 2),
    i2: new Item(199, 1980, 2),
    i3: new Item(200, 1980, 2),
    i4: new Item(2, 1980, 2),
    i5: new Item(201, 1980, 2),
    i6: new Item(0, 100, 0)
};
cA[31].loot = {
    i1: new Item(138, 2250, 2),
    i2: new Item(202, 2250, 2),
    i3: new Item(203, 2250, 2),
    i4: new Item(139, 2250, 2),
    i5: new Item(204, 450, 1),
    i6: new Item(58, 450, 1),
    i7: new Item(0, 100, 0)
};
cA[32].loot = {
    i1: new Item(128, 2250, 2),
    i2: new Item(205, 2250, 2),
    i3: new Item(12, 2250, 2),
    i4: new Item(3, 2250, 2),
    i5: new Item(53, 450, 1),
    i6: new Item(48, 450, 1),
    i7: new Item(0, 100, 0)
};
cA[33].loot = {
    i1: new Item(206, 2250, 2),
    i2: new Item(207, 2250, 2),
    i3: new Item(121, 2250, 2),
    i4: new Item(27, 2250, 2),
    i5: new Item(52, 450, 1),
    i6: new Item(58, 450, 1),
    i7: new Item(0, 100, 0)
};
cA[34].loot = {
    i1: new Item(208, 2250, 2),
    i2: new Item(209, 2250, 2),
    i3: new Item(33, 2250, 2),
    i4: new Item(4, 2250, 2),
    i5: new Item(210, 450, 1),
    i6: new Item(211, 450, 1),
    i7: new Item(0, 100, 0)
};
cA[35].loot = {
    i1: new Item(212, 1042, 4),
    i2: new Item(213, 522, 4),
    i3: new Item(214, 1042, 4),
    i4: new Item(215, 1042, 4),
    i5: new Item(216, 1042, 4),
    i6: new Item(217, 1042, 4),
    i7: new Item(218, 1042, 4),
    i8: new Item(219, 1042, 4),
    i9: new Item(220, 1042, 4),
    i10: new Item(221, 1042, 4),
    i11: new Item(0, 100, 0)
};
cA[36].loot = {
    i1: new Item(222, 1742, 1),
    i2: new Item(223, 1742, 1),
    i3: new Item(224, 1741, 1),
    i4: new Item(225, 425, 1),
    i5: new Item(226, 425, 1),
    i6: new Item(227, 425, 1),
    i7: new Item(228, 425, 1),
    i8: new Item(229, 425, 1),
    i9: new Item(230, 425, 1),
    i10: new Item(231, 425, 1),
    i11: new Item(232, 425, 1),
    i12: new Item(233, 425, 1),
    i13: new Item(234, 425, 1),
    i14: new Item(235, 425, 1),
    i15: new Item(0, 100, 0)
};
cA[37].loot = {
    i1: new Item(236, 2250, 2),
    i2: new Item(237, 2250, 2),
    i3: new Item(238, 2250, 2),
    i4: new Item(239, 2250, 2),
    i5: new Item(240, 450, 1),
    i6: new Item(177, 450, 1),
    i7: new Item(0, 100, 0)
};
cA[38].loot = {
    i1: new Item(241, 2250, 2),
    i2: new Item(242, 2250, 2),
    i3: new Item(243, 2250, 2),
    i4: new Item(244, 2250, 2),
    i5: new Item(245, 450, 1),
    i6: new Item(246, 450, 1),
    i7: new Item(0, 100, 0)
};
cA[39].loot = {
    i1: new Item(116, 2357, 2),
    i2: new Item(247, 2357, 2),
    i3: new Item(175, 2357, 2),
    i4: new Item(248, 943, 1),
    i5: new Item(249, 943, 1),
    i6: new Item(250, 472, 1),
    i7: new Item(34, 471, 1),
    i8: new Item(0, 100, 0)
};
cA[40].loot = {
    i1: new Item(223, 1980, 2),
    i2: new Item(69, 1980, 2),
    i3: new Item(251, 1980, 2),
    i4: new Item(252, 1980, 2),
    i5: new Item(253, 1980, 2),
    i6: new Item(0, 100, 0)
};
cA[41].loot = {
    i1: new Item(254, 1980, 2),
    i2: new Item(60, 1980, 2),
    i3: new Item(255, 1980, 2),
    i4: new Item(256, 990, 1),
    i5: new Item(257, 990, 1),
    i6: new Item(258, 990, 1),
    i7: new Item(259, 495, 1),
    i8: new Item(260, 495, 1),
    i9: new Item(0, 100, 0)
};
cA[42].loot = {
    i1: new Item(261, 1980, 2),
    i2: new Item(41, 1980, 2),
    i3: new Item(169, 1980, 2),
    i4: new Item(262, 990, 1),
    i5: new Item(263, 990, 1),
    i6: new Item(264, 990, 1),
    i7: new Item(265, 495, 1),
    i8: new Item(266, 495, 1),
    i9: new Item(0, 100, 0)
};
cA[43].loot = {
    i1: new Item(267, 2200, 2),
    i2: new Item(268, 2200, 2),
    i3: new Item(11, 2200, 2),
    i4: new Item(269, 1100, 1),
    i5: new Item(270, 1100, 1),
    i6: new Item(122, 550, 1),
    i7: new Item(49, 550, 1),
    i8: new Item(0, 100, 0)
};
cA[44].loot = {
    i1: new Item(150, 1980, 2),
    i2: new Item(271, 1980, 2),
    i3: new Item(3, 1980, 2),
    i4: new Item(272, 990, 1),
    i5: new Item(273, 990, 1),
    i6: new Item(274, 990, 1),
    i7: new Item(275, 495, 1),
    i8: new Item(23, 495, 1),
    i9: new Item(0, 100, 0)
};
cA[45].loot = {
    i1: new Item(145, 1980, 2),
    i2: new Item(276, 1980, 2),
    i3: new Item(277, 1980, 2),
    i4: new Item(278, 990, 1),
    i5: new Item(279, 990, 1),
    i6: new Item(280, 990, 1),
    i7: new Item(281, 495, 1),
    i8: new Item(64, 495, 1),
    i9: new Item(0, 100, 0)
};
cA[46].loot = {
    i1: new Item(282, 1250, 2),
    i2: new Item(283, 1250, 2),
    i3: new Item(284, 600, 1),
    i4: new Item(285, 600, 1),
    i5: new Item(286, 600, 1),
    i6: new Item(287, 600, 1),
    i7: new Item(288, 600, 1),
    i8: new Item(289, 600, 1),
    i9: new Item(290, 600, 1),
    i10: new Item(291, 600, 1),
    i11: new Item(292, 600, 1),
    i12: new Item(293, 600, 1),
    i13: new Item(294, 600, 1),
    i14: new Item(295, 400, 1),
    i15: new Item(296, 400, 1),
    i16: new Item(0, 100, 0)
};
cA[47].loot = {
    i1: new Item(67, 1980, 2),
    i2: new Item(179, 1980, 2),
    i3: new Item(297, 1980, 2),
    i4: new Item(298, 990, 1),
    i5: new Item(299, 990, 1),
    i6: new Item(300, 990, 1),
    i7: new Item(301, 495, 1),
    i8: new Item(134, 495, 1),
    i9: new Item(0, 100, 0)
};
cA[48].loot = {
    i1: new Item(302, 1050, 1),
    i2: new Item(303, 1050, 1),
    i3: new Item(304, 1050, 1),
    i4: new Item(305, 1050, 1),
    i5: new Item(306, 1050, 1),
    i6: new Item(307, 1050, 1),
    i7: new Item(308, 1050, 1),
    i8: new Item(309, 1050, 1),
    i9: new Item(310, 1050, 1),
    i10: new Item(311, 450, 1),
    i11: new Item(0, 100, 0)
};
cA[49].loot = {
    i1: new Item(20, 1980, 2),
    i2: new Item(312, 1980, 2),
    i3: new Item(170, 1980, 2),
    i4: new Item(313, 990, 1),
    i5: new Item(314, 990, 1),
    i6: new Item(315, 990, 1),
    i7: new Item(316, 495, 1),
    i8: new Item(317, 495, 1),
    i9: new Item(0, 100, 0)
};
cA[50].loot = {
    i1: new Item(318, 1980, 1),
    i2: new Item(319, 1980, 2),
    i3: new Item(320, 1980, 2),
    i4: new Item(321, 1980, 2),
    i5: new Item(322, 1980, 2),
    i6: new Item(0, 100, 0)
};
cA[51].loot = {
    i1: new Item(323, 450, 3),
    i2: new Item(324, 450, 3),
    i3: new Item(325, 450, 3),
    i4: new Item(326, 450, 3),
    i5: new Item(327, 450, 3),
    i6: new Item(328, 450, 3),
    i7: new Item(329, 450, 3),
    i8: new Item(330, 450, 3),
    i9: new Item(331, 450, 3),
    i10: new Item(332, 450, 3),
    i11: new Item(333, 450, 3),
    i12: new Item(334, 450, 3),
    i13: new Item(335, 450, 3),
    i14: new Item(336, 450, 3),
    i15: new Item(337, 450, 3),
    i16: new Item(338, 450, 3),
    i17: new Item(339, 450, 3),
    i18: new Item(340, 450, 3),
    i19: new Item(341, 450, 3),
    i20: new Item(342, 450, 3),
    i21: new Item(343, 450, 3),
    i22: new Item(344, 450, 3),
    i23: new Item(0, 100, 0)
};
cA[52].loot = {
    i1: new Item(345, 1100, 4),
    i2: new Item(346, 1100, 4),
    i3: new Item(347, 1100, 4),
    i4: new Item(348, 1100, 4),
    i5: new Item(349, 1100, 4),
    i6: new Item(350, 1100, 4),
    i7: new Item(351, 1100, 4),
    i8: new Item(352, 1100, 4),
    i9: new Item(353, 1100, 4),
    i10: new Item(0, 100, 0)
};
cA[53].loot = {
    i1: new Item(354, 762, 1),
    i2: new Item(355, 762, 1),
    i3: new Item(356, 762, 1),
    i4: new Item(357, 762, 1),
    i5: new Item(358, 762, 1),
    i6: new Item(359, 762, 1),
    i7: new Item(360, 762, 1),
    i8: new Item(361, 761, 1),
    i9: new Item(362, 761, 1),
    i10: new Item(363, 761, 1),
    i11: new Item(364, 761, 1),
    i12: new Item(365, 761, 1),
    i13: new Item(366, 761, 1),
    i14: new Item(0, 100, 0)
};
cA[54].loot = {
    i1: new Item(222, 1980, 2),
    i2: new Item(224, 1980, 2),
    i3: new Item(189, 1980, 2),
    i4: new Item(367, 990, 1),
    i5: new Item(368, 990, 1),
    i6: new Item(369, 990, 1),
    i7: new Item(370, 495, 1),
    i8: new Item(371, 495, 1),
    i9: new Item(0, 100, 0)
};
cA[55].loot = {
    i1: new Item(372, 1980, 2),
    i2: new Item(26, 1980, 2),
    i3: new Item(186, 1980, 2),
    i4: new Item(373, 990, 1),
    i5: new Item(374, 990, 1),
    i6: new Item(257, 990, 1),
    i7: new Item(375, 495, 1),
    i8: new Item(376, 495, 1),
    i9: new Item(0, 100, 0)
};
cA[56].loot = {
    i1: new Item(377, 1980, 2),
    i2: new Item(378, 1980, 2),
    i3: new Item(379, 1980, 2),
    i4: new Item(380, 990, 1),
    i5: new Item(381, 990, 1),
    i6: new Item(382, 990, 1),
    i7: new Item(211, 495, 1),
    i8: new Item(383, 495, 1),
    i9: new Item(0, 100, 0)
};
cA[57].loot = {
    i1: new Item(40, 2200, 2),
    i2: new Item(384, 2200, 2),
    i3: new Item(190, 2200, 2),
    i4: new Item(385, 1100, 1),
    i5: new Item(167, 1100, 1),
    i6: new Item(44, 1100, 1),
    i7: new Item(0, 100, 0)
};
cA[58].loot = {
    i1: new Item(386, 174, 1),
    i2: new Item(387, 174, 1),
    i3: new Item(388, 174, 1),
    i4: new Item(389, 174, 1),
    i5: new Item(390, 174, 1),
    i6: new Item(391, 174, 1),
    i7: new Item(392, 174, 1),
    i8: new Item(393, 174, 1),
    i9: new Item(394, 174, 1),
    i10: new Item(395, 174, 1),
    i11: new Item(396, 174, 1),
    i12: new Item(397, 174, 1),
    i13: new Item(398, 174, 1),
    i14: new Item(399, 174, 1),
    i15: new Item(400, 174, 1),
    i16: new Item(401, 174, 1),
    i17: new Item(402, 174, 1),
    i18: new Item(403, 174, 1),
    i19: new Item(404, 174, 1),
    i20: new Item(405, 174, 1),
    i21: new Item(406, 174, 1),
    i22: new Item(407, 174, 1),
    i23: new Item(408, 174, 1),
    i24: new Item(409, 174, 1),
    i25: new Item(410, 174, 1),
    i26: new Item(411, 174, 1),
    i27: new Item(412, 174, 1),
    i28: new Item(413, 174, 1),
    i29: new Item(414, 174, 1),
    i30: new Item(415, 174, 1),
    i31: new Item(416, 174, 1),
    i32: new Item(417, 174, 1),
    i33: new Item(418, 174, 1),
    i34: new Item(419, 174, 1),
    i35: new Item(420, 174, 1),
    i36: new Item(421, 174, 1),
    i37: new Item(422, 174, 1),
    i38: new Item(423, 174, 1),
    i39: new Item(424, 174, 1),
    i40: new Item(425, 173, 1),
    i41: new Item(426, 173, 1),
    i42: new Item(427, 173, 1),
    i43: new Item(428, 173, 1),
    i44: new Item(429, 173, 1),
    i45: new Item(430, 173, 1),
    i46: new Item(431, 173, 1),
    i47: new Item(432, 173, 1),
    i48: new Item(433, 173, 1),
    i49: new Item(434, 173, 1),
    i50: new Item(435, 173, 1),
    i51: new Item(436, 173, 1),
    i52: new Item(437, 173, 1),
    i53: new Item(438, 173, 1),
    i54: new Item(439, 173, 1),
    i55: new Item(440, 173, 1),
    i56: new Item(441, 173, 1),
    i57: new Item(442, 173, 1),
    i58: new Item(0, 100, 0)
};
cA[59].loot = {
    i1: new Item(443, 1980, 2),
    i2: new Item(444, 1980, 2),
    i3: new Item(445, 1980, 2),
    i4: new Item(446, 990, 1),
    i5: new Item(258, 990, 1),
    i6: new Item(447, 990, 1),
    i7: new Item(308, 495, 1),
    i8: new Item(448, 495, 1),
    i9: new Item(0, 100, 0)
};
cA[60].loot = {
    i1: new Item(449, 1980, 2),
    i2: new Item(450, 1980, 2),
    i3: new Item(451, 1980, 2),
    i4: new Item(452, 1980, 1),
    i5: new Item(453, 1980, 1),
    i6: new Item(0, 100, 0)
};
cA[61].loot = {
    i1: new Item(454, 990, 1),
    i2: new Item(455, 990, 1),
    i3: new Item(456, 990, 1),
    i4: new Item(457, 990, 1),
    i5: new Item(458, 990, 1),
    i6: new Item(459, 990, 1),
    i7: new Item(460, 990, 1),
    i8: new Item(461, 990, 1),
    i9: new Item(462, 990, 1),
    i10: new Item(463, 990, 1),
    i11: new Item(0, 100, 0)
};
cA[62].loot = {
    i1: new Item(464, 1238, 1),
    i2: new Item(465, 1238, 1),
    i3: new Item(466, 1238, 1),
    i4: new Item(467, 1238, 1),
    i5: new Item(468, 1237, 1),
    i6: new Item(469, 1237, 1),
    i7: new Item(470, 1237, 1),
    i8: new Item(471, 1237, 1),
    i9: new Item(0, 100, 0)
};
cA[63].loot = {
    i1: new Item(472, 1238, 1),
    i2: new Item(473, 1238, 1),
    i3: new Item(474, 1238, 1),
    i4: new Item(475, 1238, 1),
    i5: new Item(476, 1237, 1),
    i6: new Item(477, 1237, 1),
    i7: new Item(478, 1237, 1),
    i8: new Item(479, 1237, 1),
    i9: new Item(0, 100, 0)
};
cA[64].loot = {
    i1: new Item(480, 1238, 1),
    i2: new Item(481, 1238, 1),
    i3: new Item(482, 1238, 1),
    i4: new Item(483, 1238, 1),
    i5: new Item(484, 1237, 1),
    i6: new Item(485, 1237, 1),
    i7: new Item(486, 1237, 1),
    i8: new Item(487, 1237, 1),
    i9: new Item(0, 100, 0)
};
cA[64].loot = {
    i1: new Item(480, 1238, 1),
    i2: new Item(481, 1238, 1),
    i3: new Item(482, 1238, 1),
    i4: new Item(483, 1238, 1),
    i5: new Item(484, 1237, 1),
    i6: new Item(485, 1237, 1),
    i7: new Item(486, 1237, 1),
    i8: new Item(487, 1237, 1),
    i9: new Item(0, 100, 0)
};
cA[65].loot = {
    i1: new Item(488, 1238, 1),
    i2: new Item(489, 1238, 1),
    i3: new Item(490, 1238, 1),
    i4: new Item(491, 1238, 1),
    i5: new Item(492, 1237, 1),
    i6: new Item(493, 1237, 1),
    i7: new Item(494, 1237, 1),
    i8: new Item(495, 1237, 1),
    i9: new Item(0, 100, 0)
};
cA[66].loot = {
    i1: new Item(496, 1238, 1),
    i2: new Item(497, 1238, 1),
    i3: new Item(498, 1238, 1),
    i4: new Item(499, 1238, 1),
    i5: new Item(500, 1237, 1),
    i6: new Item(501, 1237, 1),
    i7: new Item(502, 1237, 1),
    i8: new Item(503, 1237, 1),
    i9: new Item(0, 100, 0)
};
cA[67].loot = {
    i1: new Item(504, 1238, 1),
    i2: new Item(505, 1238, 1),
    i3: new Item(506, 1238, 1),
    i4: new Item(507, 1238, 1),
    i5: new Item(508, 1237, 1),
    i6: new Item(509, 1237, 1),
    i7: new Item(510, 1237, 1),
    i8: new Item(511, 1237, 1),
    i9: new Item(0, 100, 0)
};
cA[68].loot = {
    i1: new Item(512, 1238, 1),
    i2: new Item(513, 1238, 1),
    i3: new Item(514, 1238, 1),
    i4: new Item(515, 1238, 1),
    i5: new Item(516, 1237, 1),
    i6: new Item(517, 1237, 1),
    i7: new Item(518, 1237, 1),
    i8: new Item(519, 1237, 1),
    i9: new Item(0, 100, 0)
};
cA[69].loot = {
    i1: new Item(520, 1238, 1),
    i2: new Item(521, 1238, 1),
    i3: new Item(522, 1238, 1),
    i4: new Item(523, 1238, 1),
    i5: new Item(524, 1237, 1),
    i6: new Item(525, 1237, 1),
    i7: new Item(526, 1237, 1),
    i8: new Item(527, 1237, 1),
    i9: new Item(0, 100, 0)
};
cA[70].loot = {
    i1: new Item(25, 1980, 2),
    i2: new Item(528, 1980, 2),
    i3: new Item(68, 1980, 2),
    i4: new Item(256, 990, 1),
    i5: new Item(529, 990, 1),
    i6: new Item(530, 990, 1),
    i7: new Item(519, 495, 1),
    i8: new Item(303, 495, 1),
    i9: new Item(0, 100, 0)
};
cA[71].loot = {
    i1: new Item(531, 825, 1),
    i2: new Item(532, 825, 1),
    i3: new Item(533, 825, 1),
    i4: new Item(534, 825, 1),
    i5: new Item(535, 825, 1),
    i6: new Item(536, 825, 1),
    i7: new Item(537, 825, 1),
    i8: new Item(538, 825, 1),
    i9: new Item(539, 825, 1),
    i10: new Item(540, 825, 1),
    i11: new Item(541, 825, 1),
    i12: new Item(542, 825, 1),
    i13: new Item(0, 100, 0)
};
cA[72].loot = {
    i1: new Item(543, 825, 1),
    i2: new Item(544, 825, 1),
    i3: new Item(545, 825, 1),
    i4: new Item(546, 825, 1),
    i5: new Item(547, 825, 1),
    i6: new Item(548, 825, 1),
    i7: new Item(549, 825, 1),
    i8: new Item(550, 825, 1),
    i9: new Item(551, 825, 1),
    i10: new Item(552, 825, 1),
    i11: new Item(553, 825, 1),
    i12: new Item(554, 825, 1),
    i13: new Item(0, 100, 0)
};
cA[73].loot = {
    i1: new Item(555, 98, 3),
    i2: new Item(556, 98, 3),
    i3: new Item(557, 98, 3),
    i4: new Item(558, 98, 3),
    i5: new Item(559, 98, 3),
    i6: new Item(560, 98, 3),
    i7: new Item(561, 97, 3),
    i8: new Item(562, 97, 3),
    i9: new Item(563, 97, 3),
    i10: new Item(564, 97, 3),
    i11: new Item(565, 97, 3),
    i12: new Item(566, 97, 3),
    i13: new Item(567, 97, 3),
    i14: new Item(568, 97, 3),
    i15: new Item(569, 97, 3),
    i16: new Item(570, 97, 3),
    i17: new Item(571, 97, 3),
    i18: new Item(572, 97, 3),
    i19: new Item(573, 97, 3),
    i20: new Item(574, 97, 3),
    i21: new Item(575, 97, 3),
    i22: new Item(576, 97, 3),
    i23: new Item(577, 97, 3),
    i24: new Item(578, 97, 3),
    i25: new Item(579, 97, 3),
    i26: new Item(580, 97, 3),
    i27: new Item(581, 97, 3),
    i28: new Item(582, 97, 3),
    i29: new Item(583, 97, 3),
    i30: new Item(584, 97, 3),
    i31: new Item(585, 97, 3),
    i32: new Item(586, 97, 3),
    i33: new Item(587, 97, 3),
    i34: new Item(588, 97, 3),
    i35: new Item(589, 97, 3),
    i36: new Item(590, 97, 3),
    i37: new Item(591, 97, 3),
    i38: new Item(592, 97, 3),
    i39: new Item(593, 97, 3),
    i40: new Item(594, 97, 3),
    i41: new Item(595, 97, 3),
    i42: new Item(596, 97, 3),
    i43: new Item(597, 97, 3),
    i44: new Item(598, 97, 3),
    i45: new Item(599, 97, 3),
    i46: new Item(600, 97, 3),
    i47: new Item(601, 97, 3),
    i48: new Item(602, 97, 3),
    i49: new Item(603, 97, 3),
    i50: new Item(604, 97, 3),
    i51: new Item(605, 97, 3),
    i52: new Item(606, 97, 3),
    i53: new Item(607, 97, 3),
    i54: new Item(608, 97, 3),
    i55: new Item(609, 97, 3),
    i56: new Item(610, 97, 3),
    i57: new Item(611, 97, 3),
    i58: new Item(612, 97, 3),
    i59: new Item(613, 97, 3),
    i60: new Item(614, 97, 3),
    i61: new Item(615, 97, 3),
    i62: new Item(616, 97, 3),
    i63: new Item(617, 97, 3),
    i64: new Item(618, 97, 3),
    i65: new Item(619, 97, 3),
    i66: new Item(620, 97, 3),
    i67: new Item(621, 97, 3),
    i68: new Item(622, 97, 3),
    i69: new Item(623, 97, 3),
    i70: new Item(624, 97, 3),
    i71: new Item(625, 97, 3),
    i72: new Item(626, 97, 3),
    i73: new Item(627, 97, 3),
    i74: new Item(628, 97, 3),
    i75: new Item(629, 97, 3),
    i76: new Item(630, 97, 3),
    i77: new Item(631, 97, 3),
    i78: new Item(632, 97, 3),
    i79: new Item(633, 97, 3),
    i80: new Item(634, 97, 3),
    i81: new Item(635, 97, 3),
    i82: new Item(636, 97, 3),
    i83: new Item(637, 97, 3),
    i84: new Item(638, 97, 3),
    i85: new Item(639, 97, 3),
    i86: new Item(640, 97, 3),
    i87: new Item(641, 97, 3),
    i88: new Item(642, 97, 3),
    i89: new Item(643, 97, 3),
    i90: new Item(644, 97, 3),
    i91: new Item(645, 97, 3),
    i92: new Item(646, 97, 3),
    i93: new Item(647, 97, 3),
    i94: new Item(648, 97, 3),
    i95: new Item(649, 97, 3),
    i96: new Item(650, 97, 3),
    i97: new Item(651, 97, 3),
    i98: new Item(652, 97, 3),
    i99: new Item(653, 97, 3),
    i100: new Item(654, 97, 3),
    i101: new Item(655, 97, 3),
    i102: new Item(656, 97, 3),
    i103: new Item(0, 100, 0)
};
cA[74].loot = {
    i1: new Item(19, 1980, 2),
    i2: new Item(657, 1980, 2),
    i3: new Item(132, 1980, 2),
    i4: new Item(658, 990, 1),
    i5: new Item(659, 990, 1),
    i6: new Item(660, 990, 1),
    i7: new Item(43, 495, 1),
    i8: new Item(284, 495, 1),
    i9: new Item(0, 100, 0)
};
cA[75].loot = {
    i1: new Item(661, 1980, 2),
    i2: new Item(176, 1980, 2),
    i3: new Item(662, 1980, 2),
    i4: new Item(663, 990, 1),
    i5: new Item(664, 990, 1),
    i6: new Item(665, 990, 1),
    i7: new Item(666, 495, 1),
    i8: new Item(359, 495, 1),
    i9: new Item(0, 100, 0)
};
cA[76].loot = {
    i1: new Item(667, 1980, 2),
    i2: new Item(144, 1980, 2),
    i3: new Item(668, 1980, 2),
    i4: new Item(669, 990, 1),
    i5: new Item(670, 990, 1),
    i6: new Item(671, 990, 1),
    i7: new Item(672, 495, 1),
    i8: new Item(50, 495, 1),
    i9: new Item(0, 100, 0)
};
cA[77].loot = {
    i1: new Item(673, 1100, 4),
    i2: new Item(674, 1100, 4),
    i3: new Item(675, 1100, 4),
    i4: new Item(676, 1100, 4),
    i5: new Item(677, 1100, 4),
    i6: new Item(678, 1100, 4),
    i7: new Item(679, 1100, 4),
    i8: new Item(680, 1100, 4),
    i9: new Item(681, 1100, 4),
    i10: new Item(0, 100, 0)
};
cA[78].loot = {
    i1: new Item(682, 310, 1),
    i2: new Item(683, 310, 1),
    i3: new Item(684, 310, 1),
    i4: new Item(685, 310, 1),
    i5: new Item(686, 310, 1),
    i6: new Item(687, 310, 1),
    i7: new Item(688, 310, 1),
    i8: new Item(689, 310, 1),
    i9: new Item(690, 310, 1),
    i10: new Item(691, 310, 1),
    i11: new Item(692, 310, 1),
    i12: new Item(693, 310, 1),
    i13: new Item(694, 309, 1),
    i14: new Item(695, 309, 1),
    i15: new Item(696, 309, 1),
    i16: new Item(697, 309, 1),
    i17: new Item(698, 309, 1),
    i18: new Item(699, 309, 1),
    i19: new Item(700, 309, 1),
    i20: new Item(701, 309, 1),
    i21: new Item(702, 309, 1),
    i22: new Item(703, 309, 1),
    i23: new Item(704, 309, 1),
    i24: new Item(705, 309, 1),
    i25: new Item(706, 309, 1),
    i26: new Item(707, 309, 1),
    i27: new Item(708, 309, 1),
    i28: new Item(709, 309, 1),
    i29: new Item(710, 309, 1),
    i30: new Item(711, 309, 1),
    i31: new Item(712, 309, 1),
    i32: new Item(713, 309, 1),
    i33: new Item(0, 100, 0)
};
cA[79].loot = {
    i1: new Item(714, 231, 1),
    i2: new Item(715, 231, 1),
    i3: new Item(716, 231, 1),
    i4: new Item(717, 231, 1),
    i5: new Item(718, 231, 1),
    i6: new Item(719, 231, 1),
    i7: new Item(720, 231, 1),
    i8: new Item(721, 231, 1),
    i9: new Item(722, 231, 1),
    i10: new Item(723, 231, 1),
    i11: new Item(724, 230, 1),
    i12: new Item(725, 230, 1),
    i13: new Item(726, 230, 1),
    i14: new Item(727, 230, 1),
    i15: new Item(728, 230, 1),
    i16: new Item(729, 230, 1),
    i17: new Item(730, 230, 1),
    i18: new Item(731, 230, 1),
    i19: new Item(732, 230, 1),
    i20: new Item(733, 230, 1),
    i21: new Item(734, 230, 1),
    i22: new Item(735, 230, 1),
    i23: new Item(736, 230, 1),
    i24: new Item(737, 230, 1),
    i25: new Item(738, 230, 1),
    i26: new Item(739, 230, 1),
    i27: new Item(740, 230, 1),
    i28: new Item(741, 230, 1),
    i29: new Item(742, 230, 1),
    i30: new Item(743, 230, 1),
    i31: new Item(744, 230, 1),
    i32: new Item(745, 230, 1),
    i33: new Item(746, 230, 1),
    i34: new Item(747, 230, 1),
    i35: new Item(748, 230, 1),
    i36: new Item(749, 230, 1),
    i37: new Item(750, 230, 1),
    i38: new Item(751, 230, 1),
    i39: new Item(752, 230, 1),
    i40: new Item(753, 230, 1),
    i41: new Item(754, 230, 1),
    i42: new Item(755, 230, 1),
    i43: new Item(756, 230, 1),
    i44: new Item(0, 100, 0)
};
cA[80].loot = {
    i1: new Item(757, 1238, 1),
    i2: new Item(758, 1238, 1),
    i3: new Item(759, 1238, 1),
    i4: new Item(760, 1238, 1),
    i5: new Item(761, 1237, 1),
    i6: new Item(264, 1237, 1),
    i7: new Item(762, 1237, 1),
    i8: new Item(763, 1237, 1),
    i9: new Item(0, 100, 0)
};
cA[81].loot = {
    i1: new Item(764, 1238, 1),
    i2: new Item(765, 1238, 1),
    i3: new Item(766, 1238, 1),
    i4: new Item(767, 1238, 1),
    i5: new Item(768, 1237, 1),
    i6: new Item(769, 1237, 1),
    i7: new Item(770, 1237, 1),
    i8: new Item(771, 1237, 1),
    i9: new Item(0, 100, 0)
};
cA[82].loot = {
    i1: new Item(75, 667, 7),
    i2: new Item(76, 667, 7),
    i3: new Item(77, 667, 7),
    i4: new Item(78, 667, 7),
    i5: new Item(79, 667, 7),
    i6: new Item(80, 667, 7),
    i7: new Item(81, 667, 7),
    i8: new Item(82, 667, 7),
    i9: new Item(83, 667, 7),
    i10: new Item(84, 667, 7),
    i11: new Item(85, 666, 7),
    i12: new Item(86, 666, 7),
    i13: new Item(87, 666, 7),
    i14: new Item(88, 666, 7),
    i15: new Item(89, 666, 7)
};
cA[83].loot = {
    i1: new Item(772, 2500, 4),
    i2: new Item(773, 2500, 4),
    i3: new Item(774, 2500, 4),
    i4: new Item(775, 2500, 4),
};
cA[84].loot = {
    i1: new Item(776, 225, 1),
    i2: new Item(777, 225, 1),
    i3: new Item(778, 225, 1),
    i4: new Item(779, 225, 1),
    i5: new Item(780, 225, 1),
    i6: new Item(781, 225, 1),
    i7: new Item(782, 225, 1),
    i8: new Item(783, 225, 1),
    i9: new Item(784, 225, 1),
    i10: new Item(785, 225, 1),
    i11: new Item(786, 225, 1),
    i12: new Item(787, 225, 1),
    i13: new Item(788, 225, 1),
    i14: new Item(789, 225, 1),
    i15: new Item(790, 225, 1),
    i16: new Item(791, 225, 1),
    i17: new Item(792, 225, 1),
    i18: new Item(793, 225, 1),
    i19: new Item(794, 225, 1),
    i20: new Item(795, 225, 1),
    i21: new Item(796, 225, 1),
    i22: new Item(797, 225, 1),
    i23: new Item(798, 225, 1),
    i24: new Item(799, 225, 1),
    i25: new Item(800, 225, 1),
    i26: new Item(801, 225, 1),
    i27: new Item(802, 225, 1),
    i28: new Item(803, 225, 1),
    i29: new Item(804, 225, 1),
    i30: new Item(805, 225, 1),
    i31: new Item(806, 225, 1),
    i32: new Item(807, 225, 1),
    i33: new Item(808, 225, 1),
    i34: new Item(809, 225, 1),
    i35: new Item(810, 225, 1),
    i36: new Item(811, 225, 1),
    i37: new Item(812, 225, 1),
    i38: new Item(813, 225, 1),
    i39: new Item(814, 225, 1),
    i40: new Item(815, 225, 1),
    i41: new Item(816, 225, 1),
    i42: new Item(817, 225, 1),
    i43: new Item(818, 225, 1),
    i44: new Item(819, 225, 1),
    i45: new Item(0, 100, 0)
};
cA[85].loot = {
    i1: new Item(820, 1100, 1),
    i2: new Item(821, 1100, 1),
    i3: new Item(822, 1100, 1),
    i4: new Item(823, 1100, 1),
    i5: new Item(824, 1100, 1),
    i6: new Item(825, 1100, 1),
    i7: new Item(826, 1100, 1),
    i8: new Item(827, 1100, 1),
    i9: new Item(828, 1100, 1),
    i10: new Item(0, 100, 0)
};
cA[86].loot = {
    i1: new Item(829, 990, 1),
    i2: new Item(830, 990, 1),
    i3: new Item(831, 990, 1),
    i4: new Item(832, 990, 1),
    i5: new Item(833, 990, 1),
    i6: new Item(834, 990, 1),
    i7: new Item(262, 990, 1),
    i8: new Item(835, 990, 1),
    i9: new Item(836, 990, 1),
    i10: new Item(837, 990, 1),
    i11: new Item(0, 100, 0)
};
cA[87].loot = {
    i1: new Item(889, 1100, 1),
    i2: new Item(890, 1100, 1),
    i3: new Item(891, 1100, 1),
    i4: new Item(892, 1100, 1),
    i5: new Item(893, 1100, 1),
    i6: new Item(894, 1100, 1),
    i7: new Item(895, 1100, 1),
    i8: new Item(896, 1100, 1),
    i9: new Item(897, 1100, 1),
    i10: new Item(0, 100, 0)
};
cA[88].loot = {
    i1: new Item(838, 1650, 8),
    i2: new Item(839, 1650, 8),
    i3: new Item(840, 1650, 8),
    i4: new Item(841, 1650, 8),
    i5: new Item(842, 1650, 8),
    i6: new Item(843, 1650, 8),
    i7: new Item(0, 100, 0)
};
cA[89].loot = {
    i1: new Item(844, 1980, 8),
    i2: new Item(845, 1980, 8),
    i3: new Item(846, 1980, 8),
    i4: new Item(847, 1980, 8),
    i5: new Item(848, 1980, 8),
    i6: new Item(0, 100, 0)
};
cA[90].loot = {
    i1: new Item(849, 1650, 8),
    i2: new Item(850, 1650, 8),
    i3: new Item(851, 1650, 8),
    i4: new Item(852, 1650, 8),
    i5: new Item(853, 1650, 8),
    i6: new Item(854, 1650, 8),
    i7: new Item(0, 100, 0)
};
cA[91].loot = {
    i1: new Item(855, 1980, 8),
    i2: new Item(856, 1980, 8),
    i3: new Item(857, 1980, 8),
    i4: new Item(858, 1980, 8),
    i5: new Item(859, 1980, 8),
    i6: new Item(0, 100, 0)
};
cA[92].loot = {
    i1: new Item(860, 1980, 8),
    i2: new Item(861, 1980, 8),
    i3: new Item(862, 1980, 8),
    i4: new Item(863, 1980, 8),
    i5: new Item(864, 1980, 8),
    i6: new Item(0, 100, 0)
};
cA[93].loot = {
    i1: new Item(865, 1980, 8),
    i2: new Item(866, 1980, 8),
    i3: new Item(867, 1980, 8),
    i4: new Item(868, 1980, 8),
    i5: new Item(869, 1980, 8),
    i6: new Item(0, 100, 0)
};
cA[94].loot = {
    i1: new Item(870, 1415, 8),
    i2: new Item(871, 1415, 8),
    i3: new Item(872, 1414, 8),
    i4: new Item(873, 1414, 8),
    i5: new Item(874, 1414, 8),
    i6: new Item(875, 1414, 8),
    i7: new Item(876, 1414, 8),
    i8: new Item(0, 100, 0)
};
cA[95].loot = {
    i1: new Item(877, 1415, 8),
    i2: new Item(878, 1415, 8),
    i3: new Item(879, 1414, 8),
    i4: new Item(880, 1414, 8),
    i5: new Item(881, 1414, 8),
    i6: new Item(882, 1414, 8),
    i7: new Item(883, 1414, 8),
    i8: new Item(0, 100, 0)
};
cA[96].loot = {
    i1: new Item(884, 1980, 8),
    i2: new Item(885, 1980, 8),
    i3: new Item(886, 1980, 8),
    i4: new Item(887, 1980, 8),
    i5: new Item(888, 1980, 8),
    i6: new Item(0, 100, 0)
};
cA[97].loot = {
    i1: new Item(898, 413, 4),
    i2: new Item(899, 413, 4),
    i3: new Item(900, 413, 4),
    i4: new Item(901, 413, 4),
    i5: new Item(902, 413, 9),
    i6: new Item(903, 413, 4),
    i7: new Item(904, 413, 4),
    i8: new Item(905, 413, 9),
    i9: new Item(906, 413, 9),
    i10: new Item(907, 413, 9),
    i11: new Item(908, 413, 9),
    i12: new Item(909, 413, 9),
    i13: new Item(910, 412, 4),
    i14: new Item(911, 412, 4),
    i15: new Item(912, 412, 4),
    i16: new Item(913, 412, 9),
    i17: new Item(914, 412, 4),
    i18: new Item(915, 412, 4),
    i19: new Item(916, 412, 4),
    i20: new Item(917, 412, 4),
    i21: new Item(918, 412, 4),
    i22: new Item(919, 412, 4),
    i23: new Item(920, 412, 7),
    i24: new Item(921, 412, 4),
    i25: new Item(0, 100, 0)
};
cA[98].loot = {
    i1: new Item(922, 1415, 4),
    i2: new Item(923, 1415, 4),
    i3: new Item(924, 1414, 4),
    i4: new Item(925, 1414, 4),
    i5: new Item(926, 1414, 4),
    i6: new Item(927, 1414, 4),
    i7: new Item(928, 1414, 4),
    i8: new Item(0, 100, 0)
};
cA[99].loot = {
    i1: new Item(929, 342, 9),
    i2: new Item(930, 342, 4),
    i3: new Item(931, 342, 4),
    i4: new Item(932, 342, 9),
    i5: new Item(933, 342, 9),
    i6: new Item(934, 342, 4),
    i7: new Item(935, 342, 4),
    i8: new Item(936, 342, 9),
    i9: new Item(937, 342, 4),
    i10: new Item(938, 342, 4),
    i11: new Item(939, 342, 9),
    i12: new Item(940, 341, 4),
    i13: new Item(941, 341, 9),
    i14: new Item(942, 341, 9),
    i15: new Item(943, 341, 9),
    i16: new Item(944, 341, 4),
    i17: new Item(945, 341, 9),
    i18: new Item(946, 341, 4),
    i19: new Item(947, 341, 4),
    i20: new Item(948, 341, 4),
    i21: new Item(949, 341, 9),
    i22: new Item(950, 341, 4),
    i23: new Item(951, 341, 4),
    i24: new Item(952, 341, 4),
    i25: new Item(953, 341, 9),
    i26: new Item(954, 341, 4),
    i27: new Item(955, 341, 4),
    i28: new Item(956, 341, 4),
    i29: new Item(957, 341, 4),
    i30: new Item(0, 100, 0)
};
cA[100].loot = {
    i1: new Item(958, 1213, 1),
    i2: new Item(959, 1213, 1),
    i3: new Item(960, 1213, 2),
    i4: new Item(961, 1213, 1),
    i5: new Item(962, 1212, 1),
    i6: new Item(963, 1212, 1),
    i7: new Item(964, 1212, 4),
    i8: new Item(198, 1212, 4),
    i9: new Item(965, 100, 2),
    i10: new Item(115, 100, 2),
    i11: new Item(0, 100, 0)
};
cA[101].loot = {
    i1: new Item(966, 1100, 1),
    i2: new Item(967, 1100, 1),
    i3: new Item(968, 1100, 1),
    i4: new Item(969, 1100, 1),
    i5: new Item(970, 1100, 1),
    i6: new Item(971, 1100, 1),
    i7: new Item(972, 1100, 1),
    i8: new Item(973, 1100, 1),
    i9: new Item(974, 1100, 1),
    i10: new Item(0, 100, 0)
};
cA[102].loot = {
    i1: new Item(39, 1607, 2),
    i2: new Item(975, 1607, 2),
    i3: new Item(976, 1607, 2),
    i4: new Item(977, 1607, 2),
    i5: new Item(978, 1607, 2),
    i6: new Item(42, 333, 2),
    i7: new Item(141, 333, 2),
    i8: new Item(979, 333, 2),
    i9: new Item(980, 333, 2),
    i10: new Item(981, 333, 2),
    i11: new Item(982, 100, 1),
    i12: new Item(199, 100, 2),
    i13: new Item(0, 100, 0)
};
cA[103].loot = {
    i1: new Item(104, 1333, 6, 3),
    i2: new Item(103, 1333, 6, 3),
    i3: new Item(102, 1333, 6, 3),
    i4: new Item(101, 1333, 6, 3),
    i5: new Item(100, 1333, 6, 3),
    i6: new Item(99, 1333, 6, 3),
    i7: new Item(98, 375, 6, 4),
    i8: new Item(97, 375, 6, 4),
    i9: new Item(96, 375, 6, 4),
    i10: new Item(95, 375, 6, 4),
    i11: new Item(94, 134, 6, 5),
    i12: new Item(93, 134, 6, 5),
    i13: new Item(92, 134, 6, 5),
    i14: new Item(91, 50, 6, 6),
    i15: new Item(90, 50, 6, 6)
};
cA[104].loot = {
    i1: new Item(983, 1600, 6, 3),
    i2: new Item(984, 1600, 6, 3),
    i3: new Item(985, 1600, 6, 3),
    i4: new Item(986, 1600, 6, 3),
    i5: new Item(987, 1600, 6, 3),
    i6: new Item(988, 300, 6, 4),
    i7: new Item(989, 300, 6, 4),
    i8: new Item(990, 300, 6, 4),
    i9: new Item(991, 300, 6, 4),
    i10: new Item(992, 300, 6, 4),
    i11: new Item(993, 134, 6, 5),
    i12: new Item(994, 133, 6, 5),
    i13: new Item(995, 133, 6, 5),
    i14: new Item(996, 50, 6, 6),
    i15: new Item(997, 50, 6, 6)
};
cA[105].loot = {
    i1: new Item(998, 1129, 4, 3),
    i2: new Item(999, 1129, 4, 3),
    i3: new Item(1000, 1129, 4, 3),
    i4: new Item(1001, 1129, 10, 3),
    i5: new Item(1002, 1129, 4, 3),
    i6: new Item(1003, 1128, 4, 3),
    i7: new Item(1004, 1128, 4, 3),
    i8: new Item(1005, 375, 10, 4),
    i9: new Item(1006, 375, 10, 4),
    i10: new Item(1007, 375, 10, 4),
    i11: new Item(1008, 375, 10, 4),
    i12: new Item(1009, 133, 10, 5),
    i13: new Item(1010, 133, 4, 5),
    i14: new Item(1011, 133, 10, 5),
    i15: new Item(1012, 50, 10, 6),
    i16: new Item(1013, 50, 10, 6),
    i17: new Item(0, 100, 1)
};
cA[106].loot = {
    i1: new Item(1014, 1975, 10, 3),
    i2: new Item(1015, 1975, 4, 3),
    i3: new Item(1016, 1975, 4, 3),
    i4: new Item(1017, 1975, 4, 3),
    i5: new Item(1018, 500, 4, 4),
    i6: new Item(1019, 500, 10, 4),
    i7: new Item(1020, 500, 4, 4),
    i8: new Item(1021, 200, 4, 5),
    i9: new Item(1022, 200, 4, 5),
    i10: new Item(1023, 50, 10, 6),
    i11: new Item(1024, 50, 4, 6),
    i12: new Item(0, 100, 1)
};
cA[107].loot = {
    i1: new Item(1025, 1975, 4, 3),
    i2: new Item(1026, 1975, 4, 3),
    i3: new Item(1027, 1975, 4, 3),
    i4: new Item(1028, 1975, 10, 3),
    i5: new Item(1029, 500, 4, 4),
    i6: new Item(1030, 500, 10, 4),
    i7: new Item(1031, 500, 4, 4),
    i8: new Item(1032, 200, 4, 5),
    i9: new Item(1033, 200, 4, 5),
    i10: new Item(1034, 100, 4, 6),
    i11: new Item(0, 100, 1)
};
cA[108].loot = {
    i1: new Item(1053, 989, 10, 3),
    i2: new Item(1035, 989, 4, 3),
    i3: new Item(1036, 989, 4, 3),
    i4: new Item(1037, 989, 10, 3),
    i5: new Item(1038, 989, 4, 3),
    i6: new Item(1039, 989, 4, 3),
    i7: new Item(1040, 989, 10, 3),
    i8: new Item(1041, 989, 4, 3),
    i9: new Item(1042, 250, 4, 4),
    i10: new Item(1043, 250, 4, 4),
    i11: new Item(1044, 250, 10, 4),
    i12: new Item(1045, 250, 4, 4),
    i13: new Item(1046, 250, 10, 4),
    i14: new Item(1047, 250, 10, 4),
    i15: new Item(1048, 130, 4, 5),
    i16: new Item(1049, 129, 4, 5),
    i17: new Item(1050, 129, 4, 5),
    i18: new Item(1051, 50, 4, 6),
    i19: new Item(1052, 50, 4, 6),
    i20: new Item(0, 100, 1)
};
cA[109].loot = {
    i1: new Item(1054, 721, 6, 3),
    i2: new Item(1055, 721, 6, 3),
    i3: new Item(1056, 721, 6, 3),
    i4: new Item(1057, 721, 6, 3),
    i5: new Item(1058, 721, 6, 3),
    i6: new Item(1059, 721, 6, 3),
    i7: new Item(1060, 721, 6, 3),
    i8: new Item(1061, 721, 6, 3),
    i9: new Item(1062, 721, 6, 3),
    i10: new Item(1063, 721, 6, 3),
    i11: new Item(1064, 721, 6, 3),
    i12: new Item(1065, 217, 6, 4),
    i13: new Item(1066, 217, 6, 4),
    i14: new Item(1067, 217, 6, 4),
    i15: new Item(1068, 217, 6, 4),
    i16: new Item(1069, 217, 6, 4),
    i17: new Item(1070, 217, 6, 4),
    i18: new Item(1071, 217, 6, 4),
    i19: new Item(1072, 100, 6, 5),
    i20: new Item(1073, 100, 6, 5),
    i21: new Item(1074, 100, 6, 5),
    i22: new Item(1075, 100, 6, 5),
    i23: new Item(1076, 50, 6, 6),
    i24: new Item(1077, 50, 6, 6),
    i25: new Item(1078, 50, 6, 6),
};
cA[110].loot = {
    i1: new Item(1079, 1000, 6, 3),
    i2: new Item(1080, 1000, 6, 3),
    i3: new Item(1081, 1000, 6, 3),
    i4: new Item(1082, 1000, 6, 3),
    i5: new Item(1083, 1000, 6, 3),
    i6: new Item(1084, 1000, 6, 3),
    i7: new Item(1085, 1000, 6, 3),
    i8: new Item(1086, 1000, 6, 3),
    i9: new Item(1087, 300, 6, 4),
    i10: new Item(1088, 300, 6, 4),
    i11: new Item(1089, 300, 6, 4),
    i12: new Item(1090, 300, 6, 4),
    i13: new Item(1091, 300, 6, 4),
    i14: new Item(1092, 134, 6, 5),
    i15: new Item(1093, 133, 6, 5),
    i16: new Item(1094, 133, 6, 5),
    i17: new Item(1095, 50, 6, 6),
    i18: new Item(1096, 50, 6, 6),
};
cA[111].loot = {
    i1: new Item(1097, 800, 10, 3),
    i2: new Item(1098, 800, 10, 3),
    i3: new Item(1099, 800, 4, 3),
    i4: new Item(1100, 800, 10, 3),
    i5: new Item(1101, 800, 4, 3),
    i6: new Item(1102, 800, 4, 3),
    i7: new Item(1103, 800, 4, 3),
    i8: new Item(1104, 800, 4, 3),
    i9: new Item(1105, 800, 4, 3),
    i10: new Item(1106, 800, 4, 3),
    i11: new Item(1107, 350, 4, 4),
    i12: new Item(1108, 350, 4, 4),
    i13: new Item(1109, 350, 4, 4),
    i14: new Item(1110, 350, 10, 4),
    i15: new Item(1111, 500, 10, 5),
    i16: new Item(0, 100, 1),
};
cA[112].loot = {
    i1: new Item(1112, 1316, 4, 3),
    i2: new Item(1113, 1316, 4, 3),
    i3: new Item(1114, 1316, 4, 3),
    i4: new Item(1115, 1316, 4, 3),
    i5: new Item(1116, 1316, 10, 3),
    i6: new Item(1117, 1316, 4, 3),
    i7: new Item(1118, 376, 10, 4),
    i8: new Item(1119, 376, 10, 4),
    i9: new Item(1120, 376, 4, 4),
    i10: new Item(1121, 376, 4, 4),
    i11: new Item(1122, 200, 4, 5),
    i12: new Item(1123, 200, 10, 5),
    i13: new Item(1124, 50, 4, 6),
    i14: new Item(1125, 50, 10, 6),
    i15: new Item(0, 100, 1),
};
cA[113].loot = {
    i1: new Item(258, 660, 1),
    i2: new Item(373, 660, 1),
    i3: new Item(272, 660, 1),
    i4: new Item(670, 660, 1),
    i5: new Item(665, 660, 1),
    i6: new Item(1126, 660, 2),
    i7: new Item(156, 660, 2),
    i8: new Item(31, 660, 2),
    i9: new Item(139, 660, 2),
    i10: new Item(208, 660, 2),
    i11: new Item(173, 660, 2),
    i12: new Item(1127, 660, 2),
    i13: new Item(1128, 660, 2),
    i14: new Item(1129, 660, 2),
    i15: new Item(1130, 660, 2),
    i16: new Item(0, 100, 0)
};
cA[114].loot = {
    i1: new Item(1131, 790, 4, 3),
    i2: new Item(1132, 790, 4, 3),
    i3: new Item(1133, 790, 4, 3),
    i4: new Item(1134, 790, 10, 3),
    i5: new Item(1135, 790, 4, 3),
    i6: new Item(1136, 790, 4, 3),
    i7: new Item(1137, 790, 4, 4),
    i8: new Item(1138, 790, 10, 3),
    i9: new Item(1139, 790, 10, 3),
    i10: new Item(1140, 790, 10, 3),
    i11: new Item(1141, 250, 10, 4),
    i12: new Item(1142, 250, 10, 4),
    i13: new Item(1143, 250, 4, 4),
    i14: new Item(1144, 250, 4, 4),
    i15: new Item(1145, 250, 10, 4),
    i16: new Item(1146, 250, 10, 4),
    i17: new Item(1147, 134, 10, 5),
    i18: new Item(1148, 133, 10, 5),
    i19: new Item(1149, 133, 4, 5),
    i20: new Item(1150, 50, 10, 6),
    i21: new Item(1151, 50, 4, 6),
    i22: new Item(0, 100, 1),
};
cA[115].loot = {
    i1: new Item(1152, 1130, 4, 3),
    i2: new Item(1153, 1130, 4, 3),
    i3: new Item(1154, 1130, 10, 3),
    i4: new Item(1155, 1130, 4, 3),
    i5: new Item(1156, 1130, 10, 3),
    i6: new Item(1157, 1130, 4, 3),
    i7: new Item(1158, 1130, 4, 3),
    i8: new Item(1159, 300, 4, 4),
    i9: new Item(1160, 300, 4, 4),
    i10: new Item(1161, 300, 10, 4),
    i11: new Item(1162, 300, 4, 4),
    i12: new Item(1163, 300, 10, 4),
    i13: new Item(1164, 130, 4, 5),
    i14: new Item(1165, 130, 4, 5),
    i15: new Item(1166, 130, 10, 5),
    i16: new Item(1167, 50, 10, 6),
    i17: new Item(1168, 50, 10, 6),
    i18: new Item(0, 100, 1),
};
cA[116].loot = {
    i1: new Item(1169, 878, 4, 3),
    i2: new Item(1170, 878, 4, 3),
    i3: new Item(1171, 878, 4, 3),
    i4: new Item(1172, 878, 10, 3),
    i5: new Item(1173, 878, 10, 3),
    i6: new Item(1174, 878, 4, 3),
    i7: new Item(1175, 878, 10, 3),
    i8: new Item(1176, 878, 4, 3),
    i9: new Item(1177, 877, 4, 3),
    i10: new Item(1178, 300, 4, 4),
    i11: new Item(1179, 300, 4, 4),
    i12: new Item(1180, 300, 4, 4),
    i13: new Item(1181, 300, 4, 4),
    i14: new Item(1182, 300, 10, 4),
    i15: new Item(1183, 133, 4, 5),
    i16: new Item(1184, 133, 10, 5),
    i17: new Item(1185, 133, 10, 5),
    i18: new Item(1186, 50, 10, 6),
    i19: new Item(1187, 50, 10, 6),
    i20: new Item(0, 100, 1),
};
cA[117].loot = {
    i1: new Item(1188, 790, 4, 3),
    i2: new Item(1189, 790, 4, 3),
    i3: new Item(1190, 790, 10, 3),
    i4: new Item(1191, 790, 10, 3),
    i5: new Item(1192, 790, 4, 3),
    i6: new Item(1193, 790, 4, 3),
    i7: new Item(1194, 790, 10, 3),
    i8: new Item(1195, 790, 4, 3),
    i9: new Item(1196, 790, 10, 3),
    i10: new Item(1197, 790, 4, 3),
    i11: new Item(1198, 300, 4, 4),
    i12: new Item(1199, 300, 4, 4),
    i13: new Item(1200, 300, 4, 4),
    i14: new Item(1201, 300, 4, 4),
    i15: new Item(1202, 300, 10, 4),
    i16: new Item(1203, 134, 4, 5),
    i17: new Item(1204, 133, 4, 5),
    i18: new Item(1205, 133, 10, 5),
    i19: new Item(1206, 50, 10, 6),
    i20: new Item(1207, 50, 4, 6),
    i21: new Item(0, 100, 1),
};
cA[118].loot = {
    i1: new Item(1208, 790, 4, 3),
    i2: new Item(1209, 790, 10, 3),
    i3: new Item(1210, 790, 4, 3),
    i4: new Item(1211, 790, 4, 3),
    i5: new Item(1212, 790, 4, 3),
    i6: new Item(1213, 790, 4, 3),
    i7: new Item(1214, 790, 4, 3),
    i8: new Item(1215, 790, 10, 3),
    i9: new Item(1216, 790, 4, 3),
    i10: new Item(1217, 790, 10, 3),
    i11: new Item(1218, 300, 4, 4),
    i12: new Item(1219, 300, 10, 4),
    i13: new Item(1220, 300, 4, 4),
    i14: new Item(1221, 300, 4, 4),
    i15: new Item(1222, 300, 10, 4),
    i16: new Item(1223, 134, 4, 5),
    i17: new Item(1224, 133, 4, 5),
    i18: new Item(1225, 133, 10, 5),
    i19: new Item(1226, 50, 10, 6),
    i20: new Item(1227, 50, 4, 6),
    i21: new Item(0, 100, 1),
};
cA[119].loot = {
    i1: new Item(1228, 1600, 6, 3),
    i2: new Item(1229, 1600, 6, 3),
    i3: new Item(1230, 1600, 6, 3),
    i4: new Item(1231, 1600, 6, 3),
    i5: new Item(1232, 1600, 6, 3),
    i6: new Item(1233, 500, 6, 4),
    i7: new Item(1234, 500, 6, 4),
    i8: new Item(1235, 500, 6, 4),
    i9: new Item(1236, 200, 6, 5),
    i10: new Item(1237, 200, 6, 5),
    i11: new Item(1238, 100, 6, 6),
};
cA[120].loot = {
    i1: new Item(1239, 1600, 6, 3),
    i2: new Item(1240, 1600, 6, 3),
    i3: new Item(1241, 1600, 6, 3),
    i4: new Item(1242, 1600, 6, 3),
    i5: new Item(1243, 1600, 6, 3),
    i6: new Item(1244, 375, 6, 4),
    i7: new Item(1245, 375, 6, 4),
    i8: new Item(1246, 375, 6, 4),
    i9: new Item(1247, 375, 6, 4),
    i10: new Item(1248, 134, 6, 5),
    i11: new Item(1249, 133, 6, 5),
    i12: new Item(1250, 133, 6, 5),
    i13: new Item(1251, 100, 6, 6),
};
cA[121].loot = {
    i1: new Item(1252, 4000, 5, 1),
    i2: new Item(1253, 4000, 5, 1),
    i3: new Item(1254, 800, 5, 2),
    i4: new Item(1255, 800, 5, 2),
    i5: new Item(1256, 100, 5, 3),
    i6: new Item(1257, 100, 5, 3),
    i7: new Item(1258, 100, 5, 3),
    i8: new Item(1259, 34, 5, 4),
    i9: new Item(1260, 33, 5, 4),
    i10: new Item(1261, 33, 5, 4),
};
cA[122].loot = {
    i1: new Item(1262, 4000, 5, 1),
    i2: new Item(1263, 4000, 5, 1),
    i3: new Item(1264, 800, 5, 2),
    i4: new Item(1265, 800, 5, 2),
    i5: new Item(1266, 150, 5, 3),
    i6: new Item(1267, 150, 5, 3),
    i7: new Item(1268, 50, 5, 4),
    i8: new Item(1269, 50, 5, 4),
};
cA[123].loot = {
    i1: new Item(1270, 790, 4, 3),
    i2: new Item(1271, 790, 10, 3),
    i3: new Item(1272, 790, 4, 3),
    i4: new Item(1273, 790, 4, 3),
    i5: new Item(1274, 790, 10, 3),
    i6: new Item(1275, 790, 10, 3),
    i7: new Item(1276, 790, 10, 3),
    i8: new Item(1277, 790, 10, 3),
    i9: new Item(1278, 790, 4, 3),
    i10: new Item(1279, 790, 10, 3),
    i11: new Item(1280, 300, 4, 4),
    i12: new Item(1281, 300, 4, 4),
    i13: new Item(1282, 300, 10, 4),
    i14: new Item(1283, 300, 10, 4),
    i15: new Item(1284, 300, 4, 4),
    i16: new Item(1285, 134, 4, 5),
    i17: new Item(1286, 133, 10, 5),
    i18: new Item(1287, 133, 4, 5),
    i19: new Item(1288, 50, 10, 6),
    i20: new Item(1289, 50, 10, 6),
    i21: new Item(0, 100, 1),
};
cA[124].loot = {
    i1: new Item(1290, 1000, 6, 3),
    i2: new Item(1291, 1000, 6, 3),
    i3: new Item(1292, 1000, 6, 3),
    i4: new Item(1293, 1000, 6, 3),
    i5: new Item(1294, 1000, 6, 3),
    i6: new Item(1295, 1000, 6, 3),
    i7: new Item(1296, 1000, 6, 3),
    i8: new Item(1297, 1000, 6, 3),
    i9: new Item(1298, 375, 6, 4),
    i10: new Item(1299, 375, 6, 4),
    i11: new Item(1300, 375, 6, 4),
    i12: new Item(1301, 375, 6, 4),
    i13: new Item(1302, 200, 6, 5),
    i14: new Item(1303, 200, 6, 5),
    i15: new Item(1304, 100, 6, 6),
};
cA[125].loot = {
    i1: new Item(1305, 1000, 10, 3),
    i2: new Item(1306, 1000, 4, 3),
    i3: new Item(1307, 1000, 4, 3),
    i4: new Item(1308, 1000, 10, 3),
    i5: new Item(1309, 1000, 4, 3),
    i6: new Item(1310, 1000, 10, 3),
    i7: new Item(1311, 1000, 10, 3),
    i8: new Item(1312, 1000, 4, 3),
    i9: new Item(1313, 200, 10, 4),
    i10: new Item(1314, 200, 10, 4),
    i11: new Item(1315, 200, 4, 4),
    i12: new Item(1316, 200, 10, 4),
    i13: new Item(1317, 200, 4, 4),
    i14: new Item(1318, 200, 4, 4),
    i15: new Item(1319, 200, 4, 4),
    i16: new Item(1320, 134, 4, 5),
    i17: new Item(1321, 133, 4, 5),
    i18: new Item(1322, 133, 10, 5),
    i19: new Item(1323, 100, 4, 6),
    i20: new Item(0, 100, 1),
};
cA[126].loot = {
    i1: new Item(1324, 790, 4, 3),
    i2: new Item(1325, 790, 10, 3),
    i3: new Item(1326, 790, 4, 3),
    i4: new Item(1327, 790, 10, 3),
    i5: new Item(1328, 790, 10, 3),
    i6: new Item(1329, 790, 4, 3),
    i7: new Item(1330, 790, 10, 3),
    i8: new Item(1331, 790, 10, 3),
    i9: new Item(1332, 790, 4, 3),
    i10: new Item(1333, 790, 4, 3),
    i11: new Item(1334, 250, 4, 4),
    i12: new Item(1335, 250, 4, 4),
    i13: new Item(1336, 250, 4, 4),
    i14: new Item(1337, 250, 4, 4),
    i15: new Item(1338, 250, 10, 4),
    i16: new Item(1339, 250, 4, 4),
    i17: new Item(1340, 134, 10, 5),
    i18: new Item(1341, 133, 4, 5),
    i19: new Item(1342, 133, 10, 5),
    i20: new Item(1343, 100, 10, 6),
    i21: new Item(0, 100, 1),
};
cA[127].loot = {
    i1: new Item(1344, 2000, 6, 3),
    i2: new Item(1345, 2000, 6, 3),
    i3: new Item(1346, 2000, 6, 3),
    i4: new Item(1347, 2000, 6, 3),
    i5: new Item(1348, 500, 6, 4),
    i6: new Item(1349, 500, 6, 4),
    i7: new Item(1350, 500, 6, 4),
    i8: new Item(1351, 200, 6, 5),
    i9: new Item(1352, 200, 6, 5),
    i10: new Item(1353, 100, 6, 6)
};
cA[128].loot = {
    i1: new Item(1422, 878, 4, 3), //nn
    i2: new Item(1423, 878, 4, 3), //nn
    i3: new Item(1424, 878, 10, 3), //yy
    i4: new Item(1425, 878, 4, 3), //nn
    i5: new Item(1426, 878, 4, 3), //nn
    i6: new Item(1427, 878, 4, 3), //nn
    i7: new Item(1428, 878, 10, 3), //yy
    i8: new Item(1429, 877, 10, 3), //yy
    i9: new Item(1430, 877, 10, 3), //yy
    i10: new Item(1431, 300, 4, 4), //nn
    i11: new Item(1432, 300, 10, 4), //yy
    i12: new Item(1433, 300, 4, 4), //nn
    i13: new Item(1434, 300, 4, 4), //nn
    i14: new Item(1435, 300, 4, 4), //nn
    i15: new Item(1436, 134, 4, 5), //nn
    i16: new Item(1437, 133, 10, 5), //y
    i17: new Item(1438, 133, 10, 5), //y
    i18: new Item(1439, 100, 10, 6), //y
    i19: new Item(0, 100, 1),
};
cA[129].loot = {
    i1: new Item(1440, 790, 10, 3), 
    i2: new Item(1441, 790, 4, 3), 
    i3: new Item(1442, 790, 10, 3), 
    i4: new Item(1443, 790, 4, 3), 
    i5: new Item(1444, 790, 4, 3), 
    i6: new Item(1445, 790, 10, 3), 
    i7: new Item(1446, 790, 4, 3), 
    i8: new Item(1447, 790, 10, 3), 
    i9: new Item(1448, 790, 10, 3), 
    i10: new Item(1449, 790, 4, 3), 
    i11: new Item(1450, 250, 4, 4),
    i12: new Item(1451, 250, 10, 4), 
    i13: new Item(1452, 250, 4, 4), 
    i14: new Item(1453, 250, 4, 4), 
    i15: new Item(1454, 250, 4, 4), 
    i16: new Item(1455, 250, 4, 4),
    i17: new Item(1456, 100, 4, 5),
    i18: new Item(1457, 100, 10, 5),
    i19: new Item(1458, 100, 10, 5),
    i20: new Item(1459, 100, 4, 5),
    i21: new Item(1460, 50, 10, 6),
    i22: new Item(1461, 50, 10, 6),
    i23: new Item(0, 100, 1),
};
cA[130].loot = {
    i1: new Item(776, 248, 4),
    i2: new Item(301, 248, 10),
    i3: new Item(1462, 248, 10),
    i4: new Item(225, 248, 10),
    i5: new Item(517, 248, 4),
    i6: new Item(386, 248, 4),
    i7: new Item(1355, 248, 10),
    i8: new Item(387, 248, 10),
    //Row2
    i9: new Item(226, 248, 4),
    i10: new Item(1463, 248, 4),
    i11: new Item(900, 248, 4),
    i12: new Item(521, 248, 4),
    i13: new Item(698, 248, 4),
    i14: new Item(508, 248, 4),
    i15: new Item(486, 248, 4),
    i16: new Item(361, 248, 4),
    //Row3
    i17: new Item(288, 248, 4),
    i18: new Item(448, 248, 4),
    i19: new Item(289, 248, 10),
    i20: new Item(532, 248, 4),
    i21: new Item(777, 247, 10),
    i22: new Item(666, 247, 10),
    i23: new Item(506, 247, 10),
    i24: new Item(499, 247, 4),
    //Row4
    i25: new Item(1358, 247, 10),
    i26: new Item(703, 247, 4),
    i27: new Item(778, 247, 4),
    i28: new Item(779, 247, 10),
    i29: new Item(780, 247, 4),
    i30: new Item(710, 247, 10),
    i31: new Item(704, 247, 10),
    i32: new Item(781, 247, 4),
    //Row5
    i33: new Item(331, 247, 4),
    i34: new Item(1464, 247, 4),
    i35: new Item(912, 247, 4),
    i36: new Item(714, 247, 4),
    i37: new Item(307, 247, 4),
    i38: new Item(21, 247, 10),
    i39: new Item(389, 247, 10),
    i40: new Item(172, 247, 10),
    i41: new Item(0, 100, 2)
};
cA[131].loot = {
    i1: new Item(709, 248, 4),
    i2: new Item(519, 248, 4),
    i3: new Item(287, 248, 4),
    i4: new Item(480, 248, 10),
    i5: new Item(782, 248, 4),
    i6: new Item(459, 248, 10),
    i7: new Item(921, 248, 4),
    i8: new Item(918, 248, 4),
    //Row2
    i9: new Item(509, 248, 4),
    i10: new Item(514, 248, 4),
    i11: new Item(913, 248, 10),
    i12: new Item(1368, 248, 10),
    i13: new Item(520, 248, 4),
    i14: new Item(390, 248, 10),
    i15: new Item(715, 248, 10),
    i16: new Item(292, 248, 10),
    //Row3
    i17: new Item(485, 248, 4),
    i18: new Item(1369, 248, 10),
    i19: new Item(716, 248, 4),
    i20: new Item(229, 248, 4),
    i21: new Item(518, 247, 4),
    i22: new Item(1367, 247, 10),
    i23: new Item(783, 247, 4),
    i24: new Item(713, 247, 4),
    //Row4
    i25: new Item(914, 247, 4),
    i26: new Item(488, 247, 10),
    i27: new Item(908, 247, 10),
    i28: new Item(476, 247, 4),
    i29: new Item(692, 247, 10),
    i30: new Item(358, 247, 10),
    i31: new Item(391, 247, 4),
    i32: new Item(1465, 247, 4),
    //Row5
    i33: new Item(784, 247, 10),
    i34: new Item(1360, 247, 10),
    i35: new Item(392, 247, 10),
    i36: new Item(137, 247, 10),
    i37: new Item(393, 247, 10),
    i38: new Item(475, 247, 10),
    i39: new Item(308, 247, 10),
    i40: new Item(525, 247, 10),
    i41: new Item(0, 100, 2)
};
cA[132].loot = {
    i1: new Item(550, 180, 4),
    i2: new Item(1466, 180, 4),
    i3: new Item(469, 180, 4),
    i4: new Item(1376, 180, 10),
    i5: new Item(682, 180, 4),
    i6: new Item(394, 180, 10),
    i7: new Item(549, 180, 10),
    i8: new Item(1371, 180, 10),
    //Row2
    i9: new Item(510, 180, 10),
    i10: new Item(1467, 180, 4),
    i11: new Item(343, 180, 4),
    i12: new Item(785, 180, 10),
    i13: new Item(1468, 180, 4),
    i14: new Item(489, 180, 4),
    i15: new Item(395, 180, 10),
    i16: new Item(786, 180, 10),
    //Row3
    i17: new Item(396, 180, 4),
    i18: new Item(397, 180, 10),
    i19: new Item(245, 180, 10),
    i20: new Item(787, 180, 4),
    i21: new Item(788, 180, 4),
    i22: new Item(398, 180, 4),
    i23: new Item(230, 180, 10),
    i24: new Item(496, 180, 10),
    //Row4
    i25: new Item(370, 180, 10),
    i26: new Item(296, 180, 4),
    i27: new Item(231, 180, 4),
    i28: new Item(1469, 180, 4),
    i29: new Item(1377, 180, 10),
    i30: new Item(789, 180, 4),
    i31: new Item(463, 180, 4),
    i32: new Item(399, 180, 10),
    //Row5
    i33: new Item(904, 180, 4),
    i34: new Item(5, 180, 10),
    i35: new Item(483, 180, 10),
    i36: new Item(400, 180, 10),
    i37: new Item(1470, 180, 4),
    i38: new Item(401, 180, 10),
    i39: new Item(310, 180, 4),
    i40: new Item(402, 180, 10),
    //Row6
    i41: new Item(183, 180, 10),
    i42: new Item(403, 180, 4),
    i43: new Item(404, 180, 4),
    i44: new Item(790, 180, 4),
    i45: new Item(791, 180, 10),
    i46: new Item(718, 180, 10),
    i47: new Item(527, 180, 4),
    i48: new Item(699, 180, 4),
    //Row7
    i49: new Item(705, 180, 10),
    i50: new Item(686, 180, 4),
    i51: new Item(546, 180, 4),
    i52: new Item(898, 180, 4),
    i53: new Item(1379, 180, 10),
    i54: new Item(354, 180, 4),
    i55: new Item(342, 180, 10),
    i56: new Item(0, 100, 2)
};
cA[133].loot = {
    i1: new Item(1471, 215.3, 4),
    i2: new Item(1472, 215.3, 4),
    i3: new Item(792, 215.3, 10),
    i4: new Item(309, 215.3, 4),
    i5: new Item(285, 215.3, 4),
    i6: new Item(512, 215.3, 10),
    i7: new Item(405, 215.3, 10),
    i8: new Item(406, 215.3, 4),
    //Row2
    i9: new Item(907, 215.2, 10),
    i10: new Item(407, 215.2, 10),
    i11: new Item(1386, 215.2, 10),
    i12: new Item(719, 215.2, 4),
    i13: new Item(357, 215.2, 4),
    i14: new Item(408, 215.2, 10),
    i15: new Item(461, 215.2, 4),
    i16: new Item(915, 215.2, 4),
    //Row3
    i17: new Item(901, 215.2, 4),
    i18: new Item(409, 215.2, 10),
    i19: new Item(793, 215.2, 10),
    i20: new Item(498, 215.2, 4),
    i21: new Item(477, 215.2, 4),
    i22: new Item(487, 215.2, 10),
    i23: new Item(118, 215.2, 10),
    i24: new Item(410, 215.2, 4),
    //Row4
    i25: new Item(711, 215.2, 4),
    i26: new Item(548, 215.2, 4),
    i27: new Item(721, 215.2, 4),
    i28: new Item(1473, 215.2, 4),
    i29: new Item(537, 215.2, 10),
    i30: new Item(48, 215.2, 10),
    i31: new Item(411, 215.2, 10),
    i32: new Item(794, 215.2, 10),
    //Row5
    i33: new Item(722, 215.2, 4),
    i34: new Item(1380, 215.2, 10),
    i35: new Item(412, 215.2, 4),
    i36: new Item(795, 215.2, 4),
    i37: new Item(796, 215.2, 4),
    i38: new Item(1474, 215.2, 4),
    i39: new Item(464, 215.2, 10),
    i40: new Item(413, 215.2, 10),
    //Row6
    i41: new Item(724, 215.2, 10),
    i42: new Item(492, 215.2, 10),
    i43: new Item(712, 215.2, 10),
    i44: new Item(281, 215.2, 10),
    i45: new Item(341, 215.2, 10),
    i46: new Item(507, 215.2, 4),
    i47: new Item(0, 100, 2)
};
cA[134].loot = {
    i1: new Item(284, 241.5, 4),
    i2: new Item(516, 241.5, 10),
    i3: new Item(491, 241.5, 4),
    i4: new Item(474, 241.5, 4),
    i5: new Item(725, 241.5, 10),
    i6: new Item(414, 241.5, 10),
    i7: new Item(726, 241.5, 4),
    i8: new Item(727, 241.5, 10),
    //Row2
    i9: new Item(905, 241.5, 10),
    i10: new Item(522, 241.5, 4),
    i11: new Item(728, 241.5, 4),
    i12: new Item(415, 241.5, 10),
    i13: new Item(1391, 241.5, 10),
    i14: new Item(729, 241.5, 4),
    i15: new Item(363, 241.5, 4),
    i16: new Item(468, 241.5, 4),
    //Row3
    i17: new Item(917, 241.5, 4),
    i18: new Item(481, 241.5, 10),
    i19: new Item(730, 241.5, 4),
    i20: new Item(1475, 241.5, 4),
    i21: new Item(697, 241.5, 4),
    i22: new Item(693, 241.5, 10),
    i23: new Item(131, 241.5, 10),
    i24: new Item(1392, 241.5, 10),
    //Row4
    i25: new Item(265, 241.5, 10),
    i26: new Item(731, 241.4, 4),
    i27: new Item(505, 241.4, 4),
    i28: new Item(732, 241.4, 10),
    i29: new Item(232, 241.4, 4),
    i30: new Item(916, 241.4, 4),
    i31: new Item(303, 241.4, 10),
    i32: new Item(416, 241.4, 4),
    //Row5
    i33: new Item(1476, 241.4, 4),
    i34: new Item(197, 241.4, 10),
    i35: new Item(733, 241.4, 10),
    i36: new Item(501, 241.4, 10),
    i37: new Item(417, 241.4, 10),
    i38: new Item(462, 241.4, 4),
    i39: new Item(734, 241.4, 4),
    i40: new Item(735, 241.4, 4),
    //Row6
    i41: new Item(797, 241.5, 4),
    i42: new Item(0, 100, 2)
};
cA[135].loot = {
    i1: new Item(736, 235.8, 4),
    i2: new Item(366, 235.8, 10),
    i3: new Item(1394, 235.8, 10),
    i4: new Item(672, 235.8, 4),
    i5: new Item(798, 235.8, 10),
    i6: new Item(418, 235.8, 10),
    i7: new Item(708, 235.7, 4),
    i8: new Item(473, 235.7, 4),
    //Row2
    i9: new Item(799, 235.7, 4),
    i10: new Item(737, 235.7, 4),
    i11: new Item(800, 235.7, 4),
    i12: new Item(1393, 235.7, 10),
    i13: new Item(700, 235.7, 4),
    i14: new Item(513, 235.7, 4),
    i15: new Item(533, 235.7, 4),
    i16: new Item(293, 235.7, 4),
    //Row3
    i17: new Item(899, 235.7, 4),
    i18: new Item(801, 235.7, 4),
    i19: new Item(802, 235.7, 4),
    i20: new Item(803, 235.7, 4),
    i21: new Item(467, 235.7, 10),
    i22: new Item(804, 235.7, 10),
    i23: new Item(1396, 235.7, 4),
    i24: new Item(420, 235.7, 10),
    //Row4
    i25: new Item(304, 235.7, 4),
    i26: new Item(458, 235.7, 4),
    i27: new Item(143, 235.7, 10),
    i28: new Item(35, 235.7, 10),
    i29: new Item(738, 235.7, 4),
    i30: new Item(903, 235.7, 4),
    i31: new Item(233, 235.7, 4),
    i32: new Item(421, 235.7, 4),
    //Row5
    i33: new Item(1477, 235.7, 4),
    i34: new Item(1478, 235.7, 10),
    i35: new Item(964, 235.7, 10),
    i36: new Item(422, 235.7, 10),
    i37: new Item(423, 235.7, 10),
    i38: new Item(805, 235.7, 4),
    i39: new Item(523, 235.7, 4),
    i40: new Item(739, 235.7, 10),
    //Row6
    i41: new Item(740, 235.7, 4),
    i42: new Item(1397, 235.7, 10),
    i43: new Item(0, 100, 2)
};
cA[136].loot = { // Medic
    i1: new Item(545, 206.25, 4),
    i2: new Item(690, 206.25, 4),
    i3: new Item(1479, 206.25, 4),
    i4: new Item(524, 206.25, 10),
    i5: new Item(424, 206.25, 4),
    i6: new Item(806, 206.25, 4),
    i7: new Item(741, 206.25, 4),
    i8: new Item(1480, 206.25, 4),
    //Row2
    i9: new Item(515, 206.25, 4),
    i10: new Item(478, 206.25, 4),
    i11: new Item(465, 206.25, 10),
    i12: new Item(482, 206.25, 10),
    i13: new Item(504, 206.25, 10),
    i14: new Item(497, 206.25, 4),
    i15: new Item(526, 206.25, 10),
    i16: new Item(490, 206.25, 10),
    //Row3
    i17: new Item(356, 206.25, 4),
    i18: new Item(360, 206.25, 4),
    i19: new Item(742, 206.25, 4),
    i20: new Item(743, 206.25, 4),
    i21: new Item(744, 206.25, 4),
    i22: new Item(290, 206.25, 10),
    i23: new Item(425, 206.25, 10),
    i24: new Item(745, 206.25, 4),
    //Row4
    i25: new Item(746, 206.25, 10),
    i26: new Item(696, 206.25, 10),
    i27: new Item(426, 206.25, 4),
    i28: new Item(306, 206.25, 4),
    i29: new Item(551, 206.25, 4),
    i30: new Item(807, 206.25, 4),
    i31: new Item(1481, 206.25, 4),
    i32: new Item(689, 206.25, 10),
    //Row5
    i33: new Item(188, 206.25, 10),
    i34: new Item(427, 206.25, 10),
    i35: new Item(428, 206.25, 4),
    i36: new Item(701, 206.25, 4),
    i37: new Item(553, 206.25, 10),
    i38: new Item(748, 206.25, 4),
    i39: new Item(429, 206.25, 4),
    i40: new Item(371, 206.25, 4),
    //Row6
    i41: new Item(316, 206.25, 10),
    i42: new Item(1482, 206.25, 4),
    i43: new Item(749, 206.25, 10),
    i44: new Item(430, 206.25, 10),
    i45: new Item(123, 206.25, 10),
    i46: new Item(431, 206.25, 10),
    i47: new Item(542, 206.25, 4),
    i48: new Item(808, 206.25, 4),
    i49: new Item(0, 100, 2)
};
cA[137].loot = { // Sniper
    i1: new Item(1498, 319.36, 4),
    i2: new Item(500, 319.36, 4),
    i3: new Item(538, 319.36, 10),
    i4: new Item(536, 319.36, 4),
    i5: new Item(493, 319.36, 4),
    i6: new Item(359, 319.36, 10),
    i7: new Item(259, 319.36, 4),
    i8: new Item(706, 319.36, 4),
    //Row2
    i9: new Item(511, 319.36, 4),
    i10: new Item(695, 319.36, 4),
    i11: new Item(1407, 319.36, 10),
    i12: new Item(702, 319.36, 4),
    i13: new Item(751, 319.36, 4),
    i14: new Item(302, 319.36, 4),
    i15: new Item(432, 319.36, 10),
    i16: new Item(539, 319.35, 4),
    //Row3
    i17: new Item(294, 319.35, 10),
    i18: new Item(1402, 319.35, 4),
    i19: new Item(234, 319.35, 4),
    i20: new Item(134, 319.35, 10),
    i21: new Item(1483, 319.35, 10),
    i22: new Item(809, 319.35, 4),
    i23: new Item(135, 319.35, 10),
    i24: new Item(433, 319.35, 10),
    //Row4
    i25: new Item(323, 319.35, 4),
    i26: new Item(688, 319.35, 4),
    i27: new Item(434, 319.35, 10),
    i28: new Item(1406, 319.35, 10),
    i29: new Item(810, 319.35, 4),
    i30: new Item(472, 319.35, 10),
    i31: new Item(1405, 319.35, 10),
    i32: new Item(0, 100, 2)
};
cA[138].loot = { // Spy
    i1: new Item(495, 366.6, 4),
    i2: new Item(811, 366.6, 4),
    i3: new Item(812, 366.6, 10),
    i4: new Item(136, 366.6, 10),
    i5: new Item(753, 366.6, 4),
    i6: new Item(435, 366.6, 10),
    i7: new Item(479, 366.6, 10),
    i8: new Item(466, 366.6, 4),
    //Row2
    i9: new Item(436, 366.6, 10),
    i10: new Item(286, 366.7, 4),
    i11: new Item(1484, 366.7, 4),
    i12: new Item(375, 366.7, 10),
    i13: new Item(355, 366.7, 4),
    i14: new Item(540, 366.7, 4),
    i15: new Item(503, 366.7, 10),
    i16: new Item(305, 366.7, 10),
    //Row3
    i17: new Item(541, 366.7, 10),
    i18: new Item(1413, 366.7, 10),
    i19: new Item(437, 366.7, 4),
    i20: new Item(754, 366.7, 10),
    i21: new Item(460, 366.7, 10),
    i22: new Item(484, 366.7, 4),
    i23: new Item(813, 366.7, 4),
    i24: new Item(326, 366.7, 4),
    //Row4
    i25: new Item(814, 366.7, 4),
    i26: new Item(1485, 366.7, 4),
    i27: new Item(1486, 366.7, 4),
    i28: new Item(0, 100, 2)
};
cA[139].loot = { // Allclass
    i1: new Item(227, 122.21, 4),
    i2: new Item(1420, 122.21, 4),
    i3: new Item(295, 122.21, 4),
    i4: new Item(442, 122.21, 4),
    i5: new Item(543, 122.21, 4),
    i6: new Item(329, 122.21, 4),
    i7: new Item(388, 122.21, 10),
    i8: new Item(906, 122.21, 10),
    //Row2
    i9: new Item(456, 122.21, 4),
    i10: new Item(454, 122.21, 10),
    i11: new Item(235, 122.21, 10),
    i12: new Item(816, 122.21, 4),
    i13: new Item(1487, 122.21, 4),
    i14: new Item(1488, 122.21, 4),
    i15: new Item(902, 122.21, 10),
    i16: new Item(552, 122.21, 10),
    //Row3
    i17: new Item(327, 122.21, 10),
    i18: new Item(544, 122.21, 4),
    i19: new Item(717, 122.21, 4),
    i20: new Item(720, 122.21, 10),
    i21: new Item(687, 122.21, 4),
    i22: new Item(755, 122.21, 10),
    i23: new Item(684, 122.21, 4),
    i24: new Item(1489, 122.21, 4),
    //Row4
    i25: new Item(419, 122.21, 4),
    i26: new Item(328, 122.21, 10),
    i27: new Item(340, 122.21, 4),
    i28: new Item(817, 122.21, 4),
    i29: new Item(471, 122.21, 10),
    i30: new Item(1490, 122.21, 4),
    i31: new Item(911, 122.21, 4),
    i32: new Item(554, 122.21, 4),
    //Row5
    i33: new Item(438, 122.21, 10),
    i34: new Item(494, 122.21, 4),
    i35: new Item(275, 122.21, 10),
    i36: new Item(291, 122.21, 4),
    i37: new Item(547, 122.21, 10),
    i38: new Item(1418, 122.21, 10),
    i39: new Item(1419, 122.21, 10),
    i40: new Item(1491, 122.21, 4),
    //Row6
    i41: new Item(1417, 122.21, 10),
    i42: new Item(691, 122.21, 10),
    i43: new Item(756, 122.21, 10),
    i44: new Item(502, 122.21, 4),
    i45: new Item(1492, 122.21, 4),
    i46: new Item(815, 122.21, 10),
    i47: new Item(365, 122.21, 4),
    i48: new Item(439, 122.21, 10),
    //Row7
    i49: new Item(383, 122.21, 10),
    i50: new Item(747, 122.21, 4),
    i51: new Item(364, 122.21, 4),
    i52: new Item(685, 122.21, 10),
    i53: new Item(1414, 122.21, 10),
    i54: new Item(440, 122.21, 10),
    i55: new Item(228, 122.21, 4),
    i56: new Item(1493, 122.21, 4),
    //Row8
    i57: new Item(707, 122.21, 10),
    i58: new Item(457, 122.21, 10),
    i59: new Item(1494, 122.21, 4),
    i60: new Item(325, 122.21, 4),
    i61: new Item(250, 122.21, 10),
    i62: new Item(910, 122.21, 4),
    i63: new Item(723, 122.21, 4),
    i64: new Item(535, 122.21, 4),
    //Row9
    i65: new Item(332, 122.21, 4),
    i66: new Item(683, 122.21, 4),
    i67: new Item(1495, 122.21, 4),
    i68: new Item(818, 122.21, 10),
    i69: new Item(752, 122.21, 4),
    i70: new Item(362, 122.21, 10),
    i71: new Item(1415, 122.21, 10),
    i72: new Item(441, 122.21, 10),
    //Row10
    i73: new Item(694, 122.21, 10),
    i74: new Item(1496, 122.21, 4),
    i75: new Item(1497, 122.21, 4),
    i76: new Item(531, 122.21, 4),
    i77: new Item(470, 122.21, 4),
    i78: new Item(819, 122.21, 10),
    i79: new Item(534, 122.21, 4),
    i80: new Item(455, 122.21, 10),
    //Row11
    i81: new Item(909, 122.2, 10),
    i82: new Item(0, 100, 2)
};
cA[140].loot = { //
    i1: new Item(1499, 790, 4, 3),
    i2: new Item(1500, 790, 4, 3),
    i3: new Item(1501, 790, 4, 3),
    i4: new Item(1502, 790, 4, 3),
    i5: new Item(1503, 790, 4, 3),
    i6: new Item(1504, 790, 4, 3), //
    i7: new Item(1505, 790, 10, 3),
    i8: new Item(1506, 790, 10, 3),
    i9: new Item(1507, 790, 10, 3),
    i10: new Item(1508, 790, 4, 3),
    i11: new Item(1509, 250, 10, 4),
    i12: new Item(1510, 250, 10, 4),
    i13: new Item(1511, 250, 4, 4),
    i14: new Item(1512, 250, 10, 4), //
    i15: new Item(1513, 250, 4, 4),
    i16: new Item(1514, 250, 4, 4),
    i17: new Item(1515, 100, 4, 5),
    i18: new Item(1516, 100, 4, 5),
    i19: new Item(1517, 100, 4, 5),
    i20: new Item(1518, 100, 10, 5),
    i21: new Item(1519, 50, 4, 6),
    i22: new Item(1520, 50, 10, 6),
    i23: new Item(0, 100, 1),
};
cA[141].loot = { // xmas 2019 cosmetics
    i1: new Item(1521, 878, 4, 3),
    i2: new Item(1522, 878, 10, 3),
    i3: new Item(1523, 878, 10, 3),
    i4: new Item(1524, 878, 4, 3),
    i5: new Item(1525, 878, 10, 3),
    i6: new Item(1526, 878, 4, 3), //
    i7: new Item(1527, 878, 10, 3),
    i8: new Item(1528, 878, 10, 3),
    i9: new Item(1529, 877, 4, 3),
    i10: new Item(1530, 300, 4, 4),
    i11: new Item(1531, 300, 10, 4),
    i12: new Item(1532, 300, 10, 4),
    i13: new Item(1533, 300, 10, 4),
    i14: new Item(1534, 300, 4, 4), //
    i15: new Item(1535, 133, 4, 5),
    i16: new Item(1536, 133, 10, 5),
    i17: new Item(1537, 133, 10, 5),
    i18: new Item(1538, 100, 10, 6),
    i19: new Item(0, 100, 1),
};
cA[142].loot = { // xmas 2019 weapons
    i1: new Item(1539, 2000, 6, 3),
    i2: new Item(1540, 2000, 6, 3),
    i3: new Item(1541, 2000, 6, 3),
    i4: new Item(1542, 2000, 6, 3),
    i5: new Item(1543, 500, 6, 4),
    i6: new Item(1544, 500, 6, 4),
    i7: new Item(1545, 500, 6, 4),
    i8: new Item(1546, 200, 6, 5),
    i9: new Item(1547, 200, 6, 5),
    i10: new Item(1548, 100, 6, 6)
};