export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const body = JSON.parse(req.body);
    const buttonIndex = body.untrustedData?.buttonIndex || 1;

    const malePredictions = [
      "💼 Сегодня идеальный день для карьерных решений! Ваша уверенность впечатлит начальство.",
      "💰 Неожиданная финансовая возможность появится после обеда. Будьте внимательны к деталям.",
      "❤️ Романтическая встреча вечером может изменить всё. Будьте открыты для общения.",
      "🏆 Спортивные достижения или физическая активность принесут удовлетворение.",
      "🚗 Поездка или короткое путешествие откроет новые перспективы."
    ];

    const femalePredictions = [
      "💖 Романтическая энергия на пике! Сегодня возможна судьбоносная встреча.",
      "✨ Творческий проект принесет неожиданное признание. Продолжайте творить!",
      "🛍️ Шоппинг сегодня будет особенно удачным - вы найдете именно то, что искали.",
      "💄 Новый образ или изменение стиля привлечет внимание нужного человека.",
      "🌸 Гармония в семье и отношениях - идеальный день для сердечных разговоров."
    ];

    let selectedPrediction;
    let gender;

    if (buttonIndex === 1) {
      gender = "👨 Мужчина";
      selectedPrediction = malePredictions[Math.floor(Math.random() * malePredictions.length)];
    } else {
      gender = "👩 Женщина";
      selectedPrediction = femalePredictions[Math.floor(Math.random() * femalePredictions.length)];
    }

    const htmlResponse = `
      <!DOCTYPE html>
      <html>
      <head>
          <meta property="fc:frame" content="vNext" />
          <meta property="fc:frame:image" content="https://i.imgur.com/8B3Vx2k.png" />
          <meta property="fc:frame:button:1" content="🔄 Новое предсказание" />
          <meta property="fc:frame:post_url" content="https://YOUR-APP.vercel.app/api/prediction" />
          <meta property="og:image" content="https://i.imgur.com/8B3Vx2k.png" />
      </head>
      <body>
          <div style="display: none;">${selectedPrediction}</div>
      </body>
      </html>
    `;

    res.setHeader('Content-Type', 'text/html');
    res.status(200).send(htmlResponse);

  } catch (error) {
    const fallbackResponse = `
      <!DOCTYPE html>
      <html>
      <head>
          <meta property="fc:frame" content="vNext" />
          <meta property="fc:frame:image" content="https://i.imgur.com/6Q3Vx1j.png" />
          <meta property="fc:frame:button:1" content="👨 Мужчина" />
          <meta property="fc:frame:button:2" content="👩 Женщина" />
          <meta property="fc:frame:post_url" content="https://YOUR-APP.vercel.app/api/prediction" />
      </head>
      <body></body>
      </html>
    `;
    res.setHeader('Content-Type', 'text/html');
    res.status(200).send(fallbackResponse);
  }
}