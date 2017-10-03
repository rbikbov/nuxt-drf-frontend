const mailProviders = [
  // "почтовый домен", "название почтового сервиса","адрес для входа в почту"
  'mail.ru',
  'Почта Mail.Ru',
  'https://e.mail.ru/',
  'bk.ru',
  'Почта Mail.Ru (bk.ru)',
  'https://e.mail.ru/',
  'list.ru',
  'Почта Mail.Ru (list.ru)',
  'https://e.mail.ru/',
  'inbox.ru',
  'Почта Mail.Ru (inbox.ru)',
  'https://e.mail.ru/',
  'yandex.ru',
  'Яндекс.Почта',
  'https://mail.yandex.ru/',
  'ya.ru',
  'Яндекс.Почта',
  'https://mail.yandex.ru/',
  'yandex.ua',
  'Яндекс.Почта',
  'https://mail.yandex.ua/',
  'yandex.by',
  'Яндекс.Почта',
  'https://mail.yandex.by/',
  'yandex.kz',
  'Яндекс.Почта',
  'https://mail.yandex.kz/',
  'yandex.com',
  'Yandex.Mail',
  'https://mail.yandex.com/',
  'gmail.com',
  'Gmail',
  'https://mail.google.com/',
  'googlemail.com',
  'Gmail',
  'https://mail.google.com/',
  'outlook.com',
  'Outlook.com',
  'https://mail.live.com/',
  'hotmail.com',
  'Outlook.com (Hotmail)',
  'https://mail.live.com/',
  'live.ru',
  'Outlook.com (live.ru)',
  'https://mail.live.com/',
  'live.com',
  'Outlook.com (live.com)',
  'https://mail.live.com/',
  'me.com',
  'iCloud Mail',
  'https://www.icloud.com/',
  'icloud.com',
  'iCloud Mail',
  'https://www.icloud.com/',
  'rambler.ru',
  'Рамблер-Почта',
  'https://mail.rambler.ru/',
  'yahoo.com',
  'Yahoo! Mail',
  'https://mail.yahoo.com/',
  'ukr.net',
  'Почта ukr.net',
  'https://mail.ukr.net/',
  'i.ua',
  'Почта I.UA',
  'http://mail.i.ua/',
  'bigmir.net',
  'Почта Bigmir.net',
  'http://mail.bigmir.net/',
  'tut.by',
  'Почта tut.by',
  'https://mail.tut.by/',
  'inbox.lv',
  'Inbox.lv',
  'https://www.inbox.lv/',
  'mail.kz',
  'Почта mail.kz',
  'http://mail.kz/'
];

const mailProviderObjects = mailProviders.reduce((final, cur, index) => {
  if (index % 3 === 0) {
    final.push({});
    final[final.length - 1].host = cur;
  } else if (index % 3 === 1) {
    final[final.length - 1].name = cur;
  } else {
    final[final.length - 1].href = cur;
  }
  return final;
}, []);

export default email => {
  const [, host] = email.split('@');
  const provider = mailProviderObjects.find(prov => prov.host.includes(host));
  return provider;
};
