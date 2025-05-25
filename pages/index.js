import { useState, useEffect } from 'react';
import ImageCard from '../components/ImageCard';

export default function Home() {
  const [images, setImages] = useState([]);
  const [query, setQuery] = useState('');
  const [file, setFile] = useState(null);
  const [password, setPassword] = useState('');

  const handleUpload = async () => {
    if (!file) return;
    const formData = new FormData();
    formData.append('file', file);
    const res = await fetch('/api/analyze-image', { method: 'POST', body: formData });
    const data = await res.json();
    setImages(prev => [data, ...prev]);
  };

  const filteredImages = images.filter(img =>
    img.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase()))
  );

  return (
    <div style={{ padding: '20px' }}>
      <h1>Unclaimed Archive</h1>
      <input type="file" onChange={e => setFile(e.target.files[0])} />
      <button onClick={handleUpload}>Hochladen & Analysieren</button>
      <input type="text" placeholder="Suche nach Tags..." value={query} onChange={e => setQuery(e.target.value)} />
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {filteredImages.map((img, idx) => <ImageCard key={idx} data={img} />)}
      </div>
    </div>
  );
}
