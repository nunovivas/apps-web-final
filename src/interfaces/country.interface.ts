export interface Country {
  name: {
    common: string;
    nativeName?: {
      [key: string]: {
        official: string;
      };
    };
  };
}
