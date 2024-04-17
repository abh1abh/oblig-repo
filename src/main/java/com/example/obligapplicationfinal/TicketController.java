package com.example.obligapplicationfinal;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
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
    public List<Ticket> getAllTickets(){
        return rep.getAllTickets();
    }

    @GetMapping("/DeleteAll")
    public boolean deleteAll(){
        return rep.deleteAll();
    }

}

