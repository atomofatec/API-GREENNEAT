INSERT INTO usertypes VALUES (1, 'GreenEat'), (2, 'Supplier'), (3, 'Partner')
insert into locations (nameArea) values ('Norte'), ('Sul'), ('Leste'), ('Oeste')

ALTER TABLE suppliers_oil ADD COLUMN price decimal(10,2)
ALTER TABLE suppliers_oil ADD COLUMN status varchar(15)
ALTER TABLE oils DROP COLUMN price