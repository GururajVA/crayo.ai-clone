import { useState } from 'react';
import axios from 'axios';

const AIGenerator = () => {
  const [prompt, setPrompt] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [script, setScript] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const generateImage = async () => {
    try {
      setLoading(true);
      const response = await axios.post('/api/image-generator', {
        prompt,
        size: '1024x1024'
      });
      setImageUrl(response.data.url);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to generate image');
    } finally {
      setLoading(false);
    }
  };

  const generateScript = async () => {
    try {
      setLoading(true);
      const response = await axios.post('/api/script-generator', {
        messages: [{
          role: 'user',
          content: `Write a script about: ${prompt}`
        }]
      });
      setScript(response.data.content);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to generate script');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="ai-generator">
      <input
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Enter your prompt..."
      />
      
      <button onClick={generateImage} disabled={loading}>
        {loading ? 'Generating...' : 'Generate Image'}
      </button>
      
      <button onClick={generateScript} disabled={loading}>
        {loading ? 'Generating...' : 'Generate Script'}
      </button>

      {error && <div className="error">{error}</div>}
      
      {imageUrl && (
        <div className="image-result">
          <img src={imageUrl} alt="Generated content" />
        </div>
      )}

      {script && (
        <div className="script-result">
          <pre>{script}</pre>
        </div>
      )}
    </div>
  );
};

export default AIGenerator;