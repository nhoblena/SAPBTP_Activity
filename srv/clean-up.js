const cds = require('@sap/cds');

async function cleanup() {
    try {
        const db = await cds.connect.to('db');

        console.log('Checking invalid Books records...');

        // Show bad records before deleting
        const invalidBooks = await db.run(
            SELECT.from('sap.cap.backend.Books')
                .where`
                    borrowerID is null or
                    bookTitle is null or
                    authorName is null or
                    readDate is null
                `
        );

        console.log(`Found ${invalidBooks.length} invalid record(s):`);
        console.table(invalidBooks);

        if (invalidBooks.length === 0) {
            console.log('No invalid records found. Nothing to delete.');
            return;
        }

        // Delete ONLY invalid records
        const deleted = await db.run(
            DELETE.from('sap.cap.backend.Books')
                .where`
                    borrowerID is null or
                    bookTitle is null or
                    authorName is null or
                    readDate is null
                `
        );

        console.log(`Cleanup completed. Deleted ${deleted} invalid record(s).`);

        // Display remaining records
        const remainingBooks = await db.run(
            SELECT.from('sap.cap.backend.Books')
                .orderBy('readDate desc')
        );

        console.log(`Remaining valid records: ${remainingBooks.length}`);
        console.table(remainingBooks);

    } catch (error) {
        console.error('Cleanup failed:', error);
        process.exitCode = 1;
    }
}

cleanup();
