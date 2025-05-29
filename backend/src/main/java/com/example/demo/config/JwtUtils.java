package com.example.demo.config;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import java.security.Key;
import java.util.Date;
import java.util.List;

public class JwtUtils {
    private static final Key key = Keys.secretKeyFor(SignatureAlgorithm.HS256);
    private static final long expirationMs = 3600000; // 1h

    public static String generateToken(String username, List<String> roles, String userId) {
        return Jwts.builder()
            .setSubject(username)
            .claim("id", userId)        
            .claim("roles", roles)
            .setIssuedAt(new Date())
            .setExpiration(new Date(System.currentTimeMillis() + expirationMs))
            .signWith(key)
            .compact();
    }
}
