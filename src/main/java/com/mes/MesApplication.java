package com.mes;

import org.apache.ibatis.session.SqlSessionFactory;
import org.mybatis.spring.SqlSessionFactoryBean;
import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;
import org.springframework.context.annotation.Bean;
import org.springframework.core.io.Resource;
import org.springframework.core.io.support.PathMatchingResourcePatternResolver;
import org.springframework.http.converter.HttpMessageConverter;
import org.springframework.http.converter.StringHttpMessageConverter;

import javax.sql.DataSource;
import java.nio.charset.Charset;

/**
 * <javadoc>
 * Main args class
 * @author      김재일
 * @version     1.0
 * @since       2019-11-14
 **/
@SpringBootApplication
@MapperScan(value = {"com.mes.Mapper"})
public class MesApplication extends SpringBootServletInitializer{

    public MesApplication() {
    }

    protected SpringApplicationBuilder configure(SpringApplicationBuilder application) {
        return application.sources(new Class[]{MesApplication.class});
    }

    public static void main(String[] args) {
        SpringApplication.run(MesApplication.class, args);
    }

    @Bean
    public HttpMessageConverter<String> responseBodyConverter() {
        return new StringHttpMessageConverter(Charset.forName("UTF-8"));
    }

    @Bean
    public SqlSessionFactory sqlSessionFactory(DataSource dataSource) throws Exception {
        SqlSessionFactoryBean sessionFactory = new SqlSessionFactoryBean();
        sessionFactory.setDataSource(dataSource);
        Resource[] res = new PathMatchingResourcePatternResolver().getResources("classpath:query/**/*_mapper.xml");
        sessionFactory.setMapperLocations(res);
        return sessionFactory.getObject();
    }
}
