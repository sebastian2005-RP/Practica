import Link from 'next/link';

async function getPosts(page: number = 1) {
  const pageSize = 2; 
  // En Strapi 5 la respuesta es directa, no requiere .attributes
  const res = await fetch(
    `http://localhost:1337/api/posts?pagination[page]=${page}&pagination[pageSize]=${pageSize}`,
    { 
      next: { tags: ['posts'] },
      cache: 'force-cache' 
    }
  );
  
  if (!res.ok) throw new Error('Error al obtener posts');
  return res.json();
}

export default async function BlogPage({ 
  searchParams 
}: { 
  searchParams: Promise<{ page?: string }> 
}) {
  const sParams = await searchParams;
  const currentPage = Number(sParams.page) || 1;
  const json = await getPosts(currentPage);
  
  // En Strapi 5 los posts están directamente en json.data
  const posts = json.data || [];
  const meta = json.meta;

  return (
    <main className="p-10 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Nuestro Blog (Strapi 5)</h1>
      
      <div className="grid gap-6">
        {posts.map((post: any) => (
          <div key={post.id} className="p-6 border rounded-lg shadow-sm hover:shadow-md transition">
            {/* ACCESO DIRECTO: post.title en lugar de post.attributes.title */}
            <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
            <Link 
              href={`/blog/${post.slug}`} 
              className="text-blue-600 font-medium"
            >
              Leer artículo →
            </Link>
          </div>
        ))}
      </div>

      <div className="mt-10 flex items-center justify-center gap-4">
        {currentPage > 1 && (
          <Link href={`/blog?page=${currentPage - 1}`} className="px-4 py-2 border rounded">
            Anterior
          </Link>
        )}
        <span className="text-gray-600">
          Página {currentPage} de {meta.pagination.pageCount}
        </span>
        {currentPage < meta.pagination.pageCount && (
          <Link href={`/blog?page=${currentPage + 1}`} className="px-4 py-2 border rounded">
            Siguiente
          </Link>
        )}
      </div>
    </main>
  );
}