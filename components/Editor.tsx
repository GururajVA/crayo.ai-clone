interface EditorProps {
  content: string;
  setContent: (content: string) => void; // Add missing prop
  generateCode: () => Promise<void>;
}

const Editor = ({ content, setContent, generateCode }: EditorProps) => {
  // Proper event typing
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      const start = e.currentTarget.selectionStart;
      const end = e.currentTarget.selectionEnd;
      setContent(content.substring(0, start) + '  ' + content.substring(end));
    }
  };

  return (
    <div className="editor-container">
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <button onClick={generateCode}>Generate</button>
    </div>
  );
};