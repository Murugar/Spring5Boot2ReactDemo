package com.iqmsoft.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.iqmsoft.domain.Item;
import com.iqmsoft.infrastructue.Configuration;
import com.iqmsoft.infrastructue.ItemSorter;
import com.iqmsoft.repositories.ItemRepository;

import javax.validation.Valid;
import java.util.List;
import java.util.stream.Collectors;

@RequestMapping("/api")
@RestController
public class ItemController {

    private final ItemRepository repository;

    @Autowired
    public ItemController(ItemRepository repository) {
        this.repository = repository;
    }


    @GetMapping("/items")
    public List<Item> getAllItems(@RequestParam(required = false, defaultValue = "") String name,
                                  @RequestParam(required = false, defaultValue = Configuration.SORT_BY_TIMESTAMP) String sort,
                                  @RequestParam(required = false, defaultValue = Configuration.DESCENDING) String order) {

    

        List<Item> items = name.isEmpty() ? repository.findAll() : repository.findAllByNameIsLike(name);

        System.out.println(items);

        return items.stream().sorted(ItemSorter.sortItems(sort, order)).collect(Collectors.toList());

    }

    @PostMapping("/items")
    public void saveItem(@RequestBody @Valid Item item) {
        repository.save(item);
    }

    @GetMapping("/items/{id}")
    public Item getItem(@PathVariable Long id) {
        return repository.findById(id).get();
    }

    @DeleteMapping("/items")
    public void deleteItem(@RequestBody @Valid Item item) {
        repository.delete(item);
    }


}
