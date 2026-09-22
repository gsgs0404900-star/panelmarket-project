import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json({ limit: '50kb' }));
app.use(express.urlencoded({ extended: true }));
app.use(express.static('.'));

app.post('/api/demo/pay', (req, res) => {
  try {
    const { productId, productName, price, demoBalance } = req.body || {};
    const amount = Number(price);
    const balance = Number(demoBalance);

    if (!productName || !Number.isFinite(amount) || amount <= 0) {
      return res.status(400).json({ ok: false, error: 'Geçersiz ürün veya tutar.' });
    }
    if (!Number.isFinite(balance) || balance < 0) {
      return res.status(400).json({ ok: false, error: 'Geçerli bir demo bakiye gir.' });
    }
    if (balance < amount) {
      return res.status(402).json({ ok: false, error: 'Bakiye yetersiz. Demo kart bakiyeni artır.' });
    }

    const downloadUrl = '/downloads/panelmarket-demo-theme.txt?productId=' + encodeURIComponent(String(productId || 'demo'));
    return res.status(200).json({
      ok: true, status: 'success',
      message: 'Demo satın alma işlemi başarılı.',
      downloadUrl
    });
  } catch (error) {
    console.error('Demo ödeme hatası:', error);
    return res.status(500).json({ ok: false, error: 'Demo ödeme sırasında beklenmeyen bir sunucu hatası oluştu.' });
  }
});

app.get('/api/health', (_req, res) => res.json({ ok: true, service: 'panelmarket-demo-payment' }));

app.use((err, _req, res, _next) => {
  console.error('Sunucu hatası:', err);
  res.status(500).json({ ok: false, error: 'Sunucu hatası oluştu.' });
});

const port = Number(process.env.PORT || 3000);
app.listen(port, '0.0.0.0', () => console.log(`PanelMarket demo ödeme sunucusu: http://localhost:${port}`));
