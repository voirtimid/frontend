export class Constants {

    static UPLOAD_DIRECTORY = `/Users/odimitri/Documents/Fakultet/WP/uploads/`;

    static getFilePath(destination, fileName) {
        return `${this.UPLOAD_DIRECTORY}${destination}/${fileName}`;
    }
}