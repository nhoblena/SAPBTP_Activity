namespace sap.cap.backend;

entity Books {
    key ID       : UUID;
    borrowerID : String(50);
    bookTitle    : String(100);
    authorName   : String(100);
    readDate     : Date;
}

entity Products {
    key ProductID   : Integer;
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

entity Suppliers {
    key SupplierID  : Integer;
    CompanyName     : String(100);
    ContactName     : String(100);
    ContactTitle    : String(100);
    Address         : String(100);
    City            : String(100);
    Region          : String(100);
    PostalCode      : String(100);
    Country         : String(100);
    Phone           : String(100);
    Fax             : String(100);
    HomePage        : String(500);
}

entity Categories {
    key CategoryID  : Integer;
    CategoryName    : String(100);
    Description     : String(500);
}