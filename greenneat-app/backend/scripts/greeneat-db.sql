
-- tables
-- Table: Locations
CREATE TABLE Locations (
    id serial  NOT NULL,
    nameArea varchar(100)  NOT NULL,
    CONSTRAINT Locations_pk PRIMARY KEY (id)
);

CREATE INDEX BusinessArea_idx_1 on Locations (nameArea ASC);

-- Table: Oils
CREATE TABLE Oils (
    id serial  NOT NULL,
    type varchar(50)  NOT NULL,
    price decimal(10,2)  NOT NULL,
    description varchar(200)  NULL,
    CONSTRAINT Oils_pk PRIMARY KEY (id)
);

CREATE INDEX Oil_idx_1 on Oils (type ASC);

CREATE INDEX Oil_idx_2 on Oils (price ASC);

-- Table: Suppliers_Locations
CREATE TABLE Suppliers_Locations (
    id serial  NOT NULL,
    idLocations int  NOT NULL,
    idUserSupplier int  NOT NULL,
    CONSTRAINT Suppliers_Locations_pk PRIMARY KEY (id)
);

CREATE INDEX Suppliers_BusinessArea_idx_1 on Suppliers_Locations (idLocations ASC);

-- Table: Suppliers_Oil
CREATE TABLE Suppliers_Oil (
    id serial  NOT NULL,
    idOil int  NOT NULL,
    quantity decimal(1000,2)  NOT NULL,
    date timestamp  NOT NULL,
    idUserSupplier int  NOT NULL,
    CONSTRAINT Suppliers_Oil_pk PRIMARY KEY (id)
);

CREATE INDEX Suppliers_Oil_idx_1 on Suppliers_Oil (quantity ASC);

CREATE INDEX Suppliers_Oil_idx_2 on Suppliers_Oil (idOil ASC);

-- Table: Transactions
CREATE TABLE Transactions (
    id serial  NOT NULL,
    date timestamp  NOT NULL,
    type varchar(200)  NULL,
    amount int  NOT NULL,
    status varchar(200)  NOT NULL,
    idSenderUser int  NOT NULL,
    idReceiverUser int  NOT NULL,
    CONSTRAINT Transactions_pk PRIMARY KEY (id)
);

-- Table: UserDetails
CREATE TABLE UserDetails (
    id serial  NOT NULL,
    name varchar(100),
    telephone varchar(11)  NOT NULL,
    document varchar(20),
    address varchar(200)  NOT NULL,
    businessName varchar(100),
    idUser int  NOT NULL,
    CONSTRAINT UserDetails_pk PRIMARY KEY (id)
);

-- Table: UserTypes
CREATE TABLE UserTypes (
    id serial  NOT NULL,
    type varchar(200)  NOT NULL,
    CONSTRAINT UserTypes_pk PRIMARY KEY (id)
);

CREATE INDEX Partner_idx_1 on UserTypes (type ASC);

-- Table: Users
CREATE TABLE Users (
    id serial  NOT NULL,
    email varchar(50)  NOT NULL,
    password varchar(200)  NOT NULL,
    balance int  NOT NULL,
    createdAt timestamp  NOT NULL,
    updatedAt timestamp  NOT NULL,
    idUserType int  NOT NULL,
    CONSTRAINT User_ak_1 UNIQUE (email) NOT DEFERRABLE  INITIALLY IMMEDIATE,
    CONSTRAINT Users_pk PRIMARY KEY (id)
);

-- foreign keys
-- Reference: Locations_Supplier_Locations (table: Suppliers_Locations)
ALTER TABLE Suppliers_Locations ADD CONSTRAINT Locations_Supplier_Locations
    FOREIGN KEY (idLocations)
    REFERENCES Locations (id)
    ON DELETE  RESTRICT 
    ON UPDATE  CASCADE 
    NOT DEFERRABLE 
    INITIALLY IMMEDIATE
;

-- Reference: Suppliers_Locations_User (table: Suppliers_Locations)
ALTER TABLE Suppliers_Locations ADD CONSTRAINT Suppliers_Locations_User
    FOREIGN KEY (idUserSupplier)
    REFERENCES Users (id)  
    NOT DEFERRABLE 
    INITIALLY IMMEDIATE
;

-- Reference: Suppliers_Oil_Oil (table: Suppliers_Oil)
ALTER TABLE Suppliers_Oil ADD CONSTRAINT Suppliers_Oil_Oil
    FOREIGN KEY (idOil)
    REFERENCES Oils (id)
    ON DELETE  RESTRICT 
    ON UPDATE  CASCADE 
    NOT DEFERRABLE 
    INITIALLY IMMEDIATE
;

-- Reference: Suppliers_Oil_User (table: Suppliers_Oil)
ALTER TABLE Suppliers_Oil ADD CONSTRAINT Suppliers_Oil_User
    FOREIGN KEY (idUserSupplier)
    REFERENCES Users (id)  
    NOT DEFERRABLE 
    INITIALLY IMMEDIATE
;

-- Reference: Transaction_User_Receiver (table: Transactions)
ALTER TABLE Transactions ADD CONSTRAINT Transaction_User_Receiver
    FOREIGN KEY (idSenderUser)
    REFERENCES Users (id)  
    NOT DEFERRABLE 
    INITIALLY IMMEDIATE
;

-- Reference: Transaction_User_Sender (table: Transactions)
ALTER TABLE Transactions ADD CONSTRAINT Transaction_User_Sender
    FOREIGN KEY (idReceiverUser)
    REFERENCES Users (id)  
    NOT DEFERRABLE 
    INITIALLY IMMEDIATE
;

-- Reference: UserDetails_User (table: UserDetails)
ALTER TABLE UserDetails ADD CONSTRAINT UserDetails_User
    FOREIGN KEY (idUser)
    REFERENCES Users (id)  
    NOT DEFERRABLE 
    INITIALLY IMMEDIATE
;

-- Reference: User_UserTypes (table: Users)
ALTER TABLE Users ADD CONSTRAINT User_UserTypes
    FOREIGN KEY (idUserType)
    REFERENCES UserTypes (id)  
    NOT DEFERRABLE 
    INITIALLY IMMEDIATE
;

-- End of file.