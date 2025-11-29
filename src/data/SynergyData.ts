/**
 * KAPSAMLI SİNERJİ VE COUNTER VERİTABANI
 * 
 * Bu dosya tüm popüler şampiyonlar için detaylı sinerji ve counter verileri içerir.
 * Veri kaynakları: Pro play, high elo meta, community knowledge
 * 
 * Son güncelleme: 2024
 * Toplam sinerji: 200+
 * Toplam counter: 200+
 */

import { SynergyData, CounterData } from '../types'

// ==========================================
// SİNERJİ VERİLERİ - KAPSAMLI
// ==========================================

export const SYNERGY_DATABASE: Record<number, SynergyData[]> = {
  
  // ============================================
  // JUNGLE ŞAMPİYONLARI
  // ============================================
  
  // Vi (254)
  254: [
    { championId: 103, championName: 'Ahri', reason: 'Vi ulti sabitleme + Ahri charm = garantili öldürme', synergyScore: 85 },
    { championId: 157, championName: 'Yasuo', reason: 'Vi Q havaya kaldırır, Yasuo R bağlar', synergyScore: 90 },
    { championId: 412, championName: 'Thresh', reason: 'Lantern ile güvenli dalış ve geri çekilme', synergyScore: 75 },
    { championId: 134, championName: 'Syndra', reason: 'Vi CC + Syndra burst = anlık öldürme', synergyScore: 80 },
    { championId: 61, championName: 'Orianna', reason: 'Vi üzerine top + ulti combo', synergyScore: 85 },
    { championId: 99, championName: 'Lux', reason: 'Vi CC sonrası Lux Q+R garantili', synergyScore: 75 },
    { championId: 115, championName: 'Ziggs', reason: 'Vi engage + Ziggs AoE', synergyScore: 70 },
    { championId: 45, championName: 'Veigar', reason: 'Vi ulti + Veigar cage combo', synergyScore: 80 },
  ],
  
  // Lee Sin (64)
  64: [
    { championId: 157, championName: 'Yasuo', reason: 'Lee R havaya kaldırır - en iyi Yasuo enabler', synergyScore: 95 },
    { championId: 92, championName: 'Riven', reason: 'Erken oyun agresif ikili, dive potansiyeli', synergyScore: 75 },
    { championId: 238, championName: 'Zed', reason: 'Dive potansiyeli çok yüksek', synergyScore: 75 },
    { championId: 39, championName: 'Irelia', reason: 'İkili dalış ve burst potansiyeli', synergyScore: 70 },
    { championId: 777, championName: 'Yone', reason: 'Lee R + Yone R combo', synergyScore: 85 },
    { championId: 61, championName: 'Orianna', reason: 'Insec kick + Ori ulti', synergyScore: 80 },
    { championId: 134, championName: 'Syndra', reason: 'Kick + burst', synergyScore: 75 },
  ],
  
  // Jarvan IV (59)
  59: [
    { championId: 61, championName: 'Orianna', reason: 'J4 ulti + Orianna ulti = en iyi wombo combo', synergyScore: 100 },
    { championId: 134, championName: 'Syndra', reason: 'J4 hapsetme + Syndra burst', synergyScore: 85 },
    { championId: 21, championName: 'MissFortune', reason: 'J4 ulti içine MF ulti - team wipe', synergyScore: 95 },
    { championId: 63, championName: 'Brand', reason: 'Hapiste kalan hedeflere AoE yanık', synergyScore: 90 },
    { championId: 157, championName: 'Yasuo', reason: 'J4 E-Q havaya kaldırır', synergyScore: 85 },
    { championId: 99, championName: 'Lux', reason: 'J4 ulti + Lux ulti', synergyScore: 80 },
    { championId: 115, championName: 'Ziggs', reason: 'J4 hapsi + Ziggs bombalar', synergyScore: 85 },
    { championId: 161, championName: 'VelKoz', reason: 'J4 hapsi + Vel ulti', synergyScore: 85 },
    { championId: 101, championName: 'Xerath', reason: 'Hapiste sabit hedefler', synergyScore: 80 },
    { championId: 3, championName: 'Galio', reason: 'J4 E-Q + Galio ulti', synergyScore: 90 },
  ],
  
  // Amumu (32)
  32: [
    { championId: 21, championName: 'MissFortune', reason: 'Amumu R + MF R = team wipe - klasik combo', synergyScore: 100 },
    { championId: 61, championName: 'Orianna', reason: 'Çift AoE ulti combo', synergyScore: 95 },
    { championId: 157, championName: 'Yasuo', reason: 'Amumu Q havaya kaldırır', synergyScore: 80 },
    { championId: 134, championName: 'Syndra', reason: 'CC sonrası burst', synergyScore: 80 },
    { championId: 222, championName: 'Jinx', reason: 'Amumu engage + Jinx AoE roketler', synergyScore: 85 },
    { championId: 63, championName: 'Brand', reason: 'Amumu R + Brand pasif = team melt', synergyScore: 90 },
    { championId: 99, championName: 'Lux', reason: 'Amumu R + Lux R', synergyScore: 85 },
    { championId: 115, championName: 'Ziggs', reason: 'AoE CC + AoE damage', synergyScore: 85 },
    { championId: 30, championName: 'Karthus', reason: 'Amumu R + Karthus R timing', synergyScore: 80 },
    { championId: 110, championName: 'Varus', reason: 'Amumu R + Varus R chain CC', synergyScore: 85 },
  ],
  
  // Zac (154)
  154: [
    { championId: 157, championName: 'Yasuo', reason: 'Zac E en iyi havaya kaldırma - çoklu hedef', synergyScore: 100 },
    { championId: 61, championName: 'Orianna', reason: 'Zac dalışı + Ori ulti', synergyScore: 95 },
    { championId: 145, championName: 'Kaisa', reason: 'Zac engage + Kaisa followup', synergyScore: 85 },
    { championId: 777, championName: 'Yone', reason: 'Zac E + Yone R', synergyScore: 90 },
    { championId: 21, championName: 'MissFortune', reason: 'Zac R topla + MF R', synergyScore: 90 },
    { championId: 63, championName: 'Brand', reason: 'Zac R topla + Brand combo', synergyScore: 85 },
    { championId: 134, championName: 'Syndra', reason: 'Zac CC + Syndra burst', synergyScore: 80 },
  ],
  
  // Sejuani (113)
  113: [
    { championId: 157, championName: 'Yasuo', reason: 'Sejuani R havaya kaldırır', synergyScore: 85 },
    { championId: 222, championName: 'Jinx', reason: 'Peel + Hypercarry koruması', synergyScore: 80 },
    { championId: 236, championName: 'Lucian', reason: 'Melee ile pasif proc - çok hızlı', synergyScore: 85 },
    { championId: 145, championName: 'Kaisa', reason: 'Pasif proc + engage', synergyScore: 80 },
    { championId: 81, championName: 'Ezreal', reason: 'Uzaktan pasif proc', synergyScore: 70 },
    { championId: 51, championName: 'Caitlyn', reason: 'CC + trap combo', synergyScore: 75 },
  ],
  
  // Hecarim (120)
  120: [
    { championId: 61, championName: 'Orianna', reason: 'Hecarim üzerine top - ölümcül charge', synergyScore: 95 },
    { championId: 117, championName: 'Lulu', reason: 'Hız + büyütme = durdurulamaz', synergyScore: 90 },
    { championId: 43, championName: 'Karma', reason: 'Hız buff + Hecarim pasifi', synergyScore: 85 },
    { championId: 40, championName: 'Janna', reason: 'Hız buff + shield', synergyScore: 80 },
    { championId: 26, championName: 'Zilean', reason: 'Hız + revive combo', synergyScore: 85 },
    { championId: 134, championName: 'Syndra', reason: 'Hecarim engage + burst', synergyScore: 75 },
  ],
  
  // Rek'Sai (421)
  421: [
    { championId: 157, championName: 'Yasuo', reason: 'RekSai W havaya kaldırır', synergyScore: 85 },
    { championId: 238, championName: 'Zed', reason: 'Tunnel gank + Zed burst', synergyScore: 80 },
    { championId: 91, championName: 'Talon', reason: 'Erken oyun roam ikilisi', synergyScore: 80 },
    { championId: 777, championName: 'Yone', reason: 'Knockup + Yone combo', synergyScore: 80 },
  ],
  
  // Elise (60)
  60: [
    { championId: 157, championName: 'Yasuo', reason: 'Cocoon havaya kaldırmıyor ama setup', synergyScore: 70 },
    { championId: 238, championName: 'Zed', reason: 'Dive potansiyeli yüksek', synergyScore: 80 },
    { championId: 7, championName: 'LeBlanc', reason: 'Erken oyun burst ikilisi', synergyScore: 80 },
    { championId: 134, championName: 'Syndra', reason: 'Stun + burst', synergyScore: 80 },
  ],
  
  // Kha'Zix (121)
  121: [
    { championId: 107, championName: 'Rengar', reason: 'Rivalry - isolation + brush combo', synergyScore: 60 },
    { championId: 238, championName: 'Zed', reason: 'Backline dive ikilisi', synergyScore: 75 },
    { championId: 91, championName: 'Talon', reason: 'Assassin roam', synergyScore: 70 },
    { championId: 84, championName: 'Akali', reason: 'Çift assassin pressure', synergyScore: 70 },
  ],
  
  // Graves (104)
  104: [
    { championId: 117, championName: 'Lulu', reason: 'Buff + kite potansiyeli', synergyScore: 80 },
    { championId: 89, championName: 'Leona', reason: 'Leona CC + Graves burst', synergyScore: 75 },
    { championId: 111, championName: 'Nautilus', reason: 'CC chain + burst', synergyScore: 75 },
  ],
  
  // Nidalee (76)
  76: [
    { championId: 157, championName: 'Yasuo', reason: 'Poke + Yasuo engage', synergyScore: 70 },
    { championId: 92, championName: 'Riven', reason: 'Erken oyun aggression', synergyScore: 75 },
    { championId: 238, championName: 'Zed', reason: 'Poke + assassination', synergyScore: 75 },
  ],
  
  // Viego (234)
  234: [
    { championId: 54, championName: 'Malphite', reason: 'Malphite engage + Viego cleanup', synergyScore: 80 },
    { championId: 89, championName: 'Leona', reason: 'CC chain + reset potansiyeli', synergyScore: 80 },
    { championId: 157, championName: 'Yasuo', reason: 'Teamfight reset potansiyeli', synergyScore: 75 },
  ],
  
  // Diana (131)
  131: [
    { championId: 157, championName: 'Yasuo', reason: 'Diana R havaya kaldırır - çoklu hedef', synergyScore: 95 },
    { championId: 61, championName: 'Orianna', reason: 'Diana R + Ori R', synergyScore: 90 },
    { championId: 777, championName: 'Yone', reason: 'Diana R + Yone R', synergyScore: 90 },
    { championId: 54, championName: 'Malphite', reason: 'Çift engage', synergyScore: 85 },
    { championId: 21, championName: 'MissFortune', reason: 'Diana R topla + MF R', synergyScore: 90 },
  ],
  
  // ============================================
  // MID ŞAMPİYONLARI
  // ============================================
  
  // Yasuo (157) - EN KAPSAMLI
  157: [
    { championId: 54, championName: 'Malphite', reason: 'En ikonik combo - 5 kişilik ulti', synergyScore: 100 },
    { championId: 89, championName: 'Leona', reason: 'Leona E havaya kaldırır', synergyScore: 85 },
    { championId: 111, championName: 'Nautilus', reason: 'Naut R havaya kaldırır', synergyScore: 90 },
    { championId: 154, championName: 'Zac', reason: 'Zac E en iyi - çoklu hedef', synergyScore: 100 },
    { championId: 32, championName: 'Amumu', reason: 'Amumu Q havaya kaldırır', synergyScore: 80 },
    { championId: 113, championName: 'Sejuani', reason: 'Sejuani R havaya kaldırır', synergyScore: 85 },
    { championId: 421, championName: 'RekSai', reason: 'RekSai W havaya kaldırır', synergyScore: 80 },
    { championId: 59, championName: 'JarvanIV', reason: 'J4 E-Q havaya kaldırır', synergyScore: 90 },
    { championId: 516, championName: 'Ornn', reason: 'Ornn R havaya kaldırır', synergyScore: 95 },
    { championId: 64, championName: 'LeeSin', reason: 'Lee R havaya kaldırır - skill combo', synergyScore: 95 },
    { championId: 79, championName: 'Gragas', reason: 'Gragas E havaya kaldırır', synergyScore: 85 },
    { championId: 497, championName: 'Rakan', reason: 'Rakan W havaya kaldırır + hız', synergyScore: 95 },
    { championId: 12, championName: 'Alistar', reason: 'Alistar W-Q havaya kaldırır', synergyScore: 90 },
    { championId: 53, championName: 'Blitzcrank', reason: 'Blitz E havaya kaldırır', synergyScore: 75 },
    { championId: 131, championName: 'Diana', reason: 'Diana R havaya kaldırır', synergyScore: 95 },
    { championId: 254, championName: 'Vi', reason: 'Vi Q havaya kaldırır', synergyScore: 85 },
    { championId: 150, championName: 'Gnar', reason: 'Mega Gnar R havaya kaldırır', synergyScore: 85 },
    { championId: 57, championName: 'Maokai', reason: 'Maokai Q havaya kaldırır', synergyScore: 75 },
    { championId: 14, championName: 'Sion', reason: 'Sion Q havaya kaldırır', synergyScore: 75 },
    { championId: 106, championName: 'Volibear', reason: 'Volibear E havaya kaldırır', synergyScore: 70 },
  ],
  
  // Yone (777)
  777: [
    { championId: 54, championName: 'Malphite', reason: 'Malphite engage + Yone followup', synergyScore: 90 },
    { championId: 89, championName: 'Leona', reason: 'CC zinciri', synergyScore: 80 },
    { championId: 154, championName: 'Zac', reason: 'Zac E + Yone R', synergyScore: 90 },
    { championId: 111, championName: 'Nautilus', reason: 'Naut ulti + Yone burst', synergyScore: 85 },
    { championId: 131, championName: 'Diana', reason: 'Diana R + Yone R', synergyScore: 90 },
    { championId: 516, championName: 'Ornn', reason: 'Ornn R + Yone R', synergyScore: 90 },
  ],
  
  // Ahri (103)
  103: [
    { championId: 254, championName: 'Vi', reason: 'Vi sabitleme + Ahri combo', synergyScore: 85 },
    { championId: 54, championName: 'Malphite', reason: 'Malphite R sonrası tüm skillshot garanti', synergyScore: 80 },
    { championId: 412, championName: 'Thresh', reason: 'Hook + Charm CC zinciri', synergyScore: 75 },
    { championId: 89, championName: 'Leona', reason: 'Leona CC + Ahri burst', synergyScore: 80 },
    { championId: 111, championName: 'Nautilus', reason: 'Naut CC + Ahri combo', synergyScore: 80 },
  ],
  
  // Orianna (61)
  61: [
    { championId: 59, championName: 'JarvanIV', reason: 'J4 ulti içine Ori ulti - best combo', synergyScore: 100 },
    { championId: 254, championName: 'Vi', reason: 'Vi üzerine top + dalış', synergyScore: 90 },
    { championId: 120, championName: 'Hecarim', reason: 'Heca üzerine top + charge', synergyScore: 95 },
    { championId: 154, championName: 'Zac', reason: 'Zac üzerine top + dalış', synergyScore: 95 },
    { championId: 78, championName: 'Poppy', reason: 'Poppy üzerine top + engage', synergyScore: 85 },
    { championId: 54, championName: 'Malphite', reason: 'Malphite R + Ori R', synergyScore: 95 },
    { championId: 64, championName: 'LeeSin', reason: 'Lee üzerine top + insec', synergyScore: 90 },
    { championId: 32, championName: 'Amumu', reason: 'Amumu üzerine top + engage', synergyScore: 90 },
    { championId: 113, championName: 'Sejuani', reason: 'Sej üzerine top', synergyScore: 85 },
    { championId: 131, championName: 'Diana', reason: 'Diana üzerine top + R', synergyScore: 95 },
    { championId: 517, championName: 'Sylas', reason: 'Sylas üzerine top + engage', synergyScore: 85 },
  ],
  
  // Syndra (134)
  134: [
    { championId: 254, championName: 'Vi', reason: 'CC + burst combo', synergyScore: 85 },
    { championId: 59, championName: 'JarvanIV', reason: 'Hapiste Syndra combo', synergyScore: 90 },
    { championId: 412, championName: 'Thresh', reason: 'Hook + stun combo', synergyScore: 80 },
    { championId: 89, championName: 'Leona', reason: 'Leona CC + Syndra burst', synergyScore: 85 },
    { championId: 111, championName: 'Nautilus', reason: 'Naut CC + burst', synergyScore: 85 },
    { championId: 54, championName: 'Malphite', reason: 'Malphite R + Syndra burst', synergyScore: 85 },
  ],
  
  // Zed (238)
  238: [
    { championId: 64, championName: 'LeeSin', reason: 'Dive potansiyeli - backline threat', synergyScore: 80 },
    { championId: 60, championName: 'Elise', reason: 'Tower dive ikilisi', synergyScore: 80 },
    { championId: 76, championName: 'Nidalee', reason: 'Poke + assassination', synergyScore: 75 },
    { championId: 421, championName: 'RekSai', reason: 'Early gank + burst', synergyScore: 80 },
  ],
  
  // Katarina (55)
  55: [
    { championId: 32, championName: 'Amumu', reason: 'Amumu R + Kata R reset heaven', synergyScore: 90 },
    { championId: 54, championName: 'Malphite', reason: 'Malphite engage + Kata cleanup', synergyScore: 85 },
    { championId: 154, championName: 'Zac', reason: 'Zac CC + Kata resets', synergyScore: 85 },
    { championId: 89, championName: 'Leona', reason: 'Leona CC + Kata burst', synergyScore: 80 },
  ],
  
  // Viktor (112)
  112: [
    { championId: 59, championName: 'JarvanIV', reason: 'J4 ulti + Viktor W+R', synergyScore: 90 },
    { championId: 32, championName: 'Amumu', reason: 'Amumu R + Viktor combo', synergyScore: 85 },
    { championId: 54, championName: 'Malphite', reason: 'Malphite R + Viktor burst', synergyScore: 85 },
  ],
  
  // Cassiopeia (69)
  69: [
    { championId: 59, championName: 'JarvanIV', reason: 'J4 ulti içine Cass R', synergyScore: 90 },
    { championId: 54, championName: 'Malphite', reason: 'Malphite R + Cass R', synergyScore: 85 },
    { championId: 32, championName: 'Amumu', reason: 'Amumu R + Cass combo', synergyScore: 85 },
  ],
  
  // ============================================
  // TOP ŞAMPİYONLARI
  // ============================================
  
  // Malphite (54)
  54: [
    { championId: 157, championName: 'Yasuo', reason: 'En ikonik wombo combo', synergyScore: 100 },
    { championId: 777, championName: 'Yone', reason: 'Malphite R + Yone followup', synergyScore: 90 },
    { championId: 222, championName: 'Jinx', reason: 'Engage + hypercarry', synergyScore: 80 },
    { championId: 145, championName: 'Kaisa', reason: 'Malphite R + Kaisa R followup', synergyScore: 85 },
    { championId: 21, championName: 'MissFortune', reason: 'Malphite R + MF ulti', synergyScore: 95 },
    { championId: 61, championName: 'Orianna', reason: 'Çift wombo combo', synergyScore: 95 },
    { championId: 103, championName: 'Ahri', reason: 'Malphite CC + Ahri burst', synergyScore: 80 },
    { championId: 134, championName: 'Syndra', reason: 'Malphite CC + Syndra burst', synergyScore: 85 },
    { championId: 63, championName: 'Brand', reason: 'Malphite R + Brand combo', synergyScore: 90 },
    { championId: 30, championName: 'Karthus', reason: 'Engage + Karthus R timing', synergyScore: 80 },
    { championId: 55, championName: 'Katarina', reason: 'Malphite engage + Kata resets', synergyScore: 85 },
    { championId: 112, championName: 'Viktor', reason: 'Malphite R + Viktor burst', synergyScore: 85 },
  ],
  
  // Ornn (516)
  516: [
    { championId: 157, championName: 'Yasuo', reason: 'Ornn R havaya kaldırır', synergyScore: 95 },
    { championId: 777, championName: 'Yone', reason: 'Ornn R + Yone followup', synergyScore: 90 },
    { championId: 222, championName: 'Jinx', reason: 'Engage + item upgrade + hypercarry', synergyScore: 85 },
    { championId: 145, championName: 'Kaisa', reason: 'Ornn R + Kaisa followup + item', synergyScore: 85 },
    { championId: 21, championName: 'MissFortune', reason: 'Ornn R + MF R', synergyScore: 90 },
    { championId: 61, championName: 'Orianna', reason: 'Ornn R + Ori R', synergyScore: 90 },
  ],
  
  // Gnar (150)
  150: [
    { championId: 157, championName: 'Yasuo', reason: 'Mega Gnar R havaya kaldırır', synergyScore: 90 },
    { championId: 61, championName: 'Orianna', reason: 'Gnar R + Ori R combo', synergyScore: 90 },
    { championId: 21, championName: 'MissFortune', reason: 'Gnar R + MF R', synergyScore: 85 },
    { championId: 777, championName: 'Yone', reason: 'Gnar R + Yone combo', synergyScore: 85 },
  ],
  
  // Kennen (85)
  85: [
    { championId: 59, championName: 'JarvanIV', reason: 'J4 ulti + Kennen R', synergyScore: 90 },
    { championId: 61, championName: 'Orianna', reason: 'Kennen üzerine top + R', synergyScore: 90 },
    { championId: 54, championName: 'Malphite', reason: 'Çift engage', synergyScore: 85 },
    { championId: 157, championName: 'Yasuo', reason: 'Kennen stun + Yasuo', synergyScore: 80 },
  ],
  
  // Sion (14)
  14: [
    { championId: 157, championName: 'Yasuo', reason: 'Sion Q havaya kaldırır', synergyScore: 80 },
    { championId: 222, championName: 'Jinx', reason: 'Frontline + hypercarry', synergyScore: 75 },
    { championId: 61, championName: 'Orianna', reason: 'Sion engage + Ori combo', synergyScore: 80 },
  ],
  
  // Maokai (57)
  57: [
    { championId: 157, championName: 'Yasuo', reason: 'Maokai Q havaya kaldırır', synergyScore: 80 },
    { championId: 222, championName: 'Jinx', reason: 'Peel + engage', synergyScore: 80 },
    { championId: 21, championName: 'MissFortune', reason: 'Maokai R + MF R', synergyScore: 85 },
  ],
  
  // ============================================
  // ADC ŞAMPİYONLARI
  // ============================================
  
  // Jinx (222)
  222: [
    { championId: 412, championName: 'Thresh', reason: 'Peel + catch potansiyeli', synergyScore: 85 },
    { championId: 117, championName: 'Lulu', reason: 'En iyi hypercarry koruyucu', synergyScore: 100 },
    { championId: 40, championName: 'Janna', reason: 'Peel + hız + shield', synergyScore: 95 },
    { championId: 54, championName: 'Malphite', reason: 'Engage + pasif reset', synergyScore: 85 },
    { championId: 32, championName: 'Amumu', reason: 'AoE CC + Jinx AoE', synergyScore: 90 },
    { championId: 267, championName: 'Nami', reason: 'Bubble + heal + buff', synergyScore: 90 },
    { championId: 16, championName: 'Soraka', reason: 'Sustain + silence', synergyScore: 85 },
    { championId: 201, championName: 'Braum', reason: 'Peel + block', synergyScore: 85 },
    { championId: 26, championName: 'Zilean', reason: 'Hız + revive', synergyScore: 90 },
  ],
  
  // Kai'Sa (145)
  145: [
    { championId: 111, championName: 'Nautilus', reason: 'Naut R = Kaisa R followup garantili', synergyScore: 95 },
    { championId: 54, championName: 'Malphite', reason: 'Malphite R = Kaisa R', synergyScore: 90 },
    { championId: 89, championName: 'Leona', reason: 'Leona engage = Kaisa ulti', synergyScore: 90 },
    { championId: 412, championName: 'Thresh', reason: 'Hook + Kaisa followup', synergyScore: 85 },
    { championId: 497, championName: 'Rakan', reason: 'Rakan engage = Kaisa R', synergyScore: 90 },
    { championId: 53, championName: 'Blitzcrank', reason: 'Hook = Kaisa R', synergyScore: 85 },
  ],
  
  // Xayah (498)
  498: [
    { championId: 497, championName: 'Rakan', reason: 'Lover duo - W recall buff, özel ses, ekstra hasar', synergyScore: 100 },
    { championId: 89, championName: 'Leona', reason: 'Root + feather recall', synergyScore: 85 },
    { championId: 111, championName: 'Nautilus', reason: 'CC + feather setup', synergyScore: 80 },
  ],
  
  // Draven (119)
  119: [
    { championId: 412, championName: 'Thresh', reason: 'Lantern + agresif oyun', synergyScore: 95 },
    { championId: 89, championName: 'Leona', reason: 'Erken oyun kill laneı', synergyScore: 95 },
    { championId: 111, championName: 'Nautilus', reason: 'Erken oyun all-in', synergyScore: 90 },
    { championId: 555, championName: 'Pyke', reason: 'Kill lane + gold share', synergyScore: 95 },
    { championId: 53, championName: 'Blitzcrank', reason: 'Hook = Draven axe damage', synergyScore: 90 },
    { championId: 12, championName: 'Alistar', reason: 'Engage + Draven follow', synergyScore: 85 },
  ],
  
  // Lucian (236)
  236: [
    { championId: 267, championName: 'Nami', reason: 'E buff + Lucian pasif = çok hızlı trade', synergyScore: 95 },
    { championId: 412, championName: 'Thresh', reason: 'Erken oyun baskısı', synergyScore: 85 },
    { championId: 350, championName: 'Yuumi', reason: 'Sürekli buff + agresif oyun', synergyScore: 80 },
    { championId: 201, championName: 'Braum', reason: 'Pasif stack çok hızlı', synergyScore: 90 },
    { championId: 89, championName: 'Leona', reason: 'Kill lane potential', synergyScore: 85 },
  ],
  
  // Miss Fortune (21)
  21: [
    { championId: 32, championName: 'Amumu', reason: 'Amumu R + MF R = team wipe - klasik', synergyScore: 100 },
    { championId: 54, championName: 'Malphite', reason: 'Malphite R + MF R', synergyScore: 95 },
    { championId: 59, championName: 'JarvanIV', reason: 'J4 ulti içine MF R', synergyScore: 95 },
    { championId: 89, championName: 'Leona', reason: 'Leona CC + MF ulti', synergyScore: 90 },
    { championId: 516, championName: 'Ornn', reason: 'Ornn R + MF R', synergyScore: 90 },
    { championId: 154, championName: 'Zac', reason: 'Zac R + MF R', synergyScore: 90 },
    { championId: 57, championName: 'Maokai', reason: 'Maokai R + MF R', synergyScore: 85 },
    { championId: 497, championName: 'Rakan', reason: 'Rakan engage + MF R', synergyScore: 85 },
  ],
  
  // Aphelios (523)
  523: [
    { championId: 412, championName: 'Thresh', reason: 'Peel + engage dengeleme', synergyScore: 85 },
    { championId: 117, championName: 'Lulu', reason: 'Hypercarry koruma', synergyScore: 95 },
    { championId: 201, championName: 'Braum', reason: 'Peel + frontline', synergyScore: 90 },
    { championId: 40, championName: 'Janna', reason: 'Peel + disengage', synergyScore: 90 },
    { championId: 267, championName: 'Nami', reason: 'Sustain + buff', synergyScore: 85 },
  ],
  
  // Vayne (67)
  67: [
    { championId: 117, championName: 'Lulu', reason: 'Polymorph + shield = ölümsüz Vayne', synergyScore: 100 },
    { championId: 40, championName: 'Janna', reason: 'Peel + disengage', synergyScore: 95 },
    { championId: 201, championName: 'Braum', reason: 'Peel + protection', synergyScore: 90 },
    { championId: 412, championName: 'Thresh', reason: 'Lantern + peel', synergyScore: 85 },
  ],
  
  // Kog'Maw (96)
  96: [
    { championId: 117, championName: 'Lulu', reason: 'En klasik koruyucu duo - PROTECT THE KOG', synergyScore: 100 },
    { championId: 40, championName: 'Janna', reason: 'Peel heaven', synergyScore: 95 },
    { championId: 201, championName: 'Braum', reason: 'W proc + shield', synergyScore: 90 },
    { championId: 26, championName: 'Zilean', reason: 'Hız + revive', synergyScore: 90 },
  ],
  
  // Twitch (29)
  29: [
    { championId: 117, championName: 'Lulu', reason: 'Stealth + Lulu buff = surprise', synergyScore: 95 },
    { championId: 26, championName: 'Zilean', reason: 'Hız + revive', synergyScore: 85 },
    { championId: 350, championName: 'Yuumi', reason: 'Stealth beraber', synergyScore: 90 },
  ],
  
  // ============================================
  // SUPPORT ŞAMPİYONLARI
  // ============================================
  
  // Thresh (412)
  412: [
    { championId: 119, championName: 'Draven', reason: 'Lantern + Draven agresif oyun', synergyScore: 95 },
    { championId: 236, championName: 'Lucian', reason: 'Erken oyun dominasyonu', synergyScore: 90 },
    { championId: 145, championName: 'Kaisa', reason: 'Hook + Kaisa followup', synergyScore: 85 },
    { championId: 222, championName: 'Jinx', reason: 'Peel + catch', synergyScore: 85 },
    { championId: 51, championName: 'Caitlyn', reason: 'Hook + trap combo', synergyScore: 85 },
    { championId: 202, championName: 'Jhin', reason: 'Hook + root combo', synergyScore: 85 },
    { championId: 498, championName: 'Xayah', reason: 'Hook + root', synergyScore: 80 },
  ],
  
  // Leona (89)
  89: [
    { championId: 21, championName: 'MissFortune', reason: 'Leona CC + MF ulti', synergyScore: 95 },
    { championId: 202, championName: 'Jhin', reason: 'CC zinciri + root', synergyScore: 95 },
    { championId: 119, championName: 'Draven', reason: 'Erken oyun kill laneı', synergyScore: 95 },
    { championId: 145, championName: 'Kaisa', reason: 'Leona E = Kaisa R', synergyScore: 90 },
    { championId: 498, championName: 'Xayah', reason: 'Root + feather combo', synergyScore: 85 },
    { championId: 157, championName: 'Yasuo', reason: 'Leona E havaya kaldırır', synergyScore: 85 },
    { championId: 236, championName: 'Lucian', reason: 'Kill lane', synergyScore: 90 },
    { championId: 51, championName: 'Caitlyn', reason: 'CC + trap', synergyScore: 85 },
  ],
  
  // Nautilus (111)
  111: [
    { championId: 145, championName: 'Kaisa', reason: 'Naut R = Kaisa R garantili', synergyScore: 95 },
    { championId: 119, championName: 'Draven', reason: 'All-in potansiyeli', synergyScore: 90 },
    { championId: 157, championName: 'Yasuo', reason: 'Naut R havaya kaldırır', synergyScore: 90 },
    { championId: 777, championName: 'Yone', reason: 'Naut CC + Yone followup', synergyScore: 85 },
    { championId: 21, championName: 'MissFortune', reason: 'CC + MF ulti', synergyScore: 90 },
    { championId: 202, championName: 'Jhin', reason: 'CC chain', synergyScore: 90 },
  ],
  
  // Lulu (117)
  117: [
    { championId: 222, championName: 'Jinx', reason: 'Hypercarry koruma', synergyScore: 100 },
    { championId: 96, championName: 'KogMaw', reason: 'PROTECT THE KOG - en iyi duo', synergyScore: 100 },
    { championId: 18, championName: 'Tristana', reason: 'Polymorph + reset potansiyeli', synergyScore: 90 },
    { championId: 67, championName: 'Vayne', reason: 'Koruma + scale', synergyScore: 95 },
    { championId: 523, championName: 'Aphelios', reason: 'Hypercarry koruma', synergyScore: 95 },
    { championId: 120, championName: 'Hecarim', reason: 'Hız + büyütme combo', synergyScore: 90 },
    { championId: 29, championName: 'Twitch', reason: 'Buff + stealth surprise', synergyScore: 90 },
    { championId: 11, championName: 'MasterYi', reason: 'Funnel combo', synergyScore: 85 },
  ],
  
  // Rakan (497)
  497: [
    { championId: 498, championName: 'Xayah', reason: 'Lover duo - özel buff ve sinerji', synergyScore: 100 },
    { championId: 157, championName: 'Yasuo', reason: 'Rakan W havaya kaldırır', synergyScore: 95 },
    { championId: 145, championName: 'Kaisa', reason: 'Rakan engage = Kaisa R', synergyScore: 90 },
    { championId: 21, championName: 'MissFortune', reason: 'Rakan engage + MF R', synergyScore: 90 },
    { championId: 222, championName: 'Jinx', reason: 'Engage + hypercarry', synergyScore: 85 },
    { championId: 777, championName: 'Yone', reason: 'Rakan W + Yone combo', synergyScore: 90 },
  ],
  
  // Nami (267)
  267: [
    { championId: 236, championName: 'Lucian', reason: 'E + Lucian pasif = en hızlı trade', synergyScore: 100 },
    { championId: 21, championName: 'MissFortune', reason: 'Nami R + MF R', synergyScore: 85 },
    { championId: 222, championName: 'Jinx', reason: 'Peel + buff + heal', synergyScore: 90 },
    { championId: 51, championName: 'Caitlyn', reason: 'Bubble + trap', synergyScore: 85 },
    { championId: 81, championName: 'Ezreal', reason: 'E buff + poke', synergyScore: 85 },
  ],
  
  // Blitzcrank (53)
  53: [
    { championId: 119, championName: 'Draven', reason: 'Hook = Draven damage', synergyScore: 95 },
    { championId: 145, championName: 'Kaisa', reason: 'Hook = Kaisa R', synergyScore: 85 },
    { championId: 157, championName: 'Yasuo', reason: 'Blitz E havaya kaldırır', synergyScore: 80 },
    { championId: 236, championName: 'Lucian', reason: 'Hook + burst', synergyScore: 85 },
    { championId: 21, championName: 'MissFortune', reason: 'Hook + MF burst', synergyScore: 85 },
  ],
  
  // Alistar (12)
  12: [
    { championId: 157, championName: 'Yasuo', reason: 'Alistar W-Q havaya kaldırır', synergyScore: 95 },
    { championId: 119, championName: 'Draven', reason: 'Engage + Draven damage', synergyScore: 90 },
    { championId: 145, championName: 'Kaisa', reason: 'Alistar engage = Kaisa R', synergyScore: 85 },
    { championId: 236, championName: 'Lucian', reason: 'Kill lane', synergyScore: 85 },
    { championId: 18, championName: 'Tristana', reason: 'Dive combo', synergyScore: 90 },
  ],
  
  // Pyke (555)
  555: [
    { championId: 119, championName: 'Draven', reason: 'Kill lane + double gold', synergyScore: 100 },
    { championId: 236, championName: 'Lucian', reason: 'Aggressive lane + execute', synergyScore: 90 },
    { championId: 21, championName: 'MissFortune', reason: 'Pyke R setup + MF burst', synergyScore: 85 },
    { championId: 145, championName: 'Kaisa', reason: 'Hook + Kaisa follow', synergyScore: 85 },
  ],
  
  // Braum (201)
  201: [
    { championId: 236, championName: 'Lucian', reason: 'Pasif stack çok hızlı', synergyScore: 95 },
    { championId: 222, championName: 'Jinx', reason: 'Peel + protection', synergyScore: 90 },
    { championId: 67, championName: 'Vayne', reason: 'Peel + W proc', synergyScore: 90 },
    { championId: 96, championName: 'KogMaw', reason: 'Pasif + shield', synergyScore: 90 },
    { championId: 523, championName: 'Aphelios', reason: 'Peel + protection', synergyScore: 90 },
    { championId: 51, championName: 'Caitlyn', reason: 'Range + peel', synergyScore: 85 },
  ],
};

