import { useState } from 'react';
import axios from 'axios';

interface ImageResponse {
  url: string;
}

interface ScriptResponse {
  content: string;
}

const AIGenerator = () => {
  const [prompt, setPrompt] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [script, setScript] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const generateImage = async () => {
    try {
      setLoading(true);
      const response = await axios.post<ImageResponse>('/api/image-generator', {
        prompt,
        size: '1024x1024'
      });
      setImageUrl(response.data.url);
    } catch (error: any) {
      const errorMessage = error.response?.data?.error 
        || error.message 
        || 'Failed to generate image';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const generateScript = async () => {
    try {
      setLoading(true);
      const response = await axios.post<ScriptResponse>('/api/script-generator', {
        messages: [{
          role: 'user',
          content: `Write a script about: ${prompt}`
        }]
      });
      setScript(response.data.content);
    } catch (error: any) {
      const errorMessage = error.response?.data?.error 
        || error.message 
        || 'Failed to generate script';
      setError(errorMessage);
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