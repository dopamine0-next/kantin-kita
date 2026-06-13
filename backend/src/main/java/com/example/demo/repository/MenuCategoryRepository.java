package com.example.demo.repository;

import com.example.demo.entity.MenuCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MenuCategoryRepository extends JpaRepository<MenuCategory, String> {

    List<MenuCategory> findAllByOrderByPriorityAsc();
}
