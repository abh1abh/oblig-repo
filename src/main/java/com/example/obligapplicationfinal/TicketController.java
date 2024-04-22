package com.example.obligapplicationfinal;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;

@RestController
public class TicketController {

    @Autowired
    private TicketRepository rep;

    @PostMapping("/PostTickets")
    public boolean saveTickets (Ticket inTicket){
        return rep.saveTicket(inTicket);
    }

    @GetMapping("/GetTickets")
    public List<Ticket> getAllTickets() {
        List<Ticket> allTickets = rep.getAllTickets();
        Ticket tempTicket;
        // allTickets.sort(Comparator.comparing(Ticket::getEtternavn));
        for (int i = 0; i < allTickets.size(); i++) {
            for (int j = i + 1; j < allTickets.size(); j++) {
                if (allTickets.get(i).getEtternavn().compareTo(allTickets.get(j).getEtternavn()) > 0) {
                    tempTicket = allTickets.get(i);
                    allTickets.set(i, allTickets.get(j));
                    allTickets.set(j, tempTicket);
                }
            }
        }

        return allTickets;
    }

    @DeleteMapping("/DeleteAll")
    public boolean deleteAll(){
        return rep.deleteAll();
    }

    @DeleteMapping("/DeleteById")
    public boolean deleteById(@RequestParam int ticketId){
        System.out.println("deleteById: " + ticketId);
        return rep.deleteById(ticketId);

    }

}

