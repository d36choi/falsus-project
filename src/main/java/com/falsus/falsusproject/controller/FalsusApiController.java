package com.falsus.falsusproject.controller;

import com.falsus.falsusproject.dao.FalsusRepository;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

@AllArgsConstructor
@Controller("/falsus")
public class FalsusApiController {

    private FalsusRepository falsusRepository;

    @GetMapping("/list")
    public String index(Model model){
        model.addAttribute("falsuses",falsusRepository.findAll());
        return "falsus-list";
    }
}
