package com.example.apigatewayservice.filter;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import lombok.extern.slf4j.Slf4j;
import org.springframework.cloud.gateway.filter.GatewayFilter;
import org.springframework.cloud.gateway.filter.factory.AbstractGatewayFilterFactory;
import org.springframework.core.env.Environment;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.http.server.reactive.ServerHttpResponse;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ServerWebExchange;
import reactor.core.publisher.Mono;

import java.util.Enumeration;

@Component
@Slf4j
public class AuthorizationHeaderFilter extends AbstractGatewayFilterFactory<AuthorizationHeaderFilter.Config> {
    Environment env;
    private Claims claims = null;

    public AuthorizationHeaderFilter(Environment env){
        super(Config.class);
        this.env = env;
    }

    @Override
    public GatewayFilter apply(Config config) {
        return (exchange, chain) -> {
            ServerHttpRequest request = exchange.getRequest();

            //todo token을 authorization을 사용안하면, token이란 헤더에서 가져와야함
            if(!request.getHeaders().containsKey(HttpHeaders.AUTHORIZATION)){
                return onError(exchange, "No authorization header", HttpStatus.UNAUTHORIZED); // 401
            }

            // Authorization: Bearer eyJhGcasdf~~
            String authorizationHeader = request.getHeaders().get(HttpHeaders.AUTHORIZATION).get(0);
            String jwt = authorizationHeader.replace("Bearer", "");

            if(!isJwtValid(jwt)){
                return onError(exchange, "JWT token is not valid", HttpStatus.UNAUTHORIZED); // 401
            }

            exchange.getResponse().getHeaders().add("userId", claims.get("userId").toString());
            exchange.getResponse().getHeaders().add("email", claims.get("email").toString());
            
            // exchange.getRequest().getHeaders() = readableHttpOnly이므로 헤더 추가나 수정 불가능
            // 아래와 같이 만들어줘야함
            ServerHttpRequest mutateRequest = exchange.getRequest().mutate()
                                                .header("userId", claims.get("userId").toString())
                                                .header("email", claims.get("email").toString())
                                                .build();
            ServerWebExchange mutateExchange = exchange.mutate().request(mutateRequest).build();

            return chain.filter(mutateExchange);

        };
    }

    private Mono<Void> onError(ServerWebExchange exchange, String  err, HttpStatus httpStatus){
        ServerHttpResponse response = exchange.getResponse();
        response.setStatusCode(httpStatus);

        log.error(err);
        return response.setComplete();
    }

    public boolean isJwtValid(String jwt){
        boolean returnValue = true;

        try {
            System.out.println(env.getProperty("token.secret"));
            claims = Jwts.parser().setSigningKey(env.getProperty("token.secret"))
                    .parseClaimsJws(jwt).getBody();
        }catch(Exception ex){
            returnValue =false;
        }

        if(claims == null || claims.isEmpty()){
            returnValue = false;
        }

        return returnValue;
    }

    public static class Config{
        // put configuration properties here
    }

}
