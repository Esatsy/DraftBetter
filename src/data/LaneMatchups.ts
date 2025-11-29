/**
 * LANE MATCHUP VERİTABANI
 * 
 * Her rol için detaylı matchup verileri
 * Format: CounterPicker[VictimChampion] = CounterChampions[]
 * 
 * Veri kaynağı: High elo, pro play, community
 */

import { CounterData } from '../types'

// ==========================================
// TOP LANE MATCHUP'LAR
// ==========================================

export const TOP_LANE_MATCHUPS: Record<number, CounterData[]> = {
  // Darius (122) - Bunlar Darius'u counter'lıyor
  122: [
    { championId: 85, championName: 'Kennen', reason: 'Range + stun + kite', counterScore: 85 },
    { championId: 150, championName: 'Gnar', reason: 'Range + kite + Mega R', counterScore: 80 },
    { championId: 133, championName: 'Quinn', reason: 'Blind + range + vault', counterScore: 90 },
    { championId: 17, championName: 'Teemo', reason: 'Blind = no passive stack', counterScore: 85 },
    { championId: 74, championName: 'Heimerdinger', reason: 'Turret zone control', counterScore: 80 },
    { championId: 8, championName: 'Vladimir', reason: 'Pool + sustain + scale', counterScore: 75 },
    { championId: 69, championName: 'Cassiopeia', reason: 'Kite + grounded', counterScore: 80 },
    { championId: 518, championName: 'Neeko', reason: 'Range + CC + disengage', counterScore: 75 },
  ],
  
  // Garen (86)
  86: [
    { championId: 67, championName: 'Vayne', reason: 'True damage + kite', counterScore: 90 },
    { championId: 8, championName: 'Vladimir', reason: 'Pool ulti dodge + sustain', counterScore: 85 },
    { championId: 17, championName: 'Teemo', reason: 'Blind + poke + kite', counterScore: 85 },
    { championId: 85, championName: 'Kennen', reason: 'Range + stun', counterScore: 80 },
    { championId: 74, championName: 'Heimerdinger', reason: 'Turret + poke', counterScore: 80 },
    { championId: 69, championName: 'Cassiopeia', reason: 'Kite + grounded', counterScore: 80 },
    { championId: 518, championName: 'Neeko', reason: 'Range + CC', counterScore: 75 },
    { championId: 240, championName: 'Kled', reason: 'All-in + sustain + dismount', counterScore: 70 },
  ],
  
  // Fiora (114)
  114: [
    { championId: 78, championName: 'Poppy', reason: 'W blocks lunge + riposte', counterScore: 90 },
    { championId: 54, championName: 'Malphite', reason: 'AS slow + armor', counterScore: 85 },
    { championId: 58, championName: 'Renekton', reason: 'Point-click stun early', counterScore: 80 },
    { championId: 80, championName: 'Pantheon', reason: 'Point-click stun + shield', counterScore: 80 },
    { championId: 240, championName: 'Kled', reason: 'All-in + sustain + dismount', counterScore: 75 },
    { championId: 122, championName: 'Darius', reason: 'Erken oyun baskısı', counterScore: 70 },
  ],
  
  // Camille (164)
  164: [
    { championId: 24, championName: 'Jax', reason: 'Counter Strike + scaling', counterScore: 85 },
    { championId: 58, championName: 'Renekton', reason: 'Point-click stun + sustain', counterScore: 80 },
    { championId: 122, championName: 'Darius', reason: 'Erken oyun baskısı', counterScore: 75 },
    { championId: 78, championName: 'Poppy', reason: 'W blocks E', counterScore: 80 },
    { championId: 80, championName: 'Pantheon', reason: 'Point-click stun', counterScore: 75 },
  ],
  
  // Jax (24)
  24: [
    { championId: 54, championName: 'Malphite', reason: 'AS slow + armor stack', counterScore: 85 },
    { championId: 58, championName: 'Renekton', reason: 'Point-click stun + burst', counterScore: 75 },
    { championId: 80, championName: 'Pantheon', reason: 'Early game dominant', counterScore: 75 },
    { championId: 85, championName: 'Kennen', reason: 'Range + stun', counterScore: 70 },
    { championId: 3, championName: 'Galio', reason: 'Magic + CC', counterScore: 70 },
  ],
  
  // Riven (92)
  92: [
    { championId: 54, championName: 'Malphite', reason: 'Armor + AS slow = useless', counterScore: 90 },
    { championId: 78, championName: 'Poppy', reason: 'W blocks all dashes', counterScore: 90 },
    { championId: 58, championName: 'Renekton', reason: 'Point-click stun + sustain', counterScore: 85 },
    { championId: 80, championName: 'Pantheon', reason: 'Point-click stun + shield', counterScore: 80 },
    { championId: 133, championName: 'Quinn', reason: 'Blind + vault + kite', counterScore: 80 },
  ],
  
  // Irelia (39)
  39: [
    { championId: 54, championName: 'Malphite', reason: 'AS slow destroys Irelia', counterScore: 90 },
    { championId: 58, championName: 'Renekton', reason: 'Point-click stun', counterScore: 80 },
    { championId: 106, championName: 'Volibear', reason: 'Tank + damage + disable', counterScore: 80 },
    { championId: 122, championName: 'Darius', reason: 'Erken baskı + sustain', counterScore: 75 },
    { championId: 24, championName: 'Jax', reason: 'Counter Strike', counterScore: 75 },
  ],
  
  // Sett (875)
  875: [
    { championId: 67, championName: 'Vayne', reason: 'Kite + true damage', counterScore: 85 },
    { championId: 69, championName: 'Cassiopeia', reason: 'Kite + grounded', counterScore: 80 },
    { championId: 8, championName: 'Vladimir', reason: 'Pool W dodge + scale', counterScore: 80 },
    { championId: 85, championName: 'Kennen', reason: 'Range + stun', counterScore: 75 },
    { championId: 240, championName: 'Kled', reason: 'Dismount + all-in', counterScore: 75 },
  ],
  
  // Mordekaiser (82)
  82: [
    { championId: 114, championName: 'Fiora', reason: 'Riposte ulti = Morde ölü', counterScore: 95 },
    { championId: 24, championName: 'Jax', reason: 'Scaling + outplay', counterScore: 80 },
    { championId: 67, championName: 'Vayne', reason: 'Kite + true damage', counterScore: 85 },
    { championId: 8, championName: 'Vladimir', reason: 'Pool + scale', counterScore: 75 },
    { championId: 518, championName: 'Neeko', reason: 'Range + clone', counterScore: 70 },
  ],
  
  // Aatrox (266)
  266: [
    { championId: 114, championName: 'Fiora', reason: 'Riposte W = no healing', counterScore: 85 },
    { championId: 24, championName: 'Jax', reason: 'Counter Strike + scaling', counterScore: 80 },
    { championId: 240, championName: 'Kled', reason: 'Grievous + all-in', counterScore: 80 },
    { championId: 122, championName: 'Darius', reason: 'Sustain fight + ghost', counterScore: 75 },
    { championId: 69, championName: 'Cassiopeia', reason: 'Kite + grounded', counterScore: 75 },
  ],
  
  // Ornn (516)
  516: [
    { championId: 67, championName: 'Vayne', reason: 'True damage vs tank', counterScore: 85 },
    { championId: 114, championName: 'Fiora', reason: 'True damage + vital proc', counterScore: 85 },
    { championId: 8, championName: 'Vladimir', reason: 'Magic + sustain + scale', counterScore: 75 },
    { championId: 69, championName: 'Cassiopeia', reason: 'Magic + kite', counterScore: 70 },
  ],
  
  // Shen (98)
  98: [
    { championId: 54, championName: 'Malphite', reason: 'Armor + poke', counterScore: 75 },
    { championId: 8, championName: 'Vladimir', reason: 'Magic + pool', counterScore: 70 },
    { championId: 69, championName: 'Cassiopeia', reason: 'Magic + kite', counterScore: 70 },
    { championId: 17, championName: 'Teemo', reason: 'Blind + poke', counterScore: 70 },
  ],
};

