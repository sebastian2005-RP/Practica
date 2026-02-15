import Link from 'next/link';

async function getPost(slug: string) {
  const res = await fetch(
    `http://localhost:1337/api/posts?filters[slug][$eq]=${slug}`,
    { 
      next: { tags: ['posts'] },
      cache: 'no-store' 
    }
  );
  const json = await res.json();
  return json.data && json.data.length > 0 ? json.data[0] : null;
}

export default async function PostDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) {
    return (
      <div className="p-10 text-center">
        <h1 className="text-xl font-bold">Post no encontrado</h1>
        <Link href="/blog" className="text-blue-500 underline">Volver al blog</Link>
      </div>
    );
  }

  // --- FUNCIÓN PARA LIMPIAR EL CONTENIDO DE STRAPI 5 ---
  const renderContent = (content: any) => {
    if (typeof content === 'string') return content;
    
    // Si Strapi envía bloques (Blocks), extraemos el texto de cada párrafo
    if (Array.isArray(content)) {
      return content.map((block: any, index: number) => {
        if (block.type === 'paragraph') {
          return (
            <p key={index} className="mb-4">
              {block.children?.map((child: any) => child.text).join('')}
            </p>
          );
        }
        return null;
      });
    }
    return "Sin contenido";
  };
  // -----------------------------------------------------

  return (
    <article className="p-10 max-w-2xl mx-auto">
      <Link href="/blog" className="text-sm text-blue-500">← Volver al blog</Link>
      
      <h1 className="text-4xl font-extrabold mt-4 mb-6">{post.title}</h1>
      
      <div className="text-gray-700 leading-relaxed">
        {renderContent(post.content)}
      </div>
    </article>
  );
}