package com.iqmsoft.infrastructue;

import java.util.Comparator;
import java.util.List;

import com.iqmsoft.domain.Item;

public class ItemSorter {
    public static Comparator<Item> sortItems(String sort, String order) {
        Comparator<Item> comparator = (sort.equals(Configuration.SORT_BY_RATING)) ? Comparator.comparingInt(Item::getRating) : Comparator.comparingLong(Item::getTimestamp);
        return order.equals(Configuration.DESCENDING) ? comparator.reversed() : comparator;
    }
}