// ==========================================
// MID LANE MATCHUP'LAR
// ==========================================

export const MID_LANE_MATCHUPS: Record<number, CounterData[]> = {
  // Yasuo (157)
  157: [
    { championId: 80, championName: 'Pantheon', reason: 'Point-click stun spam', counterScore: 90 },
    { championId: 58, championName: 'Renekton', reason: 'Point-click stun + burst', counterScore: 90 },
    { championId: 90, championName: 'Malzahar', reason: 'Suppress = dead Yasuo', counterScore: 85 },
    { championId: 127, championName: 'Lissandra', reason: 'Point-click CC + burst', counterScore: 85 },
    { championId: 54, championName: 'Malphite', reason: 'Armor + poke + R', counterScore: 80 },
    { championId: 3, championName: 'Galio', reason: 'Magic shield + taunt', counterScore: 75 },
    { championId: 33, championName: 'Rammus', reason: 'Taunt + armor', counterScore: 80 },
    { championId: 1, championName: 'Annie', reason: 'Point-click stun + burst', counterScore: 75 },
  ],
  
  // Yone (777)
  777: [
    { championId: 80, championName: 'Pantheon', reason: 'Point-click stun + shield', counterScore: 90 },
    { championId: 58, championName: 'Renekton', reason: 'Point-click stun + sustain', counterScore: 85 },
    { championId: 127, championName: 'Lissandra', reason: 'CC chain + aftershock', counterScore: 85 },
    { championId: 90, championName: 'Malzahar', reason: 'Suppress during E', counterScore: 85 },
    { championId: 1, championName: 'Annie', reason: 'Point-click stun', counterScore: 80 },
    { championId: 54, championName: 'Malphite', reason: 'Armor + AS slow', counterScore: 80 },
  ],
  
  // Zed (238)
  238: [
    { championId: 127, championName: 'Lissandra', reason: 'Self ulti + burst', counterScore: 95 },
    { championId: 90, championName: 'Malzahar', reason: 'Suppress + shield', counterScore: 90 },
    { championId: 3, championName: 'Galio', reason: 'Magic shield + taunt', counterScore: 85 },
    { championId: 54, championName: 'Malphite', reason: 'Full armor + poke', counterScore: 80 },
    { championId: 80, championName: 'Pantheon', reason: 'Point-click stun + aegis', counterScore: 80 },
    { championId: 58, championName: 'Renekton', reason: 'Point-click stun + tankiness', counterScore: 75 },
  ],
  
  // Katarina (55)
  55: [
    { championId: 127, championName: 'Lissandra', reason: 'Root ulti kesme', counterScore: 90 },
    { championId: 90, championName: 'Malzahar', reason: 'Silence + suppress', counterScore: 90 },
    { championId: 3, championName: 'Galio', reason: 'Taunt ulti kesme + tank', counterScore: 85 },
    { championId: 1, championName: 'Annie', reason: 'Point-click stun', counterScore: 85 },
    { championId: 80, championName: 'Pantheon', reason: 'Point-click stun', counterScore: 80 },
    { championId: 131, championName: 'Diana', reason: 'Shield + burst', counterScore: 75 },
  ],
  
  // LeBlanc (7)
  7: [
    { championId: 90, championName: 'Malzahar', reason: 'Suppress + shield', counterScore: 90 },
    { championId: 127, championName: 'Lissandra', reason: 'Point-click CC', counterScore: 85 },
    { championId: 3, championName: 'Galio', reason: 'Magic shield + CC', counterScore: 85 },
    { championId: 38, championName: 'Kassadin', reason: 'Magic shield + scaling', counterScore: 80 },
    { championId: 131, championName: 'Diana', reason: 'Shield + all-in', counterScore: 75 },
  ],
  
  // Akali (84)
  84: [
    { championId: 90, championName: 'Malzahar', reason: 'Suppress ignores shroud', counterScore: 95 },
    { championId: 127, championName: 'Lissandra', reason: 'Point-click CC + reveal', counterScore: 90 },
    { championId: 3, championName: 'Galio', reason: 'Tank + taunt + magic resist', counterScore: 85 },
    { championId: 58, championName: 'Renekton', reason: 'Point-click stun + sustain', counterScore: 85 },
    { championId: 80, championName: 'Pantheon', reason: 'Point-click stun', counterScore: 80 },
  ],
  
  // Fizz (105)
  105: [
    { championId: 127, championName: 'Lissandra', reason: 'CC + burst + aftershock', counterScore: 85 },
    { championId: 90, championName: 'Malzahar', reason: 'Suppress + shield', counterScore: 85 },
    { championId: 3, championName: 'Galio', reason: 'Magic shield + CC', counterScore: 80 },
    { championId: 1, championName: 'Annie', reason: 'Point-click stun', counterScore: 75 },
    { championId: 91, championName: 'Talon', reason: 'Early all-in', counterScore: 70 },
  ],
  
  // Ahri (103)
  103: [
    { championId: 90, championName: 'Malzahar', reason: 'Suppress + shield', counterScore: 80 },
    { championId: 238, championName: 'Zed', reason: 'Dodge charm + burst', counterScore: 75 },
    { championId: 84, championName: 'Akali', reason: 'Shroud + burst', counterScore: 75 },
    { championId: 91, championName: 'Talon', reason: 'All-in + roam', counterScore: 70 },
  ],
  
  // Syndra (134)
  134: [
    { championId: 105, championName: 'Fizz', reason: 'E dodge + all-in', counterScore: 80 },
    { championId: 238, championName: 'Zed', reason: 'Dodge + all-in', counterScore: 80 },
    { championId: 84, championName: 'Akali', reason: 'Shroud + all-in', counterScore: 75 },
    { championId: 7, championName: 'LeBlanc', reason: 'Mobility + burst', counterScore: 75 },
  ],
  
  // Viktor (112)
  112: [
    { championId: 238, championName: 'Zed', reason: 'Dodge + all-in', counterScore: 80 },
    { championId: 105, championName: 'Fizz', reason: 'E dodge + burst', counterScore: 80 },
    { championId: 84, championName: 'Akali', reason: 'Gap close + shroud', counterScore: 75 },
    { championId: 91, championName: 'Talon', reason: 'All-in', counterScore: 75 },
  ],
  
  // Orianna (61)
  61: [
    { championId: 238, championName: 'Zed', reason: 'All-in + dodge', counterScore: 80 },
    { championId: 105, championName: 'Fizz', reason: 'E dodge + burst', counterScore: 80 },
    { championId: 91, championName: 'Talon', reason: 'All-in + roam', counterScore: 75 },
    { championId: 84, championName: 'Akali', reason: 'Gap close', counterScore: 75 },
  ],
  
  // Veigar (45)
  45: [
    { championId: 238, championName: 'Zed', reason: 'Dodge cage + burst', counterScore: 85 },
    { championId: 105, championName: 'Fizz', reason: 'E dodge cage + burst', counterScore: 85 },
    { championId: 81, championName: 'Ezreal', reason: 'E dodge + poke', counterScore: 80 },
    { championId: 7, championName: 'LeBlanc', reason: 'Mobility + early pressure', counterScore: 80 },
  ],
};

