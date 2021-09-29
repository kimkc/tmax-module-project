package com.example.catalogservice.config;

import net.bytebuddy.implementation.bind.annotation.DefaultCall;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebMvcConfig implements WebMvcConfigurer {

    @Value("${resource.location}")
    private String resourceLocation;

    @Value("${resource.uri-path}")
    private String getResourceUriPath;

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry){
        registry.addResourceHandler(getResourceUriPath + "/**")
                .addResourceLocations("file://" + resourceLocation);
    }
}
