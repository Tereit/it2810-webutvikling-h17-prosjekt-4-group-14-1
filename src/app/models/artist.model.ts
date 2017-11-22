export class Artist {
  _id: string;
  name: string;
  mbid: string;
  img: string;
  info: string;
  popularity: number;
  genres: Object[];

  constructor() {
    this.name = '';
    this.mbid = '';
    this.img  = '';
    this.info = '';
    this.popularity = 0;
    this.genres  = [];
  }

}

export default Artist;
