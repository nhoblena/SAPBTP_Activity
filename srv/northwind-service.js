const cds = require('@sap/cds');

module.exports = cds.service.impl(async function () {

    const {
        Products,
        Suppliers,
        Categories
    } = this.entities;


    // ============================================================
    // INSERT PRODUCTS
    // ============================================================

    this.on('insertTBProducts', async (req) => {

        const { records } = req.data;

        console.log('insertTBProducts records:', records);

        if (!records || records.length === 0) {
            return req.reject(
                400,
                'No product records provided.'
            );
        }

        try {

            await INSERT.into(Products).entries(records);

            return `${records.length} product record(s) successfully uploaded to the database.`;

        } catch (error) {

            console.error('Error inserting products:', error);

            return req.reject(
                500,
                `Failed to insert products: ${error.message}`
            );
        }
    });


    // ============================================================
    // INSERT SUPPLIERS
    // ============================================================

    this.on('insertTBSuppliers', async (req) => {

        const { records } = req.data;

        console.log('insertTBSuppliers records:', records);

        if (!records || records.length === 0) {
            return req.reject(
                400,
                'No supplier records provided.'
            );
        }

        try {

            await INSERT.into(Suppliers).entries(records);

            return `${records.length} supplier record(s) successfully uploaded to the database.`;

        } catch (error) {

            console.error('Error inserting suppliers:', error);

            return req.reject(
                500,
                `Failed to insert suppliers: ${error.message}`
            );
        }
    });


    // ============================================================
    // INSERT CATEGORIES
    // ============================================================

    this.on('insertTBCategories', async (req) => {

        const { records } = req.data;

        console.log('insertTBCategories records:', records);

        if (!records || records.length === 0) {
            return req.reject(
                400,
                'No category records provided.'
            );
        }

        try {

            await INSERT.into(Categories).entries(records);

            return `${records.length} category record(s) successfully uploaded to the database.`;

        } catch (error) {

            console.error('Error inserting categories:', error);

            return req.reject(
                500,
                `Failed to insert categories: ${error.message}`
            );
        }
    });
this.on('fetchNorthwindData', async (req) => {

    try {

        const products = await SELECT.from(Products);
        const suppliers = await SELECT.from(Suppliers);
        const categories = await SELECT.from(Categories);

        const result = products.map(product => {

            const supplier = suppliers.find(
                supplier =>
                    supplier.SupplierID === product.SupplierID
            );

            const category = categories.find(
                category =>
                    category.CategoryID === product.CategoryID
            );

            return {
                ProductID: product.ProductID,
                ProductName: product.ProductName,
                SupplierID: product.SupplierID,

                CompanyName: supplier
                    ? supplier.CompanyName
                    : null,

                Address: supplier
                    ? supplier.Address
                    : null,

                City: supplier
                    ? supplier.City
                    : null,

                Region: supplier
                    ? supplier.Region
                    : null,

                CategoryName: category
                    ? category.CategoryName
                    : null,

                Description: category
                    ? category.Description
                    : null
            };
        });

        return result;

    } catch (error) {

        console.error(
            'Error fetching combined Northwind data:',
            error
        );

        return req.reject(
            500,
            `Failed to fetch Northwind data: ${error.message}`
        );
    }

});
});