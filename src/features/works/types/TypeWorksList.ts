export interface TypeWorksList {
  thumbnail_url: string,
  title: { rendered: string },
  content: { rendered: string },
  acf: { 
    url: string,
    git: string,
    created: string,
    updated: string
  },
  taxonomy: string[],
  date: string,
  modified: string,
}