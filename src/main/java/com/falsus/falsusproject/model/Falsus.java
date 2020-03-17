package com.falsus.falsusproject.model;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.Id;

@NoArgsConstructor
@Getter
@Entity
public class Falsus {

    @Id
    private Long id;
    private String div;
    private String address;
    private String protection;
    private double geoX;
    private double geoY;


}