// ==========================================
// BOT LANE MATCHUP'LAR (ADC)
// ==========================================

export const BOT_LANE_ADC_MATCHUPS: Record<number, CounterData[]> = {
  // Jinx (222)
  222: [
    { championId: 119, championName: 'Draven', reason: 'Early game dominant', counterScore: 85 },
    { championId: 236, championName: 'Lucian', reason: 'Lane bully', counterScore: 80 },
    { championId: 51, championName: 'Caitlyn', reason: 'Range + trap pressure', counterScore: 75 },
    { championId: 145, championName: 'Kaisa', reason: 'Dive + burst', counterScore: 75 },
  ],
  
  // Draven (119)
  119: [
    { championId: 51, championName: 'Caitlyn', reason: 'Range + trap', counterScore: 75 },
    { championId: 202, championName: 'Jhin', reason: 'Safe + CC + burst', counterScore: 70 },
    { championId: 110, championName: 'Varus', reason: 'Poke + CC', counterScore: 70 },
    { championId: 15, championName: 'Sivir', reason: 'Spell shield + wave clear', counterScore: 65 },
  ],
  
  // Vayne (67)
  67: [
    { championId: 119, championName: 'Draven', reason: 'Early game pressure', counterScore: 90 },
    { championId: 236, championName: 'Lucian', reason: 'Early burst', counterScore: 85 },
    { championId: 51, championName: 'Caitlyn', reason: 'Range bully', counterScore: 85 },
    { championId: 21, championName: 'MissFortune', reason: 'Lane pressure + poke', counterScore: 80 },
  ],
  
  // Kai'Sa (145)
  145: [
    { championId: 51, championName: 'Caitlyn', reason: 'Range + trap', counterScore: 75 },
    { championId: 119, championName: 'Draven', reason: 'Early pressure', counterScore: 75 },
    { championId: 15, championName: 'Sivir', reason: 'Spell shield + wave clear', counterScore: 70 },
  ],
  
  // Ezreal (81)
  81: [
    { championId: 119, championName: 'Draven', reason: 'All-in > poke', counterScore: 80 },
    { championId: 236, championName: 'Lucian', reason: 'Lane dominant', counterScore: 75 },
    { championId: 145, championName: 'Kaisa', reason: 'All-in + scale', counterScore: 70 },
  ],
  
  // Caitlyn (51)
  51: [
    { championId: 236, championName: 'Lucian', reason: 'Dash + burst', counterScore: 75 },
    { championId: 145, championName: 'Kaisa', reason: 'All-in + W shield break', counterScore: 70 },
    { championId: 18, championName: 'Tristana', reason: 'All-in + scale', counterScore: 70 },
  ],
  
  // Lucian (236)
  236: [
    { championId: 67, championName: 'Vayne', reason: 'Scale + 1v1', counterScore: 75 },
    { championId: 222, championName: 'Jinx', reason: 'Scale + teamfight', counterScore: 70 },
    { championId: 96, championName: 'KogMaw', reason: 'Scale', counterScore: 70 },
  ],
  
  // Aphelios (523)
  523: [
    { championId: 119, championName: 'Draven', reason: 'Early aggression', counterScore: 80 },
    { championId: 236, championName: 'Lucian', reason: 'Early game', counterScore: 75 },
    { championId: 51, championName: 'Caitlyn', reason: 'Range + early', counterScore: 75 },
  ],
  
  // Kog'Maw (96)
  96: [
    { championId: 119, championName: 'Draven', reason: 'Early aggression', counterScore: 90 },
    { championId: 236, championName: 'Lucian', reason: 'Lane dominant', counterScore: 85 },
    { championId: 145, championName: 'Kaisa', reason: 'Dive + burst', counterScore: 80 },
    { championId: 51, championName: 'Caitlyn', reason: 'Range + pressure', counterScore: 75 },
  ],
};

