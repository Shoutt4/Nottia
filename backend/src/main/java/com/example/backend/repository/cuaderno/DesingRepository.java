package com.example.backend.repository.cuaderno;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.backend.entity.Design;

@Repository
public interface DesingRepository extends JpaRepository<Design, String> {

}
