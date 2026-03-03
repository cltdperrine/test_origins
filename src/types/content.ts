export interface ContentItem {
  id: string;
  type: string;
  title: string;

  slug?: string;

  system?: {
    codename?: string;
  };

  elements?: {
    slug?: {
      value: string;
    };
    url_slug?: {
      value: string;
    };
  };

  image?: {
    url: string;
  };

  images?: {
    main?: {
      url: string;
    };
  };
  
}


export interface Section {
  id: string;
  type: string;
  items?: ContentItem[];
}

interface Category {
  name: string;
  codename: string;
}

export interface Video {
  id: string;
  title: string;
  url?: string;
  image?: {
    url: string;
  };
  categories?: Category[];
}

export interface Article {
  id: string;
  title: string;
  image?: {
    url: string;
  }
  publication_date?: string
}
