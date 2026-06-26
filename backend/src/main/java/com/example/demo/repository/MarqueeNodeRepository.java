package com.example.demo.repository;

import com.example.demo.entity.MarqueeNode;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MarqueeNodeRepository extends JpaRepository<MarqueeNode, String> {

    List<MarqueeNode> findByIsActiveTrue();
}
