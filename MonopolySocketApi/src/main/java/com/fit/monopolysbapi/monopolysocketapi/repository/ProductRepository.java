package com.fit.monopolysbapi.monopolysocketapi.repository;

import com.fit.monopolysbapi.monopolysocketapi.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ProductRepository extends JpaRepository<Product, String> {
    Product findProductById(String id);

    @Query("SELECT p FROM Product p WHERE p.isActive = :isActive")
    List<Product> findAllByActive(boolean isActive);
}
