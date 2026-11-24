const cds = require('@sap/cds');

module.exports = cds.service.impl(async function () {

    const { Books } = this.entities;

    /**
     * LogBooks
     * Inserts a book record for a borrower.
     */
    this.on('LogBooks', async (req) => {

        const {
            borrowerID,
            bookTitle,
            authorName,
            readDate
        } = req.data;

        console.log('LogBooks request:', {
            borrowerID,
            bookTitle,
            authorName,
            readDate
        });

        // Validate required parameters
        if (!borrowerID || !bookTitle || !authorName || !readDate) {
            return req.reject(
                400,
                'borrowerID, bookTitle, authorName, and readDate are required.'
            );
        }

        // Check whether the same book was already logged
        // for the same borrower and read date.
        const existingBook = await SELECT.one
            .from(Books)
            .where({
                borrowerID,
                bookTitle,
                readDate
            });

        if (existingBook) {
            return `Book "${bookTitle}" is already logged for borrower ${borrowerID} on ${readDate}.`;
        }

        // Insert record using the exact field names from schema.cds
        await INSERT.into(Books).entries({
            borrowerID,
            bookTitle,
            authorName,
            readDate
        });

        return `Book "${bookTitle}" successfully logged for borrower ${borrowerID}.`;
    });


    /**
     * FetchBooks
     * Retrieves books for the specified borrower,
     * ordered by readDate descending.
     */
    this.on('FetchBooks', async (req) => {

        const { borrowerID } = req.data;

        console.log('FetchBooks request:', {
            borrowerID
        });

        // Validate borrowerID
        if (!borrowerID) {
            return req.reject(
                400,
                'borrowerID is required.'
            );
        }

        // Retrieve the borrower's books
        const books = await SELECT
            .from(Books)
            .where({
                borrowerID
            })
            .orderBy('readDate desc');

        // Validate if there are no books
        if (!books || books.length === 0) {
            return req.reject(
                404,
                `No books found for borrower ${borrowerID}.`
            );
        }

        return books;
    });

});