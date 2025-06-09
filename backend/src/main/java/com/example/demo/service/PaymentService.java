package com.example.demo.service;



import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.model.Order;
import com.example.demo.model.Payments;
import com.example.demo.reposity.OrderRepository;
import com.example.demo.reposity.PaymentRepository;

import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.text.SimpleDateFormat;
import java.util.*;

@Service
public class PaymentService {

    @Autowired
    private PaymentRepository paymentRepository;
    @Autowired
    private OrderRepository orderRepository;

    private  OrderService orderService;

  

    public PaymentService(PaymentRepository paymentRepository, OrderRepository orderRepository, OrderService orderService) {
        this.paymentRepository = paymentRepository;
        this.orderRepository = orderRepository;
        this.orderService = orderService;
        
    }
    // Configuration parameters

    private static final String vnp_PayUrl = "https://sandbox.vnpayment.vn/paymentv2/vpcpay.html";
    private static final String vnp_ReturnUrl = "http://localhost:5173/profile";

    private static final String vnp_TmnCode = "RSRU7CDQ";
    private static final String secretKey = "0ADS9PK4TONFW8U9N3SDOEV8CUU6RW0U";

    public String generatePaymentUrl(String user_id, String code ,double amount, String bankCode, String orderInfo, String language) {
        Map<String, String> vnp_Params = new HashMap<>();
        vnp_Params.put("vnp_Version", "2.1.0");
        vnp_Params.put("vnp_Command", "pay");
        vnp_Params.put("vnp_TmnCode", vnp_TmnCode);
        vnp_Params.put("vnp_Amount", String.valueOf((long) amount * 100));
        vnp_Params.put("vnp_CurrCode", "VND");
        vnp_Params.put("vnp_BankCode", bankCode);
        vnp_Params.put("vnp_TxnRef", code);
        vnp_Params.put("vnp_OrderInfo", orderInfo + user_id);
        vnp_Params.put("vnp_OrderType", "other");
        vnp_Params.put("vnp_Locale", language != null ? language : "vn");
        vnp_Params.put("vnp_ReturnUrl", vnp_ReturnUrl);
        vnp_Params.put("vnp_IpAddr", "IP_ADDRESS"); // Implement method to retrieve IP

        // Date handling
        Calendar cal = Calendar.getInstance(TimeZone.getTimeZone("GMT+7"));
        SimpleDateFormat formatter = new SimpleDateFormat("yyyyMMddHHmmss");
        vnp_Params.put("vnp_CreateDate", formatter.format(cal.getTime()));

        cal.add(Calendar.MINUTE, 20);
        vnp_Params.put("vnp_ExpireDate", formatter.format(cal.getTime()));

        // Generating the secure hash
        String queryUrl = null;
        try {
            queryUrl = buildQuery(vnp_Params);
        } catch (UnsupportedEncodingException e) {
            throw new RuntimeException(e);
        }
        String vnp_SecureHash = hmacSHA512(secretKey, queryUrl);
       String url =  vnp_PayUrl + "?" + queryUrl + "&vnp_SecureHash=" + vnp_SecureHash;

       return url;
    }
  

    private String buildQuery(Map<String, String> data) throws UnsupportedEncodingException {
        List<String> fieldNames = new ArrayList<>(data.keySet());
        Collections.sort(fieldNames);
        StringBuilder queryString = new StringBuilder();
        for (String fieldName : fieldNames) {
            String fieldValue = data.get(fieldName);
            if (fieldValue != null && !fieldValue.isEmpty()) {
                queryString.append(URLEncoder.encode(fieldName, StandardCharsets.US_ASCII.toString()));
                queryString.append("=");
                queryString.append(URLEncoder.encode(fieldValue, StandardCharsets.US_ASCII.toString()));
                queryString.append("&");
            }
        }
        return queryString.substring(0, queryString.length() - 1);
    }

    private String hmacSHA512(String key, String data) {
        try {
            Mac hmac512 = Mac.getInstance("HmacSHA512");
            SecretKeySpec secretKey = new SecretKeySpec(key.getBytes(StandardCharsets.UTF_8), "HmacSHA512");
            hmac512.init(secretKey);
            byte[] hash = hmac512.doFinal(data.getBytes(StandardCharsets.UTF_8));
            StringBuilder hexString = new StringBuilder();
            for (byte b : hash) {
                String hex = Integer.toHexString(0xff & b);
                if (hex.length() == 1) hexString.append('0');
                hexString.append(hex);
            }
            return hexString.toString();
        } catch (Exception e) {
            return null;
        }
    }

    private String getRandomNumber(int len) {
        Random rnd = new Random();
        StringBuilder sb = new StringBuilder(len);
        for (int i = 0; i < len; i++) {
            sb.append(rnd.nextInt(10));
        }
        return sb.toString();
    }
    /**
     * tjem vao payment sau khi thanh toan
     */
    public String addPayment(String id_order, String transactionId, String paymentMethod, double paymentAmount, String currency){
        Optional<Order> orders = orderRepository.findById(id_order);
        if(orders.isPresent()){
            Order o = orders.get();
            Payments  payments = new Payments(o, transactionId, paymentMethod,  paymentAmount,currency );
            Payments  p=      paymentRepository.save(payments);
            return  p.getPaymentId();
        } else {
            throw new IllegalArgumentException("No  found with id: " );
        }
    }
   
   
}
