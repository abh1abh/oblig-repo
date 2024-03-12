package com.example.oblig;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;

@SpringBootApplication
public class ObligApplication {

    public static void main(String[] args) {
        SpringApplication.run(ObligApplication.class, args);
    }

    @RestController
    public static class TicketController {
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
}
