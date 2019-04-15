export default class Genre {

    public id?: string;

    public nom?: string;

    constructor(nom?: string, id?: string) {
        this.id = id;
        this.nom = nom;
    }
}