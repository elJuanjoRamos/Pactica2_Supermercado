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

select * from usuario