// ==========================================
// SUPPORT MATCHUP'LAR
// ==========================================

export const SUPPORT_MATCHUPS: Record<number, CounterData[]> = {
  // Leona (89)
  89: [
    { championId: 25, championName: 'Morgana', reason: 'Black Shield = no engage', counterScore: 95 },
    { championId: 40, championName: 'Janna', reason: 'Disengage ulti', counterScore: 85 },
    { championId: 117, championName: 'Lulu', reason: 'Polymorph + shield', counterScore: 80 },
    { championId: 37, championName: 'Sona', reason: 'Poke + sustain', counterScore: 75 },
    { championId: 350, championName: 'Yuumi', reason: 'Untargetable', counterScore: 70 },
  ],
  
  // Nautilus (111)
  111: [
    { championId: 25, championName: 'Morgana', reason: 'Black Shield', counterScore: 95 },
    { championId: 40, championName: 'Janna', reason: 'Disengage', counterScore: 80 },
    { championId: 37, championName: 'Sona', reason: 'Poke + sustain', counterScore: 75 },
  ],
  
  // Thresh (412)
  412: [
    { championId: 25, championName: 'Morgana', reason: 'Black Shield', counterScore: 90 },
    { championId: 40, championName: 'Janna', reason: 'Disengage', counterScore: 80 },
    { championId: 89, championName: 'Leona', reason: 'All-in > hook', counterScore: 70 },
  ],
  
  // Blitzcrank (53)
  53: [
    { championId: 25, championName: 'Morgana', reason: 'Black Shield hook', counterScore: 100 },
    { championId: 14, championName: 'Sion', reason: 'Hook = engage for Sion', counterScore: 75 },
    { championId: 89, championName: 'Leona', reason: 'Engage > hook', counterScore: 75 },
    { championId: 350, championName: 'Yuumi', reason: 'Untargetable', counterScore: 70 },
  ],
  
  // Lulu (117)
  117: [
    { championId: 89, championName: 'Leona', reason: 'Hard engage > peel', counterScore: 80 },
    { championId: 111, championName: 'Nautilus', reason: 'Hard engage', counterScore: 80 },
    { championId: 555, championName: 'Pyke', reason: 'Execute > shield', counterScore: 75 },
  ],
  
  // Janna (40)
  40: [
    { championId: 555, championName: 'Pyke', reason: 'Execute + mobility', counterScore: 80 },
    { championId: 89, championName: 'Leona', reason: 'Multiple engage', counterScore: 75 },
    { championId: 53, championName: 'Blitzcrank', reason: 'Hook pressure', counterScore: 70 },
  ],
  
  // Nami (267)
  267: [
    { championId: 89, championName: 'Leona', reason: 'Hard engage', counterScore: 80 },
    { championId: 111, championName: 'Nautilus', reason: 'Hard engage', counterScore: 80 },
    { championId: 555, championName: 'Pyke', reason: 'Kill pressure', counterScore: 75 },
  ],
  
  // Soraka (16)
  16: [
    { championId: 89, championName: 'Leona', reason: 'Hard engage + burst', counterScore: 90 },
    { championId: 111, championName: 'Nautilus', reason: 'Hard engage', counterScore: 90 },
    { championId: 53, championName: 'Blitzcrank', reason: 'Hook = dead Soraka', counterScore: 90 },
    { championId: 555, championName: 'Pyke', reason: 'Execute through heal', counterScore: 85 },
  ],
  
  // Yuumi (350)
  350: [
    { championId: 89, championName: 'Leona', reason: 'Hard engage = Yuumi detach', counterScore: 85 },
    { championId: 111, championName: 'Nautilus', reason: 'Hard engage', counterScore: 85 },
    { championId: 555, championName: 'Pyke', reason: 'Kill lane', counterScore: 80 },
  ],
  
  // Morgana (25)
  25: [
    { championId: 37, championName: 'Sona', reason: 'Poke + sustain', counterScore: 75 },
    { championId: 350, championName: 'Yuumi', reason: 'Poke + untargetable', counterScore: 70 },
    { championId: 117, championName: 'Lulu', reason: 'Poke + harass', counterScore: 70 },
  ],
  
  // Pyke (555)
  555: [
    { championId: 25, championName: 'Morgana', reason: 'Black Shield', counterScore: 85 },
    { championId: 40, championName: 'Janna', reason: 'Disengage', counterScore: 75 },
    { championId: 89, championName: 'Leona', reason: 'Tank > assassin', counterScore: 70 },
  ],
};

