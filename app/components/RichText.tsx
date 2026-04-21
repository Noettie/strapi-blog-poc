import { RichTextBlock, RichTextChild } from '../lib/types';

function renderChild(child: RichTextChild, index: number): React.ReactNode {
  if (child.type === 'link' && child.url) {
    return (
      <a key={index} href={child.url} className="text-[#3DA58A] underline hover:text-[#2d8c74]" target="_blank" rel="noopener noreferrer">
        {child.children?.map((c, i) => renderChild(c, i))}
      </a>
    );
  }

  let content: React.ReactNode = child.text;

  if (child.bold) content = <strong key={index}>{content}</strong>;
  if (child.italic) content = <em key={index}>{content}</em>;
  if (child.underline) content = <u key={index}>{content}</u>;
  if (child.strikethrough) content = <s key={index}>{content}</s>;
  if (child.code) content = <code key={index} className="bg-gray-100 px-1.5 py-0.5 rounded text-sm font-mono">{content}</code>;

  return <span key={index}>{content}</span>;
}

function renderHeading(level: number, children: React.ReactNode, index: number): React.ReactNode {
  const classes: Record<number, string> = {
    1: 'text-3xl font-bold mt-8 mb-4',
    2: 'text-2xl font-bold mt-8 mb-3',
    3: 'text-xl font-semibold mt-6 mb-3',
    4: 'text-lg font-semibold mt-4 mb-2',
  };
  const className = classes[level] || classes[2];

  switch (level) {
    case 1: return <h1 key={index} className={className}>{children}</h1>;
    case 3: return <h3 key={index} className={className}>{children}</h3>;
    case 4: return <h4 key={index} className={className}>{children}</h4>;
    default: return <h2 key={index} className={className}>{children}</h2>;
  }
}

function renderBlock(block: RichTextBlock, index: number): React.ReactNode {
  const children = block.children?.map((child, i) => renderChild(child, i));

  switch (block.type) {
    case 'heading':
      return renderHeading(block.level || 2, children, index);

    case 'paragraph':
      const isEmpty = block.children?.every(c => c.text === '');
      if (isEmpty) return <br key={index} />;
      return <p key={index} className="text-[#333] text-[17px] leading-[1.8] mb-4">{children}</p>;

    case 'list':
      if (block.format === 'ordered') {
        return <ol key={index} className="list-decimal pl-6 mb-4 space-y-2">{children}</ol>;
      }
      return <ul key={index} className="list-disc pl-6 mb-4 space-y-2">{children}</ul>;

    case 'list-item':
      return <li key={index} className="text-[#333] text-[17px] leading-[1.8]">{children}</li>;

    case 'quote':
      return (
        <blockquote key={index} className="border-l-4 border-[#3DA58A] pl-4 py-2 my-6 italic text-gray-600">
          {children}
        </blockquote>
      );

    case 'code':
      return (
        <pre key={index} className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto my-4">
          <code>{children}</code>
        </pre>
      );

    case 'image':
      if (block.image) {
        return (
          <figure key={index} className="my-6">
            <img
              src={block.image.url}
              alt={block.image.alternativeText || ''}
              className="w-full rounded-lg"
            />
          </figure>
        );
      }
      return null;

    default:
      return <p key={index} className="text-[#333] text-[17px] leading-[1.8] mb-4">{children}</p>;
  }
}

export default function RichText({ content }: { content: RichTextBlock[] }) {
  if (!content || content.length === 0) return null;
  return <div className="rich-text">{content.map((block, i) => renderBlock(block, i))}</div>;
}
