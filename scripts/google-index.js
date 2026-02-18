const { google } = require('googleapis');

async function indexUrls(urls) {
  const credentials = JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_KEY);
  
  const auth = new google.auth.GoogleAuth({
    credentials,
    scopes: ['https://www.googleapis.com/auth/indexing']
  });

  const indexing = google.indexing({ version: 'v3', auth });
  
  for (const url of urls) {
    try {
      const res = await indexing.urlNotifications.publish({
        requestBody: {
          url: url,
          type: 'URL_UPDATED'
        }
      });
      console.log('Indexed:', url, res.data);
    } catch (err) {
      console.error('Failed to index:', url, err.message);
    }
    // Rate limit 방지
    await new Promise(r => setTimeout(r, 200));
  }
}

const newPosts = JSON.parse(process.env.NEW_POSTS || '[]');
console.log('Indexing', newPosts.length, 'URLs:', newPosts);

indexUrls(newPosts)
  .then(() => console.log('Done!'))
  .catch(console.error);
