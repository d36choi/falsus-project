package com.falsus.falsusproject.controller;

import com.falsus.falsusproject.dao.FalsusRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

@Controller("/fasus")
public class FalsusApiController {

    @Autowired
    private FalsusRepository falsusRepository;

    @GetMapping("/list")
    public String index(Model model){
        model.addAttribute("falsuses",falsusRepository.findAll());
        return "falsus-list";
    }
}
