package com.falsus.falsusproject.controller;

import com.falsus.falsusproject.dao.FalsusRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

@Controller("/falsus")
public class FalsusApiController {

    @Autowired
    private FalsusRepository falsusRepository;

    @GetMapping("/list")
    public String List(Model model) {
        model.addAttribute("falsuses", falsusRepository.findAll());
        return "falsus-list";
    }

    @GetMapping("/map")
    public String Map(Model model) {
        model.addAttribute("falsuses", falsusRepository.findAll());
        return "falsus-map";
    }
}
