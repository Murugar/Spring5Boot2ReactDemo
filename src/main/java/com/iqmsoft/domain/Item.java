package com.iqmsoft.domain;

import lombok.Data;
import org.hibernate.validator.constraints.NotEmpty;

import javax.persistence.*;
import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@Entity
@Data
@Table(name = "items")
public class Item {

    @Id
    @GeneratedValue
    @Column(name = "itemID", unique = true, nullable = false, updatable = false)
    private Long id;

    @NotNull
    @NotEmpty
    @Column(name = "name", nullable = false)
    private String name;

    @NotNull
    @Size(max = 100)
    @Column(name = "description", nullable = false)
    private String description;

    @NotNull
    @Min(0)
    @Max(10)
    @Column(name = "rating", nullable = false)
    private Integer rating;

    @NotNull
    @Min(0)
    @Column(name = "timestamp", nullable = false)
    private Long timestamp;
}
