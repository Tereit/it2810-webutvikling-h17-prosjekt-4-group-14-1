export class Artist {
  _id: string;
  name: string;
  mbid: string;
  img: string;
  info: string;
  popularity: string;
  genres: Object[];

  constructor() {
    this.name = '';
    this.mbid = '';
    this.img  = '';
    this.info = '';
    this.popularity = '';
    this.genres  = [];
  }

}

export default Artist;
