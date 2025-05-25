import formidable from 'formidable';
import fs from 'fs';
import { Configuration, OpenAIApi } from 'openai';
import getColors from '../../utils/extractColors';

export const config = { api: { bodyParser: false } };

export default async function handler(req, res) {
  const form = new formidable.IncomingForm();
  form.parse(req, async (err, fields, files) => {
    const filePath = files.file.filepath;
    const buffer = fs.readFileSync(filePath);
    const base64 = buffer.toString('base64');

    const openai = new OpenAIApi(new Configuration({ apiKey: process.env.OPENAI_API_KEY }));
    const completion = await openai.createChatCompletion({
      model: 'gpt-4',
      messages: [{ role: 'user', content: 'Beschreibe dieses Bild: Tags, Quelle, Datum' }]
    });

    const tags = completion.data.choices[0].message.content.trim().split(',');
    const colors = await getColors(filePath);

    res.status(200).json({ tags, colors, source: 'Unclaimed Archive', date: new Date().toISOString() });
  });
}
