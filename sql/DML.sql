USE dbPractica2;
-- -----------------------------------------------------
-- Table `Rol`
-- -----------------------------------------------------
INSERT INTO ROL(nombre) VALUES ("Administrador");
INSERT INTO ROL(nombre) VALUES ("Cliente");
INSERT INTO ROL(nombre) VALUES ("Asistente");
-- -----------------------------------------------------
-- Table `Usuario`
-- -----------------------------------------------------
INSERT INTO Usuario(nombre, apellido, username, pass, Rol_idRol) VALUES("admin", "admin", "admin", "admin", 1);
CALL insert_user("root", "root", "root", "root", 1);
CALL insert_user("ram", "ram", "ram", "ram", 1);
CALL insert_user("fs", "s", "re", "re", 2);
CALL insert_user("fds", "fsd", "fsd", "fd", 3);



-- -----------------------------------------------------
-- Table `Proveedor`
-- -----------------------------------------------------
CALL insert_proveedor("prov1","prov1","prov1");


-- -----------------------------------------------------
-- Table `Producto`
-- -----------------------------------------------------
CALL insert_producto("a",0, "img", 5, "dafdsa");

SELECT * FROM PRODUCTO


-- -----------------------------------------------------
-- Table `Proveedor Producto`
-- -----------------------------------------------------
CALL insert_producto_proveedor(3);

SELECT * FROM proveedorProducto

INSERT INTO ProveedorProducto(Proveedor_idProveedor, Producto_idProducto) VALUES(1, 23) ;

