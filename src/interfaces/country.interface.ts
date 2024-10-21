export interface Country {
  name: {
    common: string;
    official: string;
    nativeName?: {
      [key: string]: {
        official: string;
      };
    };
  };
  unMember: boolean;
  subregion: string;
  capital: string[];
}
