package com.example.oblig;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;


@RestController
public class TicketController {
    private final ArrayList<Ticket> allTickets = new ArrayList<>();
    @PostMapping("/PostTickets")
    public void saveTickets (Ticket inTicket){
        allTickets.add(inTicket);
    }

    @GetMapping("/GetTickets")
    public ArrayList<Ticket> getAllTickets(){
        return allTickets;
    }

    @GetMapping("/DeleteAll")
    public void deleteAll(){
        allTickets.clear();
    }

}
