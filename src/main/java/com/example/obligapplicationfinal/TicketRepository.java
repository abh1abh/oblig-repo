package com.example.obligapplicationfinal;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;

@Repository
public class TicketRepository {

    @Autowired
    private JdbcTemplate db;

    public boolean saveTicket(Ticket ticketIn){
        String sql = "INSERT INTO Tickets (film, antall, " +
                "fornavn, etternavn, telefonNr, epost) VALUES (?,?,?,?,?,?)";
        try{
            db.update(sql, ticketIn.getFilm(), ticketIn.getAntall(),
                    ticketIn.getFornavn(), ticketIn.getEtternavn(), ticketIn.getTelefonNr(), ticketIn.getEpost());
            return true;
        } catch (Exception e){
            System.out.println("Error saving Tickets");
            return false;
        }

    }

    public List<Ticket> getAllTickets(){
        try{
            String sql = "SELECT * FROM Tickets";
            List<Ticket> allTickets = db.query(sql,new BeanPropertyRowMapper(Ticket.class));
            return allTickets;
        } catch (Exception e){
            System.out.println("Error getting tickets from db");
            return new ArrayList<>();
        }
    }

    public boolean deleteAll(){
        try{
            String sql = "DELETE FROM Tickets";
            db.update(sql);
            return true;
        } catch (Exception e){
            System.out.println("Error deleting from db");
            return false;
        }
    }

    public boolean deleteById(int ticketId){
        try{
            String sql = "DELETE FROM Tickets WHERE ticketId = ?";
            db.update(sql, ticketId);
            return true;
        } catch(Exception e){
            System.out.println("Error deleting from db");
            return false;
        }
    }

}
