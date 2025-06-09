package com.example.demo.reposity;



import com.example.demo.model.Order;
import com.example.demo.model.Payments;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PaymentRepository extends MongoRepository<Payments, String> {
    Payments findByOrders(Order order);
}
