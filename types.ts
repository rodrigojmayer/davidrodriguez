
export interface GalleryImage {
  id: string;
  url: string;
  category: 'Antes' | 'Después' | 'Proceso' | 'Terminado';
  title: string;
  featured: boolean;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export enum AppRoute {
  HOME = 'home',
  GALLERY = 'gallery',
  SERVICES = 'services',
  CONTACT = 'contact',
  ADMIN = 'admin'
}
