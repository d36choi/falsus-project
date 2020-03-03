package com.falsus.falsusproject.dao;

import com.falsus.falsusproject.model.Falsus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface FalsusRepository extends JpaRepository<Falsus,Long> {

    /**
     * @param address
     * %Like% Query 기능 제공. Containing 붙이면 해당 스트링 포함한 리스트 리턴.
     */
    List<Falsus> findByAddressContaining(String address);
}
