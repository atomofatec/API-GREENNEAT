INSERT INTO usertypes VALUES (1, 'GreenEat'), (2, 'Supplier'), (3, 'Partner');
insert into locations (nameArea) values ('Norte'), ('Sul'), ('Leste'), ('Oeste');

ALTER TABLE suppliers_oil ADD COLUMN price decimal(10,2);
ALTER TABLE suppliers_oil ADD COLUMN status varchar(15);
ALTER TABLE oils DROP COLUMN price;

ALTER TABLE suppliers_oil ADD COLUMN idUserPartner integer;
ALTER TABLE suppliers_oil
ADD CONSTRAINT fk_suppliers_oil_idUserPartner
FOREIGN KEY (idUserPartner)
REFERENCES users (id);

ALTER TABLE suppliers_oil RENAME COLUMN date TO CollectionDate;
ALTER TABLE suppliers_oil ADD COLUMN availableDate timestamp;
ALTER TABLE suppliers_oil ADD COLUMN deliveryDate timestamp;
ALTER TABLE SUPPLIERS_OIL ALTER COLUMN collectiondate DROP NOT NULL