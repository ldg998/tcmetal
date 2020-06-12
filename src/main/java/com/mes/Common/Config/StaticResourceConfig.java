//package com.mes.Common.Config;
//
//import lombok.extern.slf4j.Slf4j;
//import org.springframework.beans.factory.annotation.Value;
//import org.springframework.context.annotation.Configuration;
//import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
//import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;
//
//@Configuration
//@Slf4j
//public class StaticResourceConfig extends WebMvcConfigurerAdapter {
//
//    @Value("${resources.location}")
//    private String resourcesLocation;
//    @Value("${resources.uri_path}")
//    private String resourcesUriPath;
//
//    @Override
//    public void addResourceHandlers(ResourceHandlerRegistry registry) {
//        registry.addResourceHandler(resourcesUriPath + "/**")
//                .addResourceLocations(resourcesLocation);
//    }
//}
