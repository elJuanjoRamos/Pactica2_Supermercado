
-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `dbPractica2` ;

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `dbPractica2` DEFAULT CHARACTER SET utf8 ;
USE `dbPractica2` ;

-- -----------------------------------------------------
-- Table `mydb`.`Producto`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `Producto` ;

CREATE TABLE IF NOT EXISTS `Producto` (
  `idProducto` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(45) NULL,
  `descripcion` VARCHAR(45) NULL,
  `precioVenta` DECIMAL(20) NULL,
  `cantidad` INT NULL,
  PRIMARY KEY (`idProducto`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`Proveedor`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `Proveedor` ;

CREATE TABLE IF NOT EXISTS `Proveedor` (
  `idProveedor` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(45) NULL,
  `direccion` VARCHAR(45) NULL,
  `telefono` VARCHAR(45) NULL,
  PRIMARY KEY (`idProveedor`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`ProveedorProducto`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `ProveedorProducto` ;

CREATE TABLE IF NOT EXISTS `ProveedorProducto` (
  `idProveedorProducto` INT NOT NULL AUTO_INCREMENT,
  `Proveedor_idProveedor` INT NOT NULL,
  `Producto_idProducto` INT NOT NULL,
  PRIMARY KEY (`idProveedorProducto`),
  INDEX `fk_ProveedorProducto_Proveedor1_idx` (`Proveedor_idProveedor` ASC),
  INDEX `fk_ProveedorProducto_Producto1_idx` (`Producto_idProducto` ASC),
  CONSTRAINT `fk_ProveedorProducto_Proveedor1`
    FOREIGN KEY (`Proveedor_idProveedor`)
    REFERENCES `Proveedor` (`idProveedor`)
    ON UPDATE CASCADE,
  CONSTRAINT `fk_ProveedorProducto_Producto1`
    FOREIGN KEY (`Producto_idProducto`)
    REFERENCES `Producto` (`idProducto`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`Rol`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `Rol` ;

CREATE TABLE IF NOT EXISTS `Rol` (
  `idRol` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(45) NULL,
  PRIMARY KEY (`idRol`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`Usuario`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `Usuario` ;

CREATE TABLE IF NOT EXISTS `Usuario` (
  `idUsuario` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(45) NULL,
  `apellido` VARCHAR(45) NULL,
  `username` VARCHAR(45) NULL,
  `pass` VARCHAR(45) NULL,
  `Rol_idRol` INT NOT NULL,
  PRIMARY KEY (`idUsuario`),
  INDEX `fk_Usuario_Rol_idx` (`Rol_idRol` ASC),
  CONSTRAINT `fk_Usuario_Rol`
    FOREIGN KEY (`Rol_idRol`)
    REFERENCES `Rol` (`idRol`)
    ON UPDATE CASCADE)
ENGINE = InnoDB;



-- -------------------------------
-- PROCEDIMIENTOS ALMACENADOS


DELIMITER //
CREATE PROCEDURE insert_user (IN nombre VARCHAR(45), IN apellido VARCHAR(45), 
IN username VARCHAR(45), IN pass VARCHAR(45), IN rol INT)
BEGIN
INSERT INTO Usuario(nombre, apellido, username, pass, Rol_idRol) VALUES(nombre, apellido, username, pass, rol);  
END //
DELIMITER ;


DELIMITER //
CREATE PROCEDURE insert_proveedor (IN nombre VARCHAR(45), IN direccion VARCHAR(45), 
IN telefono VARCHAR(45))
BEGIN
INSERT INTO Proveedor(nombre, direccion, telefono) VALUES(nombre, direccion, telefono);  
END //
DELIMITER ;


DELIMITER //
CREATE PROCEDURE autenticar (IN nombre VARCHAR(45), IN passw VARCHAR(45))
BEGIN
SELECT * FROM Usuario WHERE username = nombre AND pass = passw;  
END //
DELIMITER ;


DELIMITER //
CREATE PROCEDURE borrar_usuario (IN idUsuario INT)
BEGIN
DELETE FROM Usuario WHERE idUsuario = idUsuario;
END //
DELIMITER ;

DELIMITER //
CREATE PROCEDURE actualizar_usuario (IN n VARCHAR(45), IN a VARCHAR(45), 
IN u VARCHAR(45), IN p VARCHAR(45), IN r INT, IN id INT)
BEGIN

UPDATE Usuario SET nombre = n, apellido = a, username = u, pass = p, Rol_idRol = r WHERE idUsuario = id; 

END //
DELIMITER ;

DELIMITER //
CREATE PROCEDURE actualizar_proveedor (IN n VARCHAR(45), IN d VARCHAR(45), 
IN t VARCHAR(45), IN id INT)
BEGIN

UPDATE Proveedor SET nombre = n, direccion = d, telefono = t WHERE idProveedor = id; 

END //
DELIMITER ;



