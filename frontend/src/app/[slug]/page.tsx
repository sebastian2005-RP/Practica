async function getPage(slug: string) {
  const res = await fetch(
    `http://localhost:1337/api/pages?filters[slug][$eq]=${slug}`,
    { next: { tags: ['pages'] } }
  );
  const json = await res.json();
  return json.data[0];
}

export default async function StaticPage({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}) {
  const { slug } = await params;
  const pageData = await getPage(slug);

  if (!pageData) {
    return (
      <div className="p-20 text-center">
        <h1 className="text-2xl">Página "{slug}" no encontrada</h1>
      </div>
    );
  }

  return (
    <main className="p-20 max-w-4xl mx-auto">
      <h1 className="text-5xl font-bold mb-8">{pageData.attributes.title}</h1>
      <div className="text-xl text-gray-600 leading-relaxed">
        {pageData.attributes.content}
      </div>
    </main>
  );
}