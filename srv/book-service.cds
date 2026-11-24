using { sap.cap.backend as db } from '../db/schema';

service BookService {

    entity Books as projection on db.Books;

    action LogBooks(
        borrowerID : String,
        bookTitle  : String,
        authorName : String,
        readDate   : Date
    ) returns String;

    function FetchBooks(
        borrowerID : String
    ) returns many Books;
}
