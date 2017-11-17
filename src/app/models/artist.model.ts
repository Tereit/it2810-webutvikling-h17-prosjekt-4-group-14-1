export class Artist {
  _id: string;
  name: string;
  mbid: string;
  img: string;

  constructor() {
    this.name = '';
    this.mbid = '';
    this.img  = '';
  }

}

export default Artist;
