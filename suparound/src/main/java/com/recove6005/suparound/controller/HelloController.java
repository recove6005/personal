package com.recove6005.suparound.controller;

import com.recove6005.suparound.service.BoxOfficeService;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.ArrayList;

@Controller
public class HelloController {

    @GetMapping("/hello")
    public String hello(@RequestParam(value = "name", defaultValue = "World") String name) {
        return "hello";
    }

    @GetMapping("/home")
    public String home(Model model) {
        model.addAttribute("name", "SupAround");
        return "home";
    }

    @GetMapping("/boxoffice")
    public String boxoffice(Model model) {
        BoxOfficeService boxOfficeService = new BoxOfficeService();
        ArrayList<String> rankList = boxOfficeService.getDailyBoxOfficeTitleList();
        ArrayList<String> accList = boxOfficeService.getDailyBoxOfficeAudiaccList();

        model.addAttribute("rankList", rankList);
        model.addAttribute("accList", accList);

        return "boxoffice";
    }
}
