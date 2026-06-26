package com.example.demo.repository;

import com.example.demo.entity.MenuCustomization;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MenuCustomizationRepository extends JpaRepository<MenuCustomization, String> {
}