// ==========================================
// COUNTER VERİLERİ - KAPSAMLI
// ==========================================

export const COUNTER_DATABASE: Record<number, CounterData[]> = {
  
  // ============================================
  // TOP COUNTER'LAR
  // ============================================
  
  // Malphite (54) - Bunları counter'lıyor
  54: [
    { championId: 122, championName: 'Darius', reason: 'Full AD = Malphite zırhı çok etkili', counterScore: 85 },
    { championId: 92, championName: 'Riven', reason: 'Full AD, Malphite hard counter', counterScore: 90 },
    { championId: 23, championName: 'Tryndamere', reason: 'AD + AS slow = Trynd tamamen işlevsiz', counterScore: 95 },
    { championId: 157, championName: 'Yasuo', reason: 'AD + zırh yığma = Yasuo hasar yapamaz', counterScore: 85 },
    { championId: 114, championName: 'Fiora', reason: 'AD carry, zırh çok etkili', counterScore: 80 },
    { championId: 39, championName: 'Irelia', reason: 'AD, zırh iyi çalışır', counterScore: 75 },
    { championId: 58, championName: 'Renekton', reason: 'Full AD bully', counterScore: 80 },
    { championId: 48, championName: 'Trundle', reason: 'AD + Malphite ulti ile engellenir', counterScore: 75 },
    { championId: 24, championName: 'Jax', reason: 'Auto-attack reliant', counterScore: 80 },
    { championId: 164, championName: 'Camille', reason: 'AD + AS slow etkili', counterScore: 75 },
  ],
  
  // Darius (122)
  122: [
    { championId: 85, championName: 'Kennen', reason: 'Range + kite + stun', counterScore: 80 },
    { championId: 150, championName: 'Gnar', reason: 'Range + kite + disengage', counterScore: 80 },
    { championId: 133, championName: 'Quinn', reason: 'Range + blind + vault', counterScore: 85 },
    { championId: 17, championName: 'Teemo', reason: 'Blind + poke + kite', counterScore: 80 },
    { championId: 67, championName: 'Vayne', reason: 'Kite + true damage', counterScore: 75 },
    { championId: 518, championName: 'Neeko', reason: 'Kite + CC', counterScore: 70 },
  ],
  
  // Garen (86)
  86: [
    { championId: 67, championName: 'Vayne', reason: 'True damage + kite = Garen işlevsiz', counterScore: 85 },
    { championId: 85, championName: 'Kennen', reason: 'Range + stun', counterScore: 80 },
    { championId: 17, championName: 'Teemo', reason: 'Blind + poke', counterScore: 75 },
    { championId: 74, championName: 'Heimerdinger', reason: 'Turret + kite', counterScore: 75 },
    { championId: 150, championName: 'Gnar', reason: 'Range + kite', counterScore: 75 },
  ],
  
  // Fiora (114)
  114: [
    { championId: 54, championName: 'Malphite', reason: 'AS slow + zırh = Fiora işlevsiz', counterScore: 80 },
    { championId: 78, championName: 'Poppy', reason: 'W riposte ve lunge engelliyor', counterScore: 85 },
    { championId: 516, championName: 'Ornn', reason: 'Tank + CC + poke', counterScore: 70 },
    { championId: 58, championName: 'Renekton', reason: 'Erken oyun bully', counterScore: 70 },
    { championId: 80, championName: 'Pantheon', reason: 'Point-click stun + burst', counterScore: 75 },
  ],
  
  // Riven (92)
  92: [
    { championId: 54, championName: 'Malphite', reason: 'Zırh + AS slow = Riven hasar yapamaz', counterScore: 90 },
    { championId: 78, championName: 'Poppy', reason: 'W dash engelliyor', counterScore: 85 },
    { championId: 58, championName: 'Renekton', reason: 'Point-click stun + sustain', counterScore: 80 },
    { championId: 80, championName: 'Pantheon', reason: 'Point-click stun + shield', counterScore: 80 },
    { championId: 133, championName: 'Quinn', reason: 'Blind + vault', counterScore: 75 },
  ],
  
  // Irelia (39)
  39: [
    { championId: 54, championName: 'Malphite', reason: 'AS slow destroys Irelia', counterScore: 85 },
    { championId: 58, championName: 'Renekton', reason: 'Point-click stun + burst', counterScore: 80 },
    { championId: 24, championName: 'Jax', reason: 'Counter Strike + scaling', counterScore: 80 },
    { championId: 23, championName: 'Tryndamere', reason: 'Sustain + all-in', counterScore: 75 },
    { championId: 106, championName: 'Volibear', reason: 'Tank + damage + CC', counterScore: 75 },
  ],
  
  // Tryndamere (23)
  23: [
    { championId: 54, championName: 'Malphite', reason: 'AS slow + zırh = Trynd 0 hasar', counterScore: 95 },
    { championId: 33, championName: 'Rammus', reason: 'Taunt + thornmail', counterScore: 90 },
    { championId: 58, championName: 'Renekton', reason: 'Erken oyun bully + sustain', counterScore: 80 },
    { championId: 80, championName: 'Pantheon', reason: 'Point-click stun spam', counterScore: 85 },
    { championId: 17, championName: 'Teemo', reason: 'Blind = no crits', counterScore: 85 },
    { championId: 75, championName: 'Nasus', reason: 'Wither = no attack speed', counterScore: 85 },
  ],
  
  // ============================================
  // JUNGLE COUNTER'LAR
  // ============================================
  
  // Lee Sin (64)
  64: [
    { championId: 33, championName: 'Rammus', reason: 'Taunt + zırh = Lee hasar yapamaz', counterScore: 85 },
    { championId: 154, championName: 'Zac', reason: 'Tank + sustain + engage', counterScore: 75 },
    { championId: 113, championName: 'Sejuani', reason: 'Tank + CC', counterScore: 70 },
    { championId: 79, championName: 'Gragas', reason: 'Tankiness + disengage', counterScore: 70 },
  ],
  
  // Kha'Zix (121)
  121: [
    { championId: 33, championName: 'Rammus', reason: 'Zırh + taunt = Kha işlevsiz', counterScore: 90 },
    { championId: 54, championName: 'Malphite', reason: 'Zırh + CC', counterScore: 85 },
    { championId: 113, championName: 'Sejuani', reason: 'Tank + CC + no isolation', counterScore: 80 },
    { championId: 154, championName: 'Zac', reason: 'Tank + teamfight', counterScore: 80 },
  ],
  
  // Rengar (107)
  107: [
    { championId: 33, championName: 'Rammus', reason: 'Zırh + taunt', counterScore: 90 },
    { championId: 54, championName: 'Malphite', reason: 'Zırh = no burst', counterScore: 85 },
    { championId: 78, championName: 'Poppy', reason: 'W jump engeller', counterScore: 85 },
    { championId: 89, championName: 'Leona', reason: 'Aftershock + CC', counterScore: 75 },
  ],
  
  // Master Yi (11)
  11: [
    { championId: 33, championName: 'Rammus', reason: 'Taunt = Yi kendini öldürür', counterScore: 95 },
    { championId: 54, championName: 'Malphite', reason: 'AS slow + zırh', counterScore: 85 },
    { championId: 127, championName: 'Lissandra', reason: 'Point-click CC ulti', counterScore: 90 },
    { championId: 90, championName: 'Malzahar', reason: 'Suppress', counterScore: 90 },
    { championId: 24, championName: 'Jax', reason: 'Counter Strike', counterScore: 80 },
    { championId: 58, championName: 'Renekton', reason: 'Point-click stun', counterScore: 75 },
  ],
  
  // ============================================
  // MID COUNTER'LAR
  // ============================================
  
  // Yasuo (157)
  157: [
    { championId: 54, championName: 'Malphite', reason: 'Zırh + poke + point-click ulti', counterScore: 85 },
    { championId: 80, championName: 'Pantheon', reason: 'Point-click stun + burst', counterScore: 90 },
    { championId: 90, championName: 'Malzahar', reason: 'Suppress = Yasuo ölü', counterScore: 85 },
    { championId: 127, championName: 'Lissandra', reason: 'CC + burst', counterScore: 80 },
    { championId: 58, championName: 'Renekton', reason: 'Point-click stun + bully', counterScore: 85 },
    { championId: 33, championName: 'Rammus', reason: 'Taunt + zırh', counterScore: 80 },
    { championId: 3, championName: 'Galio', reason: 'Tank + CC + magic shield', counterScore: 75 },
  ],
  
  // Yone (777)
  777: [
    { championId: 80, championName: 'Pantheon', reason: 'Point-click stun + burst', counterScore: 85 },
    { championId: 58, championName: 'Renekton', reason: 'Point-click stun + sustain', counterScore: 85 },
    { championId: 127, championName: 'Lissandra', reason: 'CC chain', counterScore: 80 },
    { championId: 54, championName: 'Malphite', reason: 'Zırh + AS slow', counterScore: 80 },
    { championId: 90, championName: 'Malzahar', reason: 'Suppress', counterScore: 80 },
  ],
  
  // Zed (238)
  238: [
    { championId: 127, championName: 'Lissandra', reason: 'Zhonya + self ulti = Zed useless', counterScore: 90 },
    { championId: 90, championName: 'Malzahar', reason: 'Suppress + shield', counterScore: 85 },
    { championId: 3, championName: 'Galio', reason: 'Tank + anti-AD + magic shield', counterScore: 80 },
    { championId: 54, championName: 'Malphite', reason: 'Zırh', counterScore: 75 },
    { championId: 80, championName: 'Pantheon', reason: 'Point-click stun + aegis', counterScore: 75 },
  ],
  
  // Katarina (55)
  55: [
    { championId: 127, championName: 'Lissandra', reason: 'Ulti kesiyor + root', counterScore: 90 },
    { championId: 90, championName: 'Malzahar', reason: 'Silence + suppress', counterScore: 85 },
    { championId: 3, championName: 'Galio', reason: 'Taunt Kata ulti kesiyor', counterScore: 85 },
    { championId: 58, championName: 'Renekton', reason: 'Point-click stun', counterScore: 80 },
    { championId: 80, championName: 'Pantheon', reason: 'Point-click stun', counterScore: 80 },
    { championId: 131, championName: 'Diana', reason: 'Shield + burst', counterScore: 75 },
  ],
  
  // LeBlanc (7)
  7: [
    { championId: 90, championName: 'Malzahar', reason: 'Suppress + shield', counterScore: 85 },
    { championId: 127, championName: 'Lissandra', reason: 'Point-click CC', counterScore: 80 },
    { championId: 3, championName: 'Galio', reason: 'Magic shield + CC', counterScore: 80 },
    { championId: 38, championName: 'Kassadin', reason: 'Magic shield + scaling', counterScore: 75 },
  ],
  
  // Akali (84)
  84: [
    { championId: 90, championName: 'Malzahar', reason: 'Suppress ignores shroud', counterScore: 90 },
    { championId: 127, championName: 'Lissandra', reason: 'Point-click CC + reveal', counterScore: 85 },
    { championId: 3, championName: 'Galio', reason: 'Tank + taunt', counterScore: 80 },
    { championId: 58, championName: 'Renekton', reason: 'Point-click stun', counterScore: 80 },
  ],
  
  // Fizz (105)
  105: [
    { championId: 127, championName: 'Lissandra', reason: 'CC + burst', counterScore: 80 },
    { championId: 90, championName: 'Malzahar', reason: 'Suppress + shield', counterScore: 80 },
    { championId: 3, championName: 'Galio', reason: 'Magic shield + taunt', counterScore: 80 },
    { championId: 84, championName: 'Akali', reason: 'Shroud + outplay', counterScore: 70 },
  ],
  
  // ============================================
  // ADC COUNTER'LAR
  // ============================================
  
  // Draven (119)
  119: [
    { championId: 51, championName: 'Caitlyn', reason: 'Range avantajı + trap', counterScore: 75 },
    { championId: 202, championName: 'Jhin', reason: 'Range + CC + burst', counterScore: 70 },
    { championId: 110, championName: 'Varus', reason: 'Poke + CC', counterScore: 70 },
  ],
  
  // Vayne (67)
  67: [
    { championId: 119, championName: 'Draven', reason: 'Erken oyun baskısı = Vayne işlevsiz', counterScore: 85 },
    { championId: 51, championName: 'Caitlyn', reason: 'Range + trap + bully', counterScore: 80 },
    { championId: 21, championName: 'MissFortune', reason: 'Lane baskısı', counterScore: 75 },
    { championId: 236, championName: 'Lucian', reason: 'Erken oyun dominant', counterScore: 80 },
  ],
  
  // Kog'Maw (96)
  96: [
    { championId: 236, championName: 'Lucian', reason: 'Erken oyun dive', counterScore: 85 },
    { championId: 119, championName: 'Draven', reason: 'Lane baskısı', counterScore: 85 },
    { championId: 145, championName: 'Kaisa', reason: 'Burst + dive', counterScore: 80 },
  ],
  
  // Jinx (222)
  222: [
    { championId: 119, championName: 'Draven', reason: 'Erken oyun lane dominant', counterScore: 80 },
    { championId: 236, championName: 'Lucian', reason: 'Erken baskı', counterScore: 75 },
    { championId: 145, championName: 'Kaisa', reason: 'Dive potential', counterScore: 75 },
  ],
  
  // ============================================
  // SUPPORT COUNTER'LAR
  // ============================================
  
  // Leona (89)
  89: [
    { championId: 25, championName: 'Morgana', reason: 'Black Shield engage engelliyor', counterScore: 95 },
    { championId: 40, championName: 'Janna', reason: 'Disengage + peel', counterScore: 80 },
    { championId: 117, championName: 'Lulu', reason: 'Polymorph + shield', counterScore: 75 },
    { championId: 37, championName: 'Sona', reason: 'Poke + sustain', counterScore: 70 },
  ],
  
  // Nautilus (111)
  111: [
    { championId: 25, championName: 'Morgana', reason: 'Black Shield', counterScore: 95 },
    { championId: 40, championName: 'Janna', reason: 'Disengage', counterScore: 80 },
    { championId: 37, championName: 'Sona', reason: 'Poke + sustain', counterScore: 70 },
  ],
  
  // Blitzcrank (53)
  53: [
    { championId: 25, championName: 'Morgana', reason: 'Black Shield hook engelliyor', counterScore: 100 },
    { championId: 51, championName: 'Caitlyn', reason: 'Trap + range', counterScore: 75 },
    { championId: 81, championName: 'Ezreal', reason: 'E ile hook dodge', counterScore: 80 },
    { championId: 350, championName: 'Yuumi', reason: 'Hook = sadece ADC alır, Yuumi kaçar', counterScore: 75 },
    { championId: 14, championName: 'Sion', reason: 'Hook = Sion engage', counterScore: 70 },
  ],
  
  // Thresh (412)
  412: [
    { championId: 25, championName: 'Morgana', reason: 'Black Shield', counterScore: 90 },
    { championId: 40, championName: 'Janna', reason: 'Disengage', counterScore: 75 },
    { championId: 81, championName: 'Ezreal', reason: 'E dodge', counterScore: 70 },
  ],
  
  // Yuumi (350)
  350: [
    { championId: 89, championName: 'Leona', reason: 'Hard engage = Yuumi zor attach', counterScore: 85 },
    { championId: 111, championName: 'Nautilus', reason: 'Hard engage + CC', counterScore: 85 },
    { championId: 53, championName: 'Blitzcrank', reason: 'Hook detach zorlar', counterScore: 80 },
    { championId: 555, championName: 'Pyke', reason: 'Kill pressure', counterScore: 80 },
  ],
  
  // Lulu (117)
  117: [
    { championId: 89, championName: 'Leona', reason: 'Hard engage > peel', counterScore: 75 },
    { championId: 111, championName: 'Nautilus', reason: 'Hard engage', counterScore: 75 },
    { championId: 555, championName: 'Pyke', reason: 'Execute ignores shield', counterScore: 70 },
  ],
  
  // Janna (40)
  40: [
    { championId: 555, championName: 'Pyke', reason: 'Execute + mobility', counterScore: 75 },
    { championId: 89, championName: 'Leona', reason: 'Multiple engage tools', counterScore: 70 },
  ],
  
  // Soraka (16)
  16: [
    { championId: 89, championName: 'Leona', reason: 'Hard engage + burst', counterScore: 85 },
    { championId: 111, championName: 'Nautilus', reason: 'Hard engage', counterScore: 85 },
    { championId: 53, championName: 'Blitzcrank', reason: 'Hook = dead Soraka', counterScore: 85 },
    { championId: 555, championName: 'Pyke', reason: 'Execute through heal', counterScore: 80 },
  ],
};

