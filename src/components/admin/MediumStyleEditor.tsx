
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Bold, Italic, Link, Image, Plus, Type, AlignLeft, AlignCenter, Quote } from 'lucide-react';

interface MediumStyleEditorProps {
  title: string;
  content: string;
  excerpt: string;
  onTitleChange: (title: string) => void;
  onContentChange: (content: string) => void;
  onExcerptChange: (excerpt: string) => void;
  onImageUpload: (file: File) => void;
}

const MediumStyleEditor: React.FC<MediumStyleEditorProps> = ({
  title,
  content,
  excerpt,
  onTitleChange,
  onContentChange,
  onExcerptChange,
  onImageUpload
}) => {
  const [showToolbar, setShowToolbar] = useState(false);
  const [selectedText, setSelectedText] = useState('');

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onImageUpload(file);
    }
  };

  const formatText = (format: string) => {
    const textarea = document.getElementById('content-editor') as HTMLTextAreaElement;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = content.substring(start, end);
    
    let formattedText = '';
    switch (format) {
      case 'bold':
        formattedText = `**${selectedText}**`;
        break;
      case 'italic':
        formattedText = `*${selectedText}*`;
        break;
      case 'h1':
        formattedText = `# ${selectedText}`;
        break;
      case 'h2':
        formattedText = `## ${selectedText}`;
        break;
      case 'h3':
        formattedText = `### ${selectedText}`;
        break;
      case 'quote':
        formattedText = `> ${selectedText}`;
        break;
      case 'link':
        formattedText = `[${selectedText}](url)`;
        break;
      default:
        formattedText = selectedText;
    }

    const newContent = content.substring(0, start) + formattedText + content.substring(end);
    onContentChange(newContent);
  };

  const insertElement = (element: string) => {
    const textarea = document.getElementById('content-editor') as HTMLTextAreaElement;
    const start = textarea.selectionStart;
    
    let elementText = '';
    switch (element) {
      case 'image':
        elementText = '\n![Image description](image-url)\n';
        break;
      case 'divider':
        elementText = '\n---\n';
        break;
      default:
        elementText = element;
    }

    const newContent = content.substring(0, start) + elementText + content.substring(start);
    onContentChange(newContent);
  };

  return (
    <div className="max-w-4xl mx-auto bg-white">
      {/* Title Input - Large and Bold like Medium */}
      <div className="mb-8">
        <input
          type="text"
          value={title}
          onChange={(e) => onTitleChange(e.target.value)}
          placeholder="Tell your story..."
          className="w-full text-4xl md:text-5xl font-bold border-none outline-none text-gray-800 placeholder-gray-400 leading-tight"
          style={{ fontFamily: 'Georgia, serif' }}
        />
      </div>

      {/* Excerpt */}
      <div className="mb-6">
        <input
          type="text"
          value={excerpt}
          onChange={(e) => onExcerptChange(e.target.value)}
          placeholder="Write a compelling excerpt..."
          className="w-full text-xl text-gray-600 border-none outline-none placeholder-gray-400 leading-relaxed"
          style={{ fontFamily: 'Georgia, serif' }}
        />
      </div>

      {/* Floating Toolbar */}
      {showToolbar && (
        <div className="fixed bg-gray-800 text-white px-3 py-2 rounded-lg shadow-lg z-50 flex gap-2">
          <Button
            size="sm"
            variant="ghost"
            onClick={() => formatText('bold')}
            className="text-white hover:bg-gray-700 p-1"
          >
            <Bold className="w-4 h-4" />
          </Button>
          <Button
            size="sm"
            variant="ghost"
            onClick={() => formatText('italic')}
            className="text-white hover:bg-gray-700 p-1"
          >
            <Italic className="w-4 h-4" />
          </Button>
          <Button
            size="sm"
            variant="ghost"
            onClick={() => formatText('link')}
            className="text-white hover:bg-gray-700 p-1"
          >
            <Link className="w-4 h-4" />
          </Button>
        </div>
      )}

      {/* Side Toolbar */}
      <div className="relative">
        <div className="absolute -left-16 top-0 flex flex-col gap-2">
          <Button
            size="sm"
            variant="outline"
            className="w-10 h-10 rounded-full bg-white border-gray-300 hover:bg-gray-50"
            onClick={() => document.getElementById('image-upload')?.click()}
          >
            <Image className="w-4 h-4" />
          </Button>
          <input
            id="image-upload"
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
          />
          
          <Button
            size="sm"
            variant="outline"
            className="w-10 h-10 rounded-full bg-white border-gray-300 hover:bg-gray-50"
            onClick={() => insertElement('divider')}
          >
            <Plus className="w-4 h-4" />
          </Button>
        </div>

        {/* Main Content Editor */}
        <textarea
          id="content-editor"
          value={content}
          onChange={(e) => onContentChange(e.target.value)}
          onSelect={(e) => {
            const textarea = e.target as HTMLTextAreaElement;
            const hasSelection = textarea.selectionStart !== textarea.selectionEnd;
            setShowToolbar(hasSelection);
          }}
          placeholder="Write your story..."
          className="w-full min-h-[500px] text-lg leading-relaxed border-none outline-none resize-none text-gray-800 placeholder-gray-400"
          style={{ 
            fontFamily: 'Georgia, serif',
            lineHeight: '1.8'
          }}
        />
      </div>

      {/* Format Bar */}
      <div className="border-t border-gray-200 pt-4 mt-8">
        <div className="flex flex-wrap gap-2">
          <Button
            size="sm"
            variant="outline"
            onClick={() => formatText('h1')}
            className="text-sm"
          >
            H1
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() => formatText('h2')}
            className="text-sm"
          >
            H2
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() => formatText('h3')}
            className="text-sm"
          >
            H3
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() => formatText('quote')}
            className="text-sm"
          >
            <Quote className="w-4 h-4" />
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() => formatText('bold')}
            className="text-sm"
          >
            <Bold className="w-4 h-4" />
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() => formatText('italic')}
            className="text-sm"
          >
            <Italic className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MediumStyleEditor;
