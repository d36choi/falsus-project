package com.falsus.falsusproject.controller;

import com.falsus.falsusproject.dao.FalsusRepository;
import com.falsus.falsusproject.model.Falsus;
import lombok.NoArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.ArrayList;
import java.util.List;


@Slf4j
@Controller
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

    @ResponseBody
    @GetMapping("/json/data")
    public List<Falsus> GetJsonFalsus(){

    List<Falsus> falsusList= new ArrayList<>();
    falsusRepository.findAll().forEach(falsusList::add);
    log.info(falsusList.toString());
    return falsusList;
    }

    @GetMapping("/list/search")
    public String Map(@RequestParam("address") String address, Model model)
    {
        model.addAttribute("falsuses",falsusRepository.findByAddressContaining(address));
        return "falsus-list";
    }

}