// ==========================================
// JUNGLE MATCHUP'LAR
// ==========================================

export const JUNGLE_MATCHUPS: Record<number, CounterData[]> = {
  // Lee Sin (64)
  64: [
    { championId: 33, championName: 'Rammus', reason: 'Taunt + armor', counterScore: 85 },
    { championId: 154, championName: 'Zac', reason: 'Tank + sustain', counterScore: 75 },
    { championId: 32, championName: 'Amumu', reason: 'Tank + CC', counterScore: 70 },
    { championId: 113, championName: 'Sejuani', reason: 'Tank + CC', counterScore: 70 },
  ],
  
  // Kha'Zix (121)
  121: [
    { championId: 33, championName: 'Rammus', reason: 'Armor + taunt', counterScore: 90 },
    { championId: 113, championName: 'Sejuani', reason: 'Tank + CC + no isolation', counterScore: 85 },
    { championId: 154, championName: 'Zac', reason: 'Tank + teamfight', counterScore: 85 },
  ],
  
  // Rengar (107)
  107: [
    { championId: 33, championName: 'Rammus', reason: 'Taunt + armor', counterScore: 95 },
    { championId: 78, championName: 'Poppy', reason: 'W blocks jump', counterScore: 90 },
    { championId: 113, championName: 'Sejuani', reason: 'Tank + CC', counterScore: 80 },
  ],
  
  // Evelynn (28)
  28: [
    { championId: 64, championName: 'LeeSin', reason: 'Q reveals + early invade', counterScore: 80 },
    { championId: 121, championName: 'KhaZix', reason: 'Invade + isolation', counterScore: 75 },
    { championId: 76, championName: 'Nidalee', reason: 'Early game invade', counterScore: 75 },
  ],
  
  // Master Yi (11)
  11: [
    { championId: 33, championName: 'Rammus', reason: 'Taunt = Yi kills himself', counterScore: 100 },
    { championId: 127, championName: 'Lissandra', reason: 'Point-click CC', counterScore: 90 },
    { championId: 90, championName: 'Malzahar', reason: 'Suppress', counterScore: 90 },
    { championId: 24, championName: 'Jax', reason: 'Counter Strike', counterScore: 85 },
    { championId: 58, championName: 'Renekton', reason: 'Point-click stun', counterScore: 80 },
  ],
  
  // Kayn (141)
  141: [
    { championId: 64, championName: 'LeeSin', reason: 'Early game dominant', counterScore: 80 },
    { championId: 121, championName: 'KhaZix', reason: 'Early game dominant', counterScore: 75 },
    { championId: 76, championName: 'Nidalee', reason: 'Early invade', counterScore: 75 },
  ],
  
  // Elise (60)
  60: [
    { championId: 154, championName: 'Zac', reason: 'Tank + scale', counterScore: 75 },
    { championId: 113, championName: 'Sejuani', reason: 'Tank + scale', counterScore: 75 },
    { championId: 32, championName: 'Amumu', reason: 'Tank + scale', counterScore: 70 },
  ],
  
  // Nidalee (76)
  76: [
    { championId: 154, championName: 'Zac', reason: 'Tank + sustain', counterScore: 80 },
    { championId: 113, championName: 'Sejuani', reason: 'Tank + scale', counterScore: 75 },
    { championId: 32, championName: 'Amumu', reason: 'Tank + scale', counterScore: 75 },
  ],
};

