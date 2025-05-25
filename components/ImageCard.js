export default function ImageCard({ data }) {
  return (
    <div style={{ border: '1px solid #ccc', padding: '10px', margin: '10px', width: '200px' }}>
      <img src={data.url} alt="Bild" style={{ width: '100%' }} />
      <p><strong>Tags:</strong> {data.tags.join(', ')}</p>
      <p><strong>Quelle:</strong> {data.source}</p>
      <p><strong>Datum:</strong> {data.date}</p>
      <div style={{ display: 'flex' }}>
        {data.colors.map((color, i) => (
          <div key={i} style={{ backgroundColor: color, width: '20px', height: '20px', margin: '2px' }}></div>
        ))}
      </div>
    </div>
  );
}
