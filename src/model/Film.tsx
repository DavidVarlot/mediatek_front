import Genre from './Genre';

export default class Film {

    public id?: string;

    public titre?: string;

    public synopsis?: string;

    public genre?: Genre;

    constructor(titre?: string, synopsis?: string, genre?: Genre, id?: string) {
        this.id = id;
        this.titre = titre;
        this.genre = genre;
        this.synopsis = synopsis;

    }
}