// ==========================================
// YARDIMCI FONKSİYONLAR
// ==========================================

/**
 * Belirli bir rol için matchup verisi getirir
 */
export function getMatchupsForRole(role: string): Record<number, CounterData[]> {
  switch (role.toLowerCase()) {
    case 'top':
      return TOP_LANE_MATCHUPS;
    case 'mid':
      return MID_LANE_MATCHUPS;
    case 'adc':
    case 'bot':
      return BOT_LANE_ADC_MATCHUPS;
    case 'support':
    case 'sup':
      return SUPPORT_MATCHUPS;
    case 'jungle':
    case 'jg':
      return JUNGLE_MATCHUPS;
    default:
      return {};
  }
}

/**
 * Şampiyonu counter eden şampiyonları getirir
 */
export function getCounterPicksForChampion(championId: number, role?: string): CounterData[] {
  if (role) {
    const matchups = getMatchupsForRole(role);
    return matchups[championId] || [];
  }
  
  // Tüm matchup'larda ara
  return [
    ...TOP_LANE_MATCHUPS[championId] || [],
    ...MID_LANE_MATCHUPS[championId] || [],
    ...BOT_LANE_ADC_MATCHUPS[championId] || [],
    ...SUPPORT_MATCHUPS[championId] || [],
    ...JUNGLE_MATCHUPS[championId] || [],
  ];
}

/**
 * Toplam matchup sayısını döndürür
 */
export function getTotalMatchupCount(): number {
  const counts = [
    Object.values(TOP_LANE_MATCHUPS).reduce((sum, arr) => sum + arr.length, 0),
    Object.values(MID_LANE_MATCHUPS).reduce((sum, arr) => sum + arr.length, 0),
    Object.values(BOT_LANE_ADC_MATCHUPS).reduce((sum, arr) => sum + arr.length, 0),
    Object.values(SUPPORT_MATCHUPS).reduce((sum, arr) => sum + arr.length, 0),
    Object.values(JUNGLE_MATCHUPS).reduce((sum, arr) => sum + arr.length, 0),
  ];
  return counts.reduce((a, b) => a + b, 0);
}

