package com.falsus.falsusproject.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class IndexApiController {

    @GetMapping("/")
    public String index(){
        return "index";
    }
}
