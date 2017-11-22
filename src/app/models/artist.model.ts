export class Artist {
  _id: string;
  name: string;
  mbid: string;
  img: string;
  info: string;
  popularity: number;
  genres: Object[];

  constructor(id = '', name = '',
    mbid = '', img = '', info = '',
    popularity = 0, genres = []) {
    this._id = id;
    this.name = name;
    this.mbid = mbid;
    this.img  = img;
    this.info = info;
    this.popularity = popularity;
    this.genres  = genres;
  }

}

export default Artist;
