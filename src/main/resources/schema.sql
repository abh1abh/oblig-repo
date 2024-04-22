CREATE TABLE Tickets (
     ticketId INT PRIMARY KEY AUTO_INCREMENT,
     film VARCHAR(50) NOT NULL,
     antall INT NOT NULL,
     fornavn VARCHAR(50) NOT NULL,
     etternavn VARCHAR(50) NOT NULL,
     telefonNr VARCHAR(50),
     epost VARCHAR(50)
);