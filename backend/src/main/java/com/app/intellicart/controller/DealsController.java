package com.app.intellicart.controller;

import com.app.intellicart.dto.DealsDto;
import com.app.intellicart.service.DealsService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/deals")
@RequiredArgsConstructor
public class DealsController {

    private final DealsService dealsService;

    @GetMapping("/get")
    public DealsDto getDeals() {
        return dealsService.getDeals();
    }
}