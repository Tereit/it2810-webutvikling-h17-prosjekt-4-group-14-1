export class Artist {
  _id: string;
  name: string;
  mbid: string;
  img: string;
  info: string;
  popularity: number;

  constructor() {
    this.name = '';
    this.mbid = '';
    this.img  = '';
    this.info = '';
    this.popularity = 1;
  }

}

export default Artist;
