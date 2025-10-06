const express = require('express');
const app = express();

app.use(express.json());

// Bonus listesi
const BONUS_LIST = {
  'welcome': { name: 'Hoş Geldin Bonusu', amount: 50, code: 'WELCOME50' },
  'first_deposit': { name: 'İlk Yatırım Bonusu', amount: 100, code: 'FIRST100' },
  'loss_back': { name: 'Kayıp Bonusu', amount: 25, code: 'LOSS25' },
  'weekend': { name: 'Hafta Sonu Bonusu', amount: 75, code: 'WEEKEND75' },
  'referral': { name: 'Arkadaş Davet', amount: 100, code: 'REFER100' }
};

// Webhook endpoint'i
app.post('/webhook/comm100/bonus', (req, res) => {
  console.log('🎯 BONUS TALEBİ GELDİ:', req.body);
  
  const { visitor_name, selected_bonus, visitor_email } = req.body;
  const bonus = BONUS_LIST[selected_bonus];
  
  console.log('══════════════════════════════════════');
  console.log(`✅ KULLANICI: ${visitor_name}`);
  console.log(`📧 EMAIL: ${visitor_email}`);
  console.log(`🎁 BONUS: ${bonus.name}`);
  console.log(`💰 TUTAR: ${bonus.amount} TL`);
  console.log(`🏷️ KOD: ${bonus.code}`);
  console.log('══════════════════════════════════════');
  
  res.json({
    status: 'success',
    message: `${bonus.name} hesabınıza yatırıldı!`,
    bonus_name: bonus.name,
    amount: bonus.amount,
    code: bonus.code
  });
});

// Ana sayfa
app.get('/', (req, res) => {
  res.send('🎰 BetBigo Bonus Sistemi Çalışıyor!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log('🚀 BetBigo Bonus Sistemi çalışıyor!');
});