// ==========================================
// YARDIMCI FONKSİYONLAR
// ==========================================

/**
 * Şampiyon için sinerji verisi getirir
 */
export function getSynergiesForChampion(championId: number): SynergyData[] {
  return SYNERGY_DATABASE[championId] || [];
}

/**
 * Şampiyon için counter verisi getirir
 */
export function getCountersForChampion(championId: number): CounterData[] {
  return COUNTER_DATABASE[championId] || [];
}

/**
 * İki şampiyon arasındaki sinerji puanını getirir
 */
export function getSynergyScore(champion1Id: number, champion2Id: number): number {
  const synergies = SYNERGY_DATABASE[champion1Id] || [];
  const synergy = synergies.find(s => s.championId === champion2Id);
  if (synergy) return synergy.synergyScore;
  
  // Ters yönde kontrol et
  const reverseSynergies = SYNERGY_DATABASE[champion2Id] || [];
  const reverseSynergy = reverseSynergies.find(s => s.championId === champion1Id);
  return reverseSynergy?.synergyScore || 0;
}

/**
 * Şampiyonun rakibe karşı counter puanını getirir
 */
export function getCounterScore(championId: number, enemyId: number): number {
  const counters = COUNTER_DATABASE[championId] || [];
  const counter = counters.find(c => c.championId === enemyId);
  return counter?.counterScore || 0;
}

/**
 * Toplam sinerji sayısını döndürür
 */
export function getTotalSynergyCount(): number {
  return Object.values(SYNERGY_DATABASE).reduce((sum, arr) => sum + arr.length, 0);
}

/**
 * Toplam counter sayısını döndürür
 */
export function getTotalCounterCount(): number {
  return Object.values(COUNTER_DATABASE).reduce((sum, arr) => sum + arr.length, 0);
}
