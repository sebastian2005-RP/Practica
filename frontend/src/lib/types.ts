// src/lib/types.ts

// Definición para los Posts
export interface Post {
  id: number;
  documentId: string;
  title: string;
  slug: string;
  content: any; // Se usa any porque Strapi 5 envía bloques enriquecidos (Rich Text)
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

// Definición para las Páginas (Page)
export interface Page {
  id: number;
  documentId: string;
  title: string;
  slug: string;
  content: any;
}

// Definición para la Meta información (Paginación)
export interface StrapiMeta {
  pagination: {
    page: number;
    pageSize: number;
    pageCount: number;
    total: number;
  };
}

// Respuesta global de la API para listas
export interface StrapiResponse<T> {
  data: T[];
  meta: StrapiMeta;
}