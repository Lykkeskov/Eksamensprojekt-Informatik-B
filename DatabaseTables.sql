-- Opret database
CREATE DATABASE cykelvaerksted;
USE cykelvaerksted;

-- Bruger tabel
CREATE TABLE bruger (
    id INT AUTO_INCREMENT PRIMARY KEY,
    navn VARCHAR(100) NOT NULL,
    rolle VARCHAR(50) NOT NULL,
    password VARCHAR(255) NOT NULL
);

-- Cykel tabel
CREATE TABLE cykel (
    id INT AUTO_INCREMENT PRIMARY KEY,
    type VARCHAR(50),
    status VARCHAR(50),
    beskrivelse TEXT
);

-- Opgave tabel
CREATE TABLE opgave (
    id INT AUTO_INCREMENT PRIMARY KEY,
    titel VARCHAR(100) NOT NULL,
    status VARCHAR(50),
    cykel_id INT NOT NULL,
    bruger_id INT,
    FOREIGN KEY (cykel_id) REFERENCES cykel(id),
    FOREIGN KEY (bruger_id) REFERENCES bruger(id)
);

-- Reservedele tabel
CREATE TABLE reservedele (
    id INT AUTO_INCREMENT PRIMARY KEY,
    navn VARCHAR(100) NOT NULL,
    antal INT NOT NULL
);

-- Koblingstabel    (M:M relation)
CREATE TABLE cykel_reservedele (
    cykel_id INT,
    reservedel_id INT,
    antal INT,
    PRIMARY KEY (cykel_id, reservedel_id),
    FOREIGN KEY (cykel_id) REFERENCES cykel(id),
    FOREIGN KEY (reservedel_id) REFERENCES reservedele(id)
);

-- Reservation table is very important for the thing yes
CREATE TABLE reservation (
    id INT AUTO_INCREMENT PRIMARY KEY,
    code VARCHAR(20) NOT NULL,
    name VARCHAR(100) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    email VARCHAR(100) NOT NULL,
    description TEXT NOT NULL
);