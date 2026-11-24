using { sap.cap.backend as db } from '../db/schema';

service NorthwindService {

    entity Products as projection on db.Products;
    entity Suppliers as projection on db.Suppliers;
    entity Categories as projection on db.Categories;


    type ProductInput {
        ProductID       : Integer;
        ProductName     : String(100);
        SupplierID      : Integer;
        CategoryID      : Integer;
        QuantityPerUnit : String(100);
        UnitPrice       : Decimal(15,2);
        UnitsInStock    : Integer;
        UnitsOnOrder    : Integer;
        ReorderLevel    : Integer;
        Discontinued    : Boolean;
    }

    type SupplierInput {
        SupplierID   : Integer;
        CompanyName  : String(100);
        ContactName  : String(100);
        ContactTitle : String(100);
        Address      : String(100);
        City         : String(100);
        Region       : String(100);
        PostalCode   : String(100);
        Country      : String(100);
        Phone        : String(100);
        Fax          : String(100);
        HomePage     : String(500);
    }

    type CategoryInput {
        CategoryID   : Integer;
        CategoryName : String(100);
        Description  : String(500);
    }


    action insertTBProducts(
        records : array of ProductInput
    ) returns String;


    action insertTBSuppliers(
        records : array of SupplierInput
    ) returns String;


    action insertTBCategories(
        records : array of CategoryInput
    ) returns String;

type CombinedNorthwindData {
    ProductID    : Integer;
    ProductName  : String(100);
    SupplierID   : Integer;
    CompanyName  : String(100);
    Address      : String(100);
    City         : String(100);
    Region       : String(100);
    CategoryName : String(100);
    Description  : String(500);
}

function fetchNorthwindData()
    returns array of CombinedNorthwindData;

}